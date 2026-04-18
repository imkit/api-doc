#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://docs.imkit.io';
const LOCALES = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
const CANONICAL_LOCALE = 'en'; // llms.txt defaults to English (most LLM tools expect this)
const OUT_DIR = path.join(__dirname, '..', 'out');
const PAGES_ROOT = path.join(__dirname, '..', 'pages');

const DESCRIPTIONS = {
  'en':    'Real-time messaging API for chat applications. Provides user management, chat rooms, messaging, moderation, push notifications, and webhooks.',
  'zh-TW': 'IMKIT 聊天應用即時通訊 API，提供使用者管理、聊天室、訊息、管理、推播與 Webhook 功能。',
  'zh-CN': 'IMKIT 聊天应用即时通讯 API，提供用户管理、聊天室、消息、管理、推送与 Webhook 功能。',
  'ja':    'チャットアプリケーション向けのリアルタイムメッセージング API。ユーザー管理、チャットルーム、メッセージ、モデレーション、プッシュ通知、Webhook をサポート。',
  'ko':    '채팅 애플리케이션을 위한 실시간 메시징 API. 사용자 관리, 채팅방, 메시지, 중재, 푸시 알림, 웹훅 기능을 제공합니다.',
};

function readMeta(dir) {
  const metaPath = path.join(dir, '_meta.ts');
  if (!fs.existsSync(metaPath)) return { order: [], titles: {} };
  const source = fs.readFileSync(metaPath, 'utf8');
  const order = [];
  const titles = {};
  const re = /["']?([\w-]+)["']?\s*:\s*\{\s*title\s*:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    order.push(m[1]);
    titles[m[1]] = m[2];
  }
  return { order, titles };
}

function extractSummary(mdPath) {
  const content = fs.readFileSync(mdPath, 'utf8');
  const h1 = content.match(/^#\s+(.+?)\s*$/m);
  const firstPara = content
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .find((s) => s && !s.startsWith('#') && !s.startsWith('```') && !s.startsWith('|'));
  let description = '';
  if (firstPara) {
    const clean = firstPara.replace(/\s+/g, ' ');
    if (clean.length <= 200) {
      description = clean;
    } else {
      const cut = clean.slice(0, 200);
      const lastSpace = cut.lastIndexOf(' ');
      description = (lastSpace > 120 ? cut.slice(0, lastSpace) : cut) + '…';
    }
  }
  return { title: h1 ? h1[1].trim() : null, description, raw: content };
}

function urlFor(locale, relPath) {
  let p = relPath.replace(/\.(md|mdx)$/, '');
  if (p === 'index' || p.endsWith('/index')) {
    p = p.slice(0, p.length - 'index'.length).replace(/\/$/, '');
  }
  return `${SITE_URL}/${locale}${p ? '/' + p : ''}/`;
}

function walk(locale, dir, relPrefix = '') {
  const { order, titles } = readMeta(dir);
  const results = [];
  const handled = new Set();
  const dirEntries = fs.readdirSync(dir, { withFileTypes: true });
  const resolve = (key) => {
    const asFile = dirEntries.find((e) => e.isFile() && e.name.replace(/\.(md|mdx)$/, '') === key);
    if (asFile) return { type: 'file', name: asFile.name };
    const asDir = dirEntries.find((e) => e.isDirectory() && e.name === key);
    if (asDir) return { type: 'dir', name: asDir.name };
    return null;
  };
  for (const key of order) {
    const resolved = resolve(key);
    if (!resolved) continue;
    handled.add(resolved.name);
    const title = titles[key];
    if (resolved.type === 'file') {
      const rel = path.join(relPrefix, resolved.name);
      const summary = extractSummary(path.join(dir, resolved.name));
      results.push({
        kind: 'page',
        depth: relPrefix.split(path.sep).filter(Boolean).length,
        title: title || summary.title || key,
        description: summary.description,
        url: urlFor(locale, rel),
        absPath: path.join(dir, resolved.name),
      });
    } else {
      results.push({ kind: 'section', depth: relPrefix.split(path.sep).filter(Boolean).length, title });
      results.push(...walk(locale, path.join(dir, resolved.name), path.join(relPrefix, resolved.name)));
    }
  }
  const leftovers = dirEntries
    .filter((e) => !handled.has(e.name) && e.name !== '_meta.ts')
    .sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of leftovers) {
    if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      const rel = path.join(relPrefix, entry.name);
      const summary = extractSummary(path.join(dir, entry.name));
      results.push({
        kind: 'page',
        depth: relPrefix.split(path.sep).filter(Boolean).length,
        title: summary.title || entry.name.replace(/\.(md|mdx)$/, ''),
        description: summary.description,
        url: urlFor(locale, rel),
        absPath: path.join(dir, entry.name),
      });
    } else if (entry.isDirectory()) {
      results.push(...walk(locale, path.join(dir, entry.name), path.join(relPrefix, entry.name)));
    }
  }
  return results;
}

function buildIndex(locale, entries) {
  const lines = [
    '# IMKIT Platform API',
    '',
    `> ${DESCRIPTIONS[locale] || DESCRIPTIONS.en}`,
    '',
    `Official documentation: ${SITE_URL}/${locale}/`,
    '',
  ];
  for (const e of entries) {
    if (e.kind === 'section') {
      lines.push('', `${'#'.repeat(Math.min(2 + e.depth, 6))} ${e.title}`, '');
    } else {
      lines.push(e.description ? `- [${e.title}](${e.url}): ${e.description}` : `- [${e.title}](${e.url})`);
    }
  }
  return lines.join('\n') + '\n';
}

function buildFull(locale, entries) {
  const chunks = [
    `# IMKIT Platform API — Full Documentation (${locale})`,
    '',
    `Canonical site: ${SITE_URL}/${locale}/`,
    '',
    '---',
    '',
  ];
  for (const e of entries) {
    if (e.kind === 'section') continue;
    chunks.push(`## ${e.title}`, '', `Source: ${e.url}`, '');
    chunks.push(fs.readFileSync(e.absPath, 'utf8').trim(), '', '---', '');
  }
  return chunks.join('\n');
}

if (!fs.existsSync(OUT_DIR)) {
  console.error('Error: out/ does not exist — run `next build` first');
  process.exit(1);
}

for (const locale of LOCALES) {
  const pagesDir = path.join(PAGES_ROOT, locale);
  if (!fs.existsSync(pagesDir)) {
    console.warn(`⚠️  pages/${locale} missing, skipping`);
    continue;
  }
  const entries = walk(locale, pagesDir);
  const pageCount = entries.filter((e) => e.kind === 'page').length;
  const suffix = locale === CANONICAL_LOCALE ? '' : `.${locale}`;
  fs.writeFileSync(path.join(OUT_DIR, `llms${suffix}.txt`), buildIndex(locale, entries), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, `llms-full${suffix}.txt`), buildFull(locale, entries), 'utf8');
  console.log(`✅ Wrote llms${suffix}.txt / llms-full${suffix}.txt (${locale}, ${pageCount} pages)`);
}
