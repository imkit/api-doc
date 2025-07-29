# Block a user in a room

Only the platform admin and room owner has the privilege to block a member if the room is a group chat room and the room owner is set.



### path

/blockStatus/room/:roomID/:blockee

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
| roomID    | Room ID            |
| blockee   | Client ID to block |

```
POST /blockStatus/room/demo-room/ccc
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
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093304",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "demo-room",
    "createdAt": "2021-08-04T16:08:53.057Z",
    "updatedAt": "2021-08-04T16:08:53.057Z"
  }
}
```
