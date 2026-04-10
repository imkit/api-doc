# Get Unread Messages by Room

## Overview

Count unread messages by chatroom tags. This API allows grouping unread message counts by chatroom tags, suitable for displaying unread status across different types of chatrooms, building message summaries, and managing notification reminders.

------

## API Endpoint

### Count Unread Messages by Chatroom Tags

Count unread messages based on specified chatroom tags.

```http
POST /badges/byRoomTags
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Post Body

| Parameter | Type   | Required | Description                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `tags`    | array  | ❌        | Chatroom tag array (queries all tags when omitted)  |

#### Example Request

**Query unread count for specific tags**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": ["demo", "sample"]
}
```

**Query unread count for work-related chatrooms**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": ["work", "project", "meeting"]
}
```

**Query unread count for all tags**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": []
}
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/badges/byRoomTags`,
  {
    tags: ["demo", "sample"],
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL Example:**

```bash
curl -X "POST" "https://your-app.imkit.io/badges/byRoomTags" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"tags": ["demo", "sample"]}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Statistics results                  |

**Statistics Result Structure**

| Parameter    | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| `totalBadge` | number | Total unread message count across all queried tags |
| `data`       | object | Unread message count for each tag                |

#### Example Response

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
- **Tag Grouping**: Display unread counts grouped by tags in the chatroom list
- **Priority Levels**: Show different notification statuses based on tag priority
- **Visual Reminders**: Use different colors or styles to indicate different types of unread messages

### Notification Management
- **Smart Notifications**: Set different notification strategies based on chatroom tags
- **Batch Operations**: Batch mark messages in chatrooms with specific tags as read
- **Filter Control**: Allow users to focus on chatrooms with specific tags

### Data Statistics
- **Activity Analysis**: Analyze the activity level of different types of chatrooms
- **Workflow**: Count unprocessed messages in work-related chatrooms
- **Priority Management**: Identify chatroom types that need priority attention

------

## Notes

- **Tag Permissions**: Only counts chatrooms that the user has permission to access
- **Empty Array Handling**: Passing an empty array queries all available tags
- **Real-Time**: Statistics results reflect real-time data at the moment of the query
- **Tag Matching**: Matches the specified tag names exactly
- **Performance Consideration**: Querying a large number of tags may affect response time
- **Zero Value Display**: Tags with no unread messages will display as 0
