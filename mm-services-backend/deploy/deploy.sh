#!/usr/bin/env bash
# Deploys the latest commit of the branch this checkout is on: pull, install,
# restart, health check. If the new version doesn't come up healthy, the
# previous commit is restored. Run as the app user on the server; GitHub Actions
# runs it over SSH on every push (see DEPLOYMENT.md).
#
# Everything lives inside main() so bash has read the whole script before
# `git reset` replaces this file on disk.
set -euo pipefail

main() {
  local app_dir repo_dir branch port previous current
  app_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
  repo_dir="$(git -C "$app_dir" rev-parse --show-toplevel)"
  branch="$(git -C "$repo_dir" rev-parse --abbrev-ref HEAD)"
  port="$(sed -n 's/^PORT=//p' "$app_dir/.env" 2>/dev/null | tail -1)"
  port="${port:-3000}"

  mkdir -p "$app_dir/data"
  exec 9>"$app_dir/data/.deploy.lock"
  flock 9

  previous="$(git -C "$repo_dir" rev-parse HEAD)"
  git -C "$repo_dir" fetch --quiet origin "$branch"
  git -C "$repo_dir" reset --quiet --hard "origin/$branch"
  current="$(git -C "$repo_dir" rev-parse HEAD)"
  echo "==> Deploying $branch ${previous:0:7} -> ${current:0:7}"

  if release "$app_dir" "$port"; then
    echo "==> Live: ${current:0:7} is healthy on port $port"
    return 0
  fi

  echo "==> ${current:0:7} failed its health check; rolling back to ${previous:0:7}" >&2
  git -C "$repo_dir" reset --quiet --hard "$previous"
  if release "$app_dir" "$port"; then
    echo "==> Rolled back: ${previous:0:7} is live again" >&2
  else
    echo "==> Rollback also failed; check 'pm2 logs mm-services'" >&2
  fi
  return 1
}

release() {
  local app_dir="$1" port="$2"
  cd "$app_dir"
  npm ci --omit=dev --no-audit --no-fund --loglevel=error || return 1
  pm2 startOrReload deploy/ecosystem.config.cjs --update-env >/dev/null || return 1
  pm2 save >/dev/null
  healthy "$port"
}

healthy() {
  local port="$1" attempt
  for attempt in $(seq 1 20); do
    curl -fsS --max-time 2 "http://127.0.0.1:$port/api/health" >/dev/null 2>&1 && return 0
    sleep 1
  done
  return 1
}

main "$@"; exit $?
