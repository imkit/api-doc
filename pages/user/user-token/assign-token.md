# 指派 Token

由您自行產生 token 後，指派給 IMKIT Chat Server 進行使用。

## 概述

由您自行產生與驗證使用者 token，IMKIT 將僅負責訊息處理。此模式適合已有現有認證系統且希望完全控制 token 生命週期的應用程式。

## 實作流程

1. 在您的系統中產生自訂 token
2. 使用 `/admin/clients` API 建立 Client，傳入您提供的 token 與 expirationDate
3. 後續可透過 API 更新 token 或撤銷 token
4. 您的系統負責 token 驗證邏輯

------

## API 端點

### 建立用戶並指派 External Token

建立新用戶並指派由您系統產生的 access token。

```http
POST /admin/clients
```

#### Headers

| 參數           | 類型   | 必填 | 說明               |
| -------------- | ------ | ---- | ------------------ |
| `IM-API-KEY`   | string | ✅    | 您的 API 金鑰      |
| `Content-Type` | string | ✅    | `application/json` |

#### Request Body

| 參數               | 類型    | 必填 | 說明                            |
| ------------------ | ------- | ---- | ------------------------------- |
| `_id`              | string  | ✅    | 用戶唯一識別碼                  |
| `nickname`         | string  | ✅    | 用戶顯示名稱                    |
| `avatarUrl`        | string  | ❌    | 用戶頭像 URL                    |
| `issueAccessToken` | boolean | ✅    | 設為 `false` 以啟用此授權模式   |
| `token`            | string  | ✅    | 您系統產生的自訂 token          |
| `expirationDate`   | string  | ✅    | Token 過期時間（ISO 8601 格式） |

#### 範例請求

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

#### Response

**成功回應（200 OK）**

| 參數               | 類型    | 說明                                              |
| ------------------ | ------- | ------------------------------------------------- |
| `_id`              | string  | 用戶唯一識別碼                                    |
| `nickname`         | string  | 用戶顯示名稱                                      |
| `avatarUrl`        | string  | 用戶頭像 URL                                      |
| `issueAccessToken` | boolean | Token issue 模式（false 表示使用 external token） |
| `token`            | string  | 您提供的自訂 token                                |
| `expirationDate`   | string  | Token 過期時間（ISO 8601 格式）                   |

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

**400 Bad Request** - 請求參數錯誤

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: token"
}
```

**401 Unauthorized** - API 金鑰無效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**409 Conflict** - 用戶已存在

```json
{
  "error": "USER_EXISTS",
  "message": "User with _id 'user002' already exists"
}
```

------

## Token 管理

### 更新 Token

更新現有用戶的 external token。

```http
PUT /admin/clients/{user_id}/token
```

#### Request Body

```json
{
  "token": "new-custom-token-abc",
  "expirationDate": "2025-12-31T23:59:59Z"
}
```

### 撤銷 Token

撤銷用戶的 access token，使其無法繼續使用聊天服務。

```http
DELETE /admin/clients/{user_id}/token
```

------

## 使用 Token

使用您的自訂 token 進行 API 呼叫：

```http
Authorization: Bearer my-custom-token-xyz
```

## 注意事項

- **Token 驗證責任**：您的系統需要負責驗證 token 的有效性
- **過期時間管理**：請確保 `expirationDate` 與您系統中的 token 過期時間一致
- **Token 格式**：IMKIT 不限制 token 格式，但建議使用 JWT 或類似的標準格式
- **安全性**：請確保 token 具有足夠的熵值和適當的簽名機制
- **更新頻率**：建議在 token 過期前主動更新，避免服務中斷

## 整合建議

1. **統一認證**：將 IMKIT token 與您現有的認證系統整合
2. **自動更新**：實作自動 token 更新機制，確保服務連續性
3. **監控機制**：監控 token 使用狀況和過期情況
4. **錯誤處理**：妥善處理 token 過期和無效的情況
