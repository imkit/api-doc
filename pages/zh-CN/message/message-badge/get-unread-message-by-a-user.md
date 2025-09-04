# 获取用户未读消息

## 概述

取得当前用户的总未读消息数量。此 API 可以统计用户在所有有权限的聊天室中的未读消息总数，并支持按聊天室标签进行筛选统计，适用于显示用户的整体未读状态。

------

## API 端点

### 取得用户未读消息总数

获取当前用户的未读消息数量，可选择按标签筛选。

```http
GET /me/badge
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `Authorization`    | string | ✅    | Client Token   |

#### Query Parameters

| 参数       | 类型   | 必填 | 说明                                                      |
| ---------- | ------ | ---- | --------------------------------------------------------- |
| `roomTags` | string | ❌    | 按聊天室标签筛选（可重复使用多个 roomTags 参数）          |

#### 范例请求

**取得总未读消息数**

```http
GET /me/badge HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

**取得特定标签的未读消息数**

```http
GET /me/badge?roomTags=demo&roomTags=foo HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

**取得工作相关聊天室的未读消息数**

```http
GET /me/badge?roomTags=work&roomTags=project&roomTags=meeting HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应消息               |
| `result` | object | 未读消息统计结果       |

**结果对象结构**

| 参数    | 类型   | 说明                                    |
| ------- | ------ | --------------------------------------- |
| `badge` | number | 未读消息数量（所有符合条件的聊天室总和） |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "badge": 10
  }
}
```

**按标签筛选的回应范例**

```json
{
  "RC": 0,
  "RM": "OK", 
  "result": {
    "badge": 5
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

**400 Bad Request** - 参数无效

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_ROOM_TAGS",
    "message": "Room tags must be valid strings"
  }
}
```

------

## 使用场景

### 全局通知显示
- **总数显示**：在应用程序图标或标题栏显示未读消息总数
- **Badge 标记**：用于移动应用的 badge 数字显示
- **状态指示**：判断用户是否有未读消息需要处理

### 分类统计
- **工作消息**：统计工作相关聊天室的未读数量
- **个人消息**：统计个人或私人聊天的未读数量
- **系统通知**：统计系统公告类聊天室的未读数量

### 用户体验优化
- **智能提醒**：根据未读数量调整提醒频率
- **优先级显示**：根据不同标签的重要性排序显示
- **快捷访问**：提供快速跳转到有未读消息的聊天室

------

## 注意事项

- **权限控制**：只统计用户有权限访问的聊天室
- **标签筛选**：可使用多个 roomTags 参数进行 AND 条件筛选
- **即时性**：返回查询当下的即时未读数量
- **性能考量**：频繁查询可能影响性能，建议适度使用
- **参数格式**：多个标签需使用 `roomTags=tag1&roomTags=tag2` 格式
- **零值处理**：没有未读消息时返回 0