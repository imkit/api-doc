# Logout User

Revoke currently used client token.
This API also revokes push notification token bound to current Device ID.

### path

/me/logout

### Method

POST

### Headers:

| Field            | Description      |
| ---------------- | ---------------- |
| IM-CLIENT-KEY    | Client Key       |
| IM-Authorization | Client Token     |
| IM-Device-ID     | Client Device ID |

```
POST /me/logout HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Device-ID: {DEVICE_ID}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.5) GCDHTTPRequest
Content-Length: 2

```

### Response Result

// Revoked token

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNzcyIsIm5pY2tuYW1lIjoiU1NTIiwiYXZhdGFyVXJsIjoiaHR0cDovL2xvcmVtZmxpY2tyLmNvbS8yNDAvMjQwL3N0eWxlPzE1OTE4NTg5OTEiLCJleHAiOjE1OTI0NjM3OTEsImlhdCI6MTU5MTg1ODk5MX0.md0o1GmL-70crEq7VtySVl9fkAQ_JRG5H54gaZIGO4A",
    "updatedAt": "2020-06-11T07:03:11.880Z",
    "expirationDate": "2020-06-18T07:03:11.879Z",
    "createdAt": "2020-06-11T07:03:11.880Z",
    "expirationDateMS": 1592463791879
  }
}
```
