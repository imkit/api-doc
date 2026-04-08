# 创建聊天室

## 概述

创建聊天室，当前用户（调用者）将自动加入并邀请指定的成员。此 API 仅供服务端使用，需要适当的身份验证。

注意：如果调用者是管理员（platform-api-key），管理员用户也将加入聊天室。

------

## API 端点

### 创建并加入聊天室

创建新的聊天室，调用者自动加入并可邀请指定成员。

```http
POST /rooms/createAndJoin
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 客户端密钥 |
| `Authorization` | string | ✅ | 客户端令牌 |
| `Content-Type` | string | ✅ | JSON |

#### Post Body

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | ❌ | 聊天室名称 |
| `isPublic` | boolean | ❌ | 聊天室是否公开（true/false） |
| `description` | string | ❌ | 聊天室描述 |
| `invitees` | array | ❌ | 成员列表，创建聊天室时将邀请这些成员 |
| `invitees[]._id` | string | ❌ | 用户ID |
| `invitees[].role` | string | ❌ | 用户在聊天室中的角色，"member", "admin", "owner" |
| `invitees[].extraData` | object | ❌ | 成员在聊天室中的额外数据 |
| `memberExtraData` | object | ❌ | 成员的默认额外数据 |
| `avatarUrl` | string | ❌ | 聊天室头像图片URL |

#### 示例请求

**cURL 示例：**

```bash
curl -X "POST" "http://localhost:3100/rooms/createAndJoin" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'Authorization: {TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{
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
}'
```

#### Response

**成功响应（200 OK）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `RC` | number | 响应码，0 表示成功 |
| `RM` | string | 响应消息 |
| `result.name` | string | 聊天室名称 |
| `result.isPublic` | boolean | 聊天室是否公开（true/false） |
| `result.description` | string | 聊天室描述 |
| `result.memberExtraData` | object | 成员的默认额外数据 |
| `result.avatarUrl` | string | 聊天室头像图片URL |
| `result._id` | string | 聊天室ID |
| `result.appID` | string | 应用ID |
| `result.created` | string | 创建时间 |
| `result.updated` | string | 更新时间 |

#### 示例响应

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

#### 错误响应

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- 无效的聊天室类型
- 指定的受邀者不存在
- 服务器内部错误

------

## 使用场景

### 创建聊天室
- **创建公开聊天室**：设置 `isPublic` 为 `true`，创建公开可见的聊天室
- **创建私有聊天室**：设置 `isPublic` 为 `false`，创建仅限邀请成员可见的聊天室
- **带角色的成员邀请**：通过 `invitees` 指定成员及其角色（member、admin、owner）

------

## 注意事项

- 如果调用者是管理员（platform-api-key），管理员用户也将加入聊天室
- `invitees` 中的每个成员可以指定不同的角色和额外数据
- `memberExtraData` 为所有成员提供默认的额外数据
- 创建成功后会返回完整的聊天室信息，包含系统生成的 ID 和时间戳
