# Issue Token

## Overview

User data is created by your server, but the authorization token is issued and managed by the IMKIT Chat Server. This mode is suitable for applications that want to integrate quickly without needing to manage the token lifecycle on their own.

Implementation flow:
1. Use the `/admin/clients` API to create a Client with `issueAccessToken: true`
2. The Chat Server will issue an access token that can be used for subsequent API calls
3. Use the returned token for client-side authentication

------

## API Endpoint

### Create a User and Issue a Token

Create a new user and have the Chat Server automatically issue an access token.

```http
POST /admin/clients
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your API key |
| `Content-Type` | string | ✅ | `application/json` |

#### Request Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | Unique user identifier |
| `nickname` | string | ❌ | User display name |
| `avatarUrl` | string | ❌ | User avatar URL |
| `issueAccessToken` | boolean | ✅ | Set to `true` to enable this authorization mode |

#### Example Request

**JavaScript Example:**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user001",
    nickname: "Amy",
    avatarUrl: "https://example.com/avatar.jpg",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL Example:**

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d $'{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true
}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | Unique user identifier |
| `nickname` | string | User display name |
| `avatarUrl` | string | User avatar URL |
| `issueAccessToken` | boolean | Token issue mode |
| `token` | string | Access token issued by the Chat Server |
| `expirationDate` | string | Token expiration time (ISO 8601 format) |

#### Example Response

```json
{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expirationDate": "2025-06-30T12:00:00Z"
}
```

#### Error Response

**400 Bad Request** — Invalid request parameters

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: _id"
}
```

**401 Unauthorized** — Invalid API key

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**409 Conflict** — User already exists

```json
{
  "error": "USER_EXISTS",
  "message": "User with _id 'user001' already exists"
}
```

------

## Use Cases

### Rapid Integration
- **Simple Development**: Let the system automatically generate tokens without needing to manage token generation logic yourself
- **Quick Validation**: Suitable for quickly obtaining valid access tokens during development and testing

### User Provisioning
- **New User Registration**: Create an IMKIT user and obtain a token at the same time during user registration, all in one step
- **Automated Workflow**: Automatically create accounts and obtain access tokens for new users in backend services

------

## Notes

- **Token Validity Period**: Managed by the Chat Server; pay attention to the `expirationDate` field
- **Token Expiration**: After expiration, you can call the same endpoint (`POST /admin/clients` with `issueAccessToken: true`) again to obtain a new token without needing to delete the user
- **No Customization**: In this mode, the token content and expiration time cannot be customized
- **Caching Recommendation**: It is recommended to cache the token in your application to avoid redundant requests
- **Using the Token**: After obtaining the token, pass it via the `IM-Authorization` header in subsequent API calls
