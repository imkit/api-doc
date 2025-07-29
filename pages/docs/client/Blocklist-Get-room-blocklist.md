# Get room blocklist

Only the room owner has the privilege to see blocklist if the room is a group chat room and the room owner is set.

### path

/blockStatus/room/:roomID

### Method

GET

### Headers:

| Field            | Description  |
| ---------------- | ------------ |
| IM-CLIENT-KEY    | Client Key   |
| IM-Authorization | Client Token |

### Path Parameter

| Parameter | Description |
| --------- | ----------- |
| roomID    | Room ID     |

```
GET /blockStatus/room/demo-room
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100

```

### Response Result

Blocklist of the room

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "blockee": {
          "_id": "ccc",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
          "nickname": "Cathy",
          "id": "ccc",
          "lastLoginTimeMS": 1600006869368
        },
        "blocker": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093717",
          "nickname": "Alecia",
          "id": "aaa",
          "lastLoginTimeMS": 1583726632592
        },
        "room": {
          "_id": "demo-room",
          "roomType": "group",
          "id": "demo-room",
          "createdTimeMS": 1525001412492
        },
        "createdAt": "2021-08-04T16:08:53.057Z",
        "updatedAt": "2021-08-04T16:08:53.057Z"
      }
    ]
  }
}
```
