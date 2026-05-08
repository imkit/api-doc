# Socket 事件

## 概述

当客户端透过 Socket 连线并通过验证后(请见 [Socket 连线](/zh-CN/realtime/socket-connection)),即可接收服务器推送的实时事件。本页列出所有事件类型与其 payload 格式,供 native app / web 客户端解析使用。

------

## 事件总览

| 事件名称             | 触发时机                                       | 用途                            |
| -------------------- | ---------------------------------------------- | ------------------------------- |
| `chat message`       | 聊天室收到新消息                               | 实时显示消息、触发本地通知      |
| `room`               | 聊天室属性更新(成员、设置等)                 | 更新聊天室列表、成员列表        |
| `lastRead`           | 某位成员更新最后已读                           | 更新已读回条 UI                 |
| `typing`             | 某位成员正在输入                               | 显示「对方输入中…」             |
| `ai_streaming`       | AI 消息分段串流回传                            | 渐进式显示 AI 生成内容          |
| `roomPref`           | 用户自身更新某聊天室偏好                       | 跨设备同步聊天室偏好            |
| `myPrefChange`       | 用户自身更新个人偏好                           | 跨设备同步个人偏好              |
| `myPrefDelete`       | 用户自身删除某偏好                             | 跨设备同步                      |
| `invitation`         | 收到群组邀请                                   | 显示邀请通知                    |
| `userDeleteMessages` | 用户自行删除消息(限自己看见)                | 从 UI 移除消息                  |
| `messageDeleted`     | 管理员(super-user)永久删除消息              | 全成员从 UI 移除消息            |

------

## chat message

聊天室有新消息时触发。

| 字段 | 内容             |
| ---- | ---------------- |
| Data | Message 对象     |

**示例 payload**

```json
{
  "_id": "5c1ddf2d1536bbb6c49f7cfe",
  "message": "Bonjour 2",
  "room": "demo-room",
  "sender": {
    "_id": "sss",
    "nickname": "Desirae",
    "isRobot": false,
    "avatarUrl": "",
    "id": "sss"
  },
  "messageType": "text",
  "appID": "SampleApp",
  "messageTime": "2018-12-22T06:52:29.380Z",
  "messageTimeMS": 1545461549380,
  "id": "5c1ddf2d1536bbb6c49f7cfe"
}
```

------

## room

聊天室属性(成员、名称、设置等)有更新时触发。

| 字段 | 内容        |
| ---- | ----------- |
| Data | 更新后的聊天室对象 |

------

## lastRead

某位聊天室成员调用 [`PUT /rooms/:id/lastRead`](/zh-CN/room/room-management/update-last-read) 更新最后已读后,广播给该聊天室所有成员。

| 字段        | 说明                       |
| ----------- | -------------------------- |
| `roomID`    | 聊天室 ID                  |
| `memberID`  | 回报已读的成员 Client ID   |
| `messageID` | 该成员的最后已读消息 ID    |

**示例 payload**

```json
{
  "roomID": "5be660651a71681534245a4e",
  "messageID": "5be7edaced649e42234f0699",
  "memberID": "aaa"
}
```

------

## typing

某位成员正在输入时触发,通常用于显示「对方输入中…」。

| 字段      | 说明                       |
| --------- | -------------------------- |
| `room`    | 聊天室 ID                  |
| `message` | 输入中的内容(可能为片段) |

**示例 payload**

```json
{
  "room": "58871b877390be11d5f1ab30",
  "message": "typing content"
}
```

------

## ai_streaming

接收来自 AI 的串流消息片段,适用于 AI 助手实时回覆场景。

| 字段     | 说明              |
| -------- | ----------------- |
| `room`   | 聊天室 ID         |
| `sender` | AI Client ID      |
| `text`   | 消息片段内容      |

**示例 payload**

```json
{
  "room": "<RoomID>",
  "sender": "<ClientID>",
  "text": "<Message chunk content>"
}
```

------

## roomPref

当前用户在某设备上更新某聊天室偏好(如静音、置顶、隐藏)时,广播给该用户的其他连线设备。

| 字段 | 说明                  |
| ---- | --------------------- |
| Data | 更新后的聊天室偏好对象 |

**示例 payload**

```json
{
  "room": "demo-room",
  "folder": "Some-Folder",
  "hidden": false,
  "muted": false,
  "sticky": false,
  "tags": ["demo", "sample"]
}
```

------

## myPrefChange

当前用户在某设备上更新个人偏好设置时,广播给该用户的其他连线设备。

| 字段 | 说明                       |
| ---- | -------------------------- |
| Data | 包含 `data` 与 `key` 两个字段 |

**示例 payload**

```json
{
  "data": {
    "foo": "bar",
    "folders": {
      "folder 1": { "rooms": ["aaabbb", "cccddd"] }
    }
  },
  "key": "demokey"
}
```

------

## myPrefDelete

当前用户删除某项个人偏好时触发。

| 字段 | 说明              |
| ---- | ----------------- |
| Data | 被删除的偏好 key   |

**示例 payload**

```json
"demokey"
```

------

## invitation

收到群组邀请时触发。

| 字段 | 说明        |
| ---- | ----------- |
| Data | 邀请对象     |

------

## userDeleteMessages

用户自行删除消息(仅对自己隐藏)时触发。

| 字段                              | 说明                                       |
| --------------------------------- | ------------------------------------------ |
| `room`                            | 聊天室 ID                                  |
| `messages`                        | 被删除的消息 ID 数组                       |
| `isUserDeleteAllMessagesInRoom`   | 是否为「删除聊天室内所有消息」(boolean)   |

**示例 payload**

```json
{
  "room": "demo-FpOtW6",
  "messages": ["64623ad9f83f7f1a35009d6b"],
  "isUserDeleteAllMessagesInRoom": true
}
```

------

## messageDeleted

管理员(super-user)永久删除某则消息时触发,所有聊天室成员都会收到。

| 字段         | 说明                                                                 |
| ------------ | -------------------------------------------------------------------- |
| `room`       | 聊天室 ID                                                            |
| `messageID`  | 被删除的消息 ID;若为 `_all`,代表聊天室内所有消息都被永久删除     |

------

## 注意事项

- **事件名含空格**:`chat message` 是含空格的事件名,monitor 时请完整输入字符串
- **payload 解码**:若连线时启用 `encoding: "base64"`,所有事件 payload 都需先 base64 decode 再 `JSON.parse`
- **仅在线时收到**:这些事件只在 socket 连线中才会收到;app 在后台或离线时错过的事件,需以 [`POST /push/push2clients`](/zh-CN/push/push-to-clients)、[Webhook](/zh-CN/webhook/webhook) 或重连后拉取消息列表来补齐
- **消息来源判断**:`chat message` 的 `sender._id` 等于自己时,代表是自己另一个设备发出的消息,UI 上仍应显示
- **与推播搭配**:移动 app 应同时使用 socket(前景)+ APNs/FCM 推播(后台),避免漏消息
- **幂等处理**:重连时可能收到先前已处理过的事件,客户端应以 `_id` 为键做去重
