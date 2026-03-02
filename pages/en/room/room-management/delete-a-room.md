# Delete Room

This endpoint allows you to permanently delete a specified room and all of its messages. Once deleted, the room data and all message history will be completely removed from the database and cannot be recovered. This API is for server-side use only and requires proper authentication.

## HTTP Request

```
DELETE /rooms/:id
```

## Authentication

Include your client key and authorization token in the request headers:

| Header             | Description    | Required |
| ------------------ | -------------- | -------- |
| `IM-CLIENT-KEY`    | Client Key     | ✅        |
| `IM-Authorization` | Client Token   | ✅        |

## Path Parameters

| Parameter | Type   | Description          | Required |
| --------- | ------ | -------------------- | -------- |
| `:id`     | string | Unique room ID       | ✅        |

## Examples

### Example: Delete a Room

**cURL:**

```bash
curl -X "DELETE" "http://localhost:3100/rooms/test-room-123" \
     -H 'IM-CLIENT-KEY: {YOUR_CLIENT_KEY}' \
     -H 'IM-Authorization: {YOUR_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8'
```

**JavaScript:**

```javascript
const response = await axios.delete(
  "http://localhost:3100/rooms/test-room-123",
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

When the request succeeds, the API returns the result of the delete operation:

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

### Response Fields

| Field    | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| `RC`     | number | Response code (0 means success)    |
| `RM`     | string | Response message                   |
| `result` | object | Result of the delete operation     |

#### Result Object Fields

| Field  | Type   | Description                             |
| ------ | ------ | --------------------------------------- |
| `n`    | number | Number of documents affected            |
| `ok`   | number | Whether the operation succeeded (1 = yes) |

## Error Handling

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified room does not exist
- Insufficient permission to delete the room
- Internal server error

## Notes

- **Permanent deletion**: This operation permanently removes the room and all its messages from the database. It cannot be undone.
- **Messages are also deleted**: All message history within the room is deleted along with the room itself.
- Verify the room ID carefully before calling this endpoint to avoid accidentally deleting the wrong room.
- After deletion, members who were in the room will no longer be able to access any related data.
