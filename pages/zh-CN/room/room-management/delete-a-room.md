# 删除聊天室

## 概述

此端点允许您永久删除指定的聊天室及其所有讯息。删除后，聊天室资料与讯息记录将从资料库中完全移除且无法复原。

------

## API 端点

### 删除聊天室

永久删除指定的聊天室及其所有讯息。

```http
DELETE /rooms/:id
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 用户端金钥 |
| `IM-Authorization` | string | ✅ | 用户端权杖 |

#### Path Parameters

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `:id` | string | ✅ | 聊天室唯一识别码 |

#### 范例请求

**cURL 范例:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/rooms/test-room-123" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8'
```

**JavaScript 范例:**

```javascript
const response = await axios.delete(
  "https://your-app.imkit.io/rooms/test-room-123",
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

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `RC` | number | 回应代码(0 表示成功) |
| `RM` | string | 回应讯息 |
| `result` | object | 删除操作的结果 |

**结果物件栏位**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `n` | number | 受影响的文件数量 |
| `ok` | number | 操作是否成功(1 表示成功) |

#### 范例回应

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

#### 错误回应

当请求失败时,您会收到包含错误详细资讯的错误回应。常见的错误情况包括:

- 无效的用户端金钥或授权权杖
- 指定的聊天室不存在
- 无删除该聊天室的权限
- 伺服器内部错误

------

## 使用场景

### 聊天室管理
- **清理不再使用的聊天室**:永久删除已经不再活跃或不需要的聊天室
- **资料管理**:在必要时移除聊天室及其所有相关讯息记录

------

## 注意事项

- **永久删除**:此操作会将聊天室及其所有讯息从资料库永久删除,无法复原
- **讯息一并删除**:聊天室内所有的讯息记录也会同步被删除
- 请确认聊天室 ID 正确,避免误删重要的聊天室
- 删除后,原本在该聊天室中的成员将无法再存取任何相关资料
