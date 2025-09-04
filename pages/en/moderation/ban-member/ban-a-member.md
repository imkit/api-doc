# Ban Member

## Overview

Ban a specified user in a chatroom, preventing them from participating in that chatroom. This feature allows platform administrators and chatroom owners to manage members in group chatrooms. When a chatroom has an owner, only platform administrators and chatroom owners have this permission. After banning, the banned user will be unable to send messages or participate in interactions in that chatroom.

------

## API Endpoint

### Ban a Specified User in a Chatroom

Add a specified user to the chatroom's ban list, restricting their activity permissions in that chatroom.

```http
POST /blockStatus/room/{roomID}/{blockee}
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
| `blockee` | string | ✅ | User ID to ban |

#### Example Request

**Ban a specific user in a chatroom**

```http
POST /blockStatus/room/demo-room/ccc HTTP/1.1
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
| `result` | object | Ban status information |

**Ban Status Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `appID` | string | Application identifier |
| `blockee` | object | Detailed information of the banned user |
| `blocker` | string | User ID who performed the ban |
| `room` | string | Chatroom ID |
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

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093304",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "demo-room",
    "createdAt": "2021-08-04T16:08:53.057Z",
    "updatedAt": "2021-08-04T16:08:53.057Z"
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
    "message": "Only platform admin and room owner can block users in group chat rooms"
  }
}
```

**404 Not Found** - Chatroom or user does not exist

```json
{
  "RC": 404,
  "RM": "Resource not found",
  "error": {
    "code": "ROOM_OR_USER_NOT_FOUND",
    "message": "The specified room or user does not exist"
  }
}
```

**409 Conflict** - User already banned

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already blocked in this room"
  }
}
```

------

## Use Cases

### Chatroom Management
- **Member control**: Chatroom owners manage group member participation permissions
- **Violation handling**: Handle users who send inappropriate content in chatrooms
- **Order maintenance**: Maintain a good discussion environment in chatrooms

### Permission Management
- **Owner privileges**: Chatroom owners manage members
- **Platform management**: Platform administrators assist with chatroom management issues
- **Hierarchical management**: Users with different permission levels have different management capabilities

### Security Protection
- **Prevent harassment**: Block specific users from harassing other members in chatrooms
- **Content control**: Restrict users who send inappropriate content
- **Environment protection**: Protect healthy discussion environments in chatrooms

------

## Important Notes

- **Permission restrictions**: Only platform administrators and chatroom owners can perform this operation (limited to group chatrooms with owners)
- **Chatroom type**: This feature mainly targets group chatrooms, and the chatroom must have an owner
- **Ban scope**: Banning is limited to the specified chatroom and does not affect user permissions in other chatrooms
- **Immediate effect**: Ban status takes effect immediately, banned users cannot participate in that chatroom
- **Duplicate operations**: Attempting to ban an already banned user will return a conflict error
- **Record keeping**: All ban operations are recorded, including the executor and time information