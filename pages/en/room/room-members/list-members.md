# List Members

## Overview

Retrieve the member list of a specified room. This API uses the same endpoint `GET /rooms/{id}` as [Get a Room](/en/room/room-management/get-a-room), and the returned room data includes the complete `members` array and `memberProperties` member attributes.

------

## API Endpoint

### Get Room Details (Including Member List)

Query the complete information of a specified room, including detailed data for all members.

```http
GET /rooms/{id}
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

#### Example Request

```http
GET /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Host: your-app.imkit.io
Connection: close
User-Agent: Paw/3.0.14 (Macintosh; OS X/10.11.6) GCDHTTPRequest
```

**JavaScript Example:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30`,
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
curl -X "GET" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                |
| -------- | ------ | ---------------------- |
| `RC`     | number | Response code (0 indicates success) |
| `RM`     | string | Response message       |
| `result` | object | Room details           |

**Room Details Object Structure**

| Parameter           | Type   | Description                       |
| ------------------- | ------ | --------------------------------- |
| `_id`               | string | Room unique identifier            |
| `appID`             | string | Application identifier            |
| `description`       | string | Room description                  |
| `lastMessage`       | object | Last message information          |
| `memberProperties`  | array  | Member properties list (unread count, last read) |
| `members`           | array  | Member details list               |
| `unread`            | number | Unread message count for the current user |
| `isSuperuser`       | bool   | Whether the current user is a superuser |

**Member Object Structure**

| Parameter         | Type   | Description                       |
| ----------------- | ------ | --------------------------------- |
| `_id`             | string | Member unique identifier          |
| `nickname`        | string | Member nickname                   |
| `avatarUrl`       | string | Member avatar URL                 |
| `lastLoginTime`   | string | Last login time (ISO format)      |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp) |

**Member Properties Object Structure**

| Parameter  | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| `client`   | string | Member client ID                  |
| `badge`    | number | Unread message count              |
| `lastRead` | string | Last read message ID              |

#### Example Response

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
- **Member list**: Display detailed information for all members in a room
- **Member monitoring**: View member login status and activity levels
- **Permission check**: Confirm the current user's permission level in the room

### Room Information
- **Room status**: Retrieve the complete status information of a room
- **Unread statistics**: View individual and overall unread message statistics
- **Latest message**: Retrieve the last message in the room

### Application Integration
- **Data synchronization**: Synchronize room member and status information
- **UI display**: Provide complete display data for the room interface
- **Analytics**: Analyze member engagement and activity levels in the room

------

## Notes

- **Member permissions**: Only room members can view the detailed information
- **Data completeness**: The response includes complete information for both the member list and member properties
- **Unread calculation**: memberProperties contains the unread message count for each member
- **Permission identification**: The isSuperuser field identifies whether the current user is an administrator
- **Time formats**: Both ISO format and millisecond timestamps are provided
- **Data volume**: Large rooms may return a significant amount of member data; be mindful of processing performance
- **Real-time updates**: Member status and unread counts may need to be refreshed periodically to stay current
