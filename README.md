# IMKit API 文檔網站

這是使用 Nextra 3.x 建立的 IMKit 聊天伺服器 API 文檔網站。

## 功能特點

- 📚 完整的 API 文檔分類
- 🔍 全文搜索功能
- 📱 響應式設計
- 🌐 繁體中文介面
- ⚡ 基於 Next.js 的快速載入

## 開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm start
```

## 部署

### GitHub Pages
1. 推送到 GitHub
2. 在 Repository Settings > Pages 中啟用 GitHub Actions
3. 每次推送到 main 分支會自動部署

### Vercel
1. 連接 GitHub Repository 到 Vercel
2. 自動部署每次推送

## 文檔結構

- `/docs/getting-started` - 快速開始
- `/docs/auth` - 身份驗證
- `/docs/client` - 客戶端 API
- `/docs/room` - 房間管理
- `/docs/message` - 訊息功能
- `/docs/file` - 檔案處理
- `/docs/push` - 推播服務
- `/docs/socket` - Socket 連線
- `/docs/config` - 系統配置
- `/docs/admin` - 管理功能
- `/docs/guides` - 使用指南
- `/docs/troubleshooting` - 故障排除

## 技術棧

- [Next.js 15](https://nextjs.org/)
- [Nextra 3.x](https://nextra.site/)
- [React 19](https://react.dev/)
- TypeScript