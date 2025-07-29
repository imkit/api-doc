# List user preferences

### path

/me/pref

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Query Parameter:

| Field | Description                       |
| ----- | --------------------------------- |
| key   | (Optional) key of user preference |

```
GET /me/pref?key=demokey HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
Authorization: {TOKEN}
Host: {HOST}
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.14.6) GCDHTTPRequest

```

### Response Result

#### User preference list

```json
{
  "RC": 0,
  "RM": "OK",
  "result": [
    {
      "data": {
        "foo": "bar",
        "folders": {
          "folder 1": {
            "rooms": ["aaabbb", "cccddd"]
          }
        }
      },
      "key": "demokey"
    }
  ]
}
```

#### Specified user preference

If key is specified in query parameter

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": {
      "foo": "bar",
      "folders": {
        "folder 1": {
          "rooms": ["aaabbb", "cccddd"]
        }
      }
    },
    "key": "demokey"
  }
}
```
