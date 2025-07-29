# Generate Token

Generate a client access token

### path

/auths/sign/v2

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

```javascript
axios.post(
  "http://localhost:3100/auths/sign",
  {
    id: "aaa",
    nickname: "Alecia",
    avatarUrl: "http://loremflickr.com/240/240/style?1627570215",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "authType": "Standalone JWT",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhYSIsImV4cCI6MTYyODQwNDg4NSwiaWF0IjoxNjI3ODAwMDg1fQ.i4nYliv1_sr-XT4Lqxmnd-10omMcnbDawYwiY4gJxEg",
    "expirationDate": "2021-08-08T06:41:25.984Z",
    "id": "aaa",
    "exp": 1628404885
  }
}
```
