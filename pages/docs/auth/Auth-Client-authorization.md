# Approach 1) Standalone Authorization - Chat Server Issued Token

Specify issueAccessToken as `true` when your server requests `create-or-update-client` API.

https://github.com/FUNTEKco/chat-server-document/wiki/%5BAdmin%5D-Create-or-Update-Client#chat-server-issue-token

![](https://github.com/FUNTEKco/chat-server-document/blob/master/Chat-Server-Issue-Token.png)


## Approach 1-1) Create or Update Client and ask chat server issuing a token

Specify `issueAccessToken=true` when your server requests `create-or-update-client` API.

https://github.com/FUNTEKco/chat-server-document/wiki/%5BAdmin%5D-Create-or-Update-Client#chat-server-issue-token

## Approach 1-2) Create or Update Client with specifying a token

Specify `token` and optional `expirationDate` when your server requests `create-or-update-client` API.

https://github.com/FUNTEKco/chat-server-document/wiki/%5BAdmin%5D-Create-or-Update-Client#customer-bind-token

## Approach 1-3) Revoke Token

You may want to force to revoke user token before its expiry time (e.g. user logout).

https://github.com/FUNTEKco/chat-server-document/wiki/%5BAdmin%5D-Revoke-token


# Approach 2) External Authorization - Auth Service

You may choose this approach if you have the following concerns:
1. You don't want to modify existing server-side code to request the IMKit Chat Server.
2. You want full analytics and controls of incoming request authorization to chat server.

Set up environment variable `AUTH`="auth service token validation url"

You could have any kind of external auth service implementation, as long as its token validation API confirms to IMKit Auth Service

## 2-1) Example 1: External Auth service as a adapter for Chat Server to Customer Server's token validation.
![](https://github.com/FUNTEKco/chat-server-document/raw/master/Auth%202.1.png)
## 2-2) Example 2: External Auth service as a centralized user authorization service for both customer server and chat server.
![](https://github.com/FUNTEKco/chat-server-document/raw/master/Auth%202.2.png)