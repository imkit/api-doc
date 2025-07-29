# List quitted rooms

List Rooms that the current client left or was removed from.

### path

/rooms/quitted

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Request Sample

```
GET /rooms/demo-room/messages?limit=30 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.6) GCDHTTPRequest
```

### Response Result

| Property | Description                                                |
| -------- | ---------------------------------------------------------- |
| data     | (array) Array of Quitted Rooms, but with limited room info |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "roomTags": ["demo", "foo", "bar"],
        "encrypted": false,
        "_id": "demo-room",
        "name": "Demo Demo",
        "cover": "http://loremflickr.com/240/240/style?demo",
        "description": "public demo room",
        "roomType": "group",
        "pref": {
          "tags": [],
          "quittedAt": "2020-09-11T15:04:27.032Z"
        },
        "id": "demo-room",
        "createdTimeMS": 0
      }
    ]
  }
}
```
