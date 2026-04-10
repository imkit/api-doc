# 发送讯息

## 概述

透过平台管理 API 向指定聊天室发送讯息。可指定发送者身分，适用于系统通知、机器人讯息、后端自动化等场景。

------

## API 端点

### 发送聊天室讯息

以指定发送者的身分，向指定聊天室发送讯息。

```http
POST /messages
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金钥 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | 讯息内容 |
| `messageType` | string | ✅ | 讯息类型（如 `"text"`、`"image"`、`"announcement"` 等） |
| `room` | string | ✅ | 聊天室 ID |
| `sender` | string | ✅ | 发送者用户 ID |
| `push` | boolean | ❌ | 是否推播通知给聊天室成员，预设为 `true` |
| `skipTotalBadge` | boolean | ❌ | 是否跳过计算发送者的总未读数，预设为 `false` |
| `mentions` | array[string] | ❌ | 提及的用户 ID 阵列 |

#### 范例请求

**发送文字讯息**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "system",
    message: "欢迎加入专案讨论群！",
    messageType: "text",
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**发送公告讯息**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "admin",
    message: "系统将于今晚 22:00 进行维护",
    messageType: "announcement",
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**发送带提及的讯息**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "user-a",
    message: "请 @user-b 确认这份文件",
    messageType: "text",
    mentions: ["user-b"],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**发送讯息但不推播**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "system",
    message: "背景任务完成",
    messageType: "text",
    push: false,
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
curl -X "POST" "https://your-app.imkit.io/messages" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "room": "project-room-001",
  "sender": "system",
  "message": "欢迎加入！",
  "messageType": "text"
}'
```

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result` | object | 发送的讯息资料 |

**讯息物件结构**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `_id` | string | 讯息唯一识别码 |
| `room` | string | 所属聊天室 ID |
| `message` | any | 讯息内容 |
| `messageType` | string | 讯息类型 |
| `sender` | string | 发送者 ID |
| `appID` | string | 应用程式识别码 |
| `messageTimeMS` | number | 讯息发送时间（毫秒时间戳） |
| `updatedAtMS` | number | 讯息更新时间（毫秒时间戳） |
| `createdAtMS` | number | 讯息建立时间（毫秒时间戳） |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58bf8f1dc3b24c04d19d9add",
    "room": "project-room-001",
    "message": "欢迎加入专案讨论群！",
    "messageType": "text",
    "sender": "system",
    "appID": "SampleApp",
    "messageTimeMS": 1488949021290,
    "updatedAtMS": 1488949021290,
    "createdAtMS": 1488949021290
  }
}
```

#### 错误回应

**401 Unauthorized** — 认证失败

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired"
  }
}
```

**404 Not Found** — 聊天室不存在

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "The specified room does not exist"
  }
}
```

------

## 使用场景

### 系统通知
- **系统公告**：由后端服务自动发送系统公告或维护通知
- **状态更新**：订单状态变更时自动通知相关用户

### 机器人讯息
- **自动回复**：透过 API 实现聊天机器人功能
- **智能助手**：搭配 Webhook 接收讯息并回复

### 应用整合
- **第三方整合**：将外部系统的事件以讯息形式发送到聊天室
- **工作流程**：在业务流程的关键节点插入聊天室通知

------

## 注意事项

- **发送者身分**：`sender` 必须为系统中已存在的用户 ID
- **推播控制**：透过 `push` 参数控制是否推播，适合静默通知场景
- **讯息类型**：`messageType` 为自订栏位，可根据应用需求设定任意类型
- **提及功能**：`mentions` 阵列中的用户 ID 会收到提及通知
- **与 Socket 的区别**：此 API 适用于后端服务发送讯息，一般用户聊天由 SDK 透过 Socket 连线处理
