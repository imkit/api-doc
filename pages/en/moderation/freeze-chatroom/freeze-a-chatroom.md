# Freeze Chatroom

## Overview

The freeze chatroom functionality temporarily suspends or disables chatroom usage by updating the chatroom status. When the chatroom status is set to invalid (status=0), the chatroom will be frozen, and users will not be able to interact normally within it. This feature is suitable for content management, violation handling, and chatroom maintenance.

------

## API Endpoint

### Freeze Specified Chatroom

Freeze a chatroom by updating its status to make it invalid.

```http
PUT /rooms/{id}
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `Authorization` | string | ✅ | Client Token |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `id` | string | ✅ | Chatroom ID |

#### Post Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `status` | number | ✅ | Chatroom status: 0=Invalid (frozen), 1=Valid |

#### Example Request

**Freeze chatroom**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "status": 0
}
```

**Unfreeze chatroom**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "status": 1
}
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Updated chatroom data |

**Chatroom Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | Chatroom unique identifier |
| `name` | string | Chatroom name |
| `cover` | string | Chatroom cover image URL |
| `description` | string | Chatroom description |
| `status` | number | Chatroom status (0=frozen, 1=normal) |
| `lastMessage` | object | Last message information |
| `members` | array | Chatroom member list |

#### Example Response

**Chatroom frozen successfully**

```json
{
  "RC": 0,
  "RM": "Room frozen successfully",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Test Room",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "This room has been frozen",
    "status": 0,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "Last message before freeze",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
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
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can freeze room"
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
    "message": "Room with specified ID does not exist"
  }
}
```

------

## Use Cases

### Content Management
- **Violation handling**: Temporarily freeze chatrooms that violate community standards
- **Emergency situations**: Quickly block chatrooms during emergency incidents
- **Content review**: Temporarily freeze chatrooms for content review

### Chatroom Maintenance
- **System maintenance**: Temporarily freeze chatrooms during system maintenance
- **Feature updates**: Temporarily disable during chatroom feature updates
- **Data migration**: Pause chatroom usage during data migration

### Management Operations
- **Batch management**: Batch freeze or unfreeze multiple chatrooms
- **Permission control**: Ensure only authorized users can perform freeze operations
- **Status tracking**: Monitor chatroom freeze status and history

------

## Important Notes

- **Permission restrictions**: Only chatroom owners, managers, or platform administrators can perform freeze operations
- **Status impact**: Frozen chatrooms (status=0) cannot be used normally
- **User experience**: During freezing, users may not be able to send messages or interact
- **Immediate effect**: Status changes take effect immediately, affecting all chatroom members
- **Reversible operation**: Chatroom freeze can be lifted by setting status=1
- **Data preservation**: Freezing chatrooms does not delete message history and member data
- **Notification mechanism**: Freeze operations may trigger related notifications or events