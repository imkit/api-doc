# Socket 连线

## 概述

IMKIT 使用 Socket.IO 提供实时双向通讯,让 native app / web 客户端能在连线中实时收到新消息、已读状态变化、输入中提示等事件。本页说明完整的连线生命周期:从建立连线、设置数据编码、身份验证,到订阅事件与断线重连。

------

## 连线生命周期

```
Step 0. SocketIO.connect()       — 建立底层连线
   ↓
Step 1. emit('conf')             — (可选)设置数据编码
   ↓
Step 2. emit('auth2', token, …)  — (必须)身份验证
   ↓
Step 3. on('chat message', …)    — 订阅事件并开始接收实时消息
```

------

## Step 0:建立连线

使用 Socket.IO 客户端连线至 IMKIT 的 socket 端点。

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

## Step 1:设置编码(可选)

在验证之前,可先发送 `conf` 事件设置 socket 的数据编码,避免某些消息内容(如包含特殊字符的字符串)被 socket-io 解析时出错。

**Emit 事件**:`conf`

**参数**:设置对象

| 键         | 值        | 说明                                                                 |
| ---------- | --------- | -------------------------------------------------------------------- |
| `encoding` | `base64`  | 启用服务器以 base64 编码回传数据,客户端需自行解码后解析 JSON         |
| `encoding` | `custom`  | 启用自定的传输层加解密(需与服务器约定加密逻辑)                     |

**示例**

```javascript
function configSocket() {
  socket.emit("conf", { encoding: "base64" }, (ack) => {
    console.log("[socket] config ack:", ack);
    auth();   // Step 2
  });
}
```

启用 `base64` 后,后续所有事件 payload 都会是 base64 字符串,需先 decode 再 `JSON.parse` 才能取得对象。

------

## Step 2:身份验证(必须)

连线后必须验证身份,否则无法接收事件。

**Emit 事件**:`auth2`

**参数**

| 参数     | 类型   | 说明                |
| -------- | ------ | ------------------- |
| `token`  | string | Client Token        |
| `extra`  | object | 自定 header,例如 `deviceId`、`platform` 等 |

**示例**

```javascript
function auth() {
  const token = "{IM-Authorization}";
  const extra = {
    deviceId: "iphone-15-pro-uuid-001"
  };

  socket.emit("auth2", token, extra, (ack) => {
    console.log("[socket] auth ack:", ack);
    // 验证成功后即可接收事件
  });
}
```

验证失败时,服务器会关闭连线。客户端应监听 `error` 与 `disconnect` 事件并执行重连流程。

------

## Step 3:订阅事件

验证成功后,即可监听各类事件。完整事件清单与 payload 格式请见 [Socket 事件](/zh-CN/realtime/socket-events)。

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

## 重连与心跳

### 监听生命周期事件

```javascript
socket.on("disconnect", (reason) => {
  console.warn("[socket] disconnect:", reason);
});

socket.on("reconnect", () => {
  console.log("[socket] reconnect");
  // 重连后需重新验证
  auth();
  // 并建议重新拉一次未读总数,确保 UI 与服务器一致
  fetchBadge();
});

socket.on("error", (err) => {
  console.error("[socket] error:", err);
});
```

### 心跳(Ping / Pong)

服务器会定期送出 `ping` 事件,客户端应立即回 `pong` 以维持连线。在多数 Socket.IO 客户端中此行为是自动处理,自定逻辑如下:

```javascript
socket.on("ping", () => {
  if (socket.connected) {
    socket.emit("pong");
  } else {
    socket.connect();
  }
});
```

当客户端在预期时间内(例如 30 秒)未收到 `ping`,代表连线已实际中断,应主动 `disconnect()` 后重新 `connect()`。

------

## 完整最小示例

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

## 注意事项

- **验证顺序**:必须先 `connect` 再 `auth2`,否则服务器会拒绝事件订阅
- **重连后再验证**:Socket.IO 自动重连后,连线是新的,需要重新调用 `auth2`
- **base64 编码**:启用 `encoding: "base64"` 是为了避免特殊字符在 socket-io 序列化时破坏封包,建议在生产环境启用
- **token 过期**:Client token 有有效期限,过期后 `auth2` 会失败,需重新调用 [取得 token API](/zh-CN/user/user-token) 后再连线
- **deviceId 一致性**:`deviceId` 应与 [注册推播 token](/zh-CN/push/device-subscription/subscribe-device) 时使用的值相同,让服务器能识别「此用户正在线上的设备不需推播」
- **同帐号多设备**:同一个 Client 可同时在多设备建立多条 socket 连线,事件会广播至所有连线
- **网络恢复**:移动设备切换网络(Wi-Fi ↔ 移动网络)时通常会触发 `disconnect` + `reconnect`,UI 应显示「重新连线中」状态
