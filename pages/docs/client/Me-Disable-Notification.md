# Disable Notification
### path
/me/notification/disable

### Method
Post

### Post Parameters
Empty

```
POST /me/notification/disable HTTP/1.1
IM-CLIENT-KEY: {CLIENT-KEY}
Authorization: {TOKEN}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.4.0 (Macintosh; OS X/12.5.0) GCDHTTPRequest
Content-Length: 0

```

### Response Result

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    ...
    "notificationEnabled": false,
  }
}
```