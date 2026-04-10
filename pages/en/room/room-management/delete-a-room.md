# Delete a Room

## Overview

This endpoint allows you to permanently delete a specified room and all its messages. After deletion, the room data and message history will be completely removed from the database and cannot be recovered.

------

## API Endpoint

### Delete a Room

Permanently delete a specified room and all its messages.

```http
DELETE /rooms/:id
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

#### Example Request

**cURL Example:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/rooms/test-room-123" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8'
```

**JavaScript Example:**

```javascript
const response = await axios.delete(
  "https://your-app.imkit.io/rooms/test-room-123",
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
| `result` | object | Result of the delete operation |

**Result Object Fields**

| Parameter | Type | Description |
| --- | --- | --- |
| `n` | number | Number of affected documents |
| `ok` | number | Whether the operation was successful (1 indicates success) |

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

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- Invalid client key or authorization token
- The specified room does not exist
- No permission to delete the room
- Internal server error

------

## Use Cases

### Room Management
- **Clean up unused rooms**: Permanently delete rooms that are no longer active or needed
- **Data management**: Remove rooms and all their associated message history when necessary

------

## Notes

- **Permanent deletion**: This operation permanently deletes the room and all its messages from the database and cannot be undone
- **Messages deleted together**: All message history within the room will also be deleted
- Make sure the room ID is correct to avoid accidentally deleting important rooms
- After deletion, members who were in the room will no longer be able to access any related data
