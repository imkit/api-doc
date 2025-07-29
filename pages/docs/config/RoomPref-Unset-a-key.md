# Unset a key of user's room preference

### path

/roomPrefs/:room/:key

### Method

DELETE

```
DELETE /roomPrefs/demo-room/translation HTTP/1.1
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
    "folder": "Some-Folder",
    "muted": false,
    "sticky": false,
    "hidden": false,
    "tags": ["demo", "sample"]
  }
}
```
