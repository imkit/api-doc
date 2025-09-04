# List Banned Members

## Overview

Retrieve the ban list of a specified chatroom, displaying detailed information of all banned users in that chatroom. Only chatroom owners have the permission to view the ban list (limited to group chatrooms with owners). This feature is suitable for chatroom owners to view and manage the ban status of their chatrooms.

------

## API Endpoint

### Get Chatroom Ban List

Obtain detailed information of all banned users in a specified chatroom.

```http
GET /blockStatus/room/{roomID}
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `roomID` | string | ✅ | Chatroom ID |

#### Example Request

**Get chatroom ban list**

```http
GET /blockStatus/room/demo-room HTTP/1.1
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
| `result` | object | Ban list data |

**Result Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `data` | array | Ban record list array |

**Ban Record Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `blockee` | object | Detailed information of the banned user |
| `blocker` | object | Detailed information of the user who performed the ban |
| `room` | object | Chatroom detailed information |
| `createdAt` | string | Ban creation time |
| `updatedAt` | string | Ban update time |

**Banned User Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | User unique identifier |
| `nickname` | string | User nickname |
| `avatarUrl` | string | User avatar URL |
| `id` | string | User ID |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp) |

**Banning User Object Structure**

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
| `roomType` | string | Chatroom type (group, etc.) |
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
- **Ban status viewing**: Chatroom owners view the current ban list
- **Member management**: View detailed information of banned users and ban records
- **Management decisions**: Make subsequent management decisions based on the ban list

### Permission Management
- **Owner exclusive**: Only chatroom owners can view the ban list
- **Privacy protection**: Protect ban information from being viewed by unauthorized users
- **Permission verification**: Ensure viewing permissions comply with chatroom settings

### Record Tracking
- **Ban history**: View time records of ban operations
- **User information**: Obtain detailed information of banned users and users who performed bans
- **Chatroom status**: Understand the ban management status of chatrooms

------

## Important Notes

- **Permission restrictions**: Only chatroom owners can view the ban list (limited to group chatrooms with owners)
- **Chatroom type**: This feature mainly targets group chatrooms, and the chatroom must have an owner
- **Complete information**: Returns complete information of banned users, executing users, and chatrooms
- **Time records**: Contains timestamps for ban creation and updates
- **Data structure**: Returns array format, supports multiple ban records
- **Empty list handling**: If no users are banned in the chatroom, returns an empty array