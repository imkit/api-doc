# 基本串接

## 概述

本指南將帶您完成 IMKIT 的基本串接流程。在完成「快速開始」取得 API Key 和 Chat Server URL 後，您可以透過以下四個步驟，快速建立用戶、建立聊天室、開始對談，並讓 web/native app 接收新訊息與已讀未讀通知。

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

## 步驟四：接收新訊息與已讀未讀通知

當 Web SDK 或 Web URL 已嵌入您的 app 後，下一步是讓**外層的 web 容器或 native app**也能收到「新訊息」與「已讀未讀」事件，用於更新標題列未讀數、native 推播中心、Tab badge 等 UI。

整體架構：

| 通道 | 用途 | 觸發時機 | 路徑 |
| ---- | ---- | -------- | ---- |
| Socket.IO | 即時事件（`chat message`、`lastRead`、`typing`） | App 在前景且網路連線中 | 共用 |
| APNs / FCM 推播（IMKIT 直送） | 背景通知 | App 在背景或被終止 | A |
| APNs / FCM 推播（自家推播中心轉送） | 背景通知 | App 在背景或被終止 | B |
| `PUT /rooms/:id/lastRead` | 主動回報已讀 | 用戶讀完訊息時 | 共用 |
| `GET /me/badge` | 取總未讀數 | 任何時候 | 共用 |

---

### 4-1：Web 端（外層容器）

在外層 web 頁面（非 IMKIT chat 頁）建立 Socket.IO 連線，接收即時事件。完整生命週期請參考 [Socket 連線](/zh-TW/realtime/socket-connection)，事件格式請參考 [Socket 事件](/zh-TW/realtime/socket-events)。

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io("https://your-app.imkit.io", { forceNew: true });

  socket.on("connect", () => {
    // Step 1: 設定編碼（建議啟用 base64）
    socket.emit("conf", { encoding: "base64" }, () => {
      // Step 2: 身份驗證
      socket.emit("auth2", "用戶的_TOKEN", { deviceId: "web-tab-uuid" }, (ack) => {
        console.log("[socket] authed", ack);
      });
    });
  });

  // 收新訊息：更新 tab badge / 顯示桌面通知
  socket.on("chat message", (raw) => {
    const msg = decode(raw);
    console.log("新訊息：", msg);
    document.title = `(${++unreadCount}) Chat`;

    if (Notification.permission === "granted" && document.hidden) {
      new Notification(msg.sender.nickname, { body: msg.message });
    }
  });

  // 對方已讀：更新已讀回條 UI
  socket.on("lastRead", (raw) => {
    const event = decode(raw);
    console.log(`${event.memberID} 已讀到 ${event.messageID}`);
    updateReadReceipt(event.roomID, event.memberID, event.messageID);
  });

  // 重連後重新驗證
  socket.on("reconnect", () => {
    socket.emit("auth2", "用戶的_TOKEN", { deviceId: "web-tab-uuid" });
  });

  function decode(raw) {
    if (typeof raw !== "string") return raw;
    return JSON.parse(atob(raw));
  }
</script>
```

當用戶讀完訊息時，呼叫 [`PUT /rooms/:id/lastRead`](/zh-TW/room/room-management/update-last-read) 同步給後端：

```javascript
async function markAsRead(roomId, lastMessageId) {
  await fetch(`https://your-app.imkit.io/rooms/${roomId}/lastRead`, {
    method: "PUT",
    headers: {
      "IM-CLIENT-KEY": "您的_CLIENT_KEY",
      "IM-Authorization": "用戶的_TOKEN",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ message: lastMessageId }),
  });
}
```

---

### 選擇推播路徑

Native app 的背景推播有兩條互斥路徑，請依您的現況擇一：

| 路徑 | 適用情境 | 對應 API / 設定 |
| ---- | -------- | --------------- |
| **A. 使用 IMKIT 內建推播** | 沒有自家推播服務，希望最快上線 | App 呼叫 [`POST /me/subscribe`](/zh-TW/push/device-subscription/subscribe-device) 註冊 device token；IMKIT 自動直送 APNs / FCM |
| **B. 串接自家推播中心** | 已有自家推播中心、IT 規範要求自管 token、需在多通道彙整推播 | 後端設定 [`PUSH_GENERIC`](/zh-TW/push/external-push/external-push-v2) callback；app 端**不**呼叫 `/me/subscribe` |

> ⚠️ **兩條路徑互斥**。若同時啟用（既呼叫 `/me/subscribe`、又設定 `PUSH_GENERIC` 並在自家中心送同一份推播），用戶會收到**重複通知**。

---

### 4-2A：Native App — 使用 IMKIT 內建推播

> **僅適用路徑 A**。若您已有自家推播中心，請跳到 4-2B。

Native app 通常以 WebView 嵌入 IMKIT chat 頁，外層需另外處理：

1. **註冊推播 token**：登入後將 APNs / FCM token 註冊到 IMKIT
2. **前景接收**：建立 Socket 連線顯示即時 badge / 通知
3. **背景接收**：依靠 IMKIT 直送的 APNs / FCM 推播
4. **回報已讀**：用戶讀完時呼叫 `PUT /rooms/:id/lastRead`

#### iOS（Swift）— 註冊 APNs token

取得 APNs device token 後，呼叫 [`POST /me/subscribe`](/zh-TW/push/device-subscription/subscribe-device)：

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

收到推播時，可從 payload 解析訊息類型（詳見 [推播 Payload 格式](/zh-TW/push/push-payload-format)），跳轉到對應聊天室。

#### Android（Kotlin）— 註冊 FCM token

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
        // 依本地化 key 顯示通知，跳轉到對應聊天室
    }
}
```

#### Native Socket（前景即時 badge）

若希望 app 在前景時不依賴推播也能即時更新 badge，可在 native 端建立 Socket 連線，邏輯與 4-1 的 web 範例相同，使用對應平台的 Socket.IO 客戶端（[socket.io-client-swift](https://github.com/socketio/socket.io-client-swift) / [socket.io-client-java](https://github.com/socketio/socket.io-client-java)）。完整流程請見 [Socket 連線](/zh-TW/realtime/socket-connection)。

#### 用戶登出時取消註冊

```http
POST /me/unsubscribe
```

詳見 [取消註冊裝置 Token](/zh-TW/push/device-subscription/unsubscribe-device)。

---

### 4-2B：Native App — 串接自家推播中心

> **僅適用路徑 B**。此路徑下 app 端**不要**呼叫 `/me/subscribe`，沿用自家既有的 device token 註冊流程。

#### 流程概覽

```
IMKIT 訊息事件
   ↓ (PUSH_GENERIC callback)
您的後端
   ↓ (查 token、計算 badge、組 payload)
您的推播中心
   ↓ (APNs / FCM)
用戶 device
```

#### 步驟 1：在 IMKIT 後台設定環境變數

```
PUSH_GENERIC=https://your-server.example.com/imkit/push/v2
```

設定完成後，凡是有推播需求的訊息事件，IMKIT 會以單一 HTTP POST 將「壓平後的訊息物件 + `pushToClients` 收件者陣列」發送到此 URL。

完整欄位請見 [外部推播服務 v2](/zh-TW/push/external-push/external-push-v2)。

#### 步驟 2：實作 callback handler

以下為 Node.js + Express 範例，示範如何接收 IMKIT 事件並轉送給自家推播中心：

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

  // 1. 對每位收件者並行處理
  await Promise.all(
    pushToClients.map(async (clientId) => {
      // 2. 從自家資料源取裝置 token（不是從 IMKIT）
      const devices = await yourDB.getDevicesByClientId(clientId);

      // 3. 自行計算 badge（PUSH_GENERIC 不帶 receiver badge）
      const badge = await yourDB.countUnread(clientId);

      // 4. 組推播 payload，丟給自家推播中心
      await yourPushCenter.send({
        clientId,
        devices,
        title: roomName || sender.nickname,
        body: messageType === "text" ? message : `${sender.nickname} 傳送了 ${messageType}`,
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

> 您也可以選擇直接使用 IMKIT 提供的 `im_loc_*` 本地化 key 來組推播文案（詳見 [推播 Payload 格式](/zh-TW/push/push-payload-format)），或在自家中心套用客製化文案邏輯。

#### 步驟 3：App 端 — 沿用自家既有流程

App 端**不**呼叫 IMKIT 的 `/me/subscribe`，沿用您原本的:

- iOS:`registerForRemoteNotifications` → 把 token 上傳到您自家後端
- Android:Firebase `onNewToken` → 把 token 上傳到您自家後端

App 收到推播時，依您自家推播中心的 payload 格式解析即可。前景即時事件、`lastRead` 同步、`badge` 取數仍走 IMKIT API（[共用部分](#整體架構)，與路徑 A 完全相同）。

#### 進階選項：Webhook(每聊天室)

若您只想對特定聊天室啟用自家推播，或需要更細的事件分流（如成員加入/離開），可改用 [Webhook](/zh-TW/webhook/webhook) — 為每個聊天室個別設定 callback URL。一般「整站推播中心」場景仍建議用 `PUSH_GENERIC`。

---

### 4-3：取得目前未讀數

任何時候要重新整理未讀總數，呼叫：

```javascript
const res = await fetch("https://your-app.imkit.io/me/badge", {
  headers: {
    "IM-CLIENT-KEY": "您的_CLIENT_KEY",
    "IM-Authorization": "用戶的_TOKEN",
  },
});
const { result } = await res.json();
console.log("總未讀數：", result.badge);
```

詳見 [獲取用戶未讀訊息](/zh-TW/message/message-badge/get-unread-message-by-a-user)。重連後建議呼叫一次此 API，避免在斷線期間漏算未讀。

---

### 整合心法

- **前景 Socket、背景推播**：兩者搭配才不會漏訊息
- **兩條路徑互斥**：路徑 A（`/me/subscribe`）與路徑 B（`PUSH_GENERIC`）擇一啟用，同時開會造成雙頭推播
- **路徑 B 時 app 端勿呼叫 `/me/subscribe`**：否則 IMKIT 會獨立再推一份，與您自家推播中心重複
- **路徑 B 的 badge 自管**：`PUSH_GENERIC` callback 不帶 receiver badge，需自家後端依 [`GET /me/badge`](/zh-TW/message/message-badge/get-unread-message-by-a-user) 或自家資料源計算
- **deviceId 一致**（路徑 A）：subscribe / socket auth2 用同一個 `deviceId`，伺服器才能識別「該裝置目前在線、不必再推播」
- **Token 過期**：Socket `auth2` 失敗時，重新呼叫 [取得 Token API](/zh-TW/user/user-token) 換新 token 後再連
- **登出處理**：路徑 A 必須呼叫 `/me/unsubscribe` + `disconnect` socket；路徑 B 則於自家推播中心移除該裝置 token，避免下個用戶收到前一位的推播

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
