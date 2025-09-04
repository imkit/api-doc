# Create User

This endpoint allows you to create new users in the system. This API is for server-side use only and requires proper authentication.

## HTTP Request

```
POST /admin/clients
```

## Authentication

Include your platform API key in the request headers:

| Header       | Description            | Required |
| ------------ | ---------------------- | -------- |
| `IM-API-KEY` | Your platform API key | ✅       |

## Request Body

The request body should contain client information in JSON format.

### Required Parameters

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| `_id`     | string | Client unique ID       |

### Optional Parameters

| Parameter   | Type   | Description          |
| ----------- | ------ | -------------------- |
| `nickname`  | string | Client display name  |
| `avatarUrl` | string | Client avatar image URL |

## Authentication Options

When creating a user, you can choose between two authentication methods:

### Option 1: Chat Server Issued Token

Use this option to let the chat server automatically generate a new access token for the user.

| Parameter          | Type    | Description                            |
| ------------------ | ------- | -------------------------------------- |
| `issueAccessToken` | boolean | Set to `true` to generate new access token |

**Request Example:**

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

### Option 2: Custom Token Binding

Use this option to bind a specific token to the user with custom expiration time.

| Parameter          | Type    | Description                           |
| ------------------ | ------- | ------------------------------------- |
| `issueAccessToken` | boolean | Set to `false` or omit this parameter |
| `token`            | string  | Custom token to bind to the client    |
| `expirationDate`   | string  | Token expiration time (ISO format)    |

**Request Example:**

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

## Response

### Success Response

When the request is successful, the API returns the created client information:

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

### Response Fields

| Field    | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| `RC`     | number | Response code (0 means success) |
| `RM`     | string | Response message                 |
| `result` | object | Created client information       |

#### Client Object Fields

| Field             | Type   | Description                                                   |
| ----------------- | ------ | ------------------------------------------------------------- |
| `_id`             | string | User unique identifier                                        |
| `nickname`        | string | User display name                                             |
| `avatarUrl`       | string | User avatar image URL                                         |
| `token`           | string | Access token (only appears when `issueAccessToken` is true)  |
| `expirationDate`  | string | Token expiration time (only appears when token is issued)    |
| `lastLoginTimeMS` | number | Last login timestamp (milliseconds)                          |
| `updatedAt`       | string | Last update timestamp (ISO format)                           |

## Error Handling

When the request fails, you will receive an error response containing detailed error information. Common error scenarios include:

- Invalid API key
- Missing required parameters
- Invalid token format
- Internal server error

## Usage Notes

- This endpoint is used to create new clients
- Each client requires a unique `_id` identifier
- The `token` field in the response is only included when `issueAccessToken` is set to `true`
- All timestamps are in UTC format
- Avatar image file size should be kept within reasonable limits