# 添加成员

# 向聊天室添加多个成员

### 路径

/rooms/:id/members

### 方法

Post

### 请求头：

| 字段            | 说明  |
| ---------------- | ------------ |
| IM-CLIENT-KEY    | 客户端密钥   |
| IM-Authorization | 客户端令牌 |

### 路径参数

| 参数名 | 说明 |
| ---- | ----------- |
| :id  | 聊天室ID     |

### JSON 请求体

| 参数名               | 类型    | 说明                                                  |
| ------------------ | ------- | ------------------------------------------------------------ |
| invitees           | Array   | 客户端ID列表                                                   |
| systemMessage      | Boolean | （可选）默认为 false。创建添加成员的系统消息。 |
| invitationRequired | Boolean | （可选）默认为 false。被邀请者是否需要邀请来决定加入或拒绝。仅限于**群聊**。 |

此 API 将创建一个 addMembers 系统消息

https://github.com/FUNTEKco/imkit-chatserver-v2/wiki/%5BMessage%5D-Format#add-member

```
## 添加成员
curl -X "POST" "http://localhost:3100/rooms/{roomID}/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "invitees": [
    "ccc",
    "bbb"
  ],
  "invitationRequired": true,
  "systemMessage": false
}'
```

```javascript
axios.post(
  `http://localhost:3100/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
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

### 响应结果

更新后的聊天室数据。

````json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "name": "Demo",
    "cover": "http://loremflickr.com/240/240/style?demo",
    "description": "public demo room",
    "lastMessage": {
      "_id": "5e5b88e91da9d53097b13840",
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
      "id": "5e5b88e91da9d53097b13840",
      "messageTimeMS": 1583057129059,
      "updatedAtMS": 1583057129059,
      "createdAtMS": 1583057129059
    },
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
      {
        "badge": 180,
        "lastRead": "5b87e48e3f5be1360a37e7b4",
        "client": "STARBUCKS"
      },
      {
        "badge": 212,
        "lastRead": "5af6927707dbb43a32dfd29a",
        "client": "test-user"
      },
      {
        "badge": 222,
        "client": "12345"
      },
      {
        "badge": 207,
        "lastRead": "5b4f4af9638db622c7b60aa3",
        "client": "samsung-358436073080420"
      },
      {
        "badge": 23,
        "lastRead": "5e344ffc3a14440b637097f8",
        "client": "sss"
      },
      {
        "badge": 174,
        "lastRead": "5b8e9f31002bae3cd3ce022e",
        "client": "google-generic-x86"
      },
      {
        "badge": 174,
        "lastRead": "5b8e9f31002bae3cd3ce022e",
        "client": "bonbonbon"
      },
      {
        "badge": 171,
        "lastRead": "5b8fe660118d4d1f04c3b684",
        "client": "samsung-herolte"
      },
      {
        "badge": 222,
        "client": "bbb"
      },
      {
        "badge": 220,
        "client": "ccc"
      },
      {
        "lastRead": "5e5b88e91da9d53097b13840",
        "badge": 0,
        "client": "aaa"
      },
      {
        "badge": 0,
        "lastRead": "5d58059914d165090e769360",
        "client": "1485248560558"
      },
      {
        "badge": 222,
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
        "badge": 222,
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
        "lastLoginTimeMS": 1583057133276
      },
      {
        "_id": "test-user",
        "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
        "nickname": "Maisie",
        "isRobot": false,
        "id": "test-user",
        "lastLoginTimeMS": 1583057133276
      },
      {
        "_id": "12345",
        "isRobot": false,
        "id": "12345",
        "lastLoginTimeMS": 1583057133276
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
        "lastLoginTimeMS": 1583057133276
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
}```
````