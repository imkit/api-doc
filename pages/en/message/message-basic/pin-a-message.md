# Pin a Message

## Overview

This endpoint allows chatroom owners or administrators to pin a specified message to the top of a chatroom, making it easy for members to quickly access important messages. Each chatroom can only have one pinned message at a time.

------

## API Endpoint

### Pin a Message

Pin a specified message to the top of a chatroom.

```http
POST /messages/:id/pin
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
curl -X "POST" "https://your-app.imkit.io/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/messages/${messageID}/pin`,
  null,
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

| Parameter             | Type    | Description                              |
| --------------------- | ------- | ---------------------------------------- |
| `RC`                  | number  | Response code (0 indicates success)      |
| `RM`                  | string  | Response message                         |
| `result._id`          | string  | Message unique ID                        |
| `result.message`      | string  | Message content                          |
| `result.room`         | string  | Associated chatroom ID                   |
| `result.sender`       | object  | Message sender information               |
| `result.messageType`  | string  | Message type                             |
| `result.pinned`       | boolean | Whether the message is pinned (`true` after pinning) |
| `result.messageTimeMS`| number  | Message sent timestamp (milliseconds)    |
| `result.updatedAtMS`  | number  | Last updated timestamp (milliseconds)    |

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
    "pinned": true,
    "id": "5f890cf37d980e06f6aaf349",
    "messageTimeMS": 1602817267923,
    "updatedAtMS": 1602817290000,
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

### Important Message Management

- **Pin Announcements**: Pin important announcements to the top of a chatroom to ensure all members can see them
- **Quick Reference**: Allow members to find key information without scrolling through message history

------

## Notes

- **Permission Restriction**: Only chatroom **owners** or **admins** can perform the pin operation
- To unpin a message, use the [Unpin a Message](./unpin-a-message) API
