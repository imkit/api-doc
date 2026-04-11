# Send a Message

## Overview

Send a message to a specified room via the platform management API. You can specify the sender identity, making it suitable for scenarios such as system notifications, bot messages, and backend automation.

------

## API Endpoint

### Send a Room Message

Send a message to a specified room as a specified sender.

```http
POST /messages
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | Message content |
| `messageType` | string | ✅ | Message type (e.g., `"text"`, `"image"`, `"announcement"`, etc.) |
| `room` | string | ✅ | Room ID |
| `sender` | string | ✅ | Sender user ID |
| `push` | boolean | ❌ | Whether to send push notifications to room members, defaults to `true` |
| `skipTotalBadge` | boolean | ❌ | Whether to skip calculating the sender's total unread count, defaults to `false` |
| `mentions` | array[string] | ❌ | Array of mentioned user IDs |

#### Example Request

**Send a text message**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "system",
    message: "歡迎加入專案討論群！",
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

**Send an announcement message**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "admin",
    message: "系統將於今晚 22:00 進行維護",
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

**Send a message with mentions**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "user-a",
    message: "請 @user-b 確認這份文件",
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

**Send a message without push notification**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "system",
    message: "背景任務完成",
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

##### cURL Example

```bash
curl -X "POST" "https://your-app.imkit.io/messages" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "room": "project-room-001",
  "sender": "system",
  "message": "歡迎加入！",
  "messageType": "text"
}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Sent message data |

**Message Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | Message unique identifier |
| `room` | string | Room ID the message belongs to |
| `message` | any | Message content |
| `messageType` | string | Message type |
| `sender` | string | Sender ID |
| `appID` | string | Application identifier |
| `messageTimeMS` | number | Message sent time (millisecond timestamp) |
| `updatedAtMS` | number | Message updated time (millisecond timestamp) |
| `createdAtMS` | number | Message created time (millisecond timestamp) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58bf8f1dc3b24c04d19d9add",
    "room": "project-room-001",
    "message": "歡迎加入專案討論群！",
    "messageType": "text",
    "sender": "system",
    "appID": "SampleApp",
    "messageTimeMS": 1488949021290,
    "updatedAtMS": 1488949021290,
    "createdAtMS": 1488949021290
  }
}
```

#### Error Response

**401 Unauthorized** — Authentication failed

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

**404 Not Found** — Room does not exist

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

## Use Cases

### System Notifications
- **System announcements**: Automatically send system announcements or maintenance notifications from the backend service
- **Status updates**: Automatically notify relevant users when an order status changes

### Bot Messages
- **Auto-replies**: Implement chatbot functionality through the API
- **Smart assistant**: Receive messages via Webhook and respond accordingly

### Application Integration
- **Third-party integration**: Send events from external systems as messages to rooms
- **Workflows**: Insert room notifications at key points in business processes

------

## Notes

- **Sender identity**: `sender` must be an existing user ID in the system
- **Push control**: Use the `push` parameter to control whether push notifications are sent; suitable for silent notification scenarios
- **Message type**: `messageType` is a custom field that can be set to any type based on application requirements
- **Mentions feature**: User IDs in the `mentions` array will receive mention notifications
- **Difference from Socket**: This API is designed for backend services to send messages; regular user chat is handled by the SDK via Socket connections
