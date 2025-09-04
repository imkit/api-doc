# 用戶端金鑰

## 概述

Client Key 是 IMKIT Platform API 中用於前端應用程式連接 Chat Server 的認證金鑰。它主要用於 SDK 初始化和建立 WebSocket 連線，與後端 API 使用的 API Key 不同。

------

## Client Key 特性

### 基本資訊

| 屬性         | 說明                       |
| ------------ | -------------------------- |
| **用途**     | 前端 SDK 連接 Chat Server  |
| **格式**     | JWT Token 格式             |
| **有效期**   | 長期有效（除非主動撤銷）   |
| **作用域**   | 特定應用程式範圍           |
| **安全等級** | 公開（可暴露在前端代碼中） |

### 與 API Key 的差異

| 項目         | Client Key      | API Key       |
| ------------ | --------------- | ------------- |
| **使用場景** | 前端 SDK 初始化 | 後端 API 呼叫 |
| **安全性**   | 公開可見        | 私密保存      |
| **權限範圍** | 連線和基本操作  | 完整管理權限  |
| **暴露風險** | 低風險          | 高風險        |

------

## 取得 Client Key

### 透過 IMKIT Dashboard

1. 登入 [IMKIT Dashboard](https://dashboard.imkit.io/)
2. 選擇您的應用程式
3. 進入「設定」頁面
4. 複製 Client Key

### 範例 Client Key

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiIySllwWWhEYVFsSVFsRFN2VkxDTExvMk1QekZmVm05allweHcydnVCcm1rPSIsImNyZWF0ZUF0IjoxNTkxOTcyNTc2NDE0LCJjbGllbnRJZCI6IjJiM2JkNWNjLTRhODYtNGE0MC1hMTU0LTE2NDA0MDE0ZGE4OCJ9.bdIWOcPfDrNuLRszgtrQDaQiow_X-WolzjDhtiLEED8
```

------

## 使用方式

### Web SDK 初始化

```javascript
const config = {
  domain: "https://your-app.imkit.io",
  clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  token: "user-access-token"
}

window.IMKitUI.init(config);
```

### iOS SDK 初始化

```swift
let config = IMKitConfig(
    domain: "https://your-app.imkit.io",
    clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token: "user-access-token"
)

IMKit.shared.initialize(config: config)
```

### Android SDK 初始化

```kotlin
val config = IMKitConfig(
    domain = "https://your-app.imkit.io",
    clientKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token = "user-access-token"
)

IMKit.initialize(config)
```

------

## Client Key 權限

### 允許的操作

- ✅ 建立 WebSocket 連線
- ✅ 接收即時訊息
- ✅ 發送聊天訊息
- ✅ 加入/離開聊天室
- ✅ 上傳多媒體檔案
- ✅ 更新用戶狀態

### 不允許的操作

- ❌ 建立/刪除用戶
- ❌ 管理聊天室權限
- ❌ 存取管理 API
- ❌ 修改應用程式設定
- ❌ 撤銷其他用戶 token

------

## 安全性考量

### 為什麼 Client Key 可以公開？

1. **有限權限**：Client Key 僅能進行前端連線操作
2. **用戶範圍**：需要配合有效的 user token 才能操作
3. **無管理權限**：無法存取敏感的管理功能
4. **應用程式隔離**：只能連接到特定的應用程式

### 最佳實務

- **版本控制**：可以將 Client Key 加入版本控制
- **環境區分**：不同環境使用不同的 Client Key
- **定期輪換**：雖然風險較低，仍建議定期更換
- **監控使用**：監控 Client Key 的使用情況

------

## 常見問題

### Q: Client Key 洩露會有什麼風險？

**A:** 風險相對較低，攻擊者仍需要有效的 user token 才能進行實際操作。但建議發現洩露時立即更換新的 Client Key。

### Q: 可以在移動應用程式中使用 Client Key 嗎？

**A:** 可以，Client Key 設計為可以安全地嵌入在移動應用程式中，包括原生 iOS/Android 應用。

### Q: Client Key 會過期嗎？

**A:** Client Key 預設不會過期，但您可以在 Dashboard 中手動撤銷並生成新的 Client Key。

### Q: 一個應用程式可以有多個 Client Key 嗎？

**A:** 目前每個應用程式只能有一個 Client Key，如需更換請先撤銷舊的再生成新的。

------

## 錯誤處理

### 常見錯誤

**Invalid Client Key**

```json
{
  "error": "INVALID_CLIENT_KEY",
  "message": "The provided client key is invalid or expired"
}
```

**Client Key Mismatch**

```json
{
  "error": "CLIENT_KEY_MISMATCH", 
  "message": "Client key does not match the specified domain"
}
```

**Missing Client Key**

```json
{
  "error": "MISSING_CLIENT_KEY",
  "message": "Client key is required for SDK initialization"
}
```
