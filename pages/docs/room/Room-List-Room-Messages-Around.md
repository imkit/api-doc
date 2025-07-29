# List Room Messages Around a give message

Messages ordered by updated date.

### path

/rooms/:id/messages/:messageID

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Path Parameters

| Name       | Description |
| ---------- | ----------- |
| :id        | Room ID     |
| :messageID | Message ID  |

### URL parameters

| Name   | Description                                                         |
| ------ | ------------------------------------------------------------------- |
| before | (optional) number of Messages earlier than the specified Message ID |
| after  | (optional) number of Messages later than the specified Message ID   |

```
GET /rooms/demo-room/messages/5dd6a419e8e9f00e88f189e6?before=10&after=9 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.2) GCDHTTPRequest

```

### Response Result

| Name       | Description                           |
| ---------- | ------------------------------------- |
| totalCount | Count of matched messages in the room |
| data       | Array of matched Messages             |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 2,
    "data": [
      {
        "_id": "59282c8b0eef3c1c53f3384c",
        "messageType": "text",
        "sender": {
          "_id": "1485248566481",
          "nickname": "Test2",
          "avatarUrl": "https://farm5.staticflickr.com/4187/34380436201_fb445103e6_z_d.jpg",
          "lastLoginTimeMS": 1496976369986
        },
        "message": "hh",
        "messageTimeMS": 1495805067114,
        "updatedAtMS": 1495805067114,
        "createdAtMS": 1495805067114
      },
      {
        "_id": "59282bf00eef3c1c53f33846",
        "messageType": "text",
        "sender": {
          "_id": "1485248560558",
          "nickname": "Test AB",
          "avatarUrl": "https://farm2.staticflickr.com/1261/5110834170_0797f39278_z_d.jpg",
          "lastLoginTimeMS": 1499602388127
        },
        "message": "hhues",
        "messageTimeMS": 1495804912636,
        "updatedAtMS": 1495804912636,
        "createdAtMS": 1495804912636
      }
    ]
  }
}
```
