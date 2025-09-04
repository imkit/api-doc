# 指派 Token

由您自行产生 token 后，指派给 IMKIT Chat Server 进行使用。

## 概述

由您自行产生与验证使用者 token，IMKIT 将仅负责消息处理。此模式适合已有现有认证系统且希望完全控制 token 生命周期的应用程序。

## 实现流程

1. 在您的系统中产生自定义 token
2. 使用 `/admin/clients` API 建立 Client，传入您提供的 token 与 expirationDate
3. 后续可通过 API 更新 token 或撤销 token
4. 您的系统负责 token 验证逻辑

------

## API 端点

### 建立用户并指派 External Token

建立新用户并指派由您系统产生的 access token。

```http
POST /admin/clients
```

#### Headers

| 参数           | 类型   | 必填 | 说明               |
| -------------- | ------ | ---- | ------------------ |
| `IM-API-KEY`   | string | ✅    | 您的 API 密钥      |
| `Content-Type` | string | ✅    | `application/json` |

#### Request Body

| 参数               | 类型    | 必填 | 说明                            |
| ------------------ | ------- | ---- | ------------------------------- |
| `_id`              | string  | ✅    | 用户唯一识别码                  |
| `nickname`         | string  | ✅    | 用户显示名称                    |
| `avatarUrl`        | string  | ❌    | 用户头像 URL                    |
| `issueAccessToken` | boolean | ✅    | 设为 `false` 以启用此授权模式   |
| `token`            | string  | ✅    | 您系统产生的自定义 token          |
| `expirationDate`   | string  | ✅    | Token 过期时间（ISO 8601 格式） |

#### 示例请求

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

**成功响应（200 OK）**

| 参数               | 类型    | 说明                                              |
| ------------------ | ------- | ------------------------------------------------- |
| `_id`              | string  | 用户唯一识别码                                    |
| `nickname`         | string  | 用户显示名称                                      |
| `avatarUrl`        | string  | 用户头像 URL                                      |
| `issueAccessToken` | boolean | Token issue 模式（false 表示使用 external token） |
| `token`            | string  | 您提供的自定义 token                                |
| `expirationDate`   | string  | Token 过期时间（ISO 8601 格式）                   |

#### 示例响应

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

#### 错误响应

**400 Bad Request** - 请求参数错误

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: token"
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
  "message": "User with _id 'user002' already exists"
}
```

------

## Token 管理

### 更新 Token

更新现有用户的 external token。

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

### 撤销 Token

撤销用户的 access token，使其无法继续使用聊天服务。

```http
DELETE /admin/clients/{user_id}/token
```

------

## 使用 Token

使用您的自定义 token 进行 API 调用：

```http
Authorization: Bearer my-custom-token-xyz
```

## 注意事项

- **Token 验证责任**：您的系统需要负责验证 token 的有效性
- **过期时间管理**：请确保 `expirationDate` 与您系统中的 token 过期时间一致
- **Token 格式**：IMKIT 不限制 token 格式，但建议使用 JWT 或类似的标准格式
- **安全性**：请确保 token 具有足够的熵值和适当的签名机制
- **更新频率**：建议在 token 过期前主动更新，避免服务中断

## 集成建议

1. **统一认证**：将 IMKIT token 与您现有的认证系统集成
2. **自动更新**：实现自动 token 更新机制，确保服务连续性
3. **监控机制**：监控 token 使用状况和过期情况
4. **错误处理**：妥善处理 token 过期和无效的情况