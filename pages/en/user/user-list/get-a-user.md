# Get User Information

## Overview

Get detailed information about the currently logged-in user. This API can be used to obtain personal profile, login status, and other related information of the current authenticated user.

------

## API Endpoint

### Get Current User Information

Get complete data of the currently logged-in user.

```http
GET /me
```

#### Headers

| Parameter       | Type   | Required | Description  |
| --------------- | ------ | -------- | ------------ |
| `IM-CLIENT-KEY` | string | ✅       | Client Key   |
| `Authorization` | string | ✅       | Client Token |

#### Example Request

```http
GET /me HTTP/1.1
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Host: 104.199.197.188:3100
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `RC`      | number | Response code (0 means success) |
| `RM`      | string | Response message                 |
| `result`  | object | User detailed information        |

**User Object Structure**

| Parameter             | Type    | Description                                |
| --------------------- | ------- | ------------------------------------------ |
| `_id`                 | string  | User unique identifier                     |
| `email`               | string  | User email                                 |
| `nickname`            | string  | User display name                          |
| `appID`               | string  | Application identifier                     |
| `avatarUrl`           | string  | User avatar URL                            |
| `address`             | object  | Last connection network address info       |
| `userAgent`           | string  | Last used browser/application info         |
| `lastLoginTimeMS`     | number  | Last login time (millisecond timestamp)    |
| `notificationEnabled` | boolean | Whether notifications are enabled          |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test CCDD",
    "appID": "SampleApp",
    "__v": 0,
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 52808,
      "family": "IPv6",
      "address": "::ffff:210.242.193.226"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    "lastLoginTimeMS": 1486027236514,
    "notificationEnabled": true
  }
}
```

#### Error Response

**401 Unauthorized** - Authentication failed

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**403 Forbidden** - Invalid Client Key

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "INVALID_CLIENT_KEY",
    "message": "Invalid client key"
  }
}
```

------

## Use Cases

### User Data Display
- **Personal Profile Page**: Display user's personal information in the application
- **Settings Page**: Load current user settings for editing
- **Permission Check**: Verify user identity and permissions

### Status Check
- **Login Verification**: Confirm if user login status is valid
- **Session Management**: Check if user session has expired
- **Notification Settings**: Confirm user's notification preferences

------

## Notes

- **Authentication Required**: This API requires valid user authentication
- **Sensitive Information**: Will not return passwords or other sensitive information
- **Caching Recommendations**: User information can be appropriately cached to improve performance
- **Privacy Protection**: Only returns information for the current authenticated user