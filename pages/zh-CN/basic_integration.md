# 基本串接

## 概述

本指南将带您完成 IMKIT 的基本串接流程。在完成「快速开始」取得 API Key 和 Chat Server URL 后，您可以透过以下三个步骤，快速建立用户、建立聊天室，并开始第一个对谈。

------

## 前置条件

请确认您已完成以下准备：

| 项目 | 说明 | 取得方式 |
| ---- | ---- | -------- |
| API Key | 后端 API 认证金钥（`IM-API-KEY`） | IMKIT Dashboard |
| Client Key | 用户端连线金钥（`IM-CLIENT-KEY`） | IMKIT Dashboard |
| Chat Server URL | 您的 Chat Server 网址 | IMKIT Dashboard |

------

## 步骤一：建立用户

透过 API 为您的系统中的使用者建立 IMKIT 用户，并取得存取权杖（Token）。

```http
POST /admin/clients
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金钥 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### 建立用户 A

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

// 建立用户 A 并取得 Token
const userA = await axios.post(
  `${BASE_URL}/admin/clients`,
  {
    _id: "user-a",
    nickname: "Alice",
    avatarUrl: "https://example.com/alice.jpg",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);

const tokenA = userA.data.result.token;
console.log("用户 A Token:", tokenA);
```

#### 建立用户 B

```javascript
// 建立用户 B 并取得 Token
const userB = await axios.post(
  `${BASE_URL}/admin/clients`,
  {
    _id: "user-b",
    nickname: "Bob",
    avatarUrl: "https://example.com/bob.jpg",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);

const tokenB = userB.data.result.token;
console.log("用户 B Token:", tokenB);
```

#### 回应范例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user-a",
    "nickname": "Alice",
    "avatarUrl": "https://example.com/alice.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2026-04-17T00:00:00.000Z",
    "lastLoginTimeMS": 1712700000000
  }
}
```

> 请将取得的 Token 安全地传递给前端，供 SDK 或 Web URL 使用。

------

## 步骤二：建立聊天室

建立一个聊天室，并将用户 A 和用户 B 加入为成员。

```http
POST /rooms/
```

#### Headers

| 参数 | 类型 | 必填 | 说明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金钥 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### 范例请求

```javascript
// 建立一对一聊天室
const room = await axios.post(
  `${BASE_URL}/rooms/`,
  {
    roomType: "direct",
    members: ["user-a", "user-b"],
  },
  {
    headers: {
      "IM-API-KEY": API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);

const roomId = room.data.result._id;
console.log("聊天室 ID:", roomId);
```

如需建立群组聊天室，将 `roomType` 改为 `"group"` 并加入更多成员：

```javascript
// 建立群组聊天室
const groupRoom = await axios.post(
  `${BASE_URL}/rooms/`,
  {
    name: "专案讨论群",
    roomType: "group",
    members: ["user-a", "user-b", "user-c"],
  },
  {
    headers: {
      "IM-API-KEY": API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### 回应范例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "6073a1b2c3d4e5f6a7b8c9d0",
    "roomType": "direct",
    "members": ["user-a", "user-b"],
    "status": 1,
    "createdTimeMS": 1712700000000
  }
}
```

------

## 步骤三：开始对谈

聊天室建立完成后，将用户的 Token 带入 Web URL，即可开始对谈。

### 使用 Web SDK

在您的网页中嵌入 IMKIT Web SDK，并带入用户的 Token 进行初始化：

```html
<div id="imkit-container"></div>
<script src="https://cdn.imkit.io/sdk/web/latest/imkit.min.js"></script>
<script>
  window.IMKitUI.init({
    domain: "https://your-app.imkit.io",
    clientKey: "您的_CLIENT_KEY",
    token: "用户的_TOKEN",
  });
</script>
```

### 使用 Web URL

若您已取得 IMKIT 提供的 Web URL，可直接将用户 Token 作为参数带入：

```
https://your-app.imkit.io/chat?token=用户的_TOKEN
```

您可以在自己的应用程式中透过 iframe 或直接导向的方式嵌入此 URL。

------

## 完整串接流程

以下是完整的后端串接范例，涵盖建立两位用户和一个聊天室的完整流程：

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

const headers = {
  "IM-API-KEY": API_KEY,
  "Content-Type": "application/json; charset=utf-8",
};

async function setupChat() {
  // 1. 建立用户 A
  const userA = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-a", nickname: "Alice", issueAccessToken: true },
    { headers }
  );

  // 2. 建立用户 B
  const userB = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-b", nickname: "Bob", issueAccessToken: true },
    { headers }
  );

  // 3. 建立聊天室
  const room = await axios.post(
    `${BASE_URL}/rooms/`,
    { roomType: "direct", members: ["user-a", "user-b"] },
    { headers }
  );

  return {
    tokenA: userA.data.result.token,
    tokenB: userB.data.result.token,
    roomId: room.data.result._id,
  };
}

setupChat().then((result) => {
  console.log("串接完成！");
  console.log("用户 A Token:", result.tokenA);
  console.log("用户 B Token:", result.tokenB);
  console.log("聊天室 ID:", result.roomId);
});
```

------

## 下一步

完成基本串接后，您可以进一步了解：

- [权限验证](/zh-TW/auth) — 了解 API Key 和 Client Key 的详细用法
- [用户管理](/zh-TW/user/user-management) — 更多用户管理功能
- [聊天室管理](/zh-TW/room/room-management) — 聊天室进阶操作
- [讯息功能](/zh-TW/message/message-basic) — 透过 API 发送和管理讯息
- [Webhook](/zh-TW/webhook) — 接收聊天室事件，实现自动化流程
