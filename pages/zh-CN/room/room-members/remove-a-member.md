# 移除成员

# 从聊天室中踢出成员

### 路径

/rooms/:id/delete/members

### 方法

POST

### 请求头：

| 字段         | 说明  |
| ------------- | ------------ |
| IM-CLIENT-KEY | 客户端密钥   |
| Authorization | 客户端令牌 |

### 路径参数

| 参数名 | 说明 |
| ---- | ----------- |
| :id  | 聊天室ID     |

### 请求参数

| 参数名          | 类型    | 说明                                                  |
| ------------- | ------- | ------------------------------------------------------------ |
| systemMessage | Boolean | 是否创建 _leaveRoom_ 或 _deleteMember_ 系统消息。默认为 false |
| members       | Array   | 成员ID数组。如果您在列表中放入当前客户端ID，则意味着当前客户端离开聊天室 |

```
POST /rooms/demo-room/delete/members/ HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.6) GCDHTTPRequest
Content-Length: 57

{"systemMessage":true,"members":["ccc","bbb"]}


```

### 响应结果

更新后的聊天室数据。

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "data": {
      "customProperty": "hello"
    },
    "lastMessage": {
      "_id": "58a2dc9c965d09221ea7bedb",
      "message": "sadf dsfdf",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0,
        "id": "1485248560558"
      },
      "messageTime": "2017-02-14T10:31:56.006Z",
      "messageTimeMS": 1487068316006,
      "id": "58a2dc9c965d09221ea7bedb"
    },
    "lastRead": [
      {
        "message": "58885c9e4d0c89571b777a81",
        "client": "1485248560558"
      }
    ],
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTime": "2017-02-14T10:31:46.745Z",
        "lastLoginTimeMS": 1487068306745,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTime": "2017-02-10T10:03:13.257Z",
        "lastLoginTimeMS": 1486720993257,
        "id": "1485248566481"
      }
    ],
    "id": "58871b877390be11d5f1ab30"
  }
}
```