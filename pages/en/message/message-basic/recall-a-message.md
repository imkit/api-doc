# Recall a Message

## Overview

This endpoint allows a user to recall a specified message in a room. After recalling, the original message content is cleared and the message type changes to `recall`. All members in the room will see that the message has been recalled. Both client and platform API authentication are supported.

------

## API Endpoint

### Recall a Message

Recall a specified message in a room.

```http
POST /rooms/:roomId/message
```

#### Headers

This API supports two authentication methods. Use one of the following:

**Client Authentication**

| Parameter          | Type   | Required | Description  |
| ------------------ | ------ | -------- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅       | Client Key   |
| `IM-Authorization` | string | ✅       | Client Token |

**Platform API Authentication**

| Parameter    | Type   | Required | Description      |
| ------------ | ------ | -------- | ---------------- |
| `IM-API-KEY` | string | ✅       | Platform API Key |

#### Path Parameters

| Parameter  | Type   | Required | Description    |
| ---------- | ------ | -------- | -------------- |
| `:roomId`  | string | ✅       | Unique room ID |

#### Post Body

| Parameter     | Type   | Required | Description                         |
| ------------- | ------ | -------- | ----------------------------------- |
| `messageType` | string | ✅       | Must be set to `"recall"`           |
| `_id`         | string | ✅       | ID of the message to recall         |

#### Example Request

**Example 1: Recall Using Client Authentication**

**cURL:**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {YOUR_CLIENT_KEY}' \
     -H 'IM-Authorization: {YOUR_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"_id": "5ce3d80bd594874e495895a4", "messageType": "recall"}'
```

**JavaScript:**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/message`,
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

**Example 2: Recall Using Platform API Authentication**

**JavaScript:**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/message`,
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

| Parameter             | Type   | Description                                       |
| --------------------- | ------ | ------------------------------------------------- |
| `RC`                  | number | Response code (0 means success)                   |
| `RM`                  | string | Response message                                  |
| `result._id`          | string | Message unique ID                                 |
| `result.message`      | string | Message content (empty string after recall)       |
| `result.room`         | string | Room ID the message belongs to                    |
| `result.sender`       | object | Sender information                                |
| `result.messageType`  | string | Message type (becomes `"recall"` after recalling) |
| `result.messageTimeMS`| number | Message send timestamp (milliseconds)             |
| `result.updatedAtMS`  | number | Last updated timestamp (milliseconds)             |

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

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid authentication key or token
- The specified message or room does not exist
- Insufficient permission to recall the message
- Internal server error

------

## Use Cases

### Message Management

- **Correct Mistaken Messages**: Users can immediately recall a message sent in error
- **Remove Sensitive Information**: Recall messages containing sensitive or inappropriate content
- **Backend Administration**: Administrators can recall violating messages via the Platform API

------

## Notes

- **Recall effect**: After recalling, the `message` field becomes an empty string and `messageType` changes to `"recall"`. All room members will see the recalled state.
- **`_id` in body**: The `_id` field in the request body refers to the **message** ID to recall, not the room ID.
- **Two auth methods**: Client authentication (`IM-CLIENT-KEY` + `IM-Authorization`) is for regular user operations; Platform API authentication (`IM-API-KEY`) is for backend administrative operations.
