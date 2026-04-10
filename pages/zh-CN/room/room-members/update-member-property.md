# 更新成员属性

## 概述

此端点允许您更新聊天室中特定成员的自订属性，例如角色（role）、位置、分数、等级或任何自订栏位。此 API 仅供伺服器端使用，需要适当的身份验证。

------

## API 端点

### 更新成员属性

更新聊天室中特定成员的自订属性。

```http
PUT /rooms/:id/member/:client
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
| `:client` | string | ✅ | 成员的用户端 ID |

#### Request Body

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `property` | string | ✅ | 要更新的成员属性栏位名称 |
| `value` | mixed | ✅ | 属性的新值 |

#### 范例请求

**范例一：将成员设为管理员**

**cURL 范例：**

```bash
curl -X "PUT" "https://your-app.imkit.io/rooms/demo-room/member/user-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"property": "role", "value": "admin"}'
```

**JavaScript 范例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
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

**范例二：更新自订属性**

**JavaScript 范例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
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

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result` | object | 更新后的聊天室完整资讯 |

#### 范例回应

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

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- 无效的用户端金钥或授权权杖
- 指定的聊天室或成员不存在
- 伺服器内部错误

------

## 使用场景

### 角色管理
- **指派管理员**：将 `property` 设为 `"role"`、`value` 设为 `"admin"` 来指派管理员角色

### 自订属性
- **设定分数**：将 `property` 设为 `"score"` 来追踪成员在聊天室中的分数
- **设定等级**：将 `property` 设为 `"level"` 来管理成员等级
- **设定位置**：将 `property` 设为 `"location"` 来记录成员位置资讯

------

## 注意事项

- **角色设定**：当 `property` 设为 `"role"` 且 `value` 设为 `"admin"` 时，系统会自动在聊天室内产生 `assignAdmin` 系统讯息
- **自订属性**：除了 `role` 之外，可设定任意自订属性，例如位置（`location`）、分数（`score`）、等级（`level`）等
- `property` 栏位直接对应到成员属性物件中的栏位名称，`value` 的型别应与栏位定义相符
