# Recall a message from room

### path

/rooms/:roomId/message

| Field  | Description |
| ------ | ----------- |
| roomId | Room ID     |

### Method

POST

### Headers:

#### For client

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

#### For Platform API

| Field      | Description      |
| ---------- | ---------------- |
| IM-API-KEY | Platform API Key |

### Post Body

#### Message

| Field       | Type   | Description         |
| ----------- | ------ | ------------------- |
| messageType | String | (required) 'recall' |
| \_id        | String | (required)          |

```
## Recall Message
curl -X "POST" "http://localhost:3100/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'Authorization: {TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "_id": "5ce3d80bd594874e495895a4",
  "messageType": "recall"
}'

```

### Response Result

Sent message data

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
