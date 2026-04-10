# 更新 Token

## 概述

更新指定用戶的 access token 和有效期間。適用於 token 輪換、延長有效期或更換認證憑證等場景。

------

## API 端點

### 更新用戶 Token

更新指定用戶的 access token 和過期時間。

```http
PUT /admin/clients/{client_id}/token
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json` |

#### Path Parameters

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `client_id` | string | ✅ | 用戶唯一識別碼 |

#### Request Body

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `token` | string | ✅ | 新的 access token |
| `expirationDate` | string | ✅ | Token 過期時間（ISO 8601 格式） |

#### 範例請求

**JavaScript 範例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    token: "new-token-001",
    expirationDate: "2026-01-01T00:00:00Z",
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 範例：**

```bash
curl -X "PUT" "https://your-app.imkit.io/admin/clients/{client_id}/token" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d $'{
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z"
}'
```

#### Response

**成功回應（200 OK）**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `_id` | string | 用戶唯一識別碼 |
| `nickname` | string | 用戶顯示名稱 |
| `avatarUrl` | string | 用戶頭像 URL |
| `issueAccessToken` | boolean | Token issue 模式 |
| `token` | string | 更新後的 access token |
| `expirationDate` | string | 更新後的 Token 過期時間 |
| `updatedAt` | string | Token 更新時間（ISO 8601 格式） |

#### 範例回應

```json
{
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z",
  "updatedAt": "2025-08-10T10:30:00Z"
}
```

#### 錯誤回應

**400 Bad Request** — 請求參數錯誤

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid expirationDate format"
}
```

**401 Unauthorized** — API 金鑰無效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** — 用戶不存在

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user002' not found"
}
```

**409 Conflict** — Token 衝突

```json
{
  "error": "TOKEN_CONFLICT",
  "message": "Token already exists for another client"
}
```

------

## 使用場景

### Token 生命週期管理
- **定期輪換**：定期更新 token 提升安全性
- **延長有效期**：延長即將過期的 token 有效期間
- **緊急更新**：安全事件發生時緊急更換 token

### 系統維護
- **批次更新**：系統升級時批次更新用戶 token
- **格式遷移**：從舊格式 token 遷移到新格式

------

## 注意事項

- **即時生效**：Token 更新後立即生效，舊 token 將失效
- **唯一性檢查**：系統會檢查新 token 是否與其他用戶衝突
- **時間格式**：`expirationDate` 必須使用 ISO 8601 格式
- **Token 複雜度**：建議使用足夠複雜的 token 格式
- **過期時間設定**：合理設定過期時間，平衡安全性與使用便利性
- **同步機制**：確保與您的認證系統同步更新
