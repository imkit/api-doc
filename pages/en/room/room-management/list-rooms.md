# Room List

This endpoint retrieves a list of rooms that the current user has joined. It supports pagination, sorting, and conditional filtering. Suitable for room list display and incremental sync scenarios.

## HTTP Request

```
GET /rooms
```

## Authentication

Include your client key and authorization token in the request headers:

| Header             | Description               | Required |
| ------------------ | ------------------------- | -------- |
| `IM-CLIENT-KEY`    | Client Key                | ✅        |
| `IM-CLIENT-ID`     | Client ID of current user | ✅        |
| `IM-Authorization` | Client Token              | ✅        |

## Query Parameters

| Parameter         | Type               | Required | Description                                                                                                              |
| ----------------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `sort`            | string             | ❌        | Sorting criteria. Combine multiple fields separated by spaces. Prefix `-` for descending order.                          |
| `skip`            | integer            | ❌        | Pagination offset. Default: `0`                                                                                          |
| `limit`           | integer            | ❌        | Maximum number of rooms to return. Default: `0` (unlimited)                                                              |
| `updatedAfter`    | string or integer  | ❌        | Filter rooms that have a last message or were created after the specified timestamp. Accepts ISO-8601 or millisecond Epoch |
| `pref`            | JSON               | ❌        | Filter by user's room preferences. e.g. `{"tags": "some-tag"}`                                                           |
| `sortUnreadFirst` | integer            | ❌        | Set to a non-zero value to sort rooms with unread messages first                                                         |

### sort Parameter Examples

**Sort by last message and created time in descending order:**

```
-lastMessage -createdTime
```

**Sort by created time in ascending order:**

```
createdTime
```

## Examples

### Example 1: List Rooms with Pagination and Time Filter

**cURL:**

```bash
curl "http://localhost:3100/rooms?skip=0&limit=20&sort=-lastMessage&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {YOUR_CLIENT_KEY}' \
     -H 'IM-CLIENT-ID: {YOUR_CLIENT_ID}' \
     -H 'IM-Authorization: {YOUR_TOKEN}'
```

**JavaScript:**

```javascript
const response = await axios.get(
  "http://localhost:3100/rooms",
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

### Example 2: Filter by Tag and Prioritize Unread Rooms

**JavaScript:**

```javascript
const response = await axios.get(
  "http://localhost:3100/rooms",
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

## Response

### Success Response

When the request succeeds, the API returns a list of matching rooms:

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

### Response Fields

| Field                 | Type          | Description                                  |
| --------------------- | ------------- | -------------------------------------------- |
| `RC`                  | number        | Response code (0 means success)              |
| `RM`                  | string        | Response message                             |
| `result.totalCount`   | number        | Total number of matching rooms               |
| `result.data`         | array         | Array of room objects                        |
| `result.inspect`      | object        | Diagnostic info (query conditions and timing)|

#### Room Object Fields

| Field           | Type          | Description                                     |
| --------------- | ------------- | ----------------------------------------------- |
| `_id`           | string        | Unique room ID                                  |
| `name`          | string        | Room name                                       |
| `cover`         | string        | Room cover image URL                            |
| `description`   | string        | Room description                                |
| `roomType`      | string        | Room type (`"direct"` or `"group"`)             |
| `webhook`       | string        | Webhook key or URL                              |
| `botState`      | string        | Bot state                                       |
| `botMode`       | boolean       | Whether bot mode is enabled                     |
| `encrypted`     | boolean       | Whether the room is encrypted                   |
| `serviceStatus` | number        | Service status                                  |
| `roomTags`      | array[string] | Room tag array                                  |
| `status`        | number        | Room status (`1` means active)                  |
| `unread`        | number        | Unread message count for the current user       |
| `muted`         | boolean       | Whether the current user has muted this room    |
| `lastMessage`   | object        | Most recent message object                      |
| `members`       | array[object] | Array of member objects                         |
| `pref`          | object        | Current user's personal preferences for this room |
| `createdTimeMS` | number        | Room creation timestamp (milliseconds)          |

#### Preference Object Fields (`pref`)

| Field       | Type          | Description                                  |
| ----------- | ------------- | -------------------------------------------- |
| `tags`      | array[string] | Custom tags the user has applied to the room |
| `tagColors` | object        | Color (hex) mapped to each tag               |
| `hidden`    | boolean       | Whether the room is hidden                   |
| `sticky`    | boolean       | Whether the room is pinned to the top        |
| `muted`     | boolean       | Whether notifications are muted              |
| `folder`    | string        | Folder name the room belongs to              |

## Error Handling

When the request fails, you will receive an error response with details. Common error cases include:

- Invalid client key or authorization token
- Invalid `updatedAfter` timestamp format
- Invalid JSON format for `pref` parameter
- Internal server error

## Notes

- **Incremental sync**: Use `updatedAfter` with the timestamp from the previous request to efficiently sync only new or updated rooms, avoiding a full data pull each time.
- **Pagination**: Use `limit` and `skip` together to paginate results and avoid performance issues with large datasets.
- **Sorting**: Multiple sort fields are separated by spaces. Prefix `-` indicates descending order.
- **`pref` filtering**: The `pref` parameter must be valid JSON and URL-encoded before sending.
- **`inspect` field**: For debugging purposes only — contains the actual query conditions and execution time. Can be ignored in production.
