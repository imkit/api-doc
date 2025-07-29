# Block a user

Block target user from direct chat room.

### path

/blockStatus/my/:blockee

### Method

POST

### Headers:

| Field            | Description  |
| ---------------- | ------------ |
| IM-CLIENT-KEY    | Client Key   |
| IM-Authorization | Client Token |

### Path Parameter

| Parameter | Description        |
| --------- | ------------------ |
| Blockee   | Client ID to block |

```
POST /blockStatus/my/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100

```

### Response Result

Block status

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "2bec603e94a210092439e83ff2d79ac1",
    "createdAt": "2021-08-04T15:18:10.735Z",
    "updatedAt": "2021-08-04T16:35:41.341Z"
  }
}
```
