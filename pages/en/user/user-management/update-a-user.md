# Update User

This endpoint allows you to update existing user information in the system. This API is for server-side use only and requires proper authentication.

## HTTP Request

```
POST /admin/clients
```

## Authentication

Include your platform API key in the request headers:

| Header       | Type   | Description            | Required |
| ------------ | ------ | ---------------------- | -------- |
| `IM-API-KEY` | string | Your platform API key | ✅       |

## Request Body

The request body should contain user update information in JSON format.

### Required Parameters

| Parameter | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| `_id`     | string | Unique ID of the client to update  |

### Updatable Parameters

| Parameter   | Type   | Description          |
| ----------- | ------ | -------------------- |
| `nickname`  | string | Client display name  |
| `avatarUrl` | string | Client avatar image URL |

## Token Management Options

When updating a user, you can choose different token management methods:

### Option 1: Reissue Access Token

Use this option to regenerate a new access token for the existing user.

| Parameter          | Type    | Description                                |
| ------------------ | ------- | ------------------------------------------ |
| `issueAccessToken` | boolean | Set to `true` to regenerate access token  |

**Request Example:**

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

### Option 2: Bind Specific Token

Use this option to bind a new custom token to the existing client.

| Parameter          | Type    | Description                           |
| ------------------ | ------- | ------------------------------------- |
| `issueAccessToken` | boolean | Set to `false` or omit this parameter |
| `token`            | string  | New token to bind                     |
| `expirationDate`   | string  | Token expiration time (ISO format)    |

**Request Example:**

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

### Option 3: Update Basic Information Only

If you only need to update the client's basic information (such as nickname, avatar), you can omit all token-related parameters.

**Request Example:**

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

## Response

### Success Response

When the request is successful, the API returns the updated client information:

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

### Response Fields

| Field    | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| `RC`     | number | Response code (0 means success) |
| `RM`     | string | Response message                 |
| `result` | object | Updated client information       |

#### Client Object Fields

| Field             | Type   | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| `_id`             | string | User unique identifier                                             |
| `nickname`        | string | Updated user display name                                          |
| `avatarUrl`       | string | Updated user avatar image URL                                      |
| `token`           | string | Access token (only appears when reissuing or binding new token)   |
| `expirationDate`  | string | Token expiration time (only appears when token operation occurs)  |
| `updatedAt`       | string | Last update timestamp (ISO format)                                |
| `lastLoginTimeMS` | number | Last login timestamp (milliseconds)                               |

## Error Handling

When the request fails, you will receive an error response containing detailed error information. Common error scenarios include:

- Invalid API key
- Client does not exist (specified `_id` not found)
- Invalid token format
- Parameter format error
- Internal server error

## Usage Notes

- This endpoint is specifically for updating existing client information
- Must provide a valid `_id` to identify the client to be updated
- If the client does not exist, the request will fail
- Only provided fields will be updated, unspecified fields retain their original values
- Reissuing tokens will invalidate the old token
- Binding a new token will replace the existing token
- All timestamps are in UTC format
- Avatar image file size should be kept within reasonable limits