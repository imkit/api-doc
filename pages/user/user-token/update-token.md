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

| 參數           | 類型   | 必填 | 說明               |
| -------------- | ------ | ---- | ------------------ |
| `IM-API-KEY`   | string | ✅    | 您的 API 金鑰      |
| `Content-Type` | string | ✅    | `application/json` |

#### Path Parameters

| 參數        | 類型   | 必填 | 說明           |
| ----------- | ------ | ---- | -------------- |
| `client_id` | string | ✅    | 用戶唯一識別碼 |

#### Request Body

| 參數             | 類型   | 必填 | 說明                            |
| ---------------- | ------ | ---- | ------------------------------- |
| `token`          | string | ✅    | 新的 access token               |
| `expirationDate` | string | ✅    | Token 過期時間（ISO 8601 格式） |

#### 範例請求

```json
{
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z"
}
```

#### Response

**成功回應（200 OK）**

| 參數               | 類型    | 說明                            |
| ------------------ | ------- | ------------------------------- |
| `_id`              | string  | 用戶唯一識別碼                  |
| `nickname`         | string  | 用戶顯示名稱                    |
| `avatarUrl`        | string  | 用戶頭像 URL                    |
| `issueAccessToken` | boolean | Token issue 模式                |
| `token`            | string  | 更新後的 access token           |
| `expirationDate`   | string  | 更新後的 Token 過期時間         |
| `updatedAt`        | string  | Token 更新時間（ISO 8601 格式） |

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

**400 Bad Request** - 請求參數錯誤

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid expirationDate format"
}
```

**400 Bad Request** - Token 格式錯誤

```json
{
  "error": "INVALID_TOKEN",
  "message": "Token cannot be empty"
}
```

**401 Unauthorized** - API 金鑰無效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** - 用戶不存在

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user002' not found"
}
```

**409 Conflict** - Token 衝突

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
- **權限調整**：調整 token 內容以反映新的權限設定

## 注意事項

- **即時生效**：Token 更新後立即生效，舊 token 將失效
- **唯一性檢查**：系統會檢查新 token 是否與其他用戶衝突
- **時間格式**：`expirationDate` 必須使用 ISO 8601 格式
- **向前兼容**：確保新 token 與現有系統兼容

## 最佳實務

### 安全性考量

1. **Token 複雜度**：使用足夠複雜的 token 格式
2. **過期時間設定**：合理設定過期時間，平衡安全性與使用便利性
3. **更新頻率**：建立定期 token 更新機制
4. **審計記錄**：記錄所有 token 更新操作

### 操作建議

1. **漸進式更新**：分批更新大量用戶的 token
2. **驗證機制**：更新前驗證新 token 的有效性
3. **回滾準備**：準備回滾機制以應對更新失敗
4. **監控告警**：監控 token 更新的成功率和異常情況

### 整合建議

1. **自動化流程**：建立自動化的 token 更新流程
2. **同步機制**：確保與您的認證系統同步更新
3. **通知系統**：更新成功後通知相關系統或用戶
4. **備份策略**：更新前備份舊的 token 資訊
