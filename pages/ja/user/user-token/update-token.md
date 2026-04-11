# Update Token

## Overview

Update the access token and validity period for a specified user. Suitable for scenarios such as token rotation, extending validity, or replacing authentication credentials.

------

## API Endpoint

### Update User Token

Update the access token and expiration time for a specified user.

```http
PUT /admin/clients/{client_id}/token
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your API key |
| `Content-Type` | string | ✅ | `application/json` |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `client_id` | string | ✅ | Unique user identifier |

#### Request Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `token` | string | ✅ | New access token |
| `expirationDate` | string | ✅ | Token expiration time (ISO 8601 format) |

#### Example Request

**JavaScript Example:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    token: "new-token-001",
    expirationDate: "2026-01-01T00:00:00Z",
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
curl -X "PUT" "https://your-app.imkit.io/admin/clients/{client_id}/token" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d $'{
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z"
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
| `token` | string | Updated access token |
| `expirationDate` | string | Updated token expiration time |
| `updatedAt` | string | Token update time (ISO 8601 format) |

#### Example Response

```json
{
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z",
  "updatedAt": "2025-08-10T10:30:00Z"
}
```

#### Error Response

**400 Bad Request** — Invalid request parameters

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid expirationDate format"
}
```

**401 Unauthorized** — Invalid API key

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** — User not found

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user002' not found"
}
```

**409 Conflict** — Token conflict

```json
{
  "error": "TOKEN_CONFLICT",
  "message": "Token already exists for another client"
}
```

------

## Use Cases

### Token Lifecycle Management
- **Regular Rotation**: Periodically update tokens to enhance security
- **Extend Validity**: Extend the validity period of tokens that are about to expire
- **Emergency Update**: Urgently replace tokens when a security incident occurs

### System Maintenance
- **Batch Update**: Batch update user tokens during system upgrades
- **Format Migration**: Migrate from old token formats to new formats

------

## Notes

- **Immediate Effect**: Token updates take effect immediately; the old token will be invalidated
- **Uniqueness Check**: The system checks whether the new token conflicts with other users
- **Time Format**: `expirationDate` must be in ISO 8601 format
- **Token Complexity**: It is recommended to use a sufficiently complex token format
- **Expiration Time Settings**: Set a reasonable expiration time, balancing security and usability
- **Synchronization Mechanism**: Ensure synchronization with your authentication system when updating
