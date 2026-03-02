# Add a Member

This endpoint allows you to add one or more users to a specified room. It supports an invitation confirmation mechanism and optionally generates a system message notification. This API is for server-side use only and requires proper authentication.

## HTTP Request

```
POST /rooms/:id/members
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
| `:id`     | string | Unique room ID | ✅        |

## Request Body

| Parameter            | Type          | Required | Description                                                                                              |
| -------------------- | ------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `invitees`           | array[string] | ✅        | Array of client IDs to add to the room                                                                   |
| `systemMessage`      | boolean       | ❌        | Whether to automatically generate an "add member" system message. Default: `false`                       |
| `invitationRequired` | boolean       | ❌        | Whether invitees must accept the invitation before joining. Default: `false`. Applies to **group** rooms only |

## Examples

### Example 1: Invite Members with Confirmation Required

**cURL:**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/members" \
     -H 'IM-CLIENT-KEY: {YOUR_CLIENT_KEY}' \
     -H 'IM-Authorization: {YOUR_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"invitees": ["ccc", "bbb"], "invitationRequired": true, "systemMessage": true}'
```

**JavaScript:**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/members`,
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

### Example 2: Add Members Directly (No Invitation Required)

**JavaScript:**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/members`,
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

## Response

### Success Response

When the request succeeds, the API returns the updated room data:

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

### Response Fields

| Field    | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| `RC`     | number | Response code (0 means success)     |
| `RM`     | string | Response message                    |
| `result` | object | Updated room data with full details |

## Error Handling

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified room does not exist
- One or more IDs in `invitees` do not exist
- Internal server error

## Notes

- **`invitationRequired`**: When `true`, invitees must accept the invitation before joining. When `false`, they are added immediately.
- **System message**: When `systemMessage: true`, the system automatically creates an "add member" notification in the room.
- **Direct rooms**: `invitationRequired` has no effect on direct (`direct`) rooms — the system always sets it to `false`.
- The response includes the full updated room data, including the latest member list.
