# 批次发送讯息

## 概述

透过平台管理 API 一次发送讯息到多个聊天室或多位用户。支援样板变数替换，适用于广播通知、行销推送、系统公告等场景。

------

## API 端点

### 批次发送讯息

将讯息发送到多个聊天室或用户的一对一聊天室。

```http
POST /messages/batch
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金钥 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | 讯息内容，支援 `$pattern$` 样板替换 |
| `messageType` | string | ✅ | 讯息类型（如 `"text"`） |
| `sender` | string | ❌ | 指定发送者 ID（仅管理员可用） |
| `push` | boolean | ❌ | 是否启用推播通知，预设为 `false` |
| `skipTotalBadge` | boolean | ❌ | 跳过计算发送者的总未读数，预设为 `false` |
| `paras` | array[object] | ✅ | 接收者参数阵列 |

**接收者参数物件**

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `receiver` | string | ❌ | 接收者用户 ID（发送至一对一聊天室） |
| `room` | string | ❌ | 聊天室 ID（若指定，`receiver` 会被忽略） |
| `$pattern$` | string | ❌ | 样板变数的替换值 |

#### 范例请求

**基本批次发送**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "系统公告：明天将进行例行维护",
    push: true,
    sender: "system",
    paras: [
      { receiver: "user-a" },
      { receiver: "user-b" },
      { receiver: "user-c" },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**使用样板变数**

讯息中以 `$pattern$` 包裹的变数会被替换为每个接收者对应的值：

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "Hi $name$，您的订单 $orderId$ 已出货！",
    push: true,
    sender: "system",
    paras: [
      {
        receiver: "user-a",
        "$name$": "Alice",
        "$orderId$": "ORD-001",
      },
      {
        receiver: "user-b",
        "$name$": "Bob",
        "$orderId$": "ORD-002",
      },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**发送至指定聊天室**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "活动提醒：明天 14:00 开始",
    sender: "system",
    paras: [
      { room: "room-001" },
      { room: "room-002" },
      { room: "room-003" },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**成功回应（200 OK）**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| `RC` | number | 回应代码（0 表示成功） |
| `RM` | string | 回应讯息 |
| `result.batchID` | string | 批次任务 ID |
| `result.count` | number | 接收者数量 |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "batchID": "batch-20260410-abc123",
    "count": 3
  }
}
```

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- **无效的 API 金钥** — 提供的 `IM-API-KEY` 无效或已过期
- **缺少必填参数** — 未提供 `message`、`messageType` 或 `paras`
- **接收者不存在** — `paras` 中的 `receiver` 不存在
- **伺服器内部错误** — 伺服器端发生未预期的错误

------

## 使用场景

### 广播通知
- **系统公告**：向所有用户推送维护通知或重要公告
- **活动推播**：向特定用户群发送活动或优惠讯息

### 个人化讯息
- **样板讯息**：透过 `$pattern$` 变数，发送包含个人资讯的通知（如订单编号、用户名称）
- **帐务通知**：发送帐单到期、付款成功等个人化通知

------

## 注意事项

- **非同步处理**：批次讯息会加入处理伫列，回应仅表示任务已建立
- **样板替换**：变数名称需以 `$` 包裹，如 `$name$`，替换适用于 `message` 和 `extra` 栏位
- **接收者优先顺序**：若 `paras` 中同时指定 `receiver` 和 `room`，`room` 优先
- **推播预设关闭**：`push` 预设为 `false`，需明确设为 `true` 才会推播
