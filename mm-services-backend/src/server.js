import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import express from "express";
import helmet from "helmet";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { loadConfig } from "./config.js";
import { openDatabase } from "./db.js";
import { createMailer } from "./mailer.js";
import { createAuth } from "./auth.js";
import { createAdminRouter } from "./admin.js";
import { validateQuote, validateApplication, isSpam } from "./validate.js";

const RESUME_TYPES = new Set([".pdf", ".doc", ".docx"]);
const MAX_RESUME_MB = 5;

class BadUpload extends Error {}

export function createApp(config, { db, mailer, log = console }) {
  const uploadsDir = path.join(config.dataDir, "uploads");
  fs.mkdirSync(uploadsDir, { recursive: true });

  const auth = createAuth(config);
  if (!auth.enabled) log.warn("Admin dashboard is off: set ADMIN_PASSWORD to enable it.");

  const app = express();
  app.set("trust proxy", config.trustProxy);
  app.disable("x-powered-by");
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "frame-src": ["https://www.google.com"],
          "upgrade-insecure-requests": null,
        },
      },
    }),
  );

  const submitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { ok: false, error: "Too many submissions. Please call us at (844) 620-0012." },
  });

  const noFiles = multer().none();
  const resumeUpload = multer({
    storage: multer.diskStorage({
      destination: uploadsDir,
      filename: (req, file, cb) => cb(null, randomUUID() + path.extname(file.originalname).toLowerCase()),
    }),
    limits: { fileSize: MAX_RESUME_MB * 1024 * 1024, files: 1, fields: 20 },
    fileFilter: (req, file, cb) =>
      RESUME_TYPES.has(path.extname(file.originalname).toLowerCase())
        ? cb(null, true)
        : cb(new BadUpload("Resume must be a PDF or Word document.")),
  }).single("resume");

  const api = express.Router();
  api.use(express.json({ limit: "20kb" }), express.urlencoded({ extended: false, limit: "20kb" }));

  api.get("/health", (req, res) => res.json({ ok: true }));

  api.post("/quotes", submitLimiter, noFiles, (req, res) => {
    if (isSpam(req.body)) return res.json({ ok: true });
    const { value, errors } = validateQuote(req.body);
    if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

    const id = db.addQuote({ ...value, ip: req.ip });
    res.status(201).json({ ok: true, id });
    mailer.notify({
      subject: `New quote request — ${value.service} — ${value.name}`,
      replyTo: value.email,
      text: `Name: ${value.name}\nPhone: ${value.phone}\nEmail: ${value.email}\nService: ${value.service}\n\n${value.message}\n\nSee all requests: /admin`,
    });
  });

  api.post("/applications", submitLimiter, resumeUpload, (req, res) => {
    const discardUpload = () => req.file && fs.rm(req.file.path, { force: true }, () => {});
    if (isSpam(req.body)) {
      discardUpload();
      return res.json({ ok: true });
    }
    const { value, errors } = validateApplication(req.body);
    if (Object.keys(errors).length) {
      discardUpload();
      return res.status(400).json({ ok: false, errors });
    }

    const id = db.addApplication({
      ...value,
      resume_file: req.file?.filename ?? null,
      resume_name: req.file?.originalname.slice(0, 200) ?? null,
      ip: req.ip,
    });
    res.status(201).json({ ok: true, id });
    mailer.notify({
      subject: `New job application — ${value.position} — ${value.name}`,
      replyTo: value.email,
      text: `Name: ${value.name}\nPhone: ${value.phone}\nEmail: ${value.email}\nPosition: ${value.position}\nResume attached on site: ${req.file ? "yes" : "no"}\n\n${value.message}\n\nSee all applications: /admin`,
    });
  });

  api.use((req, res) => res.status(404).json({ ok: false, error: "Not found." }));

  app.use("/api", api);
  app.use("/admin", createAdminRouter({ db, auth, uploadsDir }));
  app.use(express.static(config.siteDir, { extensions: ["html"] }));
  app.use((req, res) => res.status(404).sendFile(path.join(config.siteDir, "index.html")));

  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err instanceof BadUpload) {
      const message = err.code === "LIMIT_FILE_SIZE" ? `Resume must be under ${MAX_RESUME_MB} MB.` : err.message;
      return res.status(400).json({ ok: false, errors: { resume: message } });
    }
    log.error(err);
    if (res.headersSent) return next(err);
    res.status(500).json({ ok: false, error: "Something went wrong. Please call us at (844) 620-0012." });
  });

  return app;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = loadConfig();
  const db = openDatabase(config.dataDir);
  const app = createApp(config, { db, mailer: createMailer(config) });
  app.listen(config.port, config.host, () => {
    console.log(`MM Services running at http://${config.host}:${config.port} (site: ${config.siteDir})`);
  });
}
