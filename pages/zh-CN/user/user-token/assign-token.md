# 指派 Token

## 概述

由您自行產生與驗證使用者 token，指派給 IMKIT Chat Server 進行使用。IMKIT 將僅負責訊息處理，此模式適合已有現有認證系統且希望完全控制 token 生命週期的應用程式。

實作流程：
1. 在您的系統中產生自訂 token
2. 使用 `/admin/clients` API 建立 Client，傳入您提供的 token 與 expirationDate
3. 後續可透過「更新 Token」API 更新，或透過「撤銷 Token」API 撤銷
4. 您的系統負責 token 驗證邏輯

------

## API 端點

### 建立用戶並指派 External Token

建立新用戶並指派由您系統產生的 access token。

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
| `issueAccessToken` | boolean | ✅ | 設為 `false` 以啟用此授權模式 |
| `token` | string | ✅ | 您系統產生的自訂 token |
| `expirationDate` | string | ✅ | Token 過期時間（ISO 8601 格式） |

#### 範例請求

**JavaScript 範例：**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user002",
    nickname: "John",
    avatarUrl: "https://example.com/avatar.jpg",
    issueAccessToken: false,
    token: "my-custom-token-xyz",
    expirationDate: "2025-06-30T12:00:00Z",
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
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "my-custom-token-xyz",
  "expirationDate": "2025-06-30T12:00:00Z"
}'
```

#### Response

**成功回應（200 OK）**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `_id` | string | 用戶唯一識別碼 |
| `nickname` | string | 用戶顯示名稱 |
| `avatarUrl` | string | 用戶頭像 URL |
| `issueAccessToken` | boolean | Token issue 模式（false 表示使用 external token） |
| `token` | string | 您提供的自訂 token |
| `expirationDate` | string | Token 過期時間（ISO 8601 格式） |

#### 範例回應

```json
{
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "my-custom-token-xyz",
  "expirationDate": "2025-06-30T12:00:00Z"
}
```

#### 錯誤回應

**400 Bad Request** — 請求參數錯誤

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: token"
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
  "message": "User with _id 'user002' already exists"
}
```

------

## 使用場景

### 外部身份整合
- **SSO 整合**：將外部身份驗證系統的 token 綁定到 IMKIT 用戶
- **自訂過期時間**：根據業務需求設定 token 的有效期限

### Token 管理
- **Token 輪換**：定期更新用戶的存取權杖以確保安全性
- **多系統同步**：將其他系統核發的 token 同步至 IMKIT

------

## 注意事項

- **Token 驗證責任**：您的系統需要負責驗證 token 的有效性
- **過期時間管理**：請確保 `expirationDate` 與您系統中的 token 過期時間一致
- **Token 格式**：IMKIT 不限制 token 格式，但建議使用 JWT 或類似的標準格式
- **安全性**：請確保 token 具有足夠的熵值和適當的簽名機制
- **更新頻率**：建議在 token 過期前主動更新，避免服務中斷
- **統一認證**：建議將 IMKIT token 與您現有的認證系統整合，實作自動更新機制
- **使用 Token**：取得 token 後，在後續的 API 呼叫中透過 `IM-Authorization` header 傳遞
