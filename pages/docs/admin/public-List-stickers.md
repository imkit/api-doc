# List sticker sets
This API is open to all client, no auth is required.

### path
/stickers

### Method
GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |


```
GET /stickers HTTP/1.1
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.13.6) GCDHTTPRequest
```

### Response Result
Sticker list, ordered by _id: ascending, updatedAt: descending.

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "_id": "sticker",
        "name": "Sample",
        "zip": {
          "resourceId": "sticker/sticker.zip"
        },
        "updatedAtMS": 1550553501434
      }
    ]
  }
}
```