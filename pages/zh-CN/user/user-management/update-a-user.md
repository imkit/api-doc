# 更新用户

此端点允许您更新系统中现有的用户信息。此 API 仅供服务器端使用，需要适当的身份验证。

## HTTP 请求

```
POST /admin/clients
```

## 身份验证

在请求标头中包含您的平台 API 密钥：

| 标头         | 类型   | 说明              | 必填 |
| ------------ | ------ | ----------------- | ---- |
| `IM-API-KEY` | string | 您的平台 API 密钥 | ✅    |

## 请求内容

请求内容应包含 JSON 格式的用户端更新信息。

### 必填参数

| 参数  | 类型   | 说明                     |
| ----- | ------ | ------------------------ |
| `_id` | string | 要更新的用户端唯一识别码 |

### 可更新参数

| 参数        | 类型   | 说明               |
| ----------- | ------ | ------------------ |
| `nickname`  | string | 用户端显示名称     |
| `avatarUrl` | string | 用户端头像图片 URL |

## Token 管理选项

更新用户时，您可以选择不同的 Token 管理方式：

### 选项一：重新发行访问 Token

使用此选项为现有用户重新产生新的访问令牌。

| 参数               | 类型    | 说明                           |
| ------------------ | ------- | ------------------------------ |
| `issueAccessToken` | boolean | 设为 `true` 以重新产生访问令牌 |

**请求示例：**

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

### 选项二：绑定指定 Token

使用此选项将新的自定义 token 绑定到现有用户端。

| 参数               | 类型    | 说明                       |
| ------------------ | ------- | -------------------------- |
| `issueAccessToken` | boolean | 设为 `false` 或省略此参数  |
| `token`            | string  | 要绑定的新 token           |
| `expirationDate`   | string  | Token 过期时间（ISO 格式） |

**请求示例：**

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

### 选项三：仅更新基本信息

如果只需要更新用户端的基本信息（如昵称、头像），可以省略所有 token 相关参数。

**请求示例：**

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

## 响应

### 成功响应

当请求成功时，API 会返回更新后的用户端信息：

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

### 响应字段

| 字段     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 响应代码（0 表示成功） |
| `RM`     | string | 响应消息               |
| `result` | object | 更新后的用户端信息     |

#### 用户端对象字段

| 字段              | 类型   | 说明                                          |
| ----------------- | ------ | --------------------------------------------- |
| `_id`             | string | 用户唯一识别码                                |
| `nickname`        | string | 更新后的用户显示名称                          |
| `avatarUrl`       | string | 更新后的用户头像图片 URL                      |
| `token`           | string | 访问令牌（仅在重新发行或绑定新 token 时出现） |
| `expirationDate`  | string | Token 过期时间（仅在有 token 操作时出现）     |
| `updatedAt`       | string | 最后更新时间戳（ISO 格式）                    |
| `lastLoginTimeMS` | number | 最后登录时间戳（毫秒）                        |

## 错误处理

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的 API 密钥
- 用户端不存在（指定的 `_id` 找不到）
- 无效的 token 格式
- 参数格式错误
- 服务器内部错误

## 使用注意事项

- 此端点专用于更新现有用户端的信息
- 必须提供有效的 `_id` 来识别要更新的用户端
- 如果用户端不存在，请求将会失败
- 只有提供的字段会被更新，未提供的字段保持原值
- 重新发行 token 会使旧的 token 失效
- 绑定新 token 会替换原有的 token
- 所有时间戳均为 UTC 格式
- 头像图片的文件大小应控制在合理范围内