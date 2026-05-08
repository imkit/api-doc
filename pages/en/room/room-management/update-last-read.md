# Update Last Read

## Overview

Once the user has finished reading messages in a specific chat room, call this API to sync the "last read message" to the server. The server recalculates that user's unread count (badge) for the room and notifies the other room members via the Socket [`lastRead` event](/en/realtime/socket-events), enabling cross-device read sync and read receipts.

------

## API Endpoint

### Update Last Read Message

Update the current user's last-read message ID in a specific chat room.

```http
PUT /rooms/:id/lastRead
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |
| `Content-Type`     | string | ✅        | `application/json; charset=utf-8` |

#### Path Parameters

| Parameter | Type   | Required | Description  |
| --------- | ------ | -------- | ------------ |
| `:id`     | string | ✅        | Chat room ID |

#### Post Body

| Parameter | Type   | Required | Description                                          |
| --------- | ------ | -------- | ---------------------------------------------------- |
| `message` | string | ✅        | Last read message ID (the `_id` of a message in the room) |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomId}/lastRead`,
  {
    message: "58885c9e4d0c89571b777a81"
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X PUT "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/lastRead" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{"message":"58885c9e4d0c89571b777a81"}'
```

#### Response

**Success Response (200 OK)**

| Parameter           | Type   | Description                                       |
| ------------------- | ------ | ------------------------------------------------- |
| `RC`                | number | Response code (0 indicates success)               |
| `RM`                | string | Response message                                  |
| `result`            | object | Update result                                     |
| `result.client`     | string | Current user's Client ID                          |
| `result.lastRead`   | string | The updated last-read message ID                  |
| `result.badge`      | number | The user's current total unread count across all rooms |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "client": "1485248560558",
    "lastRead": "58b7b79b0acc250b377357ab",
    "badge": 48
  }
}
```

#### Error Response

**401 Unauthorized** - Authentication failed

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**404 Not Found** - Room or message not found

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room or message not found"
  }
}
```

**400 Bad Request** - Missing required parameters

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "message is required"
  }
}
```

------

## Socket Event Notification

After a successful update, the server broadcasts a `lastRead` Socket event to all members of the chat room. Example payload:

```json
{
  "roomID": "58871b877390be11d5f1ab30",
  "memberID": "1485248560558",
  "messageID": "58b7b79b0acc250b377357ab"
}
```

Other members' clients can listen for this event to update the "where the other side has read up to" UI in real time. See [Socket Events](/en/realtime/socket-events) for details.

------

## Use Cases

### Read Sync
- **Entering a Room**: When the user opens a chat room and scrolls to the bottom, call this API to mark the latest message as read
- **Background Sync**: When the app comes back to the foreground and the chat room is still on top, mark the latest message as read again
- **Cross-Device Sync**: After the user reads on their phone, the web / tablet client receives a Socket `lastRead` event and updates unread state in real time

### Read Receipts
- **Display in Chat**: The sender can see which message the recipient has read up to
- **Group Read Counts**: Aggregate the number of members who have read each message in a group

### Unread Calculation
- After calling this API, the values returned by [`GET /me/badge`](/en/message/message-badge/get-unread-message-by-a-user) and [`POST /badges/byRoomTags`](/en/message/message-badge/get-unread-message-by-a-room) immediately reflect the new state

------

## Notes

- **Message ID Must Belong to the Room**: The supplied `message` ID must be a message in the `:id` chat room; otherwise a 404 is returned
- **One-Way Update**: `lastRead` only moves forward; passing an older message ID than the current value yields server-implementation-defined behavior, and rolling back is not recommended
- **Throttling**: There is no need to call on every scroll; throttle calls when leaving the room, when receiving a new message while the view is at the bottom, or at a fixed interval (e.g. every 2 seconds)
- **Server-Initiated Notifications**: After success, other members receive the Socket [`lastRead` event](/en/realtime/socket-events), which can drive real-time UI updates
- **Relation to Badge**: This API is the primary way to change the values returned by the [unread calculation APIs](/en/message/message-badge/get-unread-message-by-a-user)
