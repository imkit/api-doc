# 静音聊天室通知

此端点允许当前用户将指定聊天室设为静音，静音后该聊天室的新消息将不会触发推送通知。此设置为个人偏好，仅影响当前用户，不影响其他成员。

## HTTP 请求

```
POST /me/mute/:room
```

## 身份验证

在请求标头中包含您的客户端密钥和授权令牌：

| 标头               | 说明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 客户端密钥   | ✅    |
| `IM-Authorization` | 客户端令牌   | ✅    |

## 路径参数

| 参数    | 类型   | 说明             | 必填 |
| ------- | ------ | ---------------- | ---- |
| `:room` | string | 聊天室唯一标识符 | ✅    |

此 API 无需请求内容（Request Body）。

## 使用示例

**cURL 示例：**

```bash
curl -X "POST" "http://localhost:3100/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}'
```

**JavaScript 示例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/me/mute/${roomID}`,
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

当请求成功时，API 会返回更新后的当前用户信息，`mute` 数组中将包含刚静音的聊天室 ID：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test AB",
    "appID": "SampleApp",
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 56216,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36",
    "mute": ["58871b877390be11d5f1ab30"],
    "lastLoginTimeMS": 1487068306745
  }
}
```

### 响应字段

| 字段              | 类型          | 说明                                   |
| ----------------- | ------------- | -------------------------------------- |
| `RC`              | number        | 响应码（0 表示成功）                   |
| `RM`              | string        | 响应消息                               |
| `result`          | object        | 更新后的当前用户信息                   |
| `result._id`      | string        | 用户唯一标识符                         |
| `result.nickname` | string        | 用户显示名称                           |
| `result.email`    | string        | 用户电子邮件                           |
| `result.mute`     | array[string] | 已静音的聊天室 ID 数组（静音后新增）   |

## 错误处理

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- 指定的聊天室不存在
- 服务器内部错误

## 使用注意事项

- **个人偏好**：静音设置仅影响当前用户，其他成员的通知不受影响
- **静音状态**：成功后，该聊天室 ID 会加入响应中 `mute` 数组，代表用户目前静音的所有聊天室
- 若要取消静音，请使用[取消静音聊天室通知](./unmute-room-notification) API
