# 基本串接

## 概述

本指南将带您完成 IMKIT 的基本串接流程。在完成「快速开始」取得 API Key 和 Chat Server URL 后，您可以透过以下四个步骤，快速建立用户、建立聊天室、开始对谈，并让 web/native app 接收新消息与已读未读通知。

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

## 步骤四：接收新消息与已读未读通知

当 Web SDK 或 Web URL 已嵌入您的 app 后，下一步是让**外层的 web 容器或 native app**也能收到「新消息」与「已读未读」事件，用于更新标题栏未读数、native 推播中心、Tab badge 等 UI。

整体架构：

| 通道 | 用途 | 触发时机 | 路径 |
| ---- | ---- | -------- | ---- |
| Socket.IO | 实时事件（`chat message`、`lastRead`、`typing`） | App 在前景且网络连接中 | 共用 |
| APNs / FCM 推播（IMKIT 直送） | 后台通知 | App 在后台或被终止 | A |
| APNs / FCM 推播（自家推播中心转送） | 后台通知 | App 在后台或被终止 | B |
| `PUT /rooms/:id/lastRead` | 主动回报已读 | 用户读完消息时 | 共用 |
| `GET /me/badge` | 取总未读数 | 任何时候 | 共用 |

---

### 4-1：Web 端（外层容器）

在外层 web 页面（非 IMKIT chat 页）建立 Socket.IO 连线，接收实时事件。完整生命周期请参考 [Socket 连线](/zh-CN/realtime/socket-connection)，事件格式请参考 [Socket 事件](/zh-CN/realtime/socket-events)。

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io("https://your-app.imkit.io", { forceNew: true });

  socket.on("connect", () => {
    // Step 1: 设定编码（建议启用 base64）
    socket.emit("conf", { encoding: "base64" }, () => {
      // Step 2: 身份验证
      socket.emit("auth2", "用户的_TOKEN", { deviceId: "web-tab-uuid" }, (ack) => {
        console.log("[socket] authed", ack);
      });
    });
  });

  // 收新消息：更新 tab badge / 显示桌面通知
  socket.on("chat message", (raw) => {
    const msg = decode(raw);
    console.log("新消息：", msg);
    document.title = `(${++unreadCount}) Chat`;

    if (Notification.permission === "granted" && document.hidden) {
      new Notification(msg.sender.nickname, { body: msg.message });
    }
  });

  // 对方已读：更新已读回条 UI
  socket.on("lastRead", (raw) => {
    const event = decode(raw);
    console.log(`${event.memberID} 已读到 ${event.messageID}`);
    updateReadReceipt(event.roomID, event.memberID, event.messageID);
  });

  // 重连后重新验证
  socket.on("reconnect", () => {
    socket.emit("auth2", "用户的_TOKEN", { deviceId: "web-tab-uuid" });
  });

  function decode(raw) {
    if (typeof raw !== "string") return raw;
    return JSON.parse(atob(raw));
  }
</script>
```

当用户读完消息时，呼叫 [`PUT /rooms/:id/lastRead`](/zh-CN/room/room-management/update-last-read) 同步给后端：

```javascript
async function markAsRead(roomId, lastMessageId) {
  await fetch(`https://your-app.imkit.io/rooms/${roomId}/lastRead`, {
    method: "PUT",
    headers: {
      "IM-CLIENT-KEY": "您的_CLIENT_KEY",
      "IM-Authorization": "用户的_TOKEN",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ message: lastMessageId }),
  });
}
```

---

### 选择推播路径

Native app 的后台推播有两条互斥路径，请依您的现况择一：

| 路径 | 适用情境 | 对应 API / 设定 |
| ---- | -------- | --------------- |
| **A. 使用 IMKIT 内建推播** | 没有自家推播服务，希望最快上线 | App 呼叫 [`POST /me/subscribe`](/zh-CN/push/device-subscription/subscribe-device) 注册 device token；IMKIT 自动直送 APNs / FCM |
| **B. 串接自家推播中心** | 已有自家推播中心、IT 规范要求自管 token、需在多通道汇整推播 | 后端设定 [`PUSH_GENERIC`](/zh-CN/push/external-push/external-push-v2) callback；app 端**不**呼叫 `/me/subscribe` |

> ⚠️ **两条路径互斥**。若同时启用（既呼叫 `/me/subscribe`、又设定 `PUSH_GENERIC` 并在自家中心送同一份推播），用户会收到**重复通知**。

---

### 4-2A：Native App — 使用 IMKIT 内建推播

> **仅适用路径 A**。若您已有自家推播中心，请跳到 4-2B。

Native app 通常以 WebView 嵌入 IMKIT chat 页，外层需另外处理：

1. **注册推播 token**：登入后将 APNs / FCM token 注册到 IMKIT
2. **前景接收**：建立 Socket 连线显示实时 badge / 通知
3. **后台接收**：依靠 IMKIT 直送的 APNs / FCM 推播
4. **回报已读**：用户读完时呼叫 `PUT /rooms/:id/lastRead`

#### iOS（Swift）— 注册 APNs token

取得 APNs device token 后，呼叫 [`POST /me/subscribe`](/zh-CN/push/device-subscription/subscribe-device)：

```swift
func application(_ application: UIApplication,
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    let token = deviceToken.map { String(format: "%02x", $0) }.joined()
    let deviceId = UIDevice.current.identifierForVendor?.uuidString ?? ""

    var request = URLRequest(url: URL(string: "https://your-app.imkit.io/me/subscribe")!)
    request.httpMethod = "POST"
    request.setValue("您的_CLIENT_KEY", forHTTPHeaderField: "IM-CLIENT-KEY")
    request.setValue(userToken, forHTTPHeaderField: "IM-Authorization")
    request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
    request.httpBody = try? JSONSerialization.data(withJSONObject: [
        "type": "ios",
        "token": token,
        "deviceId": deviceId
    ])

    URLSession.shared.dataTask(with: request).resume()
}
```

收到推播时，可从 payload 解析消息类型（详见 [推播 Payload 格式](/zh-CN/push/push-payload-format)），跳转到对应聊天室。

#### Android（Kotlin）— 注册 FCM token

```kotlin
class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onNewToken(fcmToken: String) {
        val deviceId = Settings.Secure.getString(
            contentResolver, Settings.Secure.ANDROID_ID
        )

        val body = JSONObject().apply {
            put("type", "fcm")
            put("token", fcmToken)
            put("deviceId", deviceId)
        }.toString()

        val request = Request.Builder()
            .url("https://your-app.imkit.io/me/subscribe")
            .addHeader("IM-CLIENT-KEY", "您的_CLIENT_KEY")
            .addHeader("IM-Authorization", userToken)
            .addHeader("Content-Type", "application/json; charset=utf-8")
            .post(body.toRequestBody("application/json".toMediaType()))
            .build()

        OkHttpClient().newCall(request).enqueue(/* ... */)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        val locKey = remoteMessage.data["loc-key"]      // e.g. "im_loc_text"
        val locArgs = remoteMessage.data["loc-args"]    // e.g. ["Alice", "Hello"]
        // 依本地化 key 显示通知，跳转到对应聊天室
    }
}
```

#### Native Socket（前景实时 badge）

若希望 app 在前景时不依赖推播也能实时更新 badge，可在 native 端建立 Socket 连线，逻辑与 4-1 的 web 示例相同，使用对应平台的 Socket.IO 客户端（[socket.io-client-swift](https://github.com/socketio/socket.io-client-swift) / [socket.io-client-java](https://github.com/socketio/socket.io-client-java)）。完整流程请见 [Socket 连线](/zh-CN/realtime/socket-connection)。

#### 用户登出时取消注册

```http
POST /me/unsubscribe
```

详见 [取消注册装置 Token](/zh-CN/push/device-subscription/unsubscribe-device)。

---

### 4-2B：Native App — 串接自家推播中心

> **仅适用路径 B**。此路径下 app 端**不要**呼叫 `/me/subscribe`，沿用自家既有的 device token 注册流程。

#### 流程概览

```
IMKIT 消息事件
   ↓ (PUSH_GENERIC callback)
您的后端
   ↓ (查 token、计算 badge、组 payload)
您的推播中心
   ↓ (APNs / FCM)
用户 device
```

#### 步骤 1：在 IMKIT 后台设定环境变量

```
PUSH_GENERIC=https://your-server.example.com/imkit/push/v2
```

设定完成后，凡是有推播需求的消息事件，IMKIT 会以单一 HTTP POST 将「压平后的消息物件 + `pushToClients` 收件者数组」发送到此 URL。

完整字段请见 [外部推播服务 v2](/zh-CN/push/external-push/external-push-v2)。

#### 步骤 2：实作 callback handler

以下为 Node.js + Express 示例，示范如何接收 IMKIT 事件并转送给自家推播中心：

```javascript
import express from "express";
const app = express();
app.use(express.json());

app.post("/imkit/push/v2", async (req, res) => {
  const {
    _id: messageId,
    message,
    room,
    roomName,
    sender,
    messageType,
    pushToClients = [],
  } = req.body;

  // 1. 对每位收件者并行处理
  await Promise.all(
    pushToClients.map(async (clientId) => {
      // 2. 从自家数据源取装置 token（不是从 IMKIT）
      const devices = await yourDB.getDevicesByClientId(clientId);

      // 3. 自行计算 badge（PUSH_GENERIC 不带 receiver badge）
      const badge = await yourDB.countUnread(clientId);

      // 4. 组推播 payload，丢给自家推播中心
      await yourPushCenter.send({
        clientId,
        devices,
        title: roomName || sender.nickname,
        body: messageType === "text" ? message : `${sender.nickname} 传送了 ${messageType}`,
        badge,
        data: {
          roomId: room,
          messageId,
          messageType,
        },
      });
    })
  );

  // 立即回 200，不阻塞 IMKIT
  res.status(200).end();
});

app.listen(3000);
```

> 您也可以选择直接使用 IMKIT 提供的 `im_loc_*` 本地化 key 来组推播文案（详见 [推播 Payload 格式](/zh-CN/push/push-payload-format)），或在自家中心套用客制化文案逻辑。

#### 步骤 3：App 端 — 沿用自家既有流程

App 端**不**呼叫 IMKIT 的 `/me/subscribe`，沿用您原本的:

- iOS:`registerForRemoteNotifications` → 把 token 上传到您自家后端
- Android:Firebase `onNewToken` → 把 token 上传到您自家后端

App 收到推播时，依您自家推播中心的 payload 格式解析即可。前景实时事件、`lastRead` 同步、`badge` 取数仍走 IMKIT API（[共用部分](#整体架构)，与路径 A 完全相同）。

#### 进阶选项：Webhook(每聊天室)

若您只想对特定聊天室启用自家推播，或需要更细的事件分流（如成员加入/离开），可改用 [Webhook](/zh-CN/webhook/webhook) — 为每个聊天室个别设定 callback URL。一般「整站推播中心」场景仍建议用 `PUSH_GENERIC`。

---

### 4-3：取得目前未读数

任何时候要重新整理未读总数，呼叫：

```javascript
const res = await fetch("https://your-app.imkit.io/me/badge", {
  headers: {
    "IM-CLIENT-KEY": "您的_CLIENT_KEY",
    "IM-Authorization": "用户的_TOKEN",
  },
});
const { result } = await res.json();
console.log("总未读数：", result.badge);
```

详见 [获取用户未读消息](/zh-CN/message/message-badge/get-unread-message-by-a-user)。重连后建议呼叫一次此 API，避免在断线期间漏算未读。

---

### 整合心法

- **前景 Socket、后台推播**：两者搭配才不会漏消息
- **两条路径互斥**：路径 A（`/me/subscribe`）与路径 B（`PUSH_GENERIC`）择一启用，同时开会造成双头推播
- **路径 B 时 app 端勿呼叫 `/me/subscribe`**：否则 IMKIT 会独立再推一份，与您自家推播中心重复
- **路径 B 的 badge 自管**：`PUSH_GENERIC` callback 不带 receiver badge，需自家后端依 [`GET /me/badge`](/zh-CN/message/message-badge/get-unread-message-by-a-user) 或自家数据源计算
- **deviceId 一致**（路径 A）：subscribe / socket auth2 用同一个 `deviceId`，伺服器才能识别「该装置目前在线、不必再推播」
- **Token 过期**：Socket `auth2` 失败时，重新呼叫 [取得 Token API](/zh-CN/user/user-token) 换新 token 后再连
- **登出处理**：路径 A 必须呼叫 `/me/unsubscribe` + `disconnect` socket；路径 B 则于自家推播中心移除该装置 token，避免下个用户收到前一位的推播

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

- [权限验证](/zh-CN/auth) — 了解 API Key 和 Client Key 的详细用法
- [用户管理](/zh-CN/user/user-management) — 更多用户管理功能
- [聊天室管理](/zh-CN/room/room-management) — 聊天室进阶操作
- [讯息功能](/zh-CN/message/message-basic) — 透过 API 发送和管理讯息
- [Webhook](/zh-CN/webhook) — 接收聊天室事件，实现自动化流程
