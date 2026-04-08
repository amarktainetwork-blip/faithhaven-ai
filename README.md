# FaithHaven AI

FaithHaven AI is a React + TypeScript + Vite web app for faith-based community, devotionals, journaling, and guided content.

## Production baseline included

This repository now includes:
- Dockerized frontend build/runtime (`Dockerfile`)
- Dockerized backend API (`backend/Dockerfile`)
- Nginx SPA config with security headers (`nginx.conf`)
- Webdock-friendly compose setup (`docker-compose.yml`)
- Environment variable template (`.env.example`)

## Requirements

- Node.js 20+
- npm 10+
- Docker + Docker Compose (for VPS deployment)

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Deploy to Webdock VPS (easy path)

1. Copy project to your VPS.
2. Create `.env.production` from `.env.example` and fill values.
3. Run:

```bash
docker compose --env-file .env.production up -d --build
```

4. Point your domain DNS to VPS IP.
5. Put this app behind your TLS terminator (Webdock LB, Caddy, or host-level Nginx/Traefik).

## PayFast integration notes

This frontend includes settings placeholders for PayFast credentials, but production payments must be done server-side.

Minimum backend requirements:
- Signed payment request generation
- ITN endpoint validation (signature + source/IP verification)
- Idempotent transaction state updates
- Subscription reconciliation and audit logging

## Scripts

- `npm run dev` – local dev server
- `npm run lint` – lint checks
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run launch:check` – strict go-live gate check (pass/fail summary)


## CI/CD

- `.github/workflows/ci.yml` runs lint + build on push/PR.
- `.github/workflows/deploy-webdock.yml` provides a Webdock SSH deploy template for `main`.

Required GitHub secrets:
- `WEBDOCK_HOST`
- `WEBDOCK_USER`
- `WEBDOCK_SSH_KEY`

## Important production note

This repo includes a real backend service with auth, AI chat, and PayFast flows backed by embedded SQLite persistence.
Public launch still requires managed production DB migration, full test coverage, and full ops hardening.


## Backend API

A backend service now exists under `backend/` with:
- JWT auth endpoints (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- Auth hardening endpoints (`/api/auth/verify-email`, `/api/auth/request-password-reset`, `/api/auth/reset-password`, `/api/auth/logout-all`)
- AI chat endpoint (`/api/ai/chat`) with OpenAI support + Bible fallback
- PayFast endpoints (`/api/payfast/create-checkout`, `/api/payfast/itn`)
- Admin/reliability endpoints (`/api/payfast/reconcile`, `/api/admin/audit-logs`)
- Health endpoint (`/health`)
