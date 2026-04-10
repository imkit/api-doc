# 建立聊天室

## 概述

此端点允许您在系统中建立新的聊天室，并可同时指定成员。此 API 建立聊天室但不会自动加入呼叫者，适合由后端服务进行聊天室管理。

------

## API 端点

### 建立聊天室

在系统中建立新的聊天室。

```http
POST /rooms/
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金钥 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ❌ | 自订聊天室 ID，若未指定则自动产生 |
| `name` | string | ❌ | 聊天室名称 |
| `cover` | string | ❌ | 聊天室封面图片 URL |
| `roomType` | string | ❌ | 聊天室类型：`"direct"`（一对一）或 `"group"`（群组） |
| `members` | array[string] | ❌ | 成员用户端 ID 阵列 |
| `description` | string | ❌ | 聊天室描述，可为纯文字或序列化的 JSON 资料 |
| `roomTags` | array[string] | ❌ | 聊天室标签阵列，用于搜寻和分类 |
| `webhook` | string | ❌ | Webhook 金钥或 URL |
| `botMode` | boolean | ❌ | 是否启用聊天室机器人 |
| `extParams` | string | ❌ | 扩充自订参数，格式为 `param1=value1&param2=value2` |
| `systemMessage` | boolean | ❌ | 是否自动产生系统讯息（如加入成员讯息） |
| `owner` | string | ❌ | 聊天室拥有者 ID |

#### 范例请求

##### 建立一对一聊天室

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/rooms/",
  {
    roomType: "direct",
    members: ["user-a", "user-b"],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### 建立群组聊天室

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/rooms/",
  {
    _id: "project-room-001",
    name: "专案讨论群",
    cover: "https://example.com/cover.jpg",
    roomType: "group",
    roomTags: ["project", "team-a"],
    members: ["user-a", "user-b", "user-c"],
    systemMessage: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### cURL 范例

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "name": "专案讨论群",
  "roomType": "group",
  "roomTags": ["project", "team-a"],
  "members": ["user-a", "user-b", "user-c"]
}'
```

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result` | object | 建立的聊天室资讯 |

**聊天室物件栏位**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `_id` | string | 聊天室唯一识别码 |
| `name` | string | 聊天室名称 |
| `cover` | string | 聊天室封面图片 URL |
| `roomType` | string | 聊天室类型（`"direct"` 或 `"group"`） |
| `members` | array[string] | 成员 ID 阵列 |
| `roomTags` | array[string] | 聊天室标签阵列 |
| `appID` | string | 应用程式识别码 |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "project-room-001",
    "appID": "SampleApp",
    "name": "专案讨论群",
    "cover": "https://example.com/cover.jpg",
    "roomType": "group",
    "roomTags": ["project", "team-a"],
    "members": ["user-a", "user-b", "user-c"]
  }
}
```

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- **无效的 API 金钥** — 提供的 `IM-API-KEY` 无效或已过期
- **无效的聊天室类型** — `roomType` 不是 `"direct"` 或 `"group"`
- **成员不存在** — `members` 中包含不存在的用户 ID
- **伺服器内部错误** — 伺服器端发生未预期的错误

------

## 使用场景

### 用户配对
- **一对一客服聊天**：当用户发起客服请求时，后端建立 `direct` 聊天室，将用户和客服人员加入
- **订单对谈**：当订单成立时，自动建立买卖双方的一对一聊天室

### 群组管理
- **专案群组**：为特定专案建立群组聊天室，加入相关成员
- **活动群组**：为活动或课程建立群组，统一管理参与者

------

## 注意事项

- **不自动加入**：此 API 建立聊天室但呼叫者不会自动加入，适合由后端服务管理
- **聊天室 ID**：若未指定 `_id`，系统会自动产生唯一识别码
- **成员管理**：可在建立时透过 `members` 直接指定成员，或之后透过「新增成员」API 加入
- **标签用途**：`roomTags` 可用于后续的聊天室搜寻和分类功能
- **时间戳格式**：所有时间戳均为 UTC 格式，以毫秒为单位
