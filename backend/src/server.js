import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { z } from 'zod';
import { DatabaseSync } from 'node:sqlite';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || '';
const PAYFAST_IP_WHITELIST = process.env.PAYFAST_IP_WHITELIST?.split(',').map((v) => v.trim()).filter(Boolean) || [];
const AUTH_RATE_LIMIT_WINDOW_MS = Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const AUTH_RATE_LIMIT_MAX = Number(process.env.AUTH_RATE_LIMIT_MAX || 20);
const RESET_TOKEN_TTL_MINUTES = Number(process.env.RESET_TOKEN_TTL_MINUTES || 30);
const VERIFY_TOKEN_TTL_HOURS = Number(process.env.VERIFY_TOKEN_TTL_HOURS || 24);

const requireProductionSecrets = () => {
  if (process.env.NODE_ENV !== 'production') return;
  if (!JWT_SECRET || JWT_SECRET === 'change-me') {
    throw new Error('JWT_SECRET must be set to a non-default value in production');
  }
};

requireProductionSecrets();

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());

const sqlitePath = path.join(process.cwd(), 'backend', 'data', 'app.db');
const sqlite = new DatabaseSync(sqlitePath);
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS kv_store (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);
for (const key of ['users', 'transactions', 'authTokens', 'auditLogs', 'calendarEvents', 'devotionals', 'prayerWall']) {
  sqlite.prepare('INSERT OR IGNORE INTO kv_store(key, value) VALUES (?, ?)').run(key, '[]');
}

const parseJson = (value, fallback = []) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const readDB = () => {
  const users = sqlite.prepare('SELECT value FROM kv_store WHERE key = ?').get('users')?.value || '[]';
  const transactions = sqlite.prepare('SELECT value FROM kv_store WHERE key = ?').get('transactions')?.value || '[]';
  const authTokens = sqlite.prepare('SELECT value FROM kv_store WHERE key = ?').get('authTokens')?.value || '[]';
  const auditLogs = sqlite.prepare('SELECT value FROM kv_store WHERE key = ?').get('auditLogs')?.value || '[]';
  const calendarEvents = sqlite.prepare('SELECT value FROM kv_store WHERE key = ?').get('calendarEvents')?.value || '[]';
  const devotionals = sqlite.prepare('SELECT value FROM kv_store WHERE key = ?').get('devotionals')?.value || '[]';
  const prayerWall = sqlite.prepare('SELECT value FROM kv_store WHERE key = ?').get('prayerWall')?.value || '[]';
  return {
    users: parseJson(users),
    transactions: parseJson(transactions),
    authTokens: parseJson(authTokens),
    auditLogs: parseJson(auditLogs),
    calendarEvents: parseJson(calendarEvents),
    devotionals: parseJson(devotionals),
    prayerWall: parseJson(prayerWall),
  };
};

const writeDB = (data) => {
  const tx = sqlite.transaction((dbData) => {
    sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run('users', JSON.stringify(dbData.users || []));
    sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run('transactions', JSON.stringify(dbData.transactions || []));
    sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run('authTokens', JSON.stringify(dbData.authTokens || []));
    sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run('auditLogs', JSON.stringify(dbData.auditLogs || []));
    sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run('calendarEvents', JSON.stringify(dbData.calendarEvents || []));
    sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run('devotionals', JSON.stringify(dbData.devotionals || []));
    sqlite.prepare('INSERT OR REPLACE INTO kv_store(key, value) VALUES (?, ?)').run('prayerWall', JSON.stringify(dbData.prayerWall || []));
  });
  tx(data);
};

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
};

const verifyPassword = (password, encodedHash) => {
  const parts = String(encodedHash || '').split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  const [, salt, hash] = parts;
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(hash, 'hex'));
};

const logAuditEvent = (db, type, details = {}) => {
  db.auditLogs.push({
    id: crypto.randomUUID(),
    type,
    details,
    createdAt: new Date().toISOString(),
  });
};

const authAttempts = new Map();
const authRateLimitMiddleware = (req, res, next) => {
  const key = `${req.ip}:${req.path}`;
  const now = Date.now();
  const attempts = authAttempts.get(key) || [];
  const fresh = attempts.filter((ts) => now - ts <= AUTH_RATE_LIMIT_WINDOW_MS);
  if (fresh.length >= AUTH_RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many auth attempts. Please try again later.' });
  }
  fresh.push(now);
  authAttempts.set(key, fresh);
  next();
};

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = readDB();
    const user = db.users.find((u) => u.id === decoded.sub);
    if (!user) return res.status(401).json({ error: 'User not found' });
    if ((decoded.tv ?? 0) !== (user.tokenVersion ?? 0)) {
      return res.status(401).json({ error: 'Session expired' });
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) return res.status(403).json({ error: 'Forbidden' });
  next();
};

app.get('/health', (_req, res) => res.json({ ok: true }));

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).optional(),
  denomination: z.string().optional(),
});

app.post('/api/auth/register', authRateLimitMiddleware, async (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });

  const db = readDB();
  const exists = db.users.find((u) => u.email === parsed.data.email.toLowerCase());
  if (exists) return res.status(409).json({ error: 'Email already exists' });

  const passwordHash = hashPassword(parsed.data.password);
  const user = {
    id: crypto.randomUUID(),
    email: parsed.data.email.toLowerCase(),
    name: parsed.data.name || 'FaithHaven User',
    denomination: parsed.data.denomination || 'nondenominational',
    language: 'en',
    role: 'user',
    emailVerified: false,
    subscriptionPlan: 'free',
    tokenVersion: 0,
    passwordHash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDB(db);

  const verifyToken = crypto.randomUUID();
  db.authTokens.push({
    id: crypto.randomUUID(),
    type: 'email_verify',
    userId: user.id,
    token: verifyToken,
    expiresAt: new Date(Date.now() + VERIFY_TOKEN_TTL_HOURS * 60 * 60 * 1000).toISOString(),
    usedAt: null,
  });
  logAuditEvent(db, 'auth.register', { userId: user.id, email: user.email });
  writeDB(db);

  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role, tv: user.tokenVersion }, JWT_SECRET, { expiresIn: '7d' });
  const { passwordHash: _ph, ...safeUser } = user;
  res.json({ token, user: safeUser, verifyToken });
});

app.post('/api/auth/login', authRateLimitMiddleware, async (req, res) => {
  const parsed = authSchema.pick({ email: true, password: true }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });

  const db = readDB();
  const user = db.users.find((u) => u.email === parsed.data.email.toLowerCase());
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role, tv: user.tokenVersion ?? 0 }, JWT_SECRET, { expiresIn: '7d' });
  logAuditEvent(db, 'auth.login', { userId: user.id });
  writeDB(db);
  const { passwordHash: _ph, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const db = readDB();
  const user = db.users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { passwordHash: _ph, ...safeUser } = user;
  res.json({ user: safeUser });
});

app.post('/api/auth/verify-email', authRateLimitMiddleware, (req, res) => {
  const token = String(req.body?.token || '');
  if (!token) return res.status(400).json({ error: 'Token required' });

  const db = readDB();
  const row = db.authTokens.find((t) => t.type === 'email_verify' && t.token === token && !t.usedAt);
  if (!row) return res.status(400).json({ error: 'Invalid token' });
  if (new Date(row.expiresAt).getTime() < Date.now()) return res.status(400).json({ error: 'Token expired' });

  const user = db.users.find((u) => u.id === row.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.emailVerified = true;
  user.updatedAt = new Date().toISOString();
  row.usedAt = new Date().toISOString();
  logAuditEvent(db, 'auth.verify_email', { userId: user.id });
  writeDB(db);
  res.json({ ok: true });
});

app.post('/api/auth/request-password-reset', authRateLimitMiddleware, (req, res) => {
  const email = String(req.body?.email || '').toLowerCase().trim();
  if (!email) return res.status(400).json({ error: 'Email required' });

  const db = readDB();
  const user = db.users.find((u) => u.email === email);
  if (!user) return res.json({ ok: true });

  const resetToken = crypto.randomUUID();
  db.authTokens.push({
    id: crypto.randomUUID(),
    type: 'password_reset',
    userId: user.id,
    token: resetToken,
    expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000).toISOString(),
    usedAt: null,
  });
  logAuditEvent(db, 'auth.request_password_reset', { userId: user.id });
  writeDB(db);

  res.json({ ok: true, resetToken });
});

app.post('/api/auth/reset-password', authRateLimitMiddleware, async (req, res) => {
  const token = String(req.body?.token || '');
  const password = String(req.body?.password || '');
  if (!token || password.length < 8) return res.status(400).json({ error: 'Invalid input' });

  const db = readDB();
  const row = db.authTokens.find((t) => t.type === 'password_reset' && t.token === token && !t.usedAt);
  if (!row) return res.status(400).json({ error: 'Invalid token' });
  if (new Date(row.expiresAt).getTime() < Date.now()) return res.status(400).json({ error: 'Token expired' });

  const user = db.users.find((u) => u.id === row.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.passwordHash = hashPassword(password);
  user.tokenVersion = (user.tokenVersion ?? 0) + 1;
  user.updatedAt = new Date().toISOString();
  row.usedAt = new Date().toISOString();
  logAuditEvent(db, 'auth.reset_password', { userId: user.id });
  writeDB(db);

  res.json({ ok: true });
});

app.post('/api/auth/logout-all', authMiddleware, (req, res) => {
  const db = readDB();
  const user = db.users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.tokenVersion = (user.tokenVersion ?? 0) + 1;
  user.updatedAt = new Date().toISOString();
  logAuditEvent(db, 'auth.logout_all', { userId: user.id });
  writeDB(db);
  res.json({ ok: true });
});

app.put('/api/user/profile', authMiddleware, (req, res) => {
  const db = readDB();
  const user = db.users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const allowed = ['name', 'email', 'denomination', 'language'];
  for (const key of allowed) {
    if (req.body?.[key] !== undefined && req.body?.[key] !== '') {
      if (key === 'email') user.email = String(req.body[key]).toLowerCase().trim();
      else user[key] = req.body[key];
    }
  }
  user.updatedAt = new Date().toISOString();
  logAuditEvent(db, 'auth.profile_update', { userId: user.id });
  writeDB(db);

  const { passwordHash: _ph, ...safeUser } = user;
  res.json({ user: safeUser });
});

app.post('/api/user/change-password', authMiddleware, async (req, res) => {
  const currentPassword = String(req.body?.currentPassword || '');
  const newPassword = String(req.body?.newPassword || '');
  if (!currentPassword || newPassword.length < 8) return res.status(400).json({ error: 'Invalid input' });

  const db = readDB();
  const user = db.users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const valid = verifyPassword(currentPassword, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  user.passwordHash = hashPassword(newPassword);
  user.tokenVersion = (user.tokenVersion ?? 0) + 1;
  user.updatedAt = new Date().toISOString();
  logAuditEvent(db, 'auth.change_password', { userId: user.id });
  writeDB(db);

  res.json({ ok: true });
});

const bibleAnchors = {
  salvation: 'John 3:16',
  anxiety: 'Philippians 4:6-7',
  faith: 'Hebrews 11:1',
  wisdom: 'James 1:5',
  love: '1 Corinthians 13:4-7',
  peace: 'John 14:27',
};

const bibleAudioBooks = [
  { id: 'genesis', name: 'Genesis', chapters: 50, sampleTrackUrl: 'https://example.com/audio/genesis-1.mp3' },
  { id: 'psalms', name: 'Psalms', chapters: 150, sampleTrackUrl: 'https://example.com/audio/psalms-1.mp3' },
  { id: 'proverbs', name: 'Proverbs', chapters: 31, sampleTrackUrl: 'https://example.com/audio/proverbs-1.mp3' },
  { id: 'matthew', name: 'Matthew', chapters: 28, sampleTrackUrl: 'https://example.com/audio/matthew-1.mp3' },
  { id: 'john', name: 'John', chapters: 21, sampleTrackUrl: 'https://example.com/audio/john-1.mp3' },
  { id: 'romans', name: 'Romans', chapters: 16, sampleTrackUrl: 'https://example.com/audio/romans-1.mp3' },
];

const worshipPlaylists = [
  { id: '1', name: 'Sunday Worship', songs: 24, color: 'from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]' },
  { id: '2', name: 'Morning Devotion', songs: 18, color: 'from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)]' },
  { id: '3', name: 'Prayer & Meditation', songs: 32, color: 'from-[hsl(150,30%,55%)] to-[hsl(180,40%,50%)]' },
];

const worshipSongs = [
  { id: '1', title: 'Amazing Grace', artist: 'Traditional', duration: '3:45', category: 'Hymns' },
  { id: '2', title: '10,000 Reasons', artist: 'Matt Redman', duration: '4:12', category: 'Contemporary' },
  { id: '3', title: 'What a Beautiful Name', artist: 'Hillsong Worship', duration: '5:08', category: 'Contemporary' },
  { id: '4', title: 'How Great Thou Art', artist: 'Stuart Hine', duration: '3:28', category: 'Hymns' },
  { id: '5', title: 'Great Are You Lord', artist: 'All Sons & Daughters', duration: '4:35', category: 'Contemporary' },
];

app.post('/api/ai/chat', authMiddleware, async (req, res) => {
  const prompt = String(req.body?.prompt || '').trim();
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  const lowered = prompt.toLowerCase();
  let anchor = 'faith';
  if (lowered.includes('anx')) anchor = 'anxiety';
  if (lowered.includes('love')) anchor = 'love';
  if (lowered.includes('peace')) anchor = 'peace';
  if (lowered.includes('save')) anchor = 'salvation';
  if (lowered.includes('wisdom')) anchor = 'wisdom';

  if (!OPENAI_API_KEY) {
    return res.json({
      content: `Biblical reflection (${bibleAnchors[anchor]}): Let's reflect prayerfully on your request and align your next step with Scripture.`,
      sources: [bibleAnchors[anchor], 'FaithHaven Biblical Knowledge Base'],
    });
  }

  const openAIResp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a pastoral Christian assistant grounded in Biblical teaching.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
    }),
  });

  const data = await openAIResp.json();
  const content = data?.choices?.[0]?.message?.content || 'I am here to help you reflect biblically.';
  res.json({ content, sources: ['OpenAI', bibleAnchors[anchor]] });
});

app.get('/api/content/bible-audio/books', authMiddleware, (_req, res) => {
  res.json({ books: bibleAudioBooks });
});

app.get('/api/content/worship', authMiddleware, (_req, res) => {
  res.json({ playlists: worshipPlaylists, songs: worshipSongs });
});

app.get('/api/content/calendar', authMiddleware, (_req, res) => {
  const db = readDB();
  if (db.calendarEvents.length === 0) {
    db.calendarEvents.push({
      id: crypto.randomUUID(),
      title: 'Easter Sunday',
      date: new Date().toISOString(),
      type: 'feast',
      description: 'Celebrating the resurrection of Jesus Christ.',
    });
    writeDB(db);
  }
  res.json({ events: db.calendarEvents });
});

app.post('/api/content/calendar', authMiddleware, (req, res) => {
  const db = readDB();
  const event = {
    id: crypto.randomUUID(),
    title: String(req.body?.title || 'Untitled Event'),
    date: String(req.body?.date || new Date().toISOString()),
    type: String(req.body?.type || 'personal'),
    description: String(req.body?.description || ''),
  };
  db.calendarEvents.push(event);
  writeDB(db);
  res.json({ event });
});

app.get('/api/content/devotionals', authMiddleware, (_req, res) => {
  const db = readDB();
  if (db.devotionals.length === 0) {
    db.devotionals.push({
      id: crypto.randomUUID(),
      title: 'Walking in Faith',
      verse: 'Hebrews 11:1',
      scripture: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
      reflection: 'Faith is the foundation of our spiritual life.',
      prayer: 'Lord, strengthen my faith today.',
      date: new Date().toISOString(),
    });
    writeDB(db);
  }
  res.json({ devotionals: db.devotionals });
});

app.get('/api/content/prayer-wall', authMiddleware, (_req, res) => {
  const db = readDB();
  res.json({ prayers: db.prayerWall });
});

app.post('/api/content/prayer-wall', authMiddleware, (req, res) => {
  const db = readDB();
  const prayer = {
    id: crypto.randomUUID(),
    userId: req.user.sub,
    userName: req.user.email,
    content: String(req.body?.content || ''),
    prayerCount: 0,
    isAnonymous: Boolean(req.body?.isAnonymous || false),
    createdAt: new Date().toISOString(),
  };
  db.prayerWall.unshift(prayer);
  writeDB(db);
  res.json({ prayer });
});

app.post('/api/content/prayer-wall/:id/pray', authMiddleware, (req, res) => {
  const db = readDB();
  const prayer = db.prayerWall.find((p) => p.id === req.params.id);
  if (!prayer) return res.status(404).json({ error: 'Prayer not found' });
  prayer.prayerCount = Number(prayer.prayerCount || 0) + 1;
  writeDB(db);
  res.json({ prayer });
});

const signPayfastPayload = (payload) => {
  const query = Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v).trim())}`)
    .join('&');

  const withPassphrase = PAYFAST_PASSPHRASE ? `${query}&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE)}` : query;
  return crypto.createHash('md5').update(withPassphrase).digest('hex');
};

const verifyPayfastSignature = (payload) => {
  const incomingSignature = String(payload.signature || '');
  if (!incomingSignature) return false;

  const { signature: _signature, ...unsignedPayload } = payload;
  const calculatedSignature = signPayfastPayload(unsignedPayload);

  return incomingSignature.toLowerCase() === calculatedSignature.toLowerCase();
};

app.post('/api/payfast/create-checkout', authMiddleware, (req, res) => {
  const payload = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID || '',
    merchant_key: process.env.PAYFAST_MERCHANT_KEY || '',
    return_url: process.env.PAYFAST_RETURN_URL || '',
    cancel_url: process.env.PAYFAST_CANCEL_URL || '',
    notify_url: process.env.PAYFAST_NOTIFY_URL || '',
    m_payment_id: crypto.randomUUID(),
    amount: Number(req.body.amount || 0).toFixed(2),
    item_name: req.body.item_name || 'FaithHaven Subscription',
    email_address: req.user.email,
  };

  const signature = signPayfastPayload(payload);

  const db = readDB();
  db.transactions.push({
    id: payload.m_payment_id,
    userId: req.user.sub,
    amount: payload.amount,
    status: 'pending',
    paidAt: null,
    createdAt: new Date().toISOString(),
  });
  logAuditEvent(db, 'payment.checkout_created', { txId: payload.m_payment_id, userId: req.user.sub, amount: payload.amount });
  writeDB(db);

  res.json({
    endpoint: process.env.PAYFAST_ENDPOINT || 'https://sandbox.payfast.co.za/eng/process',
    payload,
    signature,
  });
});

app.post('/api/payfast/itn', express.urlencoded({ extended: true }), (req, res) => {
  const body = req.body;
  const paymentId = body.m_payment_id;
  const status = body.payment_status || 'unknown';

  if (PAYFAST_IP_WHITELIST.length > 0) {
    const sourceIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    if (!PAYFAST_IP_WHITELIST.includes(sourceIp)) {
      return res.status(403).send('Forbidden source');
    }
  }

  if (!verifyPayfastSignature(body)) {
    return res.status(400).send('Invalid signature');
  }

  const db = readDB();
  const tx = db.transactions.find((t) => t.id === paymentId);
  if (!tx) {
    return res.status(404).send('Transaction not found');
  }
  if (tx.status === 'COMPLETE' && status === 'COMPLETE') {
    return res.status(200).send('OK');
  }

  const expectedAmount = Number(tx.amount);
  const receivedAmount = Number(body.amount_gross || body.amount || 0);
  if (!Number.isFinite(receivedAmount) || receivedAmount !== expectedAmount) {
    return res.status(400).send('Amount mismatch');
  }

  tx.status = status;
  tx.payfastPayload = body;
  if (status === 'COMPLETE') tx.paidAt = new Date().toISOString();
  tx.updatedAt = new Date().toISOString();
  logAuditEvent(db, 'payment.itn_processed', { txId: tx.id, status, amount: receivedAmount });
  writeDB(db);

  res.status(200).send('OK');
});

app.post('/api/payfast/reconcile', authMiddleware, requireRole('admin'), (req, res) => {
  const db = readDB();
  const cutoffMs = Date.now() - (Number(req.body?.pendingMinutes || 120) * 60 * 1000);
  let expired = 0;
  for (const tx of db.transactions) {
    if (tx.status === 'pending' && new Date(tx.createdAt).getTime() < cutoffMs) {
      tx.status = 'expired';
      tx.updatedAt = new Date().toISOString();
      expired += 1;
    }
  }
  logAuditEvent(db, 'payment.reconcile', { expired, requestedBy: req.user.sub });
  writeDB(db);
  res.json({ ok: true, expired });
});

app.get('/api/admin/audit-logs', authMiddleware, requireRole('admin'), (req, res) => {
  const db = readDB();
  res.json({ logs: db.auditLogs.slice(-500) });
});

app.get('/api/admin/stats', authMiddleware, requireRole('admin'), (_req, res) => {
  const db = readDB();
  const totalUsers = db.users.length;
  const activeSubscribers = db.users.filter((u) => u.subscriptionPlan && u.subscriptionPlan !== 'free').length;
  const completedTx = db.transactions.filter((t) => String(t.status).toUpperCase() === 'COMPLETE');
  const totalRevenue = completedTx.reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const monthlyRevenue = completedTx
    .filter((t) => {
      const d = new Date(t.paidAt || t.updatedAt || t.createdAt);
      const now = new Date();
      return d.getUTCFullYear() === now.getUTCFullYear() && d.getUTCMonth() === now.getUTCMonth();
    })
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  res.json({
    stats: {
      totalUsers,
      activeSubscribers,
      monthlyRevenue,
      totalRevenue,
      owingAmount: 0,
      chatMessages: db.auditLogs.filter((l) => l.type === 'chat.message').length,
      prayers: 0,
      devotionals: 0,
    },
  });
});

app.get('/api/admin/subscribers', authMiddleware, requireRole('admin'), (_req, res) => {
  const db = readDB();
  const subscribers = db.users
    .filter((u) => u.subscriptionPlan && u.subscriptionPlan !== 'free')
    .map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      status: 'active',
      plan: u.subscriptionPlan,
    }));
  res.json({ subscribers });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`FaithHaven backend running on :${PORT}`);
  });
}

export { app, hashPassword };
