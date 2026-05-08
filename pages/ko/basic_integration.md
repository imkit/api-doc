# 기본 연동

## 개요

이 가이드는 IMKIT의 기본 연동 과정을 안내합니다. "빠른 시작"을 완료하여 API Key와 Chat Server URL을 발급받은 후, 아래 네 단계에 따라 사용자 생성, 채팅방 생성, 첫 번째 대화 시작, 그리고 web/native app에서 새 메시지 및 읽음/안 읽음 알림을 수신하는 흐름을 빠르게 구축할 수 있습니다.

------

## 사전 준비

다음 준비 사항이 완료되었는지 확인하세요:

| Item | Description | How to Obtain |
| ---- | ---- | -------- |
| API Key | 백엔드 API 인증 키 (`IM-API-KEY`) | IMKIT Dashboard |
| Client Key | 클라이언트 측 연결 키 (`IM-CLIENT-KEY`) | IMKIT Dashboard |
| Chat Server URL | Chat Server URL | IMKIT Dashboard |

------

## 1단계: 사용자 만들기

API를 통해 시스템의 사용자에 대한 IMKIT 사용자를 생성하고 액세스 토큰을 발급받습니다.

```http
POST /admin/clients
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 플랫폼 API 키 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### 사용자 A 생성

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

// 사용자 A 생성 및 Token 발급
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

#### 사용자 B 생성

```javascript
// 사용자 B 생성 및 Token 발급
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

> 발급된 Token을 프론트엔드에 안전하게 전달하여 SDK 또는 Web URL에서 사용하세요.

------

## 2단계: 채팅방 만들기

채팅방을 생성하고 사용자 A와 사용자 B를 멤버로 추가합니다.

```http
POST /rooms/
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 플랫폼 API 키 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Example Request

```javascript
// 1:1 채팅방 생성
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

그룹 채팅방을 생성하려면 `roomType`을 `"group"`으로 변경하고 더 많은 멤버를 추가하세요:

```javascript
// 그룹 채팅방 생성
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

## 3단계: 대화 시작하기

채팅방이 생성된 후, 사용자의 Token을 Web URL에 전달하여 대화를 시작합니다.

### Web SDK 사용

IMKIT Web SDK를 웹 페이지에 삽입하고 사용자의 Token으로 초기화합니다:

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

### Web URL 사용

IMKIT에서 제공하는 Web URL을 발급받은 경우, 사용자 Token을 파라미터로 직접 전달할 수 있습니다:

```
https://your-app.imkit.io/chat?token=USER_TOKEN
```

이 URL을 iframe이나 직접 이동 방식으로 애플리케이션에 삽입할 수 있습니다.

------

## 단계 4: 새 메시지 및 읽음/안 읽음 알림 수신

Web SDK 또는 Web URL이 앱에 삽입된 후, 다음 단계는 **외부 web 컨테이너 또는 네이티브 앱**에서도 "새 메시지" 및 "읽음/안 읽음" 이벤트를 수신하여 상단 바 안 읽은 수, 네이티브 알림 센터, Tab badge 등의 UI를 업데이트하는 것입니다.

전체 아키텍처:

| 채널 | 용도 | 트리거 시점 |
| ---- | ---- | -------- |
| Socket.IO | 실시간 이벤트 (새 메시지, `lastRead`, 입력 중) | 앱이 포그라운드이며 네트워크가 연결된 상태 |
| APNs / FCM 푸시 | 백그라운드 알림 | 앱이 백그라운드에 있거나 종료된 상태 |
| `PUT /rooms/:id/lastRead` | 능동적 읽음 보고 | 사용자가 메시지를 읽었을 때 |

---

### 4-1: Web (외부 컨테이너)

외부 web 페이지(IMKIT chat 페이지가 아닌)에서 Socket.IO 연결을 생성하여 실시간 이벤트를 수신합니다. 전체 라이프사이클은 [Socket 연결](/ko/realtime/socket-connection)을, 이벤트 형식은 [Socket 이벤트](/ko/realtime/socket-events)를 참고하세요.

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io("https://your-app.imkit.io", { forceNew: true });

  socket.on("connect", () => {
    // Step 1: 인코딩 설정 (base64 활성화 권장)
    socket.emit("conf", { encoding: "base64" }, () => {
      // Step 2: 신원 인증
      socket.emit("auth2", "사용자의_TOKEN", { deviceId: "web-tab-uuid" }, (ack) => {
        console.log("[socket] authed", ack);
      });
    });
  });

  // 새 메시지 수신: tab badge 업데이트 / 데스크톱 알림 표시
  socket.on("chat message", (raw) => {
    const msg = decode(raw);
    console.log("새 메시지:", msg);
    document.title = `(${++unreadCount}) Chat`;

    if (Notification.permission === "granted" && document.hidden) {
      new Notification(msg.sender.nickname, { body: msg.message });
    }
  });

  // 상대방 읽음: 읽음 표시 UI 업데이트
  socket.on("lastRead", (raw) => {
    const event = decode(raw);
    console.log(`${event.memberID}님이 ${event.messageID}까지 읽었습니다`);
    updateReadReceipt(event.roomID, event.memberID, event.messageID);
  });

  // 재연결 후 재인증
  socket.on("reconnect", () => {
    socket.emit("auth2", "사용자의_TOKEN", { deviceId: "web-tab-uuid" });
  });

  function decode(raw) {
    if (typeof raw !== "string") return raw;
    return JSON.parse(atob(raw));
  }
</script>
```

사용자가 메시지를 읽었을 때 [`PUT /rooms/:id/lastRead`](/ko/room/room-management/update-last-read)를 호출하여 백엔드에 동기화합니다:

```javascript
async function markAsRead(roomId, lastMessageId) {
  await fetch(`https://your-app.imkit.io/rooms/${roomId}/lastRead`, {
    method: "PUT",
    headers: {
      "IM-CLIENT-KEY": "YOUR_CLIENT_KEY",
      "IM-Authorization": "사용자의_TOKEN",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ message: lastMessageId }),
  });
}
```

---

### 4-2: 네이티브 앱

네이티브 앱은 일반적으로 WebView로 IMKIT chat 페이지를 임베드하므로, 외부 레이어에서 다음을 별도로 처리해야 합니다:

1. **푸시 token 등록**: 로그인 후 APNs / FCM token을 IMKIT에 등록
2. **포그라운드 수신**: Socket 연결을 생성하여 실시간 badge / 알림 표시
3. **백그라운드 수신**: APNs / FCM 푸시에 의존
4. **읽음 보고**: 사용자가 읽었을 때 `PUT /rooms/:id/lastRead` 호출

#### iOS (Swift) — APNs 토큰 등록

APNs device token을 받은 후, [`POST /me/subscribe`](/ko/push/device-subscription/subscribe-device)를 호출합니다:

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

푸시를 수신하면 payload에서 메시지 유형을 파싱하여([푸시 Payload 형식](/ko/push/push-payload-format) 참고) 해당 채팅방으로 이동할 수 있습니다.

#### Android (Kotlin) — FCM 토큰 등록

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
        // 로컬라이제이션 key에 따라 알림을 표시하고 해당 채팅방으로 이동
    }
}
```

#### 네이티브 Socket (포그라운드 실시간 badge)

앱이 포그라운드일 때 푸시에 의존하지 않고 실시간으로 badge를 업데이트하려면, 네이티브에서 Socket 연결을 생성할 수 있습니다. 로직은 4-1의 web 예시와 동일하며, 해당 플랫폼의 Socket.IO 클라이언트([socket.io-client-swift](https://github.com/socketio/socket.io-client-swift) / [socket.io-client-java](https://github.com/socketio/socket.io-client-java))를 사용하세요. 전체 흐름은 [Socket 연결](/ko/realtime/socket-connection)을 참고하세요.

#### 사용자 로그아웃 시 등록 해제

```http
POST /me/unsubscribe
```

자세한 내용은 [기기 Token 등록 해제](/ko/push/device-subscription/unsubscribe-device)를 참고하세요.

---

### 4-3: 현재 안 읽은 수 가져오기

언제든지 안 읽은 총 개수를 새로 고치려면 다음을 호출합니다:

```javascript
const res = await fetch("https://your-app.imkit.io/me/badge", {
  headers: {
    "IM-CLIENT-KEY": "YOUR_CLIENT_KEY",
    "IM-Authorization": "사용자의_TOKEN",
  },
});
const { result } = await res.json();
console.log("총 안 읽은 수:", result.badge);
```

자세한 내용은 [사용자 안 읽은 메시지 가져오기](/ko/message/message-badge/get-unread-message-by-a-user)를 참고하세요. 재연결 후에는 끊어진 동안 안 읽은 수가 누락되지 않도록 이 API를 한 번 호출하는 것을 권장합니다.

---

### 통합 팁

- **포그라운드 Socket, 백그라운드 푸시**: 두 가지를 함께 사용해야 메시지를 놓치지 않습니다
- **deviceId 일관성**: subscribe / socket auth2에서 동일한 `deviceId`를 사용해야, 서버가 "해당 기기가 현재 온라인이므로 푸시가 필요하지 않음"을 식별할 수 있습니다
- **Token 만료**: Socket `auth2`가 실패하면 [Token 발급 API](/ko/user/user-token)를 다시 호출하여 새 token을 받은 후 재연결합니다
- **로그아웃 처리**: 로그아웃 시 반드시 `unsubscribe` + socket `disconnect`를 수행하여, 다음 사용자가 이전 사용자의 푸시를 받지 않도록 합니다

------

## 전체 연동 흐름

아래는 두 명의 사용자와 하나의 채팅방을 생성하는 전체 과정을 포함한 완전한 백엔드 연동 예시입니다:

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

const headers = {
  "IM-API-KEY": API_KEY,
  "Content-Type": "application/json; charset=utf-8",
};

async function setupChat() {
  // 1. 사용자 A 생성
  const userA = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-a", nickname: "Alice", issueAccessToken: true },
    { headers }
  );

  // 2. 사용자 B 생성
  const userB = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-b", nickname: "Bob", issueAccessToken: true },
    { headers }
  );

  // 3. 채팅방 생성
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

## 다음 단계

기본 연동을 완료한 후 다음을 더 탐색해 보세요:

- [인증](/ko/auth) — API Key와 Client Key의 상세 사용법 알아보기
- [사용자 관리](/ko/user/user-management) — 더 많은 사용자 관리 기능
- [채팅방 관리](/ko/room/room-management) — 고급 채팅방 운영
- [메시징](/ko/message/message-basic) — API를 통한 메시지 전송 및 관리
- [Webhook](/ko/webhook) — 채팅방 이벤트 수신 및 자동화 워크플로우
