# 移除成员

此端点允许您将一位或多位成员从指定聊天室中移除。若在 `members` 中传入当前用户自身的 ID，则代表该用户主动离开聊天室。此 API 仅供服务端使用，需要适当的身份验证。

## HTTP 请求

```
POST /rooms/:id/delete/members
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

| 参数            | 类型          | 必填 | 说明                                                                                       |
| --------------- | ------------- | ---- | ------------------------------------------------------------------------------------------ |
| `members`       | array[string] | ✅    | 要移除的成员 ID 数组；若包含当前用户自身 ID，代表主动离开聊天室                           |
| `systemMessage` | boolean       | ❌    | 是否自动生成离开或移除成员的系统消息（`leaveRoom` 或 `deleteMember`），默认为 `false`      |

## 使用示例

### 示例一：移除指定成员

**cURL 示例：**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/delete/members" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"members": ["ccc", "bbb"], "systemMessage": true}'
```

**JavaScript 示例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/delete/members`,
  {
    members: ["ccc", "bbb"],
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

### 示例二：当前用户主动离开聊天室

**JavaScript 示例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/delete/members`,
  {
    members: [`${MY_CLIENT_ID}`],
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
    "lastMessage": {
      "_id": "58a2dc9c965d09221ea7bedb",
      "message": "sadf dsfdf",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0,
        "id": "1485248560558"
      },
      "messageTime": "2017-02-14T10:31:56.006Z",
      "messageTimeMS": 1487068316006,
      "id": "58a2dc9c965d09221ea7bedb"
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1487068306745,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 1486720993257,
        "id": "1485248566481"
      }
    ],
    "id": "demo-room"
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
- `members` 中包含不在聊天室内的用户 ID
- 服务器内部错误

## 使用注意事项

- **主动离开**：在 `members` 数组中传入当前用户自身的 ID，即代表该用户主动离开聊天室
- **系统消息类型**：设置 `systemMessage: true` 时，若成员为主动离开，系统消息类型为 `leaveRoom`；若为被移除，则为 `deleteMember`
- 成员被移除后，将无法再访问该聊天室的任何消息记录
