# Batch Create Users

## Overview

This endpoint allows you to create or update multiple users at once. It is suitable for scenarios such as system migration and bulk user import. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Batch Create or Update Users

Create or update multiple users at once.

```http
POST /admin/clients/list
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Request Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `data` | array[object] | ✅ | Array of user information objects |

**User Information Object**

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | Unique user identifier |
| `nickname` | string | ❌ | User display name |
| `avatarUrl` | string | ❌ | User avatar image URL |

#### Example Request

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients/list",
  {
    data: [
      {
        _id: "user-001",
        nickname: "Alice",
        avatarUrl: "https://example.com/alice.jpg",
      },
      {
        _id: "user-002",
        nickname: "Bob",
        avatarUrl: "https://example.com/bob.jpg",
      },
      {
        _id: "user-003",
        nickname: "Charlie",
        avatarUrl: "https://example.com/charlie.jpg",
      },
    ],
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
curl -X "POST" "https://your-app.imkit.io/admin/clients/list" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "data": [
    {"_id": "user-001", "nickname": "Alice", "avatarUrl": "https://example.com/alice.jpg"},
    {"_id": "user-002", "nickname": "Bob", "avatarUrl": "https://example.com/bob.jpg"}
  ]
}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result.count` | number | Number of users successfully created or updated |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 3
  }
}
```

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- **Invalid API Key** — The provided `IM-API-KEY` is invalid or expired
- **Invalid Data Format** — The `data` array format is incorrect
- **Missing Required Fields** — The user information is missing the `_id` field
- **Internal Server Error** — An unexpected error occurred on the server side

------

## Use Cases

### System Migration
- **User Import**: Migrate user data from an existing system to IMKIT
- **Batch Initialization**: Batch create all users when an application is launched

### Data Synchronization
- **Periodic Sync**: Periodically synchronize user data (nickname, avatar, etc.) from the primary system
- **Update Information**: Batch update the display names or avatars of multiple users

------

## Notes

- **Server-Side Only**: This endpoint must be called from the backend
- **No Token Generation**: This API does not generate access tokens for users. If tokens are needed, use the "Create a User" API with `issueAccessToken: true`
- **Idempotency**: If the `_id` already exists, the user's data will be updated rather than creating a new user
- **Performance Considerations**: It is recommended to keep each batch under 100 records to avoid request timeouts
