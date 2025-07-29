# Delete a sticker

This API should be used by platform console

### path

/admin/stickers/:id

### Method

DELETE

### Headers:

| Field      | Description            |
| ---------- | ---------------------- |
| IM-API-KEY | Platform admin api key |

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Sticker ID  |

```
DELETE /admin/stickers/sticker_10 HTTP/1.1
IM-API-KEY: fangho_imkit_0412_2018_001_apikey
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.13.6) GCDHTTPRequest
```

### Response Result

Deleted count

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    /* Debugging detail */ "n": 1,
    "ok": 1
  }
}
```
