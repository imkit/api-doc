# 列出禁止成员

## 概述

取得指定聊天室的禁止清单，显示该聊天室中所有被禁止的用户详细信息。只有聊天室拥有者具备查看禁止清单的权限（限群组聊天室且设有拥有者）。此功能适用于聊天室拥有者查看和管理聊天室的禁止状态。

------

## API 端点

### 取得聊天室禁止清单

获取指定聊天室中所有被禁止用户的详细信息。

```http
GET /blockStatus/room/{roomID}
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数     | 类型   | 必填 | 说明        |
| -------- | ------ | ---- | ----------- |
| `roomID` | string | ✅    | 聊天室 ID   |

#### 范例请求

**取得聊天室禁止清单**

```http
GET /blockStatus/room/demo-room HTTP/1.1
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
| `result` | object | 禁止清单数据           |

**结果对象结构**

| 参数   | 类型  | 说明             |
| ------ | ----- | ---------------- |
| `data` | array | 禁止记录清单数组 |

**禁止记录对象结构**

| 参数        | 类型   | 说明                        |
| ----------- | ------ | --------------------------- |
| `blockee`   | object | 被禁止用户的详细信息        |
| `blocker`   | object | 执行禁止用户的详细信息      |
| `room`      | object | 聊天室详细信息              |
| `createdAt` | string | 禁止创建时间                |
| `updatedAt` | string | 禁止更新时间                |

**被禁止用户对象结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用户唯一识别码                |
| `nickname`        | string | 用户昵称                      |
| `avatarUrl`       | string | 用户头像 URL                  |
| `id`              | string | 用户 ID                       |
| `lastLoginTimeMS` | number | 最后登录时间（毫秒时间戳）    |

**执行禁止用户对象结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用户唯一识别码                |
| `nickname`        | string | 用户昵称                      |
| `avatarUrl`       | string | 用户头像 URL                  |
| `id`              | string | 用户 ID                       |
| `lastLoginTimeMS` | number | 最后登录时间（毫秒时间戳）    |

**聊天室对象结构**

| 参数            | 类型   | 说明                          |
| --------------- | ------ | ----------------------------- |
| `_id`           | string | 聊天室唯一识别码              |
| `roomType`      | string | 聊天室类型（group等）         |
| `id`            | string | 聊天室 ID                     |
| `createdTimeMS` | number | 聊天室创建时间（毫秒时间戳）  |

#### 范例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "blockee": {
          "_id": "ccc",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
          "nickname": "Cathy",
          "id": "ccc",
          "lastLoginTimeMS": 1600006869368
        },
        "blocker": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093717",
          "nickname": "Alecia",
          "id": "aaa",
          "lastLoginTimeMS": 1583726632592
        },
        "room": {
          "_id": "demo-room",
          "roomType": "group",
          "id": "demo-room",
          "createdTimeMS": 1525001412492
        },
        "createdAt": "2021-08-04T16:08:53.057Z",
        "updatedAt": "2021-08-04T16:08:53.057Z"
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
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner can view blocklist in group chat rooms"
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

### 聊天室管理
- **禁止状态查看**：聊天室拥有者查看当前禁止清单
- **成员管理**：查看被禁止用户的详细信息和禁止记录
- **管理决策**：基于禁止清单进行后续管理决策

### 权限管理
- **拥有者专属**：只有聊天室拥有者可以查看禁止清单
- **隐私保护**：保护禁止信息不被未授权用户查看
- **权限验证**：确保查看权限符合聊天室设置

### 记录追踪
- **禁止历史**：查看禁止操作的时间记录
- **用户信息**：获取被禁止用户和执行禁止用户的详细信息
- **聊天室状态**：了解聊天室的禁止管理状况

------

## 注意事项

- **权限限制**：只有聊天室拥有者可以查看禁止清单（限群组聊天室且设有拥有者）
- **聊天室类型**：此功能主要针对群组聊天室，且该聊天室必须设有拥有者
- **完整信息**：返回被禁止用户、执行用户和聊天室的完整信息
- **时间记录**：包含禁止创建和更新的时间戳记
- **数据结构**：返回数组格式，支持多个禁止记录
- **空清单处理**：如果聊天室没有禁止任何用户，则返回空数组