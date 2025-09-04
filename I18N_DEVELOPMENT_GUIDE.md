# IMKIT 文檔網站 - 多國語言開發指南

## 概述

本指南說明如何在 IMKIT 文檔網站中新增和管理多國語言版本。網站採用 Nextra 3.x 的原生國際化功能，支援基於資料夾的語言管理架構。

## 目前支援的語言

- `zh-TW`: 繁體中文（預設語言）
- `zh-CN`: 簡體中文

## 新增語言步驟

### 1. 修改 Nextra 配置

編輯 `next.config.mjs`，在 `i18n` 配置中新增語言：

```javascript
export default withNextra({
  i18n: {
    locales: ['zh-TW', 'zh-CN', 'en'], // 新增 'en' 英文
    defaultLocale: 'zh-TW'
  },
  // ... 其他配置
})
```

### 2. 更新主題配置

編輯 `theme.config.tsx`，在 `i18n` 數組中新增語言選項：

```tsx
const config: DocsThemeConfig = {
  i18n: [
    { locale: 'zh-TW', name: '繁體中文' },
    { locale: 'zh-CN', name: '简体中文' },
    { locale: 'en', name: 'English' }  // 新增英文選項
  ],
  // ... 其他配置
}
```

### 3. 建立語言資料夾結構

在 `pages/` 目錄下建立新的語言資料夾（以英文為例）：

```
pages/
├── zh-TW/           # 繁體中文（現有）
├── zh-CN/           # 簡體中文（現有）
└── en/              # 英文（新增）
    ├── _meta.ts     # 英文導航配置
    ├── index.md     # 英文首頁
    ├── quick_start.md
    ├── auth/
    │   ├── _meta.ts
    │   └── key/
    │       ├── _meta.ts
    │       ├── api-key.md
    │       └── client-key.md
    ├── user/
    │   ├── _meta.ts
    │   ├── user-management/
    │   ├── user-list/
    │   └── user-token/
    ├── room/
    │   ├── _meta.ts
    │   ├── room-management/
    │   ├── room-members/
    │   └── room-preference/
    ├── message/
    │   ├── _meta.ts
    │   ├── message-basic/
    │   └── message-badge/
    ├── moderation/
    │   ├── _meta.ts
    │   ├── block-user/
    │   ├── ban-member/
    │   ├── mute-member/
    │   ├── freeze-chatroom/
    │   └── sensitive-word/
    └── webhook/
        ├── _meta.ts
        └── webhook/
```

### 4. 建立導航配置檔案

建立 `pages/en/_meta.ts`：

```typescript
export default {
  quick_start: {
    title: "Quick Start"
  },
  auth: {
    title: "Authentication"
  },
  user: {
    title: "User"
  },
  room: {
    title: "Room"
  },
  message: {
    title: "Message"
  },
  moderation: {
    title: "Moderation"
  },
  webhook: {
    title: "Webhook"
  }
}
```

每個子目錄也需要對應的 `_meta.ts`，例如 `pages/en/auth/_meta.ts`：

```typescript
export default {
  key: {
    title: "Keys"
  }
}
```

### 5. 翻譯內容文件

複製現有的 `.md` 文件到新語言資料夾並翻譯內容，保持檔案結構一致。

**範例**: `pages/en/auth/key/api-key.md`

```markdown
# API Key

## Overview

The API Key is an authentication key used for backend service calls...

---

## API Key Features
...
```

## 自動化工具和腳本

### 批量建立資料夾結構

可以使用以下腳本快速建立新語言的資料夾結構：

```bash
#!/bin/bash
# 建立英文資料夾結構
LANG_DIR="pages/en"

# 複製繁體中文的結構但只保留 _meta.ts 檔案
find pages/zh-TW -type d | sed 's|pages/zh-TW|'$LANG_DIR'|' | xargs mkdir -p

# 複製 _meta.ts 檔案作為翻譯模板
find pages/zh-TW -name "_meta.ts" | while read file; do
  target=$(echo $file | sed 's|pages/zh-TW|'$LANG_DIR'|')
  cp "$file" "$target"
done
```

### 翻譯進度追蹤

建議建立類似 `i18n-translation-todo.md` 的追蹤文件來管理翻譯進度。

## 測試和驗證

### 本地開發測試

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 訪問 http://localhost:3000 測試語言切換功能
```

### 建置測試

```bash
# 完整建置流程
npm run build
node scripts/post-build.js

# 本地預覽建置結果
npx serve out
```

### 部署前檢查清單

- [ ] `next.config.mjs` 中已新增新語言
- [ ] `theme.config.tsx` 中已新增語言選項
- [ ] 所有必要的資料夾結構已建立
- [ ] `_meta.ts` 檔案已正確配置
- [ ] 內容檔案已翻譯完成
- [ ] 本地測試通過
- [ ] 建置測試無錯誤

## 常見問題

### Q: 如何處理部分翻譯的情況？

**A:** Nextra 會自動 fallback 到預設語言（zh-TW）。建議優先翻譯主要頁面，次要頁面可以先保持原文。

### Q: 如何快速複製現有內容作為翻譯基礎？

**A:** 

```bash
# 複製繁體中文內容到英文目錄作為翻譯基礎
cp -r pages/zh-TW/* pages/en/
# 然後逐一翻譯 .md 檔案內容
```

### Q: 語言切換選單沒出現？

**A:** 檢查：
1. `theme.config.tsx` 中 `i18n` 配置是否正確
2. 對應語言的資料夾是否存在且包含內容
3. `next.config.mjs` 中的 locale 配置是否匹配

### Q: 部署後某個語言無法訪問？

**A:** 確認：
1. 該語言的資料夾結構完整
2. 每個目錄都有 `_meta.ts` 檔案
3. GitHub Actions 建置過程沒有錯誤

## 檔案命名規範

- **資料夾名稱**: 使用標準 locale 代碼（如 `en`, `zh-CN`, `ja`, `ko`）
- **檔案名稱**: 與預設語言保持一致的檔案名
- **meta 檔案**: 每個目錄必須包含 `_meta.ts` 配置檔案

## 注意事項

- **一致性**: 保持所有語言的檔案結構一致
- **編碼**: 所有檔案使用 UTF-8 編碼
- **連結**: 內部連結會自動處理語言路由
- **圖片**: 共用資源放在 `public/` 目錄，各語言通用
- **SEO**: 每個語言版本會有獨立的 sitemap 和 meta 資料

---

*此指南適用於 Nextra 3.x 框架的 IMKIT 文檔網站。如有問題請參考 [Nextra 官方文檔](https://nextra.site/docs/guide/i18n)。*