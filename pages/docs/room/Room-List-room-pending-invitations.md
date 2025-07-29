# List pending invitations of a room.

### path

/rooms/:id/invitations

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Path Parameters

| Field | Description |
| ----- | ----------- |
| :id   | Room ID     |

```
## List Room Invitations
curl "http://localhost:3100/rooms/demo-room/invitations" \
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
        "invitee": {
          "_id": "ccc",
          "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
          "nickname": "CCC",
          "id": "ccc",
          "lastLoginTimeMS": 0
        },
        "inviter": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
          "nickname": "AAA",
          "id": "aaa",
          "lastLoginTimeMS": 0
        },
        "createdAt": "2020-03-01T08:24:57.477Z",
        "updatedAt": "2020-03-01T10:08:59.122Z"
      }
    ]
  }
}
```
