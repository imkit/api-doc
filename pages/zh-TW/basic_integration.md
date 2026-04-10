# 基本串接

## 概述

本指南將帶您完成 IMKIT 的基本串接流程。在完成「快速開始」取得 API Key 和 Chat Server URL 後，您可以透過以下三個步驟，快速建立用戶、建立聊天室，並開始第一個對談。

------

## 前置條件

請確認您已完成以下準備：

| 項目 | 說明 | 取得方式 |
| ---- | ---- | -------- |
| API Key | 後端 API 認證金鑰（`IM-API-KEY`） | IMKIT Dashboard |
| Client Key | 用戶端連線金鑰（`IM-CLIENT-KEY`） | IMKIT Dashboard |
| Chat Server URL | 您的 Chat Server 網址 | IMKIT Dashboard |

------

## 步驟一：建立用戶

透過 API 為您的系統中的使用者建立 IMKIT 用戶，並取得存取權杖（Token）。

```http
POST /admin/clients
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### 建立用戶 A

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

// 建立用戶 A 並取得 Token
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
console.log("用戶 A Token:", tokenA);
```

#### 建立用戶 B

```javascript
// 建立用戶 B 並取得 Token
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
console.log("用戶 B Token:", tokenB);
```

#### 回應範例

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

> 請將取得的 Token 安全地傳遞給前端，供 SDK 或 Web URL 使用。

------

## 步驟二：建立聊天室

建立一個聊天室，並將用戶 A 和用戶 B 加入為成員。

```http
POST /rooms/
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### 範例請求

```javascript
// 建立一對一聊天室
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

如需建立群組聊天室，將 `roomType` 改為 `"group"` 並加入更多成員：

```javascript
// 建立群組聊天室
const groupRoom = await axios.post(
  `${BASE_URL}/rooms/`,
  {
    name: "專案討論群",
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

#### 回應範例

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

## 步驟三：開始對談

聊天室建立完成後，將用戶的 Token 帶入 Web URL，即可開始對談。

### 使用 Web SDK

在您的網頁中嵌入 IMKIT Web SDK，並帶入用戶的 Token 進行初始化：

```html
<div id="imkit-container"></div>
<script src="https://cdn.imkit.io/sdk/web/latest/imkit.min.js"></script>
<script>
  window.IMKitUI.init({
    domain: "https://your-app.imkit.io",
    clientKey: "您的_CLIENT_KEY",
    token: "用戶的_TOKEN",
  });
</script>
```

### 使用 Web URL

若您已取得 IMKIT 提供的 Web URL，可直接將用戶 Token 作為參數帶入：

```
https://your-app.imkit.io/chat?token=用戶的_TOKEN
```

您可以在自己的應用程式中透過 iframe 或直接導向的方式嵌入此 URL。

------

## 完整串接流程

以下是完整的後端串接範例，涵蓋建立兩位用戶和一個聊天室的完整流程：

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

const headers = {
  "IM-API-KEY": API_KEY,
  "Content-Type": "application/json; charset=utf-8",
};

async function setupChat() {
  // 1. 建立用戶 A
  const userA = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-a", nickname: "Alice", issueAccessToken: true },
    { headers }
  );

  // 2. 建立用戶 B
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
  console.log("用戶 A Token:", result.tokenA);
  console.log("用戶 B Token:", result.tokenB);
  console.log("聊天室 ID:", result.roomId);
});
```

------

## 下一步

完成基本串接後，您可以進一步了解：

- [權限驗證](/zh-TW/auth) — 了解 API Key 和 Client Key 的詳細用法
- [用戶管理](/zh-TW/user/user-management) — 更多用戶管理功能
- [聊天室管理](/zh-TW/room/room-management) — 聊天室進階操作
- [訊息功能](/zh-TW/message/message-basic) — 透過 API 發送和管理訊息
- [Webhook](/zh-TW/webhook) — 接收聊天室事件，實現自動化流程
