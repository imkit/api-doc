# List Messages

## Overview

Query message records from a specified chatroom, with support for time ranges, pagination, and multiple sorting methods. This API uses the same endpoint `GET /rooms/{id}/messages/v3` as [Get Messages by Room](/en/message/message-basic/get-message-by-a-room). This page provides complete parameter descriptions and advanced query examples.

------

## API Endpoint

### Get Chatroom Message List (V3)

Query message records from a specified chatroom, sorted by update time.

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

| Parameter        | Type   | Required | Description                                                              |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------ |
| `beforeMessage`  | string | ❌        | Retrieve messages before the specified message ID                        |
| `afterMessage`   | string | ❌        | Retrieve messages after the specified message ID                         |
| `limit`          | number | ❌        | Maximum number of messages in the response, default is 20                |
| `afterTime`      | string | ❌        | Retrieve messages after the specified time (ISO-8601 format or millisecond timestamp) |
| `timeRangeField` | string | ❌        | Time field used for time range queries (updatedAt/createdAt/messageTime), default is updatedAt |

#### Example Request

**Basic Query**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=10&afterTime=2020-10-15T03:50:04Z HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

**Paginated Query**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=20&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**Time Range Query**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?afterTime=1602817267000&timeRangeField=messageTime&limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/messages/v3`,
  {
    params: {
      limit: 10,
      afterTime: "2020-10-15T03:50:04Z",
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
curl -X "GET" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/messages/v3?limit=10&afterTime=2020-10-15T03:50:04Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter         | Type   | Description                         |
| ----------------- | ------ | ----------------------------------- |
| `RC`              | number | Response code (0 indicates success) |
| `RM`              | string | Response message                    |
| `result`          | object | Query results                       |

**Query Result Object Structure**

| Parameter         | Type   | Description                                                   |
| ----------------- | ------ | ------------------------------------------------------------- |
| `totalCount`      | number | Total number of messages in the chatroom                      |
| `data`            | array  | Array of messages matching the criteria                       |
| `userDeletedIDs`  | array  | Array of message IDs deleted by the current user (UI should hide these messages) |
| `inspect`         | object | Diagnostic information                                        |

**Message Object Structure**

| Parameter        | Type   | Description                              |
| ---------------- | ------ | ---------------------------------------- |
| `_id`            | string | Message unique ID                        |
| `message`        | any    | Message content                          |
| `room`           | string | Associated chatroom ID                   |
| `sender`         | object | Sender information                       |
| `messageType`    | string | Message type                             |
| `messageTimeMS`  | number | Message sent time (millisecond timestamp) |
| `updatedAtMS`    | number | Message updated time (millisecond timestamp) |
| `createdAtMS`    | number | Message created time (millisecond timestamp) |
| `reactions`      | array  | Message reactions array                  |
| `reactionCount`  | number | Total number of reactions                |
| `isDeleted`      | bool   | Whether the message has been deleted     |

**Sender Object Structure**

| Parameter         | Type   | Description                                 |
| ----------------- | ------ | ------------------------------------------- |
| `_id`             | string | User unique ID                              |
| `nickname`        | string | User nickname                               |
| `description`     | string | User description                            |
| `avatarUrl`       | string | User avatar URL                             |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp)     |

#### Example Response

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

**403 Forbidden** - Insufficient permissions or chatroom does not exist

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

**404 Not Found** - Chatroom does not exist

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
- **Chat History**: Display historical messages of a chatroom
- **Message Search**: Find specific messages by time range
- **Paginated Loading**: Implement pagination for the message list

### Synchronization and Backup
- **Message Sync**: Synchronize the latest message updates
- **Offline Backup**: Back up chatroom message data
- **Data Analysis**: Analyze chatroom activity and interactions

### Application Integration
- **Message Export**: Export chat records to other systems
- **Content Moderation**: Review and manage chatroom content
- **Statistical Analysis**: Calculate message counts and user activity

------

## Notes

- **Sorting Method**: V3 version uses updatedAt time sorting, which is more accurate than message ID sorting
- **Time Format**: Supports ISO-8601 format or millisecond timestamps
- **Paginated Queries**: Use beforeMessage or afterMessage for pagination
- **User Permissions**: Only chatroom members can query messages
- **Deleted Messages**: Messages in userDeletedIDs should be hidden in the UI
- **Diagnostic Information**: The inspect object provides diagnostic information about query performance and conditions
- **Default Limit**: When limit is not specified, the default response includes 20 messages
