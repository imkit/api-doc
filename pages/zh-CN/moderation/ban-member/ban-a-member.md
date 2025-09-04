# 禁止成员

## 概述

在聊天室中禁止指定用户，阻止其在该聊天室中进行活动。此功能允许平台管理员和聊天室拥有者对群组聊天室中的成员进行管理，当聊天室设有拥有者时，只有平台管理员和聊天室拥有者具备此权限。禁止后，被禁止的用户将无法在该聊天室中发送消息或参与互动。

------

## API 端点

### 在聊天室中禁止指定用户

将指定用户加入聊天室的禁止清单，限制其在该聊天室的活动权限。

```http
POST /blockStatus/room/{roomID}/{blockee}
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数      | 类型   | 必填 | 说明              |
| --------- | ------ | ---- | ----------------- |
| `roomID`  | string | ✅    | 聊天室 ID         |
| `blockee` | string | ✅    | 要禁止的用户 ID   |

#### 范例请求

**在聊天室中禁止特定用户**

```http
POST /blockStatus/room/demo-room/ccc HTTP/1.1
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
| `result` | object | 禁止状态信息           |

**禁止状态对象结构**

| 参数        | 类型   | 说明                      |
| ----------- | ------ | ------------------------- |
| `appID`     | string | 应用程序识别码            |
| `blockee`   | object | 被禁止用户的详细信息      |
| `blocker`   | string | 执行禁止的用户 ID         |
| `room`      | string | 聊天室 ID                 |
| `createdAt` | string | 禁止创建时间              |
| `updatedAt` | string | 禁止更新时间              |

**被禁止用户对象结构**

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
    "message": "Only platform admin and room owner can block users in group chat rooms"
  }
}
```

**404 Not Found** - 聊天室或用户不存在

```json
{
  "RC": 404,
  "RM": "Resource not found",
  "error": {
    "code": "ROOM_OR_USER_NOT_FOUND",
    "message": "The specified room or user does not exist"
  }
}
```

**409 Conflict** - 用户已被禁止

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already blocked in this room"
  }
}
```

------

## 使用场景

### 聊天室管理
- **成员管制**：聊天室拥有者管理群组成员的参与权限
- **违规处理**：处理在聊天室中发送不当内容的用户
- **秩序维护**：维持聊天室的良好讨论环境

### 权限管理
- **拥有者权限**：聊天室拥有者对成员进行管理
- **平台管理**：平台管理员协助处理聊天室管理问题
- **分级管理**：不同权限等级的用户拥有不同管理能力

### 安全防护
- **防范骚扰**：阻止特定用户在聊天室中骚扰其他成员
- **内容管制**：对发送不当内容的用户进行限制
- **环境保护**：保护聊天室的健康讨论环境

------

## 注意事项

- **权限限制**：只有平台管理员和聊天室拥有者可以执行此操作（限群组聊天室且设有拥有者）
- **聊天室类型**：此功能主要针对群组聊天室，且该聊天室必须设有拥有者
- **禁止范围**：禁止仅限于指定的聊天室，不影响用户在其他聊天室的权限
- **即时生效**：禁止状态会立即生效，被禁止的用户无法在该聊天室中活动
- **重复操作**：对已被禁止的用户重复执行禁止会返回冲突错误
- **记录保存**：所有禁止操作都会被记录，包含执行者和时间信息