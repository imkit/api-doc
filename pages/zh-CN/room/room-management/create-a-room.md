# 创建聊天室

# 创建和加入带成员的聊天室

创建聊天室，当前用户（调用者）将自动加入并邀请指定的成员。

注意：如果调用者是管理员（platform-api-key），管理员用户也将加入聊天室。

### 路径

/rooms/createAndJoin

### 方法

POST

### 请求头：

| 字段            | 说明  |
| ---------------- | ------------ |
| IM-CLIENT-KEY    | 客户端密钥   |
| Authorization    | 客户端令牌 |
| Content-Type     | JSON         |

### 查询参数：

N/A

### POST 请求体

```json
{
  "name": "room name",
  "isPublic": true,
  "description": "this is room description",
  "memberExtraData": {
    "key1": "val1",
    "key2": "val2"
  },
  "invitees": [
    {
      "_id": "user id",
      "role": "user",
      "extraData": {
        "key1": "val1",
        "key2": "val2"
      }
    }
  ],
  "avatarUrl": "http://xxxx.xxx.xxx/xxx.jpg"
}
```

#### 字段说明

| 字段 | 说明 |
| - | - |
| name | 聊天室名称 |
| isPublic | true/false，聊天室是否公开 |
| description | 聊天室描述 |
| invitees | 成员列表，创建聊天室时将邀请这些成员 |
| invitees[].\_id | 用户ID |
| invitees[].role | 用户在聊天室中的角色，"member", "admin", "owner" |
| invitees[].extraData | 成员在聊天室中的额外数据 |
| memberExtraData | 成员的默认额外数据 |
| avatarUrl | 聊天室头像图片URL |

### 响应

HTTP 200

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "name": "room name",
    "isPublic": true,
    "description": "this is room description",
    "memberExtraData": {
      "key1": "val1",
      "key2": "val2"
    },
    "avatarUrl": "http://xxxx.xxx.xxx/xxx.jpg",
    "_id": "5e53f94bb3c9de001f92d058",
    "appID": "your-app-id",
    "created": "2020-02-24T09:43:07.988Z",
    "updated": "2020-02-24T09:43:07.988Z",
    "__v": 0,
    "id": "5e53f94bb3c9de001f92d058"
  }
}
```

#### 字段说明

| 字段 | 说明 |
| - | - |
| RC | 响应码，0 表示成功 |
| RM | 响应消息 |
| result.name | 聊天室名称 |
| result.isPublic | true/false，聊天室是否公开 |
| result.description | 聊天室描述 |
| result.memberExtraData | 成员的默认额外数据 |
| result.avatarUrl | 聊天室头像图片URL |
| result._id | 聊天室ID |
| result.appID | 应用ID |
| result.created | 创建时间 |
| result.updated | 更新时间 |