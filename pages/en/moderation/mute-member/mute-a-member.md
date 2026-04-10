# Mute a Member

## Overview

An administrator mutes a specific chatroom's notifications for a specified user. After muting, the user will no longer receive push notifications from that chatroom, but their participation permissions in the chatroom are not affected. This feature is suitable for administrators to manage notification preferences on behalf of users.

------

## API Endpoint

### Mute a Specified Chatroom

Set the mute status for a specified client's chatroom.

```http
POST /admin/clients/{uid}/mute/{room}
```

#### Headers

| Parameter    | Type   | Required | Description |
| ------------ | ------ | -------- | ----------- |
| `IM-API-KEY` | string | ✅        | API Key     |

#### Path Parameters

| Parameter | Type   | Required | Description  |
| --------- | ------ | -------- | ------------ |
| `uid`     | string | ✅        | Client ID    |
| `room`    | string | ✅        | Chatroom ID  |

#### Example Request

**Mute a specific chatroom**

```http
POST /admin/clients/aaa/mute/demo HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: your-app.imkit.io
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/admin/clients/${uid}/mute/${room}`,
  {},
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients/{uid}/mute/{room}" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Updated client data                 |

**Client Data Object Structure**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `mute`            | array  | List of muted chatroom IDs             |
| `isRobot`         | bool   | Whether this is a bot                   |
| `_id`             | string | Client unique ID                        |
| `appID`           | string | Application ID                          |
| `description`     | string | Client description                      |
| `avatarUrl`       | string | Avatar URL                              |
| `nickname`        | string | Nickname                                |
| `email`           | string | Email address                           |
| `address`         | object | Connection address information          |
| `userAgent`       | string | User agent string                       |
| `updatedAt`       | string | Last updated time                       |
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
- **Reduce Disturbances**: Temporarily stop receiving notifications from specific chatrooms
- **Focus on Work**: Mute less important chatrooms during critical work periods
- **Night Mode**: Automatically mute all chatrooms during nighttime hours

### User Experience Optimization
- **Personal Preferences**: Adjust notification settings based on individual preferences
- **Context Switching**: Quickly adjust notification status for different usage contexts
- **Batch Management**: Centrally manage notification settings for multiple chatrooms

### Administrative Functions
- **Backend Control**: Administrators can set chatroom mute status for specific users
- **User Support**: Help users resolve notification-related issues
- **System Maintenance**: Temporarily mute notifications during system maintenance

------

## Notes

- **Notifications Only**: Muting only stops push notifications and does not affect normal interactions within the chatroom
- **Admin Permission**: This API requires administrator permissions and an API Key
- **Persistent Setting**: The mute setting is permanently saved until manually cancelled
- **Array Update**: Each mute operation adds the new chatroom ID to the mute array
- **Query Parameters**: The API supports limit and skip parameters, but they do not affect the mute functionality itself
- **Immediate Effect**: The mute setting takes effect immediately without requiring re-login
