# 更新成员角色

# 更新成员角色

更新成员在聊天室中的角色，如管理员、普通成员等。

### 路径

/rooms/:id/member/:client

### 方法

PUT

### 请求头：

| 字段         | 说明  |
| ------------- | ------------ |
| IM-CLIENT-KEY | 客户端密钥   |
| Authorization | 客户端令牌 |

### 路径参数

| 参数名    | 说明 |
| ------- | ----------- |
| :id     | 聊天室ID     |
| :client | 成员ID   |

### POST 参数

| 参数名     | 类型   | 说明                |
| -------- | ------ | -------------------------- |
| property | String | 成员属性字段名称 |
| value    | Mixed  | 新值                  |

```
PUT /rooms/58871b877390be11d5f1ab30/member/1485248560558 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.0.16 (Macintosh; OS X/10.11.6) GCDHTTPRequest
Content-Length: 35

{"property":"role","value":"admin"}

```

### 响应结果

更新后的聊天室

### 注意：

当将角色设置为管理员时，系统将自动向聊天室发送"assignAdmin"系统消息。