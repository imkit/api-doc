#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 創建根目錄的 index.html 重定向頁面
const indexHTML = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IMKIT Platform API Documentation</title>
    <meta name="description" content="IMKIT Platform API Document">
    <meta http-equiv="refresh" content="0; url=zh-TW/">
    <script>
        // JavaScript 重定向 (備用)
        window.location.replace('zh-TW/');
    </script>
</head>
<body>
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 50px; text-align: center;">
        <h1>IMKIT Platform API</h1>
        <p>Redirecting to documentation...</p>
        <p>正在重定向到文檔...</p>
        <p>If you are not redirected automatically, <a href="zh-TW/">click here</a></p>
        <p>如果沒有自動重定向，<a href="zh-TW/">請點擊這裡</a></p>
        
        <div style="margin-top: 30px;">
            <p>Choose Language / 選擇語言:</p>
            <a href="zh-TW/" style="margin: 0 10px; padding: 10px 20px; text-decoration: none; background: #0070f3; color: white; border-radius: 5px;">繁體中文</a>
            <a href="zh-CN/" style="margin: 0 10px; padding: 10px 20px; text-decoration: none; background: #0070f3; color: white; border-radius: 5px;">简体中文</a>
        </div>
    </div>
</body>
</html>`;

const outDir = path.join(__dirname, '../out');
const indexPath = path.join(outDir, 'index.html');

// 檢查 out 目錄是否存在
if (!fs.existsSync(outDir)) {
    console.error('Error: out directory does not exist');
    process.exit(1);
}

// 寫入 index.html
try {
    fs.writeFileSync(indexPath, indexHTML, 'utf8');
    console.log('✅ Created root index.html for GitHub Pages');
} catch (error) {
    console.error('Error creating index.html:', error);
    process.exit(1);
}

// 檢查語言版本是否存在
const zhTWPath = path.join(outDir, 'zh-TW', 'index.html');
const zhCNPath = path.join(outDir, 'zh-CN', 'index.html');

if (fs.existsSync(zhTWPath)) {
    console.log('✅ zh-TW version exists');
} else {
    console.warn('⚠️  zh-TW version missing');
}

if (fs.existsSync(zhCNPath)) {
    console.log('✅ zh-CN version exists');
} else {
    console.warn('⚠️  zh-CN version missing');
}

console.log('✅ Post-build setup complete for GitHub Pages');