# 列出封锁用户

## 概述

取得当前用户的完整封锁清单，显示所有被封锁的用户详细资讯。此 API 提供用户管理个人封锁清单的功能，包括检视被封锁用户的基本资讯、封锁时间以及相关聊天室资讯，适用于用户检视和管理自己的隐私设定。

------

## API 端点

### 取得封锁清单

获取当前用户建立的所有封锁关系详细资讯。

```http
GET /blockStatus/my
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### 范例请求

**取得完整封锁清单**

```http
GET /blockStatus/my HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 范例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/blockStatus/my`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 范例：**

```bash
curl -X "GET" "https://your-app.imkit.io/blockStatus/my" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 封锁清单资料           |

**结果物件结构**

| 参数   | 类型  | 说明               |
| ------ | ----- | ------------------ |
| `data` | array | 封锁关系清单阵列   |

**封锁关系物件结构**

| 参数        | 类型   | 说明                          |
| ----------- | ------ | ----------------------------- |
| `blockee`   | object | 被封锁用户的详细资讯          |
| `blocker`   | string | 执行封锁的用户 ID             |
| `room`      | object | 关联聊天室的详细资讯          |
| `createdAt` | string | 封锁创建时间                  |
| `updatedAt` | string | 封锁更新时间                  |

**被封锁用户物件结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用户唯一识别码                |
| `nickname`        | string | 用户暱称                      |
| `avatarUrl`       | string | 用户头像 URL                  |
| `id`              | string | 用户 ID                       |
| `lastLoginTimeMS` | number | 最后登入时间（毫秒时间戳）    |

**聊天室物件结构**

| 参数            | 类型   | 说明                              |
| --------------- | ------ | --------------------------------- |
| `_id`           | string | 聊天室唯一识别码                  |
| `roomType`      | string | 聊天室类型（direct/group）        |
| `id`            | string | 聊天室 ID                         |
| `createdTimeMS` | number | 聊天室创建时间（毫秒时间戳）      |

#### 范例回应

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
        "blocker": "aaa",
        "room": {
          "_id": "2bec603e94a210092439e83ff2d79ac1",
          "roomType": "direct",
          "id": "2bec603e94a210092439e83ff2d79ac1",
          "createdTimeMS": 1628089206798
        },
        "createdAt": "2021-08-04T15:18:10.735Z",
        "updatedAt": "2021-08-04T15:18:10.735Z"
      },
      {
        "blockee": {
          "_id": "ddd",
          "nickname": "Dina",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
          "id": "ddd",
          "lastLoginTimeMS": 1628094314986
        },
        "blocker": "aaa",
        "room": {
          "_id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "roomType": "direct",
          "id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "createdTimeMS": 1628089213796
        },
        "createdAt": "2021-08-04T15:18:07.649Z",
        "updatedAt": "2021-08-04T15:18:07.649Z"
      }
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

**403 Forbidden** - 权限不足

```json
{
  "RC": 403,
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to access this resource"
  }
}
```

------

## 使用场景

### 个人隐私管理
- **封锁清单检视**：查看当前封锁的所有用户
- **隐私设定管理**：统一检视和管理个人隐私状态
- **关系状态确认**：确认特定用户的封锁状态

### 用户体验最佳化
- **清单管理界面**：提供完整的封锁用户管理功能
- **快速解封**：在清单中快速选择要解除封锁的用户
- **状态同步**：确保各平台封锁清单的一致性

### 系统管理
- **行为追踪**：了解用户的封锁行为模式
- **关系分析**：分析用户间的互动关系
- **数据统计**：统计封锁功能的使用情况

------

## 注意事项

- **仅显示自己的清单**：只能查看当前认证用户建立的封锁关系
- **完整资讯提供**：包含被封锁用户和相关聊天室的详细资讯
- **时间排序**：通常按封锁时间进行排序显示
- **聊天室类型**：支援直接聊天（direct）和群组聊天（group）的封锁关系
- **即时性**：返回当前最新的封锁清单状态
- **空清单处理**：如果没有封锁任何用户，则返回空阵列
