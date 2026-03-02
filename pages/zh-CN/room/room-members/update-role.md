# 更新成员角色

此端点允许您更新聊天室中特定成员的角色。当角色变更为管理员时，系统会自动在聊天室内生成对应的系统消息。此 API 仅供服务端使用，需要适当的身份验证。

## HTTP 请求

```
PUT /rooms/:id/member/:client
```

## 身份验证

在请求标头中包含您的客户端密钥和授权令牌：

| 标头               | 说明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 客户端密钥   | ✅    |
| `IM-Authorization` | 客户端令牌   | ✅    |

## 路径参数

| 参数      | 类型   | 说明             | 必填 |
| --------- | ------ | ---------------- | ---- |
| `:id`     | string | 聊天室唯一标识符 | ✅    |
| `:client` | string | 成员的客户端 ID  | ✅    |

## 请求内容

| 参数       | 类型   | 必填 | 说明                                       |
| ---------- | ------ | ---- | ------------------------------------------ |
| `property` | string | ✅    | 固定填入 `"role"`                          |
| `value`    | string | ✅    | 角色值，可为 `"admin"` 或 `"member"`       |

### 角色说明

| 角色值     | 说明                               |
| ---------- | ---------------------------------- |
| `"admin"`  | 管理员，拥有管理聊天室成员的权限   |
| `"member"` | 普通成员                           |

## 使用示例

### 示例一：将成员设为管理员

**cURL 示例：**

```bash
curl -X "PUT" "http://localhost:3100/rooms/demo-room/member/user-001" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"property": "role", "value": "admin"}'
```

**JavaScript 示例：**

```javascript
const response = await axios.put(
  `http://localhost:3100/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "admin",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### 示例二：将管理员降为普通成员

**JavaScript 示例：**

```javascript
const response = await axios.put(
  `http://localhost:3100/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "member",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

## 响应

### 成功响应

当请求成功时，API 会返回更新后的聊天室信息：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "name": "Demo",
    "roomType": "group",
    "members": [
      {
        "_id": "user-001",
        "nickname": "User 001",
        "avatarUrl": "http://example.com/avatar.jpg",
        "isRobot": false,
        "id": "user-001",
        "lastLoginTimeMS": 1583057133276
      }
    ],
    "id": "demo-room",
    "createdTimeMS": 1525001412492
  }
}
```

### 响应字段

| 字段     | 类型   | 说明                     |
| -------- | ------ | ------------------------ |
| `RC`     | number | 响应码（0 表示成功）     |
| `RM`     | string | 响应消息                 |
| `result` | object | 更新后的聊天室完整信息   |

## 错误处理

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- 指定的聊天室或成员不存在
- `value` 不是有效的角色值
- 服务器内部错误

## 使用注意事项

- **系统消息**：当 `value` 设为 `"admin"` 时，系统会自动在聊天室内生成 `assignAdmin` 系统消息通知其他成员
- `property` 字段必须固定填入 `"role"`；若需更新其他成员属性，请使用[更新成员属性](./update-member-property) API
- 此操作仅变更成员在该聊天室内的角色，不影响其在其他聊天室的角色设置
