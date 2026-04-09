#!/usr/bin/env node

/**
 * i18n completeness checker for FaithHaven AI.
 *
 * Reads src/i18n/translations.ts, extracts every key from the I18nKey type
 * definition, then verifies that each language block in the translations
 * object contains every declared key.
 *
 * Usage:  node scripts/check-i18n.js
 * Exit 0 — all languages complete
 * Exit 1 — missing keys detected
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_PATH = path.resolve(
  __dirname,
  '..',
  'src',
  'i18n',
  'translations.ts'
);

// ---------------------------------------------------------------------------
// 1. Read the source file
// ---------------------------------------------------------------------------
let source;
try {
  source = fs.readFileSync(TRANSLATIONS_PATH, 'utf-8');
} catch (err) {
  console.error(`❌  Could not read ${TRANSLATIONS_PATH}`);
  console.error(err.message);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Extract declared keys from the I18nKey type union
// ---------------------------------------------------------------------------
const typeBlockMatch = source.match(
  /export\s+type\s+I18nKey\s*=\s*([\s\S]*?);/
);
if (!typeBlockMatch) {
  console.error('❌  Could not find the I18nKey type definition.');
  process.exit(1);
}

const typeBlock = typeBlockMatch[1];
const declaredKeys = [];
const keyPattern = /\|\s*'([^']+)'/g;
let m;
while ((m = keyPattern.exec(typeBlock)) !== null) {
  declaredKeys.push(m[1]);
}

if (declaredKeys.length === 0) {
  console.error('❌  No keys found in I18nKey type definition.');
  process.exit(1);
}

console.log(`✅  Found ${declaredKeys.length} declared i18n keys.\n`);

// ---------------------------------------------------------------------------
// 3. Extract language blocks and their keys from the translations object
// ---------------------------------------------------------------------------
const LANGUAGES = ['en', 'af', 'zu', 'xh'];
let hasErrors = false;

for (const lang of LANGUAGES) {
  // Match the language block — look for `  lang: {` ... next language or end
  const langBlockRegex = new RegExp(
    `(?:^|\\n)\\s*${lang}:\\s*\\{([\\s\\S]*?)\\n\\s*\\}`,
    'm'
  );
  const langMatch = source.match(langBlockRegex);

  if (!langMatch) {
    console.error(`❌  [${lang}] Language block not found in translations.`);
    hasErrors = true;
    continue;
  }

  const block = langMatch[1];

  // Collect keys present in this block
  const presentKeys = new Set();
  const entryPattern = /'([^']+)'\s*:/g;
  let em;
  while ((em = entryPattern.exec(block)) !== null) {
    presentKeys.add(em[1]);
  }

  const missing = declaredKeys.filter((k) => !presentKeys.has(k));
  const extra = [...presentKeys].filter((k) => !declaredKeys.includes(k));

  if (missing.length === 0 && extra.length === 0) {
    console.log(
      `✅  [${lang}] Complete — ${presentKeys.size}/${declaredKeys.length} keys`
    );
  } else {
    if (missing.length > 0) {
      hasErrors = true;
      console.error(
        `❌  [${lang}] Missing ${missing.length} key(s):`
      );
      missing.forEach((k) => console.error(`      - ${k}`));
    }
    if (extra.length > 0) {
      console.warn(
        `⚠️  [${lang}] ${extra.length} extra key(s) not in I18nKey type:`
      );
      extra.forEach((k) => console.warn(`      - ${k}`));
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Summary
// ---------------------------------------------------------------------------
console.log('');
if (hasErrors) {
  console.error('❌  i18n check FAILED — missing keys detected.');
  process.exit(1);
} else {
  console.log('✅  i18n check PASSED — all languages are complete.');
  process.exit(0);
}
