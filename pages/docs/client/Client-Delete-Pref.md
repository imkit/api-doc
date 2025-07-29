# Delete a user preference

### path

/me/pref/:key

### Method

DELETE

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

```
DELETE /me/pref/demokey HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
Authorization: {TOKEN}
Host: {HOST}
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.14.6) GCDHTTPRequest
```

### Response Result

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```
