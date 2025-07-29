# Count badges by room tags
### path
/badges/byRoomTagsAndTime

### Method
POST

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY    | Client Key   |
| IM-Authorization | Client Token |

### Post Body
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| tags          | Array of String | [Optional] Room Tags |
| beforeTime    | DateTime |  [Optional] Only count unread messages that are sent before this specified date-time  |

```
POST /badges/byRoomTagsAndTime HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.6) GCDHTTPRequest
Content-Length: 26

{"tags":["demo","sample"],"beforeTime":"2023-11-18T02:00:00Z"}


```

### Response Result

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalBadge": 2,
    "data": {
      "demo": 2,
      "sample": 0,
    }
  }
}
```