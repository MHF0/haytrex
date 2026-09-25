import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

export const STATUSES = ["new", "contacted", "closed"];

const SCHEMA = `
CREATE TABLE IF NOT EXISTS quote_requests (
  id         INTEGER PRIMARY KEY,
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  name       TEXT    NOT NULL,
  phone      TEXT    NOT NULL,
  email      TEXT    NOT NULL,
  service    TEXT    NOT NULL,
  message    TEXT    NOT NULL,
  status     TEXT    NOT NULL DEFAULT 'new',
  ip         TEXT
);

CREATE TABLE IF NOT EXISTS job_applications (
  id          INTEGER PRIMARY KEY,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  name        TEXT    NOT NULL,
  phone       TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  position    TEXT    NOT NULL,
  message     TEXT    NOT NULL DEFAULT '',
  resume_file TEXT,
  resume_name TEXT,
  status      TEXT    NOT NULL DEFAULT 'new',
  ip          TEXT
);
`;

const TABLES = { quote: "quote_requests", application: "job_applications" };

export function openDatabase(dataDir) {
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new DatabaseSync(path.join(dataDir, "mm-services.db"));
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec(SCHEMA);

  const insertQuote = db.prepare(`
    INSERT INTO quote_requests (name, phone, email, service, message, ip)
    VALUES (:name, :phone, :email, :service, :message, :ip)`);
  const insertApplication = db.prepare(`
    INSERT INTO job_applications (name, phone, email, position, message, resume_file, resume_name, ip)
    VALUES (:name, :phone, :email, :position, :message, :resume_file, :resume_name, :ip)`);

  return {
    addQuote(q) {
      return Number(insertQuote.run(q).lastInsertRowid);
    },
    addApplication(a) {
      return Number(insertApplication.run(a).lastInsertRowid);
    },
    listQuotes() {
      return db.prepare("SELECT * FROM quote_requests ORDER BY id DESC").all();
    },
    listApplications() {
      return db.prepare("SELECT * FROM job_applications ORDER BY id DESC").all();
    },
    getApplication(id) {
      return db.prepare("SELECT * FROM job_applications WHERE id = ?").get(id);
    },
    setStatus(kind, id, status) {
      const table = TABLES[kind];
      if (!table || !STATUSES.includes(status)) return false;
      return db.prepare(`UPDATE ${table} SET status = ? WHERE id = ?`).run(status, id).changes > 0;
    },
    close() {
      db.close();
    },
  };
}
