# List Room Messages V3

Messages ordered by updated date, instead of message ID.

### path

/rooms/:id/messages/v3

### Method

GET

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Room ID     |

### URL parameters

| Name          | Description                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------- |
| beforeMessage | (Optional) query Messages earlier than the specified Message ID                                   |
| afterMessage  | (Optional) query Messages later than the specified Message ID                                     |
| limit         | (Optional) Max number of Messages in response. Default 20.                                        |
| afterTime     | (Optional) query Messages sent after specified time. Format in ISO-8601 or Epoch in milliseconds. |
| timeRangeField     | (Optional) query Messages between beforeMessage and afterMessage regarding with specified time field, such as `updatedAt`, `createdAt`, `messageTime`. Default value `updatedAt`. |

```
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=10&afterTime=2020-10-15T03:50:04Z HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

### Response Result

| Name           | Description                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------- |
| totalCount     | Amount of messages in the room                                                                    |
| data           | Array of matched Messages                                                                         |
| userDeletedIDs | Array of message IDs that are deleted by the current user. These message should be hidden from UI |
| inspect        | Diagnosis info                                                                                    |

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 515,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "messageTime": {
          "$gt": "2020-10-15T03:50:04.000Z"
        }
      },
      "tookMS": 5
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Helloこんにちは SIKTMLNP 11:01:07",
        "room": "demo-room",
        "sender": {
          "_id": "sss",
          "nickname": "Elsa",
          "description": "description la la #1583637224106",
          "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
          "id": "sss",
          "lastLoginTimeMS": 1588744338369
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1602817267923,
        "updatedAtMS": 1602817267925,
        "createdAtMS": 1602817267925,
        "reactionCount": 0,
        "isDeleted": true
      }
    ],
    /*.Message IDs that were deleted by the current user in this list */
    "userDeletedIDs": [
      "5f890cf37d980e06f6aaf349"
    ]
  }
}
```
