#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const LOCALES = [
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'en',    label: 'English' },
  { code: 'ja',    label: '日本語' },
  { code: 'ko',    label: '한국어' },
];
const DEFAULT_LOCALE = 'zh-TW';

const outDir = path.join(__dirname, '..', 'out');
const indexPath = path.join(outDir, 'index.html');

if (!fs.existsSync(outDir)) {
  console.error('Error: out/ directory does not exist');
  process.exit(1);
}

// Detect preferred locale from navigator.language, fall back to DEFAULT_LOCALE.
// Runs before any render, so the user sees at most one brief loading state.
const redirectScript = `
  (function () {
    var supported = ${JSON.stringify(LOCALES.map((l) => l.code))};
    var fallback = ${JSON.stringify(DEFAULT_LOCALE)};
    var preferred = (navigator.languages || [navigator.language || '']).find(function (tag) {
      if (!tag) return false;
      if (supported.indexOf(tag) !== -1) return true;
      var base = tag.split('-')[0];
      return supported.some(function (s) { return s === base || s.split('-')[0] === base; });
    }) || fallback;
    var target = supported.indexOf(preferred) !== -1
      ? preferred
      : (supported.find(function (s) { return s.split('-')[0] === preferred.split('-')[0]; }) || fallback);
    window.location.replace(target + '/');
  })();
`.trim();

const languageButtons = LOCALES.map((l) =>
  `<a href="${l.code}/" class="lang-btn">${l.label}</a>`
).join('\n      ');

const indexHTML = `<!DOCTYPE html>
<html lang="${DEFAULT_LOCALE}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=${DEFAULT_LOCALE}/">
  <title>IMKIT Platform API Documentation</title>
  <meta name="description" content="IMKIT Platform API Documentation">
  <link rel="icon" type="image/png" href="/favicon.png">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 50px; text-align: center; }
    .lang-btn { display: inline-block; margin: 0 8px; padding: 10px 20px; text-decoration: none; background: #0070f3; color: #fff; border-radius: 5px; }
    .lang-btn:hover { background: #0059c1; }
  </style>
  <script>${redirectScript}</script>
</head>
<body>
  <h1>IMKIT Platform API</h1>
  <p>Redirecting to documentation... / 正在重定向到文檔...</p>
  <p><a href="${DEFAULT_LOCALE}/">Continue manually / 手動繼續</a></p>
  <div style="margin-top: 30px;">
    <p>Choose Language / 選擇語言:</p>
      ${languageButtons}
  </div>
</body>
</html>
`;

fs.writeFileSync(indexPath, indexHTML, 'utf8');
console.log('✅ Created root index.html with smart locale redirect');

// Nextra static export leaves `<html lang>` unset on locale pages, which blocks
// Pagefind from indexing per-language. Walk each locale directory and pin the
// html lang attribute to the correct locale code.
function injectHtmlLang(localeCode) {
  const root = path.join(outDir, localeCode);
  if (!fs.existsSync(root)) return 0;
  let fixed = 0;
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        const html = fs.readFileSync(full, 'utf8');
        const patched = html.replace(/<html\b[^>]*>/i, (match) => {
          if (/\blang=/i.test(match)) return match.replace(/\blang="[^"]*"/i, `lang="${localeCode}"`);
          return match.replace(/^<html\b/i, `<html lang="${localeCode}"`);
        });
        if (patched !== html) {
          fs.writeFileSync(full, patched, 'utf8');
          fixed += 1;
        }
      }
    }
  }
  return fixed;
}

for (const { code } of LOCALES) {
  const count = injectHtmlLang(code);
  if (count > 0) console.log(`✅ Injected lang="${code}" into ${count} HTML files`);
}

let missing = 0;
for (const { code } of LOCALES) {
  const localeIndex = path.join(outDir, code, 'index.html');
  if (fs.existsSync(localeIndex)) {
    console.log(`✅ ${code} version exists`);
  } else {
    console.warn(`⚠️  ${code} version missing`);
    missing += 1;
  }
}

console.log(`✅ Post-build complete (${LOCALES.length - missing}/${LOCALES.length} locales present)`);
