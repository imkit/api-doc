# 用戶端金鑰

## 概述

Client Key（`IM-CLIENT-KEY`）是 IMKIT Platform API 中用於識別應用程式的認證金鑰，需搭配用戶 Token（`IM-Authorization`）一起使用，代表「以特定用戶的身分」執行操作。它主要用於 SDK 初始化、建立 WebSocket 連線，以及執行用戶層級的 API 操作。

------

## Client Key 特性

### 基本資訊

| 屬性         | 說明                                   |
| ------------ | -------------------------------------- |
| **用途**     | 識別應用程式，搭配用戶 Token 執行操作  |
| **搭配**     | 需搭配 `IM-Authorization`（用戶 Token）|
| **格式**     | JWT Token 格式                         |
| **有效期**   | 長期有效（除非主動撤銷）               |
| **作用域**   | 操作範圍受用戶權限限制                 |
| **安全等級** | 公開（可暴露在前端代碼中）             |

### 與 API Key 的差異

| 項目         | Client Key (`IM-CLIENT-KEY`)          | API Key (`IM-API-KEY`)   |
| ------------ | ------------------------------------- | ------------------------ |
| **搭配**     | 需搭配用戶 Token (`IM-Authorization`) | 單獨使用                 |
| **身分**     | 以特定用戶身分操作                    | 以平台管理員身分操作     |
| **使用方**   | SDK 前端 / 後端                       | 僅後端                   |
| **權限範圍** | 受用戶權限限制                        | 完整管理權限             |
| **安全性**   | 公開可見                              | 必須保密                 |

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

### 允許的操作（需搭配用戶 Token）

- ✅ 建立 WebSocket 連線
- ✅ 接收和發送聊天訊息
- ✅ 加入/離開聊天室
- ✅ 管理聊天室成員
- ✅ 上傳多媒體檔案
- ✅ 更新用戶狀態
- ✅ 封鎖/禁止用戶
- ✅ 釘選/撤回訊息

### 不允許的操作（需使用 API Key）

- ❌ 建立/刪除用戶
- ❌ 管理用戶 Token
- ❌ 修改應用程式設定
- ❌ 存取跨聊天室訊息記錄
- ❌ 批次發送訊息

------

## 安全性考量

### 為什麼 Client Key 可以公開？

1. **有限權限**：操作範圍受用戶權限限制
2. **需搭配 Token**：必須配合有效的用戶 Token 才能操作
3. **無管理權限**：無法執行用戶管理、Token 管理等管理操作
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
