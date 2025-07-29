# Mute a room for a client

### path

/admin/clients/:uid/mute/:room

### Method

POST

### Path Parameters

| Field | Description |
| ----- | ----------- |
| uid   | Clinet ID   |
| room  | Room ID     |

```
POST /admin/clients/aaa/mute/demo?limit=10&skip=100 HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.7) GCDHTTPRequest
Content-Length: 0

```

### Response Result

Updated client data

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "mute": ["demo"],
    "isRobot": false,
    "_id": "aaa",
    "__v": 0,
    "appID": "SampleApp",
    "description": "description la la #1541926309694",
    "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
    "nickname": "AAA",
    "email": "arielle.mckellar@coolgoose.ca",
    "address": {
      "address": "::1",
      "family": "IPv6",
      "port": 50392
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "updatedAt": "2020-10-09T15:11:17.153Z",
    "id": "aaa",
    "lastLoginTimeMS": 1583726632592
  }
}
```
