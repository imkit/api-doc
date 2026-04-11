# 기본 연동

## 개요

이 가이드는 IMKIT의 기본 연동 과정을 안내합니다. "빠른 시작"을 완료하여 API Key와 Chat Server URL을 발급받은 후, 아래 세 단계에 따라 사용자 생성, 채팅방 생성, 첫 번째 대화 시작을 빠르게 진행할 수 있습니다.

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
