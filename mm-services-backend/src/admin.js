import path from "node:path";
import express from "express";
import rateLimit from "express-rate-limit";
import { STATUSES } from "./db.js";

const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const houstonTime = (utc) =>
  new Date(`${utc.replace(" ", "T")}Z`).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });

const STYLE = `
  :root { --ink:#16324a; --slate:#52708a; --sky:#1467a6; --line:#d8ecf8; --flame:#F58A1F; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: "Segoe UI", Arial, sans-serif; color:var(--ink); background:#f6fafd; }
  header { background:#fff; border-bottom:3px solid var(--flame); padding:14px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
  header img { height:44px; }
  header h1 { font-size:1.1rem; margin:0; text-transform:uppercase; letter-spacing:.08em; font-style:italic; }
  main { max-width:1200px; margin:0 auto; padding:24px; }
  h2 { font-style:italic; text-transform:uppercase; margin:32px 0 12px; }
  .pill { display:inline-block; background:var(--flame); color:#fff; border-radius:999px; padding:1px 10px; font-size:.8rem; margin-left:8px; vertical-align:middle; }
  .table-wrap { overflow-x:auto; background:#fff; border:1px solid var(--line); border-radius:10px; }
  table { border-collapse:collapse; width:100%; font-size:.92rem; }
  th, td { text-align:left; padding:10px 12px; border-bottom:1px solid var(--line); vertical-align:top; }
  th { background:#eaf4fb; font-size:.78rem; text-transform:uppercase; letter-spacing:.06em; color:var(--slate); }
  tr.is-new td:first-child { border-left:4px solid var(--flame); }
  td.msg { max-width:360px; white-space:pre-wrap; }
  a { color:var(--sky); }
  form.inline { display:flex; gap:6px; }
  select, input, button { font:inherit; padding:6px 10px; border:1px solid #b5dcf3; border-radius:6px; background:#fff; }
  button { background:var(--sky); color:#fff; border-color:var(--sky); cursor:pointer; }
  .empty { padding:18px; color:var(--slate); }
  .login { max-width:360px; margin:10vh auto; background:#fff; border:1px solid var(--line); border-top:4px solid var(--flame); border-radius:12px; padding:28px; display:flex; flex-direction:column; gap:12px; }
  .error { color:#b42318; font-weight:600; }
`;

function page(title, body, { loggedIn = false } = {}) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><title>${esc(title)} — MM Services Admin</title><style>${STYLE}</style></head>
<body><header><a href="/admin"><img src="/assets/logo.png" alt="MM Services"></a><h1>${esc(title)}</h1>
${loggedIn ? '<form method="post" action="/admin/logout"><button type="submit">Log out</button></form>' : "<span></span>"}
</header><main>${body}</main></body></html>`;
}

function statusForm(kind, row) {
  const options = STATUSES.map(
    (s) => `<option value="${s}"${s === row.status ? " selected" : ""}>${s[0].toUpperCase() + s.slice(1)}</option>`,
  ).join("");
  return `<form class="inline" method="post" action="/admin/${kind}/${row.id}/status">
    <select name="status" aria-label="Status">${options}</select><button type="submit">Save</button></form>`;
}

function contactCells(row) {
  return `<td><strong>${esc(row.name)}</strong></td>
    <td><a href="tel:${esc(row.phone)}">${esc(row.phone)}</a><br><a href="mailto:${esc(row.email)}">${esc(row.email)}</a></td>`;
}

function quotesTable(rows) {
  if (!rows.length) return '<div class="table-wrap"><p class="empty">No quote requests yet.</p></div>';
  const body = rows
    .map(
      (r) => `<tr class="${r.status === "new" ? "is-new" : ""}">
        <td>${esc(houstonTime(r.created_at))}</td>${contactCells(r)}
        <td>${esc(r.service)}</td><td class="msg">${esc(r.message)}</td><td>${statusForm("quote", r)}</td></tr>`,
    )
    .join("");
  return `<div class="table-wrap"><table><thead><tr><th>Received</th><th>Name</th><th>Contact</th><th>Service</th><th>Job</th><th>Status</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function applicationsTable(rows) {
  if (!rows.length) return '<div class="table-wrap"><p class="empty">No job applications yet.</p></div>';
  const body = rows
    .map(
      (r) => `<tr class="${r.status === "new" ? "is-new" : ""}">
        <td>${esc(houstonTime(r.created_at))}</td>${contactCells(r)}
        <td>${esc(r.position)}</td><td class="msg">${esc(r.message)}</td>
        <td>${r.resume_file ? `<a href="/admin/applications/${r.id}/resume">${esc(r.resume_name || "Resume")}</a>` : "&mdash;"}</td>
        <td>${statusForm("application", r)}</td></tr>`,
    )
    .join("");
  return `<div class="table-wrap"><table><thead><tr><th>Received</th><th>Name</th><th>Contact</th><th>Position</th><th>Experience</th><th>Resume</th><th>Status</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

export function createAdminRouter({ db, auth, uploadsDir }) {
  const router = express.Router();
  router.use(express.urlencoded({ extended: false, limit: "10kb" }));

  const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false });

  const loginPage = (error = "") =>
    page(
      "Admin login",
      auth.enabled
        ? `<form class="login" method="post" action="/admin/login">
            <label for="pw">Password</label><input id="pw" type="password" name="password" autocomplete="current-password" required autofocus>
            ${error ? `<p class="error">${esc(error)}</p>` : ""}<button type="submit">Log in</button></form>`
        : '<p class="login">The admin area is turned off. Set ADMIN_PASSWORD in the server\'s .env file and restart.</p>',
    );

  router.get("/login", (req, res) => res.send(loginPage()));

  router.post("/login", loginLimiter, (req, res) => {
    if (!auth.checkPassword(req.body.password)) return res.status(401).send(loginPage("Wrong password. Try again."));
    auth.startSession(res);
    res.redirect(303, "/admin");
  });

  router.post("/logout", (req, res) => {
    auth.endSession(res);
    res.redirect(303, "/admin/login");
  });

  router.use((req, res, next) => (auth.isLoggedIn(req) ? next() : res.redirect(303, "/admin/login")));

  router.get("/", (req, res) => {
    const quotes = db.listQuotes();
    const apps = db.listApplications();
    const badge = (rows) => {
      const n = rows.filter((r) => r.status === "new").length;
      return n ? `<span class="pill">${n} new</span>` : "";
    };
    res.send(
      page(
        "Dashboard",
        `<h2 id="quotes">Quote requests${badge(quotes)}</h2>${quotesTable(quotes)}
         <h2 id="applications">Job applications${badge(apps)}</h2>${applicationsTable(apps)}`,
        { loggedIn: true },
      ),
    );
  });

  router.post("/:kind/:id/status", (req, res) => {
    const { kind } = req.params;
    if (!db.setStatus(kind, Number(req.params.id), req.body.status)) return res.status(400).send("Unknown item or status.");
    res.redirect(303, `/admin#${kind === "quote" ? "quotes" : "applications"}`);
  });

  router.get("/applications/:id/resume", (req, res) => {
    const app = db.getApplication(Number(req.params.id));
    if (!app?.resume_file) return res.status(404).send("No resume on file.");
    res.download(path.join(uploadsDir, path.basename(app.resume_file)), app.resume_name || "resume");
  });

  return router;
}
