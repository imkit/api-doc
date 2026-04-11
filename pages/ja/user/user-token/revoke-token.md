# Revoke Token

## Overview

Revoke the access token of a specified user, preventing them from continuing to use the chat service. You can choose to revoke a specific token or remove all tokens for that user.

------

## API Endpoint

### Revoke User Token

Revoke the access token of a specified user.

```http
DELETE /admin/clients/{client_id}/token
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
| `token` | string | ❌ | The specific token to revoke; if not provided, all tokens for the user will be removed |

#### Example Request

**Revoke a Specific Token:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      token: "old-token-xyz",
    },
  }
);
```

**Revoke All Tokens:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
    data: {},
  }
);
```

**cURL Example:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/admin/clients/{client_id}/token" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d '{"token": "old-token-xyz"}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `success` | boolean | Whether the operation was successful |
| `message` | string | Operation result message |
| `revokedTokens` | number | Number of tokens revoked |

#### Example Response

**Revoke a Specific Token**

```json
{
  "success": true,
  "message": "Token revoked successfully",
  "revokedTokens": 1
}
```

**Revoke All Tokens**

```json
{
  "success": true,
  "message": "All tokens revoked successfully",
  "revokedTokens": 3
}
```

#### Error Response

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
  "message": "Client with id 'user001' not found"
}
```

**404 Not Found** — Token not found

```json
{
  "error": "TOKEN_NOT_FOUND",
  "message": "Specified token not found for this client"
}
```

------

## Use Cases

### Security Considerations
- **Account Compromised**: Immediately revoke all tokens to ensure security
- **Device Lost**: Revoke the token for the specific device
- **Employee Departure**: Revoke all tokens for the enterprise user

### System Administration
- **Force Logout**: Revoke a token to force the user to log in again
- **Token Rotation**: Periodically revoke old tokens to enhance security
- **Permission Changes**: Revoke tokens to reassign permissions

------

## Notes

- **Immediate Effect**: Token revocation takes effect immediately; the user will no longer be able to use chat features
- **Irreversible**: Revoked tokens cannot be restored; a new token must be reissued or assigned
- **Batch Operation**: Omitting the `token` parameter will revoke all tokens for the user at once
- **Prefer Revoking Specific Tokens**: To avoid affecting the user's other devices, prefer revoking specific tokens
- **Audit Logging**: It is recommended to log token revocation operations for future auditing
