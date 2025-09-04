# List Blocked Users

## Overview

Retrieve the complete block list of the current user, displaying detailed information of all blocked users. This API provides users with the functionality to manage their personal block list, including viewing basic information of blocked users, block times, and related chatroom information, suitable for users to view and manage their own privacy settings.

------

## API Endpoint

### Get Block List

Obtain detailed information of all block relationships created by the current user.

```http
GET /blockStatus/my
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### Example Request

**Get complete block list**

```http
GET /blockStatus/my HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Block list data |

**Result Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `data` | array | Block relationship list array |

**Block Relationship Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `blockee` | object | Detailed information of the blocked user |
| `blocker` | string | User ID who performed the block |
| `room` | object | Detailed information of the associated chatroom |
| `createdAt` | string | Block creation time |
| `updatedAt` | string | Block update time |

**Blocked User Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | User unique identifier |
| `nickname` | string | User nickname |
| `avatarUrl` | string | User avatar URL |
| `id` | string | User ID |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp) |

**Chatroom Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | Chatroom unique identifier |
| `roomType` | string | Chatroom type (direct/group) |
| `id` | string | Chatroom ID |
| `createdTimeMS` | number | Chatroom creation time (millisecond timestamp) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "blockee": {
          "_id": "ccc",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
          "nickname": "Cathy",
          "id": "ccc",
          "lastLoginTimeMS": 1600006869368
        },
        "blocker": "aaa",
        "room": {
          "_id": "2bec603e94a210092439e83ff2d79ac1",
          "roomType": "direct",
          "id": "2bec603e94a210092439e83ff2d79ac1",
          "createdTimeMS": 1628089206798
        },
        "createdAt": "2021-08-04T15:18:10.735Z",
        "updatedAt": "2021-08-04T15:18:10.735Z"
      },
      {
        "blockee": {
          "_id": "ddd",
          "nickname": "Dina",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
          "id": "ddd",
          "lastLoginTimeMS": 1628094314986
        },
        "blocker": "aaa",
        "room": {
          "_id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "roomType": "direct",
          "id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "createdTimeMS": 1628089213796
        },
        "createdAt": "2021-08-04T15:18:07.649Z",
        "updatedAt": "2021-08-04T15:18:07.649Z"
      }
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

**403 Forbidden** - Insufficient permissions

```json
{
  "RC": 403,
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to access this resource"
  }
}
```

------

## Use Cases

### Personal Privacy Management
- **Block list viewing**: View all currently blocked users
- **Privacy settings management**: Unified viewing and management of personal privacy status
- **Relationship status confirmation**: Confirm the block status of specific users

### User Experience Optimization
- **List management interface**: Provide complete blocked user management functionality
- **Quick unblocking**: Quickly select users to unblock from the list
- **Status synchronization**: Ensure consistency of block lists across all platforms

### System Administration
- **Behavior tracking**: Understand user blocking behavior patterns
- **Relationship analysis**: Analyze interaction relationships between users
- **Data statistics**: Gather statistics on block feature usage

------

## Important Notes

- **Own list only**: Can only view block relationships created by the currently authenticated user
- **Complete information provided**: Contains detailed information of blocked users and related chatrooms
- **Time sorting**: Usually displayed sorted by block time
- **Chatroom types**: Supports block relationships for both direct chat (direct) and group chat (group)
- **Real-time**: Returns the current latest block list status
- **Empty list handling**: If no users are blocked, returns an empty array