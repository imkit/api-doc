# 钉选讯息

## 概述

此端点允许聊天室拥有者或管理员将指定讯息钉选至聊天室顶部，方便成员快速查阅重要讯息。每个聊天室同一时间只能有一则钉选讯息。

------

## API 端点

### 钉选讯息

将指定讯息钉选至聊天室顶部。

```http
POST /messages/:id/pin
```

#### Headers

| 参数               | 类型   | 必填 | 说明         |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅   | 用户端金钥   |
| `IM-Authorization` | string | ✅   | 用户端权杖   |

#### Path Parameters

| 参数  | 类型   | 必填 | 说明             |
| ----- | ------ | ---- | ---------------- |
| `:id` | string | ✅   | 讯息唯一识别码   |

此 API 无需请求内容（Request Body）。

#### 范例请求

**cURL 范例：**

```bash
curl -X "POST" "https://your-app.imkit.io/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/messages/${messageID}/pin`,
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

**成功回应（200 OK）**

| 参数                  | 类型    | 说明                               |
| --------------------- | ------- | ---------------------------------- |
| `RC`                  | number  | 回应代码（0 表示成功）             |
| `RM`                  | string  | 回应讯息                           |
| `result._id`          | string  | 讯息唯一识别码                     |
| `result.message`      | string  | 讯息内容                           |
| `result.room`         | string  | 所属聊天室 ID                      |
| `result.sender`       | object  | 讯息发送者资讯                     |
| `result.messageType`  | string  | 讯息类型                           |
| `result.pinned`       | boolean | 是否已钉选（钉选后为 `true`）      |
| `result.messageTimeMS`| number  | 讯息发送时间戳（毫秒）             |
| `result.updatedAtMS`  | number  | 最后更新时间戳（毫秒）             |

#### 范例回应

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

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- 无效的用户端金钥或授权权杖
- 指定的讯息不存在
- 当前用户不是聊天室拥有者或管理员
- 伺服器内部错误

------

## 使用场景

### 重要讯息管理

- **公告置顶**：将重要公告钉选至聊天室顶部，确保所有成员都能看到
- **快速查阅**：让成员无需翻阅历史讯息即可找到关键资讯

------

## 注意事项

- **权限限制**：仅聊天室**拥有者（owner）**或**管理员（admin）**可以执行钉选操作
- 若要取消钉选，请使用[取消钉选讯息](./unpin-a-message) API
