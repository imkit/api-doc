# Create Room

## Overview

Create a room and the current user (caller) auto joins the room with specified invitees. This API is for server-side use only and requires proper authentication.

Note: If the caller is admin (platform-api-key), the admin user would also join the room.

------

## API Endpoint

### Create and Join Room

Create a new room, with the caller automatically joining and optionally inviting specified members.

```http
POST /rooms/createAndJoin
```

#### Headers

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### Post Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `_id` | string | ❌ | Custom Room ID |
| `name` | string | ❌ | Room name |
| `cover` | string | ❌ | Room cover image URL |
| `roomType` | string | ❌ | "direct" or "group" |
| `description` | string | ❌ | Text or serialized json data |
| `roomTags` | array[string] | ❌ | Shared room tags for search |
| `webhook` | string | ❌ | Webhook Key or URL |
| `botMode` | boolean | ❌ | Is room robot enabled |
| `invitee` | string or array | ❌ | String of Client ID or Array of Client IDs. Add member(s) to the created room |
| `systemMessage` | boolean | ❌ | Should automatically create system message or not (add member message) |
| `invitationRequired` | boolean | ❌ | Whether required invitation for invitee to decide to join or decline. Only for **group** chat. For **direct** chat, invitationRequired would be `false` by system, invitee would be immediately added to direct chat without invitation. |
| `extParams` | string | ❌ | Extended custom parameters, could be formatted as param1=value1&param2=value2 or a JSON string or custom encoded text |

#### Example Request

**Create a group chat room (with invitation required)**

cURL:

```bash
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

JavaScript - Create a group chat room:

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

JavaScript - Create a 1-on-1 direct room:

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

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| --- | --- | --- |
| `RC` | number | Response code (0 means success) |
| `RM` | string | Response message |
| `result` | object | Created room data |

**Room Object Fields**

| Parameter | Type | Description |
| --- | --- | --- |
| `_id` | string | Unique room ID |
| `name` | string | Room name |
| `cover` | string | Room cover image URL |
| `description` | string | Room description |
| `roomType` | string | Room type ("direct" or "group") |
| `webhook` | string | Webhook key or URL |
| `botState` | string | Bot state |
| `botMode` | boolean | Whether bot mode is enabled |
| `encrypted` | boolean | Whether the room is encrypted |
| `serviceStatus` | number | Service status |
| `roomTags` | array[string] | Room tag array |
| `status` | number | Room status |
| `lastMessage` | object | Last message object |
| `memberProperties` | array[object] | Member properties array |
| `members` | array[object] | Member objects array |
| `createdTimeMS` | number | Creation timestamp (milliseconds) |

#### Example Response

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

#### Error Response

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- Invalid room type
- Specified invitee does not exist
- Internal server error

------

## Use Cases

### Group Chat
- **Group with invitation required**: Set `invitationRequired` to `true`, invitees must accept the invitation before joining
- **Group with immediate join**: Set `invitationRequired` to `false`, invitees are immediately added

### Direct Chat
- **Create 1-on-1 direct room**: Set `roomType` to `"direct"`, system automatically sets `invitationRequired` to `false`, invitee is immediately added

------

## Notes

- This endpoint creates a new room and adds the caller and specified invitees
- If room ID (`_id`) is not specified, the system will auto-generate a unique identifier
- For **group rooms** (`roomType: "group"`), set `invitationRequired` to `true` to require invitees to accept
- For **direct rooms** (`roomType: "direct"`), `invitationRequired` is automatically set to `false` by the system
- The caller (current user) automatically becomes a room member
- If using admin key (platform-api-key), the admin user also automatically joins the room
- All timestamps are in UTC format, in milliseconds
- Cover image file size should be kept within reasonable limits
- `roomTags` can be used for room search functionality
