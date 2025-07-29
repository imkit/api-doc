# Revoke Client Token(s)

This API should be used by server side.

### path

/admin/clients/:client-id/token

### Method

DELETE

### Headers:

| Field      | Description |
| ---------- | ----------- |
| IM-API-KEY | API Key     |

### Path Parameters

| Name       | Description |
| ---------- | ----------- |
| :client-id | Client ID   |

### JSON body request

| Name  | Description                                                                                        |
| ----- | -------------------------------------------------------------------------------------------------- |
| token | (Optional) Specific client access token. If not specified, revoke all access tokens of this client |

```
DELETE /admin/clients/1485248560558%7D/token/ HTTP/1.1
IM-API-KEY: 2JYpYhDaQlIQlDSvVLCLLo2MPzFfVm9jYpxw2vuBrmk=
Content-Type: application/json; charset=utf-8
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.5 (Macintosh; OS X/10.13.3) GCDHTTPRequest
Content-Length: 26

{"token":"test-token$123"}

```

### Response Result

Revoked Tokens

````json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNzcyIsIm5pY2tuYW1lIjoiU1NTIiwiYXZhdGFyVXJsIjoiaHR0cDovL2xvcmVtZmxpY2tyLmNvbS8yNDAvMjQwL3N0eWxlPzE1OTE4NTg5ODkiLCJleHAiOjE1OTI0NjM3ODksImlhdCI6MTU5MTg1ODk4OX0.bu8q6pZAHfJT2ut-AVlwhoJ2kIVoJUcJbmE2jsJT-u8",
        "updatedAt": "2020-06-11T07:03:09.831Z",
        "expirationDate": "2020-06-18T07:03:09.830Z",
        "createdAt": "2020-06-11T07:03:09.831Z",
        "expirationDateMS": 1592463789830
      },
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNzcyIsIm5pY2tuYW1lIjoiU1NTIiwiYXZhdGFyVXJsIjoiaHR0cDovL2xvcmVtZmxpY2tyLmNvbS8yNDAvMjQwL3N0eWxlPzE1OTE4NTg5OTAiLCJleHAiOjE1OTI0NjM3OTAsImlhdCI6MTU5MTg1ODk5MH0.qaPLz00M-u6XNj4UQzcPUG5N5T_qKI3Hms_AfmXt9UY",
        "updatedAt": "2020-06-11T07:03:10.537Z",
        "expirationDate": "2020-06-18T07:03:10.537Z",
        "createdAt": "2020-06-11T07:03:10.537Z",
        "expirationDateMS": 1592463790537
      }
    ]
  }
}```
````
