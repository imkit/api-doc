# Search Messages

## Overview

Search message content by keyword. This API uses a universal search function that performs full-text search on message content, supporting cross-chatroom search or searching within a specific chatroom scope. It is suitable for quickly locating specific message content.

------

## API Endpoint

### Search Message Content

Search within message content using keywords.

```http
POST /search
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Post Body

| Parameter  | Type     | Required | Description                                    |
| ---------- | -------- | -------- | ---------------------------------------------- |
| `type`     | array    | ✅        | Search type, set to ["messages"]               |
| `keyword`  | string   | ✅        | Search keyword (searches within message content) |
| `room`     | string   | ❌        | Restrict search to a specific chatroom         |
| `roomTags` | array    | ❌        | Restrict search to chatrooms with specified tags |
| `limit`    | number   | ❌        | Maximum number of search results               |

#### Example Request

**Search messages across all chatrooms**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "hello",
  "limit": 20
}
```

**Search messages in a specific chatroom**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "project update",
  "room": "demo-room"
}
```

**Search in chatrooms with specific tags**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "meeting",
  "roomTags": ["work", "team"]
}
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/search`,
  {
    type: ["messages"],
    keyword: "hello",
    limit: 20,
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
curl -X "POST" "https://your-app.imkit.io/search" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"type": ["messages"], "keyword": "hello", "limit": 20}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Search results                      |

**Search Result Structure**

| Parameter  | Type   | Description                                     |
| ---------- | ------ | ----------------------------------------------- |
| `messages` | array  | Matched message groups, grouped by chatroom     |

**Message Group Object Structure**

| Parameter  | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| `room`     | object | Chatroom information                    |
| `messages` | array  | Matched message IDs in this chatroom    |

**Chatroom Information Object Structure**

| Parameter       | Type    | Description              |
| --------------- | ------- | ------------------------ |
| `_id`           | string  | Chatroom unique ID       |
| `name`          | string  | Chatroom name            |
| `cover`         | string  | Chatroom cover image URL |
| `description`   | string  | Chatroom description     |
| `roomTags`      | array   | Chatroom tag list        |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "messages": [
      {
        "room": {
          "_id": "demo-room",
          "name": "Demo Room",
          "cover": "http://example.com/cover.jpg",
          "description": "Demo room for testing",
          "roomTags": ["demo", "test"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf349",
          "5f890cf37d980e06f6aaf350",
          "5f890cf37d980e06f6aaf351"
        ]
      },
      {
        "room": {
          "_id": "work-room",
          "name": "Work Discussion",
          "cover": "http://example.com/work-cover.jpg",
          "description": "Work related discussions",
          "roomTags": ["work"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf352"
        ]
      }
    ]
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

**400 Bad Request** - Invalid search parameters

```json
{
  "RC": 400,
  "RM": "Invalid search parameters",
  "error": {
    "code": "INVALID_SEARCH_TYPE",
    "message": "Search type must include 'messages'"
  }
}
```

------

## Use Cases

### Message Search
- **Keyword Lookup**: Quickly find historical messages containing specific keywords
- **Content Retrieval**: Locate relevant conversations within a large volume of messages
- **Information Retrieval**: Search for discussions related to specific topics or projects

### Chatroom Management
- **Content Moderation**: Search for messages containing specific terms for review
- **Data Analysis**: Analyze trending topics discussed in chatrooms
- **Compliance Check**: Search for messages that may violate policies

### User Experience
- **Smart Search**: Provide users with the ability to quickly search historical conversations
- **Contextual Display**: Display all messages related to the search keyword
- **Cross-Room Search**: Search for related content across multiple chatrooms simultaneously

------

## Notes

- **Search Scope**: Only searches chatrooms and messages that the current user has permission to access
- **Keyword Matching**: Supports full-text search, matching keywords within message content
- **Result Grouping**: Search results are grouped by chatroom for easy identification of message sources
- **Permission Control**: Search results are filtered based on the user's chatroom permissions
- **Performance Consideration**: Broad searches may take longer; it is recommended to set a reasonable limit value
- **Message IDs**: The returned message ID array requires additional API calls to retrieve full message content
