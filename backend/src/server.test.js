import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';
import { app, hashPassword } from './server.js';

const dbPath = path.join(process.cwd(), 'backend', 'data', 'app.db');
const sqlite = new DatabaseSync(dbPath);

const resetDB = () => {
  for (const key of ['users', 'transactions', 'authTokens', 'auditLogs', 'calendarEvents', 'devotionals', 'prayerWall']) {
    sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run(key, '[]');
  }
};

test.beforeEach(() => {
  resetDB();
});

const withServer = async (fn) => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    return await fn(baseUrl);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
};

const extractSessionCookie = (res) => {
  const setCookies = res.headers.getSetCookie?.() || [];
  for (const c of setCookies) {
    const match = c.match(/fh_session=([^;]+)/);
    if (match) return match[1];
  }
  return null;
};

test('auth register sets httpOnly cookie and login flow works', async () => {
  await withServer(async (baseUrl) => {
    const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'supersecret123',
        name: 'User One',
        denomination: 'nondenominational',
      }),
    });
    assert.equal(registerRes.status, 200);
    const register = await registerRes.json();
    assert.ok(register.user);
    assert.equal(register.token, undefined, 'token must not be in response body');
    assert.equal(register.verifyToken, undefined, 'verifyToken must not be in response body');

    const sessionToken = extractSessionCookie(registerRes);
    assert.ok(sessionToken, 'fh_session cookie must be set on register');

    // Use cookie for authenticated request
    const profileRes = await fetch(`${baseUrl}/api/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: `fh_session=${sessionToken}` },
      body: JSON.stringify({ name: 'Updated User', language: 'af' }),
    });
    assert.equal(profileRes.status, 200);
    const profile = await profileRes.json();
    assert.equal(profile.user.name, 'Updated User');
    assert.equal(profile.user.language, 'af');

    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'supersecret123' }),
    });
    assert.equal(loginRes.status, 200);
    const loginToken = extractSessionCookie(loginRes);
    assert.ok(loginToken, 'fh_session cookie must be set on login');
    const login = await loginRes.json();
    assert.equal(login.token, undefined, 'token must not be in login response body');
  });
});

test('Authorization header still works for backward compat', async () => {
  await withServer(async (baseUrl) => {
    const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'headeruser@example.com',
        password: 'supersecret123',
        name: 'Header User',
        denomination: 'nondenominational',
      }),
    });
    const token = extractSessionCookie(registerRes);

    // Use Authorization header instead of cookie
    const bibleRes = await fetch(`${baseUrl}/api/content/bible-audio/books`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(bibleRes.status, 200);
    const bible = await bibleRes.json();
    assert.ok(Array.isArray(bible.books));
  });
});

test('POST /api/auth/logout clears the session cookie', async () => {
  await withServer(async (baseUrl) => {
    const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, { method: 'POST' });
    assert.equal(logoutRes.status, 200);
    const body = await logoutRes.json();
    assert.equal(body.ok, true);
    const cookies = logoutRes.headers.getSetCookie?.() || [];
    const cleared = cookies.some(c => c.includes('fh_session=') && c.includes('Max-Age=0'));
    assert.ok(cleared, 'logout must clear fh_session cookie');
  });
});

test('content endpoints return data for authenticated users', async () => {
  await withServer(async (baseUrl) => {
    const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'reader@example.com',
        password: 'supersecret123',
        name: 'Reader',
        denomination: 'nondenominational',
      }),
    });
    const token = extractSessionCookie(registerRes);

    const bibleRes = await fetch(`${baseUrl}/api/content/bible-audio/books`, {
      headers: { Cookie: `fh_session=${token}` },
    });
    assert.equal(bibleRes.status, 200);
    const bible = await bibleRes.json();
    assert.ok(Array.isArray(bible.books));
    assert.ok(bible.books.length > 0);

    const worshipRes = await fetch(`${baseUrl}/api/content/worship`, {
      headers: { Cookie: `fh_session=${token}` },
    });
    assert.equal(worshipRes.status, 200);
    const worship = await worshipRes.json();
    assert.ok(Array.isArray(worship.songs));
    assert.ok(Array.isArray(worship.playlists));
  });
});

test('admin stats and subscribers endpoints enforce role and return payload', async () => {
  const users = [
    {
      id: 'admin-1',
      email: 'admin@example.com',
      name: 'Admin',
      denomination: 'nondenominational',
      language: 'en',
      role: 'admin',
      subscriptionPlan: 'individual',
      emailVerified: true,
      tokenVersion: 0,
      passwordHash: hashPassword('adminpass123'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run('users', JSON.stringify(users));

  await withServer(async (baseUrl) => {
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'adminpass123' }),
    });
    assert.equal(loginRes.status, 200);
    const token = extractSessionCookie(loginRes);

    const statsRes = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { Cookie: `fh_session=${token}` },
    });
    assert.equal(statsRes.status, 200);
    const stats = await statsRes.json();
    assert.equal(typeof stats.stats.totalUsers, 'number');

    const subsRes = await fetch(`${baseUrl}/api/admin/subscribers`, {
      headers: { Cookie: `fh_session=${token}` },
    });
    assert.equal(subsRes.status, 200);
    const subs = await subsRes.json();
    assert.ok(Array.isArray(subs.subscribers));
  });
});
