# Recall a Message

## Overview

This endpoint allows a user to recall a specified message in a room. After recall, the original message content is cleared, the message type is changed to `recall`, and all members in the room can see that the message has been recalled. Both client-side and platform API authentication methods are supported.

------

## API Endpoint

### Recall a Message

Recall a specified message in a room.

```http
POST /rooms/:roomId/message
```

#### Headers

This API supports two authentication methods; use one of them:

**Client Authentication**

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅   | Client key   |
| `IM-Authorization` | string | ✅   | Client token |

**Platform API Authentication**

| Parameter    | Type   | Required | Description        |
| ------------ | ------ | ---- | ---------------- |
| `IM-API-KEY` | string | ✅   | Platform API key |

#### Path Parameters

| Parameter  | Type   | Required | Description          |
| ---------- | ------ | ---- | -------------------- |
| `:roomId`  | string | ✅   | Room unique identifier |

#### Post Body

| Parameter     | Type   | Required | Description                         |
| ------------- | ------ | ---- | ----------------------------------- |
| `messageType` | string | ✅   | Must be set to `"recall"`           |
| `_id`         | string | ✅   | Unique identifier of the message to recall |

#### Example Request

**Example 1: Recall a message with client authentication**

**cURL Example:**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"_id": "5ce3d80bd594874e495895a4", "messageType": "recall"}'
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
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

**Example 2: Recall a message with platform API authentication**

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**Success Response (200 OK)**

| Parameter             | Type   | Description                            |
| --------------------- | ------ | -------------------------------------- |
| `RC`                  | number | Response code (0 indicates success)    |
| `RM`                  | string | Response message                       |
| `result._id`          | string | Message unique identifier              |
| `result.message`      | string | Message content (empty string after recall) |
| `result.room`         | string | Room ID the message belongs to         |
| `result.sender`       | object | Sender information for the recall operation |
| `result.messageType`  | string | Message type (`"recall"` after recall) |
| `result.messageTimeMS`| number | Message sent timestamp (milliseconds)  |
| `result.updatedAtMS`  | number | Last updated timestamp (milliseconds)  |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5ce3d80bd594874e495895a4",
    "message": "",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Nita",
      "avatarUrl": "http://loremflickr.com/240/240/style?1558435839",
      "isRobot": false,
      "id": "sss",
      "lastLoginTimeMS": 1553145898032
    },
    "messageType": "recall",
    "appID": "SampleApp",
    "id": "5ce3d80bd594874e495895a4",
    "messageTimeMS": 1558435851576,
    "updatedAtMS": 1558435921086,
    "createdAtMS": 1558435851580
  }
}
```

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- Invalid authentication key or token
- The specified message or room does not exist
- No permission to recall the message
- Internal server error

------

## Use Cases

### Message Management

- **Correct mistaken messages**: Users can immediately recall a message sent by mistake
- **Remove sensitive information**: Recall messages containing sensitive or inappropriate content
- **Backend management**: Administrators can recall violating messages via the platform API

------

## Notes

- **Recall effect**: After recall, the message's `message` field becomes an empty string, `messageType` changes to `"recall"`, and all room members can see the recalled status
- **`_id`**: The `_id` in the request body is the **message** ID to be recalled, not the room ID
- **Two authentication methods**: Client authentication (`IM-CLIENT-KEY` + `IM-Authorization`) is for regular user operations; platform API authentication (`IM-API-KEY`) is for backend management operations
