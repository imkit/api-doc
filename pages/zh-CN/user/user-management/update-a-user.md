# 更新用户

## 概述

此端点允许您更新系统中现有的用户信息。此 API 仅供服务器端使用，需要适当的身份验证。

------

## API 端点

### 更新用户
更新系统中现有的用户端信息。

```http
POST /admin/clients
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 密钥 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

请求内容应包含 JSON 格式的用户端更新信息。

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 要更新的用户端唯一识别码 |
| `nickname` | string | ❌ | 用户端显示名称 |
| `avatarUrl` | string | ❌ | 用户端头像图片 URL |
| `issueAccessToken` | boolean | ❌ | 设为 `true` 以重新产生访问令牌；设为 `false` 或省略以使用自定义 token |
| `token` | string | ❌ | 要绑定的新 token（当 `issueAccessToken` 为 `false` 或省略时使用） |
| `expirationDate` | string | ❌ | Token 过期时间（ISO 格式，当使用自定义 token 时设置） |

#### 示例请求

##### 选项一：重新发行访问 Token

使用此选项为现有用户重新产生新的访问令牌。

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    _id: "user123",
    nickname: "王小华", // 更新显示名称
    avatarUrl: "https://example.com/new-avatar.jpg", // 更新头像
    issueAccessToken: true, // 重新发行 token
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### 选项二：绑定指定 Token

使用此选项将新的自定义 token 绑定到现有用户端。

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {您的_API_密钥}
Content-Type: application/json; charset=utf-8
Host: imkit-dev.funtek.io

{
  "_id": "user123",
  "nickname": "王小华",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "token": "a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
  "expirationDate": "2025-12-31T23:59:59.999Z"
}
```

##### 选项三：仅更新基本信息

如果只需要更新用户端的基本信息（如昵称、头像），可以省略所有 token 相关参数。

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    _id: "user123",
    nickname: "王小华",
    avatarUrl: "https://example.com/new-avatar.jpg"
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**成功响应（200 OK）**

当请求成功时，API 会返回更新后的用户端信息：

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `RC` | number | 响应代码（0 表示成功） |
| `RM` | string | 响应消息 |
| `result` | object | 更新后的用户端信息 |

**用户端对象字段**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `_id` | string | 用户唯一识别码 |
| `nickname` | string | 更新后的用户显示名称 |
| `avatarUrl` | string | 更新后的用户头像图片 URL |
| `token` | string | 访问令牌（仅在重新发行或绑定新 token 时出现） |
| `expirationDate` | string | Token 过期时间（仅在有 token 操作时出现） |
| `updatedAt` | string | 最后更新时间戳（ISO 格式） |
| `lastLoginTimeMS` | number | 最后登录时间戳（毫秒） |

#### 示例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "王小华",
    "description": "使用者描述",
    "avatarUrl": "https://example.com/new-avatar.jpg",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2025-08-08T10:30:45.123Z",
    "isRobot": false,
    "mute": [],
    "id": "user123",
    "lastLoginTimeMS": 1588744338369,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2025-12-31T23:59:59.999Z"
  }
}
```

#### 错误响应

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- **无效的 API 密钥** - 提供的 `IM-API-KEY` 无效或已过期
- **用户端不存在** - 指定的 `_id` 找不到对应的用户端
- **无效的 token 格式** - 自定义 token 格式不正确
- **参数格式错误** - 提供的参数格式不符合要求
- **服务器内部错误** - 服务器端发生未预期的错误

------

## 使用场景

### 用户信息维护
- **更新显示名称与头像**：当用户修改个人资料时，仅更新 `nickname` 和 `avatarUrl` 等基本信息
- **重新发行访问令牌**：当用户的 token 即将过期或需要刷新时，设置 `issueAccessToken: true` 重新产生

### Token 管理
- **绑定自定义 Token**：当整合外部身份验证系统时，将自定义的 token 绑定到现有用户端
- **Token 轮换**：定期更换用户的 token 以提升安全性

------

## 注意事项

- **用户必须存在**：必须提供有效的 `_id` 来识别要更新的用户端，如果用户端不存在，请求将会失败
- **部分更新**：只有提供的字段会被更新，未提供的字段保持原值
- **Token 失效**：重新发行 token 会使旧的 token 失效
- **Token 替换**：绑定新 token 会替换原有的 token
- **时间戳格式**：所有时间戳均为 UTC 格式
- **头像图片**：头像图片的文件大小应控制在合理范围内
- **服务器端专用**：此端点专用于更新现有用户端的信息
