# Socket Connection

## Overview

IMKIT uses Socket.IO for real-time bidirectional communication, enabling native app / web clients to receive new messages, read-state changes, typing indicators, and other events while connected. This page describes the full connection lifecycle: establishing the connection, configuring data encoding, authentication, subscribing to events, and reconnect handling.

------

## Connection Lifecycle

```
Step 0. SocketIO.connect()       — Establish the underlying connection
   ↓
Step 1. emit('conf')             — (Optional) Configure data encoding
   ↓
Step 2. emit('auth2', token, …)  — (Required) Authenticate
   ↓
Step 3. on('chat message', …)    — Subscribe to events and start receiving messages in real time
```

------

## Step 0: Establish the Connection

Use the Socket.IO client to connect to the IMKIT socket endpoint.

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

## Step 1: Configure Encoding (Optional)

Before authenticating, you can emit a `conf` event to configure the socket's data encoding, which avoids parsing errors when the message content (e.g. strings with special characters) is processed by socket-io.

**Emit event**: `conf`

**Argument**: configuration object

| Key        | Value     | Description                                                          |
| ---------- | --------- | -------------------------------------------------------------------- |
| `encoding` | `base64`  | Have the server return data base64-encoded; the client must decode and then `JSON.parse` |
| `encoding` | `custom`  | Enable custom transport-layer encryption (requires shared encryption logic with the server) |

**Example**

```javascript
function configSocket() {
  socket.emit("conf", { encoding: "base64" }, (ack) => {
    console.log("[socket] config ack:", ack);
    auth();   // Step 2
  });
}
```

When `base64` is enabled, all subsequent event payloads are base64 strings; decode them before calling `JSON.parse` to obtain the object.

------

## Step 2: Authenticate (Required)

Once connected, the client must authenticate, otherwise it cannot receive events.

**Emit event**: `auth2`

**Arguments**

| Argument | Type   | Description           |
| -------- | ------ | --------------------- |
| `token`  | string | Client Token          |
| `extra`  | object | Custom headers, e.g. `deviceId`, `platform` |

**Example**

```javascript
function auth() {
  const token = "{IM-Authorization}";
  const extra = {
    deviceId: "iphone-15-pro-uuid-001"
  };

  socket.emit("auth2", token, extra, (ack) => {
    console.log("[socket] auth ack:", ack);
    // Once authenticated, events can be received
  });
}
```

If authentication fails, the server closes the connection. The client should listen for `error` and `disconnect` events and run its reconnect flow.

------

## Step 3: Subscribe to Events

Once authentication succeeds, you can listen for any event. For the full event list and payload formats, see [Socket Events](/en/realtime/socket-events).

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

## Reconnect and Heartbeat

### Listen for Lifecycle Events

```javascript
socket.on("disconnect", (reason) => {
  console.warn("[socket] disconnect:", reason);
});

socket.on("reconnect", () => {
  console.log("[socket] reconnect");
  // Re-authenticate after reconnect
  auth();
  // Also re-fetch the total unread count to keep UI in sync with the server
  fetchBadge();
});

socket.on("error", (err) => {
  console.error("[socket] error:", err);
});
```

### Heartbeat (Ping / Pong)

The server periodically emits `ping`; the client should reply with `pong` to keep the connection alive. Most Socket.IO clients handle this automatically; a custom implementation looks like:

```javascript
socket.on("ping", () => {
  if (socket.connected) {
    socket.emit("pong");
  } else {
    socket.connect();
  }
});
```

If the client does not receive a `ping` within an expected interval (e.g. 30 seconds), the connection has effectively dropped and the client should `disconnect()` and then `connect()` again.

------

## Complete Minimal Example

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

## Notes

- **Auth Order**: Always `connect` before `auth2`; otherwise the server rejects event subscriptions
- **Re-auth on Reconnect**: Socket.IO's auto-reconnect creates a new connection, so `auth2` must be called again
- **base64 Encoding**: Enabling `encoding: "base64"` prevents special characters from corrupting socket-io serialization; recommended in production
- **Token Expiry**: Client tokens have a finite lifetime; once expired, `auth2` fails and you must obtain a new token via the [token API](/en/user/user-token) before reconnecting
- **deviceId Consistency**: `deviceId` should match the value used when [registering push tokens](/en/push/device-subscription/subscribe-device), so the server can detect "this user has an online device — no push needed"
- **Same Account, Multiple Devices**: A single Client may hold multiple socket connections across devices; events are broadcast to all of them
- **Network Recovery**: On mobile, switching networks (Wi-Fi ↔ cellular) typically triggers `disconnect` + `reconnect`; the UI should show a "reconnecting" state
