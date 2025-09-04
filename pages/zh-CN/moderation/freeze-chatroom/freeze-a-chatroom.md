# 冻结聊天室

## 概述

冻结聊天室功能通过更新聊天室状态来暂停或禁用聊天室的使用。当聊天室状态设为无效（status=0）时，聊天室将被冻结，用户无法在其中正常互动。此功能适用于内容管理、违规处理和聊天室维护。

------

## API 端点

### 冻结指定聊天室

通过更新聊天室状态来冻结聊天室，使其变为无效状态。

```http
PUT /rooms/{id}
```

#### Headers

| 参数            | 类型   | 必填 | 说明           |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数 | 类型   | 必填 | 说明        |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅    | 聊天室 ID   |

#### Post Body

| 参数     | 类型   | 必填 | 说明                               |
| -------- | ------ | ---- | ---------------------------------- |
| `status` | number | ✅    | 聊天室状态：0=无效（冻结），1=有效 |

#### 范例请求

**冻结聊天室**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "status": 0
}
```

**解除冻结聊天室**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "status": 1
}
```

#### Response

**成功响应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 响应代码（0 表示成功） |
| `RM`     | string | 响应消息               |
| `result` | object | 更新后的聊天室数据     |

**聊天室对象结构**

| 参数            | 类型   | 说明                      |
| --------------- | ------ | ------------------------- |
| `_id`           | string | 聊天室唯一识别码          |
| `name`          | string | 聊天室名称                |
| `cover`         | string | 聊天室封面图片 URL        |
| `description`   | string | 聊天室描述                |
| `status`        | number | 聊天室状态（0=冻结，1=正常）|
| `lastMessage`   | object | 最后一则消息信息          |
| `members`       | array  | 聊天室成员列表            |

#### 范例响应

**冻结聊天室成功**

```json
{
  "RC": 0,
  "RM": "Room frozen successfully",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Test Room",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "This room has been frozen",
    "status": 0,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "Last message before freeze",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
      }
    ]
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

**403 Forbidden** - 权限不足

```json
{
  "RC": 403,
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can freeze room"
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

### 内容管理
- **违规处理**：对违反社群规范的聊天室进行暂时冻结
- **紧急状况**：在发生紧急事件时快速封锁聊天室
- **内容审核**：暂时冻结聊天室进行内容审核

### 聊天室维护
- **系统维护**：在系统维护期间暂时冻结聊天室
- **功能更新**：在聊天室功能更新时暂时停用
- **数据迁移**：在进行数据迁移时暂停聊天室使用

### 管理操作
- **批量管理**：批量冻结或解除冻结多个聊天室
- **权限控制**：确保只有授权用户能执行冻结操作
- **状态追踪**：监控聊天室的冻结状态和历史

------

## 注意事项

- **权限限制**：仅聊天室拥有者、管理员或平台管理员可执行冻结操作
- **状态影响**：冻结的聊天室（status=0）将无法正常使用
- **用户体验**：冻结期间用户可能无法发送消息或进行互动
- **即时生效**：状态更改会立即生效，影响所有聊天室成员
- **可逆操作**：可通过设置 status=1 来解除聊天室冻结
- **数据保存**：冻结聊天室不会删除历史消息和成员数据
- **通知机制**：冻结操作可能会触发相关的通知或事件