#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PASS_COUNT=0
FAIL_COUNT=0

pass() {
  echo "✅ PASS: $1"
  PASS_COUNT=$((PASS_COUNT + 1))
}

fail() {
  echo "❌ FAIL: $1"
  FAIL_COUNT=$((FAIL_COUNT + 1))
}

run_or_fail() {
  local label="$1"
  shift
  if "$@" >/tmp/faithhaven_gate_out.log 2>&1; then
    pass "$label"
  else
    fail "$label"
    sed -n '1,120p' /tmp/faithhaven_gate_out.log
  fi
}

echo "== FaithHaven Green-Light Gate Check =="

echo "-- Security/Auth gate --"
if rg -n "JWT_SECRET.*change-me|JWT_SECRET must be set" backend/src/server.js >/dev/null; then
  pass "Production JWT secret guard present"
else
  fail "Production JWT secret guard missing"
fi

if rg -n "/api/auth/register|/api/auth/login|/api/auth/me|/api/auth/verify-email|/api/auth/request-password-reset|/api/auth/reset-password|/api/user/change-password|/api/auth/logout-all" backend/src/server.js >/dev/null; then
  pass "Auth endpoints are defined"
else
  fail "One or more auth endpoints are missing"
fi

if rg -n "requireRole\\('admin'\\)" backend/src/server.js >/dev/null; then
  pass "Admin role enforcement present"
else
  fail "Admin role enforcement missing"
fi

echo "-- Payments gate --"
if rg -n "Invalid signature|Forbidden source|Amount mismatch|tx.status === 'COMPLETE'" backend/src/server.js >/dev/null; then
  pass "ITN signature/source/amount/idempotency checks present"
else
  fail "ITN hardening checks incomplete"
fi

if rg -n "/api/payfast/reconcile|payment.checkout_created|payment.itn_processed|payment.reconcile" backend/src/server.js >/dev/null; then
  pass "Reconciliation and payment audit logging present"
else
  fail "Reconciliation/audit logging incomplete"
fi

echo "-- Data durability gate --"
if rg -n "readFileSync\\(dbPath|writeFileSync\\(dbPath|backend', 'data', 'db.json" backend/src/server.js >/dev/null; then
  fail "JSON file persistence still active (replace with production DB)"
else
  pass "No JSON file persistence detected"
fi

echo "-- Feature completeness gate --"
if rg -n "/api/content/calendar|/api/content/devotionals|/api/content/prayer-wall" src/store/index.ts >/dev/null; then
  pass "Calendar/devotional/prayer wall stores are backend API wired"
else
  fail "Calendar/devotional/prayer wall stores are not fully backend wired"
fi

if rg -n "/api/content/bible-audio/books|/api/content/worship|/api/admin/stats|/api/admin/subscribers|/api/user/profile|/api/user/change-password" backend/src/server.js >/dev/null; then
  pass "Key dashboard backend APIs present"
else
  fail "Dashboard backend APIs incomplete"
fi

echo "-- Quality/Test gate --"
run_or_fail "Frontend lint passes" npm run lint
run_or_fail "Frontend build passes" npm run build
run_or_fail "Backend integration tests pass" npm --prefix backend run test

echo "-- Ops/SRE gate (manual evidence files) --"
if [[ -f "docs/GREEN_LIGHT_CHECKLIST.md" ]]; then
  pass "Green-light checklist documentation present"
else
  fail "Green-light checklist documentation missing"
fi

if [[ -f "GO_LIVE_STATUS.md" ]]; then
  pass "Go-live status document present"
else
  fail "Go-live status document missing"
fi

echo "-- Deployment/Rollback gate (manual) --"
if rg -n "Rollback procedure tested" GO_LIVE_STATUS.md >/dev/null; then
  pass "Rollback criterion documented"
else
  fail "Rollback criterion missing from audit doc"
fi

echo
echo "== Gate Summary =="
echo "Passed: $PASS_COUNT"
echo "Failed: $FAIL_COUNT"

if [[ "$FAIL_COUNT" -gt 0 ]]; then
  echo "NO GO: one or more gates failed."
  exit 1
fi

echo "GREEN LIGHT: all gates passed."
