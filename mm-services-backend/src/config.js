import path from "node:path";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function loadConfig(env = process.env) {
  const production = env.NODE_ENV === "production";

  let sessionSecret = env.SESSION_SECRET;
  if (!sessionSecret) {
    if (production) throw new Error("SESSION_SECRET must be set in production (see .env.example).");
    sessionSecret = randomBytes(32).toString("hex");
  }

  const smtpPort = Number(env.SMTP_PORT || 465);

  return {
    production,
    port: Number(env.PORT || 3000),
    host: env.HOST || "127.0.0.1",
    // Number of reverse proxies in front of the app (1 behind Nginx), so client IPs are read correctly.
    trustProxy: Number(env.TRUST_PROXY || 0),
    siteDir: path.resolve(backendRoot, env.SITE_DIR || "../mm-services-website"),
    dataDir: path.resolve(backendRoot, env.DATA_DIR || "./data"),
    adminPassword: env.ADMIN_PASSWORD || "",
    sessionSecret,
    notifyEmail: env.NOTIFY_EMAIL || "",
    smtp: env.SMTP_HOST
      ? {
          host: env.SMTP_HOST,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS || "" } : undefined,
          from: env.SMTP_FROM || env.SMTP_USER || env.NOTIFY_EMAIL,
        }
      : null,
  };
}
