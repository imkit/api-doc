# Get a Room

## Overview

This endpoint allows you to retrieve detailed information about a specified room, including the member list, last message, member properties (unread count, read position), and other complete data.

------

## API Endpoint

### Get Room Details

Retrieve the complete information of a specified room.

```http
GET /rooms/{id}
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | Client key |
| `IM-Authorization` | string | ✅ | Client token |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `id` | string | ✅ | Room ID |

#### Example Request

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/${roomId}`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

##### cURL Example

```bash
curl "https://your-app.imkit.io/rooms/project-room-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Complete room information |

**Room Object Fields**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | Room unique identifier |
| `appID` | string | Application identifier |
| `lastMessage` | object | Last message (including sender information) |
| `memberProperties` | array[object] | Member properties array (unread count, read position) |
| `members` | array[object] | Member details array |
| `unread` | number | Unread message count for the current user |
| `description` | string | Room description |
| `isSuperuser` | boolean | Whether the current user is a superuser |

**Member Properties Object**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `client` | string | Member user ID |
| `badge` | number | Unread message count |
| `lastRead` | string | Last read message ID |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "project-room-001",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": "最新的訊息內容",
      "messageType": "text",
      "sender": {
        "_id": "user-a",
        "nickname": "Alice",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1488435140775
    },
    "memberProperties": [
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "user-a"
      },
      {
        "badge": 5,
        "client": "user-b"
      }
    ],
    "members": [
      {
        "_id": "user-a",
        "nickname": "Alice",
        "avatarUrl": "https://example.com/alice.jpg",
        "lastLoginTimeMS": 1487149355934
      },
      {
        "_id": "user-b",
        "nickname": "Bob",
        "avatarUrl": "https://example.com/bob.jpg",
        "lastLoginTimeMS": 1488438700398
      }
    ],
    "unread": 5,
    "description": "專案討論群",
    "isSuperuser": false
  }
}
```

#### Error Response

**404 Not Found** — Room does not exist

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

### Room Information
- **Display details**: Retrieve the member list and basic information of a room
- **Unread status**: Query the unread message count and read position for each member

### Management Operations
- **Member verification**: Confirm whether a specific user is a member of a room
- **Status check**: Check the last activity time of a room

------

## Notes

- **Members only**: Only room members or platform administrators can retrieve room details
- **Complete data**: The response includes detailed information and properties for all members
- **Last message**: The `lastMessage` object includes the sender's complete information
- **Unread calculation**: The `unread` field represents the unread count for the currently authenticated user
