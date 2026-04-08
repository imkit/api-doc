# 置顶消息

## 概述

此端点允许聊天室拥有者或管理员将指定消息置顶至聊天室顶部，方便成员快速查阅重要消息。

------

## API 端点

### 置顶消息

将指定消息置顶至聊天室顶部。

```http
POST /messages/:id/pin
```

#### Headers

| 参数               | 类型   | 必填 | 说明         |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅   | 客户端密钥   |
| `IM-Authorization` | string | ✅   | 客户端令牌   |

#### Path Parameters

| 参数  | 类型   | 必填 | 说明             |
| ----- | ------ | ---- | ---------------- |
| `:id` | string | ✅   | 消息唯一标识符   |

此 API 无需请求内容（Request Body）。

#### 示例请求

**cURL 示例：**

```bash
curl -X "POST" "http://localhost:3100/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}'
```

**JavaScript 示例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/messages/${messageID}/pin`,
  null,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

#### Response

**成功响应（200 OK）**

| 参数                  | 类型    | 说明                               |
| --------------------- | ------- | ---------------------------------- |
| `RC`                  | number  | 响应码（0 表示成功）               |
| `RM`                  | string  | 响应消息                           |
| `result._id`          | string  | 消息唯一标识符                     |
| `result.message`      | string  | 消息内容                           |
| `result.room`         | string  | 所属聊天室 ID                      |
| `result.sender`       | object  | 消息发送者信息                     |
| `result.messageType`  | string  | 消息类型                           |
| `result.pinned`       | boolean | 是否已置顶（置顶后为 `true`）      |
| `result.messageTimeMS`| number  | 消息发送时间戳（毫秒）             |
| `result.updatedAtMS`  | number  | 最后更新时间戳（毫秒）             |

#### 示例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5f890cf37d980e06f6aaf349",
    "message": "重要公告：明天下午两点开会",
    "room": "demo-room",
    "sender": {
      "_id": "aaa",
      "nickname": "AAA",
      "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
      "isRobot": false,
      "id": "aaa",
      "lastLoginTimeMS": 1602817267900
    },
    "messageType": "text",
    "appID": "SampleApp",
    "pinned": true,
    "id": "5f890cf37d980e06f6aaf349",
    "messageTimeMS": 1602817267923,
    "updatedAtMS": 1602817290000,
    "createdAtMS": 1602817267925
  }
}
```

#### 错误响应

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- 指定的消息不存在
- 当前用户不是聊天室拥有者或管理员
- 服务器内部错误

------

## 使用场景

### 重要消息管理

- **公告置顶**：将重要公告置顶至聊天室顶部，确保所有成员都能看到
- **快速查阅**：让成员无需翻阅历史消息即可找到关键信息

------

## 注意事项

- **权限限制**：仅聊天室**拥有者（owner）**或**管理员（admin）**可以执行置顶操作
- 若要取消置顶，请使用[取消置顶消息](./unpin-a-message) API
