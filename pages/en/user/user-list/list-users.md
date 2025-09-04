# User List

## Overview

Query and search the user list in your application. Supports conditional filtering, paginated queries, and complex searches using MongoDB query syntax. Suitable for user management, data analysis, and system monitoring scenarios.

------

## API Endpoint

### Query User List

Get the user list in your application with filtering and pagination support.

```http
GET /admin/clients
```

#### Headers

| Parameter    | Type   | Required | Description   |
| ------------ | ------ | -------- | ------------- |
| `IM-API-KEY` | string | ✅       | Your API key  |

#### Query Parameters

| Parameter | Type   | Required | Description                                               |
| --------- | ------ | -------- | --------------------------------------------------------- |
| `q`       | string | ❌       | MongoDB query syntax for conditional filtering           |
| `limit`   | number | ❌       | Maximum number of users per page (default: 50, max: 100) |
| `skip`    | number | ❌       | Number of users to skip for pagination (default: 0)      |

#### Query Syntax Examples

**Basic Filtering**

```javascript
// Query users with nickname containing "AB"
q={"nickname": {"$regex": ".*AB.*"}}

// Query users with specific email
q={"email": "user@example.com"}

// Query recently logged in users (within 7 days)
q={"lastLoginTimeMS": {"$gte": 1640995200000}}
```

**Compound Conditions**

```javascript
// Query users with nickname containing "admin" and have email
q={"nickname": {"$regex": ".*admin.*"}, "email": {"$exists": true}}

// Query users registered within specific time range
q={"createdAt": {"$gte": "2025-01-01T00:00:00Z", "$lt": "2025-02-01T00:00:00Z"}}
```

#### Example Request

**Get All Users**

```http
GET /admin/clients?limit=20&skip=0
```

**Search Specific Users**

```http
GET /admin/clients?q=%7B%22nickname%22:%7B%22%24regex%22:%22.*AB.*%22%7D%7D&limit=10
```

#### Response

**Success Response (200 OK)**

| Parameter           | Type   | Description                      |
| ------------------- | ------ | -------------------------------- |
| `RC`                | number | Response code (0 means success) |
| `RM`                | string | Response message                 |
| `result`            | object | Query results                    |
| `result.totalCount` | number | Total number of matching users   |
| `result.data`       | array  | User data array                  |

**User Object Structure**

| Parameter         | Type   | Description                                |
| ----------------- | ------ | ------------------------------------------ |
| `_id`             | string | User unique identifier                     |
| `nickname`        | string | User display name                          |
| `email`           | string | User email (if provided)                   |
| `avatarUrl`       | string | User avatar URL                            |
| `address`         | object | Last connection network address info       |
| `userAgent`       | string | Last used browser/application info         |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp)    |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "_id": "user001",
        "email": "test@example.com",
        "nickname": "Test AB User",
        "avatarUrl": "https://example.com/avatar.jpg",
        "address": {
          "port": 49315,
          "family": "IPv6",
          "address": "::ffff:118.168.96.151"
        },
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "lastLoginTimeMS": 1640995200000
      }
    ]
  }
}
```

#### Error Response

**400 Bad Request** - Query syntax error

```json
{
  "RC": 400,
  "RM": "Invalid query syntax",
  "error": {
    "code": "INVALID_QUERY",
    "message": "MongoDB query syntax error"
  }
}
```

**401 Unauthorized** - Invalid API key

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

**413 Payload Too Large** - Query result too large

```json
{
  "RC": 413,
  "RM": "Query result too large",
  "error": {
    "code": "RESULT_TOO_LARGE",
    "message": "Please use more specific query or smaller limit"
  }
}
```

------

## Use Cases

### User Management

- **User List Display**: Show all users in admin dashboard
- **User Search**: Search for specific users by nickname, email, etc.
- **Batch Operations**: Select multiple users for batch management

### Data Analysis

- **Activity Analysis**: Query recently logged in user statistics
- **User Distribution**: Analyze user geographic distribution and device usage
- **Growth Tracking**: Track user growth in specific time periods

### System Monitoring

- **Anomaly Detection**: Query users with abnormal login behavior
- **Capacity Planning**: Understand total user count and growth trends
- **Compliance Review**: Query specific user data as needed

------

## MongoDB Query Syntax Guide

### Basic Operators

| Operator | Description     | Example                                       |
| -------- | --------------- | --------------------------------------------- |
| `$eq`    | Equals          | `{"nickname": {"$eq": "Alice"}}`              |
| `$ne`    | Not equals      | `{"nickname": {"$ne": "Admin"}}`              |
| `$gt`    | Greater than    | `{"lastLoginTimeMS": {"$gt": 1640995200000}}` |
| `$gte`   | Greater or equal| `{"createdAt": {"$gte": "2025-01-01"}}`       |
| `$lt`    | Less than       | `{"lastLoginTimeMS": {"$lt": 1640995200000}}` |
| `$lte`   | Less or equal   | `{"createdAt": {"$lte": "2025-12-31"}}`       |

### String Operations

| Operator | Description       | Example                                                  |
| -------- | ----------------- | -------------------------------------------------------- |
| `$regex` | Regular expression| `{"nickname": {"$regex": ".*admin.*", "$options": "i"}}`|
| `$in`    | In list           | `{"_id": {"$in": ["user1", "user2", "user3"]}}`         |
| `$nin`   | Not in list       | `{"nickname": {"$nin": ["admin", "test"]}}`             |

### Existence Check

| Operator  | Description  | Example                                    |
| --------- | ------------ | ------------------------------------------ |
| `$exists` | Field exists | `{"email": {"$exists": true}}`             |
| `$type`   | Data type    | `{"lastLoginTimeMS": {"$type": "number"}}` |

------

## Pagination Best Practices

### Basic Pagination

```javascript
// First page (20 per page)
GET /admin/clients?limit=20&skip=0

// Second page
GET /admin/clients?limit=20&skip=20

// Third page
GET /admin/clients?limit=20&skip=40
```

### Large Dataset Handling

```javascript
// For large amounts of data, recommend using more specific query conditions
GET /admin/clients?q={"lastLoginTimeMS":{"$gte":1640995200000}}&limit=50
```

## Performance Considerations

- **Index Usage**: Commonly queried fields (like nickname, email) have indexes created
- **Query Optimization**: Avoid overly complex regular expressions
- **Pagination Limits**: Single query returns maximum 100 records
- **Caching Recommendations**: Recommend implementing caching for infrequently changing query results

## Notes

- **Query Syntax**: Must use valid MongoDB query syntax
- **URL Encoding**: Query parameters need to be URL encoded
- **Sensitive Information**: Response does not include user tokens or other sensitive information
- **Permission Control**: Only administrator privileges can call this API