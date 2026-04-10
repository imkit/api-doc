# List Blocked Users

## Overview

Retrieve the current user's complete block list, displaying detailed information for all blocked users. This API provides users with the ability to manage their personal block list, including viewing blocked users' basic information, block times, and related chatroom information. It is suitable for users to review and manage their privacy settings.

------

## API Endpoint

### Get Block List

Retrieve detailed information about all block relationships created by the current user.

```http
GET /blockStatus/my
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Example Request

**Get the complete block list**

```http
GET /blockStatus/my HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/blockStatus/my`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "GET" "https://your-app.imkit.io/blockStatus/my" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Block list data                     |

**Result Object Structure**

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `data`    | array | Block relationship array   |

**Block Relationship Object Structure**

| Parameter   | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `blockee`   | object | Detailed information of blocked user     |
| `blocker`   | string | ID of the user who performed the block   |
| `room`      | object | Detailed information of associated chatroom |
| `createdAt` | string | Block creation time                      |
| `updatedAt` | string | Block update time                        |

**Blocked User Object Structure**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | User unique ID                          |
| `nickname`        | string | User nickname                           |
| `avatarUrl`       | string | User avatar URL                         |
| `id`              | string | User ID                                 |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp) |

**Chatroom Object Structure**

| Parameter       | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| `_id`           | string | Chatroom unique ID                         |
| `roomType`      | string | Chatroom type (direct/group)               |
| `id`            | string | Chatroom ID                                |
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
- **Block List Review**: View all currently blocked users
- **Privacy Settings Management**: Review and manage personal privacy status in one place
- **Relationship Status Confirmation**: Confirm the block status of a specific user

### User Experience Optimization
- **List Management Interface**: Provide a complete blocked user management feature
- **Quick Unblock**: Quickly select users to unblock from the list
- **Status Synchronization**: Ensure block list consistency across all platforms

### System Management
- **Behavior Tracking**: Understand user blocking behavior patterns
- **Relationship Analysis**: Analyze interaction relationships between users
- **Data Statistics**: Track usage statistics of the block feature

------

## Notes

- **Own List Only**: Users can only view block relationships they have created
- **Complete Information**: Includes detailed information about blocked users and associated chatrooms
- **Time Sorting**: Typically sorted by block time
- **Chatroom Types**: Supports block relationships for both direct chats and group chats
- **Real-Time**: Returns the current latest block list status
- **Empty List Handling**: Returns an empty array if no users have been blocked
