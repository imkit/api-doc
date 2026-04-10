# 更新 Token

## 概述

更新指定用户的 access token 和有效期间。适用于 token 轮换、延长有效期或更换认证凭证等场景。

------

## API 端点

### 更新用户 Token

更新指定用户的 access token 和过期时间。

```http
PUT /admin/clients/{client_id}/token
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的 API 金钥 |
| `Content-Type` | string | ✅ | `application/json` |

#### Path Parameters

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `client_id` | string | ✅ | 用户唯一识别码 |

#### Request Body

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `token` | string | ✅ | 新的 access token |
| `expirationDate` | string | ✅ | Token 过期时间（ISO 8601 格式） |

#### 范例请求

**JavaScript 范例：**

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

**cURL 范例：**

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

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `_id` | string | 用户唯一识别码 |
| `nickname` | string | 用户显示名称 |
| `avatarUrl` | string | 用户头像 URL |
| `issueAccessToken` | boolean | Token issue 模式 |
| `token` | string | 更新后的 access token |
| `expirationDate` | string | 更新后的 Token 过期时间 |
| `updatedAt` | string | Token 更新时间（ISO 8601 格式） |

#### 范例回应

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

#### 错误回应

**400 Bad Request** — 请求参数错误

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid expirationDate format"
}
```

**401 Unauthorized** — API 金钥无效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** — 用户不存在

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user002' not found"
}
```

**409 Conflict** — Token 冲突

```json
{
  "error": "TOKEN_CONFLICT",
  "message": "Token already exists for another client"
}
```

------

## 使用场景

### Token 生命周期管理
- **定期轮换**：定期更新 token 提升安全性
- **延长有效期**：延长即将过期的 token 有效期间
- **紧急更新**：安全事件发生时紧急更换 token

### 系统维护
- **批次更新**：系统升级时批次更新用户 token
- **格式迁移**：从旧格式 token 迁移到新格式

------

## 注意事项

- **即时生效**：Token 更新后立即生效，旧 token 将失效
- **唯一性检查**：系统会检查新 token 是否与其他用户冲突
- **时间格式**：`expirationDate` 必须使用 ISO 8601 格式
- **Token 复杂度**：建议使用足够复杂的 token 格式
- **过期时间设定**：合理设定过期时间，平衡安全性与使用便利性
- **同步机制**：确保与您的认证系统同步更新
