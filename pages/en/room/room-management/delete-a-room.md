# Delete Room

## Overview

This endpoint allows you to permanently delete a specified room and all of its messages. Once deleted, the room data and all message history will be completely removed from the database and cannot be recovered. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Delete Room

Permanently delete a specified room and all of its messages.

```http
DELETE /rooms/:id
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

#### Example Request

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

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| --- | --- | --- |
| `RC` | number | Response code (0 means success) |
| `RM` | string | Response message |
| `result` | object | Result of the delete operation |

**Result Object Fields**

| Parameter | Type | Description |
| --- | --- | --- |
| `n` | number | Number of documents affected |
| `ok` | number | Whether the operation succeeded (1 = yes) |

#### Example Response

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

#### Error Response

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified room does not exist
- Insufficient permission to delete the room
- Internal server error

------

## Use Cases

### Room Management
- **Clean up unused rooms**: Permanently delete rooms that are no longer active or needed
- **Data management**: Remove rooms and all associated message history when necessary

------

## Notes

- **Permanent deletion**: This operation permanently removes the room and all its messages from the database. It cannot be undone.
- **Messages are also deleted**: All message history within the room is deleted along with the room itself.
- Verify the room ID carefully before calling this endpoint to avoid accidentally deleting the wrong room.
- After deletion, members who were in the room will no longer be able to access any related data.
