# 核發 Token

## 概述

使用者資料由您的伺服器建立，但授權 token 由 IMKIT Chat Server 核發與控管。此模式適合希望快速整合且不需要自行管理 token 生命週期的應用程式。

實作流程：
1. 使用 `/admin/clients` API 建立 Client，並設定 `issueAccessToken: true`
2. Chat Server 將核發 access token，可用於後續 API 呼叫
3. 使用回傳的 token 進行用戶端認證

------

## API 端點

### 建立用戶並核發 Token

建立新用戶並由 Chat Server 自動核發 access token。

```http
POST /admin/clients
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json` |

#### Request Body

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 用戶唯一識別碼 |
| `nickname` | string | ✅ | 用戶顯示名稱 |
| `avatarUrl` | string | ❌ | 用戶頭像 URL |
| `issueAccessToken` | boolean | ✅ | 設為 `true` 以啟用此授權模式 |

#### 範例請求

**JavaScript 範例：**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user001",
    nickname: "Amy",
    avatarUrl: "https://example.com/avatar.jpg",
    issueAccessToken: true,
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
curl -X "POST" "https://your-app.imkit.io/admin/clients" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d $'{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true
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
| `token` | string | 由 Chat Server 核發的 access token |
| `expirationDate` | string | Token 過期時間（ISO 8601 格式） |

#### 範例回應

```json
{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expirationDate": "2025-06-30T12:00:00Z"
}
```

#### 錯誤回應

**400 Bad Request** — 請求參數錯誤

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: _id"
}
```

**401 Unauthorized** — API 金鑰無效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**409 Conflict** — 用戶已存在

```json
{
  "error": "USER_EXISTS",
  "message": "User with _id 'user001' already exists"
}
```

------

## 使用場景

### 快速整合
- **簡易開發**：讓系統自動產生 token，無需自行管理 token 生成邏輯
- **快速驗證**：適合開發和測試階段快速取得有效的存取權杖

### 用戶開通
- **新用戶註冊**：用戶註冊時同時建立 IMKIT 用戶並取得 token，一步到位
- **自動化流程**：在後端服務中自動為新用戶建立帳號並取得存取權杖

------

## 注意事項

- **Token 有效期限**：由 Chat Server 管理，請留意 `expirationDate` 欄位
- **Token 過期**：過期後需要重新建立用戶以取得新的 token
- **無法自訂**：此模式下無法自訂 token 內容或過期時間
- **快取建議**：建議在應用程式中快取 token 以避免重複請求
- **使用 Token**：取得 token 後，在後續的 API 呼叫中透過 `IM-Authorization` header 傳遞
