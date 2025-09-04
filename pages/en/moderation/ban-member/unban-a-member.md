# Unban Member

## Overview

Remove the ban status for a specified user in a chatroom, restoring their normal activity permissions in that chatroom. Only chatroom owners have the permission to unban (limited to group chatrooms with owners). After unbanning, the user can interact and send messages in the chatroom again.

------

## API Endpoint

### Unban a Specified User in a Chatroom

Remove a specified user from the chatroom's ban list, restoring their activity permissions in that chatroom.

```http
DELETE /blockStatus/room/{roomID}/{blockee}
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
| `blockee` | string | ✅ | User ID to unban |

#### Example Request

**Unban a specific user**

```http
DELETE /blockStatus/room/demo-room/ccc HTTP/1.1
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
| `result` | object | Unban status information |

**Unban Status Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `appID` | string | Application identifier |
| `blockee` | object | Detailed information of the unbanned user |
| `blocker` | string | User ID who performed the ban |
| `room` | string | Chatroom ID |
| `createdAt` | string | Original ban creation time |
| `updatedAt` | string | Unban time |

**Unbanned User Object Structure**

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
    "message": "Only room owner can unblock users in group chat rooms"
  }
}
```

**404 Not Found** - Ban relationship does not exist

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists for this user in the specified room"
  }
}
```

**400 Bad Request** - Invalid parameters

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## Use Cases

### Chatroom Management
- **Remove ban**: Chatroom owners remove ban status from users
- **Management decisions**: Adjust ban policies based on changing situations
- **Member restoration**: Restore users' normal participation permissions in chatrooms

### Permission Management
- **Owner exclusive**: Only chatroom owners can remove bans
- **Permission restoration**: Restore users' full activity permissions in the chatroom
- **Management flexibility**: Provide flexible ban management mechanisms

### Relationship Repair
- **Correct misjudgments**: Remove bans that were imposed due to misjudgments
- **Situation improvement**: Restore permissions after user behavior improvement
- **Reconciliation mechanism**: Provide pathways for repairing relationships between chatroom members

------

## Important Notes

- **Permission restrictions**: Only chatroom owners can perform unban operations (limited to group chatrooms with owners)
- **Chatroom type**: This feature mainly targets group chatrooms, and the chatroom must have an owner
- **Immediate effect**: Unban status takes effect immediately, users can participate in chatrooms immediately
- **Ban scope**: Unbanning is limited to the specified chatroom and does not affect ban status in other chatrooms
- **Non-existent handling**: Attempting to remove a non-existent ban relationship will return a 404 error
- **Record keeping**: Unban operations update the timestamp of ban records