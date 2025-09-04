# 解除禁止成员

## 概述

在聊天室中解除对指定用户的禁止状态，恢复其在该聊天室中的正常活动权限。只有聊天室拥有者具备解除禁止的权限（限群组聊天室且设有拥有者）。解除禁止后，该用户可以重新在聊天室中进行互动和发送消息。

------

## API 端点

### 在聊天室中解除禁止指定用户

将指定用户从聊天室的禁止清单中移除，恢复其在该聊天室的活动权限。

```http
DELETE /blockStatus/room/{roomID}/{blockee}
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数      | 类型   | 必填 | 说明                  |
| --------- | ------ | ---- | --------------------- |
| `roomID`  | string | ✅    | 聊天室 ID             |
| `blockee` | string | ✅    | 要解除禁止的用户 ID   |

#### 范例请求

**解除禁止特定用户**

```http
DELETE /blockStatus/room/demo-room/ccc HTTP/1.1
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
| `result` | object | 解除禁止状态信息       |

**解除禁止状态对象结构**

| 参数        | 类型   | 说明                      |
| ----------- | ------ | ------------------------- |
| `appID`     | string | 应用程序识别码            |
| `blockee`   | object | 被解除禁止用户的详细信息  |
| `blocker`   | string | 执行禁止的用户 ID         |
| `room`      | string | 聊天室 ID                 |
| `createdAt` | string | 原禁止创建时间            |
| `updatedAt` | string | 解除禁止时间              |

**被解除禁止用户对象结构**

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
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093304",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "demo-room",
    "createdAt": "2021-08-04T16:08:53.057Z",
    "updatedAt": "2021-08-04T16:08:53.057Z"
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
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner can unblock users in group chat rooms"
  }
}
```

**404 Not Found** - 禁止关系不存在

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists for this user in the specified room"
  }
}
```

**400 Bad Request** - 参数无效

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## 使用场景

### 聊天室管理
- **禁止解除**：聊天室拥有者解除对用户的禁止状态
- **管理决策**：基于情况变化调整禁止政策
- **成员恢复**：恢复用户在聊天室中的正常参与权限

### 权限管理
- **拥有者专属**：只有聊天室拥有者可以解除禁止
- **权限恢复**：恢复用户在该聊天室的完整活动权限
- **管理弹性**：提供灵活的禁止管理机制

### 关系修复
- **误判纠正**：解除因误判而禁止的用户
- **情况改善**：用户行为改善后的权限恢复
- **和解机制**：提供聊天室成员关系修复的途径

------

## 注意事项

- **权限限制**：只有聊天室拥有者可以执行解除禁止操作（限群组聊天室且设有拥有者）
- **聊天室类型**：此功能主要针对群组聊天室，且该聊天室必须设有拥有者
- **即时生效**：解除禁止状态会立即生效，用户可立即在聊天室中活动
- **禁止范围**：解除禁止仅限于指定的聊天室，不影响其他聊天室的禁止状态
- **不存在处理**：尝试解除不存在的禁止关系会返回 404 错误
- **记录保存**：解除禁止操作会更新禁止记录的时间戳记