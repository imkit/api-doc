# Mute Member

## Overview

The mute specified chatroom functionality allows users to temporarily stop receiving notifications from specific chatrooms without affecting their participation permissions in that chatroom. This feature is suitable for temporarily reducing distractions or filtering notifications from unimportant chatrooms.

------

## API Endpoint

### Mute Specified Chatroom

Set chatroom mute status for a specified client.

```http
POST /admin/clients/{uid}/mute/{room}
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

**Mute a specific chatroom**

```http
POST /admin/clients/aaa/mute/demo?limit=10&skip=100 HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.7) GCDHTTPRequest
Content-Length: 0
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
    "mute": ["demo"],
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
    "updatedAt": "2020-10-09T15:11:17.153Z",
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

------

## Use Cases

### Notification Management
- **Reduce distractions**: Temporarily stop receiving notifications from specific chatrooms
- **Focus on work**: Mute unimportant chatrooms during important work periods
- **Night mode**: Automatically mute all chatrooms during nighttime

### User Experience Optimization
- **Personal preferences**: Adjust notification settings according to personal preferences
- **Context switching**: Quickly adjust notification status in different usage scenarios
- **Batch management**: Uniformly manage notification settings for multiple chatrooms

### Management Functions
- **Backend control**: Administrators can set chatroom muting for specific users
- **User support**: Assist users in resolving notification-related issues
- **System maintenance**: Temporarily mute notifications during system maintenance

------

## Important Notes

- **Affects notifications only**: Muting only stops notification pushes and does not affect normal interactions within chatrooms
- **Administrator permissions**: This API requires administrator permissions and API Key
- **Persistent settings**: Mute settings are permanently saved until manually cancelled
- **Array updates**: Each mute operation adds the new chatroom ID to the mute array
- **Query parameters**: The API supports limit and skip parameters, but they do not affect the mute functionality itself
- **Immediate effect**: Mute settings take effect immediately without requiring re-login