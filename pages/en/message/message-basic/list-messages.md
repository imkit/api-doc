# List Messages

## Overview

Query message records of specified room, supports time range, pagination and multiple sorting methods. This API uses message update time for sorting, providing more accurate message order. Suitable for message record queries, message search and room message browsing.

------

## API Endpoint

### Get Room Message List (V3)

Query message records of specified room, sorted by update time.

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

| Parameter        | Type   | Required | Description                                                                           |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| `beforeMessage`  | string | ❌        | Query messages before specified message ID                                            |
| `afterMessage`   | string | ❌        | Query messages after specified message ID                                             |
| `limit`          | number | ❌        | Response message limit, default value 20                                              |
| `afterTime`      | string | ❌        | Query messages after specified time (ISO-8601 format or millisecond timestamp)      |
| `timeRangeField` | string | ❌        | Time field used for range query (updatedAt/createdAt/messageTime), default updatedAt |

#### Sample Request

**Basic Query**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=10&afterTime=2020-10-15T03:50:04Z HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

**Pagination Query**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=20&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
```

**Time Range Query**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?afterTime=1602817267000&timeRangeField=messageTime&limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `RC`      | number | Response code (0 means success) |
| `RM`      | string | Response message                 |
| `result`  | object | Query result                     |

**Query Result Object Structure**

| Parameter        | Type   | Description                                              |
| ---------------- | ------ | -------------------------------------------------------- |
| `totalCount`     | number | Total message count in room                              |
| `data`           | array  | Array of qualifying messages                             |
| `userDeletedIDs` | array  | Array of message IDs deleted by current user (UI should hide these messages) |
| `inspect`        | object | Diagnostic information                                   |

**Message Object Structure**

| Parameter       | Type   | Description                                   |
| --------------- | ------ | --------------------------------------------- |
| `_id`           | string | Message unique identifier                     |
| `message`       | any    | Message content                               |
| `room`          | string | Room ID                                       |
| `sender`        | object | Sender information                            |
| `messageType`   | string | Message type                                  |
| `messageTimeMS` | number | Message send time (millisecond timestamp)    |
| `updatedAtMS`   | number | Message update time (millisecond timestamp)  |
| `createdAtMS`   | number | Message creation time (millisecond timestamp) |
| `reactions`     | array  | Message reaction array                        |
| `reactionCount` | number | Total reaction count                          |
| `isDeleted`     | bool   | Whether deleted                               |

**Sender Object Structure**

| Parameter         | Type   | Description                                   |
| ----------------- | ------ | --------------------------------------------- |
| `_id`             | string | User unique identifier                        |
| `nickname`        | string | User nickname                                 |
| `description`     | string | User description                              |
| `avatarUrl`       | string | User avatar URL                               |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp)      |

#### Sample Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 515,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "messageTime": {
          "$gt": "2020-10-15T03:50:04.000Z"
        }
      },
      "tookMS": 5
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Helloこんにちは SIKTMLNP 11:01:07",
        "room": "demo-room",
        "sender": {
          "_id": "sss",
          "nickname": "Elsa",
          "description": "description la la #1583637224106",
          "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
          "id": "sss",
          "lastLoginTimeMS": 1588744338369
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1602817267923,
        "updatedAtMS": 1602817267925,
        "createdAtMS": 1602817267925,
        "reactionCount": 0,
        "isDeleted": true
      }
    ],
    "userDeletedIDs": [
      "5f890cf37d980e06f6aaf349"
    ]
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

**404 Not Found** - Room does not exist

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

### Message Browsing
- **Chat History**: Display historical messages of room
- **Message Search**: Find specific messages based on time range
- **Pagination Loading**: Implement pagination functionality for message list

### Sync and Backup
- **Message Sync**: Sync latest message updates
- **Offline Backup**: Backup room message data
- **Data Analysis**: Analyze room activity and interaction

### Application Integration
- **Message Export**: Export chat records to other systems
- **Content Moderation**: Review and manage room content
- **Statistical Analysis**: Calculate message count and user activity

------

## Notes

- **Sorting Method**: V3 version uses updatedAt time sorting, more accurate than message ID sorting
- **Time Format**: Supports ISO-8601 format or millisecond timestamp
- **Pagination Query**: Use beforeMessage or afterMessage for pagination
- **User Permissions**: Only room members can query messages
- **Deleted Messages**: Messages in userDeletedIDs should be hidden in UI
- **Diagnostic Information**: inspect object provides diagnostic information about query performance and conditions
- **Default Limit**: Returns 20 messages by default when limit is not specified