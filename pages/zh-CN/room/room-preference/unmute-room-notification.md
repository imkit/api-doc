# 取消静音聊天室通知

# 取消静音聊天室

### 路径

/me/mute/:room

### 方法

Delete

### 请求头：

| 字段         | 说明  |
| ------------- | ------------ |
| IM-CLIENT-KEY | 客户端密钥   |
| Authorization | 客户端令牌 |

### 路径参数

| 字段 | 说明 |
| ----- | ----------- |
| room  | 聊天室ID     |

```
DELETE /me/mute/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Host: localhost:3100
Connection: close
User-Agent: Paw/3.0.15 (Macintosh; OS X/10.11.6) GCDHTTPRequest
```

### 响应结果

更新后的客户端数据

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test AB",
    "appID": "SampleApp",
    "__v": 0,
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 56216,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
    "mute": [],
    "lastLoginTimeMS": 1487068306745
  }
}
```