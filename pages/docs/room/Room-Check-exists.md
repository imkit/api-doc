# Check a room exists by room ID

### path

/rooms/:id/exists

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Room ID     |

```
GET /rooms/demo-room/exists HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.6) GCDHTTPRequest

```

### Response Result

#### Exists

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "exists": true
  }
}
```

#### Not exists

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "exists": false
  }
}
```
