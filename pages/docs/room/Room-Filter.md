# Filter Rooms

### path

/rooms

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### URL Query Params

| Field | Description                                |
| ----- | ------------------------------------------ |
| q     | Mongo query syntax to query Rooms          |
| pref  | Mongo query syntax to filter by RoomPrefs  |
| skip  | Paging offset                              |
| limit | Limit of rooms in response                 |
| sort  | (optional) Sort by specified room property |

### Room schema reference for filter

```
{
    _id: { type: String },
    // Owner of this room. The owner has the privilege to block and unblock members
    owner: { type: String, ref: 'Client' },
    name: String,
    cover: String,
    lastMessage: { type: ObjectId, ref: 'Message', index: true },
    isPublic: Boolean,
    members: [{ type: String, ref: 'Client', index: true }],
    description: String,
    createdTime: { type: Date, default: Date.now, required: true, index: true },
    status: {
        type: Number,
        // 0 = invalid, 1 = valid
        default: 1,
        index: true,
    },
    roomType: {
        type: String,
        enum: ['direct', 'group', 'custom'],
    },
    opening: { // Allow to join or invite
        type: Number,
        // 0 = closed, 1 = allow to join or invite
        default: 1,
    },
    roomTags: [{ type: String }], // Room tags, custom indexed for search
    serviceStatus: { type: Number, default: 0 },
    refRoom: { type: ObjectId, ref: 'Room' },
    assignTo: { type: String, ref: 'Client' },  // Tracking which customer support handling the room
    botMode: { type: Boolean, default: false },
    botState: { type: String, default: '' }, // Current customzied BOT State
    webhook: { type: String }, // webhook key or url
    extParams: { type: String }, // Custom extended parameters, could be formatted as param1=value1&param2=value2
}
```

### Example - Filter By Name

```json
q={"name": {"$regex": ".*el.*"}}
```

```
GET /rooms?q=%7B%22name%22:%20%7B%22$regex%22:%20%22.*el.*%22%7D%7D&skip=10&limit=50 HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

### Example - Filter By Room Tags

#### Has a room tag

```json
q={"roomTags":"foo"}
```

#### Has any of the room tags

```json
{ "roomTags": { "$in": ["foo", "bar"] } }
```

#### Has all of the room tags

```json
{ "roomTags": { "$all": ["foo", "bar"] } }
```

#### Query by roomTags and filter by roomPrefs.

```json
q={"roomTags":{"$in": ["foo", "bar"]}}
prefs={"tags":{"$in":["demo"]}}
```

```
## Filter Rooms
curl "http://localhost:3100/rooms?q=%7B%22roomTags%22:%7B%22$in%22:%20%5B%22foo%22,%20%22bar%22%5D%7D%7D&pref=%7B%22tags%22:%7B%22$in%22:%5B%22demo%22%5D%7D%7D" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'Authorization: {TOKEN}'
```

### Reponse Result

| Property   | Description                    |
| ---------- | ------------------------------ |
| totalCount | (int) matched count            |
| data       | (array) Array of matched Rooms |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "_id": "demo-room",
        "name": "Demo",
        "cover": "http://loremflickr.com/240/240/style?demo",
        "description": "public demo room",
        "lastMessage": {
          "_id": "5e3d56fe94997f145726e509",
          "message": "Helloこんにちは dBgVbwpy 20:24:30",
          "room": "demo-room",
          "sender": {
            "_id": "aaa",
            "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
            "nickname": "AAA",
            "id": "aaa",
            "lastLoginTimeMS": 0
          },
          "messageType": "text",
          "appID": "SampleApp",
          "id": "5e3d56fe94997f145726e509",
          "messageTimeMS": 1581078270570,
          "updatedAtMS": 1581078270571,
          "createdAtMS": 1581078270571
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
            "badge": 171,
            "lastRead": "5b87e48e3f5be1360a37e7b4",
            "client": "STARBUCKS"
          },
          {
            "badge": 203,
            "lastRead": "5af6927707dbb43a32dfd29a",
            "client": "test-user"
          },
          {
            "badge": 213,
            "client": "12345"
          },
          {
            "badge": 198,
            "lastRead": "5b4f4af9638db622c7b60aa3",
            "client": "samsung-358436073080420"
          },
          {
            "badge": 14,
            "lastRead": "5e344ffc3a14440b637097f8",
            "client": "sss"
          },
          {
            "badge": 165,
            "lastRead": "5b8e9f31002bae3cd3ce022e",
            "client": "google-generic-x86"
          },
          {
            "badge": 165,
            "lastRead": "5b8e9f31002bae3cd3ce022e",
            "client": "bonbonbon"
          },
          {
            "badge": 162,
            "lastRead": "5b8fe660118d4d1f04c3b684",
            "client": "samsung-herolte"
          },
          {
            "badge": 213,
            "client": "bbb"
          },
          {
            "badge": 213,
            "client": "ccc"
          },
          {
            "lastRead": "5e3d56fe94997f145726e509",
            "badge": 0,
            "client": "aaa"
          },
          {
            "badge": 0,
            "lastRead": "5d58059914d165090e769360",
            "client": "1485248560558"
          },
          {
            "badge": 213,
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
            "lastLoginTimeMS": 1581389115460
          },
          {
            "_id": "test-user",
            "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
            "nickname": "Maisie",
            "isRobot": false,
            "id": "test-user",
            "lastLoginTimeMS": 1581389115461
          },
          {
            "_id": "12345",
            "isRobot": false,
            "id": "12345",
            "lastLoginTimeMS": 1581389115460
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
            "_id": "aaa",
            "description": "description la la #1541926309694",
            "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
            "nickname": "AAA",
            "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.007)",
            "isRobot": false,
            "id": "aaa",
            "lastLoginTimeMS": 1541926310026
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
            "_id": "ccc",
            "description": "Store Description lal alll",
            "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
            "nickname": "Lara",
            "isRobot": false,
            "id": "ccc",
            "lastLoginTimeMS": 1581389115460
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
          }
        ],
        "unread": 0,
        "muted": false,
        "pref": {
          "tags": ["demo", "sample"]
        },
        "id": "demo-room",
        "createdTimeMS": 1525001412492
      }
    ]
  }
}
```
