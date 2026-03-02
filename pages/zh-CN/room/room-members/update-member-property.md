# 更新成员属性

此端点允许您更新聊天室中特定成员的自定义属性，例如角色（role）、位置、分数、等级或任何自定义字段。此 API 仅供服务端使用，需要适当的身份验证。

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

| 参数       | 类型   | 必填 | 说明                     |
| ---------- | ------ | ---- | ------------------------ |
| `property` | string | ✅    | 要更新的成员属性字段名称 |
| `value`    | mixed  | ✅    | 属性的新值               |

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

### 示例二：更新自定义属性

**JavaScript 示例：**

```javascript
const response = await axios.put(
  `http://localhost:3100/rooms/${roomID}/member/${clientID}`,
  {
    property: "score",
    value: 100,
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
- 服务器内部错误

## 使用注意事项

- **角色设置**：当 `property` 设为 `"role"` 且 `value` 设为 `"admin"` 时，系统会自动在聊天室内生成 `assignAdmin` 系统消息
- **自定义属性**：除了 `role` 之外，可设置任意自定义属性，例如位置（`location`）、分数（`score`）、等级（`level`）等
- `property` 字段直接对应成员属性对象中的字段名称，`value` 的类型应与字段定义相符
