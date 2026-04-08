# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Build static output to ./out
node scripts/post-build.js  # Required post-build step (run after build)
```

Deployment to GitHub Pages is automatic on push to `main` via `.github/workflows/deploy.yml`.

## Architecture

This is a **Nextra 3.x** static documentation site built with Next.js 15 and React 19, deployed to GitHub Pages at `https://docs.imkit.io`.

### Key config files
- `next.config.mjs` — Nextra setup, i18n locales, custom domain (docs.imkit.io), `output: 'export'`
- `theme.config.tsx` — Nextra docs theme, language switcher entries
- `pages/_meta.ts` — Root navigation (applies `layout: 'full'` to all pages)

### i18n structure

Three supported locales (configured in `next.config.mjs`):
- `zh-TW` — Traditional Chinese, **default locale**
- `zh-CN` — Simplified Chinese
- `en` — English

Pages live under `pages/[locale]/`. Each directory needs a `_meta.ts` navigation file. Every locale must mirror the same folder and file structure.

```
pages/
├── zh-TW/          # Primary locale — source of truth for structure
├── zh-CN/          # Must match zh-TW structure
└── en/             # Must match zh-TW structure
```

### Navigation metadata

Each folder contains a `_meta.ts` that defines sidebar titles:
```ts
export default {
  "some-page": { title: "Page Title" }
}
```

## Content Workflow

Source reference docs live in `@chat-server-document.wiki/` (a sibling repo — read only, do not modify). The published site only uses files in this repo (`@imkit-doc-website/`, i.e. the current directory).

1. Read the source `.md` from `@chat-server-document.wiki/`
2. Reformat to the layout spec below
3. Write to the corresponding `pages/[locale]/` path
4. Ensure the same file exists (or is created) in all three locale directories

## Document Layout Spec

**Reference file**: `pages/en/user/user-list/list-users.md`

All API doc pages must follow this structure:

```markdown
# Page Title

## Overview
Brief description of what the API does and when to use it.

------

## API Endpoint

### Operation Name
Short description.

```http
METHOD /api/path
```

#### Headers
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `IM-API-KEY` | string | ✅ | Your API key |

#### Query Parameters / Post Body
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |

#### Example Request
```http
GET /api/path?param=value
```

#### Response
**Success Response (200 OK)**
| Parameter | Type | Description |
| --------- | ---- | ----------- |

#### Example Response
```json
{ "RC": 0, "RM": "OK", "result": {} }
```

#### Error Response
**400 Bad Request** - Description
```json
{ "RC": 400, "RM": "..." }
```

------

## Use Cases
### Category
- **Use case**: Description

------

## Notes
- **Key point**: Details
```

### Format rules
- Section dividers: `------` (6 dashes)
- Required: ✅, Optional: ❌
- Code blocks: use language tags (`http`, `json`, `javascript`)
- zh-TW pages use Traditional Chinese headings and content; en pages use English

