#!/usr/bin/env bash
# Daily backup of the database and uploaded resumes; keeps the last 14 days.
# Cron (crontab -e):  30 3 * * *  /home/mm/haytrex/mm-services-backend/deploy/backup.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p backups
stamp=$(date +%F)
sqlite3 data/mm-services.db ".backup backups/mm-services-$stamp.db"
tar -czf "backups/uploads-$stamp.tar.gz" -C data uploads
find backups -type f -mtime +14 -delete
