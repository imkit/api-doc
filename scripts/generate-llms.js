#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://docs.imkit.io';
const LOCALE = 'en';
const PAGES_DIR = path.join(__dirname, '..', 'pages', LOCALE);
const OUT_DIR = path.join(__dirname, '..', 'out');

function readMeta(dir) {
  const metaPath = path.join(dir, '_meta.ts');
  if (!fs.existsSync(metaPath)) return { order: [], titles: {} };
  const source = fs.readFileSync(metaPath, 'utf8');
  const order = [];
  const titles = {};
  // Match: key: { title: "..." } (keys may be quoted or unquoted; spaces allowed)
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
  return {
    title: h1 ? h1[1].trim() : null,
    description,
    raw: content,
  };
}

function urlFor(relPath) {
  let p = relPath.replace(/\.(md|mdx)$/, '');
  if (p === 'index' || p.endsWith('/index')) {
    p = p.slice(0, p.length - 'index'.length).replace(/\/$/, '');
  }
  return `${SITE_URL}/${LOCALE}${p ? '/' + p : ''}/`;
}

function walk(dir, relPrefix = '') {
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
        url: urlFor(rel),
        absPath: path.join(dir, resolved.name),
      });
    } else {
      results.push({
        kind: 'section',
        depth: relPrefix.split(path.sep).filter(Boolean).length,
        title,
      });
      const subdir = path.join(dir, resolved.name);
      results.push(...walk(subdir, path.join(relPrefix, resolved.name)));
    }
  }

  // Append any files/dirs that weren't in _meta (best-effort, alphabetical)
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
        url: urlFor(rel),
        absPath: path.join(dir, entry.name),
      });
    } else if (entry.isDirectory()) {
      results.push(...walk(path.join(dir, entry.name), path.join(relPrefix, entry.name)));
    }
  }

  return results;
}

function buildIndex(entries) {
  const lines = [
    '# IMKIT Platform API',
    '',
    '> Real-time messaging API for chat applications. Provides user management, chat rooms, messaging, moderation, push notifications, and webhooks.',
    '',
    'Official documentation: ' + SITE_URL,
    '',
  ];
  for (const e of entries) {
    if (e.kind === 'section') {
      const heading = '#'.repeat(Math.min(2 + e.depth, 6));
      lines.push('', `${heading} ${e.title}`, '');
    } else {
      const bullet = e.description
        ? `- [${e.title}](${e.url}): ${e.description}`
        : `- [${e.title}](${e.url})`;
      lines.push(bullet);
    }
  }
  return lines.join('\n') + '\n';
}

function buildFull(entries) {
  const chunks = [
    `# IMKIT Platform API — Full Documentation`,
    '',
    `Canonical site: ${SITE_URL}`,
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

const entries = walk(PAGES_DIR);
const pageCount = entries.filter((e) => e.kind === 'page').length;

fs.writeFileSync(path.join(OUT_DIR, 'llms.txt'), buildIndex(entries), 'utf8');
console.log(`✅ Wrote out/llms.txt (${pageCount} pages indexed)`);

fs.writeFileSync(path.join(OUT_DIR, 'llms-full.txt'), buildFull(entries), 'utf8');
console.log(`✅ Wrote out/llms-full.txt`);
