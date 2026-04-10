# 静音聊天室通知

## 概述

此端点允许当前用户将指定聊天室设为静音，静音后该聊天室的新讯息将不会触发推播通知。此设定为个人偏好，仅影响当前用户，不影响其他成员。

------

## API 端点

### 静音聊天室通知
将指定聊天室设为静音，停止接收推播通知。

```http
POST /me/mute/:room
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 用户端金钥 |
| `IM-Authorization` | string | ✅ | 用户端权杖 |

#### Path Parameters

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `:room` | string | ✅ | 聊天室唯一识别码 |

此 API 无需请求内容（Request Body）。

#### 范例请求

**cURL 范例：**

```bash
curl -X "POST" "https://your-app.imkit.io/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/me/mute/${roomID}`,
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

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result` | object | 更新后的当前用户资讯 |
| `result._id` | string | 用户唯一识别码 |
| `result.nickname` | string | 用户显示名称 |
| `result.email` | string | 用户电子邮件 |
| `result.mute` | array[string] | 已静音的聊天室 ID 阵列（静音后新增） |

#### 范例回应

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

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- 无效的用户端金钥或授权权杖
- 指定的聊天室不存在
- 伺服器内部错误

------

## 使用场景

- **停止特定聊天室通知**：当用户不想被某个聊天室的讯息打扰时，可将其静音
- **取消静音**：若要取消静音，请使用[取消静音聊天室通知](./unmute-room-notification) API

------

## 注意事项

- **个人偏好**：静音设定仅影响当前用户，其他成员的通知不受影响
- **静音状态**：成功后，该聊天室 ID 会加入回应中 `mute` 阵列，代表用户目前静音的所有聊天室
