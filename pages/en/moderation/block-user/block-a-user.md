# Block User

## Overview

Block a specified user to prevent them from direct chatting with the current user. After blocking, the blocked user will be unable to send private messages to the blocker, but it will not affect interactions in group chatrooms. This feature is suitable for preventing harassment and managing personal privacy.

------

## API Endpoint

### Block a Specified User

Add a specified user to the block list to prevent direct chatting.

```http
POST /blockStatus/my/{blockee}
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `blockee` | string | ✅ | User ID to block |

#### Example Request

**Block a specific user**

```http
POST /blockStatus/my/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**Block another user**

```http
POST /blockStatus/my/user123 HTTP/1.1
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
| `result` | object | Block status information |

**Block Status Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `appID` | string | Application identifier |
| `blockee` | object | Detailed information of the blocked user |
| `blocker` | string | User ID who performed the block |
| `room` | string | Associated chatroom ID |
| `createdAt` | string | Block creation time |
| `updatedAt` | string | Block update time |

**Blocked User Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | User unique identifier |
| `nickname` | string | User nickname |
| `avatarUrl` | string | User avatar URL |
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
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "2bec603e94a210092439e83ff2d79ac1",
    "createdAt": "2021-08-04T15:18:10.735Z",
    "updatedAt": "2021-08-04T16:35:41.341Z"
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

**404 Not Found** - User does not exist

```json
{
  "RC": 404,
  "RM": "User not found",
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The specified user does not exist"
  }
}
```

**400 Bad Request** - Cannot block yourself

```json
{
  "RC": 400,
  "RM": "Cannot block yourself",
  "error": {
    "code": "SELF_BLOCK_FORBIDDEN",
    "message": "Users cannot block themselves"
  }
}
```

**409 Conflict** - User already blocked

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already in your block list"
  }
}
```

------

## Use Cases

### Personal Privacy Protection
- **Prevent harassment**: Block inappropriate users from sending private messages
- **Privacy management**: Control who can directly contact you
- **Security protection**: Guard against persistent harassment from malicious users

### User Experience Improvement
- **Content filtering**: Avoid receiving unwanted message content
- **Environment purification**: Create a more comfortable chat environment
- **Focus on work**: Reduce unnecessary distractions and interruptions

### Community Management
- **Behavioral standards**: Take personal-level protective measures against violating users
- **Conflict resolution**: Handle personal conflicts between users
- **Self-management**: Allow users to manage their own social circles

------

## Important Notes

- **Direct chat only**: Blocking only affects private chats, does not affect interactions in group chatrooms
- **Bilateral effect**: After blocking takes effect, both parties cannot send private messages
- **Automatic chatroom creation**: Blocking will associate with the corresponding direct chatroom
- **Cannot self-block**: Cannot block your own account
- **Duplicate blocking**: Attempting to block an already blocked user will return a conflict error
- **Persistent status**: Block status will persist until manually unblocked