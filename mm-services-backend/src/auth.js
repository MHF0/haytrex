import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "mm_admin";
const SESSION_HOURS = 12;

function sha256(value) {
  return createHash("sha256").update(value).digest();
}

function sign(payload, secret) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function readCookie(req, name) {
  const header = req.headers.cookie || "";
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export function createAuth({ adminPassword, sessionSecret, production }) {
  const cookieFlags = `Path=/admin; HttpOnly; SameSite=Strict${production ? "; Secure" : ""}`;

  return {
    enabled: Boolean(adminPassword),

    checkPassword(input) {
      if (!adminPassword || typeof input !== "string") return false;
      return timingSafeEqual(sha256(input), sha256(adminPassword));
    },

    startSession(res) {
      const expires = Date.now() + SESSION_HOURS * 3600 * 1000;
      const token = `${expires}.${sign(String(expires), sessionSecret)}`;
      res.setHeader("Set-Cookie", `${COOKIE}=${token}; Max-Age=${SESSION_HOURS * 3600}; ${cookieFlags}`);
    },

    endSession(res) {
      res.setHeader("Set-Cookie", `${COOKIE}=; Max-Age=0; ${cookieFlags}`);
    },

    isLoggedIn(req) {
      const token = readCookie(req, COOKIE);
      if (!token) return false;
      const [expires, sig] = token.split(".");
      if (!expires || !sig || Number(expires) < Date.now()) return false;
      const expected = Buffer.from(sign(expires, sessionSecret));
      const given = Buffer.from(sig);
      return given.length === expected.length && timingSafeEqual(given, expected);
    },
  };
}
