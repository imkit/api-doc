# 列出消息

## 概述

查询指定聊天室的消息记录，支持时间范围、分页和多种排序方式。此 API 使用消息的更新时间进行排序，提供更准确的消息顺序。适用于消息记录查询、消息搜索和聊天室消息浏览。

------

## API 端点

### 取得聊天室消息列表 (V3)

查询指定聊天室的消息记录，按更新时间排序。

```http
GET /rooms/{id}/messages/v3
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数   | 类型   | 必填 | 说明        |
| ------ | ------ | ---- | ----------- |
| `id`   | string | ✅    | 聊天室 ID   |

#### Query Parameters

| 参数             | 类型   | 必填 | 说明                                                         |
| ---------------- | ------ | ---- | ------------------------------------------------------------ |
| `beforeMessage`  | string | ❌    | 查询指定消息 ID 之前的消息                                   |
| `afterMessage`   | string | ❌    | 查询指定消息 ID 之后的消息                                   |
| `limit`          | number | ❌    | 回应消息数量上限，默认值 20                                  |
| `afterTime`      | string | ❌    | 查询指定时间之后的消息（ISO-8601 格式或毫秒时间戳）          |
| `timeRangeField` | string | ❌    | 时间范围查询使用的时间字段（updatedAt/createdAt/messageTime），默认 updatedAt |

#### 范例请求

**基本查询**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=10&afterTime=2020-10-15T03:50:04Z HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

**分页查询**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=20&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
```

**时间范围查询**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?afterTime=1602817267000&timeRangeField=messageTime&limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
```

#### Response

**成功回应（200 OK）**

| 参数              | 类型   | 说明                                            |
| ----------------- | ------ | ----------------------------------------------- |
| `RC`              | number | 回应代码（0 表示成功）                          |
| `RM`              | string | 回应消息                                        |
| `result`          | object | 查询结果                                        |

**查询结果对象结构**

| 参数              | 类型   | 说明                                            |
| ----------------- | ------ | ----------------------------------------------- |
| `totalCount`      | number | 聊天室内总消息数量                              |
| `data`            | array  | 符合条件的消息数组                              |
| `userDeletedIDs`  | array  | 当前用户已删除的消息 ID 数组（UI 应隐藏这些消息）|
| `inspect`         | object | 诊断信息                                        |

**消息对象结构**

| 参数             | 类型   | 说明                          |
| ---------------- | ------ | ----------------------------- |
| `_id`            | string | 消息唯一识别码                |
| `message`        | any    | 消息内容                      |
| `room`           | string | 所属聊天室 ID                 |
| `sender`         | object | 发送者信息                    |
| `messageType`    | string | 消息类型                      |
| `messageTimeMS`  | number | 消息发送时间（毫秒时间戳）    |
| `updatedAtMS`    | number | 消息更新时间（毫秒时间戳）    |
| `createdAtMS`    | number | 消息建立时间（毫秒时间戳）    |
| `reactions`      | array  | 消息反应数组                  |
| `reactionCount`  | number | 反应总数                      |
| `isDeleted`      | bool   | 是否已删除                    |

**发送者对象结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用户唯一识别码                |
| `nickname`        | string | 用户昵称                      |
| `description`     | string | 用户描述                      |
| `avatarUrl`       | string | 用户头像 URL                  |
| `lastLoginTimeMS` | number | 最后登录时间（毫秒时间戳）    |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 515,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "messageTime": {
          "$gt": "2020-10-15T03:50:04.000Z"
        }
      },
      "tookMS": 5
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Helloこんにちは SIKTMLNP 11:01:07",
        "room": "demo-room",
        "sender": {
          "_id": "sss",
          "nickname": "Elsa",
          "description": "description la la #1583637224106",
          "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
          "id": "sss",
          "lastLoginTimeMS": 1588744338369
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1602817267923,
        "updatedAtMS": 1602817267925,
        "createdAtMS": 1602817267925,
        "reactionCount": 0,
        "isDeleted": true
      }
    ],
    "userDeletedIDs": [
      "5f890cf37d980e06f6aaf349"
    ]
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

**404 Not Found** - 聊天室不存在

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "The specified room does not exist"
  }
}
```

------

## 使用场景

### 消息浏览
- **聊天记录**：显示聊天室的历史消息
- **消息搜索**：根据时间范围查找特定消息
- **分页载入**：实现消息列表的分页功能

### 同步与备份
- **消息同步**：同步最新的消息更新
- **离线备份**：备份聊天室消息数据
- **数据分析**：分析聊天室活动和互动情况

### 应用整合
- **消息导出**：将聊天记录导出到其他系统
- **内容审核**：检视和管理聊天室内容
- **统计分析**：计算消息数量和用户活跃度

------

## 注意事项

- **排序方式**：V3 版本使用 updatedAt 时间排序，比消息 ID 排序更准确
- **时间格式**：支持 ISO-8601 格式或毫秒时间戳
- **分页查询**：使用 beforeMessage 或 afterMessage 进行分页
- **用户权限**：只有聊天室成员才能查询消息
- **已删除消息**：userDeletedIDs 中的消息 UI 应隐藏显示
- **诊断信息**：inspect 对象提供查询性能和条件的诊断信息
- **默认限制**：未指定 limit 时默认回应 20 笔消息