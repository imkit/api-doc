# 添加成员

此端点允许您将一位或多位用户添加到指定聊天室。支持邀请确认机制，并可选择是否自动生成系统消息通知。此 API 仅供服务端使用，需要适当的身份验证。

## HTTP 请求

```
POST /rooms/:id/members
```

## 身份验证

在请求标头中包含您的客户端密钥和授权令牌：

| 标头               | 说明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 客户端密钥   | ✅    |
| `IM-Authorization` | 客户端令牌   | ✅    |

## 路径参数

| 参数  | 类型   | 说明             | 必填 |
| ----- | ------ | ---------------- | ---- |
| `:id` | string | 聊天室唯一标识符 | ✅    |

## 请求内容

| 参数                 | 类型          | 必填 | 说明                                                                             |
| -------------------- | ------------- | ---- | -------------------------------------------------------------------------------- |
| `invitees`           | array[string] | ✅    | 要添加的成员客户端 ID 数组                                                       |
| `systemMessage`      | boolean       | ❌    | 是否自动生成添加成员的系统消息，默认为 `false`                                   |
| `invitationRequired` | boolean       | ❌    | 被邀请者是否需要接受邀请才能加入，默认为 `false`。仅适用于**群组**聊天室         |

## 使用示例

### 示例一：邀请多位成员（需接受邀请）

**cURL 示例：**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/members" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"invitees": ["ccc", "bbb"], "invitationRequired": true, "systemMessage": true}'
```

**JavaScript 示例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: true,
    systemMessage: true,
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### 示例二：直接添加成员（无需邀请确认）

**JavaScript 示例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: false,
    systemMessage: true,
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

## 响应

### 成功响应

当请求成功时，API 会返回更新后的聊天室信息：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "name": "Demo",
    "cover": "http://loremflickr.com/240/240/style?demo",
    "description": "public demo room",
    "roomType": "group",
    "webhook": "meet-taipei-intro",
    "botState": "CONTACT",
    "botMode": false,
    "encrypted": false,
    "serviceStatus": 0,
    "roomTags": ["demo", "foo", "bar"],
    "status": 1,
    "lastMessage": {
      "_id": "5e5b88e91da9d53097b13840",
      "room": "demo-room",
      "messageType": "addMember",
      "sender": {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "id": "aaa",
        "lastLoginTimeMS": 0
      },
      "member": {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "id": "ccc",
        "lastLoginTimeMS": 0
      },
      "message": "CCC",
      "appID": "SampleApp",
      "id": "5e5b88e91da9d53097b13840",
      "messageTimeMS": 1583057129059,
      "updatedAtMS": 1583057129059,
      "createdAtMS": 1583057129059
    },
    "members": [
      {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "isRobot": false,
        "id": "aaa",
        "lastLoginTimeMS": 1541926310026
      },
      {
        "_id": "bbb",
        "nickname": "bbb",
        "avatarUrl": "",
        "isRobot": false,
        "id": "bbb",
        "lastLoginTimeMS": 1541824600261
      },
      {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "isRobot": false,
        "id": "ccc",
        "lastLoginTimeMS": 0
      }
    ],
    "id": "demo-room",
    "createdTimeMS": 1525001412492
  }
}
```

### 响应字段

| 字段     | 类型   | 说明                     |
| -------- | ------ | ------------------------ |
| `RC`     | number | 响应码（0 表示成功）     |
| `RM`     | string | 响应消息                 |
| `result` | object | 更新后的聊天室完整信息   |

## 错误处理

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- 指定的聊天室不存在
- `invitees` 中包含不存在的用户 ID
- 服务器内部错误

## 使用注意事项

- **`invitationRequired`**：设为 `true` 时，被邀请者需主动接受邀请才会加入聊天室；设为 `false` 时，被邀请者会直接加入
- **系统消息**：设置 `systemMessage: true` 时，系统会自动在聊天室内生成"添加成员"通知消息
- **单聊聊天室**：`invitationRequired` 对单聊（`direct`）聊天室无效，系统会自动设为 `false`
- 成功添加后，响应会包含更新后的完整聊天室信息，包含最新的成员列表
