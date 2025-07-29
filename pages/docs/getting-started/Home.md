Welcome to the imkit-chatserver-v3 wiki!

# Auth for Client

Authorized client is allowed to request Client APIs, such as Room, Me, etc.

### Headers:

| Field            | Description                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| IM-Client-Key    | Client Key                                                                                          |
| IM-Authorization | Client Token, same as Authorization, both works. Use IM-Authorization to avoid conflict with AWS S3 |
| IM-Device-ID     | Unique Client Device ID                                                                             |
| CLIENT_KEY       | [Legacy] Client Key (deprecated, Use IM-Client-Key instead)                                         |
| Authorization    | [Legacy] Client Token (deprecated, Use IM-Authorization instead)                                    |

# Auth for Platform API

### Headers:

| Field      | Description                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------- |
| API_KEY    | (Deprecated) Platform API Key                                                                      |
| IM-API-KEY | Platform API Key, same as API_KEY, avoid bottom line to prevent default nginx configuration issues |

Note that, platform admin is allowed to request all APIs, including Platform APIs (Admin APIs) and Client APIs.
It should be used by customer server only.

# Client Auth Flow

![](https://github.com/FUNTEKco/chat-server-document/raw/master/Auth%20Flow.png)

1.  Client sign-in Consumer's web service
1.  Consumer generates a <b>token</b> for authorization
1.  Consumer calls `create-or-update-user` API with the <b>token</b> and <b>Client ID</b>

## IMKit API

1.  The Client use the token to request IMKit APIs

## Socket.IO

1.  The Client emit <b>auth</b> event with the <b>token</b> after connection established.

## For more client authorizatoin approaches

https://github.com/FUNTEKco/chat-server-document/wiki/%5BAuth%5D-Client-authorization

# External badge service

https://github.com/imkit/imkit-badge
