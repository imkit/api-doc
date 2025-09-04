# Unmute Member

## Overview

The unmute member functionality allows administrators to remove the mute status of a specific client for a specified chatroom, restoring that client's notification reception for the chatroom. This feature corresponds to the mute member functionality and is suitable for restoring notifications, re-enabling reminders, and chatroom management.

------

## API Endpoint

### Remove Chatroom Mute for Specified Client

Remove the mute status of a specified client for a specific chatroom.

```http
DELETE /admin/clients/{uid}/mute/{room}
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | API Key |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `uid` | string | ✅ | Client ID |
| `room` | string | ✅ | Chatroom ID |

#### Example Request

**Unmute a specific chatroom**

```http
DELETE /admin/clients/aaa/mute/demo?limit=10&skip=100 HTTP/1.1
IM-API-KEY: fangho_imkit_0412_2018_001_apikey
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.7) GCDHTTPRequest
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Updated client data |

**Client Data Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `mute` | array | List of muted chatroom IDs |
| `isRobot` | bool | Whether it's a robot |
| `_id` | string | Client unique identifier |
| `appID` | string | Application identifier |
| `description` | string | Client description |
| `avatarUrl` | string | Avatar URL |
| `nickname` | string | Nickname |
| `email` | string | Email address |
| `address` | object | Connection address information |
| `userAgent` | string | User agent string |
| `updatedAt` | string | Last update time |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "mute": [],
    "isRobot": false,
    "_id": "aaa",
    "__v": 0,
    "appID": "SampleApp",
    "description": "description la la #1541926309694",
    "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
    "nickname": "AAA",
    "email": "arielle.mckellar@coolgoose.ca",
    "address": {
      "address": "::1",
      "family": "IPv6",
      "port": 50392
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "updatedAt": "2020-10-09T15:11:34.216Z",
    "id": "aaa",
    "lastLoginTimeMS": 1583726632592
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
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

**404 Not Found** - Client does not exist

```json
{
  "RC": 404,
  "RM": "Client not found",
  "error": {
    "code": "CLIENT_NOT_FOUND",
    "message": "The specified client does not exist"
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
    "message": "The specified room does not exist"
  }
}
```

**400 Bad Request** - Chatroom is not muted

```json
{
  "RC": 400,
  "RM": "Room is not muted",
  "error": {
    "code": "ROOM_NOT_MUTED",
    "message": "The specified room is not in the mute list"
  }
}
```

------

## Use Cases

### Notification Restoration
- **Re-enable reminders**: Restore notification pushes for specific chatrooms
- **Work time adjustments**: Restore notifications for important chatrooms during work hours
- **Context switching**: Restore notification settings based on different usage scenarios

### User Experience Management
- **Personal preference adjustments**: Adjust notification settings based on user needs
- **Temporary mute removal**: Remove temporarily set mute status
- **Batch management**: Uniformly restore notification settings for multiple chatrooms

### Management Functions
- **Backend control**: Administrators help users restore chatroom notifications
- **User support**: Resolve notification-related issues for users
- **System maintenance**: Restore notification functionality after system maintenance completion

------

## Important Notes

- **Administrator permissions**: This API requires administrator permissions and API Key
- **Status removal**: Unmuting removes the chatroom ID from the mute array
- **Immediate effect**: Unmuting takes effect immediately, users will start receiving notifications
- **Empty array**: After successfully removing all mutes, the mute array becomes empty
- **Query parameters**: The API supports limit and skip parameters, but they do not affect the unmute functionality
- **Persistent settings**: The unmuted status is permanently saved
- **Notification restoration**: After unmuting, users will resume receiving notifications from that chatroom