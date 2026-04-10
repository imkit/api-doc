# List Users

## Overview

Query and search the user list in your application. Supports conditional filtering, pagination, and complex searches using MongoDB query syntax. Suitable for user management, data analysis, and system monitoring scenarios.

------

## API Endpoint

### Query User List

Retrieve the list of users in your application with support for filtering and pagination.

```http
GET /admin/clients
```

#### Headers

| Parameter         | Type   | Required | Description          |
| ------------ | ------ | ---- | ------------- |
| `IM-API-KEY` | string | ✅    | Your API key |

#### Query Parameters

| Parameter    | Type   | Required | Description                                          |
| ------- | ------ | ---- | --------------------------------------------- |
| `q`     | string | ❌    | MongoDB query syntax for conditional filtering                |
| `limit` | number | ❌    | Maximum number of users returned per page (default: 50, max: 100) |
| `skip`  | number | ❌    | Number of users to skip, used for pagination (default: 0)           |

#### Query Syntax Examples

**Basic Filtering**

```javascript
// Query users whose nickname contains "AB"
q={"nickname": {"$regex": ".*AB.*"}}

// Query a user with a specific email
q={"email": "user@example.com"}

// Query recently logged-in users (within the last 7 days)
q={"lastLoginTimeMS": {"$gte": 1640995200000}}
```

**Compound Conditions**

```javascript
// Query users whose nickname contains "admin" and who have an email
q={"nickname": {"$regex": ".*admin.*"}, "email": {"$exists": true}}

// Query users registered within a specific time range
q={"createdAt": {"$gte": "2025-01-01T00:00:00Z", "$lt": "2025-02-01T00:00:00Z"}}
```

#### Example Request

**Get All Users**

```http
GET /admin/clients?limit=20&skip=0
```

**Search for Specific Users**

```http
GET /admin/clients?q=%7B%22nickname%22:%7B%22%24regex%22:%22.*AB.*%22%7D%7D&limit=10
```

**JavaScript Example:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/admin/clients`,
  {
    params: {
      q: JSON.stringify({ nickname: { $regex: ".*AB.*" } }),
      limit: 20,
      skip: 0,
    },
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "GET" "https://your-app.imkit.io/admin/clients?q=%7B%22nickname%22%3A%7B%22%24regex%22%3A%22.*AB.*%22%7D%7D&limit=20&skip=0" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### Response

**Success Response (200 OK)**

| Parameter                | Type   | Description                   |
| ------------------- | ------ | ---------------------- |
| `RC`                | number | Response code (0 indicates success) |
| `RM`                | string | Response message               |
| `result`            | object | Query results               |
| `result.totalCount` | number | Total number of users matching the criteria     |
| `result.data`       | array  | Array of user data           |

**User Object Structure**

| Parameter              | Type   | Description                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | Unique user identifier                |
| `nickname`        | string | User display name                  |
| `email`           | string | User email (if provided)    |
| `avatarUrl`       | string | User avatar URL                  |
| `address`         | object | Last connected network address information        |
| `userAgent`       | string | Last used browser/application information |
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

**400 Bad Request** - Invalid query syntax

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

- **User List Display**: Display all users in the admin dashboard
- **User Search**: Search for specific users based on criteria such as nickname and email
- **Batch Operations**: Select multiple users for batch management

### Data Analysis

- **Activity Analysis**: Query statistics on recently logged-in users
- **User Distribution**: Analyze users' geographic distribution and device usage
- **Growth Tracking**: Track user growth over specific time periods

### System Monitoring

- **Anomaly Detection**: Query users with abnormal login behavior
- **Capacity Planning**: Understand total user count and growth trends
- **Compliance Auditing**: Query specific user data as needed

------

## Notes

- **Query Syntax**: Valid MongoDB query syntax must be used
- **URL Encoding**: Query parameters need to be URL-encoded
- **Sensitive Information**: The response does not include sensitive information such as user tokens
- **Permission Control**: Only administrators can call this API
- **Pagination Limit**: A single query returns a maximum of 100 records
- **Index Usage**: Commonly queried fields (such as nickname and email) are indexed
- **Query Optimization**: Avoid using overly complex regular expressions
- **Caching Recommendation**: It is recommended to implement caching for query results that do not change frequently

------

## Appendix: MongoDB Query Syntax Guide

### Basic Operators

| Operator | Description     | Example                                          |
| ------ | -------- | --------------------------------------------- |
| `$eq`  | Equal to     | `{"nickname": {"$eq": "Alice"}}`              |
| `$ne`  | Not equal to   | `{"nickname": {"$ne": "Admin"}}`              |
| `$gt`  | Greater than     | `{"lastLoginTimeMS": {"$gt": 1640995200000}}` |
| `$gte` | Greater than or equal to | `{"createdAt": {"$gte": "2025-01-01"}}`       |
| `$lt`  | Less than     | `{"lastLoginTimeMS": {"$lt": 1640995200000}}` |
| `$lte` | Less than or equal to | `{"createdAt": {"$lte": "2025-12-31"}}`       |

### String Operations

| Operator   | Description         | Example                                                     |
| -------- | ------------ | -------------------------------------------------------- |
| `$regex` | Regular expression   | `{"nickname": {"$regex": ".*admin.*", "$options": "i"}}` |
| `$in`    | Included in list   | `{"_id": {"$in": ["user1", "user2", "user3"]}}`          |
| `$nin`   | Not included in list | `{"nickname": {"$nin": ["admin", "test"]}}`              |

### Existence Check

| Operator    | Description     | Example                                       |
| --------- | -------- | ------------------------------------------ |
| `$exists` | Field exists | `{"email": {"$exists": true}}`             |
| `$type`   | Data type | `{"lastLoginTimeMS": {"$type": "number"}}` |

------

## Pagination Best Practices

### Basic Pagination

```javascript
// First page (20 records per page)
GET /admin/clients?limit=20&skip=0

// Second page
GET /admin/clients?limit=20&skip=20

// Third page
GET /admin/clients?limit=20&skip=40
```

### Large Dataset Handling

```javascript
// For large datasets, it is recommended to use more specific query criteria
GET /admin/clients?q={"lastLoginTimeMS":{"$gte":1640995200000}}&limit=50
```

## Pagination Recommendations

- For large datasets, it is recommended to use more specific query criteria combined with pagination
- A single query returns a maximum of 100 records
