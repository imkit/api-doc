# Create or update a client

This API should be used by server side.

### path

/admin/clients

### Method

POST

### Headers:

| Field      | Description      |
| ---------- | ---------------- |
| IM-API-KEY | Platform API Key |

### Request Parameters

| Name                           | Description |
| ------------------------------ | ----------- |
| \_id                           | Client ID   |
| Any custom object, for example |
| nickname                       | Nickname    |
| avatarUrl                      | Avatar URL  |

#### Chat Server Issue Token

| Name             | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| issueAccessToken | [Boolean] `true` to make chat server issuing a new client access token |

##### Chat Server Issue Token Example


```javascript
axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    nickname: "SSS",
    avatarUrl: "http://example.com/avatarUrl",
    _id: "sss",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Customer Bind Token

| Name             | Description                          |
| ---------------- | ------------------------------------ |
| issueAccessToken | [Boolean] `false` or leave out.      |
| token            | Bind a specified token to the client |
| expirationDate   | Specify the token expiration date    |

##### Customer Bind Token Example

```
POST /admin/clients HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.5) GCDHTTPRequest
Content-Length: 97

{"nickname":"SSS","avatarUrl":"http://example.com/avatarUrl","_id":"sss","token": "f7b6d364-1e96-4b1a-aa75-cce93268b101", "expirationDate": "2020-06-18T06:15:36.763Z" }

```

### Response Result

Updated client info

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "sss",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "SSS",
    "description": "description la la #1583637224106",
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2020-06-11T06:15:36.761Z",
    "isRobot": false,
    "mute": [],
    "id": "sss",
    "lastLoginTimeMS": 1588744338369,
     /* Created token, only available when request parameter issueAccessToken is true */
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNzcyIsIm5pY2tuYW1lIjoiU1NTIiwiZXhwIjoxNTkyNDYwOTM2LCJpYXQiOjE1OTE4NTYxMzZ9.UXNfwcyOTJQT1ebElVBOPwNnkMByUZnzxZrlKIZ8LT8",
     /* Token expiration date, only available when request parameter issueAccessToken is true */
    "expirationDate": "2020-06-18T06:15:36.763Z"
  }
}
```
