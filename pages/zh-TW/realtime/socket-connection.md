# Socket 連線

## 概述

IMKIT 使用 Socket.IO 提供即時雙向通訊,讓 native app / web 客戶端能在連線中即時收到新訊息、已讀狀態變化、輸入中提示等事件。本頁說明完整的連線生命週期:從建立連線、設定資料編碼、身份驗證,到訂閱事件與斷線重連。

------

## 連線生命週期

```
Step 0. SocketIO.connect()       — 建立底層連線
   ↓
Step 1. emit('conf')             — (可選)設定資料編碼
   ↓
Step 2. emit('auth2', token, …)  — (必須)身份驗證
   ↓
Step 3. on('chat message', …)    — 訂閱事件並開始接收即時訊息
```

------

## Step 0:建立連線

使用 Socket.IO 客戶端連線至 IMKIT 的 socket 端點。

```javascript
import { io } from "socket.io-client";

const socket = io("https://your-app.imkit.io", {
  forceNew: true,
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("[socket] connected");
  configSocket();   // Step 1
});
```

------

## Step 1:設定編碼(可選)

在驗證之前,可先發送 `conf` 事件設定 socket 的資料編碼,避免某些訊息內容(如包含特殊字元的字串)被 socket-io 解析時出錯。

**Emit 事件**:`conf`

**參數**:設定物件

| 鍵         | 值        | 說明                                                                 |
| ---------- | --------- | -------------------------------------------------------------------- |
| `encoding` | `base64`  | 啟用伺服器以 base64 編碼回傳資料,客戶端需自行解碼後解析 JSON         |
| `encoding` | `custom`  | 啟用自訂的傳輸層加解密(需與伺服器約定加密邏輯)                     |

**範例**

```javascript
function configSocket() {
  socket.emit("conf", { encoding: "base64" }, (ack) => {
    console.log("[socket] config ack:", ack);
    auth();   // Step 2
  });
}
```

啟用 `base64` 後,後續所有事件 payload 都會是 base64 字串,需先 decode 再 `JSON.parse` 才能取得物件。

------

## Step 2:身份驗證(必須)

連線後必須驗證身份,否則無法接收事件。

**Emit 事件**:`auth2`

**參數**

| 參數     | 類型   | 說明                |
| -------- | ------ | ------------------- |
| `token`  | string | Client Token        |
| `extra`  | object | 自訂 header,例如 `deviceId`、`platform` 等 |

**範例**

```javascript
function auth() {
  const token = "{IM-Authorization}";
  const extra = {
    deviceId: "iphone-15-pro-uuid-001"
  };

  socket.emit("auth2", token, extra, (ack) => {
    console.log("[socket] auth ack:", ack);
    // 驗證成功後即可接收事件
  });
}
```

驗證失敗時,伺服器會關閉連線。客戶端應監聽 `error` 與 `disconnect` 事件並執行重連流程。

------

## Step 3:訂閱事件

驗證成功後,即可監聽各類事件。完整事件清單與 payload 格式請見 [Socket 事件](/zh-TW/realtime/socket-events)。

```javascript
socket.on("chat message", (data) => {
  const message = decodeIfNeeded(data);
  console.log("[socket] new message:", message);
});

socket.on("lastRead", (data) => {
  const event = decodeIfNeeded(data);
  console.log("[socket] lastRead:", event);
});

function decodeIfNeeded(raw) {
  if (typeof raw === "string") {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  }
  return raw;
}
```

------

## 重連與心跳

### 監聽生命週期事件

```javascript
socket.on("disconnect", (reason) => {
  console.warn("[socket] disconnect:", reason);
});

socket.on("reconnect", () => {
  console.log("[socket] reconnect");
  // 重連後需重新驗證
  auth();
  // 並建議重新拉一次未讀總數,確保 UI 與伺服器一致
  fetchBadge();
});

socket.on("error", (err) => {
  console.error("[socket] error:", err);
});
```

### 心跳(Ping / Pong)

伺服器會定期送出 `ping` 事件,客戶端應立即回 `pong` 以維持連線。在多數 Socket.IO 客戶端中此行為是自動處理,自訂邏輯如下:

```javascript
socket.on("ping", () => {
  if (socket.connected) {
    socket.emit("pong");
  } else {
    socket.connect();
  }
});
```

當客戶端在預期時間內(例如 30 秒)未收到 `ping`,代表連線已實際中斷,應主動 `disconnect()` 後重新 `connect()`。

------

## 完整最小範例

```javascript
import { io } from "socket.io-client";

const socket = io("https://your-app.imkit.io", { forceNew: true });

socket.on("connect", () => {
  socket.emit("conf", { encoding: "base64" }, () => {
    socket.emit("auth2", "{IM-Authorization}", {
      deviceId: "iphone-15-pro-uuid-001"
    }, (ack) => {
      console.log("authed:", ack);

      socket.on("chat message", (raw) => {
        const msg = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
        console.log("new message:", msg);
      });
    });
  });
});

socket.on("reconnect", () => {
  socket.emit("auth2", "{IM-Authorization}", {
    deviceId: "iphone-15-pro-uuid-001"
  });
});

socket.on("disconnect", (reason) => console.warn("disconnect:", reason));
socket.on("error", (err) => console.error("error:", err));
```

------

## 注意事項

- **驗證順序**:必須先 `connect` 再 `auth2`,否則伺服器會拒絕事件訂閱
- **重連後再驗證**:Socket.IO 自動重連後,連線是新的,需要重新呼叫 `auth2`
- **base64 編碼**:啟用 `encoding: "base64"` 是為了避免特殊字元在 socket-io 序列化時破壞封包,建議在生產環境啟用
- **token 過期**:Client token 有有效期限,過期後 `auth2` 會失敗,需重新呼叫 [取得 token API](/zh-TW/user/user-token) 後再連線
- **deviceId 一致性**:`deviceId` 應與 [註冊推播 token](/zh-TW/push/device-subscription/subscribe-device) 時使用的值相同,讓伺服器能識別「此用戶正在線上的裝置不需推播」
- **同帳號多裝置**:同一個 Client 可同時在多裝置建立多條 socket 連線,事件會廣播至所有連線
- **網路恢復**:行動裝置切換網路(Wi-Fi ↔ 行動網路)時通常會觸發 `disconnect` + `reconnect`,UI 應顯示「重新連線中」狀態
