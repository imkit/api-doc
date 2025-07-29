# Delete room and messages in the room

The room and its message would be permanently deleted from database


### path

/rooms/:id

### Method

DELETE

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Room ID     |

```
DELETE /rooms/test-room-123 HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```

### Response Result

Created Room data

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    /* Debugging detail */ "n": 1,
    "ok": 1
  }
}
```
