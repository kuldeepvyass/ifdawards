# Deploying IFDA to Hostinger VPS

This guide covers deploying the **frontend-only** build to Hostinger VPS and how to push updates from your local machine.

---

## 1. One-time VPS setup (Hostinger)

### 1.1 Connect to your VPS

- In Hostinger hPanel: **VPS** → your VPS → **SSH Access** (note IP, username, port).
- From your Mac terminal:
  ```bash
  ssh root@YOUR_VPS_IP -p 22
  ```
  (Use the port shown in Hostinger if different.)

### 1.2 Install Nginx and Node (optional for later backend)

```bash
# Update system
apt update && apt upgrade -y

# Nginx (to serve the static frontend)
apt install nginx -y

# Optional: Node.js (for when you add the backend)
# curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
# apt install -y nodejs
```

### 1.3 Create a user and folder for the site (recommended)

```bash
adduser ifda
usermod -aG www-data ifda
mkdir -p /var/www/ifda
chown -R ifda:www-data /var/www/ifda
```

---

## 2. Nginx config (SPA + static files)

Create a site config so Nginx serves the `dist` folder and sends all routes to `index.html` (for React Router):

```bash
nano /etc/nginx/sites-available/ifda
```

Paste (replace `yourdomain.com` with your real domain or use server IP for testing):

```nginx
server {
    listen 80;
    server_name ifdawards.com www.ifdawards.com;
    root /var/www/ifda;
    index index.html;

    # SPA: all routes → index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

Enable the site and reload Nginx:

```bash
ln -s /etc/nginx/sites-available/ifda /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

---

## 3. SSL (HTTPS) with Let’s Encrypt

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d ifdawards.com -d www.ifdawards.com
```

Follow prompts. Certbot will adjust Nginx for HTTPS. Renewal is automatic.

---

## 4. Deploy from your Mac (push updates from here)

You build locally and upload only the `dist` folder. No need to install Node on the VPS for the frontend.

### Option A: Deploy with rsync (recommended)

1. **On your Mac**, in the project folder:
   ```bash
   npm run build
   ```
2. **Upload `dist` to the VPS** (replace with your IP/user/path):
   ```bash
   rsync -avz --delete dist/ root@YOUR_VPS_IP:/var/www/ifda/
   ```
   Or with a non-root user:
   ```bash
   rsync -avz --delete dist/ ifda@YOUR_VPS_IP:/var/www/ifda/
   ```
   `--delete` removes old files on the server so the site matches your latest build.

3. **If you use a key file:**
   ```bash
   rsync -avz --delete -e "ssh -i ~/.ssh/your_key" dist/ root@YOUR_VPS_IP:/var/www/ifda/
   ```

### Option B: Deploy with a simple script

Create `deploy.sh` in the project root (already added below). Then:

```bash
chmod +x deploy.sh
./deploy.sh
```

You’ll be prompted once for your VPS host; the script builds and uploads `dist/`.

### Option C: Git-based (optional)

If you prefer to build on the server:

1. On VPS, clone the repo into e.g. `/var/www/ifda-app`.
2. On each update, from your Mac:
   ```bash
   git push origin main
   ```
3. On VPS, SSH in and run:
   ```bash
   cd /var/www/ifda-app && git pull && npm ci && npm run build && cp -r dist/* /var/www/ifda/
   ```
   This requires Node/npm on the VPS.

---

## 5. Quick reference: your usual update flow

From your Mac, every time you want to go live with changes:

```bash
cd "/Users/kuldeepvyas/Desktop/Home Page for IFDA"
npm run build
rsync -avz --delete dist/ root@YOUR_VPS_IP:/var/www/ifda/
```

No server restart needed; Nginx serves the new files immediately.

---

## 6. When you add the backend later

- Run the Node server (e.g. with PM2) on a port (e.g. 5000).
- In Nginx, add a `location /api/` that proxies to that port.
- Keep serving the frontend from `/var/www/ifda` as above.
- Use `VITE_API_URL` (or similar) in the frontend for API base URL and set it at build time.

---

## 7. Troubleshooting

| Issue | Check |
|-------|--------|
| 502 / blank page | Nginx config path: `root /var/www/ifda` and files exist in `/var/www/ifda`. |
| 404 on refresh (e.g. `/about`) | Nginx must have `try_files $uri $uri/ /index.html;`. |
| Old content after deploy | Run rsync with `--delete`; clear browser cache. |
| Permission denied | `chown -R www-data:www-data /var/www/ifda` and `chmod -R 755 /var/www/ifda`. |

---

## 8. Test production build locally

Before deploying:

```bash
npm run build
npm run preview
```

Open http://localhost:4173 and click through routes to confirm everything works.
