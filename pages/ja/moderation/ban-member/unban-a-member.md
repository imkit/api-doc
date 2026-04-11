# Unban a Member

## Overview

Remove the ban on a specified user in a chatroom, restoring their normal activity permissions within that chatroom. Only the chatroom owner has the permission to unban users (limited to group chatrooms with an owner). After unbanning, the user can resume interactions and send messages in the chatroom.

------

## API Endpoint

### Unban a Specified User in a Chatroom

Remove a specified user from the chatroom's ban list, restoring their activity permissions in that chatroom.

```http
DELETE /blockStatus/room/{roomID}/{blockee}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description              |
| --------- | ------ | -------- | ------------------------ |
| `roomID`  | string | ✅        | Chatroom ID              |
| `blockee` | string | ✅        | ID of the user to unban  |

#### Example Request

**Unban a specific user**

```http
DELETE /blockStatus/room/demo-room/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/blockStatus/room/${roomID}/${blockee}`,
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
curl -X "DELETE" "https://your-app.imkit.io/blockStatus/room/{roomID}/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Unban status information            |

**Unban Status Object Structure**

| Parameter   | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| `appID`     | string | Application ID                          |
| `blockee`   | object | Detailed information of unbanned user   |
| `blocker`   | string | ID of the user who performed the ban    |
| `room`      | string | Chatroom ID                             |
| `createdAt` | string | Original ban creation time              |
| `updatedAt` | string | Unban time                              |

**Unbanned User Object Structure**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | User unique ID                          |
| `nickname`        | string | User nickname                           |
| `avatarUrl`       | string | User avatar URL                         |
| `id`              | string | User ID                                 |
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
- **Ban Removal**: Chatroom owners remove the ban status on users
- **Management Decisions**: Adjust ban policies based on changing circumstances
- **Member Restoration**: Restore a user's normal participation permissions in the chatroom

### Permission Management
- **Owner Exclusive**: Only chatroom owners can unban users
- **Permission Restoration**: Restore a user's full activity permissions in the chatroom
- **Management Flexibility**: Provide a flexible ban management mechanism

### Relationship Repair
- **Misjudgment Correction**: Unban users who were banned by mistake
- **Behavior Improvement**: Restore permissions after a user's behavior has improved
- **Reconciliation Mechanism**: Provide a pathway for repairing chatroom member relationships

------

## Notes

- **Permission Restriction**: Only chatroom owners can perform the unban operation (limited to group chatrooms with an owner)
- **Chatroom Type**: This feature is primarily for group chatrooms that have a designated owner
- **Immediate Effect**: The unban takes effect immediately; the user can resume activities in the chatroom right away
- **Ban Scope**: Unbanning is limited to the specified chatroom and does not affect ban status in other chatrooms
- **Non-Existence Handling**: Attempting to unban a non-existent ban relationship will return a 404 error
- **Record Keeping**: Unban operations update the timestamp of the ban record
