# 建立用户

## 概述

此端点允许您在系统中建立或更新用户。若 `_id` 不存在则建立新用户，若已存在则更新该用户的资料。此 API 仅供伺服器端使用，需要适当的身份验证。

------

## API 端点

### 建立或更新用户
在系统中建立新用户，或更新已存在的用户资料。

```http
POST /admin/clients
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金钥 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

请求内容应包含 JSON 格式的用户端资讯。

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 用户端唯一识别码 |
| `nickname` | string | ❌ | 用户端显示名称 |
| `avatarUrl` | string | ❌ | 用户端头像图片 URL |
| `issueAccessToken` | boolean | ❌ | 设为 `true` 以产生新的存取权杖；设为 `false` 或省略以使用自订 token |
| `token` | string | ❌ | 要绑定到用户端的自订 token（当 `issueAccessToken` 为 `false` 或省略时使用） |
| `expirationDate` | string | ❌ | Token 过期时间（ISO 格式，当使用自订 token 时设定） |

#### 范例请求

##### 选项一：聊天伺服器发行 Token

使用此选项让聊天伺服器自动为用户产生新的存取权杖。

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
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

##### 选项二：自订 Token 绑定

使用此选项将特定的 token 绑定到用户，并设定自订的过期时间。

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io

{
  "nickname": "张小明",
  "avatarUrl": "https://example.com/avatar.jpg",
  "_id": "user123",
  "token": "f7b6d364-1e96-4b1a-aa75-cce93268b101",
  "expirationDate": "2026-12-31T23:59:59.000Z"
}
```

#### Response

**成功回应（200 OK）**

当请求成功时，API 会回传建立的用户端资讯：

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result` | object | 建立的用户端资讯 |

**用户端物件栏位**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `_id` | string | 用户唯一识别码 |
| `nickname` | string | 用户显示名称 |
| `avatarUrl` | string | 用户头像图片 URL |
| `token` | string | 存取权杖（仅在 `issueAccessToken` 为 true 时出现） |
| `expirationDate` | string | Token 过期时间（仅在发行 token 时出现） |
| `lastLoginTimeMS` | number | 最后登入时间戳（毫秒） |
| `updatedAt` | string | 最后更新时间戳（ISO 格式） |

#### 范例回应

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

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- **无效的 API 金钥** - 提供的 `IM-API-KEY` 无效或已过期
- **缺少必填参数** - 未提供必要的 `_id` 参数
- **无效的 token 格式** - 自订 token 格式不正确
- **伺服器内部错误** - 伺服器端发生未预期的错误

------

## 使用场景

### 用户注册
- **使用伺服器发行 Token 建立用户**：当新用户注册时，设定 `issueAccessToken: true` 让系统自动产生存取权杖
- **使用自订 Token 建立用户**：当需要整合外部身份验证系统时，绑定自订 token 并设定过期时间

------

## 注意事项

- **唯一识别码**：每个用户端都需要唯一的 `_id` 识别码
- **Token 栏位**：回应中的 `token` 栏位仅在 `issueAccessToken` 设为 `true` 时包含
- **时间戳格式**：所有时间戳均为 UTC 格式
- **头像图片**：头像图片的档案大小应控制在合理范围内
- **伺服器端专用**：此端点用于建立新用户端，仅供伺服器端使用
