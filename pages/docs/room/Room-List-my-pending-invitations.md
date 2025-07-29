# List pending invitations to current client.

### path

/rooms/invitations

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

```
## List My invitations
curl "http://localhost:3100/rooms/invitations" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'Authorization: {TOKEN}'

```

### Response Result

Invitations.

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "inviter": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
          "nickname": "AAA",
          "id": "aaa",
          "lastLoginTimeMS": 0
        },
        "room": {
          "_id": "demo-room",
          "name": "Demo",
          "cover": "http://loremflickr.com/240/240/style?demo",
          "description": "public demo room",
          "appID": "SampleApp",
          "roomType": "group",
          "webhook": "meet-taipei-intro",
          "botState": "CONTACT",
          "botMode": false,
          "encrypted": false,
          "serviceStatus": 0,
          "roomTags": [
            "demo",
            "foo",
            "bar"
          ],
          "status": 1,
          "memberProperties": [
            ...
          ],
          "members": [
            ...
          ],
          "id": "demo-room",
          "createdTimeMS": 1525001412492
        },
        "createdAt": "2020-03-01T08:24:57.477Z",
        "updatedAt": "2020-03-01T10:08:59.122Z"
      }
    ]
  }
}
```
