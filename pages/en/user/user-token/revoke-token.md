# Revoke Token

## Overview

Revoke the access token of a specified user, making them unable to continue using the chat service. You can choose to revoke a specific token or remove all tokens for that user.

------

## API Endpoint

### Revoke User Token

Revoke the access token of a specified user.

```http
DELETE /admin/clients/{client_id}/token
```

#### Headers

| Parameter      | Type   | Required | Description        |
| -------------- | ------ | -------- | ------------------ |
| `IM-API-KEY`   | string | ✅       | Your API key       |
| `Content-Type` | string | ✅       | `application/json` |

#### Path Parameters

| Parameter   | Type   | Required | Description         |
| ----------- | ------ | -------- | ------------------- |
| `client_id` | string | ✅       | User unique identifier |

#### Request Body

| Parameter | Type   | Required | Description                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------- |
| `token`   | string | ❌       | Specific token to revoke, if not provided, removes all user tokens |

#### Example Request

**Revoke Specific Token**

```json
{
  "token": "old-token-xyz"
}
```

**Revoke All Tokens**

```json
{}
```

#### Response

**Success Response (200 OK)**

| Parameter      | Type    | Description               |
| -------------- | ------- | ------------------------- |
| `success`      | boolean | Whether operation succeeded |
| `message`      | string  | Operation result message  |
| `revokedTokens`| number  | Number of tokens revoked  |

#### Example Response

**Revoke Specific Token**

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

**400 Bad Request** - Request parameter error

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid client_id format"
}
```

**401 Unauthorized** - Invalid API key

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** - User does not exist

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user001' not found"
}
```

**404 Not Found** - Token does not exist (when specifying a specific token)

```json
{
  "error": "TOKEN_NOT_FOUND",
  "message": "Specified token not found for this client"
}
```

------

## Use Cases

### Security Considerations

- **Account Compromise**: Immediately revoke all tokens to ensure security
- **Device Loss**: Revoke specific device tokens
- **Employee Departure**: Revoke all tokens for enterprise users

### System Management

- **Force Logout**: Revoke tokens to force user re-authentication
- **Token Rotation**: Regularly revoke old tokens to improve security
- **Permission Changes**: Revoke tokens to reassign permissions

## Notes

- **Immediate Effect**: Token revocation takes effect immediately, users will be unable to continue using chat functions
- **Irreversible**: Revoked tokens cannot be restored, need to reissue or assign new tokens
- **Batch Operation**: Not providing `token` parameter revokes all tokens for the user at once
- **Audit Logs**: Recommend logging token revocation operations for future auditing

## Best Practices

1. **Progressive Revocation**: Prioritize revoking specific tokens to avoid affecting user's other devices
2. **Notification System**: Notify users before revoking tokens to provide good user experience
3. **Monitoring System**: Monitor revocation operations to prevent accidental operations or malicious attacks
4. **Backup Strategy**: Back up important user session data before revocation