# 更新最后已读

## 概述

当用户在指定聊天室内读完消息后,调用此 API 将「最后已读消息」同步给服务器。服务器会依此重算该用户在此聊天室的未读数(badge),并透过 Socket [`lastRead` 事件](/zh-CN/realtime/socket-events) 通知聊天室其他成员,实现跨设备已读同步与已读回条(read receipts)。

------

## API 端点

### 更新最后已读消息

更新当前用户在指定聊天室的最后已读消息 ID。

```http
PUT /rooms/:id/lastRead
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |
| `Content-Type`     | string | ✅    | `application/json; charset=utf-8` |

#### Path Parameters

| 参数  | 类型   | 必填 | 说明        |
| ----- | ------ | ---- | ----------- |
| `:id` | string | ✅    | 聊天室 ID   |

#### Post Body

| 参数      | 类型   | 必填 | 说明                                            |
| --------- | ------ | ---- | ----------------------------------------------- |
| `message` | string | ✅    | 最后已读消息的 ID(该聊天室内某则消息的 `_id`) |

#### 示例请求

**JavaScript(axios)**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomId}/lastRead`,
  {
    message: "58885c9e4d0c89571b777a81"
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X PUT "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/lastRead" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{"message":"58885c9e4d0c89571b777a81"}'
```

#### Response

**成功响应(200 OK)**

| 参数                | 类型   | 说明                              |
| ------------------- | ------ | --------------------------------- |
| `RC`                | number | 响应代码(0 表示成功)            |
| `RM`                | string | 响应消息                          |
| `result`            | object | 更新结果                          |
| `result.client`     | string | 当前用户的 Client ID              |
| `result.lastRead`   | string | 已更新的最后已读消息 ID           |
| `result.badge`      | number | 该用户目前在所有聊天室的总未读数  |

#### 示例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "client": "1485248560558",
    "lastRead": "58b7b79b0acc250b377357ab",
    "badge": 48
  }
}
```

#### 错误响应

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

**404 Not Found** - 聊天室或消息不存在

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room or message not found"
  }
}
```

**400 Bad Request** - 缺少必要参数

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "message is required"
  }
}
```

------

## Socket 事件通知

更新成功后,服务器会对该聊天室的所有成员广播 `lastRead` Socket 事件,内容示例:

```json
{
  "roomID": "58871b877390be11d5f1ab30",
  "memberID": "1485248560558",
  "messageID": "58b7b79b0acc250b377357ab"
}
```

其他成员的客户端可监听此事件,实时更新「对方已读到哪一则消息」的 UI 标示。详见 [Socket 事件](/zh-CN/realtime/socket-events)。

------

## 使用场景

### 已读同步
- **进入聊天室**:用户开启聊天室并把画面卷到底时,调用此 API 将最新消息标记为已读
- **后台同步**:app 从后台回到前景并检测到聊天室仍在最顶端时,重新标记最新消息为已读
- **跨设备同步**:用户在手机读过后,网页版 / 平板版会透过 Socket `lastRead` 事件实时同步未读状态

### 已读回条(Read Receipts)
- **聊天室成员显示**:发消息者可看到对方已读到哪则消息
- **群组已读数**:统计群组内每则消息的已读人数

### 未读计算
- 调用此 API 后,[`GET /me/badge`](/zh-CN/message/message-badge/get-unread-message-by-a-user) 与 [`POST /badges/byRoomTags`](/zh-CN/message/message-badge/get-unread-message-by-a-room) 的回传值会立即反映新状态

------

## 注意事项

- **消息 ID 必须属于该聊天室**:传入的 `message` ID 必须是 `:id` 聊天室内的某则消息,否则会回传 404
- **单向更新**:`lastRead` 只会往后移动;传入比目前已读更旧的消息 ID,行为以服务器实现为准,不建议倒退标记
- **频率控制**:不需要每次卷动都调用;建议在离开聊天室、收到新消息且画面在底部、或固定间隔(如每 2 秒)时节流调用
- **服务器主动通知**:成功后其他成员会收到 Socket [`lastRead` 事件](/zh-CN/realtime/socket-events),可用于实时更新 UI
- **与 badge 的关联**:此 API 是让 [未读计算 API](/zh-CN/message/message-badge/get-unread-message-by-a-user) 回传值变化的主要途径
