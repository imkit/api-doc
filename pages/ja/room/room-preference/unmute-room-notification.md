# Unmute Room Notification

## Overview

This endpoint allows the current user to unmute a specified room, restoring push notifications for that room. This setting is a personal preference and only affects the current user, not other members.

------

## API Endpoint

### Unmute Room Notification
Unmute a specified room to resume receiving push notifications.

```http
DELETE /me/mute/:room
```

#### Headers

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | Client key |
| `IM-Authorization` | string | ✅ | Client token |

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `:room` | string | ✅ | Room unique identifier |

This API does not require a request body.

#### Example Request

**cURL Example:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript Example:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/me/mute/${roomID}`,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| --- | --- | --- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Updated current user information |
| `result._id` | string | User unique identifier |
| `result.nickname` | string | User display name |
| `result.email` | string | User email |
| `result.mute` | array[string] | Array of muted room IDs (removed after unmuting) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test AB",
    "appID": "SampleApp",
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 56216,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36",
    "mute": [],
    "lastLoginTimeMS": 1487068306745
  }
}
```

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- Invalid client key or authorization token
- The specified room does not exist
- Internal server error

------

## Use Cases

- **Restore room notifications**: When a user wants to resume receiving push notifications from a particular room, they can unmute it
- **Mute a room**: To mute a room, use the [Mute Room Notification](./mute-room-notification) API

------

## Notes

- **Personal preference**: The unmute setting only affects the current user; other members' notifications are not affected
- **Mute status**: After success, the room ID is removed from the `mute` array in the response, which represents all rooms currently muted by the user
