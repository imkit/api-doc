# 撤回消息

此端点允许用户撤回聊天室中的指定消息。撤回后，原消息内容会被清空，消息类型变更为 `recall`，聊天室中的所有成员都能看到该消息已被撤回。支持客户端和平台 API 两种验证方式。

## HTTP 请求

```
POST /rooms/:roomId/message
```

## 身份验证

此 API 支持两种验证方式，择一使用：

### 客户端验证

| 标头               | 说明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 客户端密钥   | ✅    |
| `IM-Authorization` | 客户端令牌   | ✅    |

### 平台 API 验证

| 标头         | 说明             | 必填 |
| ------------ | ---------------- | ---- |
| `IM-API-KEY` | 平台 API 密钥    | ✅    |

## 路径参数

| 参数      | 类型   | 说明             | 必填 |
| --------- | ------ | ---------------- | ---- |
| `:roomId` | string | 聊天室唯一标识符 | ✅    |

## 请求内容

| 参数          | 类型   | 必填 | 说明                      |
| ------------- | ------ | ---- | ------------------------- |
| `messageType` | string | ✅    | 固定填入 `"recall"`       |
| `_id`         | string | ✅    | 要撤回的消息唯一标识符    |

## 使用示例

### 示例一：客户端验证撤回消息

**cURL 示例：**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"_id": "5ce3d80bd594874e495895a4", "messageType": "recall"}'
```

**JavaScript 示例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### 示例二：平台 API 验证撤回消息

**JavaScript 示例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

## 响应

### 成功响应

当请求成功时，API 会返回已撤回的消息对象，消息内容会被清空：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5ce3d80bd594874e495895a4",
    "message": "",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Nita",
      "avatarUrl": "http://loremflickr.com/240/240/style?1558435839",
      "isRobot": false,
      "id": "sss",
      "lastLoginTimeMS": 1553145898032
    },
    "messageType": "recall",
    "appID": "SampleApp",
    "id": "5ce3d80bd594874e495895a4",
    "messageTimeMS": 1558435851576,
    "updatedAtMS": 1558435921086,
    "createdAtMS": 1558435851580
  }
}
```

### 响应字段

| 字段                  | 类型   | 说明                               |
| --------------------- | ------ | ---------------------------------- |
| `RC`                  | number | 响应码（0 表示成功）               |
| `RM`                  | string | 响应消息                           |
| `result._id`          | string | 消息唯一标识符                     |
| `result.message`      | string | 消息内容（撤回后为空字符串）       |
| `result.room`         | string | 所属聊天室 ID                      |
| `result.sender`       | object | 撤回操作的发送者信息               |
| `result.messageType`  | string | 消息类型（撤回后为 `"recall"`）    |
| `result.messageTimeMS`| number | 消息发送时间戳（毫秒）             |
| `result.updatedAtMS`  | number | 最后更新时间戳（毫秒）             |

## 错误处理

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的验证密钥或令牌
- 指定的消息或聊天室不存在
- 无权限撤回该消息
- 服务器内部错误

## 使用注意事项

- **撤回效果**：撤回后，消息的 `message` 字段会变为空字符串，`messageType` 变为 `"recall"`，聊天室所有成员均可看到撤回状态
- **`_id`**：请求 Body 中的 `_id` 为要撤回的**消息** ID，而非聊天室 ID
- **两种验证**：客户端验证（`IM-CLIENT-KEY` + `IM-Authorization`）适用于普通用户操作；平台 API 验证（`IM-API-KEY`）适用于后台管理操作
