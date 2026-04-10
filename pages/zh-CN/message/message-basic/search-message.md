# 搜寻讯息

## 概述

透过关键字搜寻讯息内容。此 API 使用通用搜寻功能，可以根据讯息内容进行全文搜寻，支援跨聊天室搜寻或限定特定聊天室范围，适用于快速定位特定讯息内容。

------

## API 端点

### 搜寻讯息内容

使用关键字在讯息内容中进行搜寻。

```http
POST /search
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Post Body

| 参数       | 类型     | 必填 | 说明                                      |
| ---------- | -------- | ---- | ----------------------------------------- |
| `type`     | array    | ✅    | 搜寻类型，设定为 ["messages"]             |
| `keyword`  | string   | ✅    | 搜寻关键字（在讯息内容中搜寻）            |
| `room`     | string   | ❌    | 限制在特定聊天室内搜寻                    |
| `roomTags` | array    | ❌    | 限制在拥有指定标签的聊天室内搜寻          |
| `limit`    | number   | ❌    | 最大搜寻结果数量                          |

#### 范例请求

**在所有聊天室中搜寻讯息**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "hello",
  "limit": 20
}
```

**在特定聊天室中搜寻讯息**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "project update",
  "room": "demo-room"
}
```

**在特定标签的聊天室中搜寻**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "meeting",
  "roomTags": ["work", "team"]
}
```

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/search`,
  {
    type: ["messages"],
    keyword: "hello",
    limit: 20,
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 范例：**

```bash
curl -X "POST" "https://your-app.imkit.io/search" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"type": ["messages"], "keyword": "hello", "limit": 20}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 搜寻结果               |

**搜寻结果结构**

| 参数       | 类型   | 说明                              |
| ---------- | ------ | --------------------------------- |
| `messages` | array  | 搜寻到的讯息群组，按聊天室分组    |

**讯息群组物件结构**

| 参数       | 类型   | 说明                      |
| ---------- | ------ | ------------------------- |
| `room`     | object | 聊天室资讯                |
| `messages` | array  | 该聊天室中符合的讯息 ID   |

**聊天室资讯物件结构**

| 参数            | 类型    | 说明                      |
| --------------- | ------- | ------------------------- |
| `_id`           | string  | 聊天室唯一识别码          |
| `name`          | string  | 聊天室名称                |
| `cover`         | string  | 聊天室封面图片 URL        |
| `description`   | string  | 聊天室描述                |
| `roomTags`      | array   | 聊天室标签列表            |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "messages": [
      {
        "room": {
          "_id": "demo-room",
          "name": "Demo Room",
          "cover": "http://example.com/cover.jpg",
          "description": "Demo room for testing",
          "roomTags": ["demo", "test"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf349",
          "5f890cf37d980e06f6aaf350",
          "5f890cf37d980e06f6aaf351"
        ]
      },
      {
        "room": {
          "_id": "work-room",
          "name": "Work Discussion",
          "cover": "http://example.com/work-cover.jpg",
          "description": "Work related discussions",
          "roomTags": ["work"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf352"
        ]
      }
    ]
  }
}
```

#### 错误回应

**401 Unauthorized** - 认证失败

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**400 Bad Request** - 搜寻参数无效

```json
{
  "RC": 400,
  "RM": "Invalid search parameters",
  "error": {
    "code": "INVALID_SEARCH_TYPE",
    "message": "Search type must include 'messages'"
  }
}
```

------

## 使用场景

### 讯息搜寻
- **关键字查找**：快速找到包含特定关键字的历史讯息
- **内容回溯**：在大量讯息中找到相关的对话内容
- **资讯检索**：搜寻特定主题或专案相关的讨论

### 聊天室管理
- **内容审核**：搜寻包含特定词汇的讯息进行审核
- **资料分析**：分析聊天室中讨论的热门话题
- **合规检查**：搜寻可能违规的讯息内容

### 用户体验
- **智能搜寻**：提供用户快速搜寻历史对话的功能
- **关联显示**：显示与搜寻关键字相关的所有讯息
- **跨室搜寻**：在多个聊天室中同时搜寻相关内容

------

## 注意事项

- **搜寻范围**：只会搜寻当前用户有权限访问的聊天室和讯息
- **关键字匹配**：支援全文搜寻，匹配讯息内容中的关键字
- **结果分组**：搜寻结果按聊天室分组，便于理解讯息来源
- **权限控制**：搜寻结果会根据用户的聊天室权限进行过滤
- **效能考量**：大范围搜寻可能需要较长时间，建议设定合理的 limit 值
- **讯息 ID**：返回的是讯息 ID 阵列，需要额外 API 调用来获取完整讯息内容
