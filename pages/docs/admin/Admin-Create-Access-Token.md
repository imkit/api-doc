# Generate Token

Generate a client access token

### path

/auths/sign

### Method

POST

### Headers:

| Field      | Description |
| ---------- | ----------- |
| IM-API-KEY | API Key     |

For development/sandbox purpose

| Field         | Description |
| ------------- | ----------- |
| IM-CLIENT-KEY | Client Key  |

### Body

Client Model

| Property  | Type   | Description       |
| --------- | ------ | ----------------- |
| id        | String | Unique Client ID  |
| nickname  | String | Client nickname   |
| avatarUrl | String | Client avatar URL |

```
POST /auths/sign HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.2.3 (Macintosh; OS X/11.5.0) GCDHTTPRequest
Content-Length: 94

{"id":"aaa","nickname":"Alecia","avatarUrl":"http://loremflickr.com/240/240/style?1627570215"}


```

### Response

```json
{
  "authType": "Standalone JWT",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhYSIsIm5pY2tuYW1lIjoiQWxlY2lhIiwiYXZhdGFyVXJsIjoiaHR0cDovL2xvcmVtZmxpY2tyLmNvbS8yNDAvMjQwL3N0eWxlPzE2Mjc1NjgwODYiLCJleHAiOjE2MjgxNzI4ODYsImlhdCI6MTYyNzU2ODA4Nn0.IXB6NQdTT4xeyvUGLOnXDYvg6g8q9EgN4rxCwD4lpYU",
  "expirationDate": "2021-08-05T14:14:46.789Z",
  "id": "aaa",
  "nickname": "Alecia",
  "avatarUrl": "http://loremflickr.com/240/240/style?1627568086",
  "exp": 1628172886
}
```
