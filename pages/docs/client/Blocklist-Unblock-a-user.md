# Unblock a user

### path

/blockStatus/my/:blockee

### Method

DELETE

### Headers:

| Field            | Description  |
| ---------------- | ------------ |
| IM-CLIENT-KEY    | Client Key   |
| IM-Authorization | Client Token |

### Path Parameter

| Parameter | Description        |
| --------- | ------------------ |
| Blockee   | Client ID to block |

```
DELETE /blockStatus/my/ddd HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100

```

### Response Result

Removed block status

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ddd",
      "nickname": "Dina",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
      "id": "ddd",
      "lastLoginTimeMS": 1628095079328
    },
    "blocker": "aaa",
    "room": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
    "createdAt": "2021-08-04T15:18:07.649Z",
    "updatedAt": "2021-08-04T15:18:07.649Z"
  }
}
```
