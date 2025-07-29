# Compute file statistics by tags
### path
/files/stats

### Method
POST


### Post Body
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| tags          | Array of String | Room Tags |
| rangeStart    | String | Date start, ISO Date format |
| rangeEnd      | String | Date end, ISO Date format |

```
POST /files/stats HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: RapidAPI/4.1.5 (Macintosh; OS X/13.3.0) GCDHTTPRequest
Content-Length: 84

{"rangeStart":"2023-04-01","rangeEnd":"2023-12-31","tags":["demo","FpOtW6","sp47M"]}


```

### Response Result

```javascript
{
  "inspect": {
    "query": {
      "appID": "SampleApp",
      "createdAt": {
        "$gte": "2023-04-01T00:00:00.000Z",
        "$lte": "2023-12-31T00:00:00.000Z"
      },
      "tags": [
        "demo",
        "FpOtW6",
        "sp47M"
      ]
    },
    "tookMS": 9
  },
  "data": {
    "demo": {
      "size": 450588, /* bytes */
      "count": 3
    },
    "FpOtW6": {
      "size": 150196,
      "count": 1
    },
    "sp47M": {
      "size": 300392,
      "count": 2
    }
  },
  "totalCount": 6,
  "totalSize": 901176
}
```