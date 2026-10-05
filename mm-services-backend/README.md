# MM Services — backend

Node.js server for the MM Services LLC website. It:

- serves the website in `../mm-services-website`
- saves **quote requests** (`POST /api/quotes`) and **job applications with resumes**
  (`POST /api/applications`) to a SQLite database
- emails each new submission to `NOTIFY_EMAIL`
- has a password-protected **admin dashboard** at `/admin` to review submissions,
  download resumes and mark items new / contacted / closed

It has no database server to install: SQLite is built into Node 22 and stores everything in
`data/mm-services.db`, with uploaded resumes in `data/uploads/`. Spam protection is a hidden
honeypot field plus rate limiting (10 submissions per 15 minutes per visitor).

## Run it locally

```bash
cd mm-services-backend
npm install
cp .env.example .env        # set ADMIN_PASSWORD; leave NODE_ENV unset locally
npm start                   # http://127.0.0.1:3000
npm test
```

## Deploy

Full step-by-step setup for the Hostinger VPS, automatic deploys from GitHub, backups and
troubleshooting: see [`../DEPLOYMENT.md`](../DEPLOYMENT.md).

## Configuration

All settings live in `.env`; see `.env.example` for the full list. If SMTP isn't configured,
submissions are still saved and appear in the dashboard, they just aren't emailed.
