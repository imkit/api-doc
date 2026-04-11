# List User Groups

## Overview

Query the list of all user groups in the system. The `limit` parameter can be used to control the number of results returned. This is a server-side API that requires `IM-API-KEY` authentication.

------

## API Endpoint

### Query User Group List

Retrieve the list of all user groups in the system.

```http
GET /admin/groups
```

#### Headers

| Parameter         | Type   | Required | Description              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | Your platform API key |

#### Query Parameters

| Parameter    | Type   | Required | Description                             |
| ------- | ------ | ---- | -------------------------------- |
| `limit` | number | ❌    | Maximum number of groups to return               |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/groups",
  {
    params: {
      limit: 50
    },
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/groups?limit=50" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**Success Response (200 OK)**

| Parameter                    | Type   | Description                         |
| ----------------------- | ------ | ---------------------------- |
| `RC`                    | number | Response code (0 indicates success)       |
| `RM`                    | string | Response message                     |
| `result`                | object | Query results                     |
| `result.totalCount`     | number | Total number of groups                     |
| `result.data`           | array  | Array of group data                 |

**Group Object Structure**

| Parameter        | Type   | Description                       |
| ----------- | ------ | -------------------------- |
| `_id`       | string | Unique group identifier             |
| `nickname`  | string | Group display name               |
| `avatarUrl` | string | Group avatar image URL           |
| `members`   | array  | Array of Client IDs for group members  |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 3,
    "data": [
      {
        "_id": "group_customer_service",
        "nickname": "客服團隊",
        "avatarUrl": "https://example.com/cs-avatar.png",
        "members": ["agent001", "agent002", "agent003"]
      },
      {
        "_id": "group_sales",
        "nickname": "業務團隊",
        "avatarUrl": "https://example.com/sales-avatar.png",
        "members": ["sales001", "sales002"]
      },
      {
        "_id": "group_engineering",
        "nickname": "工程團隊",
        "avatarUrl": "https://example.com/eng-avatar.png",
        "members": ["dev001", "dev002", "dev003", "dev004"]
      }
    ]
  }
}
```

#### Error Response

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

------

## Use Cases

### Group Management
- **Group Overview**: List all user groups in the admin dashboard to provide a management interface
- **Member Review**: View the member composition of each group to ensure permission configurations are correct

### System Integration
- **Sync Group Data**: Synchronize group data to external systems (such as CRM or HR systems)
- **Permission Auditing**: Periodically export the group list for access permission auditing

------

## Notes

- **Server-Side Only**: This endpoint requires `IM-API-KEY` authentication and is for server-side use only
- **limit Parameter**: When `limit` is not specified, the system will return a default number of groups
- **Group Concept**: The returned results are user groups (virtual users), not group chat rooms
- **Member Information**: The `members` field only contains Client IDs. For detailed member information, query the User API separately
