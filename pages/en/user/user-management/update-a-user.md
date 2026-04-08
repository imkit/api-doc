# Update User

## Overview

This endpoint allows you to update existing user information in the system. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Update User
Update existing client information in the system.

```http
POST /admin/clients
```

#### Headers

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

The request body should contain user update information in JSON format.

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `_id` | string | ✅ | Unique ID of the client to update |
| `nickname` | string | ❌ | Client display name |
| `avatarUrl` | string | ❌ | Client avatar image URL |
| `issueAccessToken` | boolean | ❌ | Set to `true` to regenerate access token; set to `false` or omit to use custom token |
| `token` | string | ❌ | New token to bind (used when `issueAccessToken` is `false` or omitted) |
| `expirationDate` | string | ❌ | Token expiration time (ISO format, set when using custom token) |

#### Example Request

##### Option 1: Reissue Access Token

Use this option to regenerate a new access token for the existing user.

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    _id: "user123",
    nickname: "John Wang", // Update display name
    avatarUrl: "https://example.com/new-avatar.jpg", // Update avatar
    issueAccessToken: true, // Reissue token
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### Option 2: Bind Specific Token

Use this option to bind a new custom token to the existing client.

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {Your_API_Key}
Content-Type: application/json; charset=utf-8
Host: imkit-dev.funtek.io

{
  "_id": "user123",
  "nickname": "John Wang",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "token": "a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
  "expirationDate": "2025-12-31T23:59:59.999Z"
}
```

##### Option 3: Update Basic Information Only

If you only need to update the client's basic information (such as nickname, avatar), you can omit all token-related parameters.

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    _id: "user123",
    nickname: "John Wang",
    avatarUrl: "https://example.com/new-avatar.jpg"
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**Success Response (200 OK)**

When the request is successful, the API returns the updated client information:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `RC` | number | Response code (0 means success) |
| `RM` | string | Response message |
| `result` | object | Updated client information |

**Client Object Fields**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `_id` | string | User unique identifier |
| `nickname` | string | Updated user display name |
| `avatarUrl` | string | Updated user avatar image URL |
| `token` | string | Access token (only appears when reissuing or binding new token) |
| `expirationDate` | string | Token expiration time (only appears when token operation occurs) |
| `updatedAt` | string | Last update timestamp (ISO format) |
| `lastLoginTimeMS` | number | Last login timestamp (milliseconds) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "John Wang",
    "description": "User description",
    "avatarUrl": "https://example.com/new-avatar.jpg",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2025-08-08T10:30:45.123Z",
    "isRobot": false,
    "mute": [],
    "id": "user123",
    "lastLoginTimeMS": 1588744338369,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2025-12-31T23:59:59.999Z"
  }
}
```

#### Error Response

When the request fails, you will receive an error response containing detailed error information. Common error scenarios include:

- **Invalid API key** - The provided `IM-API-KEY` is invalid or expired
- **Client does not exist** - The specified `_id` was not found
- **Invalid token format** - The custom token format is incorrect
- **Parameter format error** - The provided parameters do not meet the required format
- **Internal server error** - An unexpected error occurred on the server side

------

## Use Cases

### User Information Maintenance
- **Update display name and avatar**: When a user modifies their profile, only update basic information like `nickname` and `avatarUrl`
- **Reissue access token**: When a user's token is about to expire or needs to be refreshed, set `issueAccessToken: true` to regenerate

### Token Management
- **Bind custom token**: When integrating with an external authentication system, bind a custom token to an existing client
- **Token rotation**: Periodically replace user tokens to improve security

------

## Notes

- **User must exist**: Must provide a valid `_id` to identify the client to be updated; if the client does not exist, the request will fail
- **Partial update**: Only provided fields will be updated, unspecified fields retain their original values
- **Token invalidation**: Reissuing tokens will invalidate the old token
- **Token replacement**: Binding a new token will replace the existing token
- **Timestamp format**: All timestamps are in UTC format
- **Avatar image**: Avatar image file size should be kept within reasonable limits
- **Server-side only**: This endpoint is specifically for updating existing client information
