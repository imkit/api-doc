# 核发 Token

## 概述

使用者资料由您的伺服器建立，但授权 token 由 IMKIT Chat Server 核发与控管。此模式适合希望快速整合且不需要自行管理 token 生命周期的应用程式。

实作流程：
1. 使用 `/admin/clients` API 建立 Client，并设定 `issueAccessToken: true`
2. Chat Server 将核发 access token，可用于后续 API 呼叫
3. 使用回传的 token 进行用户端认证

------

## API 端点

### 建立用户并核发 Token

建立新用户并由 Chat Server 自动核发 access token。

```http
POST /admin/clients
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的 API 金钥 |
| `Content-Type` | string | ✅ | `application/json` |

#### Request Body

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 用户唯一识别码 |
| `nickname` | string | ❌ | 用户显示名称 |
| `avatarUrl` | string | ❌ | 用户头像 URL |
| `issueAccessToken` | boolean | ✅ | 设为 `true` 以启用此授权模式 |

#### 范例请求

**JavaScript 范例：**

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

**cURL 范例：**

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

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `_id` | string | 用户唯一识别码 |
| `nickname` | string | 用户显示名称 |
| `avatarUrl` | string | 用户头像 URL |
| `issueAccessToken` | boolean | Token issue 模式 |
| `token` | string | 由 Chat Server 核发的 access token |
| `expirationDate` | string | Token 过期时间（ISO 8601 格式） |

#### 范例回应

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

#### 错误回应

**400 Bad Request** — 请求参数错误

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: _id"
}
```

**401 Unauthorized** — API 金钥无效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**409 Conflict** — 用户已存在

```json
{
  "error": "USER_EXISTS",
  "message": "User with _id 'user001' already exists"
}
```

------

## 使用场景

### 快速整合
- **简易开发**：让系统自动产生 token，无需自行管理 token 生成逻辑
- **快速验证**：适合开发和测试阶段快速取得有效的存取权杖

### 用户开通
- **新用户注册**：用户注册时同时建立 IMKIT 用户并取得 token，一步到位
- **自动化流程**：在后端服务中自动为新用户建立帐号并取得存取权杖

------

## 注意事项

- **Token 有效期限**：由 Chat Server 管理，请留意 `expirationDate` 栏位
- **Token 过期**：过期后可再次呼叫同一端点（`POST /admin/clients` 搭配 `issueAccessToken: true`）重新取得 token，不需要删除用户
- **无法自订**：此模式下无法自订 token 内容或过期时间
- **快取建议**：建议在应用程式中快取 token 以避免重复请求
- **使用 Token**：取得 token 后，在后续的 API 呼叫中透过 `IM-Authorization` header 传递
