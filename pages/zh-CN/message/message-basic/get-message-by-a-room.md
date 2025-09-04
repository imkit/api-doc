# 收到指定聊天室内的消息

## 概述

取得指定聊天室中的所有消息，适用于载入聊天室的完整消息历史记录。此 API 基于聊天室消息查询功能，支持时间范围筛选、分页查询，让用户能够完整浏览聊天室中的对话内容。

------

## API 端点

### 取得聊天室所有消息

获取指定聊天室中的消息记录，支持分页和时间筛选。

```http
GET /rooms/{id}/messages/v3
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数 | 类型   | 必填 | 说明        |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅    | 聊天室 ID   |

#### Query Parameters

| 参数               | 类型   | 必填 | 说明                                                    |
| ------------------ | ------ | ---- | ------------------------------------------------------- |
| `limit`            | number | ❌    | 返回消息的最大数量（默认：20，建议 50-100）             |
| `beforeMessage`    | string | ❌    | 查询指定消息 ID 之前的消息（用于向前分页）              |
| `afterMessage`     | string | ❌    | 查询指定消息 ID 之后的消息（用于向后分页）              |
| `afterTime`        | string | ❌    | 查询指定时间之后的消息（ISO-8601 或毫秒时间戳格式）     |
| `timeRangeField`   | string | ❌    | 时间范围查询的字段：updatedAt, createdAt, messageTime（默认：updatedAt） |

#### 范例请求

**取得聊天室最新消息**

```http
GET /rooms/demo-room/messages/v3?limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**取得历史消息（分页）**

```http
GET /rooms/demo-room/messages/v3?limit=50&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**取得特定时间后的消息**

```http
GET /rooms/demo-room/messages/v3?afterTime=2024-01-01T00:00:00Z&limit=100 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应消息               |
| `result` | object | 消息查询结果           |

**查询结果结构**

| 参数               | 类型   | 说明                                    |
| ------------------ | ------ | --------------------------------------- |
| `totalCount`       | number | 聊天室中的消息总数                      |
| `data`             | array  | 消息数组（按时间顺序排列）              |
| `userDeletedIDs`   | array  | 当前用户已删除的消息 ID 数组            |
| `inspect`          | object | 诊断信息（包含查询条件和执行时间）      |

**消息对象结构**

| 参数             | 类型    | 说明                          |
| ---------------- | ------- | ----------------------------- |
| `_id`            | string  | 消息唯一识别码                |
| `message`        | any     | 消息内容                      |
| `room`           | string  | 所属聊天室 ID                 |
| `sender`         | object  | 发送者信息                    |
| `messageType`    | string  | 消息类型                      |
| `messageTimeMS`  | number  | 消息发送时间（毫秒时间戳）    |
| `updatedAtMS`    | number  | 消息更新时间（毫秒时间戳）    |
| `createdAtMS`    | number  | 消息建立时间（毫秒时间戳）    |
| `reactions`      | array   | 消息反应列表                  |
| `reactionCount`  | number  | 反应总数                      |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 245,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "status": { "$ne": 0 }
      },
      "tookMS": 8
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Hello everyone! Welcome to our chat room.",
        "room": "demo-room",
        "sender": {
          "_id": "user123",
          "nickname": "Alice",
          "avatarUrl": "https://example.com/avatar1.jpg",
          "id": "user123",
          "lastLoginTimeMS": 1640995200000
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1640995200000,
        "updatedAtMS": 1640995200001,
        "createdAtMS": 1640995200001,
        "reactionCount": 0
      }
    ],
    "userDeletedIDs": []
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

**403 Forbidden** - 权限不足

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "User is not a member of this room"
  }
}
```

**404 Not Found** - 聊天室不存在

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room with specified ID does not exist"
  }
}
```

------

## 使用场景

### 聊天室载入
- **初始载入**：用户进入聊天室时载入最新消息
- **历史浏览**：用户向上滑动查看更早的消息记录
- **重新整理**：重新载入聊天室的完整对话内容

### 消息同步
- **离线同步**：用户重新上线时同步错过的消息
- **跨设备同步**：在多个设备间保持消息一致性
- **备份恢复**：从备份中恢复聊天室的完整记录

### 内容分析
- **对话分析**：分析聊天室中的对话模式和热门话题
- **活跃度统计**：统计聊天室的消息量和用户参与度
- **内容审核**：审核聊天室中的所有对话内容

------

## 注意事项

- **权限要求**：只有聊天室成员才能获取消息内容
- **分页建议**：建议使用适当的 limit 值（20-100）避免一次载入过多数据
- **时间排序**：消息按 updatedAt 时间排序，最新消息在前
- **删除处理**：userDeletedIDs 数组包含当前用户已删除的消息，需在 UI 中过滤
- **性能优化**：大型聊天室建议使用时间范围限制以提升查询性能
- **即时更新**：此 API 适用于批量载入，即时消息建议使用 WebSocket 连接