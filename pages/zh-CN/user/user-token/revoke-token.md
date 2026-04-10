# 撤销 Token

## 概述

撤销指定用户的 access token，使其无法继续使用聊天服务。您可以选择撤销特定的 token，或移除该用户的所有 token。

------

## API 端点

### 撤销用户 Token

撤销指定用户的 access token。

```http
DELETE /admin/clients/{client_id}/token
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的 API 金钥 |
| `Content-Type` | string | ✅ | `application/json` |

#### Path Parameters

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `client_id` | string | ✅ | 用户唯一识别码 |

#### Request Body

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `token` | string | ❌ | 要撤销的特定 token，若不提供则移除该用户所有 token |

#### 范例请求

**撤销特定 Token：**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      token: "old-token-xyz",
    },
  }
);
```

**撤销所有 Token：**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
    data: {},
  }
);
```

**cURL 范例：**

```bash
curl -X "DELETE" "https://your-app.imkit.io/admin/clients/{client_id}/token" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d '{"token": "old-token-xyz"}'
```

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `success` | boolean | 操作是否成功 |
| `message` | string | 操作结果讯息 |
| `revokedTokens` | number | 被撤销的 token 数量 |

#### 范例回应

**撤销特定 Token**

```json
{
  "success": true,
  "message": "Token revoked successfully",
  "revokedTokens": 1
}
```

**撤销所有 Token**

```json
{
  "success": true,
  "message": "All tokens revoked successfully",
  "revokedTokens": 3
}
```

#### 错误回应

**401 Unauthorized** — API 金钥无效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** — 用户不存在

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user001' not found"
}
```

**404 Not Found** — Token 不存在

```json
{
  "error": "TOKEN_NOT_FOUND",
  "message": "Specified token not found for this client"
}
```

------

## 使用场景

### 安全性考量
- **帐号被盗用**：立即撤销所有 token 以确保安全
- **设备遗失**：撤销特定设备的 token
- **员工离职**：撤销企业用户的所有 token

### 系统管理
- **强制登出**：撤销 token 强制用户重新登入
- **Token 轮换**：定期撤销旧 token 提升安全性
- **权限变更**：撤销 token 以重新分配权限

------

## 注意事项

- **即时生效**：Token 撤销后立即生效，用户将无法继续使用聊天功能
- **不可复原**：撤销的 token 无法恢复，需要重新核发或指派新 token
- **批次操作**：不提供 `token` 参数可一次撤销用户的所有 token
- **优先撤销特定 Token**：避免影响用户其他设备，优先撤销特定 token
- **审计日志**：建议记录 token 撤销操作以供后续审计
