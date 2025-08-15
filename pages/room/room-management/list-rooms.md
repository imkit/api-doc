# 聊天室列表

# List Rooms

### path

/rooms

### Method

GET

### URL Query Parameters

| Field           | type              | Description                                                  |
| --------------- | ----------------- | ------------------------------------------------------------ |
| sort            | String            | (Optional) Sorting criteria                                  |
| skip            | Integer           | (Optional) Paging offset. Default 0.                         |
| limit           | Integer           | (Optional) Limit of rooms in response. Default 0, unlimited. |
| updatedAfter    | String or Integer | (Optional) Constraint rooms that have last message or crated after the specified timestamp. Should be formatted in ISO-8601 or Epoch in milliseconds |
| pref            | JSON              | Filter by user's room preferences. e.g {"tags": "some-tag"}  |
| sortUnreadFirst | Interger          | (optional) non-zero to sort unread rooms first               |

#### Sort Parameter Example

Sort by lastMessage and created time in descending order

```
-lastMessage -createdTime
```

Sort by createdTime in ascending order

```
createdTime
```

### Request Sample

```
## List Rooms
curl "http://localhost:3100/rooms?skip=0&limit=20&sort=createdTime&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-CLIENT-ID: sss' \
     -H 'IM-Authorization: {TOKEN}' \
     -H 'origin: https://imkitdemo.com' \
     -H 'X-Forwarded-For: 192.168.1.22'

```

### Response Result

| Property   | Description            |
| ---------- | ---------------------- |
| totalCount | (int) room count       |
| data       | (array) Array of Rooms |
| inspect    | Diagnosis info         |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "members": "sss",
        "$or": [
          {
            "lastMessage": {
              "$gt": "5f87c2cf0000000000000000"
            }
          },
          {
            "createdTime": {
              "$gt": "2020-10-15T03:32:31.000Z"
            }
          }
        ],
        "status": 1
      },
      "tookMS": 22
    },
    "data": [
      {
        "members": [
          {
            "isRobot": false,
            "_id": "bonbonbon",
            "nickname": "bonbonbon",
            "description": "description la la #1536073706411",
            "avatarUrl": "",
            "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.007)",
            "id": "bonbonbon",
            "lastLoginTimeMS": 1536073718631
          },
          {
            "isRobot": false,
            "_id": "sss",
            "nickname": "Elsa",
            "description": "description la la #1583637224106",
            "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
            "id": "sss",
            "lastLoginTimeMS": 1588744338369
          },
          {
            "isRobot": false,
            "_id": "aaa",
            "description": "description la la #1541926309694",
            "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
            "nickname": "AAA",
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
            "id": "aaa",
            "lastLoginTimeMS": 1583726632592
          }
        ],
        "status": 1,
        "roomTags": [
          "demo",
          "foo",
          "bar"
        ],
        "serviceStatus": 0,
        "encrypted": false,
        "botMode": false,
        "botState": "CONTACT",
        "_id": "demo-room",
        "name": "Demo Demo",
        "cover": "http://loremflickr.com/240/240/style?demo",
        "description": "public demo room",
        "lastMessage": {
          "reactions": [],
          "_id": "5f890cf37d980e06f6aaf349",
          "message": "Helloこんにちは SIKTMLNP 11:01:07",
          "room": "demo-room",
          "sender": {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
            "id": "sss",
            "lastLoginTimeMS": 0
          },
          "messageType": "text",
          "appID": "SampleApp",
          "messageTime": "2020-10-16T03:01:07.923Z",
          "id": "5f890cf37d980e06f6aaf349",
          "messageTimeMS": 1602817267923,
          "updatedAtMS": 1602817267925,
          "createdAtMS": 1602817267925,
          "reactionCount": 0
        },
        "roomType": "group",
        "webhook": "meet-taipei-intro",
        "unread": 0,
        "muted": false,
        "pref": {
          "tags": [
            "demo",
            "sample"
          ],
          "tagColors": {
            "demo": "#f2d700"
            "sample": "#ffa01a"
          },
          "hidden": false,
          "sticky": false,
          "muted": false,
          "folder": "Some-Folder"
        },
        "id": "demo-room",
        "createdTimeMS": 1525001412492
      }
    ]
  }
}
```
