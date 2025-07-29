# A room member cancels invitations from a room

Remove pending invitations to invitees of a room.

### path

/rooms/:id/delete/invitations/

### Method

POST

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Room ID     |

### Request Parameters

| Name     | Type  | Description          |
| -------- | ----- | -------------------- |
| invitees | Array | Array of invitee IDs |

```
POST /rooms/demo-room/delete/invitations HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.6) GCDHTTPRequest
Content-Length: 26

{"invitees":["bbb","ccc"]}


```

### Response Result

Remaining invitations of the room

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "inviter": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
          "nickname": "AAA",
          "id": "aaa",
          "lastLoginTimeMS": 0
        },
        "room": {
          "_id": "demo-room",
          "name": "Demo",
          "cover": "http://loremflickr.com/240/240/style?demo",
          "description": "public demo room",
          "appID": "SampleApp",
          "roomType": "group",
          "webhook": "meet-taipei-intro",
          "botState": "CONTACT",
          "botMode": false,
          "encrypted": false,
          "serviceStatus": 0,
          "roomTags": [
            "demo",
            "foo",
            "bar"
          ],
          "status": 1,
          "memberProperties": [
            ...
          ],
          "members": [
            ...
          ],
          "id": "demo-room",
          "createdTimeMS": 1525001412492
        },
        "createdAt": "2020-03-01T08:24:57.477Z",
        "updatedAt": "2020-03-01T10:08:59.122Z"
      }
    ]
  }
}
```
