# Freeze a Chatroom

## Overview

The freeze chatroom feature suspends or disables a chatroom by updating its status. When the chatroom status is set to inactive (status=0), the chatroom will be frozen and users will be unable to interact normally within it. This feature is suitable for content management, violation handling, and chatroom maintenance.

------

## API Endpoint

### Freeze a Specified Chatroom

Freeze a chatroom by updating its status to inactive.

```http
PUT /rooms/{id}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `id`      | string | ✅        | Chatroom ID   |

#### Post Body

| Parameter | Type   | Required | Description                                |
| --------- | ------ | -------- | ------------------------------------------ |
| `status`  | number | ✅        | Chatroom status: 0=inactive (frozen), 1=active |

#### Example Request

**Freeze a chatroom**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "status": 0
}
```

**Unfreeze a chatroom**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "status": 1
}
```

**JavaScript Example:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomId}`,
  {
    status: 0,
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL Example:**

```bash
curl -X "PUT" "https://your-app.imkit.io/rooms/{id}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"status": 0}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Updated chatroom data               |

**Chatroom Object Structure**

| Parameter       | Type   | Description                           |
| --------------- | ------ | ------------------------------------- |
| `_id`           | string | Chatroom unique ID                    |
| `name`          | string | Chatroom name                         |
| `cover`         | string | Chatroom cover image URL              |
| `description`   | string | Chatroom description                  |
| `status`        | number | Chatroom status (0=frozen, 1=active)  |
| `lastMessage`   | object | Last message information              |
| `members`       | array  | Chatroom member list                  |

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
- **Violation Handling**: Temporarily freeze chatrooms that violate community guidelines
- **Emergency Situations**: Quickly lock down a chatroom during emergency events
- **Content Review**: Temporarily freeze a chatroom for content review

### Chatroom Maintenance
- **System Maintenance**: Temporarily freeze chatrooms during system maintenance
- **Feature Updates**: Temporarily disable chatrooms during feature updates
- **Data Migration**: Suspend chatroom usage during data migration

### Administrative Operations
- **Batch Management**: Batch freeze or unfreeze multiple chatrooms
- **Permission Control**: Ensure only authorized users can perform freeze operations
- **Status Tracking**: Monitor chatroom freeze status and history

------

## Notes

- **Permission Restriction**: Only chatroom owners, administrators, or platform administrators can perform freeze operations
- **Status Impact**: A frozen chatroom (status=0) cannot be used normally
- **User Experience**: During the freeze period, users may be unable to send messages or interact
- **Immediate Effect**: The status change takes effect immediately, affecting all chatroom members
- **Reversible Operation**: A chatroom can be unfrozen by setting status=1
- **Data Preservation**: Freezing a chatroom does not delete historical messages or member data
- **Notification Mechanism**: Freeze operations may trigger related notifications or events
