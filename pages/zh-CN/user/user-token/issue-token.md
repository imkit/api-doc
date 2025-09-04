# 核发 Token

Token 由 IMKIT Chat Server 来进行核发。

## 概述

使用者数据由您的服务器建立，但授权 token 由 IMKIT Chat Server 核发与控管。此模式适合希望快速集成且不需要自行管理 token 生命周期的应用程序。

## 实现流程

1. 使用 `/admin/clients` API 建立 Client，并设置 `issueAccessToken: true`
2. Chat Server 将 issue access token，可用于后续 API 调用
3. 使用返回的 token 进行用户端认证

------

## API 端点

### 建立用户并 Issue Token

建立新用户并由 Chat Server 自动 issue access token。

```http
POST /admin/clients
```

#### Headers

| 参数           | 类型   | 必填 | 说明               |
| -------------- | ------ | ---- | ------------------ |
| `IM-API-KEY`   | string | ✅    | 您的 API 密钥      |
| `Content-Type` | string | ✅    | `application/json` |

#### Request Body

| 参数               | 类型    | 必填 | 说明                         |
| ------------------ | ------- | ---- | ---------------------------- |
| `_id`              | string  | ✅    | 用户唯一识别码               |
| `nickname`         | string  | ✅    | 用户显示名称                 |
| `avatarUrl`        | string  | ❌    | 用户头像 URL                 |
| `issueAccessToken` | boolean | ✅    | 设为 `true` 以启用此授权模式 |

#### 示例请求

```json
{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true
}
```

#### Response

**成功响应（200 OK）**

| 参数               | 类型    | 说明                                 |
| ------------------ | ------- | ------------------------------------ |
| `_id`              | string  | 用户唯一识别码                       |
| `nickname`         | string  | 用户显示名称                         |
| `avatarUrl`        | string  | 用户头像 URL                         |
| `issueAccessToken` | boolean | Token issue 模式                     |
| `token`            | string  | 由 Chat Server issue 的 access token |
| `expirationDate`   | string  | Token 过期时间（ISO 8601 格式）      |

#### 示例响应

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

#### 错误响应

**400 Bad Request** - 请求参数错误

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: _id"
}
```

**401 Unauthorized** - API 密钥无效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**409 Conflict** - 用户已存在

```json
{
  "error": "USER_EXISTS",
  "message": "User with _id 'user001' already exists"
}
```

------

## 使用 Token

取得 token 后，您可以在后续的 API 调用中使用此 token：

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 注意事项

- Token 有效期限由 Chat Server 管理，请留意 `expirationDate` 字段
- Token 过期后需要重新建立用户以取得新的 token
- 此模式下无法自定义 token 内容或过期时间
- 建议在应用程序中缓存 token 以避免重复请求