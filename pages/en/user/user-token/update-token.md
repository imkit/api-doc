# Update Token

## Overview

Update the access token and validity period for a specified user. Suitable for scenarios such as token rotation, extending validity period, or replacing authentication credentials.

------

## API Endpoint

### Update User Token

Update the access token and expiration time for a specified user.

```http
PUT /admin/clients/{client_id}/token
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

| Parameter        | Type   | Required | Description                      |
| ---------------- | ------ | -------- | -------------------------------- |
| `token`          | string | ✅       | New access token                 |
| `expirationDate` | string | ✅       | Token expiration time (ISO 8601 format) |

#### Example Request

```json
{
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z"
}
```

#### Response

**Success Response (200 OK)**

| Parameter          | Type    | Description                      |
| ------------------ | ------- | -------------------------------- |
| `_id`              | string  | User unique identifier           |
| `nickname`         | string  | User display name                |
| `avatarUrl`        | string  | User avatar URL                  |
| `issueAccessToken` | boolean | Token issue mode                 |
| `token`            | string  | Updated access token             |
| `expirationDate`   | string  | Updated token expiration time    |
| `updatedAt`        | string  | Token update time (ISO 8601 format) |

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

**400 Bad Request** - Request parameter error

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid expirationDate format"
}
```

**400 Bad Request** - Token format error

```json
{
  "error": "INVALID_TOKEN",
  "message": "Token cannot be empty"
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
  "message": "Client with id 'user002' not found"
}
```

**409 Conflict** - Token conflict

```json
{
  "error": "TOKEN_CONFLICT",
  "message": "Token already exists for another client"
}
```

------

## Use Cases

### Token Lifecycle Management

- **Regular Rotation**: Regularly update tokens to improve security
- **Extend Validity**: Extend the validity period of tokens about to expire
- **Emergency Update**: Urgently replace tokens when security incidents occur

### System Maintenance

- **Batch Update**: Batch update user tokens during system upgrades
- **Format Migration**: Migrate from old format tokens to new format
- **Permission Adjustment**: Adjust token content to reflect new permission settings

## Notes

- **Immediate Effect**: Token updates take effect immediately, old tokens will become invalid
- **Uniqueness Check**: System will check if new token conflicts with other users
- **Time Format**: `expirationDate` must use ISO 8601 format
- **Forward Compatibility**: Ensure new tokens are compatible with existing systems

## Best Practices

### Security Considerations

1. **Token Complexity**: Use sufficiently complex token formats
2. **Expiration Time Setting**: Set reasonable expiration times, balancing security and convenience
3. **Update Frequency**: Establish regular token update mechanisms
4. **Audit Records**: Log all token update operations

### Operation Recommendations

1. **Progressive Updates**: Update tokens for large numbers of users in batches
2. **Validation Mechanism**: Validate new token validity before updating
3. **Rollback Preparation**: Prepare rollback mechanisms for update failures
4. **Monitoring Alerts**: Monitor token update success rates and anomalies

### Integration Recommendations

1. **Automation Process**: Establish automated token update workflows
2. **Synchronization Mechanism**: Ensure synchronous updates with your authentication system
3. **Notification System**: Notify relevant systems or users after successful updates
4. **Backup Strategy**: Backup old token information before updating