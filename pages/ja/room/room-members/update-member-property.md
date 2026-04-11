# Update Member Property

## Overview

This endpoint allows you to update custom properties of a specific member in a room, such as role, location, score, level, or any custom field. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Update Member Property

Update the custom properties of a specific member in a room.

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
| `property` | string | ✅ | Name of the member property field to update |
| `value` | mixed | ✅ | New value for the property |

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

**Example 2: Update a custom property**

**JavaScript Example:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "score",
    value: 100,
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
- Internal server error

------

## Use Cases

### Role Management
- **Assign administrator**: Set `property` to `"role"` and `value` to `"admin"` to assign the administrator role

### Custom Properties
- **Set score**: Set `property` to `"score"` to track a member's score in the room
- **Set level**: Set `property` to `"level"` to manage member levels
- **Set location**: Set `property` to `"location"` to record member location information

------

## Notes

- **Role setting**: When `property` is set to `"role"` and `value` is set to `"admin"`, the system automatically generates an `assignAdmin` system message in the room
- **Custom properties**: In addition to `role`, any custom property can be set, such as location (`location`), score (`score`), level (`level`), etc.
- The `property` field directly maps to the field name in the member properties object, and the type of `value` should match the field definition
