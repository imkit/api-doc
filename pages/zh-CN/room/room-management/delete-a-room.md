# 删除聊天室

## 概述

此端点允许您永久删除指定的聊天室及其所有消息。删除后，聊天室数据与消息记录将从数据库中完全移除且无法恢复。此 API 仅供服务端使用，需要适当的身份验证。

------

## API 端点

### 删除聊天室

永久删除指定的聊天室及其所有消息。

```http
DELETE /rooms/:id
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 客户端密钥 |
| `IM-Authorization` | string | ✅ | 客户端令牌 |

#### Path Parameters

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `:id` | string | ✅ | 聊天室唯一标识符 |

#### 示例请求

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

#### Response

**成功响应（200 OK）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `RC` | number | 响应码（0 表示成功） |
| `RM` | string | 响应消息 |
| `result` | object | 删除操作的结果 |

**结果对象字段**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `n` | number | 受影响的文档数量 |
| `ok` | number | 操作是否成功（1 表示成功） |

#### 示例响应

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

#### 错误响应

当请求失败时，您会收到包含错误详细信息的错误响应。常见的错误情况包括：

- 无效的客户端密钥或授权令牌
- 指定的聊天室不存在
- 无删除该聊天室的权限
- 服务器内部错误

------

## 使用场景

### 聊天室管理
- **清理不再使用的聊天室**：永久删除已经不再活跃或不需要的聊天室
- **数据管理**：在必要时移除聊天室及其所有相关消息记录

------

## 注意事项

- **永久删除**：此操作会将聊天室及其所有消息从数据库永久删除，无法恢复
- **消息一并删除**：聊天室内所有的消息记录也会同步被删除
- 请确认聊天室 ID 正确，避免误删重要的聊天室
- 删除后，原本在该聊天室中的成员将无法再访问任何相关数据
