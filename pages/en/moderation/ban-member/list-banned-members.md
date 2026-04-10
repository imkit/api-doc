# List Banned Members

## Overview

Retrieve the ban list for a specified chatroom, displaying detailed information for all banned users in that chatroom. Only the chatroom owner has the permission to view the ban list (limited to group chatrooms with an owner). This feature is suitable for chatroom owners to review and manage the ban status of a chatroom.

------

## API Endpoint

### Get Chatroom Ban List

Retrieve detailed information about all banned users in a specified chatroom.

```http
GET /blockStatus/room/{roomID}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `roomID`  | string | ✅        | Chatroom ID   |

#### Example Request

**Get the chatroom ban list**

```http
GET /blockStatus/room/demo-room HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/blockStatus/room/${roomID}`,
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
curl -X "GET" "https://your-app.imkit.io/blockStatus/room/{roomID}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Ban list data                       |

**Result Object Structure**

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `data`    | array | Ban record array     |

**Ban Record Object Structure**

| Parameter   | Type   | Description                                |
| ----------- | ------ | ------------------------------------------ |
| `blockee`   | object | Detailed information of banned user        |
| `blocker`   | object | Detailed information of banning user       |
| `room`      | object | Chatroom detailed information              |
| `createdAt` | string | Ban creation time                          |
| `updatedAt` | string | Ban update time                            |

**Banned User Object Structure**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | User unique ID                          |
| `nickname`        | string | User nickname                           |
| `avatarUrl`       | string | User avatar URL                         |
| `id`              | string | User ID                                 |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp) |

**Banning User Object Structure**

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
| `roomType`      | string | Chatroom type (group, etc.)                |
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
        "blocker": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093717",
          "nickname": "Alecia",
          "id": "aaa",
          "lastLoginTimeMS": 1583726632592
        },
        "room": {
          "_id": "demo-room",
          "roomType": "group",
          "id": "demo-room",
          "createdTimeMS": 1525001412492
        },
        "createdAt": "2021-08-04T16:08:53.057Z",
        "updatedAt": "2021-08-04T16:08:53.057Z"
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
    "message": "Only room owner can view blocklist in group chat rooms"
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

### Chatroom Management
- **Ban Status Review**: Chatroom owners view the current ban list
- **Member Management**: View detailed information about banned users and ban records
- **Management Decisions**: Make subsequent management decisions based on the ban list

### Permission Management
- **Owner Exclusive**: Only chatroom owners can view the ban list
- **Privacy Protection**: Protect ban information from unauthorized users
- **Permission Verification**: Ensure viewing permissions comply with chatroom settings

### Record Tracking
- **Ban History**: View the time records of ban operations
- **User Information**: Obtain detailed information about banned users and banning users
- **Chatroom Status**: Understand the ban management status of the chatroom

------

## Notes

- **Permission Restriction**: Only chatroom owners can view the ban list (limited to group chatrooms with an owner)
- **Chatroom Type**: This feature is primarily for group chatrooms that have a designated owner
- **Complete Information**: Returns complete information about banned users, banning users, and the chatroom
- **Time Records**: Includes ban creation and update timestamps
- **Data Structure**: Returns an array format, supporting multiple ban records
- **Empty List Handling**: Returns an empty array if no users have been banned in the chatroom
