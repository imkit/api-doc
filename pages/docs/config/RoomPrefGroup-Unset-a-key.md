# Unset a pref key of an user group's room preference

### path

/roomPrefs/:room/group/:group/:key

### Method

DELETE

### Path Parameters

| Field         | Description  |
| ------------- | ------------ |
| room          | Room ID      |
| group         | Group ID     |
| key           | Pref key     |


```
DELETE /roomPrefs/demo-room/group/demo-group/tags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.7) GCDHTTPRequest
```

### Response Result

Updated result

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "room": "demo-room",
    "tags": []
  }
}
```
