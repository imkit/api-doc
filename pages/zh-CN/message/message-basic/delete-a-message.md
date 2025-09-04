# 删除消息

## 概述

管理员权限专用的消息删除功能，允许平台管理员、聊天室拥有者和聊天室管理员删除指定的消息或清空整个聊天室的所有消息。此功能适用于内容管理、违规内容清理和聊天室维护。

------

## API 端点

### 删除聊天室消息

删除聊天室中的特定消息或所有消息，仅限具备管理权限的用户使用。

```http
DELETE /rooms/{roomID}/messages/{messageID}
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数        | 类型   | 必填 | 说明                                                |
| ----------- | ------ | ---- | --------------------------------------------------- |
| `roomID`    | string | ✅    | 聊天室 ID                                           |
| `messageID` | string | ✅    | 要删除的消息 ID，或使用 `_all` 删除聊天室内所有消息 |

#### 范例请求

**删除特定消息**

```http
DELETE /rooms/test-room-123/messages/5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```

**删除聊天室所有消息**

```http
DELETE /rooms/test-room-123/messages/_all HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应消息               |
| `result` | object | 删除操作结果           |

**删除结果对象结构**

| 参数           | 类型   | 说明                          |
| -------------- | ------ | ----------------------------- |
| `deletedCount` | number | 已删除的消息数量              |
| `roomID`       | string | 聊天室 ID                     |
| `messageID`    | string | 被删除的消息 ID（或 "_all"）  |
| `deletedBy`    | string | 执行删除操作的用户 ID         |
| `deletedAt`    | string | 删除时间                      |

#### 范例回应

**删除单一消息**

```json
{
  "RC": 0,
  "RM": "Message deleted successfully",
  "result": {
    "deletedCount": 1,
    "roomID": "test-room-123",
    "messageID": "5f890cf37d980e06f6aaf349",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
  }
}
```

**删除所有消息**

```json
{
  "RC": 0,
  "RM": "All messages deleted successfully",
  "result": {
    "deletedCount": 145,
    "roomID": "test-room-123",
    "messageID": "_all",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
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
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSION",
    "message": "Only platform admin, room owner or room manager can delete messages"
  }
}
```

**404 Not Found** - 消息或聊天室不存在

```json
{
  "RC": 404,
  "RM": "Message not found",
  "error": {
    "code": "MESSAGE_NOT_FOUND",
    "message": "The specified message does not exist in this room"
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

### 内容管理
- **违规处理**：删除违反社区规范的不当消息
- **垃圾消息**：清理广告消息或垃圾内容
- **敏感内容**：移除包含敏感信息的消息

### 聊天室维护
- **聊天室重置**：清空聊天室重新开始对话
- **测试清理**：清理测试环境的测试消息
- **定期维护**：定期清理过旧的消息内容

### 管理操作
- **紧急处理**：快速处理需要立即移除的内容
- **批量清理**：一次性删除聊天室内所有消息
- **权限控制**：确保只有授权用户能执行删除操作

------

## 注意事项

- **权限限制**：仅限平台管理员、聊天室拥有者和聊天室管理员使用
- **永久删除**：消息删除后无法恢复，请谨慎使用
- **批量删除**：使用 `_all` 参数会删除聊天室内所有消息
- **操作记录**：所有删除操作都会记录执行者和时间
- **即时生效**：删除操作会立即生效，所有用户都会看到消息消失
- **通知机制**：删除操作可能会触发相关的通知或事件
- **与撤回区别**：此功能为强制删除，与用户自主撤回功能不同