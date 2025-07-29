## Web API Response And Socket ACK Format
| Field  | Definition    |  Description | 
| ------ | ------------- | ------------ |
| RC     | Response Code | 0=OK<br/>401=Authorization Error<br/>400=Request Error |
| RM     | Error Message |              |
| result | Result Data   |              |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    ...
  }
}
```


## Room
| Property      | Type    | Description      |
| ------------- | ------- | ---------------- |
| _id           | String  | (auto) Room ID   |
| owner         | Client  | (optional) owner of the group chat room. Only the owner has privilege to block/unblock members |
| managers      | Array   | (optional) Array of Client IDs. Managers of the group chat room. |
| name          | String  | (optional) Room Name |
| cover         | String  | (optional) Room cover image URL |
| roomType      | String  | (Optional) "direct" or "group" |
| description   | String  | Custom room data |
| latestMessage | Message | Latest message   |
| members       | Array   | Array of Client  |
| memberProperties | Array   | Member properties, such as last read, badge |
| unread        | Integer | Unread message count |
| isMentioned   | Boolean | Is the request client has unread message which mentions the client |
| createdTime   | ISO Date | Room creation time   |
| createdTimeMS | Number   | Room creation time in milliseconds since Unix Epoch |
| muted         | Boolean  | Room is muted in this user's preference |
| pref          | Mix      | User's room preference. See [link](%5BRoomPref%5D-Create-or-Update) |
| encrypted     | Boolean  | Is room messages should be encrypted |
| botMode       | Boolean  | Is room robot and webhook enabled |
| botState      | String   | Custom room bot state name |
| roomTags      | Array    | Array of shared room tags |
| webhook       | String   | Webhook Key or URL |
| isSuperuser   | Boolean  | Is the request client a superuser (admin, owner, manager) of the room |
| extParams     | String   | Optional extended custom parameters, could be formatted as param1=value1&param2=value2 or a JSON string or custom encoded text |
| opening       | Number   | 0 => Closed for joining or inviting, 1 => Open for joining and inviting |
| didBlockAt    | ISO Date | (optional) Only for direct chat room. Timestamp that the current client blocks the peer |
| didBlockAtMS  | Number   | Timestamp in milliseconds since Unix Epoch, that the current client blocks the peer |
| wasBlockedAt  | ISO Date | (optional) Timestamp that the current client is blocked by the owner or the peer |
| wasBlockedAtMS | Number   | Timestamp in milliseconds since Unix Epoch, that the current client is blocked by the owner or the peer |

```json
{
  "_id": "58871b877390be11d5f1ab30",
  "description": "Sample Description",
  "appID": "SampleApp",
  "name": "Leigh",
  "cover": "http://loremflickr.com/240/240/style?Melyssa",
  "roomType": "group",
  "owner": {
    "_id": "1485248566481",
    "nickname": "Test2",
    "lastLoginTimeMS": 1488438700398
  },
  "managers": ["1485248566481"],
  "lastMessage": {
    "_id": "58b7b7c4c246bc0b41afb148",
    "message": 1111234,
    "messageType": "text",
    "sender": {
      "_id": "1485248566481",
      "nickname": "Test2",
      "lastLoginTimeMS": 0,
      "id": "1485248566481"
    },
    "messageTimeMS": 1488435140775
  },
  "memberProperties": [
    {
      "role": "admin",
      "badge": 1,
      "lastRead": "58b7b79b0acc250b377357ab",
      "client": "1485248560558"
    },
    {
      "badge": 0,
      "lastRead": "58b7b7c4c246bc0b41afb148",
      "client": "1485248566481"
    },
    {
      "badge": 61,
      "client": "1485250743313"
    }
  ],
  "members": [
    {
      "_id": "1485248560558",
      "nickname": "Test AB",
      "avatarUrl": "http://example.com/avatarUrl",
      "lastLoginTimeMS": 1487149355934
    },
    {
      "_id": "1485248566481",
      "nickname": "Test2",
      "lastLoginTimeMS": 1488438700398
    },
    {
      "_id": "1485250743313",
      "nickname": "Test 3",
      "lastLoginTimeMS": 1488440942870
    }
  ],
  "unread": 1,
  "id": "58871b877390be11d5f1ab30",
  "createdTimeMS": 1502859357281,
  "muted": true,
  "pref": {
    "tags": [
      "demo",
      "sample"
    ]
  },
  "roomTags": [
    "demo",
    "LINE",
    "Whatsapp"
  ],
  "encrypted": false,
  "didBlockAt": null,
  "wasBlockedAt": "2021-08-04T15:18:10.735Z",
}
```

## Message
| Property      | Type     | Description         |
| ------------- | -------- | ------------------- |
| _id           | String   | (auto) Message ID   |
| room          | String   | Room ID             |
| message       | String   | Text message content |
| sender        | Client   | Sender              |
| messageType   | String   | Custom message type |
| messageTime   | ISO Date | Message sent time   |
| messageTimeMS | Number   | Message sent time in milliseconds since Unix Epoch |
| createdAt     | ISO Date | Message created time   |
| updatedAt     | ISO Date | Message updated time   |
| updatedAtMS   | Number   | Message updated time in milliseconds since Unix Epoch  |
| originalUrl   | String   | (optional) Media URL |
| thumbnailUrl  | String   | (optional) Thumbnail URL |
| width         | Number   | (optional) Image or video width |
| height        | Number   | (optional) Image or video height |
| images        | Array    | (optional) Plural images [{originalUrl, thumbnailUrl, width, height}] |
| duration      | Number   | (optional) Video or audio length, in seconds |
| latitude      | Number   | (optional) Location latitude |
| longitude     | Number   | (optional) Location longitude |
| reply         | Message  | (optional) A Message that this message replies to |
| member        | Client   | Used when added or deleted member |
| sticker       | String   | (optional) Sticker ID |
| reactions     | Array    | (optional) Message reactions |
| reactionCount | Number   | Reaction count |
| isPined       | Boolean  | (Optional) Whether a message is pined at top |
| isHidden      | Boolean  | (Optional) Whether a message should be hidden in a room |
| extra         | JSON Object   | (Optional) Extra content for custom message type |
| template      | JSON Object   | (Optional) Template object, compatible to Line template. https://developers.line.biz/en/reference/messaging-api/#template-messages |
| contents      | JSON Object   | (Optional) Contents object, compatible to Line template. https://developers.line.biz/en/reference/messaging-api/#template-messages |


```json
{
  "_id": "58a2dc9c965d09221ea7bedb",
  "message": "sadf dsfdf",
  "messageType": "text",
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTimeMS": 1487068306745
  },
  "reply": {
    "_id": "589d8fe5dc637422e577be51",
    "message": "af dsgag fdsf",
    "messageType": "text",
    "sender": {
      "_id": "1485248566481",
      "nickname": "Test2",
      "lastLoginTimeMS": 0
    },
    "messageTimeMS": 1486720997724
  },
   "reactions": [
   {
     "client": "sss",
     "reaction": "like"
   }
  ],
  "reactionCount": 1,
  "messageTimeMS": 1487068316006
},
```

## Client
| Property        | Type     | Description         |
| --------------- | -------- | ------------------- |
| _id             | String   | Custom Client ID    |
| nickname        | String   | Client nickname     |
| avatarUrl       | String   | Client avatar URL   |
| address         | Mixed    | Last auth remote address |
| userAgent       | String   | Last auth user agent |
| mute            | Array    | IDs of muted rooms   |
| notificationEnabled | Boolean | Whether notification is enabled |
| lastLoginTime   | ISO Date | Last log-in time     |
| lastLoginTimeMS | Number   | Last log-in time in milliseconds since Unix Epoch   |
| lastActiveTime  | ISO Date | Last active time     |
| lastActiveTimeMS | Number  | Lst active time in milliseconds since Unix Epoch |
| publicKey       | String   | Base64 encoded RSA Public Key used to encrypt message sending to the client. Base64 Encoding format = NO_WRAP (不換行)|

```json
{
  "_id": "1485248560558",
  "email": "test@test.com",
  "nickname": "Test AB",
  "appID": "SampleApp",
  "chatinAt": "2017-01-24T09:02:40.557Z",
  "__v": 0,
  "avatarUrl": "http://example.com/avatarUrl",
  "address": {
    "port": 56216,
    "family": "IPv6",
    "address": "::1"
  },
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
  "mute": [
    "58871b877390be11d5f1ab30"
  ],
  "lastLoginTimeMS": 1487068306745,
  "publicKey": "..."
}
```

## File
| Property        | Type     | Description         |
| --------------- | -------- | ------------------- |
| _id             | String   | File ID             |
| length          | Number   | File size           |
| chunkSize       | Number   | Mongo GridFS chunk size |
| uploadDate      | Date     | File upload date    |
| uploadDateMS    | Number   | File upload date in milliseconds since unix epoch |
| md5             | String   | File hash checksum  |
| filename        | String   | Filename            |
| mimetype        | String   | File MIME Type      |
| client          | String   | File creator ID     |
| bucketName      | String   | Bucket contains the file |
| extra           | Mixed    | Custom properties |

```json
{
    "_id": "589d45d889833113ffa5f24f",
    "length": 39435,
    "chunkSize": 261120,
    "uploadDate": "2017-02-10T04:47:20.662Z",
    "md5": "d01c6e3e56230571fb84bdc8c8472add",
    "filename": "pitaya-1.jpg",
    "extra": {"anyProperty": "something", "roomId: "58871b877390be11d5f1ab30"},
    "appID": "SampleApp",
    "mimetype": "image/jpeg",
    "client": "1485248560558",
    "bucketName": "sampleBucket",
    "uploadDateMS": 1486702040662
}
```

## Sticker
| Property        | Type     | Description         |
| --------------- | -------- | ------------------- |
| _id             | String   | Sticker ID          |
| url             | String   | Sticker image url   |
| group           | String   | Sticker group       |

```json
{
    "_id": "sticker_9",
    "__v": 0,
    "url": "http://stickers.imkit.io/aed1d6c3-ce3a-42b4-8f32-7fb9bd04d074/sticker_9.png",
    "group": "01_bunny",
    "id": "sticker_9",
    "updatedAtMS": 1550130213240,
    "createdAtMS": 1548733715686
}
```
## Invitation
| Property        | Type     | Description         |
| --------------- | -------- | ------------------- |
| inviter         | Client   | Inviter Client Info   |
| invitee         | Client   | Invitee Client Info   |
| room            | Room     | Room Data       |

```json
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

```

## RTC Session
| Property      | Type     | Description         |
| ------------- | -------- | ------------------- |
| _id           | String   | (auto) Session ID   |
| room          | String   | Room ID             |
| message       | String   | Text message content |
| initiator     | Client   | Session initiator (Caller)              |
| memberStatus  | mixed    | Session member status { clientId: { status, updatedAt }}, status = ['disconnected', 'connected'] |
| startedAt    | Date     | session started at |
| endAt    | Date     | session ended at |
