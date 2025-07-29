# Register device token for Push Notification

### path

/me/subscribe

### Method

Post

### Post Parameters

| Field    | Type   | Description                                                                          |
| -------- | ------ | ------------------------------------------------------------------------------------ |
| type     | String | Device Token Type, [ios, android, fcm, web, ios-voip]                                |
| token    | String | Device Token                                                                         |
| deviceId | String | Unique device id                                                                     |
| clientId | String | (Optional) Bind to Client ID. Only used when calling this API with platform api key. |

```
POST /me/subscribe HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.0.15 (Macintosh; OS X/10.11.6) GCDHTTPRequest
Content-Length: 89

{"type":"ios","token":"17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6"}
```

### Response Result

Subscribe result

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```
