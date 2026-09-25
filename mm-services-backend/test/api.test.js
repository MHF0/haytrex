import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadConfig } from "../src/config.js";
import { openDatabase } from "../src/db.js";
import { createApp } from "../src/server.js";

const quiet = { warn() {}, error() {}, log() {} };
let server, base, db, dataDir;
const sent = [];

before(async () => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "mm-test-"));
  const config = loadConfig({ DATA_DIR: dataDir, ADMIN_PASSWORD: "test-pass", SESSION_SECRET: "s3cret" });
  db = openDatabase(dataDir);
  const mailer = { async notify(m) { sent.push(m); } };
  server = createApp(config, { db, mailer, log: quiet }).listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
  db.close();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

const form = (fields) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
};

const goodQuote = {
  name: "Sarah Miller",
  phone: "(713) 555-0142",
  email: "sarah@example.com",
  service: "Plumbing",
  message: "Kitchen sink is leaking under the cabinet.",
};

async function login() {
  const res = await fetch(`${base}/admin/login`, {
    method: "POST",
    body: new URLSearchParams({ password: "test-pass" }),
    redirect: "manual",
  });
  assert.equal(res.status, 303);
  return res.headers.get("set-cookie").split(";")[0];
}

test("serves the website", async () => {
  const res = await fetch(`${base}/`);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /MM Services/);
  assert.equal((await fetch(`${base}/contact`)).status, 200);
});

test("health check", async () => {
  assert.deepEqual(await (await fetch(`${base}/api/health`)).json(), { ok: true });
});

test("stores a valid quote request and sends a notification", async () => {
  const res = await fetch(`${base}/api/quotes`, { method: "POST", body: form(goodQuote) });
  assert.equal(res.status, 201);
  const saved = db.listQuotes().find((q) => q.email === goodQuote.email);
  assert.equal(saved.service, "Plumbing");
  assert.equal(saved.status, "new");
  assert.match(sent.at(-1).subject, /Plumbing — Sarah Miller/);
});

test("rejects an invalid quote with per-field errors", async () => {
  const res = await fetch(`${base}/api/quotes`, {
    method: "POST",
    body: form({ name: "S", phone: "12", email: "nope", service: "Roofing", message: "" }),
  });
  assert.equal(res.status, 400);
  const { errors } = await res.json();
  assert.deepEqual(Object.keys(errors).sort(), ["email", "message", "name", "phone", "service"]);
});

test("silently drops honeypot submissions", async () => {
  const before = db.listQuotes().length;
  const res = await fetch(`${base}/api/quotes`, { method: "POST", body: form({ ...goodQuote, website: "spam.biz" }) });
  assert.equal(res.status, 200);
  assert.equal(db.listQuotes().length, before);
});

test("stores a job application with a resume", async () => {
  const fd = form({ name: "James Reed", phone: "281-555-0199", email: "james@example.com", position: "Electrical Technician", message: "5 years residential." });
  fd.append("resume", new Blob(["%PDF-1.4 test"], { type: "application/pdf" }), "James Resume.pdf");
  const res = await fetch(`${base}/api/applications`, { method: "POST", body: fd });
  assert.equal(res.status, 201);
  const saved = db.listApplications().find((a) => a.email === "james@example.com");
  assert.equal(saved.resume_name, "James Resume.pdf");
  assert.ok(fs.existsSync(path.join(dataDir, "uploads", saved.resume_file)));
});

test("rejects resumes that are not PDF or Word", async () => {
  const fd = form({ name: "Bad File", phone: "281-555-0100", email: "bad@example.com", position: "Landscaping Crew" });
  fd.append("resume", new Blob(["MZ"]), "virus.exe");
  const res = await fetch(`${base}/api/applications`, { method: "POST", body: fd });
  assert.equal(res.status, 400);
  assert.match((await res.json()).errors.resume, /PDF or Word/);
});

test("admin dashboard requires a login", async () => {
  const res = await fetch(`${base}/admin`, { redirect: "manual" });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get("location"), "/admin/login");
  const wrong = await fetch(`${base}/admin/login`, { method: "POST", body: new URLSearchParams({ password: "guess" }) });
  assert.equal(wrong.status, 401);
});

test("admin sees submissions with untrusted text escaped", async () => {
  await fetch(`${base}/api/quotes`, {
    method: "POST",
    body: form({ ...goodQuote, email: "x@example.com", message: "<script>alert(1)</script> fix my door" }),
  });
  const cookie = await login();
  const html = await (await fetch(`${base}/admin`, { headers: { cookie } })).text();
  assert.match(html, /Sarah Miller/);
  assert.match(html, /James Reed/);
  assert.ok(!html.includes("<script>alert(1)</script>"));
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test("admin can update a status and download a resume", async () => {
  const cookie = await login();
  const quote = db.listQuotes()[0];
  const res = await fetch(`${base}/admin/quote/${quote.id}/status`, {
    method: "POST",
    headers: { cookie },
    body: new URLSearchParams({ status: "contacted" }),
    redirect: "manual",
  });
  assert.equal(res.status, 303);
  assert.equal(db.listQuotes()[0].status, "contacted");

  const app = db.listApplications().find((a) => a.resume_file);
  const file = await fetch(`${base}/admin/applications/${app.id}/resume`, { headers: { cookie } });
  assert.equal(file.status, 200);
  assert.match(file.headers.get("content-disposition"), /James Resume\.pdf/);
});
