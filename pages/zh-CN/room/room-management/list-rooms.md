# 聊天室列表

# 获取聊天室列表

### 路径

/rooms

### 方法

GET

### URL 查询参数

| 字段           | 类型              | 说明                                                  |
| --------------- | ----------------- | ------------------------------------------------------------ |
| sort            | String            | （可选）排序条件                                  |
| skip            | Integer           | （可选）分页偏移量。默认为 0。                         |
| limit           | Integer           | （可选）响应中聊天室数量限制。默认为 0，不限制。 |
| updatedAfter    | String or Integer | （可选）约束具有最后消息或在指定时间戳之后创建的聊天室。应以 ISO-8601 或以毫秒为单位的 Epoch 格式化 |
| pref            | JSON              | 按用户的聊天室首选项过滤。例如 {"tags": "some-tag"}  |
| sortUnreadFirst | Interger          | （可选）非零时首先排序未读聊天室               |

#### 排序参数示例

按 lastMessage 和创建时间递减排序

```
-lastMessage -createdTime
```

按 createdTime 递增排序

```
createdTime
```

### 请求示例

```
## 获取聊天室列表
curl "http://localhost:3100/rooms?skip=0&limit=20&sort=createdTime&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-CLIENT-ID: sss' \
     -H 'IM-Authorization: {TOKEN}' \
     -H 'origin: https://imkitdemo.com' \
     -H 'X-Forwarded-For: 192.168.1.22'

```

### 响应结果

| 属性   | 说明            |
| ---------- | ---------------------- |
| totalCount | (int) 聊天室数量       |
| data       | (array) 聊天室数组 |
| inspect    | 诊断信息         |

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