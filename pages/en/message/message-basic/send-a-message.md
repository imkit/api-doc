# Send Message

## Overview

Send messages to specified rooms via API. Supports multiple message types, mentions, and message updates. This API is suitable for scenarios requiring message sending through backend services, different from real-time messaging via Socket.

------

## API Endpoint

### Send Room Message

Send new message or update existing message to specified room.

```http
POST /rooms/{roomId}/message
```

#### Headers

| Parameter         | Type   | Required | Description  |
| ----------------- | ------ | -------- | ------------ |
| `IM-CLIENT-KEY`   | string | ✅        | Client Key   |
| `Authorization`   | string | ✅        | Client Token |

#### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `roomId`  | string | ✅        | Room ID     |

#### Post Body

| Parameter     | Type   | Required | Description                                         |
| ------------- | ------ | -------- | --------------------------------------------------- |
| `message`     | any    | ✅        | Message content (can be text, object, any format)  |
| `messageType` | string | ✅        | Custom message type                                 |
| `_id`         | string | ❌        | Message ID (when provided, updates existing message) |
| `mentions`    | array  | ❌        | Array of mentioned user IDs                         |

#### Sample Request

**Send Text Message**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "Hello everyone!",
  "messageType": "text"
}
```

**Send Announcement Message**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "hhhooo",
  "messageType": "announcement"
}
```

**Send Message with Mentions**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "Hello @user1 and @user2!",
  "messageType": "text",
  "mentions": ["user1", "user2"]
}
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `RC`      | number | Response code (0 means success) |
| `RM`      | string | Response message                 |
| `result`  | object | Sent message data                |

**Message Object Structure**

| Parameter        | Type   | Description                         |
| ---------------- | ------ | ----------------------------------- |
| `_id`            | string | Message unique identifier           |
| `room`           | string | Room ID                             |
| `message`        | any    | Message content                     |
| `messageType`    | string | Message type                        |
| `sender`         | object | Sender information                  |
| `appID`          | string | Application identifier              |
| `messageTimeMS`  | number | Message send time (millisecond timestamp) |
| `updatedAtMS`    | number | Message update time (millisecond timestamp) |
| `createdAtMS`    | number | Message creation time (millisecond timestamp) |

#### Sample Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58bf8f1dc3b24c04d19d9add",
    "room": "58871b877390be11d5f1ab30",
    "message": "hhhooo",
    "messageType": "announcement",
    "sender": null,
    "appID": "SampleApp",
    "__v": 0,
    "messageTimeMS": 1488949021290,
    "updatedAtMS": 1488949021290,
    "createdAtMS": 1488949021290
  }
}
```

#### Error Response

**401 Unauthorized** - Authentication failed

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**403 Forbidden** - Insufficient permissions or room does not exist

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "Client is not in the room or room does not exist"
  }
}
```

**400 Bad Request** - Invalid request parameters

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_MESSAGE_FORMAT",
    "message": "Message content or type is invalid"
  }
}
```

------

## Use Cases

### Backend Service Integration
- **System Notifications**: Automatically send system announcements or notifications from backend services
- **Bot Messages**: Implement chatbot functionality via API
- **Bulk Messaging**: Programmatically send large volumes of messages

### Message Management
- **Announcement Publishing**: Send important announcements or system messages
- **Mention Notifications**: Send messages with user mentions to trigger notifications
- **Message Updates**: Update existing messages by providing _id parameter

### Application Integration
- **Third-party Integration**: Send external system data as messages to rooms
- **Auto-reply**: Implement automated customer service or Q&A functionality
- **Workflow**: Insert room notifications in workflows

------

## Notes

- **Member Permissions**: Only room members can send messages
- **Message Format**: message field supports any format, can be text, JSON objects, etc.
- **Message Type**: messageType is a custom field, can be set according to application requirements
- **Mention Feature**: Users in mentions array will receive mention notifications
- **Message Update**: When _id parameter is provided, updates existing message instead of creating new one
- **API vs Socket**: This API is for backend services, regular user chat should use Socket connections