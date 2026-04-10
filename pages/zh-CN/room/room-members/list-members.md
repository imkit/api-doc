# 列出成员

## 概述

取得指定聊天室的成员列表。此 API 与[取得聊天室](/zh-TW/room/room-management/get-a-room)使用相同端点 `GET /rooms/{id}`，回传的聊天室资料中包含完整的 `members` 成员阵列与 `memberProperties` 成员属性。

------

## API 端点

### 取得聊天室详细资讯（包含成员列表）

查询指定聊天室的完整资讯，包含所有成员的详细资料。

```http
GET /rooms/{id}
```

#### Headers

| 参数            | 类型   | 必填 | 说明           |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 参数 | 类型   | 必填 | 说明        |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅    | 聊天室 ID   |

#### 范例请求

```http
GET /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Host: your-app.imkit.io
Connection: close
User-Agent: Paw/3.0.14 (Macintosh; OS X/10.11.6) GCDHTTPRequest
```

**JavaScript 范例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30`,
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
curl -X "GET" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 聊天室详细资讯         |

**聊天室详细资讯物件结构**

| 参数                | 类型   | 说明                          |
| ------------------- | ------ | ----------------------------- |
| `_id`               | string | 聊天室唯一识别码              |
| `appID`             | string | 应用程式识别码                |
| `description`       | string | 聊天室描述                    |
| `lastMessage`       | object | 最后一则讯息资讯              |
| `memberProperties`  | array  | 成员属性列表（未读数、最后读取）|
| `members`           | array  | 成员详细资讯列表              |
| `unread`            | number | 当前用户未读讯息数            |
| `isSuperuser`       | bool   | 当前用户是否为超级用户        |

**成员物件结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 成员唯一识别码                |
| `nickname`        | string | 成员暱称                      |
| `avatarUrl`       | string | 成员头像 URL                  |
| `lastLoginTime`   | string | 最后登入时间（ISO 格式）      |
| `lastLoginTimeMS` | number | 最后登入时间（毫秒时间戳）    |

**成员属性物件结构**

| 参数       | 类型   | 说明                          |
| ---------- | ------ | ----------------------------- |
| `client`   | string | 成员客户端 ID                 |
| `badge`    | number | 未读讯息数量                  |
| `lastRead` | string | 最后读取的讯息 ID             |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": 1111234,
      "messageType": "text",
      "sender": {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 0,
        "id": "1485248566481"
      },
      "messageTime": "2017-03-02T06:12:20.775Z",
      "messageTimeMS": 1488435140775,
      "id": "58b7b7c4c246bc0b41afb148"
    },
    "memberProperties": [
      {
        "badge": 5,
        "lastRead": "58b7a2c5f034920a878e9a53",
        "client": "1485248560558"
      },
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "1485248566481"
      },
      {
        "badge": 61,
        "client": "1485250743313"
      }
    ],
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTime": "2017-02-15T09:02:35.934Z",
        "lastLoginTimeMS": 1487149355934,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTime": "2017-03-02T07:11:40.398Z",
        "lastLoginTimeMS": 1488438700398,
        "id": "1485248566481"
      },
      {
        "_id": "1485250743313",
        "nickname": "Test 3",
        "lastLoginTime": "2017-03-02T07:18:31.436Z",
        "lastLoginTimeMS": 1488439111436,
        "id": "1485250743313"
      }
    ],
    "unread": 5,
    "description": "Sample Description",
    "isSuperuser": true,
    "id": "58871b877390be11d5f1ab30"
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

**403 Forbidden** - 权限不足或非成员

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "You are not a member of this room"
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

### 成员管理
- **成员列表**：显示聊天室内所有成员的详细资讯
- **成员监控**：查看成员的登入状态和活跃度
- **权限检查**：确认当前用户在聊天室中的权限级别

### 聊天室资讯
- **聊天室状态**：获取聊天室的完整状态资讯
- **未读统计**：查看个人和整体的未读讯息统计
- **最新讯息**：获取聊天室的最后一则讯息资讯

### 应用整合
- **资料同步**：同步聊天室成员和状态资讯
- **UI 显示**：为聊天室界面提供完整的显示资料
- **分析统计**：分析聊天室成员的参与度和活跃度

------

## 注意事项

- **成员权限**：只有聊天室成员才能查看详细资讯
- **资料完整性**：回应包含成员列表和成员属性的完整资讯
- **未读计算**：memberProperties 中包含每个成员的未读讯息数量
- **权限识别**：isSuperuser 栏位标识当前用户是否为管理员
- **时间格式**：提供 ISO 格式和毫秒时间戳两种时间格式
- **资料量**：大型聊天室可能返回大量成员资料，注意处理效能
- **即时性**：成员状态和未读数可能需要定期更新以保持即时性