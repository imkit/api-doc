# 创建用户

此端点允许您在系统中创建新的用户。此 API 仅供服务器端使用，需要适当的身份验证。

## HTTP 请求

```
POST /admin/clients
```

## 身份验证

在请求标头中包含您的平台 API 密钥：

| 标头         | 说明              | 必填 |
| ------------ | ----------------- | ---- |
| `IM-API-KEY` | 您的平台 API 密钥 | ✅    |

## 请求内容

请求内容应包含 JSON 格式的用户端信息。

### 必填参数

| 参数  | 类型   | 说明             |
| ----- | ------ | ---------------- |
| `_id` | string | 用户端唯一识别码 |

### 选填参数

| 参数        | 类型   | 说明               |
| ----------- | ------ | ------------------ |
| `nickname`  | string | 用户端显示名称     |
| `avatarUrl` | string | 用户端头像图片 URL |

## 身份验证选项

创建用户时，您可以选择两种身份验证方式：

### 选项一：聊天服务器发行 Token

使用此选项让聊天服务器自动为用户产生新的访问令牌。

| 参数               | 类型    | 说明                           |
| ------------------ | ------- | ------------------------------ |
| `issueAccessToken` | boolean | 设为 `true` 以产生新的访问令牌 |

**请求示例：**

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    nickname: "张小明",
    avatarUrl: "https://example.com/avatar.jpg",
    _id: "user123",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### 选项二：自定义 Token 绑定

使用此选项将特定的 token 绑定到用户，并设置自定义的过期时间。

| 参数               | 类型    | 说明                       |
| ------------------ | ------- | -------------------------- |
| `issueAccessToken` | boolean | 设为 `false` 或省略此参数  |
| `token`            | string  | 要绑定到用户端的自定义 token |
| `expirationDate`   | string  | Token 过期时间（ISO 格式） |

**请求示例：**

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {您的_API_密钥}
Content-Type: application/json; charset=utf-8
Host: imkit-dev.funtek.io

{
  "nickname": "张小明",
  "avatarUrl": "https://example.com/avatar.jpg",
  "_id": "user123",
  "token": "f7b6d364-1e96-4b1a-aa75-cce93268b101",
  "expirationDate": "2020-06-18T06:15:36.763Z"
}
```

## 响应

### 成功响应

当请求成功时，API 会返回创建的用户端信息：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "张小明",
    "description": "使用者描述",
    "avatarUrl": "https://example.com/avatar.jpg",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2020-06-11T06:15:36.761Z",
    "isRobot": false,
    "mute": [],
    "id": "user123",
    "lastLoginTimeMS": 1588744338369,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2020-06-18T06:15:36.763Z"
  }
}
```

### 响应字段

| 字段     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 响应代码（0 表示成功） |
| `RM`     | string | 响应消息               |
| `result` | object | 创建的用户端信息       |

#### 用户端对象字段

| 字段              | 类型   | 说明                                               |
| ----------------- | ------ | -------------------------------------------------- |
| `_id`             | string | 用户唯一识别码                                     |
| `nickname`        | string | 用户显示名称                                       |
| `avatarUrl`       | string | 用户头像图片 URL                                   |
| `token`           | string | 访问令牌（仅在 `issueAccessToken` 为 true 时出现） |
| `expirationDate`  | string | Token 过期时间（仅在发行 token 时出现）            |
| `lastLoginTimeMS` | number | 最后登录时间戳（毫秒）                             |
| `updatedAt`       | string | 最后更新时间戳（ISO 格式）                         |

## 错误处理

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的 API 密钥
- 缺少必填参数
- 无效的 token 格式
- 服务器内部错误

## 使用注意事项

- 此端点用于创建新用户端
- 每个用户端都需要唯一的 `_id` 识别码
- 响应中的 `token` 字段仅在 `issueAccessToken` 设为 `true` 时包含
- 所有时间戳均为 UTC 格式
- 头像图片的文件大小应控制在合理范围内