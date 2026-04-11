# List Rooms

## Overview

This endpoint allows you to retrieve the list of rooms that the current user has joined, with support for pagination, sorting, and conditional filtering. It is suitable for scenarios such as displaying room lists and incremental synchronization.

------

## API Endpoint

### Get Room List

Retrieve the list of rooms the current user has joined, with support for pagination, sorting, and conditional filtering.

```http
GET /rooms
```

#### Headers

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | Client key |
| `IM-CLIENT-ID` | string | ✅ | Current user's client ID (required by this endpoint to calculate unread counts and other user-specific data) |
| `IM-Authorization` | string | ✅ | Client token |

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sort` | string | ❌ | Sort criteria; multiple fields can be combined, separated by spaces; prefix `-` indicates descending order |
| `skip` | integer | ❌ | Pagination offset, defaults to `0` |
| `limit` | integer | ❌ | Maximum number of rooms to return, defaults to `0` (no limit) |
| `updatedAfter` | string or integer | ❌ | Filter rooms that have new messages or were created after the specified timestamp; supports ISO-8601 string or millisecond Epoch integer |
| `pref` | JSON | ❌ | Filter by the user's room preference settings, e.g., `{"tags": "some-tag"}` |
| `sortUnreadFirst` | integer | ❌ | When non-zero, rooms with unread messages are sorted first |

**sort Parameter Examples**

Sort by latest message and creation time in descending order:

```
-lastMessage -createdTime
```

Sort by creation time in ascending order:

```
createdTime
```

#### Example Request

**Example 1: Get room list (pagination + time filter)**

cURL Example:

```bash
curl "https://your-app.imkit.io/rooms?skip=0&limit=20&sort=-lastMessage&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-CLIENT-ID: {IM-CLIENT-ID}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

JavaScript Example:

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      skip: 0,
      limit: 20,
      sort: "-lastMessage",
      updatedAfter: "2020-10-15T03:28:54Z",
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

**Example 2: Filter rooms by tag and prioritize unread rooms**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      pref: JSON.stringify({ tags: "some-tag" }),
      sortUnreadFirst: 1,
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| --- | --- | --- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result.totalCount` | number | Total number of rooms matching the criteria |
| `result.data` | array | Array of room objects |
| `result.inspect` | object | Diagnostic information (query criteria and duration) |

**Room Object Fields**

| Parameter | Type | Description |
| --- | --- | --- |
| `_id` | string | Room unique identifier |
| `name` | string | Room name |
| `cover` | string | Room cover image URL |
| `description` | string | Room description |
| `roomType` | string | Room type (`"direct"` or `"group"`) |
| `webhook` | string | Webhook key or URL |
| `botState` | string | Bot state |
| `botMode` | boolean | Whether bot mode is enabled |
| `encrypted` | boolean | Whether encryption is enabled |
| `serviceStatus` | number | Service status |
| `roomTags` | array[string] | Room tags array |
| `status` | number | Room status (`1` indicates active) |
| `unread` | number | Unread message count for the current user |
| `muted` | boolean | Whether the current user has muted this room |
| `lastMessage` | object | Latest message object |
| `members` | array[object] | Room members array |
| `pref` | object | Current user's personal preference settings for this room |
| `createdTimeMS` | number | Room creation timestamp (milliseconds) |

**Preference Object Fields (`pref`)**

| Parameter | Type | Description |
| --- | --- | --- |
| `tags` | array[string] | Custom tags the user has set for this room |
| `tagColors` | object | Color for each tag (hex color code) |
| `hidden` | boolean | Whether this room is hidden |
| `sticky` | boolean | Whether this room is pinned |
| `muted` | boolean | Whether notifications for this room are muted |
| `folder` | string | Folder name this room belongs to |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "members": "sss",
        "$or": [
          { "lastMessage": { "$gt": "5f87c2cf0000000000000000" } },
          { "createdTime": { "$gt": "2020-10-15T03:32:31.000Z" } }
        ],
        "status": 1
      },
      "tookMS": 22
    },
    "data": [
      {
        "_id": "demo-room",
        "name": "Demo Demo",
        "cover": "http://loremflickr.com/240/240/style?demo",
        "description": "public demo room",
        "roomType": "group",
        "webhook": "meet-taipei-intro",
        "botState": "CONTACT",
        "botMode": false,
        "encrypted": false,
        "serviceStatus": 0,
        "roomTags": ["demo", "foo", "bar"],
        "status": 1,
        "unread": 0,
        "muted": false,
        "lastMessage": {
          "_id": "5f890cf37d980e06f6aaf349",
          "message": "Hello SIKTMLNP 11:01:07",
          "room": "demo-room",
          "sender": {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "id": "sss",
            "lastLoginTimeMS": 0
          },
          "messageType": "text",
          "appID": "SampleApp",
          "messageTime": "2020-10-16T03:01:07.923Z",
          "id": "5f890cf37d980e06f6aaf349",
          "messageTimeMS": 1602817267923,
          "updatedAtMS": 1602817267925,
          "createdAtMS": 1602817267925,
          "reactionCount": 0
        },
        "members": [
          {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "isRobot": false,
            "id": "sss",
            "lastLoginTimeMS": 1588744338369
          }
        ],
        "pref": {
          "tags": ["demo", "sample"],
          "tagColors": {
            "demo": "#f2d700",
            "sample": "#ffa01a"
          },
          "hidden": false,
          "sticky": false,
          "muted": false,
          "folder": "Some-Folder"
        },
        "id": "demo-room",
        "createdTimeMS": 1525001412492
      }
    ]
  }
}
```

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- Invalid client key or authorization token
- Incorrect `updatedAfter` time format
- Invalid JSON format for the `pref` parameter
- Internal server error

------

## Use Cases

### Room List Display
- **Home page room list**: Use pagination and sorting to retrieve the user's room list
- **Tag filtering**: Filter specific rooms by tags using the `pref` parameter

### Incremental Synchronization
- **Efficient sync**: Use `updatedAfter` with the timestamp from the last request to fetch only updated rooms

------

## Notes

- **Incremental sync**: Use `updatedAfter` with the timestamp from the last request to achieve efficient incremental synchronization, avoiding full data pulls each time
- **Pagination recommendation**: It is recommended to use `limit` and `skip` for pagination to avoid returning too much data at once, which can impact performance
- **Sorting**: The `sort` field separates multiple criteria by spaces, with a `-` prefix indicating descending order
- **`pref` filtering**: The `pref` parameter is in JSON format and must be URL-encoded before being passed
- **`inspect` field**: For debugging purposes only; contains the actual query criteria and execution time, and can be ignored in production environments
