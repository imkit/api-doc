# 撤回消息

### 路径

/rooms/:roomId/message

| 字段  | 说明 |
| ------ | ----------- |
| roomId | 聊天室ID     |

### 方法

POST

### 请求头：

#### 对于客户端

| 字段         | 说明  |
| ------------- | ------------ |
| IM-CLIENT-KEY | 客户端密钥   |
| Authorization | 客户端令牌 |

#### 对于平台 API

| 字段      | 说明      |
| ---------- | ---------------- |
| IM-API-KEY | 平台 API 密钥 |

### POST 请求体

#### 消息

| 字段       | 类型   | 说明         |
| ----------- | ------ | ------------------- |
| messageType | String | (必填) 'recall' |
| \_id        | String | (必填)          |

```
## 撤回消息
curl -X "POST" "http://localhost:3100/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'Authorization: {TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "_id": "5ce3d80bd594874e495895a4",
  "messageType": "recall"
}'

```

### 响应结果

发送的消息数据

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
      "description": "description la la #1551163111743",
      "isRobot": false,
      "id": "sss",
      "lastLoginTimeMS": 1553145898032
    },
    "messageType": "recall",
    "appID": "SampleApp",
    "__v": 0,
    "id": "5ce3d80bd594874e495895a4",
    "messageTimeMS": 1558435851576,
    "updatedAtMS": 1558435921086,
    "createdAtMS": 1558435851580
  }
}
```