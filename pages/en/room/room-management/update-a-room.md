# Update Room

## Overview

Update information and settings of an existing chat room. This API allows modification of basic room information, permission settings, administrator configurations, etc. Limited to room owners, administrators, or platform administrators.

------

## API Endpoint

### Update Room Information

Modify properties and settings of a specified chat room.

```http
PUT /rooms/{id}
```

#### Headers

| Parameter       | Type   | Required | Description    |
| --------------- | ------ | -------- | -------------- |
| `IM-CLIENT-KEY` | string | ✅        | Client Key     |
| `Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `id`      | string | ✅        | Room ID     |

#### Post Body

| Parameter     | Type    | Required | Description                                                                         |
| ------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| `name`        | string  | ❌        | Room name                                                                           |
| `cover`       | string  | ❌        | Room cover image URL                                                                |
| `description` | string  | ❌        | Room description                                                                    |
| `roomTags`    | array   | ❌        | Shared room tags array                                                              |
| `webhook`     | string  | ❌        | Webhook key or URL                                                                  |
| `botMode`     | boolean | ❌        | Whether to enable room robot                                                        |
| `extParams`   | string  | ❌        | Extended custom parameters, format: param1=value1&param2=value2&...                |
| `opening`     | number  | ❌        | Opening status: 0=closed for joining or invitation, 1=open for joining and invitation |
| `owner`       | string  | ❌        | New owner client ID (limited to platform admin or room super user)                 |
| `managers`    | array   | ❌        | Manager client ID array (limited to platform admin or room super user)             |
| `status`      | number  | ❌        | Room status: 0=invalid, 1=valid                                                    |

#### Request Example

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "description": "Description La La",
  "name": "Martena",
  "cover": "http://loremflickr.com/240/240/style?Kelly"
}
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `RC`      | number | Response code (0 for success) |
| `RM`      | string | Response message               |
| `result`  | object | Updated room data              |

**Room Object Structure**

| Parameter     | Type   | Description               |
| ------------- | ------ | ------------------------- |
| `_id`         | string | Room unique identifier    |
| `name`        | string | Room name                 |
| `cover`       | string | Room cover image URL      |
| `description` | string | Room description          |
| `status`      | number | Room status               |
| `lastMessage` | object | Last message information  |
| `members`     | array  | Room member list          |

#### Response Example

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Martena",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "Description La La",
    "status": 1,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "hhhooo",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
      }
    ]
  }
}
```

#### Error Responses

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
  "RM": "Forbidden",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can update room"
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
    "message": "Room with specified ID does not exist"
  }
}
```

------

## Use Cases

### Room Management
- **Basic Information Maintenance**: Update room name, description, cover image
- **Permission Management**: Adjust room opening status and administrator configuration
- **Feature Settings**: Enable or disable bot mode

### Management Console
- **Batch Management**: Batch update room settings through management interface
- **Content Moderation**: Modify inappropriate room information
- **Ownership Transfer**: Transfer room ownership to other users

### System Integration
- **Webhook Configuration**: Set webhook endpoint for the room
- **Extension Parameters**: Integrate third-party systems through extParams
- **Status Management**: Enable or disable specific rooms

------

## Notes

- **Permission Restrictions**: Only room owners, administrators, or platform administrators can perform updates
- **Ownership Transfer**: Changing owner and managers requires higher permissions
- **Parameter Validation**: All parameters are optional, only provided fields are updated
- **Status Impact**: Setting status=0 will make the room invalid
- **Opening Settings**: opening parameter affects whether new users can join the room