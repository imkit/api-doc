# 发送消息

## 概述

通过 API 向指定聊天室发送消息。支持多种消息类型、提及功能和消息更新。此 API 适用于需要通过后端服务发送消息的场景，不同于通过 Socket 的即时消息发送。

------

## API 端点

### 发送聊天室消息

向指定聊天室发送新消息或更新现有消息。

```http
POST /rooms/{roomId}/message
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `Authorization`    | string | ✅    | Client Token   |

#### Path Parameters

| 参数     | 类型   | 必填 | 说明        |
| -------- | ------ | ---- | ----------- |
| `roomId` | string | ✅    | 聊天室 ID   |

#### Post Body

| 参数          | 类型   | 必填 | 说明                                    |
| ------------- | ------ | ---- | --------------------------------------- |
| `message`     | any    | ✅    | 消息内容（可为文字、对象等任意格式）    |
| `messageType` | string | ✅    | 自定义消息类型                            |
| `_id`         | string | ❌    | 消息 ID（提供时为更新现有消息）         |
| `mentions`    | array  | ❌    | 提及的用户 ID 数组                      |

#### 范例请求

**发送文字消息**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "Hello everyone!",
  "messageType": "text"
}
```

**发送公告消息**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "hhhooo",
  "messageType": "announcement"
}
```

**发送带提及的消息**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "Hello @user1 and @user2!",
  "messageType": "text",
  "mentions": ["user1", "user2"]
}
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应消息               |
| `result` | object | 发送的消息数据         |

**消息对象结构**

| 参数             | 类型   | 说明                          |
| ---------------- | ------ | ----------------------------- |
| `_id`            | string | 消息唯一识别码                |
| `room`           | string | 所属聊天室 ID                 |
| `message`        | any    | 消息内容                      |
| `messageType`    | string | 消息类型                      |
| `sender`         | object | 发送者信息                    |
| `appID`          | string | 应用程序识别码                |
| `messageTimeMS`  | number | 消息发送时间（毫秒时间戳）    |
| `updatedAtMS`    | number | 消息更新时间（毫秒时间戳）    |
| `createdAtMS`    | number | 消息建立时间（毫秒时间戳）    |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58bf8f1dc3b24c04d19d9add",
    "room": "58871b877390be11d5f1ab30",
    "message": "hhhooo",
    "messageType": "announcement",
    "sender": null,
    "appID": "SampleApp",
    "__v": 0,
    "messageTimeMS": 1488949021290,
    "updatedAtMS": 1488949021290,
    "createdAtMS": 1488949021290
  }
}
```

#### 错误回应

**401 Unauthorized** - 认证失败

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**403 Forbidden** - 权限不足或聊天室不存在

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "Client is not in the room or room does not exist"
  }
}
```

**400 Bad Request** - 请求参数无效

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_MESSAGE_FORMAT",
    "message": "Message content or type is invalid"
  }
}
```

------

## 使用场景

### 后端服务整合
- **系统通知**：由后端服务自动发送系统公告或通知
- **机器人消息**：通过 API 实现聊天机器人功能
- **批量传送**：程序化发送大量消息

### 消息管理
- **公告发布**：发送重要公告或系统消息
- **提及通知**：发送包含用户提及的消息以触发通知
- **消息更新**：通过提供 _id 参数更新现有消息

### 应用整合
- **第三方整合**：将外部系统的数据以消息形式发送到聊天室
- **自动回复**：实现自动客服或问答功能
- **工作流程**：在工作流程中插入聊天室通知

------

## 注意事项

- **成员权限**：只有聊天室成员才能发送消息
- **消息格式**：message 字段支持任意格式，可为文字、JSON 对象等
- **消息类型**：messageType 为自定义字段，可根据应用需求设置
- **提及功能**：mentions 数组中的用户 ID 会收到提及通知
- **消息更新**：提供 _id 参数时会更新现有消息而非建立新消息
- **API vs Socket**：此 API 用于后端服务，一般用户聊天建议使用 Socket 连接