# 置顶消息

此端点允许聊天室拥有者或管理员将指定消息置顶至聊天室顶部，方便成员快速查阅重要消息。

## HTTP 请求

```
POST /messages/:id/pin
```

## 身份验证

在请求标头中包含您的客户端密钥和授权令牌：

| 标头               | 说明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 客户端密钥   | ✅    |
| `IM-Authorization` | 客户端令牌   | ✅    |

## 路径参数

| 参数  | 类型   | 说明             | 必填 |
| ----- | ------ | ---------------- | ---- |
| `:id` | string | 消息唯一标识符   | ✅    |

此 API 无需请求内容（Request Body）。

## 使用示例

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

## 响应

### 成功响应

当请求成功时，API 会返回已置顶的消息对象：

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

### 响应字段

| 字段                  | 类型    | 说明                               |
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

## 错误处理

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- 指定的消息不存在
- 当前用户不是聊天室拥有者或管理员
- 服务器内部错误

## 使用注意事项

- **权限限制**：仅聊天室**拥有者（owner）**或**管理员（admin）**可以执行置顶操作
- 若要取消置顶，请使用[取消置顶消息](./unpin-a-message) API
