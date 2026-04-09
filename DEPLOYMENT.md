# FaithHaven AI — Production Deployment Guide

This document covers deploying FaithHaven AI on a **Webdock Ubuntu VPS** using Docker Compose with Caddy (automatic TLS), PostgreSQL, and the Node.js API.

## Prerequisites

| Requirement | Version |
|---|---|
| Docker Engine | ≥ 24 |
| Docker Compose | ≥ 2.20 |
| Domain DNS | A record for `faithhaven.amarktai.com` → VPS IP |

---

## 1. Clone and configure

```bash
ssh root@<vps-ip>
git clone https://github.com/amarktainetwork-blip/faithhaven-ai.git /opt/faithhaven
cd /opt/faithhaven
```

### 1a. Create `.env.backend`

```bash
cp .env.backend.example .env.backend
```

Edit `.env.backend` and fill in **all required values**:

| Variable | Notes |
|---|---|
| `JWT_SECRET` | `openssl rand -hex 32` |
| `POSTGRES_PASSWORD` | `openssl rand -hex 16` |
| `COOKIE_DOMAIN` | `faithhaven.amarktai.com` |
| `CORS_ORIGIN` | `https://faithhaven.amarktai.com` |
| `PAYFAST_MERCHANT_ID` | From PayFast dashboard |
| `PAYFAST_MERCHANT_KEY` | From PayFast dashboard |
| `PAYFAST_PASSPHRASE` | From PayFast dashboard |
| `OPENAI_API_KEY` | Optional — KJV fallback when absent |

### 1b. Create `.env.frontend`

```bash
cp .env.frontend.example .env.frontend
```

Ensure `VITE_API_URL=https://faithhaven.amarktai.com`.

---

## 2. Build and start

```bash
# Production topology (Caddy + API + Postgres)
docker compose -f docker-compose.prod.yml up -d --build
```

Caddy automatically obtains TLS certificates from Let's Encrypt.

### Verify

```bash
# Health check
curl https://faithhaven.amarktai.com/health

# Logs
docker compose -f docker-compose.prod.yml logs -f
```

---

## 3. Database migrations

On first boot, PostgreSQL runs `backend/migrations/001_initial_schema.sql` automatically via `docker-entrypoint-initdb.d`.

For subsequent migrations, add numbered SQL files (e.g. `002_add_column.sql`) and run:

```bash
docker compose -f docker-compose.prod.yml exec db psql -U faithhaven -d faithhaven -f /docker-entrypoint-initdb.d/002_add_column.sql
```

---

## 4. Backups

### Automated daily backup (cron)

```bash
# Add to crontab:
0 2 * * * docker compose -f /opt/faithhaven/docker-compose.prod.yml exec -T db pg_dump -U faithhaven faithhaven | gzip > /opt/faithhaven/backups/faithhaven_$(date +\%Y\%m\%d).sql.gz
```

### Manual backup

```bash
mkdir -p /opt/faithhaven/backups
docker compose -f docker-compose.prod.yml exec -T db pg_dump -U faithhaven faithhaven | gzip > backups/faithhaven_$(date +%Y%m%d_%H%M%S).sql.gz
```

### Restore

```bash
gunzip < backups/faithhaven_20260409.sql.gz | docker compose -f docker-compose.prod.yml exec -T db psql -U faithhaven -d faithhaven
```

---

## 5. Updates and rollback

### Deploy new version

```bash
cd /opt/faithhaven
git pull origin master
docker compose -f docker-compose.prod.yml up -d --build
```

### Rollback

```bash
git log --oneline -5
git checkout <previous-commit>
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 6. Environment variable reference

### Frontend (build-time, public)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

### Backend (runtime, secret)

| Variable | Required | Description |
|---|---|---|
| `JWT_SECRET` | ✅ | Secret for signing session tokens |
| `COOKIE_DOMAIN` | ✅ | Cookie domain (`faithhaven.amarktai.com`) |
| `CORS_ORIGIN` | ✅ | Allowed origins (comma-separated) |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `POSTGRES_PASSWORD` | ✅ | Postgres user password |
| `PAYFAST_MERCHANT_ID` | ✅ | PayFast merchant ID |
| `PAYFAST_MERCHANT_KEY` | ✅ | PayFast merchant key |
| `PAYFAST_PASSPHRASE` | ✅ | PayFast passphrase |
| `OPENAI_API_KEY` | ❌ | Optional — falls back to KJV Bible responses |
| `NODE_ENV` | ✅ | Must be `production` |

---

## 7. Monitoring

- **Health endpoint**: `GET /health` returns `200 OK` with uptime
- **Structured logging**: All backend logs are JSON (`stdout/stderr`), suitable for Loki, Datadog, or any log aggregator
- Docker health checks are configured for both API and database containers

---

## 8. Security checklist

- [ ] `JWT_SECRET` is a random 32+ byte hex string (not `change-me`)
- [ ] `POSTGRES_PASSWORD` is strong and unique
- [ ] `.env.backend` is NOT committed to git
- [ ] PayFast is set to production endpoint (`www.payfast.co.za`)
- [ ] Firewall allows only ports 80, 443, 22
- [ ] SSH key-based auth only (no password auth)
- [ ] Automatic security updates enabled (`unattended-upgrades`)
