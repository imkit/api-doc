# Update a User

## Overview

This endpoint allows you to update existing user information in the system. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Update a User
Update existing user information in the system.

```http
POST /admin/clients
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Request Body

The request body should contain user update information in JSON format.

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | Unique identifier of the user to update |
| `nickname` | string | ❌ | User display name |
| `avatarUrl` | string | ❌ | User avatar image URL |
| `issueAccessToken` | boolean | ❌ | Set to `true` to regenerate an access token; set to `false` or omit to use a custom token |
| `token` | string | ❌ | New token to bind (used when `issueAccessToken` is `false` or omitted) |
| `expirationDate` | string | ❌ | Token expiration time (ISO format, set when using a custom token) |

#### Example Request

##### Option 1: Reissue Access Token

Use this option to regenerate a new access token for an existing user.

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user123",
    nickname: "王小華", // Update display name
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

##### Option 2: Bind a Specific Token

Use this option to bind a new custom token to an existing user.

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io

{
  "_id": "user123",
  "nickname": "王小華",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "token": "a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
  "expirationDate": "2025-12-31T23:59:59.999Z"
}
```

##### Option 3: Update Basic Information Only

If you only need to update the user's basic information (such as nickname and avatar), you can omit all token-related parameters.

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user123",
    nickname: "王小華",
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

When the request is successful, the API returns the updated user information:

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Updated user information |

**User Object Fields**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | Unique user identifier |
| `nickname` | string | Updated user display name |
| `avatarUrl` | string | Updated user avatar image URL |
| `token` | string | Access token (only present when a token is reissued or a new token is bound) |
| `expirationDate` | string | Token expiration time (only present when a token operation occurs) |
| `updatedAt` | string | Last updated timestamp (ISO format) |
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
    "nickname": "王小華",
    "description": "使用者描述",
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

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- **Invalid API Key** - The provided `IM-API-KEY` is invalid or expired
- **User Not Found** - No user found with the specified `_id`
- **Invalid Token Format** - The custom token format is incorrect
- **Invalid Parameter Format** - The provided parameters do not meet the required format
- **Internal Server Error** - An unexpected error occurred on the server side

------

## Use Cases

### User Information Maintenance
- **Update Display Name and Avatar**: When a user modifies their profile, update only the basic information such as `nickname` and `avatarUrl`
- **Reissue Access Token**: When a user's token is about to expire or needs to be refreshed, set `issueAccessToken: true` to regenerate

### Token Management
- **Bind Custom Token**: When integrating with an external authentication system, bind a custom token to an existing user
- **Token Rotation**: Periodically replace user tokens to enhance security

------

## Notes

- **User Must Exist**: The use case on this page is for updating existing users. If you need to support both creation and update, refer to [Create a User](/en/user/user-management/create-a-user)
- **Partial Update**: Only the provided fields will be updated; fields not provided will retain their original values
- **Token Invalidation**: Reissuing a token will invalidate the old token
- **Token Replacement**: Binding a new token will replace the existing token
- **Timestamp Format**: All timestamps are in UTC format
- **Avatar Image**: The avatar image file size should be kept within a reasonable range
- **Server-Side Only**: This endpoint is exclusively for updating existing user information
