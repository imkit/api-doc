# List user groups/teams/organizations

This API should be used by server side.

### path
/admin/groups

### Method
GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-API-KEY    | Platform API Key |

##### List groups
```
GET /admin/groups?limit=10 HTTP/1.1
IM-API-KEY: {API-KEY]
Host: imkit-dev.funtek.io
Connection: close
User-Agent: RapidAPI/4.1.5 (Macintosh; OS X/13.3.0) GCDHTTPRequest

```


### Response Result

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "members": [
          "aaa",
          "sss"
        ],
        "_id": "demo-group",
        "avatarUrl": "http://example.com/avatarUrl",
        "nickname": "Demo Group",
        "id": "demo-group",
      }
    ]
  }
}
```