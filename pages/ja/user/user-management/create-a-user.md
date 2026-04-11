# Create a User

## Overview

This endpoint allows you to create or update a user in the system. If the `_id` does not exist, a new user will be created; if it already exists, the user's data will be updated. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Create or Update a User
Create a new user in the system, or update the data of an existing user.

```http
POST /admin/clients
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Request Body

The request body should contain user information in JSON format.

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | Unique user identifier |
| `nickname` | string | ❌ | User display name |
| `avatarUrl` | string | ❌ | User avatar image URL |
| `issueAccessToken` | boolean | ❌ | Set to `true` to generate a new access token; set to `false` or omit to use a custom token |
| `token` | string | ❌ | Custom token to bind to the user (used when `issueAccessToken` is `false` or omitted) |
| `expirationDate` | string | ❌ | Token expiration time (ISO format, set when using a custom token) |

#### Example Request

##### Option 1: Chat Server Issues Token

Use this option to have the chat server automatically generate a new access token for the user.

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    nickname: "張小明",
    avatarUrl: "https://example.com/avatar.jpg",
    _id: "user123",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### Option 2: Custom Token Binding

Use this option to bind a specific token to the user and set a custom expiration time.

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io

{
  "nickname": "張小明",
  "avatarUrl": "https://example.com/avatar.jpg",
  "_id": "user123",
  "token": "f7b6d364-1e96-4b1a-aa75-cce93268b101",
  "expirationDate": "2026-12-31T23:59:59.000Z"
}
```

#### Response

**Success Response (200 OK)**

When the request is successful, the API returns the created user information:

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Created user information |

**User Object Fields**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | Unique user identifier |
| `nickname` | string | User display name |
| `avatarUrl` | string | User avatar image URL |
| `token` | string | Access token (only present when `issueAccessToken` is true) |
| `expirationDate` | string | Token expiration time (only present when a token is issued) |
| `lastLoginTimeMS` | number | Last login timestamp (milliseconds) |
| `updatedAt` | string | Last updated timestamp (ISO format) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "張小明",
    "description": "使用者描述",
    "avatarUrl": "https://example.com/avatar.jpg",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2020-06-11T06:15:36.761Z",
    "isRobot": false,
    "mute": [],
    "id": "user123",
    "lastLoginTimeMS": 1588744338369,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2020-06-18T06:15:36.763Z"
  }
}
```

#### Error Response

When a request fails, you will receive an error response containing error details. Common error scenarios include:

- **Invalid API Key** - The provided `IM-API-KEY` is invalid or expired
- **Missing Required Parameters** - The required `_id` parameter was not provided
- **Invalid Token Format** - The custom token format is incorrect
- **Internal Server Error** - An unexpected error occurred on the server side

------

## Use Cases

### User Registration
- **Create a User with Server-Issued Token**: When a new user registers, set `issueAccessToken: true` to have the system automatically generate an access token
- **Create a User with Custom Token**: When integrating with an external authentication system, bind a custom token and set its expiration time

------

## Notes

- **Unique Identifier**: Each user requires a unique `_id` identifier
- **Token Field**: The `token` field in the response is only included when `issueAccessToken` is set to `true`
- **Timestamp Format**: All timestamps are in UTC format
- **Avatar Image**: The avatar image file size should be kept within a reasonable range
- **Server-Side Only**: This endpoint is for creating new users and is for server-side use only
