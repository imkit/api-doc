# Update Member Property

This endpoint allows you to update a custom property for a specific member in a room, such as role, location, score, level, or any other custom field. This API is for server-side use only and requires proper authentication.

## HTTP Request

```
PUT /rooms/:id/member/:client
```

## Authentication

Include your client key and authorization token in the request headers:

| Header             | Description  | Required |
| ------------------ | ------------ | -------- |
| `IM-CLIENT-KEY`    | Client Key   | ✅        |
| `IM-Authorization` | Client Token | ✅        |

## Path Parameters

| Parameter | Type   | Description      | Required |
| --------- | ------ | ---------------- | -------- |
| `:id`     | string | Unique room ID   | ✅        |
| `:client` | string | Member client ID | ✅        |

## Request Body

| Parameter  | Type   | Required | Description                           |
| ---------- | ------ | -------- | ------------------------------------- |
| `property` | string | ✅        | Name of the member property to update |
| `value`    | mixed  | ✅        | New value for the property            |

## Examples

### Example 1: Assign Admin Role

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

### Example 2: Update a Custom Property

**JavaScript:**

```javascript
const response = await axios.put(
  `http://localhost:3100/rooms/${roomID}/member/${clientID}`,
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

### Response Fields

| Field    | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| `RC`     | number | Response code (0 means success)     |
| `RM`     | string | Response message                    |
| `result` | object | Updated room data with full details |

## Error Handling

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified room or member does not exist
- Internal server error

## Notes

- **Role assignment**: When `property` is `"role"` and `value` is `"admin"`, the system automatically sends an `assignAdmin` system message to the room.
- **Custom properties**: Beyond `role`, you can set any custom property such as `location`, `score`, `level`, etc.
- The `property` field maps directly to a field name on the member property object. Ensure `value` matches the expected type for that field.
