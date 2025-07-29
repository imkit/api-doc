# Kickout clients from a room

### path

/rooms/:id/delete/members

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

### Request Parameter

| Name          | Type    | Description                                                                                                     |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| systemMessage | Boolean | Whether to create a system message of _leaveRoom_ or _deleteMember_. Default false                              |
| members       | Array   | Array of member IDs. If you put current client id in the list, it means that the current client leaves the room |

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

### Response Result

Updated Room data.

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
