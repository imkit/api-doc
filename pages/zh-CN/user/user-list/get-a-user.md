# 获取用户信息

## 概述

取得目前已登录用户的详细信息。此 API 可用于获取当前认证用户的个人资料、登录状态和其他相关信息。

------

## API 端点

### 获取当前用户信息

取得目前已登录用户的完整数据。

```http
GET /me
```

#### Headers

| 参数            | 类型   | 必填 | 说明           |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `Authorization` | string | ✅    | Client Token   |

#### 示例请求

```http
GET /me HTTP/1.1
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Host: 104.199.197.188:3100
Connection: close
```

#### Response

**成功响应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 响应代码（0 表示成功） |
| `RM`     | string | 响应消息               |
| `result` | object | 用户详细信息           |

**用户对象结构**

| 参数                    | 类型   | 说明                          |
| ----------------------- | ------ | ----------------------------- |
| `_id`                   | string | 用户唯一识别码                |
| `email`                 | string | 用户电子邮件                  |
| `nickname`              | string | 用户显示名称                  |
| `appID`                 | string | 应用程序识别码                |
| `avatarUrl`             | string | 用户头像 URL                  |
| `address`               | object | 最后连接的网络地址信息        |
| `userAgent`             | string | 最后使用的浏览器/应用程序信息 |
| `lastLoginTimeMS`       | number | 最后登录时间（毫秒时间戳）    |
| `notificationEnabled`   | boolean| 是否启用通知                  |

#### 示例响应

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

#### 错误响应

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

### 用户数据显示
- **个人资料页面**：在应用程序中显示用户的个人信息
- **设置页面**：载入当前用户设置进行编辑
- **权限检查**：确认用户身份和权限

### 状态检查
- **登录验证**：确认用户登录状态是否有效
- **会话管理**：检查用户会话是否过期
- **通知设置**：确认用户的通知偏好设置

------

## 注意事项

- **认证必要性**：此 API 需要有效的用户认证
- **敏感信息**：不会返回密码等敏感信息
- **缓存建议**：用户信息可以适当缓存以提升性能
- **隐私保护**：仅返回当前认证用户的信息