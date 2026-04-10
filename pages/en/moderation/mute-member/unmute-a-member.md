# Unmute a Member

## Overview

An administrator unmutes a specific chatroom for a specified user, restoring the user's notification reception for that chatroom. This feature is the counterpart to "Mute a Member."

------

## API Endpoint

### Unmute a Specified Client's Chatroom

Remove the mute status on a specific chatroom for a specified client.

```http
DELETE /admin/clients/{uid}/mute/{room}
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

**Unmute a specific chatroom**

```http
DELETE /admin/clients/aaa/mute/demo HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: your-app.imkit.io
```

**JavaScript Example:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${uid}/mute/${room}`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/admin/clients/{uid}/mute/{room}" \
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
- **Re-Enable Reminders**: Restore push notifications for specific chatrooms
- **Work Hours Adjustment**: Restore notifications for important chatrooms during work hours
- **Context Switching**: Restore notification settings based on different usage contexts

### User Experience Management
- **Personal Preference Adjustment**: Adjust notification settings based on user needs
- **Temporary Mute Removal**: Remove a temporarily set mute status
- **Batch Management**: Centrally restore notification settings for multiple chatrooms

### Administrative Functions
- **Backend Control**: Administrators help users restore chatroom notifications
- **User Support**: Resolve user notification-related issues
- **System Maintenance**: Restore notification functionality after system maintenance is complete

------

## Notes

- **Admin Permission**: This API requires administrator permissions and an API Key
- **Status Removal**: Unmuting removes the chatroom ID from the mute array
- **Immediate Effect**: Unmuting takes effect immediately; the user will start receiving notifications
- **Empty Array**: After successfully unmuting all chatrooms, the mute array becomes empty
- **Query Parameters**: The API supports limit and skip parameters, but they do not affect the unmute functionality
- **Persistent Setting**: The unmuted status is permanently saved
- **Notification Restoration**: After unmuting, the user will resume receiving notifications from that chatroom
