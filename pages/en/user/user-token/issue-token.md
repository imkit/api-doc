# Issue Token

Tokens are issued by IMKIT Chat Server.

## Overview

User data is created by your server, but authorization tokens are issued and managed by IMKIT Chat Server. This mode is suitable for applications that want rapid integration without needing to manage token lifecycles themselves.

## Implementation Flow

1. Create Client using `/admin/clients` API with `issueAccessToken: true`
2. Chat Server will issue access token, which can be used for subsequent API calls
3. Use the returned token for client authentication

------

## API Endpoint

### Create User and Issue Token

Create a new user and have Chat Server automatically issue access token.

```http
POST /admin/clients
```

#### Headers

| Parameter      | Type   | Required | Description        |
| -------------- | ------ | -------- | ------------------ |
| `IM-API-KEY`   | string | ✅       | Your API key       |
| `Content-Type` | string | ✅       | `application/json` |

#### Request Body

| Parameter          | Type    | Required | Description                      |
| ------------------ | ------- | -------- | -------------------------------- |
| `_id`              | string  | ✅       | User unique identifier           |
| `nickname`         | string  | ✅       | User display name                |
| `avatarUrl`        | string  | ❌       | User avatar URL                  |
| `issueAccessToken` | boolean | ✅       | Set to `true` to enable this authorization mode |

#### Example Request

```json
{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true
}
```

#### Response

**Success Response (200 OK)**

| Parameter          | Type    | Description                         |
| ------------------ | ------- | ----------------------------------- |
| `_id`              | string  | User unique identifier              |
| `nickname`         | string  | User display name                   |
| `avatarUrl`        | string  | User avatar URL                     |
| `issueAccessToken` | boolean | Token issue mode                    |
| `token`            | string  | Access token issued by Chat Server |
| `expirationDate`   | string  | Token expiration time (ISO 8601 format) |

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

**400 Bad Request** - Request parameter error

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: _id"
}
```

**401 Unauthorized** - Invalid API key

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**409 Conflict** - User already exists

```json
{
  "error": "USER_EXISTS",
  "message": "User with _id 'user001' already exists"
}
```

------

## Using Token

After obtaining the token, you can use this token in subsequent API calls:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Notes

- Token validity period is managed by Chat Server, please pay attention to the `expirationDate` field
- After token expiration, you need to recreate the user to get a new token
- In this mode, you cannot customize token content or expiration time
- Recommend caching tokens in your application to avoid duplicate requests