# Get Unread Messages by Room

## Overview

Count unread messages by room tags. This API allows counting unread messages grouped by room tags, suitable for displaying unread status of different types of rooms, creating message summaries and managing notification reminders.

------

## API Endpoint

### Count Unread Messages by Room Tags

Count unread messages based on specified room tags.

```http
POST /badges/byRoomTags
```

#### Headers

| Parameter          | Type   | Required | Description  |
| ------------------ | ------ | -------- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key   |
| `IM-Authorization` | string | ✅        | Client Token |

#### Post Body

| Parameter | Type  | Required | Description                                         |
| --------- | ----- | -------- | --------------------------------------------------- |
| `tags`    | array | ❌        | Room tag array (queries all tags when omitted)     |

#### Sample Request

**Query unread count for specific tags**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": ["demo", "sample"]
}
```

**Query unread count for work-related rooms**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": ["work", "project", "meeting"]
}
```

**Query unread count for all tags**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": []
}
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `RC`      | number | Response code (0 means success) |
| `RM`      | string | Response message                 |
| `result`  | object | Statistics result                |

**Statistics Result Structure**

| Parameter    | Type   | Description                               |
| ------------ | ------ | ----------------------------------------- |
| `totalBadge` | number | Total unread messages for all queried tags |
| `data`       | object | Unread message count for each tag         |

#### Sample Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalBadge": 15,
    "data": {
      "demo": 2,
      "sample": 0,
      "work": 8,
      "project": 3,
      "meeting": 2
    }
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

**400 Bad Request** - Invalid request parameters

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_TAGS",
    "message": "Tags must be an array of strings"
  }
}
```

------

## Use Cases

### Unread Status Display
- **Tag Grouping**: Display unread count by tags in room list
- **Priority Classification**: Show different notification states based on tag priority
- **Visual Reminders**: Mark different types of unread messages with different colors or styles

### Notification Management
- **Smart Notifications**: Set different notification strategies based on room tags
- **Batch Operations**: Batch mark messages in specific tag rooms as read
- **Filter Control**: Allow users to choose to focus on specific tag rooms

### Data Statistics
- **Activity Analysis**: Analyze activity levels of different types of rooms
- **Workflow**: Count unhandled messages in work-related rooms
- **Priority Management**: Identify room types that need priority handling

------

## Notes

- **Tag Permissions**: Only counts rooms that the user has permission to access
- **Empty Array Handling**: Queries all available tags when passing empty array
- **Real-time**: Statistics are real-time data at query time
- **Tag Matching**: Exact match of specified tag names
- **Performance Considerations**: Querying many tags may affect response time
- **Zero Display**: Tags without unread messages will display as 0