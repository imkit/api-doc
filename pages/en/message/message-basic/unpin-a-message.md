# Unpin a Message

## Overview

This endpoint allows chatroom owners or administrators to unpin the currently pinned message, removing it from the top of the chatroom.

------

## API Endpoint

### Unpin a Message

Unpin the currently pinned message and remove it from the top of the chatroom.

```http
DELETE /messages/:id/pin
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅       | Client Key     |
| `IM-Authorization` | string | ✅       | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description           |
| --------- | ------ | -------- | --------------------- |
| `:id`     | string | ✅       | Message unique ID     |

This API does not require a Request Body.

#### Example Request

**cURL Example:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript Example:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/messages/${messageID}/pin`,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

#### Response

**Success Response (200 OK)**

| Parameter             | Type    | Description                                  |
| --------------------- | ------- | -------------------------------------------- |
| `RC`                  | number  | Response code (0 indicates success)          |
| `RM`                  | string  | Response message                             |
| `result._id`          | string  | Message unique ID                            |
| `result.message`      | string  | Message content                              |
| `result.room`         | string  | Associated chatroom ID                       |
| `result.sender`       | object  | Message sender information                   |
| `result.messageType`  | string  | Message type                                 |
| `result.pinned`       | boolean | Whether the message is pinned (`false` after unpinning) |
| `result.messageTimeMS`| number  | Message sent timestamp (milliseconds)        |
| `result.updatedAtMS`  | number  | Last updated timestamp (milliseconds)        |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5f890cf37d980e06f6aaf349",
    "message": "重要公告：明天下午兩點開會",
    "room": "demo-room",
    "sender": {
      "_id": "aaa",
      "nickname": "AAA",
      "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
      "isRobot": false,
      "id": "aaa",
      "lastLoginTimeMS": 1602817267900
    },
    "messageType": "text",
    "appID": "SampleApp",
    "pinned": false,
    "id": "5f890cf37d980e06f6aaf349",
    "messageTimeMS": 1602817267923,
    "updatedAtMS": 1602817300000,
    "createdAtMS": 1602817267925
  }
}
```

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- Invalid client key or authorization token
- The specified message does not exist
- The current user is not the chatroom owner or administrator
- Internal server error

------

## Use Cases

### Message Management

- **Remove Outdated Announcements**: Unpin messages that are no longer relevant to keep the chatroom organized
- **Replace Pinned Content**: Unpin an old message to pin a new important message

------

## Notes

- **Permission Restriction**: Only chatroom **owners** or **admins** can perform the unpin operation
- To pin a message, use the [Pin a Message](./pin-a-message) API
