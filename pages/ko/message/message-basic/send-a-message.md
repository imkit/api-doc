# 메시지 발송

## 개요

플랫폼 관리 API를 통해 지정된 채팅방에 메시지를 발송합니다. 발신자 신분을 지정할 수 있어 시스템 알림, 봇 메시지, 백엔드 자동화 등의 시나리오에 적합합니다.

------

## API 엔드포인트

### 채팅방 메시지 발송

지정된 발신자의 신분으로 특정 채팅방에 메시지를 발송합니다.

```http
POST /messages
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 플랫폼 API 키 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | 메시지 내용 |
| `messageType` | string | ✅ | 메시지 타입 (예: `"text"`, `"image"`, `"announcement"` 등) |
| `room` | string | ✅ | 채팅방 ID |
| `sender` | string | ✅ | 발신자 사용자 ID |
| `push` | boolean | ❌ | 채팅방 멤버에게 푸시 알림을 보낼지 여부 (기본값: `true`) |
| `skipTotalBadge` | boolean | ❌ | 발신자의 총 읽지 않은 수 계산을 건너뛸지 여부 (기본값: `false`) |
| `mentions` | array[string] | ❌ | 언급된 사용자 ID 배열 |

#### 요청 예시

**텍스트 메시지 발송**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "system",
    message: "프로젝트 토론 그룹에 오신 것을 환영합니다!",
    messageType: "text",
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**공지 메시지 발송**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "admin",
    message: "시스템 점검이 오늘 밤 22:00에 진행될 예정입니다.",
    messageType: "announcement",
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**언급이 포함된 메시지 발송**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "user-a",
    message: "@user-b 이 문서를 확인해 주세요.",
    messageType: "text",
    mentions: ["user-b"],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**푸시 알림 없이 메시지 발송**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "system",
    message: "백그라운드 작업 완료",
    messageType: "text",
    push: false,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### cURL 예시

```bash
curl -X "POST" "https://your-app.imkit.io/messages" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "room": "project-room-001",
  "sender": "system",
  "message": "환영합니다!",
  "messageType": "text"
}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `RC` | number | 응답 코드 (0은 성공을 의미함) |
| `RM` | string | 응답 메시지 |
| `result` | object | 발송된 메시지 데이터 |

**메시지 객체 구조**

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `_id` | string | 메시지 고유 식별자 |
| `room` | string | 소속 채팅방 ID |
| `message` | any | 메시지 내용 |
| `messageType` | string | 메시지 타입 |
| `sender` | string | 발신자 ID |
| `appID` | string | 애플리케이션 식별자 |
| `messageTimeMS` | number | 메시지 발송 시간 (밀리초 타임스탬프) |
| `updatedAtMS` | number | 메시지 수정 시간 (밀리초 타임스탬프) |
| `createdAtMS` | number | 메시지 생성 시간 (밀리초 타임스탬프) |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58bf8f1dc3b24c04d19d9add",
    "room": "project-room-001",
    "message": "프로젝트 토론 그룹에 오신 것을 환영합니다!",
    "messageType": "text",
    "sender": "system",
    "appID": "SampleApp",
    "messageTimeMS": 1488949021290,
    "updatedAtMS": 1488949021290,
    "createdAtMS": 1488949021290
  }
}
```

#### 오류 응답

**401 Unauthorized** — 인증 실패

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired"
  }
}
```

**404 Not Found** — 채팅방이 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "The specified room does not exist"
  }
}
```

------

## 사용 시나리오

### 시스템 알림
- **시스템 공지**: 백엔드 서비스에서 시스템 공지나 점검 알림을 자동으로 발송합니다.
- **상태 업데이트**: 주문 상태가 변경될 때 관련 사용자에게 자동으로 알림을 보냅니다.

### 봇 메시지
- **자동 응답**: API를 통해 챗봇 기능을 구현합니다.
- **지능형 비서**: Webhook과 결합하여 메시지를 수신하고 응답합니다.

### 애플리케이션 통합
- **제3자 통합**: 외부 시스템의 이벤트를 메시지 형태로 채팅방에 발송합니다.
- **워크플로우**: 비즈니스 프로세스의 주요 단계에서 채팅방 알림을 삽입합니다.

------

## 주의 사항

- **발신자 신분**: `sender`는 시스템에 이미 존재하는 사용자 ID여야 합니다.
- **푸시 제어**: `push` 매개변수를 통해 푸시 알림 여부를 제어할 수 있으며, 무음 알림 시나리오에 적합합니다.
- **메시지 타입**: `messageType`은 사용자 정의 필드로, 애플리케이션 요구사항에 따라 임의의 타입을 설정할 수 있습니다.
- **언급 기능**: `mentions` 배열에 포함된 사용자 ID는 언급 알림을 받게 됩니다.
- **Socket과의 차이점**: 이 API는 백엔드 서비스에서 메시지를 발송할 때 사용되며, 일반 사용자의 채팅은 SDK를 통해 Socket 연결로 처리됩니다.
