# Batch Send Messages

## Overview

Send messages to multiple rooms or multiple users at once via the platform management API. Supports template variable substitution, making it suitable for broadcast notifications, marketing pushes, system announcements, and other scenarios.

------

## API Endpoint

### Batch Send Messages

Send messages to multiple rooms or users' one-on-one rooms.

```http
POST /messages/batch
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | Message content, supports `$pattern$` template substitution |
| `messageType` | string | ✅ | Message type (e.g., `"text"`) |
| `sender` | string | ❌ | Specified sender ID (admin only) |
| `push` | boolean | ❌ | Whether to enable push notifications, defaults to `false` |
| `skipTotalBadge` | boolean | ❌ | Skip calculating the sender's total unread count, defaults to `false` |
| `paras` | array[object] | ✅ | Recipient parameters array |

**Recipient Parameter Object**

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `receiver` | string | ❌ | Recipient user ID (sends to one-on-one room) |
| `room` | string | ❌ | Room ID (if specified, `receiver` is ignored) |
| `$pattern$` | string | ❌ | Replacement value for template variables |

#### Example Request

**Basic batch send**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "系統公告：明天將進行例行維護",
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

**Using template variables**

Variables wrapped in `$pattern$` in the message will be replaced with the corresponding value for each recipient:

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "Hi $name$，您的訂單 $orderId$ 已出貨！",
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

**Send to specific rooms**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "活動提醒：明天 14:00 開始",
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

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result.batchID` | string | Batch task ID |
| `result.count` | number | Number of recipients |

#### Example Response

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

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- **Invalid API key** — The provided `IM-API-KEY` is invalid or expired
- **Missing required parameters** — `message`, `messageType`, or `paras` was not provided
- **Recipient does not exist** — A `receiver` in `paras` does not exist
- **Internal server error** — An unexpected error occurred on the server side

------

## Use Cases

### Broadcast Notifications
- **System announcements**: Push maintenance notifications or important announcements to all users
- **Event promotions**: Send event or promotional messages to specific user groups

### Personalized Messages
- **Template messages**: Use `$pattern$` variables to send notifications containing personal information (such as order numbers, usernames)
- **Billing notifications**: Send personalized notifications for bill due dates, successful payments, etc.

------

## Notes

- **Asynchronous processing**: Batch messages are added to a processing queue; the response only indicates that the task has been created
- **Template substitution**: Variable names must be wrapped in `$`, e.g., `$name$`; substitution applies to both the `message` and `extra` fields
- **Recipient priority**: If both `receiver` and `room` are specified in `paras`, `room` takes priority
- **Push disabled by default**: `push` defaults to `false`; it must be explicitly set to `true` to enable push notifications
