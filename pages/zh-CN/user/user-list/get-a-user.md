# 获取用户资讯

## 概述

取得目前已登入用户的详细资讯。此 API 可用于获取当前认证用户的个人资料、登入状态和其他相关资讯。

------

## API 端点

### 获取当前用户资讯

取得目前已登入用户的完整资料。

```http
GET /me
```

#### Headers

| 参数            | 类型   | 必填 | 说明           |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### 范例请求

```http
GET /me HTTP/1.1
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Host: your-app.imkit.io
Connection: close
```

**JavaScript 范例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/me`,
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
curl -X "GET" "https://your-app.imkit.io/me" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 用户详细资讯           |

**用户物件结构**

| 参数                    | 类型   | 说明                          |
| ----------------------- | ------ | ----------------------------- |
| `_id`                   | string | 用户唯一识别码                |
| `email`                 | string | 用户电子邮件                  |
| `nickname`              | string | 用户显示名称                  |
| `appID`                 | string | 应用程式识别码                |
| `avatarUrl`             | string | 用户头像 URL                  |
| `address`               | object | 最后连线的网路地址资讯        |
| `userAgent`             | string | 最后使用的浏览器/应用程式资讯 |
| `lastLoginTimeMS`       | number | 最后登入时间（毫秒时间戳）    |
| `notificationEnabled`   | boolean| 是否启用通知                  |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test CCDD",
    "appID": "SampleApp",
    "__v": 0,
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 52808,
      "family": "IPv6",
      "address": "::ffff:210.242.193.226"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    "lastLoginTimeMS": 1486027236514,
    "notificationEnabled": true
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

**403 Forbidden** - 无效的 Client Key

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "INVALID_CLIENT_KEY",
    "message": "Invalid client key"
  }
}
```

------

## 使用场景

### 用户资料显示
- **个人资料页面**：在应用程式中显示用户的个人资讯
- **设定页面**：载入当前用户设定进行编辑
- **权限检查**：确认用户身分和权限

### 状态检查
- **登入验证**：确认用户登入状态是否有效
- **会话管理**：检查用户会话是否过期
- **通知设定**：确认用户的通知偏好设定

------

## 注意事项

- **认证必要性**：此 API 需要有效的用户认证
- **敏感资讯**：不会返回密码等敏感资讯
- **快取建议**：用户资讯可以适当快取以提升效能
- **隐私保护**：仅返回当前认证用户的资讯
