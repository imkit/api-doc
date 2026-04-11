# Create a Room

## Overview

This endpoint allows you to create a new room in the system and optionally specify members at the same time. This API creates a room but does not automatically add the caller as a member, making it suitable for room management by backend services.

------

## API Endpoint

### Create a Room

Create a new room in the system.

```http
POST /rooms/
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `_id` | string | ❌ | Custom room ID; auto-generated if not specified |
| `name` | string | ❌ | Room name |
| `cover` | string | ❌ | Room cover image URL |
| `roomType` | string | ❌ | Room type: `"direct"` (one-on-one) or `"group"` (group) |
| `members` | array[string] | ❌ | Array of member client IDs |
| `description` | string | ❌ | Room description; can be plain text or serialized JSON data |
| `roomTags` | array[string] | ❌ | Room tags array for searching and categorization |
| `webhook` | string | ❌ | Webhook key or URL |
| `botMode` | boolean | ❌ | Whether to enable room bot |
| `extParams` | string | ❌ | Extended custom parameters in the format `param1=value1&param2=value2` |
| `systemMessage` | boolean | ❌ | Whether to automatically generate system messages (e.g., member join messages) |
| `owner` | string | ❌ | Room owner ID |

#### Example Request

##### Create a One-on-One Room

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/rooms/",
  {
    roomType: "direct",
    members: ["user-a", "user-b"],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### Create a Group Room

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/rooms/",
  {
    _id: "project-room-001",
    name: "專案討論群",
    cover: "https://example.com/cover.jpg",
    roomType: "group",
    roomTags: ["project", "team-a"],
    members: ["user-a", "user-b", "user-c"],
    systemMessage: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### cURL Example

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "name": "專案討論群",
  "roomType": "group",
  "roomTags": ["project", "team-a"],
  "members": ["user-a", "user-b", "user-c"]
}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Created room information |

**Room Object Fields**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | Room unique identifier |
| `name` | string | Room name |
| `cover` | string | Room cover image URL |
| `roomType` | string | Room type (`"direct"` or `"group"`) |
| `members` | array[string] | Member ID array |
| `roomTags` | array[string] | Room tags array |
| `appID` | string | Application identifier |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "project-room-001",
    "appID": "SampleApp",
    "name": "專案討論群",
    "cover": "https://example.com/cover.jpg",
    "roomType": "group",
    "roomTags": ["project", "team-a"],
    "members": ["user-a", "user-b", "user-c"]
  }
}
```

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- **Invalid API key** — The provided `IM-API-KEY` is invalid or expired
- **Invalid room type** — `roomType` is not `"direct"` or `"group"`
- **Member does not exist** — `members` contains a non-existent user ID
- **Internal server error** — An unexpected error occurred on the server side

------

## Use Cases

### User Matching
- **One-on-one customer service chat**: When a user initiates a support request, the backend creates a `direct` room and adds both the user and the support agent
- **Order conversation**: When an order is placed, a one-on-one room is automatically created for the buyer and seller

### Group Management
- **Project groups**: Create a group room for a specific project and add relevant members
- **Event groups**: Create groups for events or courses to manage participants collectively

------

## Notes

- **No auto-join**: This API creates a room but the caller is not automatically added as a member, making it suitable for backend service management
- **Room ID**: If `_id` is not specified, the system will automatically generate a unique identifier
- **Member management**: Members can be specified directly via `members` at creation time, or added later using the "Add a Member" API
- **Tag usage**: `roomTags` can be used for subsequent room search and categorization features
- **Timestamp format**: All timestamps are in UTC format, measured in milliseconds
