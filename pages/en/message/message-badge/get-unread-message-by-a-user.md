# Get Unread Messages by User

## Overview

Get the total number of unread messages for the current user. This API can count the total unread messages for a user across all authorized rooms, and supports filtering statistics by room tags, suitable for displaying the user's overall unread status.

------

## API Endpoint

### Get User's Total Unread Messages

Get the current user's unread message count, with optional tag filtering.

```http
GET /me/badge
```

#### Headers

| Parameter       | Type   | Required | Description  |
| --------------- | ------ | -------- | ------------ |
| `IM-CLIENT-KEY` | string | ✅        | Client Key   |
| `Authorization` | string | ✅        | Client Token |

#### Query Parameters

| Parameter  | Type   | Required | Description                                                    |
| ---------- | ------ | -------- | -------------------------------------------------------------- |
| `roomTags` | string | ❌        | Filter by room tags (can use multiple roomTags parameters)    |

#### Sample Request

**Get total unread message count**

```http
GET /me/badge HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

**Get unread message count for specific tags**

```http
GET /me/badge?roomTags=demo&roomTags=foo HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

**Get unread message count for work-related rooms**

```http
GET /me/badge?roomTags=work&roomTags=project&roomTags=meeting HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `RC`      | number | Response code (0 means success) |
| `RM`      | string | Response message                 |
| `result`  | object | Unread message statistics result |

**Result Object Structure**

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| `badge`   | number | Unread message count (total from all qualifying rooms) |

#### Sample Response

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
- **Total Display**: Show total unread message count on app icon or title bar
- **Badge Marking**: Used for badge number display in mobile apps
- **Status Indicator**: Determine if user has unread messages to handle

### Category Statistics
- **Work Messages**: Count unread messages in work-related rooms
- **Personal Messages**: Count unread messages in personal or private chats
- **System Notifications**: Count unread messages in system announcement rooms

### User Experience Optimization
- **Smart Reminders**: Adjust reminder frequency based on unread count
- **Priority Display**: Sort display based on importance of different tags
- **Quick Access**: Provide quick jump to rooms with unread messages

------

## Notes

- **Permission Control**: Only counts rooms that user has permission to access
- **Tag Filtering**: Can use multiple roomTags parameters for AND condition filtering
- **Real-time**: Returns real-time unread count at query time
- **Performance Considerations**: Frequent queries may affect performance, recommend moderate use
- **Parameter Format**: Multiple tags need to use `roomTags=tag1&roomTags=tag2` format
- **Zero Handling**: Returns 0 when there are no unread messages