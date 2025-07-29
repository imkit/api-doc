# Create or update a list of clients

This API should be used by server side.

### path

/admin/clients/list

### Method

POST

### Headers:

| Field      | Description      |
| ---------- | ---------------- |
| IM-API-KEY | Platform API Key |

### Request Parameters

| Name | Description         |
| ---- | ------------------- |
| data | Array of ClientInfo |

#### ClientInfo

| Name      | Description |
| --------- | ----------- |
| \_id      | Client ID   |
| nickname  | Nickname    |
| avatarUrl | Avatar URL  |

#### Example

```
POST /admin/clients/list HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
Content-Length: 196

{"data":[{"_id":"test-client-86","nickname":"Eighty Six","avatarUrl":"http://example.com/avatarUrl"},{"_id":"test-client-87","nickname":"Eighty Seven","avatarUrl":"http://example.com/avatarUrl"}]}

```

### Response Result

Updated client count

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 2
  }
}
```
