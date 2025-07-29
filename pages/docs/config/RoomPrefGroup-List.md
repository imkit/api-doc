# List room preferences of an user group

### path

/roomPrefs/group/:group

### Method

GET

### Path Parameters

| Field         | Description  |
| ------------- | ------------ |
| group         | Group ID     |


### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| IM-Authorization | Client Token |

```
GET /roomPrefs/group/demo-group HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.14.6) GCDHTTPRequest
```

### Response Result

Room preference list

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "room": "demo-room",
        "tags": ["demo", "sample"]
      }
    ]
  }
}
```
