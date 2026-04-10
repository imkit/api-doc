# Get Unread Messages by User

## Overview

Retrieve the total unread message count for the current user. This API can count the total number of unread messages across all chatrooms the user has access to, and supports filtering by chatroom tags. It is suitable for displaying the user's overall unread status.

------

## API Endpoint

### Get User's Total Unread Message Count

Retrieve the current user's unread message count, with optional filtering by tags.

```http
GET /me/badge
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization`    | string | ✅        | Client Token   |

#### Query Parameters

| Parameter  | Type   | Required | Description                                                       |
| ---------- | ------ | -------- | ----------------------------------------------------------------- |
| `roomTags` | string | ❌        | Filter by chatroom tags (multiple roomTags parameters can be used) |

#### Example Request

**Get total unread message count**

```http
GET /me/badge HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**Get unread message count for specific tags**

```http
GET /me/badge?roomTags=demo&roomTags=foo HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**Get unread message count for work-related chatrooms**

```http
GET /me/badge?roomTags=work&roomTags=project&roomTags=meeting HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/me/badge`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "GET" "https://your-app.imkit.io/me/badge" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Unread message statistics result    |

**Result Object Structure**

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| `badge`   | number | Unread message count (total across all matching chatrooms)    |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "badge": 10
  }
}
```

**Response example with tag filtering**

```json
{
  "RC": 0,
  "RM": "OK", 
  "result": {
    "badge": 5
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

**400 Bad Request** - Invalid parameters

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_ROOM_TAGS",
    "message": "Room tags must be valid strings"
  }
}
```

------

## Use Cases

### Global Notification Display
- **Total Count Display**: Show the total unread message count on the app icon or title bar
- **Badge Marking**: Used for badge number display on mobile applications
- **Status Indicator**: Determine whether the user has unread messages to process

### Category Statistics
- **Work Messages**: Count unread messages in work-related chatrooms
- **Personal Messages**: Count unread messages in personal or private chats
- **System Notifications**: Count unread messages in system announcement chatrooms

### User Experience Optimization
- **Smart Reminders**: Adjust reminder frequency based on unread count
- **Priority Display**: Sort display based on the importance of different tags
- **Quick Access**: Provide quick navigation to chatrooms with unread messages

------

## Notes

- **Permission Control**: Only counts chatrooms that the user has permission to access
- **Tag Filtering**: Multiple roomTags parameters can be used for AND condition filtering
- **Real-Time**: Returns the real-time unread count at the moment of the query
- **Performance Consideration**: Frequent queries may affect performance; use moderately
- **Parameter Format**: Multiple tags must use the `roomTags=tag1&roomTags=tag2` format
- **Zero Value Handling**: Returns 0 when there are no unread messages
