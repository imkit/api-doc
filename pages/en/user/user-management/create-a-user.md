# Create User

## Overview

This endpoint allows you to create new users in the system. This API is for server-side use only and requires proper authentication.

------

## API Endpoint

### Create User
Create a new client in the system.

```http
POST /admin/clients
```

#### Headers

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

The request body should contain client information in JSON format.

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `_id` | string | ✅ | Client unique ID |
| `nickname` | string | ❌ | Client display name |
| `avatarUrl` | string | ❌ | Client avatar image URL |
| `issueAccessToken` | boolean | ❌ | Set to `true` to generate new access token; set to `false` or omit to use custom token |
| `token` | string | ❌ | Custom token to bind to the client (used when `issueAccessToken` is `false` or omitted) |
| `expirationDate` | string | ❌ | Token expiration time (ISO format, set when using custom token) |

#### Example Request

##### Option 1: Chat Server Issued Token

Use this option to let the chat server automatically generate a new access token for the user.

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    nickname: "John Zhang",
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

Use this option to bind a specific token to the user with custom expiration time.

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {Your_API_Key}
Content-Type: application/json; charset=utf-8
Host: imkit-dev.funtek.io

{
  "nickname": "John Zhang",
  "avatarUrl": "https://example.com/avatar.jpg",
  "_id": "user123",
  "token": "f7b6d364-1e96-4b1a-aa75-cce93268b101",
  "expirationDate": "2020-06-18T06:15:36.763Z"
}
```

#### Response

**Success Response (200 OK)**

When the request is successful, the API returns the created client information:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `RC` | number | Response code (0 means success) |
| `RM` | string | Response message |
| `result` | object | Created client information |

**Client Object Fields**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `_id` | string | User unique identifier |
| `nickname` | string | User display name |
| `avatarUrl` | string | User avatar image URL |
| `token` | string | Access token (only appears when `issueAccessToken` is true) |
| `expirationDate` | string | Token expiration time (only appears when token is issued) |
| `lastLoginTimeMS` | number | Last login timestamp (milliseconds) |
| `updatedAt` | string | Last update timestamp (ISO format) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "John Zhang",
    "description": "User description",
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

When the request fails, you will receive an error response containing detailed error information. Common error scenarios include:

- **Invalid API key** - The provided `IM-API-KEY` is invalid or expired
- **Missing required parameters** - The required `_id` parameter was not provided
- **Invalid token format** - The custom token format is incorrect
- **Internal server error** - An unexpected error occurred on the server side

------

## Use Cases

### User Registration
- **Create user with server-issued token**: When a new user registers, set `issueAccessToken: true` to let the system automatically generate an access token
- **Create user with custom token**: When integrating with an external authentication system, bind a custom token and set the expiration time

------

## Notes

- **Unique identifier**: Each client requires a unique `_id` identifier
- **Token field**: The `token` field in the response is only included when `issueAccessToken` is set to `true`
- **Timestamp format**: All timestamps are in UTC format
- **Avatar image**: Avatar image file size should be kept within reasonable limits
- **Server-side only**: This endpoint is used to create new clients and is for server-side use only
