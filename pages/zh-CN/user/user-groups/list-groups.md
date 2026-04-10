# 用户群组列表

## 概述

查询系统中所有的用户群组列表。可搭配 `limit` 参数控制回传数量。此为伺服器端 API，需使用 `IM-API-KEY` 进行验证。

------

## API 端点

### 查询用户群组列表

取得系统中所有用户群组的列表。

```http
GET /admin/groups
```

#### Headers

| 参数         | 类型   | 必填 | 说明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金钥 |

#### Query Parameters

| 参数    | 类型   | 必填 | 说明                             |
| ------- | ------ | ---- | -------------------------------- |
| `limit` | number | ❌    | 回传的最大群组数量               |

#### 范例请求

**JavaScript（axios）**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/groups",
  {
    params: {
      limit: 50
    },
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/groups?limit=50" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**成功回应（200 OK）**

| 参数                    | 类型   | 说明                         |
| ----------------------- | ------ | ---------------------------- |
| `RC`                    | number | 回应代码（0 表示成功）       |
| `RM`                    | string | 回应讯息                     |
| `result`                | object | 查询结果                     |
| `result.totalCount`     | number | 群组总数                     |
| `result.data`           | array  | 群组资料阵列                 |

**群组物件结构**

| 参数        | 类型   | 说明                       |
| ----------- | ------ | -------------------------- |
| `_id`       | string | 群组唯一识别码             |
| `nickname`  | string | 群组显示名称               |
| `avatarUrl` | string | 群组头像图片 URL           |
| `members`   | array  | 群组成员的 Client ID 阵列  |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 3,
    "data": [
      {
        "_id": "group_customer_service",
        "nickname": "客服团队",
        "avatarUrl": "https://example.com/cs-avatar.png",
        "members": ["agent001", "agent002", "agent003"]
      },
      {
        "_id": "group_sales",
        "nickname": "业务团队",
        "avatarUrl": "https://example.com/sales-avatar.png",
        "members": ["sales001", "sales002"]
      },
      {
        "_id": "group_engineering",
        "nickname": "工程团队",
        "avatarUrl": "https://example.com/eng-avatar.png",
        "members": ["dev001", "dev002", "dev003", "dev004"]
      }
    ]
  }
}
```

#### 错误回应

**401 Unauthorized** - API 金钥无效

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

------

## 使用场景

### 群组管理
- **群组总览**：在管理后台列出所有用户群组，提供管理介面
- **成员审查**：检视各群组的成员组成，确认权限配置正确

### 系统整合
- **同步群组资料**：将群组资料同步至外部系统（如 CRM、HR 系统）
- **权限稽核**：定期汇出群组清单，进行存取权限稽核

------

## 注意事项

- **仅限伺服器端使用**：此端点需使用 `IM-API-KEY` 验证，仅限伺服器端呼叫
- **limit 参数**：未指定 `limit` 时，系统将回传预设数量的群组
- **群组概念**：回传的是用户群组（虚拟用户），非群组聊天室
- **成员资讯**：回传的 `members` 仅包含 Client ID，如需成员详细资讯需另行查询用户 API
