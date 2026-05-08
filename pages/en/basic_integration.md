# Basic Integration

## Overview

This guide walks you through the basic integration process with IMKIT. After completing the "Quick Start" to obtain your API Key and Chat Server URL, you can follow these four steps to quickly create users, create a chat room, start a conversation, and let your web/native app receive new-message and read-state notifications.

------

## Prerequisites

Please confirm you have completed the following preparations:

| Item | Description | How to Obtain |
| ---- | ---- | -------- |
| API Key | Backend API authentication key (`IM-API-KEY`) | IMKIT Dashboard |
| Client Key | Client-side connection key (`IM-CLIENT-KEY`) | IMKIT Dashboard |
| Chat Server URL | Your Chat Server URL | IMKIT Dashboard |

------

## Step 1: Create Users

Create IMKIT users for the users in your system via the API and obtain access tokens.

```http
POST /admin/clients
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Create User A

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

// Create User A and obtain Token
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
console.log("User A Token:", tokenA);
```

#### Create User B

```javascript
// Create User B and obtain Token
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
console.log("User B Token:", tokenB);
```

#### Example Response

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

> Please securely pass the obtained Token to the frontend for use with the SDK or Web URL.

------

## Step 2: Create a Chat Room

Create a chat room and add User A and User B as members.

```http
POST /rooms/
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Your platform API key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Example Request

```javascript
// Create a one-on-one chat room
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
console.log("Chat Room ID:", roomId);
```

To create a group chat room, change `roomType` to `"group"` and add more members:

```javascript
// Create a group chat room
const groupRoom = await axios.post(
  `${BASE_URL}/rooms/`,
  {
    name: "Project Discussion Group",
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

#### Example Response

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

## Step 3: Start a Conversation

After the chat room is created, pass the user's Token into the Web URL to start a conversation.

### Using the Web SDK

Embed the IMKIT Web SDK in your web page and initialize it with the user's Token:

```html
<div id="imkit-container"></div>
<script src="https://cdn.imkit.io/sdk/web/latest/imkit.min.js"></script>
<script>
  window.IMKitUI.init({
    domain: "https://your-app.imkit.io",
    clientKey: "YOUR_CLIENT_KEY",
    token: "USER_TOKEN",
  });
</script>
```

### Using Web URL

If you have obtained the Web URL provided by IMKIT, you can directly pass the user Token as a parameter:

```
https://your-app.imkit.io/chat?token=USER_TOKEN
```

You can embed this URL in your application via an iframe or direct navigation.

------

## Step 4: Receiving New-Message and Read-State Notifications

Once the Web SDK or Web URL is embedded in your app, the next step is letting the **outer web container or native app** also receive "new message" and "read-state" events, so you can update the title-bar unread count, the native notification center, tab badges, and similar UI.

Overall architecture:

| Channel | Purpose | When |
| ---- | ---- | -------- |
| Socket.IO | Real-time events (new message, `lastRead`, typing) | App is in the foreground and online |
| APNs / FCM push | Background notifications | App is in the background or terminated |
| `PUT /rooms/:id/lastRead` | Actively report read state | When the user finishes reading messages |

---

### 4-1: Web (Host Container)

In the outer web page (not the IMKIT chat page itself), open a Socket.IO connection to receive real-time events. For the full lifecycle, see [Socket Connection](/en/realtime/socket-connection); for event payload formats, see [Socket Events](/en/realtime/socket-events).

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io("https://your-app.imkit.io", { forceNew: true });

  socket.on("connect", () => {
    // Step 1: configure encoding (base64 recommended)
    socket.emit("conf", { encoding: "base64" }, () => {
      // Step 2: authenticate
      socket.emit("auth2", "USER_TOKEN", { deviceId: "web-tab-uuid" }, (ack) => {
        console.log("[socket] authed", ack);
      });
    });
  });

  // New message: update tab badge / show desktop notification
  socket.on("chat message", (raw) => {
    const msg = decode(raw);
    console.log("New message:", msg);
    document.title = `(${++unreadCount}) Chat`;

    if (Notification.permission === "granted" && document.hidden) {
      new Notification(msg.sender.nickname, { body: msg.message });
    }
  });

  // Peer has read: update read-receipt UI
  socket.on("lastRead", (raw) => {
    const event = decode(raw);
    console.log(`${event.memberID} has read up to ${event.messageID}`);
    updateReadReceipt(event.roomID, event.memberID, event.messageID);
  });

  // Re-authenticate after reconnect
  socket.on("reconnect", () => {
    socket.emit("auth2", "USER_TOKEN", { deviceId: "web-tab-uuid" });
  });

  function decode(raw) {
    if (typeof raw !== "string") return raw;
    return JSON.parse(atob(raw));
  }
</script>
```

When the user finishes reading messages, call [`PUT /rooms/:id/lastRead`](/en/room/room-management/update-last-read) to sync the read state to the backend:

```javascript
async function markAsRead(roomId, lastMessageId) {
  await fetch(`https://your-app.imkit.io/rooms/${roomId}/lastRead`, {
    method: "PUT",
    headers: {
      "IM-CLIENT-KEY": "YOUR_CLIENT_KEY",
      "IM-Authorization": "USER_TOKEN",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ message: lastMessageId }),
  });
}
```

---

### 4-2: Native App

A native app typically embeds the IMKIT chat page in a WebView; the outer app needs to handle the following separately:

1. **Register the push token**: after login, register the APNs / FCM token with IMKIT
2. **Foreground reception**: open a Socket connection to drive the live badge / in-app notifications
3. **Background reception**: rely on APNs / FCM push
4. **Report read state**: call `PUT /rooms/:id/lastRead` when the user finishes reading

#### iOS (Swift) — Register APNs Token

After obtaining the APNs device token, call [`POST /me/subscribe`](/en/push/device-subscription/subscribe-device):

```swift
func application(_ application: UIApplication,
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    let token = deviceToken.map { String(format: "%02x", $0) }.joined()
    let deviceId = UIDevice.current.identifierForVendor?.uuidString ?? ""

    var request = URLRequest(url: URL(string: "https://your-app.imkit.io/me/subscribe")!)
    request.httpMethod = "POST"
    request.setValue("YOUR_CLIENT_KEY", forHTTPHeaderField: "IM-CLIENT-KEY")
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

When a push arrives, parse the message type from the payload (see [Push Payload Format](/en/push/push-payload-format)) and navigate to the corresponding chat room.

#### Android (Kotlin) — Register FCM Token

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
            .addHeader("IM-CLIENT-KEY", "YOUR_CLIENT_KEY")
            .addHeader("IM-Authorization", userToken)
            .addHeader("Content-Type", "application/json; charset=utf-8")
            .post(body.toRequestBody("application/json".toMediaType()))
            .build()

        OkHttpClient().newCall(request).enqueue(/* ... */)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        val locKey = remoteMessage.data["loc-key"]      // e.g. "im_loc_text"
        val locArgs = remoteMessage.data["loc-args"]    // e.g. ["Alice", "Hello"]
        // Display the notification by localization key and route to the matching chat room
    }
}
```

#### Native Socket (Foreground Real-time Badge)

If you want the app to update the badge in real time while in the foreground without depending on push, open a Socket connection on the native side. The logic mirrors the web example in 4-1, using the platform's Socket.IO client ([socket.io-client-swift](https://github.com/socketio/socket.io-client-swift) / [socket.io-client-java](https://github.com/socketio/socket.io-client-java)). For the full flow, see [Socket Connection](/en/realtime/socket-connection).

#### Unsubscribe on User Logout

```http
POST /me/unsubscribe
```

See [Unsubscribe Device Token](/en/push/device-subscription/unsubscribe-device) for details.

---

### 4-3: Fetch Current Unread Count

Whenever you need to refresh the total unread count, call:

```javascript
const res = await fetch("https://your-app.imkit.io/me/badge", {
  headers: {
    "IM-CLIENT-KEY": "YOUR_CLIENT_KEY",
    "IM-Authorization": "USER_TOKEN",
  },
});
const { result } = await res.json();
console.log("Total unread:", result.badge);
```

See [Get Unread Messages by a User](/en/message/message-badge/get-unread-message-by-a-user) for details. After a reconnect, it is recommended to call this API once to avoid missing unreads accumulated while disconnected.

---

### Integration Tips

- **Socket in foreground, push in background**: combine both so messages are never missed
- **Consistent `deviceId`**: use the same `deviceId` for `subscribe` and Socket `auth2` so the server can recognize "this device is currently online and does not need a push"
- **Token expiration**: when Socket `auth2` fails, call the [Get Token API](/en/user/user-token) to obtain a new token before reconnecting
- **Logout handling**: on logout you must `unsubscribe` and `disconnect` the socket, otherwise the next user may receive the previous user's pushes

------

## Complete Integration Flow

Below is a complete backend integration example covering the full process of creating two users and one chat room:

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

const headers = {
  "IM-API-KEY": API_KEY,
  "Content-Type": "application/json; charset=utf-8",
};

async function setupChat() {
  // 1. Create User A
  const userA = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-a", nickname: "Alice", issueAccessToken: true },
    { headers }
  );

  // 2. Create User B
  const userB = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-b", nickname: "Bob", issueAccessToken: true },
    { headers }
  );

  // 3. Create Chat Room
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
  console.log("Integration complete!");
  console.log("User A Token:", result.tokenA);
  console.log("User B Token:", result.tokenB);
  console.log("Chat Room ID:", result.roomId);
});
```

------

## Next Steps

After completing the basic integration, you can explore further:

- [Authentication](/en/auth) — Learn the detailed usage of API Key and Client Key
- [User Management](/en/user/user-management) — More user management features
- [Chat Room Management](/en/room/room-management) — Advanced chat room operations
- [Messaging](/en/message/message-basic) — Send and manage messages via API
- [Webhook](/en/webhook) — Receive chat room events for automated workflows
