# Delete a Message

## Overview

An admin-only message deletion feature that allows platform administrators, room owners, and room managers to delete a specific message or clear all messages in a room. This feature is suitable for content management, violation content cleanup, and room maintenance.

------

## API Endpoint

### Delete Room Messages

Delete a specific message or all messages in a room. Restricted to users with administrative permissions.

```http
DELETE /rooms/{roomID}/messages/{messageID}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| Parameter   | Type   | Required | Description                                                  |
| ----------- | ------ | ---- | --------------------------------------------------- |
| `roomID`    | string | ✅    | Room ID                                              |
| `messageID` | string | ✅    | Message ID to delete, or use `_all` to delete all messages in the room |

#### Example Request

**Delete a specific message**

```http
DELETE /rooms/test-room-123/messages/5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Connection: close
```

**Delete all messages in a room**

```http
DELETE /rooms/test-room-123/messages/_all HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                |
| -------- | ------ | ---------------------- |
| `RC`     | number | Response code (0 indicates success) |
| `RM`     | string | Response message       |
| `result` | object | Deletion result        |

**Deletion Result Object Structure**

| Parameter      | Type   | Description                       |
| -------------- | ------ | ----------------------------- |
| `deletedCount` | number | Number of deleted messages         |
| `roomID`       | string | Room ID                            |
| `messageID`    | string | Deleted message ID (or "_all")     |
| `deletedBy`    | string | User ID who performed the deletion |
| `deletedAt`    | string | Deletion time                      |

#### Example Response

**Delete a single message**

```json
{
  "RC": 0,
  "RM": "Message deleted successfully",
  "result": {
    "deletedCount": 1,
    "roomID": "test-room-123",
    "messageID": "5f890cf37d980e06f6aaf349",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
  }
}
```

**Delete all messages**

```json
{
  "RC": 0,
  "RM": "All messages deleted successfully",
  "result": {
    "deletedCount": 145,
    "roomID": "test-room-123",
    "messageID": "_all",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
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
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSION",
    "message": "Only platform admin, room owner or room manager can delete messages"
  }
}
```

**404 Not Found** - Message or room does not exist

```json
{
  "RC": 404,
  "RM": "Message not found",
  "error": {
    "code": "MESSAGE_NOT_FOUND",
    "message": "The specified message does not exist in this room"
  }
}
```

**404 Not Found** - Room does not exist

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

### Content Management
- **Violation handling**: Delete messages that violate community guidelines
- **Spam**: Clean up advertising or spam content
- **Sensitive content**: Remove messages containing sensitive information

### Room Maintenance
- **Room reset**: Clear all messages to restart conversations in a room
- **Test cleanup**: Clean up test messages in testing environments
- **Periodic maintenance**: Periodically clean up outdated message content

### Administrative Operations
- **Emergency handling**: Quickly handle content that needs to be removed immediately
- **Bulk cleanup**: Delete all messages in a room at once
- **Access control**: Ensure only authorized users can perform deletion operations

------

## Notes

- **Permission restrictions**: Restricted to platform administrators, room owners, and room managers only
- **Permanent deletion**: Deleted messages cannot be recovered; use with caution
- **Bulk deletion**: Using the `_all` parameter deletes all messages in the room
- **Operation logging**: All deletion operations record the executor and time
- **Immediate effect**: Deletion operations take effect immediately; all users will see the message disappear
- **Notification mechanism**: Deletion operations may trigger related notifications or events
- **Difference from recall**: This feature is a forced deletion, which differs from user-initiated message recall
