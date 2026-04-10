# 新增成员

## 概述

此端点允许您将一位或多位用户加入指定聊天室。支援邀请确认机制，并可选择是否自动产生系统讯息通知。

------

## API 端点

### 新增成员

将一位或多位用户加入指定聊天室。

```http
POST /rooms/:id/members
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
| `invitees` | array[string] | ✅ | 要加入的成员用户端 ID 阵列 |
| `systemMessage` | boolean | ❌ | 是否自动产生加入成员的系统讯息，预设为 `false` |
| `invitationRequired` | boolean | ❌ | 受邀者是否需要接受邀请才能加入，预设为 `false`。仅适用于**群组**聊天室 |

#### 范例请求

**范例一：邀请多位成员（需接受邀请）**

**cURL 范例：**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"invitees": ["ccc", "bbb"], "invitationRequired": true, "systemMessage": true}'
```

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/members`,
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

**范例二：直接加入成员（无需邀请确认）**

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/members`,
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

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- 无效的用户端金钥或授权权杖
- 指定的聊天室不存在
- `invitees` 中包含不存在的用户 ID
- 伺服器内部错误

------

## 使用场景

### 邀请加入
- **邀请多位成员**：透过设定 `invitationRequired: true`，受邀者需主动接受邀请才会加入聊天室
- **直接加入**：设定 `invitationRequired: false`，受邀者会直接加入聊天室，无需确认

### 系统通知
- **自动通知**：设定 `systemMessage: true` 时，系统会自动在聊天室内产生「加入成员」的通知讯息

------

## 注意事项

- **`invitationRequired`**：设为 `true` 时，受邀者需主动接受邀请才会加入聊天室；设为 `false` 时，受邀者会直接加入
- **系统讯息**：设定 `systemMessage: true` 时，系统会自动在聊天室内产生「加入成员」的通知讯息
- **一对一聊天室**：`invitationRequired` 对一对一（`direct`）聊天室无效，系统会自动设为 `false`
- 成功加入后，回应会包含更新后的完整聊天室资讯，包含最新的成员列表
