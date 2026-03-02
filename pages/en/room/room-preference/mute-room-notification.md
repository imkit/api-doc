# Mute Room Notification

This endpoint allows the current user to mute notifications for a specified room. Once muted, new messages in that room will no longer trigger push notifications. This is a personal preference setting that only affects the current user and does not impact other members.

## HTTP Request

```
POST /me/mute/:room
```

## Authentication

Include your client key and authorization token in the request headers:

| Header             | Description  | Required |
| ------------------ | ------------ | -------- |
| `IM-CLIENT-KEY`    | Client Key   | ✅        |
| `IM-Authorization` | Client Token | ✅        |

## Path Parameters

| Parameter | Type   | Description    | Required |
| --------- | ------ | -------------- | -------- |
| `:room`   | string | Unique room ID | ✅        |

No request body is required for this API.

## Examples

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

## Response

### Success Response

When the request succeeds, the API returns the updated current user data. The `mute` array will contain the newly muted room ID:

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

### Response Fields

| Field             | Type          | Description                                         |
| ----------------- | ------------- | --------------------------------------------------- |
| `RC`              | number        | Response code (0 means success)                     |
| `RM`              | string        | Response message                                    |
| `result`          | object        | Updated current user data                           |
| `result._id`      | string        | User unique ID                                      |
| `result.nickname` | string        | User display name                                   |
| `result.email`    | string        | User email                                          |
| `result.mute`     | array[string] | Array of muted room IDs (room added after muting)   |

## Error Handling

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified room does not exist
- Internal server error

## Notes

- **Personal preference**: The mute setting only affects the current user. Other members' notifications are not impacted.
- **Mute state**: After a successful request, the room ID is added to the `mute` array in the response, which represents all rooms currently muted by the user.
- To unmute a room, use the [Unmute Room Notification](./unmute-room-notification) API.
