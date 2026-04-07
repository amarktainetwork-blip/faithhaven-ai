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

test('auth register/login and profile update flow', async () => {
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
    assert.ok(register.token);

    const profileRes = await fetch(`${baseUrl}/api/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${register.token}` },
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
    const login = await loginRes.json();
    assert.ok(login.token);
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
    const register = await registerRes.json();
    const token = register.token;

    const bibleRes = await fetch(`${baseUrl}/api/content/bible-audio/books`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(bibleRes.status, 200);
    const bible = await bibleRes.json();
    assert.ok(Array.isArray(bible.books));
    assert.ok(bible.books.length > 0);

    const worshipRes = await fetch(`${baseUrl}/api/content/worship`, {
      headers: { Authorization: `Bearer ${token}` },
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
    const login = await loginRes.json();
    const token = login.token;

    const statsRes = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(statsRes.status, 200);
    const stats = await statsRes.json();
    assert.equal(typeof stats.stats.totalUsers, 'number');

    const subsRes = await fetch(`${baseUrl}/api/admin/subscribers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(subsRes.status, 200);
    const subs = await subsRes.json();
    assert.ok(Array.isArray(subs.subscribers));
  });
});
