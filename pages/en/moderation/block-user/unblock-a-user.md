# Unblock User

## Overview

Remove the block status for a specified user, restoring their ability to direct chat with the current user. After unblocking, both parties can send private messages again, but it will not affect interactions in group chatrooms. This feature is suitable for correcting mistaken operations or re-establishing contact relationships.

------

## API Endpoint

### Unblock a Specified User

Remove a specified user from the block list, restoring direct chat functionality.

```http
DELETE /blockStatus/my/{blockee}
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `blockee` | string | ✅ | User ID to unblock |

#### Example Request

**Unblock a specific user**

```http
DELETE /blockStatus/my/ddd HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**Unblock another user**

```http
DELETE /blockStatus/my/user123 HTTP/1.1
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
| `result` | object | Unblock status information |

**Unblock Status Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `appID` | string | Application identifier |
| `blockee` | object | Detailed information of the unblocked user |
| `blocker` | string | User ID who performed the unblock |
| `room` | string | Associated chatroom ID |
| `createdAt` | string | Original block creation time |
| `updatedAt` | string | Unblock time |

**Unblocked User Object Structure**

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
      "_id": "ddd",
      "nickname": "Dina",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
      "id": "ddd",
      "lastLoginTimeMS": 1628095079328
    },
    "blocker": "aaa",
    "room": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
    "createdAt": "2021-08-04T15:18:07.649Z",
    "updatedAt": "2021-08-04T15:18:07.649Z"
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

**404 Not Found** - Block relationship does not exist

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists with this user"
  }
}
```

**400 Bad Request** - Invalid parameters

```json
{
  "RC": 400,
  "RM": "Invalid user ID",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## Use Cases

### Relationship Repair
- **Correct mistakes**: Remove users who were blocked by mistake
- **Relationship improvement**: Re-establish contact with previously conflicted users
- **Second chances**: Give blocked users a chance to start over

### Management Flexibility
- **Dynamic management**: Adjust block status based on changing situations
- **Temporary blocking**: Restore normal contact after short-term blocking
- **Testing purposes**: Verify blocking functionality during development and testing

### User Experience Optimization
- **Convenient operation**: Provide simple unblocking methods
- **Immediate effect**: Chat functionality is restored immediately after unblocking
- **Status synchronization**: Ensure block status is synchronized across all platforms

------

## Important Notes

- **Bilateral unblocking**: After unblocking, both parties can send private messages again
- **Non-existent handling**: Attempting to unblock a non-existent block relationship will return a 404 error
- **Immediate effect**: Unblock operation takes effect immediately, no waiting required
- **Chatroom association**: Unblocking does not affect the existence status of related chatrooms
- **History preservation**: Unblocking does not delete previous chat history
- **Group non-impact**: Unblocking does not affect interaction status in group chats