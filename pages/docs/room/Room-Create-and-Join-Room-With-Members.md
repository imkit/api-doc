# Create and join room with members

Create room, and the current user (caller) auto joins the room with specified invitees.

Note that: if the caller is admin (platform-api-key), the admin user would also join the room.

### path

/rooms/createAndJoin

### Method

POST

### Headers:

| Field            | Description  |
| ---------------- | ------------ |
| IM-CLIENT-KEY    | Client Key   |
| IM-Authorization | Client Token |

### Post Body

| Field              | Type            | Description                                                                                                                                                                                                                                              |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_id               | String          | (Optional) Custom Room ID                                                                                                                                                                                                                                |
| name               | String          | (Optional) Room name                                                                                                                                                                                                                                     |
| cover              | String          | (Optional) Room cover image URL                                                                                                                                                                                                                          |
| roomType           | String          | (Optional) "direct" or "group"                                                                                                                                                                                                                           |
| description        | String          | (Optional) Text or serialized json data                                                                                                                                                                                                                  |
| roomTags           | Array[String]   | (Optional) shared room tags for search                                                                                                                                                                                                                   |
| webhook            | String          | (Optional) Webhook Key or URL                                                                                                                                                                                                                            |
| botMode            | Boolean         | (Optional) Is room robot enabled                                                                                                                                                                                                                         |
| invitee            | String or Array | (optional) String of Client ID or Array of Client IDS. Add member(s) to the created room                                                                                                                                                                 |
| systemMessage      | Bool            | (Optional) Should automatically create system message or not (add member message)                                                                                                                                                                        |
| invitationRequired | Boolean         | (Optional) Whether required invitation for invitee to decide to join or decline Only for **group** chat. <br/> For **direct** chat, invitationRequired would be `false` by system, invitee would be immediately added to direct chat without invitation. |
| extParams          | String          | (Optional) extended custom parameters, could be formatted as param1=value1&param2=value2 or a JSON string or custom encoded text                                                                                                                         |

```
## Create And Join Room
curl -X "POST" "http://localhost:3100/rooms/createAndJoin" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "_id": "demo-room",
  "invitationRequired": false,
  "room-type": "group",
  "systemMessage": true,
  "invitee": [
    "ccc",
    "bbb"
  ],
}'
```

Create a group chat room
```javascript
axios.post(
  "http://localhost:3100/rooms/createAndJoin",
  {
    _id: "demo-room",
    invitationRequired: true,
    systemMessage: true,
    invitee: ["ccc", "bbb"],
    roomType: "group",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

Create a 1-on-1 direct room
```javascript
axios.post(
  "http://localhost:3100/rooms/createAndJoin",
  {
    systemMessage: true,
    invitee: ["ccc"],
    roomType: "direct",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### Response Result

Created Room data

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "name": "Demo",
    "cover": "http://loremflickr.com/240/240/style?demo",
    "description": "public demo room",
    "lastMessage": {
      "_id": "5e5b89a77508ac31c0d91835",
      "room": "demo-room",
      "messageType": "deleteMember",
      "sender": {
        "_id": "aaa",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "nickname": "AAA",
        "id": "aaa",
        "lastLoginTimeMS": 0
      },
      "member": {
        "_id": "ccc",
        "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
        "nickname": "CCC",
        "id": "ccc",
        "lastLoginTimeMS": 0
      },
      "message": "CCC",
      "appID": "SampleApp",
      "id": "5e5b89a77508ac31c0d91835",
      "messageTimeMS": 1583057319965,
      "updatedAtMS": 1583057319967,
      "createdAtMS": 1583057319967
    },
    "roomType": "group",
    "webhook": "meet-taipei-intro",
    "botState": "CONTACT",
    "botMode": false,
    "encrypted": false,
    "serviceStatus": 0,
    "roomTags": ["demo", "foo", "bar"],
    "status": 1,
    "memberProperties": [
      {
        "badge": 181,
        "lastRead": "5b87e48e3f5be1360a37e7b4",
        "client": "STARBUCKS"
      },
      {
        "badge": 213,
        "lastRead": "5af6927707dbb43a32dfd29a",
        "client": "test-user"
      },
      {
        "badge": 223,
        "client": "12345"
      },
      {
        "badge": 208,
        "lastRead": "5b4f4af9638db622c7b60aa3",
        "client": "samsung-358436073080420"
      },
      {
        "badge": 24,
        "lastRead": "5e344ffc3a14440b637097f8",
        "client": "sss"
      },
      {
        "badge": 175,
        "lastRead": "5b8e9f31002bae3cd3ce022e",
        "client": "google-generic-x86"
      },
      {
        "badge": 175,
        "lastRead": "5b8e9f31002bae3cd3ce022e",
        "client": "bonbonbon"
      },
      {
        "badge": 172,
        "lastRead": "5b8fe660118d4d1f04c3b684",
        "client": "samsung-herolte"
      },
      {
        "badge": 223,
        "client": "bbb"
      },
      {
        "badge": 220,
        "client": "ccc"
      },
      {
        "lastRead": "5e5b89a77508ac31c0d91835",
        "badge": 0,
        "client": "aaa"
      },
      {
        "badge": 0,
        "lastRead": "5d58059914d165090e769360",
        "client": "1485248560558"
      },
      {
        "badge": 223,
        "client": "bossiniTW"
      },
      {
        "badge": 0,
        "lastRead": "5dcadf48951bee23caaf0dd6",
        "client": "pinchat_agent_269"
      },
      {
        "badge": 0,
        "lastRead": "5dcac4d2613d3508cda438c8",
        "client": "BOT"
      },
      {
        "badge": 223,
        "client": "robot001"
      }
    ],
    "members": [
      {
        "_id": "STARBUCKS",
        "nickname": "Madeline",
        "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
        "description": "Store Description lal alll",
        "isRobot": false,
        "id": "STARBUCKS",
        "lastLoginTimeMS": 1583057339129
      },
      {
        "_id": "test-user",
        "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
        "nickname": "Maisie",
        "isRobot": false,
        "id": "test-user",
        "lastLoginTimeMS": 1583057339130
      },
      {
        "_id": "12345",
        "isRobot": false,
        "id": "12345",
        "lastLoginTimeMS": 1583057339129
      },
      {
        "_id": "samsung-358436073080420",
        "description": "description la la #1531924629059",
        "nickname": "samsung-herolte",
        "avatarUrl": "",
        "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.0.0; SM-G930F Build/R16NW)",
        "isRobot": false,
        "id": "samsung-358436073080420",
        "lastLoginTimeMS": 1531924629461
      },
      {
        "_id": "google-generic-x86",
        "nickname": "google-generic_x86",
        "description": "description la la #1536074034718",
        "avatarUrl": "",
        "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.007)",
        "isRobot": false,
        "id": "google-generic-x86",
        "lastLoginTimeMS": 1536074046906
      },
      {
        "_id": "bonbonbon",
        "nickname": "bonbonbon",
        "description": "description la la #1536073706411",
        "avatarUrl": "",
        "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.007)",
        "isRobot": false,
        "id": "bonbonbon",
        "lastLoginTimeMS": 1536073718631
      },
      {
        "_id": "samsung-herolte",
        "nickname": "samsung-herolte",
        "description": "description la la #1536157340251",
        "avatarUrl": "",
        "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.0.0; SM-G930F Build/R16NW)",
        "isRobot": false,
        "id": "samsung-herolte",
        "lastLoginTimeMS": 1536157340491
      },
      {
        "_id": "bbb",
        "description": "description la la #1541824599613",
        "avatarUrl": "",
        "nickname": "bbb",
        "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.007)",
        "isRobot": false,
        "id": "bbb",
        "lastLoginTimeMS": 1541824600261
      },
      {
        "_id": "sss",
        "nickname": "SSS",
        "description": "some description",
        "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
        "userAgent": "imkit-ios-sdk-v3-demo/1 CFNetwork/1121.2.1 Darwin/19.3.0",
        "isRobot": false,
        "id": "sss",
        "lastLoginTimeMS": 1580526441451
      },
      {
        "_id": "robot001",
        "nickname": "Quinn Robot",
        "isRobot": true,
        "id": "robot001",
        "lastLoginTimeMS": 1583057339130
      },
      {
        "_id": "aaa",
        "description": "description la la #1541926309694",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "nickname": "AAA",
        "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.007)",
        "isRobot": false,
        "id": "aaa",
        "lastLoginTimeMS": 1541926310026
      }
    ],
    "id": "demo-room",
    "createdTimeMS": 1525001412492
  }
}
```
