# List Members

## Overview

Get detailed information of a specified chat room, including complete member list, member properties and room-related data. This API provides comprehensive room status information, suitable for member management, room monitoring and data synchronization.

------

## API Endpoint

### Get Room Details (Including Member List)

Query comprehensive information of a specified room, including detailed data of all members.

```http
GET /rooms/{id}
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

#### Request Example

```http
GET /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Host: localhost:3100
Connection: close
User-Agent: Paw/3.0.14 (Macintosh; OS X/10.11.6) GCDHTTPRequest
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `RC`      | number | Response code (0 for success) |
| `RM`      | string | Response message               |
| `result`  | object | Room detailed information      |

**Room Details Object Structure**

| Parameter           | Type   | Description                                      |
| ------------------- | ------ | ------------------------------------------------ |
| `_id`               | string | Room unique identifier                           |
| `appID`             | string | Application identifier                           |
| `description`       | string | Room description                                 |
| `lastMessage`       | object | Last message information                         |
| `memberProperties`  | array  | Member properties list (unread count, last read)|
| `members`           | array  | Detailed member information list                 |
| `unread`            | number | Current user's unread message count              |
| `isSuperuser`       | bool   | Whether current user is super user               |

**Member Object Structure**

| Parameter         | Type   | Description                       |
| ----------------- | ------ | --------------------------------- |
| `_id`             | string | Member unique identifier          |
| `nickname`        | string | Member nickname                   |
| `avatarUrl`       | string | Member avatar URL                 |
| `lastLoginTime`   | string | Last login time (ISO format)     |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp) |

**Member Properties Object Structure**

| Parameter  | Type   | Description                     |
| ---------- | ------ | ------------------------------- |
| `client`   | string | Member client ID                |
| `badge`    | number | Unread message count            |
| `lastRead` | string | Last read message ID            |

#### Response Example

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": 1111234,
      "messageType": "text",
      "sender": {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 0,
        "id": "1485248566481"
      },
      "messageTime": "2017-03-02T06:12:20.775Z",
      "messageTimeMS": 1488435140775,
      "id": "58b7b7c4c246bc0b41afb148"
    },
    "memberProperties": [
      {
        "badge": 5,
        "lastRead": "58b7a2c5f034920a878e9a53",
        "client": "1485248560558"
      },
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "1485248566481"
      },
      {
        "badge": 61,
        "client": "1485250743313"
      }
    ],
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTime": "2017-02-15T09:02:35.934Z",
        "lastLoginTimeMS": 1487149355934,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTime": "2017-03-02T07:11:40.398Z",
        "lastLoginTimeMS": 1488438700398,
        "id": "1485248566481"
      },
      {
        "_id": "1485250743313",
        "nickname": "Test 3",
        "lastLoginTime": "2017-03-02T07:18:31.436Z",
        "lastLoginTimeMS": 1488439111436,
        "id": "1485250743313"
      }
    ],
    "unread": 5,
    "description": "Sample Description",
    "isSuperuser": true,
    "id": "58871b877390be11d5f1ab30"
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

**403 Forbidden** - Insufficient permissions or not a member

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "You are not a member of this room"
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

### Member Management
- **Member List**: Display detailed information of all members in the room
- **Member Monitoring**: Check login status and activity level of members
- **Permission Check**: Verify current user's permission level in the room

### Room Information
- **Room Status**: Get comprehensive status information of the room
- **Unread Statistics**: View personal and overall unread message statistics
- **Latest Message**: Get information of the room's last message

### Application Integration
- **Data Synchronization**: Synchronize room members and status information
- **UI Display**: Provide complete display data for room interface
- **Analytics**: Analyze member engagement and activity level in the room

------

## Notes

- **Member Permissions**: Only room members can view detailed information
- **Data Completeness**: Response includes complete information of member list and member properties
- **Unread Calculation**: memberProperties contains unread message count for each member
- **Permission Identification**: isSuperuser field identifies whether current user is an administrator
- **Time Format**: Provides both ISO format and millisecond timestamp for time
- **Data Volume**: Large rooms may return substantial member data, pay attention to performance handling
- **Real-time**: Member status and unread count may need periodic updates to maintain real-time accuracy