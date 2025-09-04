# 搜索消息

## 概述

通过关键字搜索消息内容。此 API 使用通用搜索功能，可以根据消息内容进行全文搜索，支持跨聊天室搜索或限定特定聊天室范围，适用于快速定位特定消息内容。

------

## API 端点

### 搜索消息内容

使用关键字在消息内容中进行搜索。

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
| `type`     | array    | ✅    | 搜索类型，设置为 ["messages"]             |
| `keyword`  | string   | ✅    | 搜索关键字（在消息内容中搜索）            |
| `room`     | string   | ❌    | 限制在特定聊天室内搜索                    |
| `roomTags` | array    | ❌    | 限制在拥有指定标签的聊天室内搜索          |
| `limit`    | number   | ❌    | 最大搜索结果数量                          |

#### 范例请求

**在所有聊天室中搜索消息**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "hello",
  "limit": 20
}
```

**在特定聊天室中搜索消息**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "project update",
  "room": "demo-room"
}
```

**在特定标签的聊天室中搜索**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "meeting",
  "roomTags": ["work", "team"]
}
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应消息               |
| `result` | object | 搜索结果               |

**搜索结果结构**

| 参数       | 类型   | 说明                              |
| ---------- | ------ | --------------------------------- |
| `messages` | array  | 搜索到的消息群组，按聊天室分组    |

**消息群组对象结构**

| 参数       | 类型   | 说明                      |
| ---------- | ------ | ------------------------- |
| `room`     | object | 聊天室信息                |
| `messages` | array  | 该聊天室中符合的消息 ID   |

**聊天室信息对象结构**

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

**400 Bad Request** - 搜索参数无效

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

### 消息搜索
- **关键字查找**：快速找到包含特定关键字的历史消息
- **内容回溯**：在大量消息中找到相关的对话内容
- **信息检索**：搜索特定主题或项目相关的讨论

### 聊天室管理
- **内容审核**：搜索包含特定词汇的消息进行审核
- **数据分析**：分析聊天室中讨论的热门话题
- **合规检查**：搜索可能违规的消息内容

### 用户体验
- **智能搜索**：提供用户快速搜索历史对话的功能
- **关联显示**：显示与搜索关键字相关的所有消息
- **跨室搜索**：在多个聊天室中同时搜索相关内容

------

## 注意事项

- **搜索范围**：只会搜索当前用户有权限访问的聊天室和消息
- **关键字匹配**：支持全文搜索，匹配消息内容中的关键字
- **结果分组**：搜索结果按聊天室分组，便于理解消息来源
- **权限控制**：搜索结果会根据用户的聊天室权限进行过滤
- **性能考量**：大范围搜索可能需要较长时间，建议设置合理的 limit 值
- **消息 ID**：返回的是消息 ID 数组，需要额外 API 调用来获取完整消息内容