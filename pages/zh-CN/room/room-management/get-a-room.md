# 取得聊天室

## 概述

此端点允许您取得指定聊天室的详细资讯，包含成员列表、最后一则讯息、成员属性（未读数、已读位置）等完整资料。

------

## API 端点

### 取得聊天室详情

取得指定聊天室的完整资讯。

```http
GET /rooms/{id}
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | 用户端金钥 |
| `IM-Authorization` | string | ✅ | 用户端权杖 |

#### Path Parameters

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `id` | string | ✅ | 聊天室 ID |

#### 范例请求

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/${roomId}`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

##### cURL 范例

```bash
curl "https://your-app.imkit.io/rooms/project-room-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result` | object | 聊天室完整资讯 |

**聊天室物件栏位**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `_id` | string | 聊天室唯一识别码 |
| `appID` | string | 应用程式识别码 |
| `lastMessage` | object | 最后一则讯息（含发送者资讯） |
| `memberProperties` | array[object] | 成员属性阵列（未读数、已读位置） |
| `members` | array[object] | 成员详细资讯阵列 |
| `unread` | number | 当前用户的未读讯息数 |
| `description` | string | 聊天室描述 |
| `isSuperuser` | boolean | 当前用户是否为超级用户 |

**成员属性物件**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `client` | string | 成员用户 ID |
| `badge` | number | 未读讯息数 |
| `lastRead` | string | 最后已读的讯息 ID |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "project-room-001",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": "最新的讯息内容",
      "messageType": "text",
      "sender": {
        "_id": "user-a",
        "nickname": "Alice",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1488435140775
    },
    "memberProperties": [
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "user-a"
      },
      {
        "badge": 5,
        "client": "user-b"
      }
    ],
    "members": [
      {
        "_id": "user-a",
        "nickname": "Alice",
        "avatarUrl": "https://example.com/alice.jpg",
        "lastLoginTimeMS": 1487149355934
      },
      {
        "_id": "user-b",
        "nickname": "Bob",
        "avatarUrl": "https://example.com/bob.jpg",
        "lastLoginTimeMS": 1488438700398
      }
    ],
    "unread": 5,
    "description": "专案讨论群",
    "isSuperuser": false
  }
}
```

#### 错误回应

**404 Not Found** — 聊天室不存在

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

### 聊天室资讯
- **显示详情**：取得聊天室的成员列表和基本资讯
- **未读状态**：查询各成员的未读讯息数和已读位置

### 管理操作
- **成员确认**：确认特定用户是否为聊天室成员
- **状态检查**：检查聊天室的最后活动时间

------

## 注意事项

- **成员限定**：只有聊天室成员或平台管理员可以取得聊天室详情
- **完整资料**：回应包含所有成员的详细资讯和属性
- **最后讯息**：`lastMessage` 物件包含发送者的完整资讯
- **未读计算**：`unread` 栏位为当前认证用户的未读数
