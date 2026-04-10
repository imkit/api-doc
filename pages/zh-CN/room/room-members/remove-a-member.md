# 移除成员

## 概述

此端点允许您将一位或多位成员从指定聊天室中移除。若在 `members` 中传入当前用户自身的 ID，则代表该用户主动离开聊天室。

------

## API 端点

### 移除成员

将一位或多位成员从指定聊天室中移除。

```http
POST /rooms/:id/delete/members
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 用户端金钥 |
| `IM-Authorization` | string | ✅ | 用户端权杖 |

#### Path Parameters

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `:id` | string | ✅ | 聊天室唯一识别码 |

#### Post Body

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `members` | array[string] | ✅ | 要移除的成员 ID 阵列；若包含当前用户自身 ID，代表主动离开聊天室 |
| `systemMessage` | boolean | ❌ | 是否自动产生离开或移除成员的系统讯息（`leaveRoom` 或 `deleteMember`），预设为 `false` |

#### 范例请求

**范例一：移除指定成员**

**cURL 范例：**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/delete/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"members": ["ccc", "bbb"], "systemMessage": true}'
```

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/delete/members`,
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

**范例二：当前用户主动离开聊天室**

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/delete/members`,
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

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result` | object | 更新后的聊天室完整资讯 |

#### 范例回应

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

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- 无效的用户端金钥或授权权杖
- 指定的聊天室不存在
- `members` 中包含不在聊天室内的用户 ID
- 伺服器内部错误

------

## 使用场景

### 成员管理
- **移除成员**：管理员可从聊天室中移除一位或多位成员
- **主动离开**：用户可透过传入自身 ID 主动离开聊天室

### 系统通知
- **自动通知**：设定 `systemMessage: true` 时，系统会根据情境自动产生 `leaveRoom` 或 `deleteMember` 类型的系统讯息

------

## 注意事项

- **主动离开**：在 `members` 阵列中传入当前用户自身的 ID，即代表该用户主动离开聊天室
- **系统讯息**：设定 `systemMessage: true` 时，若成员为主动离开，系统讯息类型为 `leaveRoom`；若为被移除，则为 `deleteMember`
- 成员被移除后，将无法再存取该聊天室的任何讯息记录
