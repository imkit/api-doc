# Delete Message

## Overview

Administrator-only message deletion feature that allows platform administrators, room owners and room managers to delete specified messages or clear all messages in an entire room. This function is suitable for content management, violation content cleanup and room maintenance.

------

## API Endpoint

### Delete Room Messages

Delete specific messages or all messages in a room, restricted to users with administrative permissions.

```http
DELETE /rooms/{roomID}/messages/{messageID}
```

#### Headers

| Parameter          | Type   | Required | Description  |
| ------------------ | ------ | -------- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key   |
| `IM-Authorization` | string | ✅        | Client Token |

#### Path Parameters

| Parameter   | Type   | Required | Description                                                    |
| ----------- | ------ | -------- | -------------------------------------------------------------- |
| `roomID`    | string | ✅        | Room ID                                                        |
| `messageID` | string | ✅        | Message ID to delete, or use `_all` to delete all messages in room |

#### Sample Request

**Delete Specific Message**

```http
DELETE /rooms/test-room-123/messages/5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```

**Delete All Messages in Room**

```http
DELETE /rooms/test-room-123/messages/_all HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `RC`      | number | Response code (0 means success) |
| `RM`      | string | Response message                 |
| `result`  | object | Deletion operation result        |

**Deletion Result Object Structure**

| Parameter      | Type   | Description                           |
| -------------- | ------ | ------------------------------------- |
| `deletedCount` | number | Number of deleted messages            |
| `roomID`       | string | Room ID                               |
| `messageID`    | string | Deleted message ID (or "_all")        |
| `deletedBy`    | string | User ID who performed deletion        |
| `deletedAt`    | string | Deletion time                         |

#### Sample Response

**Delete Single Message**

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

**Delete All Messages**

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
- **Violation Handling**: Delete inappropriate messages that violate community guidelines
- **Spam Messages**: Clean up advertisement or spam content
- **Sensitive Content**: Remove messages containing sensitive information

### Room Maintenance
- **Room Reset**: Clear room to restart conversation
- **Test Cleanup**: Clean up test messages in testing environment
- **Regular Maintenance**: Periodically clean up outdated message content

### Administrative Operations
- **Emergency Handling**: Quickly handle content that needs immediate removal
- **Bulk Cleanup**: Delete all messages in room at once
- **Permission Control**: Ensure only authorized users can perform deletion operations

------

## Notes

- **Permission Restrictions**: Limited to platform administrators, room owners and room managers
- **Permanent Deletion**: Messages cannot be recovered once deleted, use with caution
- **Bulk Deletion**: Using `_all` parameter will delete all messages in the room
- **Operation Records**: All deletion operations record the executor and time
- **Immediate Effect**: Deletion operations take effect immediately, all users will see messages disappear
- **Notification Mechanism**: Deletion operations may trigger related notifications or events
- **Different from Recall**: This is forced deletion, different from user-initiated recall functionality