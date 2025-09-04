# Search Messages

## Overview

Search message content using keywords. This API uses a general search function that performs full-text search based on message content, supporting cross-room search or limiting to specific room scope, suitable for quickly locating specific message content.

------

## API Endpoint

### Search Message Content

Search message content using keywords.

```http
POST /search
```

#### Headers

| Parameter          | Type   | Required | Description  |
| ------------------ | ------ | -------- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key   |
| `IM-Authorization` | string | ✅        | Client Token |

#### Post Body

| Parameter  | Type   | Required | Description                                        |
| ---------- | ------ | -------- | -------------------------------------------------- |
| `type`     | array  | ✅        | Search type, set to ["messages"]                  |
| `keyword`  | string | ✅        | Search keyword (search within message content)    |
| `room`     | string | ❌        | Limit search to specific room                      |
| `roomTags` | array  | ❌        | Limit search to rooms with specified tags         |
| `limit`    | number | ❌        | Maximum number of search results                   |

#### Sample Request

**Search messages in all rooms**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "hello",
  "limit": 20
}
```

**Search messages in specific room**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "project update",
  "room": "demo-room"
}
```

**Search in rooms with specific tags**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "meeting",
  "roomTags": ["work", "team"]
}
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `RC`      | number | Response code (0 means success) |
| `RM`      | string | Response message                 |
| `result`  | object | Search results                   |

**Search Result Structure**

| Parameter  | Type  | Description                                  |
| ---------- | ----- | -------------------------------------------- |
| `messages` | array | Found message groups, grouped by room       |

**Message Group Object Structure**

| Parameter  | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| `room`     | object | Room information                      |
| `messages` | array  | Matching message IDs in this room     |

**Room Information Object Structure**

| Parameter     | Type   | Description              |
| ------------- | ------ | ------------------------ |
| `_id`         | string | Room unique identifier   |
| `name`        | string | Room name                |
| `cover`       | string | Room cover image URL     |
| `description` | string | Room description         |
| `roomTags`    | array  | Room tags list           |

#### Sample Response

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
- **Content Backtracking**: Find relevant conversation content among large volumes of messages
- **Information Retrieval**: Search for discussions related to specific topics or projects

### Room Management
- **Content Moderation**: Search for messages containing specific terms for review
- **Data Analysis**: Analyze popular topics discussed in rooms
- **Compliance Checking**: Search for potentially violating message content

### User Experience
- **Smart Search**: Provide users with quick historical conversation search functionality
- **Related Display**: Show all messages related to search keywords
- **Cross-room Search**: Search for related content across multiple rooms simultaneously

------

## Notes

- **Search Scope**: Only searches rooms and messages that the current user has permission to access
- **Keyword Matching**: Supports full-text search, matching keywords in message content
- **Result Grouping**: Search results are grouped by room for better understanding of message sources
- **Permission Control**: Search results are filtered based on user's room permissions
- **Performance Considerations**: Large-scale searches may take longer, recommend setting reasonable limit values
- **Message IDs**: Returns message ID arrays, additional API calls needed to get complete message content