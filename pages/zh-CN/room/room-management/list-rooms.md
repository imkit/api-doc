# 聊天室列表

## 概述

此端点允许您获取当前用户已加入的聊天室列表，支持分页、排序及条件筛选。适用于聊天室列表展示、增量同步等场景。

------

## API 端点

### 获取聊天室列表

获取当前用户已加入的聊天室列表，支持分页、排序及条件筛选。

```http
GET /rooms
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 客户端密钥 |
| `IM-CLIENT-ID` | string | ✅ | 当前用户的客户端 ID |
| `IM-Authorization` | string | ✅ | 客户端令牌 |

#### Query Parameters

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sort` | string | ❌ | 排序条件，可组合多个字段，以空格分隔；前缀 `-` 表示降序排列 |
| `skip` | integer | ❌ | 分页偏移量，默认为 `0` |
| `limit` | integer | ❌ | 返回聊天室数量上限，默认为 `0`（不限制） |
| `updatedAfter` | string 或 integer | ❌ | 筛选在指定时间戳后有最新消息或创建的聊天室，格式支持 ISO-8601 字符串或毫秒 Epoch 整数 |
| `pref` | JSON | ❌ | 按用户的聊天室偏好设置筛选，例如 `{"tags": "some-tag"}` |
| `sortUnreadFirst` | integer | ❌ | 非零值时，优先排列有未读消息的聊天室 |

**sort 参数示例**

按最新消息和创建时间降序排列：

```
-lastMessage -createdTime
```

按创建时间升序排列：

```
createdTime
```

#### 示例请求

**示例一：获取聊天室列表（分页 + 时间筛选）**

cURL 示例：

```bash
curl "http://localhost:3100/rooms?skip=0&limit=20&sort=-lastMessage&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-CLIENT-ID: {您的_CLIENT_ID}' \
     -H 'IM-Authorization: {您的_TOKEN}'
```

JavaScript 示例：

```javascript
const response = await axios.get(
  "http://localhost:3100/rooms",
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

**示例二：按标签筛选并优先显示未读聊天室**

```javascript
const response = await axios.get(
  "http://localhost:3100/rooms",
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

**成功响应（200 OK）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `RC` | number | 响应码（0 表示成功） |
| `RM` | string | 响应消息 |
| `result.totalCount` | number | 符合条件的聊天室总数 |
| `result.data` | array | 聊天室对象数组 |
| `result.inspect` | object | 诊断信息（查询条件与耗时） |

**聊天室对象字段**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `_id` | string | 聊天室唯一标识符 |
| `name` | string | 聊天室名称 |
| `cover` | string | 聊天室封面图片 URL |
| `description` | string | 聊天室描述 |
| `roomType` | string | 聊天室类型（`"direct"` 或 `"group"`） |
| `webhook` | string | Webhook 密钥或 URL |
| `botState` | string | 机器人状态 |
| `botMode` | boolean | 是否启用机器人模式 |
| `encrypted` | boolean | 是否加密 |
| `serviceStatus` | number | 服务状态 |
| `roomTags` | array[string] | 聊天室标签数组 |
| `status` | number | 聊天室状态（`1` 表示正常） |
| `unread` | number | 当前用户的未读消息数量 |
| `muted` | boolean | 当前用户是否已静音此聊天室 |
| `lastMessage` | object | 最新一条消息对象 |
| `members` | array[object] | 聊天室成员数组 |
| `pref` | object | 当前用户对此聊天室的个人偏好设置 |
| `createdTimeMS` | number | 聊天室创建时间戳（毫秒） |

**偏好设置对象字段（`pref`）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `tags` | array[string] | 用户为此聊天室自定义的标签 |
| `tagColors` | object | 各标签对应的颜色（十六进制色码） |
| `hidden` | boolean | 是否隐藏此聊天室 |
| `sticky` | boolean | 是否置顶此聊天室 |
| `muted` | boolean | 是否静音此聊天室的通知 |
| `folder` | string | 所属文件夹名称 |

#### 示例响应

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

#### 错误响应

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- `updatedAfter` 时间格式不正确
- `pref` 参数的 JSON 格式无效
- 服务器内部错误

------

## 使用场景

### 聊天室列表展示
- **首页聊天室列表**：使用分页和排序获取用户的聊天室列表
- **标签筛选**：通过 `pref` 参数按标签筛选特定聊天室

### 增量同步
- **高效同步**：使用 `updatedAfter` 搭配上次请求的时间戳，仅拉取有更新的聊天室

------

## 注意事项

- **增量同步**：使用 `updatedAfter` 搭配上次请求的时间戳，可实现高效的增量同步，避免每次拉取全量数据
- **分页建议**：建议搭配 `limit` 和 `skip` 进行分页，避免一次返回过多数据影响性能
- **排序**：`sort` 字段以空格分隔多个条件，前缀 `-` 代表降序排列
- **`pref` 筛选**：`pref` 参数为 JSON 格式，需进行 URL 编码后传递
- **`inspect` 字段**：仅供调试使用，包含实际查询条件与执行耗时，正式环境可忽略
