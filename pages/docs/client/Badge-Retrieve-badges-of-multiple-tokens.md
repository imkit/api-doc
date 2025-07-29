# Get total badges of multiple users(access tokens)

### path

/badges/

### Method

POST

### Headers:

| Field         | Description          |
| ------------- | -------------------- |
| IM-CLIENT-KEY | Client Key           |
| IM-Device-ID  | (optional) device id |

### Body

| Field  | Type  | Description     |
| ------ | ----- | --------------- |
| tokens | Array | Array of tokens |

```
POST /badges/ HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Device-ID: someId
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.14.5) GCDHTTPRequest
Content-Length: 519

{"tokens":["TOKEN-1","TOKEN-2"]}


```

### Response Result

User's badge count

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "client": "sss",
        "badge": 0
      },
      {
        "client": "aaa",
        "badge": 87
      }
    ],
    "totalBadge": 87
  }
}
```
