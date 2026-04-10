# 聊天室列表

## 概述

此端点允许您取得目前用户所加入的聊天室清单，支援分页、排序及条件筛选。适用于聊天室列表显示、增量同步等场景。

------

## API 端点

### 取得聊天室列表

取得目前用户已加入的聊天室清单，支援分页、排序及条件筛选。

```http
GET /rooms
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 用户端金钥 |
| `IM-CLIENT-ID` | string | ✅ | 当前用户的用户端 ID（此端点需要额外提供，用于计算未读数等用户相关资料） |
| `IM-Authorization` | string | ✅ | 用户端权杖 |

#### Query Parameters

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sort` | string | ❌ | 排序条件，可组合多个栏位，以空格分隔；前缀 `-` 表示递减排序 |
| `skip` | integer | ❌ | 分页偏移量，预设为 `0` |
| `limit` | integer | ❌ | 回传聊天室数量上限，预设为 `0`（不限制） |
| `updatedAfter` | string 或 integer | ❌ | 筛选在指定时间戳后有最新讯息或建立的聊天室，格式支援 ISO-8601 字串或毫秒 Epoch 整数 |
| `pref` | JSON | ❌ | 依用户的聊天室偏好设定筛选，例如 `{"tags": "some-tag"}` |
| `sortUnreadFirst` | integer | ❌ | 非零值时，优先排序有未读讯息的聊天室 |

**sort 参数范例**

依最新讯息和建立时间递减排序：

```
-lastMessage -createdTime
```

依建立时间递增排序：

```
createdTime
```

#### 范例请求

**范例一：取得聊天室列表（分页 + 时间筛选）**

cURL 范例：

```bash
curl "https://your-app.imkit.io/rooms?skip=0&limit=20&sort=-lastMessage&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-CLIENT-ID: {IM-CLIENT-ID}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

JavaScript 范例：

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      skip: 0,
      limit: 20,
      sort: "-lastMessage",
      updatedAfter: "2020-10-15T03:28:54Z",
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

**范例二：依标签筛选聊天室并优先显示未读**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      pref: JSON.stringify({ tags: "some-tag" }),
      sortUnreadFirst: 1,
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result.totalCount` | number | 符合条件的聊天室总数 |
| `result.data` | array | 聊天室物件阵列 |
| `result.inspect` | object | 诊断资讯（查询条件与耗时） |

**聊天室物件栏位**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `_id` | string | 聊天室唯一识别码 |
| `name` | string | 聊天室名称 |
| `cover` | string | 聊天室封面图片 URL |
| `description` | string | 聊天室描述 |
| `roomType` | string | 聊天室类型（`"direct"` 或 `"group"`） |
| `webhook` | string | Webhook 金钥或 URL |
| `botState` | string | 机器人状态 |
| `botMode` | boolean | 是否启用机器人模式 |
| `encrypted` | boolean | 是否加密 |
| `serviceStatus` | number | 服务状态 |
| `roomTags` | array[string] | 聊天室标签阵列 |
| `status` | number | 聊天室状态（`1` 表示正常） |
| `unread` | number | 目前用户的未读讯息数量 |
| `muted` | boolean | 目前用户是否静音此聊天室 |
| `lastMessage` | object | 最新一则讯息物件 |
| `members` | array[object] | 聊天室成员阵列 |
| `pref` | object | 目前用户对此聊天室的个人偏好设定 |
| `createdTimeMS` | number | 聊天室建立时间戳（毫秒） |

**偏好设定物件栏位（`pref`）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tags` | array[string] | 用户为此聊天室自订的标签 |
| `tagColors` | object | 各标签对应的颜色（十六进位色码） |
| `hidden` | boolean | 是否隐藏此聊天室 |
| `sticky` | boolean | 是否置顶此聊天室 |
| `muted` | boolean | 是否静音此聊天室的通知 |
| `folder` | string | 所属资料夹名称 |

#### 范例回应

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
          { "lastMessage": { "$gt": "5f87c2cf0000000000000000" } },
          { "createdTime": { "$gt": "2020-10-15T03:32:31.000Z" } }
        ],
        "status": 1
      },
      "tookMS": 22
    },
    "data": [
      {
        "_id": "demo-room",
        "name": "Demo Demo",
        "cover": "http://loremflickr.com/240/240/style?demo",
        "description": "public demo room",
        "roomType": "group",
        "webhook": "meet-taipei-intro",
        "botState": "CONTACT",
        "botMode": false,
        "encrypted": false,
        "serviceStatus": 0,
        "roomTags": ["demo", "foo", "bar"],
        "status": 1,
        "unread": 0,
        "muted": false,
        "lastMessage": {
          "_id": "5f890cf37d980e06f6aaf349",
          "message": "Hello SIKTMLNP 11:01:07",
          "room": "demo-room",
          "sender": {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
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
        "members": [
          {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "isRobot": false,
            "id": "sss",
            "lastLoginTimeMS": 1588744338369
          }
        ],
        "pref": {
          "tags": ["demo", "sample"],
          "tagColors": {
            "demo": "#f2d700",
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

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- 无效的用户端金钥或授权权杖
- `updatedAfter` 时间格式不正确
- `pref` 参数的 JSON 格式无效
- 伺服器内部错误

------

## 使用场景

### 聊天室列表显示
- **首页聊天室列表**：使用分页和排序取得使用者的聊天室清单
- **标签筛选**：透过 `pref` 参数依标签筛选特定聊天室

### 增量同步
- **高效同步**：使用 `updatedAfter` 搭配上次请求的时间戳，仅拉取有更新的聊天室

------

## 注意事项

- **增量同步**：使用 `updatedAfter` 搭配上次请求的时间戳，可实现高效的增量同步，避免每次拉取全量资料
- **分页建议**：建议搭配 `limit` 和 `skip` 进行分页，避免一次回传过多资料影响效能
- **排序**：`sort` 栏位以空格分隔多个条件，前缀 `-` 代表递减排序
- **`pref` 筛选**：`pref` 参数为 JSON 格式，需进行 URL 编码后传递
- **`inspect` 栏位**：仅供除错使用，包含实际查询条件与执行耗时，正式环境可忽略
