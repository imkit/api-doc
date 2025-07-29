# Super user delete messages in a room
Restrict to platform admin, room owner and room managers.

### path
/rooms/:roomID/messages/:messageID

### Method
DELETE

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :roomID  | Room ID     |
| :messageID  | Specific message in room to delete.<br/>Delete all messages in the room if speciifed messageID equals `_all`     |

```
DELETE /rooms/test-room-123/messages/_all HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```
