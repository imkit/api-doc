# List user preferences

### path

/me/prefs

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

```
GET /me/prefs HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
Authorization: {TOKEN}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.15.0) GCDHTTPRequest

```

### Response Result

#### User preference list

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "demokey": {
      "folders": {
        "folder 1": {
          "rooms": ["aaabbb", "cccddd"]
        }
      },
      "foo": "bar"
    }
  }
}
```
