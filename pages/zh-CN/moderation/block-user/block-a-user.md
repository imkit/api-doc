# 封锁用户

## 概述

封锁指定用户，阻止其与当前用户进行直接聊天。封锁后，被封锁的用户将无法发送私人消息给封锁者，但不会影响在群组聊天室中的互动。此功能适用于防止骚扰和管理个人隐私。

------

## API 端点

### 封锁指定用户

将指定用户加入封锁清单，阻止其进行直接聊天。

```http
POST /blockStatus/my/{blockee}
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数      | 类型   | 必填 | 说明              |
| --------- | ------ | ---- | ----------------- |
| `blockee` | string | ✅    | 要封锁的用户 ID   |

#### 范例请求

**封锁特定用户**

```http
POST /blockStatus/my/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**封锁其他用户**

```http
POST /blockStatus/my/user123 HTTP/1.1
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
| `result` | object | 封锁状态信息           |

**封锁状态对象结构**

| 参数        | 类型   | 说明                          |
| ----------- | ------ | ----------------------------- |
| `appID`     | string | 应用程序识别码                |
| `blockee`   | object | 被封锁用户的详细信息          |
| `blocker`   | string | 执行封锁的用户 ID             |
| `room`      | string | 关联的聊天室 ID               |
| `createdAt` | string | 封锁创建时间                  |
| `updatedAt` | string | 封锁更新时间                  |

**被封锁用户对象结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用户唯一识别码                |
| `nickname`        | string | 用户昵称                      |
| `avatarUrl`       | string | 用户头像 URL                  |
| `lastLoginTimeMS` | number | 最后登录时间（毫秒时间戳）    |

#### 范例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "2bec603e94a210092439e83ff2d79ac1",
    "createdAt": "2021-08-04T15:18:10.735Z",
    "updatedAt": "2021-08-04T16:35:41.341Z"
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

**404 Not Found** - 用户不存在

```json
{
  "RC": 404,
  "RM": "User not found",
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The specified user does not exist"
  }
}
```

**400 Bad Request** - 不能封锁自己

```json
{
  "RC": 400,
  "RM": "Cannot block yourself",
  "error": {
    "code": "SELF_BLOCK_FORBIDDEN",
    "message": "Users cannot block themselves"
  }
}
```

**409 Conflict** - 用户已被封锁

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already in your block list"
  }
}
```

------

## 使用场景

### 个人隐私保护
- **防止骚扰**：阻止不当用户发送私人消息
- **隐私管理**：控制谁能与自己进行直接联系
- **安全防护**：防范恶意用户的持续骚扰行为

### 用户体验改善
- **内容过滤**：避免接收不想要的消息内容
- **环境净化**：创造更舒适的聊天环境
- **专注工作**：减少非必要的打扰和干扰

### 社群管理
- **行为规范**：对违规用户采取个人层级的防护措施
- **冲突处理**：处理用户间的个人冲突
- **自主管理**：让用户自行管理个人的社交圈

------

## 注意事项

- **仅限直接聊天**：封锁只影响私人聊天，不影响群组聊天室中的互动
- **双向效果**：封锁生效后，双方都无法发送私人消息
- **自动创建聊天室**：封锁会关联到相应的直接聊天室
- **不能自封**：无法封锁自己的账号
- **重复封锁**：对已封锁的用户执行封锁会返回冲突错误
- **状态持久**：封锁状态会持续存在，直到手动解除封锁