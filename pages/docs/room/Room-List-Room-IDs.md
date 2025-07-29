# List Room IDs

### path

/rooms/ids

### Method

GET

### URL Query Parameters

| Field | type    | Description                                                  |
| ----- | ------- | ------------------------------------------------------------ |
| skip  | Integer | (Optional) Paging offset. Default 0.                         |
| limit | Integer | (Optional) Limit of rooms in response. Default 0, unlimited. |

### Request Sample

```
## List Rooms
curl "http://localhost:3100/rooms/ids?skip=0&limit=200" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {TOKEN}' \
     -H 'origin: https://imkitdemo.com' \
     -H 'X-Forwarded-For: 192.168.1.22'

```

### Response Result

| Property   | Description               |
| ---------- | ------------------------- |
| totalCount | (int) room count          |
| data       | (array) Array of Room IDs |
| inspect    | Diagnosis info            |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "members": "sss",
        "status": 1
      },
      "tookMS": 8
    },
    "data": ["05c28d0a2fbdc74986135d633ae129d8"]
  }
}
```
