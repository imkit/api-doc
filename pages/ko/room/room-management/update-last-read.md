# 마지막 읽음 업데이트

## 개요

사용자가 지정 채팅방에서 메시지를 읽은 후, 이 API를 호출하여 "마지막 읽은 메시지"를 서버에 동기화합니다. 서버는 이를 기준으로 해당 사용자의 채팅방 안 읽음 수(badge)를 재계산하고, Socket [`lastRead` 이벤트](/ko/realtime/socket-events)를 통해 채팅방의 다른 멤버에게 알려 크로스 디바이스 읽음 동기화 및 읽음 확인(read receipts)을 구현합니다.

------

## API 엔드포인트

### 마지막 읽음 메시지 업데이트

지정 채팅방에서 현재 사용자의 마지막 읽음 메시지 ID를 업데이트합니다.

```http
PUT /rooms/:id/lastRead
```

#### Headers

| 파라미터           | 타입   | 필수 | 설명           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |
| `Content-Type`     | string | ✅    | `application/json; charset=utf-8` |

#### Path Parameters

| 파라미터 | 타입   | 필수 | 설명        |
| -------- | ------ | ---- | ----------- |
| `:id`    | string | ✅    | 채팅방 ID   |

#### Post Body

| 파라미터  | 타입   | 필수 | 설명                                            |
| --------- | ------ | ---- | ----------------------------------------------- |
| `message` | string | ✅    | 마지막 읽음 메시지의 ID(해당 채팅방 내 메시지의 `_id`) |

#### 예시 요청

**JavaScript(axios)**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomId}/lastRead`,
  {
    message: "58885c9e4d0c89571b777a81"
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X PUT "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/lastRead" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{"message":"58885c9e4d0c89571b777a81"}'
```

#### Response

**성공 응답(200 OK)**

| 파라미터            | 타입   | 설명                              |
| ------------------- | ------ | --------------------------------- |
| `RC`                | number | 응답 코드(0이면 성공)            |
| `RM`                | string | 응답 메시지                       |
| `result`            | object | 업데이트 결과                     |
| `result.client`     | string | 현재 사용자의 Client ID           |
| `result.lastRead`   | string | 업데이트된 마지막 읽음 메시지 ID  |
| `result.badge`      | number | 해당 사용자의 모든 채팅방 총 안 읽음 수 |

#### 예시 응답

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "client": "1485248560558",
    "lastRead": "58b7b79b0acc250b377357ab",
    "badge": 48
  }
}
```

#### 오류 응답

**401 Unauthorized** - 인증 실패

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**404 Not Found** - 채팅방 또는 메시지를 찾을 수 없음

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room or message not found"
  }
}
```

**400 Bad Request** - 필수 파라미터 누락

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "message is required"
  }
}
```

------

## Socket 이벤트 알림

업데이트가 성공하면 서버는 해당 채팅방의 모든 멤버에게 `lastRead` Socket 이벤트를 브로드캐스트합니다. 예시:

```json
{
  "roomID": "58871b877390be11d5f1ab30",
  "memberID": "1485248560558",
  "messageID": "58b7b79b0acc250b377357ab"
}
```

다른 멤버의 클라이언트는 이 이벤트를 수신하여 "상대방이 어느 메시지까지 읽었는지"의 UI 표시를 실시간으로 업데이트할 수 있습니다. 자세한 내용은 [Socket 이벤트](/ko/realtime/socket-events)를 참고하세요.

------

## 사용 시나리오

### 읽음 동기화
- **채팅방 진입**: 사용자가 채팅방을 열고 화면을 끝까지 스크롤하면 이 API를 호출하여 최신 메시지를 읽음으로 표시합니다
- **백그라운드 동기화**: 앱이 백그라운드에서 포그라운드로 복귀했을 때 채팅방이 여전히 최상단에 있다면 최신 메시지를 다시 읽음으로 표시합니다
- **크로스 디바이스 동기화**: 사용자가 휴대폰에서 읽은 후 웹 / 태블릿 버전이 Socket `lastRead` 이벤트를 통해 안 읽음 상태를 실시간 동기화합니다

### 읽음 확인(Read Receipts)
- **채팅방 멤버 표시**: 발신자는 상대방이 어느 메시지까지 읽었는지 확인할 수 있습니다
- **그룹 읽음 수**: 그룹 내 각 메시지의 읽음 인원 수를 집계합니다

### 안 읽음 계산
- 이 API를 호출한 후 [`GET /me/badge`](/ko/message/message-badge/get-unread-message-by-a-user)와 [`POST /badges/byRoomTags`](/ko/message/message-badge/get-unread-message-by-a-room)의 반환값이 즉시 새 상태를 반영합니다

------

## 참고 사항

- **메시지 ID는 해당 채팅방에 속해야 함**: 전달하는 `message` ID는 `:id` 채팅방 내 메시지여야 하며, 그렇지 않으면 404가 반환됩니다
- **단방향 업데이트**: `lastRead`는 앞으로만 이동합니다. 현재 읽음보다 이전 메시지 ID를 전달하는 동작은 서버 구현을 따르며, 거꾸로 표시하는 것은 권장하지 않습니다
- **빈도 제어**: 매 스크롤마다 호출할 필요는 없습니다. 채팅방을 떠날 때, 새 메시지 수신 시 화면이 하단에 있을 때, 또는 일정 간격(예: 2초마다) 스로틀하여 호출하는 것을 권장합니다
- **서버의 능동 알림**: 성공 후 다른 멤버는 Socket [`lastRead` 이벤트](/ko/realtime/socket-events)를 받아 UI를 실시간으로 업데이트할 수 있습니다
- **badge와의 연관성**: 이 API는 [안 읽음 계산 API](/ko/message/message-badge/get-unread-message-by-a-user)의 반환값을 변경하는 주된 경로입니다
