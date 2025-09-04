# 用户列表

## 概述

查询和搜索应用程序中的用户列表。支持条件筛选、分页查询，以及使用 MongoDB 查询语法进行复杂搜索。适用于用户管理、数据分析和系统监控等场景。

------

## API 端点

### 查询用户列表

取得应用程序中的用户列表，支持筛选和分页功能。

```http
GET /admin/clients
```

#### Headers

| 参数         | 类型   | 必填 | 说明          |
| ------------ | ------ | ---- | ------------- |
| `IM-API-KEY` | string | ✅    | 您的 API 密钥 |

#### Query Parameters

| 参数    | 类型   | 必填 | 说明                                          |
| ------- | ------ | ---- | --------------------------------------------- |
| `q`     | string | ❌    | MongoDB 查询语法，用于条件筛选                |
| `limit` | number | ❌    | 每页返回的最大用户数量（预设：50，最大：100） |
| `skip`  | number | ❌    | 跳过的用户数量，用于分页（预设：0）           |

#### 查询语法示例

**基本筛选**

```javascript
// 查询昵称包含 "AB" 的用户
q={"nickname": {"$regex": ".*AB.*"}}

// 查询特定 email 的用户
q={"email": "user@example.com"}

// 查询最近登录的用户（7天内）
q={"lastLoginTimeMS": {"$gte": 1640995200000}}
```

**复合条件**

```javascript
// 查询昵称包含 "admin" 且有 email 的用户
q={"nickname": {"$regex": ".*admin.*"}, "email": {"$exists": true}}

// 查询特定时间范围内注册的用户
q={"createdAt": {"$gte": "2025-01-01T00:00:00Z", "$lt": "2025-02-01T00:00:00Z"}}
```

#### 示例请求

**获取所有用户**

```http
GET /admin/clients?limit=20&skip=0
```

**搜索特定用户**

```http
GET /admin/clients?q=%7B%22nickname%22:%7B%22%24regex%22:%22.*AB.*%22%7D%7D&limit=10
```

#### Response

**成功响应（200 OK）**

| 参数                | 类型   | 说明                   |
| ------------------- | ------ | ---------------------- |
| `RC`                | number | 响应代码（0 表示成功） |
| `RM`                | string | 响应消息               |
| `result`            | object | 查询结果               |
| `result.totalCount` | number | 符合条件的用户总数     |
| `result.data`       | array  | 用户数据数组           |

**用户对象结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用户唯一识别码                |
| `nickname`        | string | 用户显示名称                  |
| `email`           | string | 用户电子邮件（如果有提供）    |
| `avatarUrl`       | string | 用户头像 URL                  |
| `address`         | object | 最后连接的网络地址信息        |
| `userAgent`       | string | 最后使用的浏览器/应用程序信息 |
| `lastLoginTimeMS` | number | 最后登录时间（毫秒时间戳）    |

#### 示例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "_id": "user001",
        "email": "test@example.com",
        "nickname": "Test AB User",
        "avatarUrl": "https://example.com/avatar.jpg",
        "address": {
          "port": 49315,
          "family": "IPv6",
          "address": "::ffff:118.168.96.151"
        },
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "lastLoginTimeMS": 1640995200000
      }
    ]
  }
}
```

#### 错误响应

**400 Bad Request** - 查询语法错误

```json
{
  "RC": 400,
  "RM": "Invalid query syntax",
  "error": {
    "code": "INVALID_QUERY",
    "message": "MongoDB query syntax error"
  }
}
```

**401 Unauthorized** - API 密钥无效

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

**413 Payload Too Large** - 查询结果过大

```json
{
  "RC": 413,
  "RM": "Query result too large",
  "error": {
    "code": "RESULT_TOO_LARGE",
    "message": "Please use more specific query or smaller limit"
  }
}
```

------

## 使用场景

### 用户管理

- **用户列表展示**：在管理后台显示所有用户
- **用户搜索**：根据昵称、email 等条件搜索特定用户
- **批次操作**：选取多个用户进行批次管理

### 数据分析

- **活跃度分析**：查询最近登录的用户统计
- **用户分布**：分析用户的地理分布和设备使用情况
- **成长追踪**：追踪特定时间段的用户成长

### 系统监控

- **异常检测**：查询异常登录行为的用户
- **容量规划**：了解用户总数和增长趋势
- **合规审查**：根据需要查询特定用户数据

------

## MongoDB 查询语法指南

### 基本操作符

| 操作符 | 说明     | 示例                                          |
| ------ | -------- | --------------------------------------------- |
| `$eq`  | 等于     | `{"nickname": {"$eq": "Alice"}}`              |
| `$ne`  | 不等于   | `{"nickname": {"$ne": "Admin"}}`              |
| `$gt`  | 大于     | `{"lastLoginTimeMS": {"$gt": 1640995200000}}` |
| `$gte` | 大于等于 | `{"createdAt": {"$gte": "2025-01-01"}}`       |
| `$lt`  | 小于     | `{"lastLoginTimeMS": {"$lt": 1640995200000}}` |
| `$lte` | 小于等于 | `{"createdAt": {"$lte": "2025-12-31"}}`       |

### 字符串操作

| 操作符   | 说明         | 示例                                                     |
| -------- | ------------ | -------------------------------------------------------- |
| `$regex` | 正则表达式   | `{"nickname": {"$regex": ".*admin.*", "$options": "i"}}` |
| `$in`    | 包含于列表   | `{"_id": {"$in": ["user1", "user2", "user3"]}}`          |
| `$nin`   | 不包含于列表 | `{"nickname": {"$nin": ["admin", "test"]}}`              |

### 存在性检查

| 操作符    | 说明     | 示例                                       |
| --------- | -------- | ------------------------------------------ |
| `$exists` | 字段存在 | `{"email": {"$exists": true}}`             |
| `$type`   | 数据类型 | `{"lastLoginTimeMS": {"$type": "number"}}` |

------

## 分页最佳实践

### 基本分页

```javascript
// 第一页（每页 20 笔）
GET /admin/clients?limit=20&skip=0

// 第二页
GET /admin/clients?limit=20&skip=20

// 第三页
GET /admin/clients?limit=20&skip=40
```

### 大数据集处理

```javascript
// 对于大量数据，建议使用更具体的查询条件
GET /admin/clients?q={"lastLoginTimeMS":{"$gte":1640995200000}}&limit=50
```

## 性能考量

- **索引使用**：常用的查询字段（如 nickname、email）已建立索引
- **查询优化**：避免使用过于复杂的正则表达式
- **分页限制**：单次查询最多返回 100 笔数据
- **缓存建议**：对于不常变动的查询结果建议实现缓存机制

## 注意事项

- **查询语法**：必须使用有效的 MongoDB 查询语法
- **URL 编码**：查询参数需要进行 URL 编码
- **敏感信息**：响应不包含用户的 token 等敏感信息
- **权限控制**：仅管理员权限可以调用此 API