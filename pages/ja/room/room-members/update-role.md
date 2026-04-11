# Update Member Role

## Overview

This endpoint allows you to update the role of a specific member in a room. When the role is changed to administrator, the system automatically generates a corresponding system message in the room. This API is for server-side use only and requires proper authentication.

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
| `IM-CLIENT-KEY` | string | ✅ | Client key |
| `IM-Authorization` | string | ✅ | Client token |

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `:id` | string | ✅ | Room unique identifier |
| `:client` | string | ✅ | Member's client ID |

#### Request Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `property` | string | ✅ | Must be set to `"role"` |
| `value` | string | ✅ | Role value, either `"admin"` or `"member"` |

**Role Descriptions**

| Role Value | Description |
| --- | --- |
| `"admin"` | Administrator, with permissions to manage room members |
| `"member"` | Regular member |

#### Example Request

**Example 1: Set a member as administrator**

**cURL Example:**

```bash
curl -X "PUT" "https://your-app.imkit.io/rooms/demo-room/member/user-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"property": "role", "value": "admin"}'
```

**JavaScript Example:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
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

**Example 2: Demote an administrator to a regular member**

**JavaScript Example:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
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

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- Invalid client key or authorization token
- The specified room or member does not exist
- `value` is not a valid role value
- Internal server error

------

## Use Cases

### Permission Management
- **Promote to administrator**: Change a member's role from `"member"` to `"admin"`, granting them permissions to manage room members
- **Demote to regular member**: Change an administrator's role from `"admin"` to `"member"`, removing their management permissions

------

## Notes

- **System message**: When `value` is set to `"admin"`, the system automatically generates an `assignAdmin` system message in the room to notify other members
- The `property` field must always be set to `"role"`; to update other member properties, please use the [Update Member Property](./update-member-property) API
- This operation only changes the member's role within that specific room and does not affect their roles in other rooms
