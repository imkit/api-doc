# 解除封锁用户

## 概述

解除对指定用户的封锁状态，恢复其与当前用户进行直接聊天的能力。解除封锁后，双方可以重新发送私人消息，但不会影响群组聊天室中的互动状态。此功能适用于修复误操作或重新建立联系关系。

------

## API 端点

### 解除封锁指定用户

将指定用户从封锁清单中移除，恢复直接聊天功能。

```http
DELETE /blockStatus/my/{blockee}
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数      | 类型   | 必填 | 说明                  |
| --------- | ------ | ---- | --------------------- |
| `blockee` | string | ✅    | 要解除封锁的用户 ID   |

#### 范例请求

**解除封锁特定用户**

```http
DELETE /blockStatus/my/ddd HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**解除封锁其他用户**

```http
DELETE /blockStatus/my/user123 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

#### Response

**成功响应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 响应代码（0 表示成功） |
| `RM`     | string | 响应消息               |
| `result` | object | 解除封锁状态信息       |

**解除封锁状态对象结构**

| 参数        | 类型   | 说明                          |
| ----------- | ------ | ----------------------------- |
| `appID`     | string | 应用程序识别码                |
| `blockee`   | object | 被解除封锁用户的详细信息      |
| `blocker`   | string | 执行解除封锁的用户 ID         |
| `room`      | string | 关联的聊天室 ID               |
| `createdAt` | string | 原封锁创建时间                |
| `updatedAt` | string | 解除封锁时间                  |

**被解除封锁用户对象结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用户唯一识别码                |
| `nickname`        | string | 用户昵称                      |
| `avatarUrl`       | string | 用户头像 URL                  |
| `id`              | string | 用户 ID                       |
| `lastLoginTimeMS` | number | 最后登录时间（毫秒时间戳）    |

#### 范例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ddd",
      "nickname": "Dina",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
      "id": "ddd",
      "lastLoginTimeMS": 1628095079328
    },
    "blocker": "aaa",
    "room": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
    "createdAt": "2021-08-04T15:18:07.649Z",
    "updatedAt": "2021-08-04T15:18:07.649Z"
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

**404 Not Found** - 封锁关系不存在

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists with this user"
  }
}
```

**400 Bad Request** - 参数无效

```json
{
  "RC": 400,
  "RM": "Invalid user ID",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## 使用场景

### 关系修复
- **误操作修正**：解除因误操作而封锁的用户
- **关系改善**：重新与曾经冲突的用户建立联系
- **二次机会**：给予被封锁用户重新开始的机会

### 管理弹性
- **动态管理**：根据情况变化调整封锁状态
- **临时封锁**：短期封锁后恢复正常联系
- **测试用途**：开发和测试阶段的封锁功能验证

### 用户体验最佳化
- **便捷操作**：提供简单的解除封锁方式
- **即时生效**：解除封锁后立即恢复聊天功能
- **状态同步**：确保封锁状态在各平台同步更新

------

## 注意事项

- **双向解除**：解除封锁后，双方都可以重新发送私人消息
- **不存在处理**：尝试解除不存在的封锁关系会返回 404 错误
- **即时生效**：解除封锁操作会立即生效，无需等待
- **聊天室关联**：解除封锁不会影响相关聊天室的存在状态
- **历史记录**：解除封锁不会删除之前的聊天记录
- **群组不影响**：解除封锁不会影响群组聊天中的互动状态