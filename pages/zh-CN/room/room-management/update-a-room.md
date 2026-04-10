# 更新聊天室

## 概述

更新现有聊天室的资讯和设定。此 API 允许修改聊天室的基本资讯、权限设定、管理员配置等。仅限聊天室的拥有者、管理员或平台管理员使用。

------

## API 端点

### 更新聊天室资讯

修改指定聊天室的属性和设定。

```http
PUT /rooms/{id}
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

#### Request Body

| 参数          | 类型    | 必填 | 说明                                                      |
| ------------- | ------- | ---- | --------------------------------------------------------- |
| `name`        | string  | ❌    | 聊天室名称                                                |
| `cover`       | string  | ❌    | 聊天室封面图片 URL                                        |
| `description` | string  | ❌    | 聊天室描述                                                |
| `roomTags`    | array   | ❌    | 共享聊天室标签阵列                                        |
| `webhook`     | string  | ❌    | Webhook 金钥或 URL                                        |
| `botMode`     | boolean | ❌    | 是否启用聊天室机器人                                      |
| `extParams`   | string  | ❌    | 扩展自订参数，格式：param1=value1&param2=value2&...      |
| `opening`     | number  | ❌    | 开放状态：0=关闭加入或邀请，1=开放加入和邀请              |
| `owner`       | string  | ❌    | 新的拥有者客户端 ID（限平台管理员或聊天室超级用户）       |
| `managers`    | array   | ❌    | 管理员客户端 ID 阵列（限平台管理员或聊天室超级用户）      |
| `status`      | number  | ❌    | 聊天室状态：0=无效，1=有效                                |

#### 范例请求

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "description": "Description La La",
  "name": "Martena",
  "cover": "http://loremflickr.com/240/240/style?Kelly"
}
```

**JavaScript 范例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30`,
  {
    description: "Description La La",
    name: "Martena",
    cover: "http://loremflickr.com/240/240/style?Kelly",
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 范例：**

```bash
curl -X "PUT" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"description": "Description La La", "name": "Martena", "cover": "http://loremflickr.com/240/240/style?Kelly"}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 更新后的聊天室资料     |

**聊天室物件结构**

| 参数            | 类型   | 说明                      |
| --------------- | ------ | ------------------------- |
| `_id`           | string | 聊天室唯一识别码          |
| `name`          | string | 聊天室名称                |
| `cover`         | string | 聊天室封面图片 URL        |
| `description`   | string | 聊天室描述                |
| `status`        | number | 聊天室状态                |
| `lastMessage`   | object | 最后一则讯息资讯          |
| `members`       | array  | 聊天室成员列表            |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Martena",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "Description La La",
    "status": 1,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "hhhooo",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
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
  "RM": "Forbidden",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can update room"
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

### 聊天室管理
- **基本资讯维护**：更新聊天室名称、描述、封面图片
- **权限管理**：调整聊天室开放状态和管理员配置
- **功能设定**：启用或停用机器人模式

### 管理后台
- **批量管理**：透过管理介面批量更新聊天室设定
- **内容审核**：修改不当的聊天室资讯
- **所有权转移**：将聊天室拥有权转移给其他用户

### 系统整合
- **Webhook 配置**：设定聊天室的 Webhook 接收端点
- **扩展参数**：透过 extParams 整合第三方系统
- **状态管理**：启用或停用特定聊天室

------

## 注意事项

- **权限限制**：仅聊天室拥有者、管理员或平台管理员可执行更新
- **所有权转移**：更改 owner 和 managers 需要更高权限
- **参数验证**：所有参数都是选择性的，只更新提供的栏位
- **状态影响**：设定 status=0 会让聊天室变为无效状态
- **开放设定**：opening 参数影响新用户是否能加入聊天室
