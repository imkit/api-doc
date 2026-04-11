# Remove a Member

## Overview

This endpoint allows you to remove one or more members from a specified room. If the current user's own ID is passed in the `members` array, it means the user is voluntarily leaving the room.

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
| `IM-CLIENT-KEY` | string | ✅ | Client key |
| `IM-Authorization` | string | ✅ | Client token |

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `:id` | string | ✅ | Room unique identifier |

#### Post Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `members` | array[string] | ✅ | Array of member IDs to remove; if the current user's own ID is included, it means the user is voluntarily leaving the room |
| `systemMessage` | boolean | ❌ | Whether to automatically generate a system message for the leave or removal (`leaveRoom` or `deleteMember`), defaults to `false` |

#### Example Request

**Example 1: Remove specific members**

**cURL Example:**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/delete/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"members": ["ccc", "bbb"], "systemMessage": true}'
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/delete/members`,
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

**Example 2: Current user voluntarily leaves the room**

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/delete/members`,
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
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Complete room information after the update |

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

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- Invalid client key or authorization token
- The specified room does not exist
- `members` contains a user ID that is not in the room
- Internal server error

------

## Use Cases

### Member Management
- **Remove members**: Administrators can remove one or more members from a room
- **Voluntarily leave**: Users can voluntarily leave a room by passing their own ID

### System Notifications
- **Automatic notification**: When `systemMessage: true` is set, the system automatically generates a system message of type `leaveRoom` or `deleteMember` depending on the context

------

## Notes

- **Voluntarily leaving**: Passing the current user's own ID in the `members` array means the user is voluntarily leaving the room
- **System messages**: When `systemMessage: true` is set, if the member leaves voluntarily, the system message type is `leaveRoom`; if the member is removed by others, the type is `deleteMember`
- After a member is removed, they will no longer be able to access any message history from that room
