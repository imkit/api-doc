# 메시지 일괄 전송

## 개요

플랫폼 관리 API를 통해 여러 채팅방 또는 여러 사용자에게 동시에 메시지를 전송합니다. 템플릿 변수 치환을 지원하므로 브로드캐스트 알림, 마케팅 푸시, 시스템 공지 등의 시나리오에 적합합니다.

------

## API 엔드포인트

### 메시지 일괄 전송

여러 채팅방 또는 사용자의 1:1 채팅방으로 메시지를 전송합니다.

```http
POST /messages/batch
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 플랫폼 API 키 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | 메시지 내용, `$pattern$` 템플릿 치환 지원 |
| `messageType` | string | ✅ | 메시지 유형 (예: `"text"`) |
| `sender` | string | ❌ | 지정 발신자 ID (관리자 전용) |
| `push` | boolean | ❌ | 푸시 알림 활성화 여부, 기본값 `false` |
| `skipTotalBadge` | boolean | ❌ | 발신자의 총 읽지 않은 수 계산 건너뛰기, 기본값 `false` |
| `paras` | array[object] | ✅ | 수신자 파라미터 배열 |

**수신자 파라미터 객체**

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `receiver` | string | ❌ | 수신자 사용자 ID (1:1 채팅방으로 전송) |
| `room` | string | ❌ | 채팅방 ID (지정 시 `receiver`는 무시됨) |
| `$pattern$` | string | ❌ | 템플릿 변수의 치환 값 |

#### Example Request

**기본 일괄 전송**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "시스템 공지: 내일 정기 점검이 진행될 예정입니다.",
    push: true,
    sender: "system",
    paras: [
      { receiver: "user-a" },
      { receiver: "user-b" },
      { receiver: "user-c" },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**템플릿 변수 사용**

메시지의 `$pattern$`으로 감싸진 변수는 각 수신자에 해당하는 값으로 치환됩니다:

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "안녕하세요 $name$님, 주문하신 상품 $orderId$가 발송되었습니다!",
    push: true,
    sender: "system",
    paras: [
      {
        receiver: "user-a",
        "$name$": "Alice",
        "$orderId$": "ORD-001",
      },
      {
        receiver: "user-b",
        "$name$": "Bob",
        "$orderId$": "ORD-002",
      },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**특정 채팅방으로 전송**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "이벤트 안내: 내일 14:00에 시작됩니다.",
    sender: "system",
    paras: [
      { room: "room-001" },
      { room: "room-002" },
      { room: "room-003" },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | 응답 코드 (0은 성공을 의미) |
| `RM` | string | 응답 메시지 |
| `result.batchID` | string | 일괄 처리 작업 ID |
| `result.count` | number | 수신자 수 |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "batchID": "batch-20260410-abc123",
    "count": 3
  }
}
```

#### Error Response

요청이 실패하면 오류 세부 정보가 포함된 오류 응답을 받게 됩니다. 주요 오류 시나리오는 다음과 같습니다:

- **API 키 오류** — 제공된 `IM-API-KEY`가 유효하지 않거나 만료됨
- **필수 파라미터 누락** — `message`, `messageType` 또는 `paras`가 제공되지 않음
- **수신자가 존재하지 않음** — `paras`의 `receiver`가 존재하지 않음
- **내부 서버 오류** — 서버 측에서 예기치 않은 오류가 발생함

------

## Use Cases

### 브로드캐스트 알림
- **시스템 공지**: 모든 사용자에게 유지보수 알림 또는 중요 공지를 푸시
- **이벤트 프로모션**: 특정 사용자 그룹에게 이벤트 또는 프로모션 메시지를 전송

### 개인화 메시지
- **템플릿 메시지**: `$pattern$` 변수를 사용하여 개인 정보(예: 주문 번호, 사용자 이름)가 포함된 알림을 전송
- **청구 알림**: 청구서 만료일, 결제 성공 등에 대한 개인화 알림을 전송

------

## Notes

- **비동기 처리**: 일괄 메시지는 처리 큐에 추가되며, 응답은 작업이 생성되었음만 나타냅니다
- **템플릿 치환**: 변수명은 `$`로 감싸야 하며 (예: `$name$`), 치환은 `message` 및 `extra` 필드 모두에 적용됩니다
- **수신자 우선순위**: `paras`에 `receiver`와 `room`이 모두 지정된 경우 `room`이 우선됩니다
- **푸시 기본값 비활성화**: `push` 기본값은 `false`이며, 푸시 알림을 활성화하려면 명시적으로 `true`로 설정해야 합니다
