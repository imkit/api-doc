# Mute Room Notification

## Overview

This endpoint allows the current user to mute notifications for a specified room. Once muted, new messages in that room will no longer trigger push notifications. This is a personal preference setting that only affects the current user and does not impact other members.

------

## API Endpoint

### Mute Room Notification
Mute a specified room to stop receiving push notifications.

```http
POST /me/mute/:room
```

#### Headers

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `:room` | string | ✅ | Unique room ID |

No request body is required for this API.

#### Example Request

**cURL:**

```bash
curl -X "POST" "http://localhost:3100/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {YOUR_CLIENT_KEY}' \
     -H 'IM-Authorization: {YOUR_TOKEN}'
```

**JavaScript:**

```javascript
const response = await axios.post(
  `http://localhost:3100/me/mute/${roomID}`,
  null,
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
| `RC` | number | Response code (0 means success) |
| `RM` | string | Response message |
| `result` | object | Updated current user data |
| `result._id` | string | User unique ID |
| `result.nickname` | string | User display name |
| `result.email` | string | User email |
| `result.mute` | array[string] | Array of muted room IDs (room added after muting) |

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
    "mute": ["58871b877390be11d5f1ab30"],
    "lastLoginTimeMS": 1487068306745
  }
}
```

#### Error Response

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified room does not exist
- Internal server error

------

## Use Cases

- **Stop notifications for a specific room**: When a user does not want to be disturbed by messages in a room, they can mute it
- **Unmute**: To unmute a room, use the [Unmute Room Notification](./unmute-room-notification) API

------

## Notes

- **Personal preference**: The mute setting only affects the current user. Other members' notifications are not impacted.
- **Mute state**: After a successful request, the room ID is added to the `mute` array in the response, which represents all rooms currently muted by the user.
