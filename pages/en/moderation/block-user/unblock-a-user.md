# Unblock a User

## Overview

Remove the block status on a specified user, restoring their ability to have direct chats with the current user. After unblocking, both parties can send private messages again, but this will not affect the interaction status in group chatrooms. This feature is suitable for correcting accidental blocks or re-establishing contact.

------

## API Endpoint

### Unblock a Specified User

Remove the specified user from the block list, restoring direct chat functionality.

```http
DELETE /blockStatus/my/{blockee}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description               |
| --------- | ------ | -------- | ------------------------- |
| `blockee` | string | ✅        | ID of the user to unblock |

#### Example Request

**Unblock a specific user**

```http
DELETE /blockStatus/my/ddd HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**Unblock another user**

```http
DELETE /blockStatus/my/user123 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/blockStatus/my/${blockee}`,
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
curl -X "DELETE" "https://your-app.imkit.io/blockStatus/my/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Unblock status information          |

**Unblock Status Object Structure**

| Parameter   | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `appID`     | string | Application ID                           |
| `blockee`   | object | Detailed information of unblocked user   |
| `blocker`   | string | ID of the user who performed the unblock |
| `room`      | string | Associated chatroom ID                   |
| `createdAt` | string | Original block creation time             |
| `updatedAt` | string | Unblock time                             |

**Unblocked User Object Structure**

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
- **Accidental Block Correction**: Unblock users who were blocked by mistake
- **Relationship Improvement**: Re-establish contact with users after a previous conflict
- **Second Chance**: Give blocked users an opportunity for a fresh start

### Management Flexibility
- **Dynamic Management**: Adjust block status based on changing circumstances
- **Temporary Blocking**: Restore normal contact after a short-term block
- **Testing Purposes**: Validate block functionality during development and testing

### User Experience Optimization
- **Convenient Operation**: Provide a simple way to unblock users
- **Immediate Effect**: Chat functionality is restored immediately after unblocking
- **Status Synchronization**: Ensure block status is synchronized across all platforms

------

## Notes

- **Bidirectional Unblock**: After unblocking, both parties can send private messages again
- **Non-Existence Handling**: Attempting to unblock a non-existent block relationship will return a 404 error
- **Immediate Effect**: The unblock operation takes effect immediately with no waiting required
- **Chatroom Association**: Unblocking does not affect the existence of the associated chatroom
- **History Retention**: Unblocking does not delete previous chat history
- **Group Unaffected**: Unblocking does not affect interaction status in group chats
