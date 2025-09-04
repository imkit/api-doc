# 获取聊天室未读消息

## 概述

根据聊天室标签统计未读消息数量。此 API 允许按聊天室标签分组统计未读消息，适用于显示不同类型聊天室的未读状态、建立消息摘要和管理通知提醒。

------

## API 端点

### 按聊天室标签统计未读消息

根据指定的聊天室标签统计未读消息数量。

```http
POST /badges/byRoomTags
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Post Body

| 参数   | 类型   | 必填 | 说明                                    |
| ------ | ------ | ---- | --------------------------------------- |
| `tags` | array  | ❌    | 聊天室标签数组（省略时查询所有标签）    |

#### 范例请求

**查询特定标签的未读数量**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": ["demo", "sample"]
}
```

**查询工作相关聊天室的未读数量**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": ["work", "project", "meeting"]
}
```

**查询所有标签的未读数量**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": []
}
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应消息               |
| `result` | object | 统计结果               |

**统计结果结构**

| 参数         | 类型   | 说明                              |
| ------------ | ------ | --------------------------------- |
| `totalBadge` | number | 所有查询标签的未读消息总数        |
| `data`       | object | 各标签对应的未读消息数量          |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalBadge": 15,
    "data": {
      "demo": 2,
      "sample": 0,
      "work": 8,
      "project": 3,
      "meeting": 2
    }
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

**400 Bad Request** - 请求参数无效

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_TAGS",
    "message": "Tags must be an array of strings"
  }
}
```

------

## 使用场景

### 未读状态显示
- **标签分组**：在聊天室列表中按标签显示未读数量
- **重要性分级**：根据标签优先级显示不同的通知状态
- **视觉提醒**：用不同颜色或样式标示不同类型的未读消息

### 通知管理
- **智能通知**：根据聊天室标签设置不同的通知策略
- **批量操作**：批量标记特定标签聊天室的消息为已读
- **过滤控制**：允许用户选择关注特定标签的聊天室

### 数据统计
- **活跃度分析**：分析不同类型聊天室的活跃程度
- **工作流程**：统计工作相关聊天室的未处理消息
- **优先级管理**：识别需要优先处理的聊天室类型

------

## 注意事项

- **标签权限**：只会统计用户有权限访问的聊天室
- **空数组处理**：传入空数组时会查询所有可用标签
- **即时性**：统计结果为查询当下的即时数据
- **标签匹配**：完全匹配指定的标签名称
- **性能考量**：查询大量标签时可能影响响应时间
- **零值显示**：没有未读消息的标签会显示为 0