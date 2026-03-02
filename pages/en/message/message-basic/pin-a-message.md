# Pin a Message

This endpoint allows a room owner or administrator to pin a specified message to the top of the room, making it easy for members to quickly find important content.

## HTTP Request

```
POST /messages/:id/pin
```

## Authentication

Include your client key and authorization token in the request headers:

| Header             | Description  | Required |
| ------------------ | ------------ | -------- |
| `IM-CLIENT-KEY`    | Client Key   | ✅        |
| `IM-Authorization` | Client Token | ✅        |

## Path Parameters

| Parameter | Type   | Description        | Required |
| --------- | ------ | ------------------ | -------- |
| `:id`     | string | Unique message ID  | ✅        |

No request body is required for this API.

## Examples

**cURL:**

```bash
curl -X "POST" "http://localhost:3100/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {YOUR_CLIENT_KEY}' \
     -H 'IM-Authorization: {YOUR_TOKEN}'
```

**JavaScript:**

```javascript
const response = await axios.post(
  `http://localhost:3100/messages/${messageID}/pin`,
  null,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

## Response

### Success Response

When the request succeeds, the API returns the pinned message object:

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5f890cf37d980e06f6aaf349",
    "message": "Important: Meeting at 2pm tomorrow",
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

### Response Fields

| Field                 | Type    | Description                                   |
| --------------------- | ------- | --------------------------------------------- |
| `RC`                  | number  | Response code (0 means success)               |
| `RM`                  | string  | Response message                              |
| `result._id`          | string  | Message unique ID                             |
| `result.message`      | string  | Message content                               |
| `result.room`         | string  | Room ID the message belongs to                |
| `result.sender`       | object  | Sender information                            |
| `result.messageType`  | string  | Message type                                  |
| `result.pinned`       | boolean | Whether the message is pinned (`true` after pinning) |
| `result.messageTimeMS`| number  | Message send timestamp (milliseconds)         |
| `result.updatedAtMS`  | number  | Last updated timestamp (milliseconds)         |

## Error Handling

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- The specified message does not exist
- The current user is not the room owner or an admin
- Internal server error

## Notes

- **Permission required**: Only the room **owner** or **admin** can pin a message.
- To unpin a message, use the [Unpin a Message](./unpin-a-message) API.
