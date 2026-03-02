# 删除聊天室

此端点允许您永久删除指定的聊天室及其所有消息。删除后，聊天室数据与消息记录将从数据库中完全移除且无法恢复。此 API 仅供服务端使用，需要适当的身份验证。

## HTTP 请求

```
DELETE /rooms/:id
```

## 身份验证

在请求标头中包含您的客户端密钥和授权令牌：

| 标头               | 说明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 客户端密钥   | ✅    |
| `IM-Authorization` | 客户端令牌   | ✅    |

## 路径参数

| 参数  | 类型   | 说明             | 必填 |
| ----- | ------ | ---------------- | ---- |
| `:id` | string | 聊天室唯一标识符 | ✅    |

## 使用示例

### 示例：删除指定聊天室

**cURL 示例：**

```bash
curl -X "DELETE" "http://localhost:3100/rooms/test-room-123" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8'
```

**JavaScript 示例：**

```javascript
const response = await axios.delete(
  "http://localhost:3100/rooms/test-room-123",
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

当请求成功时，API 会返回删除操作的结果：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

### 响应字段

| 字段     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 响应码（0 表示成功）   |
| `RM`     | string | 响应消息               |
| `result` | object | 删除操作的结果         |

#### 结果对象字段

| 字段   | 类型   | 说明                       |
| ------ | ------ | -------------------------- |
| `n`    | number | 受影响的文档数量           |
| `ok`   | number | 操作是否成功（1 表示成功） |

## 错误处理

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- 指定的聊天室不存在
- 无删除该聊天室的权限
- 服务器内部错误

## 使用注意事项

- **永久删除**：此操作会将聊天室及其所有消息从数据库永久删除，无法恢复
- **消息一并删除**：聊天室内所有的消息记录也会同步被删除
- 请确认聊天室 ID 正确，避免误删重要的聊天室
- 删除后，原本在该聊天室中的成员将无法再访问任何相关数据
