# Join Room

Join room. Accept room invitation.
If the client succeed to join room, this API would also delete pending room invitations to this client.

Note: if config has `invitationRequired`=1 (`INVITATION_REQUIRED`=1), the room owner need to send invitation to the client first. Thereafter the client can join room.

### path

/rooms/:id/join

### Method

Post

### Headers:

| Field            | Description  |
| ---------------- | ------------ |
| IM-CLIENT-KEY    | Client Key   |
| IM-Authorization | Client Token |

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Room ID     |

```
POST /rooms/58871b877390be11d5f1ab30/join HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.0.14 (Macintosh; OS X/10.11.6) GCDHTTPRequest
Content-Length: 0
```

```javascript
axios.post(
  `http://localhost:3100/rooms/${roomID}/join`,
  {},
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
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
      "name": "test 1",
      "note": "anything"
    },
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "hhhooo",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0,
        "id": "1485248560558"
      },
      "messageTime": "2017-01-24T09:51:31.375Z",
      "messageTimeMS": 1485251491375,
      "id": "588723a346006e17f4d82fe3"
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTime": "2017-01-30T08:23:13.389Z",
        "lastLoginTimeMS": 1485764593389,
        "id": "1485248560558"
      }
    ],
    "id": "58871b877390be11d5f1ab30"
  }
}
```
