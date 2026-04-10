# 获取用户未读讯息

## 概述

取得当前用户的总未读讯息数量。此 API 可以统计用户在所有有权限的聊天室中的未读讯息总数，并支援按聊天室标签进行筛选统计，适用于显示用户的整体未读状态。

------

## API 端点

### 取得用户未读讯息总数

获取当前用户的未读讯息数量，可选择按标签筛选。

```http
GET /me/badge
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization`    | string | ✅    | Client Token   |

#### Query Parameters

| 参数       | 类型   | 必填 | 说明                                                      |
| ---------- | ------ | ---- | --------------------------------------------------------- |
| `roomTags` | string | ❌    | 按聊天室标签筛选（可重复使用多个 roomTags 参数）          |

#### 范例请求

**取得总未读讯息数**

```http
GET /me/badge HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**取得特定标签的未读讯息数**

```http
GET /me/badge?roomTags=demo&roomTags=foo HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**取得工作相关聊天室的未读讯息数**

```http
GET /me/badge?roomTags=work&roomTags=project&roomTags=meeting HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 范例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/me/badge`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 范例：**

```bash
curl -X "GET" "https://your-app.imkit.io/me/badge" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 未读讯息统计结果       |

**结果物件结构**

| 参数    | 类型   | 说明                                    |
| ------- | ------ | --------------------------------------- |
| `badge` | number | 未读讯息数量（所有符合条件的聊天室总和） |

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
- **总数显示**：在应用程式图示或标题列显示未读讯息总数
- **Badge 标记**：用于移动应用的 badge 数字显示
- **状态指示**：判断用户是否有未读讯息需要处理

### 分类统计
- **工作讯息**：统计工作相关聊天室的未读数量
- **个人讯息**：统计个人或私人聊天的未读数量
- **系统通知**：统计系统公告类聊天室的未读数量

### 用户体验最佳化
- **智能提醒**：根据未读数量调整提醒频率
- **优先级显示**：根据不同标签的重要性排序显示
- **快捷访问**：提供快速跳转到有未读讯息的聊天室

------

## 注意事项

- **权限控制**：只统计用户有权限访问的聊天室
- **标签筛选**：可使用多个 roomTags 参数进行 AND 条件筛选
- **即时性**：返回查询当下的即时未读数量
- **效能考量**：频繁查询可能影响效能，建议适度使用
- **参数格式**：多个标签需使用 `roomTags=tag1&roomTags=tag2` 格式
- **零值处理**：没有未读讯息时返回 0
