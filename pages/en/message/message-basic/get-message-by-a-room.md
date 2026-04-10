# Get Messages by Room

## Overview

Retrieve the message history of a specified chatroom, with support for time range filtering and pagination. This API uses the same endpoint `GET /rooms/{id}/messages/v3` as [List Messages](/en/message/message-basic/list-messages). This page focuses on common query scenarios and examples.

------

## API Endpoint

### Get All Messages in a Chatroom

Retrieve message records from a specified chatroom, with support for pagination and time filtering.

```http
GET /rooms/{id}/messages/v3
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `id`      | string | ✅        | Chatroom ID   |

#### Query Parameters

| Parameter          | Type   | Required | Description                                                         |
| ------------------ | ------ | -------- | ------------------------------------------------------------------- |
| `limit`            | number | ❌        | Maximum number of messages to return (default: 20, recommended 50-100) |
| `beforeMessage`    | string | ❌        | Retrieve messages before the specified message ID (for backward pagination) |
| `afterMessage`     | string | ❌        | Retrieve messages after the specified message ID (for forward pagination) |
| `afterTime`        | string | ❌        | Retrieve messages after the specified time (ISO-8601 or millisecond timestamp format) |
| `timeRangeField`   | string | ❌        | Field used for time range queries: updatedAt, createdAt, messageTime (default: updatedAt) |

#### Example Request

**Get latest messages in a chatroom**

```http
GET /rooms/demo-room/messages/v3?limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**Get historical messages (pagination)**

```http
GET /rooms/demo-room/messages/v3?limit=50&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**Get messages after a specific time**

```http
GET /rooms/demo-room/messages/v3?afterTime=2024-01-01T00:00:00Z&limit=100 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/demo-room/messages/v3`,
  {
    params: {
      limit: 50,
    },
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "GET" "https://your-app.imkit.io/rooms/demo-room/messages/v3?limit=50" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Message query results               |

**Query Result Structure**

| Parameter          | Type   | Description                                        |
| ------------------ | ------ | -------------------------------------------------- |
| `totalCount`       | number | Total number of messages in the chatroom           |
| `data`             | array  | Message array (sorted by time)                     |
| `userDeletedIDs`   | array  | Array of message IDs deleted by the current user   |
| `inspect`          | object | Diagnostic information (includes query conditions and execution time) |

**Message Object Structure**

| Parameter        | Type    | Description                              |
| ---------------- | ------- | ---------------------------------------- |
| `_id`            | string  | Message unique ID                        |
| `message`        | any     | Message content                          |
| `room`           | string  | Associated chatroom ID                   |
| `sender`         | object  | Sender information                       |
| `messageType`    | string  | Message type                             |
| `messageTimeMS`  | number  | Message sent time (millisecond timestamp) |
| `updatedAtMS`    | number  | Message updated time (millisecond timestamp) |
| `createdAtMS`    | number  | Message created time (millisecond timestamp) |
| `reactions`      | array   | Message reaction list                    |
| `reactionCount`  | number  | Total number of reactions                |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 245,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "status": { "$ne": 0 }
      },
      "tookMS": 8
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Hello everyone! Welcome to our chat room.",
        "room": "demo-room",
        "sender": {
          "_id": "user123",
          "nickname": "Alice",
          "avatarUrl": "https://example.com/avatar1.jpg",
          "id": "user123",
          "lastLoginTimeMS": 1640995200000
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1640995200000,
        "updatedAtMS": 1640995200001,
        "createdAtMS": 1640995200001,
        "reactionCount": 0
      }
    ],
    "userDeletedIDs": []
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

**403 Forbidden** - Insufficient permissions

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "User is not a member of this room"
  }
}
```

**404 Not Found** - Chatroom does not exist

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room with specified ID does not exist"
  }
}
```

------

## Use Cases

### Chatroom Loading
- **Initial Load**: Load the latest messages when a user enters a chatroom
- **History Browsing**: User scrolls up to view earlier message history
- **Refresh**: Reload the complete conversation content of a chatroom

### Message Synchronization
- **Offline Sync**: Sync missed messages when a user comes back online
- **Cross-Device Sync**: Maintain message consistency across multiple devices
- **Backup Recovery**: Restore a chatroom's complete history from a backup

### Content Analysis
- **Conversation Analysis**: Analyze conversation patterns and trending topics in chatrooms
- **Activity Statistics**: Track the message volume and user engagement in chatrooms
- **Content Moderation**: Review all conversation content in a chatroom

------

## Notes

- **Permission Requirement**: Only chatroom members can retrieve message content
- **Pagination Recommendation**: Use an appropriate limit value (20-100) to avoid loading too much data at once
- **Time Ordering**: Messages are sorted by updatedAt time, with the latest messages first
- **Deletion Handling**: The userDeletedIDs array contains messages deleted by the current user and should be filtered in the UI
- **Performance Optimization**: For large chatrooms, it is recommended to use time range restrictions to improve query performance
- **Real-Time Updates**: This API is suitable for batch loading; for real-time messages, use a WebSocket connection
