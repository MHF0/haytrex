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

## Deploy to a Hostinger VPS

Plan: **KVM 1** is plenty. At checkout choose **Ubuntu 24.04** (plain, no control panel) and a
**US data center**. Set a root password or SSH key; Hostinger shows the server's IP address in hPanel.

### 1. Prepare the server (one time)

SSH in (`ssh root@YOUR_SERVER_IP`), then:

```bash
apt update && apt upgrade -y
apt install -y nginx git sqlite3 certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2

adduser --disabled-password --gecos "" mm     # app runs as this user, not root
ufw allow OpenSSH && ufw allow "Nginx Full" && ufw --force enable
```

### 2. Get the code

The repository is private, so give the server read access with a deploy key:

```bash
su - mm
ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
```

Add that key on GitHub: **MHF0/haytrex → Settings → Deploy keys → Add deploy key** (read-only). Then:

```bash
git clone git@github.com:MHF0/haytrex.git
cd haytrex/mm-services-backend
npm ci --omit=dev
cp .env.example .env
nano .env        # ADMIN_PASSWORD, SESSION_SECRET (openssl rand -hex 32), SMTP settings
```

### 3. Start the app

Still as `mm`:

```bash
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup      # prints one command: run it as root so the app starts on reboot
```

### 4. Point the domain at the server (Squarespace)

In Squarespace: **Domains → mmsvcs.com → DNS settings**. Edit only the website records:

| Type | Host | Value |
|---|---|---|
| A | @ | YOUR_SERVER_IP |
| A | www | YOUR_SERVER_IP |

Remove any other A, AAAA or CNAME records for `@` and `www`.
**Do not touch MX or TXT records** — those deliver the info@mmsvcs.com email.

### 5. Nginx and HTTPS

As root, once the DNS change has taken effect (`ping mmsvcs.com` shows your server's IP):

```bash
cp /home/mm/haytrex/mm-services-backend/deploy/nginx-mmsvcs.conf /etc/nginx/sites-available/mmsvcs.conf
ln -s /etc/nginx/sites-available/mmsvcs.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
certbot --nginx -d mmsvcs.com -d www.mmsvcs.com --redirect
```

The site is now live at https://mmsvcs.com and the dashboard at https://mmsvcs.com/admin.
(The admin login cookie requires HTTPS, so log in only after this step.)

### 6. Backups

As `mm`, run `crontab -e` and add:

```
30 3 * * * /home/mm/haytrex/mm-services-backend/deploy/backup.sh
```

This saves the database and resumes to `backups/` every night and keeps 14 days. Also turn on
Hostinger's weekly snapshots in hPanel.

## Updating the site later

```bash
su - mm
cd haytrex && git pull
cd mm-services-backend && npm ci --omit=dev
pm2 restart mm-services
```

## Configuration

All settings live in `.env`; see `.env.example` for the full list. If SMTP isn't configured,
submissions are still saved and appear in the dashboard, they just aren't emailed.
