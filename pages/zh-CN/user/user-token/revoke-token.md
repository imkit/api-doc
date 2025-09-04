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

| 参数           | 类型   | 必填 | 说明               |
| -------------- | ------ | ---- | ------------------ |
| `IM-API-KEY`   | string | ✅    | 您的 API 密钥      |
| `Content-Type` | string | ✅    | `application/json` |

#### Path Parameters

| 参数        | 类型   | 必填 | 说明           |
| ----------- | ------ | ---- | -------------- |
| `client_id` | string | ✅    | 用户唯一识别码 |

#### Request Body

| 参数    | 类型   | 必填 | 说明                                               |
| ------- | ------ | ---- | -------------------------------------------------- |
| `token` | string | ❌    | 要撤销的特定 token，若不提供则移除该用户所有 token |

#### 示例请求

**撤销特定 Token**

```json
{
  "token": "old-token-xyz"
}
```

**撤销所有 Token**

```json
{}
```

#### Response

**成功响应（200 OK）**

| 参数            | 类型    | 说明                |
| --------------- | ------- | ------------------- |
| `success`       | boolean | 操作是否成功        |
| `message`       | string  | 操作结果消息        |
| `revokedTokens` | number  | 被撤销的 token 数量 |

#### 示例响应

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

#### 错误响应

**400 Bad Request** - 请求参数错误

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid client_id format"
}
```

**401 Unauthorized** - API 密钥无效

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** - 用户不存在

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user001' not found"
}
```

**404 Not Found** - Token 不存在（当指定特定 token 时）

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

- **强制登出**：撤销 token 强制用户重新登录
- **Token 轮换**：定期撤销旧 token 提升安全性
- **权限变更**：撤销 token 以重新分配权限

## 注意事项

- **即时生效**：Token 撤销后立即生效，用户将无法继续使用聊天功能
- **不可恢复**：撤销的 token 无法恢复，需要重新 issue 或指派新 token
- **批次操作**：不提供 `token` 参数可一次撤销用户的所有 token
- **审计日志**：建议记录 token 撤销操作以供后续审计

## 最佳实践

1. **渐进式撤销**：优先撤销特定 token，避免影响用户其他设备
2. **通知机制**：撤销 token 前通知用户，提供良好的用户体验
3. **监控机制**：监控撤销操作，防止误操作或恶意攻击
4. **备份策略**：在撤销前备份重要的用户会话数据