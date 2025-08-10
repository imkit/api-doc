# 撤銷 Token

## 概述

撤銷指定用戶的 access token，使其無法繼續使用聊天服務。您可以選擇撤銷特定的 token，或移除該用戶的所有 token。

------

## API 端點

### 撤銷用戶 Token

撤銷指定用戶的 access token。

```http
DELETE /admin/clients/{client_id}/token
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

| 參數    | 類型   | 必填 | 說明                                               |
| ------- | ------ | ---- | -------------------------------------------------- |
| `token` | string | ❌    | 要撤銷的特定 token，若不提供則移除該用戶所有 token |

#### 範例請求

**撤銷特定 Token**

```json
{
  "token": "old-token-xyz"
}
```

**撤銷所有 Token**

```json
{}
```

#### Response

**成功回應（200 OK）**

| 參數            | 類型    | 說明                |
| --------------- | ------- | ------------------- |
| `success`       | boolean | 操作是否成功        |
| `message`       | string  | 操作結果訊息        |
| `revokedTokens` | number  | 被撤銷的 token 數量 |

#### 範例回應

**撤銷特定 Token**

```json
{
  "success": true,
  "message": "Token revoked successfully",
  "revokedTokens": 1
}
```

**撤銷所有 Token**

```json
{
  "success": true,
  "message": "All tokens revoked successfully",
  "revokedTokens": 3
}
```

#### 錯誤回應

**400 Bad Request** - 請求參數錯誤

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid client_id format"
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
  "message": "Client with id 'user001' not found"
}
```

**404 Not Found** - Token 不存在（當指定特定 token 時）

```json
{
  "error": "TOKEN_NOT_FOUND",
  "message": "Specified token not found for this client"
}
```

------

## 使用場景

### 安全性考量

- **帳號被盜用**：立即撤銷所有 token 以確保安全
- **設備遺失**：撤銷特定設備的 token
- **員工離職**：撤銷企業用戶的所有 token

### 系統管理

- **強制登出**：撤銷 token 強制用戶重新登入
- **Token 輪換**：定期撤銷舊 token 提升安全性
- **權限變更**：撤銷 token 以重新分配權限

## 注意事項

- **即時生效**：Token 撤銷後立即生效，用戶將無法繼續使用聊天功能
- **不可復原**：撤銷的 token 無法恢復，需要重新 issue 或指派新 token
- **批次操作**：不提供 `token` 參數可一次撤銷用戶的所有 token
- **審計日誌**：建議記錄 token 撤銷操作以供後續審計

## 最佳實務

1. **漸進式撤銷**：優先撤銷特定 token，避免影響用戶其他設備
2. **通知機制**：撤銷 token 前通知用戶，提供良好的用戶體驗
3. **監控機制**：監控撤銷操作，防止誤操作或惡意攻擊
4. **備份策略**：在撤銷前備份重要的用戶會話資料
