# Remove a Member

## Overview

This endpoint allows you to remove one or more members from a specified room. If the current user's own ID is included in the `members` array, it means the current user is leaving the room voluntarily. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Remove a Member

Remove one or more members from a specified room.

```http
POST /rooms/:id/delete/members
```

#### Headers

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `:id` | string | ✅ | Unique room ID |

#### Post Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `members` | array[string] | ✅ | Array of member IDs to remove. If the current user's own ID is included, they will leave the room voluntarily. |
| `systemMessage` | boolean | ❌ | Whether to generate a `leaveRoom` or `deleteMember` system message. Default: `false` |

#### Example Request

**Example 1: Remove Specific Members**

**cURL:**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/delete/members" \
     -H 'IM-CLIENT-KEY: {YOUR_CLIENT_KEY}' \
     -H 'IM-Authorization: {YOUR_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"members": ["ccc", "bbb"], "systemMessage": true}'
```

**JavaScript:**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/delete/members`,
  {
    members: ["ccc", "bbb"],
    systemMessage: true,
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**Example 2: Current User Leaves the Room**

**JavaScript:**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/delete/members`,
  {
    members: [`${MY_CLIENT_ID}`],
    systemMessage: true,
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
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
| `result` | object | Updated room data with full details |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "lastMessage": {
      "_id": "58a2dc9c965d09221ea7bedb",
      "message": "sadf dsfdf",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0,
        "id": "1485248560558"
      },
      "messageTime": "2017-02-14T10:31:56.006Z",
      "messageTimeMS": 1487068316006,
      "id": "58a2dc9c965d09221ea7bedb"
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1487068306745,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 1486720993257,
        "id": "1485248566481"
      }
    ],
    "id": "demo-room"
  }
}
```

#### Error Response

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified room does not exist
- One or more IDs in `members` are not in the room
- Internal server error

------

## Use Cases

### Member Management
- **Remove members**: Administrators can remove one or more members from a room
- **Leave voluntarily**: Users can leave a room by including their own ID in the request

### System Notifications
- **Automatic notifications**: When `systemMessage: true`, the system generates a `leaveRoom` or `deleteMember` system message depending on the context

------

## Notes

- **Leaving voluntarily**: Including the current user's own ID in `members` is treated as voluntarily leaving the room.
- **System message type**: When `systemMessage: true`, the type is `leaveRoom` if the member left voluntarily, or `deleteMember` if they were removed by another user.
- Once removed, a member will no longer be able to access the room or its message history.
