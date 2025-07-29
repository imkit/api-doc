# Create or Update a preference

### path

/me/pref/:key

### Method

POST

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Post Body

Any JSON Object

```
POST /me/pref/demokey HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: {HOST}
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.14.6) GCDHTTPRequest
Content-Length: 66

{"foo":"bar","folders":{"folder 1":{"rooms":["aaabbb","cccddd"]}}}
```

### Response Result

Created or updated result

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
