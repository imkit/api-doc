# Update Room

### path

/rooms/:id

### Method

PUT

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Room ID     |

### Post Parameters

Room properties to update

| Name        | Type    | Description                                                                        |
| ----------- | ------- | ---------------------------------------------------------------------------------- |
| name        | String  | (Optional) Room name                                                               |
| cover       | String  | (Optional) Room cover image URL                                                    |
| description | String  | (Optional) Room description                                                        |
| roomTags    | Array   | (Optional) Array of shared room tags                                               |
| webhook     | String  | (Optional) Webhook Key or URL                                                      |
| botMode     | Boolean | (Optional) Is room robot enabled                                                   |
| extParams   | String  | (Optional) Extended custom parameters, formatted as param1=value1&para2=value2¶... |
| opening     | Number  | 0 => Closed for joining or inviting, 1 => Open for joining and inviting            |
| owner       | String  | (Optional) new owner client id. Restrict to platform admin or superuser of the room |
| managers    | Array   | (Optional) Array of client ids. Restrict to platform admin or superuser of the room |
| status      | Number  | 0 => Invalid, 1 => Valid |

```
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.0.14 (Macintosh; OS X/10.11.6) GCDHTTPRequest
Content-Length: 35

{"description":"Description La La","name":"Martena","cover":"http://loremflickr.com/240/240/style?Kelly"}
```

### Response Result

Updated Room data

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Martena",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "Description La La",
    "status": 1,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "hhhooo",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
      }
    ]
  }
}
```
