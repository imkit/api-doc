# 删除聊天室

# 删除聊天室和聊天室中的消息

聊天室及其消息将从数据库中永久删除


### 路径

/rooms/:id

### 方法

DELETE

### 路径参数

| 参数名 | 说明 |
| ---- | ----------- |
| :id  | 聊天室ID     |

```
DELETE /rooms/test-room-123 HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```

### 响应结果

删除结果数据

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    /* Debugging detail */ "n": 1,
    "ok": 1
  }
}
```