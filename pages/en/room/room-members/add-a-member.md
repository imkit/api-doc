# Add a Member

## Overview

This endpoint allows you to add one or more users to a specified room. It supports an invitation confirmation mechanism and the option to automatically generate system message notifications.

------

## API Endpoint

### Add a Member

Add one or more users to a specified room.

```http
POST /rooms/:id/members
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
| `invitees` | array[string] | ✅ | Array of client IDs of members to add |
| `systemMessage` | boolean | ❌ | Whether to automatically generate a system message for the member addition, defaults to `false` |
| `invitationRequired` | boolean | ❌ | Whether the invitee must accept the invitation before joining, defaults to `false`. Only applicable to **group** rooms |

#### Example Request

**Example 1: Invite multiple members (invitation acceptance required)**

**cURL Example:**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"invitees": ["ccc", "bbb"], "invitationRequired": true, "systemMessage": true}'
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: true,
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

**Example 2: Add members directly (no invitation confirmation required)**

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: false,
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
    "name": "Demo",
    "cover": "http://loremflickr.com/240/240/style?demo",
    "description": "public demo room",
    "roomType": "group",
    "webhook": "meet-taipei-intro",
    "botState": "CONTACT",
    "botMode": false,
    "encrypted": false,
    "serviceStatus": 0,
    "roomTags": ["demo", "foo", "bar"],
    "status": 1,
    "lastMessage": {
      "_id": "5e5b88e91da9d53097b13840",
      "room": "demo-room",
      "messageType": "addMember",
      "sender": {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "id": "aaa",
        "lastLoginTimeMS": 0
      },
      "member": {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "id": "ccc",
        "lastLoginTimeMS": 0
      },
      "message": "CCC",
      "appID": "SampleApp",
      "id": "5e5b88e91da9d53097b13840",
      "messageTimeMS": 1583057129059,
      "updatedAtMS": 1583057129059,
      "createdAtMS": 1583057129059
    },
    "members": [
      {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "isRobot": false,
        "id": "aaa",
        "lastLoginTimeMS": 1541926310026
      },
      {
        "_id": "bbb",
        "nickname": "bbb",
        "avatarUrl": "",
        "isRobot": false,
        "id": "bbb",
        "lastLoginTimeMS": 1541824600261
      },
      {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "isRobot": false,
        "id": "ccc",
        "lastLoginTimeMS": 0
      }
    ],
    "id": "demo-room",
    "createdTimeMS": 1525001412492
  }
}
```

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- Invalid client key or authorization token
- The specified room does not exist
- `invitees` contains a non-existent user ID
- Internal server error

------

## Use Cases

### Invitation
- **Invite multiple members**: By setting `invitationRequired: true`, invitees must actively accept the invitation before joining the room
- **Direct addition**: By setting `invitationRequired: false`, invitees are added to the room directly without confirmation

### System Notifications
- **Automatic notification**: When `systemMessage: true` is set, the system automatically generates an "add member" notification message in the room

------

## Notes

- **`invitationRequired`**: When set to `true`, invitees must actively accept the invitation before joining the room; when set to `false`, invitees are added directly
- **System messages**: When `systemMessage: true` is set, the system automatically generates an "add member" notification message in the room
- **One-on-one rooms**: `invitationRequired` has no effect on one-on-one (`direct`) rooms; the system automatically sets it to `false`
- After successful addition, the response includes the complete updated room information, including the latest member list
