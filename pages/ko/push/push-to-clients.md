# 클라이언트에 푸시 알림 전송

## Overview

서버 측에서 지정된 사용자에게 커스텀 푸시 알림을 전송합니다. Apple Push Notification Service (APNs) 및 Firebase Cloud Messaging (FCM)을 지원하여 iOS와 Android 기기에 동시 전달이 가능합니다. 마케팅 푸시, 시스템 공지, 커스텀 알림 등 다양한 용도에 적합합니다.

------

## API Endpoint

### 지정 사용자에게 푸시 알림 전송

지정된 사용자 그룹에 푸시 알림을 전송하며, iOS 및 Android 플랫폼에 맞는 알림 필드를 설정합니다.

```http
POST /push/push2clients
```

#### Headers

| Parameter      | Type   | Required | Description             |
| -------------- | ------ | -------- | ----------------------- |
| `IM-API-KEY`   | string | ✅        | 플랫폼 API Key   |
| `Content-Type` | string | ✅       | `application/json; charset=utf-8` |

#### Post Body

| Parameter | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| `clients` | array  | ✅        | 대상 사용자 Client ID 배열               |
| `payload` | object | ✅        | 플랫폼별 필드가 포함된 푸시 알림 내용 |

**payload 오브젝트 필드**

| Parameter    | Type           | Required | Platform | Description                                                            |
| ------------ | -------------- | -------- | -------- | ---------------------------------------------------------------------- |
| `type`       | string         | ❌        | Shared   | 알림 유형, 커스텀 분류 태그                           |
| `expiry`     | number         | ❌        | iOS      | 알림 만료 시간 (Unix 타임스탬프, 초 단위)                 |
| `alert`      | string/object  | ❌        | iOS      | 알림 알러트, 문자열 또는 `loc-key`, `loc-args`가 포함된 오브젝트 |
| `badge`      | number         | ❌        | iOS      | 앱 아이콘의 배지 숫자                                           |
| `sound`      | string         | ❌        | iOS      | 알림 사운드 파일명                                           |
| `topic`      | string         | ❌        | iOS      | APNs 토픽, 일반적으로 앱의 Bundle ID                                |
| `title`      | string         | ❌        | Android  | 알림 제목                                                     |
| `body`       | string         | ❌        | Android  | 알림 본문                                                      |
| `icon`       | string         | ❌        | Android  | 알림 아이콘 URL                                                  |
| `collapseKey` | string        | ❌        | Android  | 접기 키; 동일한 키를 가진 알림은 합쳐집니다            |

**alert 오브젝트 필드 (alert가 오브젝트인 경우)**

| Parameter  | Type   | Required | Description                    |
| ---------- | ------ | -------- | ------------------------------ |
| `loc-key`  | string | ❌        | 로컬라이제이션 문자열 키        |
| `loc-args` | array  | ❌        | 로컬라이제이션 문자열 인수  |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/push/push2clients",
  {
    clients: ["user001", "user002", "user003"],
    payload: {
      type: "marketing",
      alert: "새로운 이벤트가 있습니다. 지금 확인해 보세요!",
      badge: 1,
      sound: "default",
      topic: "io.imkit.app",
      title: "한정 기간 혜택",
      body: "새로운 이벤트가 있습니다. 지금 확인해 보세요!",
      icon: "https://example.com/icon.png",
      collapseKey: "promo_2026"
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**로컬라이제이션 alert 오브젝트 사용**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/push/push2clients",
  {
    clients: ["user001"],
    payload: {
      alert: {
        "loc-key": "NEW_MESSAGE_NOTIFICATION",
        "loc-args": ["홍길동", "안녕하세요, 시간 괜찮으신가요?"]
      },
      badge: 3,
      sound: "default",
      title: "새 메시지",
      body: "홍길동: 안녕하세요, 시간 괜찮으신가요?"
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X POST "https://your-app.imkit.io/push/push2clients" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "clients": ["user001", "user002"],
    "payload": {
      "type": "alert",
      "alert": "시스템 점검 안내: 오늘 밤 23:00에 정기 점검이 진행될 예정입니다.",
      "badge": 1,
      "sound": "default",
      "title": "시스템 공지",
      "body": "시스템 점검 안내: 오늘 밤 23:00에 정기 점검이 진행될 예정입니다.",
      "icon": "https://example.com/icon.png"
    }
  }'
```

#### Response

**Success Response (200 OK)**

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

요청이 성공하면 서버는 각각 APNs (iOS)와 FCM (Android)을 통해 푸시 알림을 전송합니다.

#### Error Response

**401 Unauthorized** - 유효하지 않은 API Key

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
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
    "message": "clients and payload are required"
  }
}
```

------

## Use Cases

### 마케팅 푸시
- **프로모션 알림**: 특정 사용자 그룹에 프로모션 캠페인, 할인 코드 등 마케팅 메시지 전송
- **개인화 추천**: 사용자 행동을 기반으로 개인화된 상품 추천 푸시

### 시스템 알림
- **유지보수 공지**: 시스템 유지보수, 버전 업데이트 등 공지 메시지 전송
- **보안 알림**: 의심스러운 로그인 활동, 비밀번호 변경 등 보안 이벤트 사용자 통지

### 커스텀 알림
- **예약 알림**: 예약, 회의, 만료 알림 등 시간에 민감한 알림 전송
- **상태 업데이트**: 주문 상태 변경, 검토 결과 등 업데이트 사용자 통지

------

## Notes

- **서버 측 전용**: 이 API는 `IM-API-KEY` 인증이 필요하며 서버 측 사용 전용입니다
- **양 플랫폼 푸시**: 시스템은 APNs (iOS)와 FCM (Android)을 통해 동시에 푸시 알림을 전송합니다
- **기기 등록**: 사용자가 푸시 토큰을 등록해야 하며, 그렇지 않으면 알림 전달이 불가능합니다
- **푸시 할당량**: APNs와 FCM의 속도 제한을 준수하여 과도한 푸시를 피해야 합니다
- **alert 필드**: iOS `alert`는 일반 문자열 또는 로컬라이제이션 키가 포함된 오브젝트로 설정할 수 있으며, 필요에 따라 적절한 형식을 선택하세요
- **알림 합치기**: Android `collapseKey`를 사용하여 동일한 유형의 알림을 합쳐 사용자 방해를 줄일 수 있습니다
