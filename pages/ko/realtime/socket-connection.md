# Socket 연결

## 개요

IMKIT은 Socket.IO를 사용하여 실시간 양방향 통신을 제공하며, 네이티브 앱 / 웹 클라이언트가 연결 중에 새 메시지, 읽음 상태 변경, 입력 중 알림 등의 이벤트를 실시간으로 받을 수 있게 합니다. 이 페이지는 연결 수립, 데이터 인코딩 설정, 인증, 이벤트 구독부터 연결 해제 및 재연결까지 전체 연결 생명주기를 설명합니다.

------

## 연결 생명주기

```
Step 0. SocketIO.connect()       — 기본 연결 수립
   ↓
Step 1. emit('conf')             — (선택) 데이터 인코딩 설정
   ↓
Step 2. emit('auth2', token, …)  — (필수) 인증
   ↓
Step 3. on('chat message', …)    — 이벤트 구독 및 실시간 메시지 수신 시작
```

------

## Step 0: 연결 수립

Socket.IO 클라이언트를 사용하여 IMKIT의 socket 엔드포인트에 연결합니다.

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

## Step 1: 인코딩 설정 (선택)

인증 전에 `conf` 이벤트를 보내 socket의 데이터 인코딩을 설정할 수 있으며, 이는 일부 메시지 내용(예: 특수 문자가 포함된 문자열)이 socket-io에 의해 파싱될 때 발생할 수 있는 오류를 방지합니다.

**Emit 이벤트**: `conf`

**파라미터**: 설정 객체

| 키         | 값        | 설명                                                                 |
| ---------- | --------- | -------------------------------------------------------------------- |
| `encoding` | `base64`  | 서버가 데이터를 base64로 인코딩하여 반환하도록 활성화. 클라이언트는 자체적으로 디코딩 후 JSON을 파싱해야 함 |
| `encoding` | `custom`  | 커스텀 전송 계층 암복호화 활성화(서버와 약속된 암호화 로직 필요)     |

**예시**

```javascript
function configSocket() {
  socket.emit("conf", { encoding: "base64" }, (ack) => {
    console.log("[socket] config ack:", ack);
    auth();   // Step 2
  });
}
```

`base64`를 활성화하면 이후 모든 이벤트 payload는 base64 문자열이 되며, decode 후 `JSON.parse`를 거쳐야 객체로 사용할 수 있습니다.

------

## Step 2: 인증 (필수)

연결 후에는 반드시 인증을 수행해야 하며, 그렇지 않으면 이벤트를 수신할 수 없습니다.

**Emit 이벤트**: `auth2`

**파라미터**

| 파라미터 | 타입   | 설명                |
| -------- | ------ | ------------------- |
| `token`  | string | Client Token        |
| `extra`  | object | 커스텀 header. 예: `deviceId`, `platform` 등 |

**예시**

```javascript
function auth() {
  const token = "{IM-Authorization}";
  const extra = {
    deviceId: "iphone-15-pro-uuid-001"
  };

  socket.emit("auth2", token, extra, (ack) => {
    console.log("[socket] auth ack:", ack);
    // 인증 성공 후 이벤트 수신 가능
  });
}
```

인증 실패 시 서버는 연결을 종료합니다. 클라이언트는 `error` 및 `disconnect` 이벤트를 수신하고 재연결 흐름을 실행해야 합니다.

------

## Step 3: 이벤트 구독

인증이 성공하면 다양한 이벤트를 수신할 수 있습니다. 전체 이벤트 목록과 payload 형식은 [Socket 이벤트](/ko/realtime/socket-events)를 참고하세요.

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

## 재연결과 하트비트

### 생명주기 이벤트 수신

```javascript
socket.on("disconnect", (reason) => {
  console.warn("[socket] disconnect:", reason);
});

socket.on("reconnect", () => {
  console.log("[socket] reconnect");
  // 재연결 후 재인증 필요
  auth();
  // 그리고 안 읽음 총수를 다시 가져와 UI와 서버 간 일관성을 유지하는 것을 권장
  fetchBadge();
});

socket.on("error", (err) => {
  console.error("[socket] error:", err);
});
```

### 하트비트 (Ping / Pong)

서버는 정기적으로 `ping` 이벤트를 보내며, 클라이언트는 즉시 `pong`으로 응답하여 연결을 유지해야 합니다. 대부분의 Socket.IO 클라이언트에서 이 동작은 자동으로 처리되며, 커스텀 로직은 다음과 같습니다:

```javascript
socket.on("ping", () => {
  if (socket.connected) {
    socket.emit("pong");
  } else {
    socket.connect();
  }
});
```

클라이언트가 예상 시간 내(예: 30초)에 `ping`을 수신하지 못하면 연결이 실제로 끊긴 것이므로, 능동적으로 `disconnect()` 후 다시 `connect()`를 수행해야 합니다.

------

## 완전한 최소 예시

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

## 참고 사항

- **인증 순서**: 반드시 `connect` 후 `auth2`를 수행해야 하며, 그렇지 않으면 서버가 이벤트 구독을 거부합니다
- **재연결 후 재인증**: Socket.IO가 자동 재연결한 후의 연결은 새로운 연결이므로 `auth2`를 다시 호출해야 합니다
- **base64 인코딩**: `encoding: "base64"`를 활성화하는 것은 특수 문자가 socket-io 직렬화 시 패킷을 손상시키는 것을 방지하기 위함이며, 운영 환경에서 활성화하는 것을 권장합니다
- **token 만료**: Client token은 유효 기간이 있으며, 만료되면 `auth2`가 실패합니다. [token 발급 API](/ko/user/user-token)를 다시 호출한 후 연결해야 합니다
- **deviceId 일관성**: `deviceId`는 [푸시 토큰 등록](/ko/push/device-subscription/subscribe-device) 시 사용한 값과 동일해야 하며, 이를 통해 서버가 "이 사용자는 현재 온라인 기기에 있으므로 푸시 불필요"임을 식별할 수 있습니다
- **동일 계정 다중 기기**: 동일한 Client는 여러 기기에서 동시에 여러 socket 연결을 수립할 수 있으며, 이벤트는 모든 연결로 브로드캐스트됩니다
- **네트워크 복구**: 모바일 기기가 네트워크를 전환할 때(Wi-Fi ↔ 모바일 네트워크) 일반적으로 `disconnect` + `reconnect`가 트리거되며, UI는 "재연결 중" 상태를 표시해야 합니다
