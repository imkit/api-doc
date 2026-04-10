# 建立用户群组

## 概述

建立用户群组（User Group）。用户群组是一个虚拟用户，代表一个团队或组织单位。将群组 ID 加入聊天室的成员或受邀者清单后，该群组内所有成员都可以在该聊天室中发送与接收讯息。

> **重要提示**：用户群组（User Group）与群组聊天室（Group Chat Room）是不同的概念。用户群组是一个虚拟的用户身份，可被当作单一用户加入聊天室，群组内的所有成员共享该聊天室的存取权限。

------

## API 端点

### 建立用户群组

在系统中建立一个新的用户群组。

```http
POST /admin/groups
```

#### Headers

| 参数           | 类型   | 必填 | 说明                            |
| -------------- | ------ | ---- | ------------------------------- |
| `IM-API-KEY`   | string | ✅    | 您的平台 API 金钥              |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

| 参数        | 类型   | 必填 | 说明                               |
| ----------- | ------ | ---- | ---------------------------------- |
| `_id`       | string | ❌    | 群组唯一识别码（不提供时由系统自动产生） |
| `nickname`  | string | ✅    | 群组显示名称                       |
| `avatarUrl` | string | ❌    | 群组头像图片 URL                   |
| `members`   | array  | ❌    | 群组成员的 Client ID 阵列          |

#### 范例请求

**JavaScript（axios）**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/groups",
  {
    _id: "group_customer_service",
    nickname: "客服团队",
    avatarUrl: "https://example.com/team-avatar.png",
    members: ["agent001", "agent002", "agent003"]
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X POST "https://your-app.imkit.io/admin/groups" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "_id": "group_customer_service",
    "nickname": "客服团队",
    "avatarUrl": "https://example.com/team-avatar.png",
    "members": ["agent001", "agent002", "agent003"]
  }'
```

#### Response

**成功回应（200 OK）**

| 参数              | 类型   | 说明                         |
| ----------------- | ------ | ---------------------------- |
| `RC`              | number | 回应代码（0 表示成功）       |
| `RM`              | string | 回应讯息                     |
| `result`          | object | 建立的群组资讯               |
| `result._id`      | string | 群组唯一识别码               |
| `result.nickname` | string | 群组显示名称                 |
| `result.avatarUrl`| string | 群组头像图片 URL             |
| `result.members`  | array  | 群组成员的 Client ID 阵列    |
| `result.createdAt`| string | 建立时间（ISO 格式）         |
| `result.updatedAt`| string | 最后更新时间（ISO 格式）     |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "group_customer_service",
    "nickname": "客服团队",
    "avatarUrl": "https://example.com/team-avatar.png",
    "members": ["agent001", "agent002", "agent003"],
    "createdAt": "2026-04-11T08:30:00.000Z",
    "updatedAt": "2026-04-11T08:30:00.000Z"
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

**400 Bad Request** - 缺少必要参数

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "nickname is required"
  }
}
```

**409 Conflict** - 群组 ID 已存在

```json
{
  "RC": 409,
  "RM": "Conflict",
  "error": {
    "code": "GROUP_ALREADY_EXISTS",
    "message": "A group with this ID already exists"
  }
}
```

------

## 使用场景

### 团队管理
- **客服团队**：建立客服群组，将群组加入客服聊天室，团队成员即可轮流处理客户讯息
- **部门群组**：为各部门建立群组，方便以部门为单位管理聊天室权限

### 组织架构
- **专案团队**：为专案建立群组，所有专案成员自动获得相关聊天室的存取权限
- **跨部门协作**：建立跨部门群组，简化多人聊天室的成员管理

------

## 注意事项

- **用户群组 vs 群组聊天室**：用户群组是一个虚拟用户，代表一组实际用户。它与群组聊天室（Group Chat Room）是完全不同的概念
- **加入聊天室**：建立群组后，需将群组 ID 加入聊天室的成员（members）或受邀者（invitees）清单，群组成员才能存取该聊天室
- **共享存取权限**：群组内的所有成员共享以群组身份加入的聊天室存取权限
- **成员 ID 有效性**：`members` 阵列中的 Client ID 必须是系统中已存在的用户
- **仅限伺服器端使用**：此端点需使用 `IM-API-KEY` 验证，仅限伺服器端呼叫
