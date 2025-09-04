# Get Messages by Room

## Overview

Retrieve all messages in a specified room, suitable for loading complete message history of a room. This API is based on room message query functionality, supports time range filtering and pagination, allowing users to fully browse conversation content in the room.

------

## API Endpoint

### Get All Room Messages

Retrieve message records from specified room, supports pagination and time filtering.

```http
GET /rooms/{id}/messages/v3
```

#### Headers

| Parameter          | Type   | Required | Description  |
| ------------------ | ------ | -------- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key   |
| `IM-Authorization` | string | ✅        | Client Token |

#### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `id`      | string | ✅        | Room ID     |

#### Query Parameters

| Parameter        | Type   | Required | Description                                                          |
| ---------------- | ------ | -------- | -------------------------------------------------------------------- |
| `limit`          | number | ❌        | Maximum number of messages to return (default: 20, recommend 50-100) |
| `beforeMessage`  | string | ❌        | Query messages before specified message ID (for forward pagination)  |
| `afterMessage`   | string | ❌        | Query messages after specified message ID (for backward pagination)  |
| `afterTime`      | string | ❌        | Query messages after specified time (ISO-8601 or millisecond timestamp format) |
| `timeRangeField` | string | ❌        | Time range query field: updatedAt, createdAt, messageTime (default: updatedAt) |

#### Sample Request

**Get Latest Room Messages**

```http
GET /rooms/demo-room/messages/v3?limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**Get Historical Messages (Pagination)**

```http
GET /rooms/demo-room/messages/v3?limit=50&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**Get Messages After Specific Time**

```http
GET /rooms/demo-room/messages/v3?afterTime=2024-01-01T00:00:00Z&limit=100 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `RC`      | number | Response code (0 means success) |
| `RM`      | string | Response message                 |
| `result`  | object | Message query result             |

**Query Result Structure**

| Parameter        | Type   | Description                                        |
| ---------------- | ------ | -------------------------------------------------- |
| `totalCount`     | number | Total number of messages in room                   |
| `data`           | array  | Message array (sorted by time)                     |
| `userDeletedIDs` | array  | Array of message IDs deleted by current user       |
| `inspect`        | object | Diagnostic information (query conditions and execution time) |

**Message Object Structure**

| Parameter       | Type   | Description                                     |
| --------------- | ------ | ----------------------------------------------- |
| `_id`           | string | Message unique identifier                       |
| `message`       | any    | Message content                                 |
| `room`          | string | Room ID                                         |
| `sender`        | object | Sender information                              |
| `messageType`   | string | Message type                                    |
| `messageTimeMS` | number | Message send time (millisecond timestamp)      |
| `updatedAtMS`   | number | Message update time (millisecond timestamp)    |
| `createdAtMS`   | number | Message creation time (millisecond timestamp)  |
| `reactions`     | array  | Message reactions list                          |
| `reactionCount` | number | Total reaction count                            |

#### Sample Response

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

**404 Not Found** - Room does not exist

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

### Room Loading
- **Initial Loading**: Load latest messages when user enters room
- **History Browsing**: User scrolls up to view earlier message records
- **Refresh**: Reload complete conversation content of room

### Message Synchronization
- **Offline Sync**: Sync missed messages when user comes back online
- **Cross-device Sync**: Maintain message consistency across multiple devices
- **Backup Recovery**: Recover complete room records from backup

### Content Analysis
- **Conversation Analysis**: Analyze conversation patterns and popular topics in room
- **Activity Statistics**: Count message volume and user participation in room
- **Content Moderation**: Review all conversation content in room

------

## Notes

- **Permission Requirements**: Only room members can retrieve message content
- **Pagination Recommendations**: Use appropriate limit values (20-100) to avoid loading too much data at once
- **Time Sorting**: Messages sorted by updatedAt time, latest messages first
- **Deletion Handling**: userDeletedIDs array contains messages deleted by current user, need to filter in UI
- **Performance Optimization**: Large rooms recommend using time range limits to improve query performance
- **Real-time Updates**: This API is for bulk loading, real-time messaging should use WebSocket connections