#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://docs.imkit.io';
const LOCALES = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
const DEFAULT_LOCALE = 'zh-TW';
const OUT_DIR = path.join(__dirname, '..', 'out');

function collectPages(localeRoot, locale) {
  if (!fs.existsSync(localeRoot)) return [];
  const pages = [];
  const stack = [localeRoot];
  while (stack.length) {
    const cur = stack.pop();
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name === 'index.html') {
        const rel = path.relative(localeRoot, path.dirname(full));
        pages.push(rel ? rel.split(path.sep).join('/') : '');
      }
    }
  }
  return pages.map((p) => ({ locale, path: p }));
}

function urlFor(locale, pagePath) {
  return pagePath
    ? `${SITE_URL}/${locale}/${pagePath}/`
    : `${SITE_URL}/${locale}/`;
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

if (!fs.existsSync(OUT_DIR)) {
  console.error('Error: out/ does not exist — run `next build` first');
  process.exit(1);
}

// Group pages by path so we can emit hreflang alternates per URL
const byPath = new Map();
for (const locale of LOCALES) {
  const pages = collectPages(path.join(OUT_DIR, locale), locale);
  for (const p of pages) {
    if (!byPath.has(p.path)) byPath.set(p.path, new Set());
    byPath.get(p.path).add(locale);
  }
}

const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const [pagePath, locales] of byPath) {
  for (const locale of locales) {
    const loc = urlFor(locale, pagePath);
    const alternates = [...locales]
      .sort()
      .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${urlFor(alt, pagePath)}" />`)
      .join('\n');
    const defaultAlt = locales.has(DEFAULT_LOCALE)
      ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT_LOCALE, pagePath)}" />`
      : '';
    urls.push(
      `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}${defaultAlt}\n  </url>`
    );
  }
}

// Root redirect page
urls.unshift(
  `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>`
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml, 'utf8');
console.log(`✅ Wrote sitemap.xml (${urls.length} URLs across ${byPath.size} unique paths)`);

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
const robotsPath = path.join(OUT_DIR, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  fs.writeFileSync(robotsPath, robots, 'utf8');
  console.log('✅ Wrote robots.txt');
}
