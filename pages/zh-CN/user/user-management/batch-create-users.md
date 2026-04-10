# 批次建立用户

## 概述

此端点允许您一次建立或更新多位用户。适用于系统迁移、大量汇入用户等场景。此 API 仅供伺服器端使用，需要适当的身份验证。

------

## API 端点

### 批次建立或更新用户

一次建立或更新多位用户端。

```http
POST /admin/clients/list
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金钥 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `data` | array[object] | ✅ | 用户资讯阵列 |

**用户资讯物件**

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 用户唯一识别码 |
| `nickname` | string | ❌ | 用户显示名称 |
| `avatarUrl` | string | ❌ | 用户头像图片 URL |

#### 范例请求

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients/list",
  {
    data: [
      {
        _id: "user-001",
        nickname: "Alice",
        avatarUrl: "https://example.com/alice.jpg",
      },
      {
        _id: "user-002",
        nickname: "Bob",
        avatarUrl: "https://example.com/bob.jpg",
      },
      {
        _id: "user-003",
        nickname: "Charlie",
        avatarUrl: "https://example.com/charlie.jpg",
      },
    ],
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
curl -X "POST" "https://your-app.imkit.io/admin/clients/list" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "data": [
    {"_id": "user-001", "nickname": "Alice", "avatarUrl": "https://example.com/alice.jpg"},
    {"_id": "user-002", "nickname": "Bob", "avatarUrl": "https://example.com/bob.jpg"}
  ]
}'
```

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result.count` | number | 成功建立或更新的用户数量 |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 3
  }
}
```

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- **无效的 API 金钥** — 提供的 `IM-API-KEY` 无效或已过期
- **资料格式错误** — `data` 阵列格式不正确
- **缺少必填栏位** — 用户资讯中缺少 `_id`
- **伺服器内部错误** — 伺服器端发生未预期的错误

------

## 使用场景

### 系统迁移
- **用户汇入**：从现有系统迁移用户资料到 IMKIT
- **批次初始化**：应用程式启动时批次建立所有用户

### 资料同步
- **定期同步**：定期从主系统同步用户资料（暱称、头像等）
- **更新资讯**：批次更新多位用户的显示名称或头像

------

## 注意事项

- **仅供伺服器端使用**：此端点必须在后端呼叫
- **不产生 Token**：此 API 不会为用户产生存取权杖，如需 Token 请使用「建立用户」API 并设定 `issueAccessToken: true`
- **幂等性**：若 `_id` 已存在，会更新该用户的资料而非建立新用户
- **效能考量**：建议每次批次不超过 100 笔，避免请求超时
