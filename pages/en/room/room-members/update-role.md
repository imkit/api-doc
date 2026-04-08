# Update Member Role

## Overview

This endpoint allows you to update the role of a specific member in a room. When a member is promoted to admin, the system automatically generates a corresponding system message in the room. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Update Member Role

Update the role of a specific member in a room.

```http
PUT /rooms/:id/member/:client
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
| `:client` | string | ✅ | Member client ID |

#### Post Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `property` | string | ✅ | Must be set to `"role"` |
| `value` | string | ✅ | Role value: `"admin"` or `"member"` |

**Role Values**

| Value | Description |
| --- | --- |
| `"admin"` | Administrator with permissions to manage room members |
| `"member"` | Regular member |

#### Example Request

**Example 1: Promote a Member to Admin**

**cURL:**

```bash
curl -X "PUT" "http://localhost:3100/rooms/demo-room/member/user-001" \
     -H 'IM-CLIENT-KEY: {YOUR_CLIENT_KEY}' \
     -H 'IM-Authorization: {YOUR_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"property": "role", "value": "admin"}'
```

**JavaScript:**

```javascript
const response = await axios.put(
  `http://localhost:3100/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "admin",
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

**Example 2: Demote an Admin to Regular Member**

**JavaScript:**

```javascript
const response = await axios.put(
  `http://localhost:3100/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "member",
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
    "name": "Demo",
    "roomType": "group",
    "members": [
      {
        "_id": "user-001",
        "nickname": "User 001",
        "avatarUrl": "http://example.com/avatar.jpg",
        "isRobot": false,
        "id": "user-001",
        "lastLoginTimeMS": 1583057133276
      }
    ],
    "id": "demo-room",
    "createdTimeMS": 1525001412492
  }
}
```

#### Error Response

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified room or member does not exist
- `value` is not a valid role
- Internal server error

------

## Use Cases

### Permission Management
- **Promote to admin**: Change a member's role from `"member"` to `"admin"` to grant room management permissions
- **Demote to regular member**: Change an admin's role from `"admin"` to `"member"` to revoke management permissions

------

## Notes

- **System message**: When `value` is set to `"admin"`, the system automatically sends an `assignAdmin` system message to notify other members.
- The `property` field must be set to `"role"`. To update other member attributes, use the [Update Member Property](./update-member-property) API instead.
- This operation only changes the member's role within the specified room and does not affect their role in other rooms.
