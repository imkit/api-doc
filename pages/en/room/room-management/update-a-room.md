# Update a Room

## Overview

Update the information and settings of an existing room. This API allows modifying the room's basic information, permission settings, administrator configuration, and more. Only the room owner, administrators, or platform administrators can use this API.

------

## API Endpoint

### Update Room Information

Modify the properties and settings of a specified room.

```http
PUT /rooms/{id}
```

#### Headers

| Parameter       | Type   | Required | Description    |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅    | Room ID     |

#### Request Body

| Parameter     | Type    | Required | Description                                                   |
| ------------- | ------- | ---- | ------------------------------------------------------------- |
| `name`        | string  | ❌    | Room name                                                     |
| `cover`       | string  | ❌    | Room cover image URL                                          |
| `description` | string  | ❌    | Room description                                              |
| `roomTags`    | array   | ❌    | Shared room tags array                                        |
| `webhook`     | string  | ❌    | Webhook key or URL                                            |
| `botMode`     | boolean | ❌    | Whether to enable room bot                                    |
| `extParams`   | string  | ❌    | Extended custom parameters in the format: param1=value1&param2=value2&... |
| `opening`     | number  | ❌    | Open status: 0 = closed to joining or invitations, 1 = open to joining and invitations |
| `owner`       | string  | ❌    | New owner client ID (restricted to platform administrators or room superusers) |
| `managers`    | array   | ❌    | Manager client ID array (restricted to platform administrators or room superusers) |
| `status`      | number  | ❌    | Room status: 0 = inactive, 1 = active                        |

#### Example Request

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "description": "Description La La",
  "name": "Martena",
  "cover": "http://loremflickr.com/240/240/style?Kelly"
}
```

**JavaScript Example:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30`,
  {
    description: "Description La La",
    name: "Martena",
    cover: "http://loremflickr.com/240/240/style?Kelly",
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
curl -X "PUT" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"description": "Description La La", "name": "Martena", "cover": "http://loremflickr.com/240/240/style?Kelly"}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                |
| -------- | ------ | ---------------------- |
| `RC`     | number | Response code (0 indicates success) |
| `RM`     | string | Response message       |
| `result` | object | Updated room data      |

**Room Object Structure**

| Parameter       | Type   | Description             |
| --------------- | ------ | ------------------------- |
| `_id`           | string | Room unique identifier    |
| `name`          | string | Room name                 |
| `cover`         | string | Room cover image URL      |
| `description`   | string | Room description          |
| `status`        | number | Room status               |
| `lastMessage`   | object | Last message information  |
| `members`       | array  | Room member list          |

#### Example Response

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
- **Basic information maintenance**: Update room name, description, and cover image
- **Permission management**: Adjust room open status and administrator configuration
- **Feature settings**: Enable or disable bot mode

### Admin Console
- **Batch management**: Batch update room settings through the admin interface
- **Content moderation**: Modify inappropriate room information
- **Ownership transfer**: Transfer room ownership to another user

### System Integration
- **Webhook configuration**: Set up the room's webhook receiving endpoint
- **Extended parameters**: Integrate third-party systems via extParams
- **Status management**: Enable or disable specific rooms

------

## Notes

- **Permission restrictions**: Only the room owner, administrators, or platform administrators can perform updates
- **Ownership transfer**: Changing the owner and managers requires elevated permissions
- **Parameter validation**: All parameters are optional; only the provided fields will be updated
- **Status impact**: Setting status=0 will make the room inactive
- **Open setting**: The opening parameter controls whether new users can join the room
