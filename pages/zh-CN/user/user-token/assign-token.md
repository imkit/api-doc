# 指派 Token

## 概述

由您自行产生与验证使用者 token，指派给 IMKIT Chat Server 进行使用。IMKIT 将仅负责讯息处理，此模式适合已有现有认证系统且希望完全控制 token 生命周期的应用程式。

实作流程：
1. 在您的系统中产生自订 token
2. 使用 `/admin/clients` API 建立 Client，传入您提供的 token 与 expirationDate
3. 后续可透过「更新 Token」API 更新，或透过「撤销 Token」API 撤销
4. 您的系统负责 token 验证逻辑

------

## API 端点

### 建立用户并指派 External Token

建立新用户并指派由您系统产生的 access token。

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
| `issueAccessToken` | boolean | ✅ | 设为 `false` 以启用此授权模式 |
| `token` | string | ✅ | 您系统产生的自订 token |
| `expirationDate` | string | ✅ | Token 过期时间（ISO 8601 格式） |

#### 范例请求

**JavaScript 范例：**

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

**cURL 范例：**

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

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `_id` | string | 用户唯一识别码 |
| `nickname` | string | 用户显示名称 |
| `avatarUrl` | string | 用户头像 URL |
| `issueAccessToken` | boolean | Token issue 模式（false 表示使用 external token） |
| `token` | string | 您提供的自订 token |
| `expirationDate` | string | Token 过期时间（ISO 8601 格式） |

#### 范例回应

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

#### 错误回应

**400 Bad Request** — 请求参数错误

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: token"
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
  "message": "User with _id 'user002' already exists"
}
```

------

## 使用场景

### 外部身份整合
- **SSO 整合**：将外部身份验证系统的 token 绑定到 IMKIT 用户
- **自订过期时间**：根据业务需求设定 token 的有效期限

### Token 管理
- **Token 轮换**：定期更新用户的存取权杖以确保安全性
- **多系统同步**：将其他系统核发的 token 同步至 IMKIT

------

## 注意事项

- **Token 验证责任**：您的系统需要负责验证 token 的有效性
- **过期时间管理**：请确保 `expirationDate` 与您系统中的 token 过期时间一致
- **Token 格式**：IMKIT 不限制 token 格式，但建议使用 JWT 或类似的标准格式
- **安全性**：请确保 token 具有足够的熵值和适当的签名机制
- **更新频率**：建议在 token 过期前主动更新，避免服务中断
- **统一认证**：建议将 IMKIT token 与您现有的认证系统整合，实作自动更新机制
- **使用 Token**：取得 token 后，在后续的 API 呼叫中透过 `IM-Authorization` header 传递
