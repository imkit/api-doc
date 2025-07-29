# Logout user on other devices

Revoke client tokens except the currently used one.

This API also revokes push notification device tokens bound to the client but except the one bound to current device id.

### path

/me/logout-others

### Method

POST

### Headers:

| Field            | Description      |
| ---------------- | ---------------- |
| IM-CLIENT-KEY    | Client Key       |
| IM-Authorization | Client Token     |
| IM-Device-ID     | Client Device ID |

```
POST /me/logout-others HTTP/1.1
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

// Revoked tokens

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNzcyIsIm5pY2tuYW1lIjoiU1NTIiwiYXZhdGFyVXJsIjoiaHR0cDovL2xvcmVtZmxpY2tyLmNvbS8yNDAvMjQwL3N0eWxlPzE1OTE4NTkxNTAiLCJleHAiOjE1OTI0NjM5NTAsImlhdCI6MTU5MTg1OTE1MH0.XgjqJYUWnttCyvViN458MQcnYv8e8BxIBUZWavUKc7Y",
        "updatedAt": "2020-06-11T07:05:50.688Z",
        "expirationDate": "2020-06-18T07:05:50.688Z",
        "createdAt": "2020-06-11T07:05:50.688Z",
        "expirationDateMS": 1592463950688
      },
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNzcyIsIm5pY2tuYW1lIjoiU1NTIiwiYXZhdGFyVXJsIjoiaHR0cDovL2xvcmVtZmxpY2tyLmNvbS8yNDAvMjQwL3N0eWxlPzE1OTE4NTkxNTEiLCJleHAiOjE1OTI0NjM5NTEsImlhdCI6MTU5MTg1OTE1MX0.fehEbc2S3tm_52WTon4nyB9CvOi8QxVRvFcMFRzMslA",
        "updatedAt": "2020-06-11T07:05:51.420Z",
        "expirationDate": "2020-06-18T07:05:51.420Z",
        "createdAt": "2020-06-11T07:05:51.420Z",
        "expirationDateMS": 1592463951420
      }
    ]
  }
}
```
