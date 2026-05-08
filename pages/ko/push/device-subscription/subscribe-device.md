# 기기 토큰 등록

## 개요

네이티브 앱의 기기 푸시 토큰(APNs / FCM 등)을 IMKIT에 등록하여, 서버 측에서 [`POST /push/push2clients`](/ko/push/push-to-clients) 또는 채팅방 메시지 이벤트로 트리거되는 내장 푸시 파이프라인을 통해 사용자의 실제 기기에 알림을 정확히 전달할 수 있도록 합니다. 각 기기는 `deviceId`로 고유하게 식별되며, 동일한 사용자가 여러 기기를 동시에 등록할 수 있습니다.

------

## API 엔드포인트

### 푸시 토큰 등록

현재 사용자의 기기 토큰을 등록하여 푸시 알림을 수신합니다.

```http
POST /me/subscribe
```

#### Headers

| 파라미터           | 타입   | 필수 | 설명           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |
| `Content-Type`     | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

| 파라미터   | 타입   | 필수 | 설명                                                         |
| ---------- | ------ | ---- | ------------------------------------------------------------ |
| `type`     | string | ✅    | 기기 토큰 유형. 사용 가능 값: `ios`、`android`、`fcm`、`web`、`ios-voip` |
| `token`    | string | ✅    | 기기 푸시 토큰(APNs 또는 FCM에서 획득)                     |
| `deviceId` | string | ✅    | 기기 고유 식별자(앱에서 생성하여 영속적으로 저장)           |
| `clientId` | string | ❌    | 바인딩할 Client ID. 플랫폼 API Key(`IM-API-KEY`)로 이 API를 호출할 때만 필요 |

#### 예시 요청

**JavaScript(axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/subscribe",
  {
    type: "ios",
    token: "17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6",
    deviceId: "iphone-15-pro-uuid-001"
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

**Android FCM 토큰 등록**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/subscribe",
  {
    type: "fcm",
    token: "dGhpcyBpcyBhIGZjbSB0b2tlbg...",
    deviceId: "pixel-8-uuid-002"
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
curl -X POST "https://your-app.imkit.io/me/subscribe" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "type": "ios",
       "token": "17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6",
       "deviceId": "iphone-15-pro-uuid-001"
     }'
```

#### Response

**성공 응답(200 OK)**

| 파라미터 | 타입   | 설명                       |
| -------- | ------ | -------------------------- |
| `RC`     | number | 응답 코드(0이면 성공)     |
| `RM`     | string | 응답 메시지                |
| `result` | object | 등록 결과(성공 시 빈 객체) |

#### 예시 응답

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
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

**400 Bad Request** - 필수 파라미터 누락

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "type, token and deviceId are required"
  }
}
```

------

## 사용 시나리오

### 네이티브 앱 연동
- **iOS**: APNs device token을 획득한 후 `type: "ios"`로 등록
- **Android**: Firebase의 registration token을 획득한 후 `type: "fcm"`(또는 `android`)으로 등록
- **VoIP 통화**: `type: "ios-voip"`를 사용하여 PushKit 토큰을 등록하고 수신 통화 푸시에 활용
- **웹 브라우저**: `type: "web"`을 사용하여 Web Push 구독을 등록

### 다중 기기 지원
- **동일 사용자, 다중 기기**: 사용자가 서로 다른 기기에서 각기 다른 `deviceId`로 등록하면 푸시는 등록된 모든 기기로 전송됩니다
- **기기 변경**: 사용자가 새 휴대폰으로 교체할 때 새 기기는 새로운 `deviceId`로 등록하고, 기존 기기는 [등록 해제](/ko/push/device-subscription/unsubscribe-device)를 호출하여 제거합니다

### 플랫폼 백엔드 연동
- **사용자 대신 등록**: `IM-API-KEY`로 이 API를 호출하면서 `clientId`를 제공하면 특정 사용자를 대신해 기기 토큰을 바인딩할 수 있습니다

------

## 참고 사항

- **호출 시점**: 사용자의 로그인이 완료되고 시스템에서 푸시 권한이 승인된 직후에 호출해야 합니다
- **deviceId 일관성**: `deviceId`는 앱 최초 실행 시 생성하여 영속적으로 저장(예: Keychain / SharedPreferences)하고 이후에는 동일한 값을 사용해야 합니다
- **토큰 갱신**: APNs / FCM 토큰이 변경되면(시스템이 앱에 알림을 줍니다) 이 API를 다시 호출하여 새 토큰을 등록해야 합니다
- **로그아웃 처리**: 사용자가 로그아웃할 때는 [등록 해제](/ko/push/device-subscription/unsubscribe-device)를 호출하여 토큰을 제거하고, 로그아웃된 기기로 푸시가 전송되는 것을 방지하기를 권장합니다
- **토큰 유형**: `ios`와 `ios-voip`는 용도가 다르며, VoIP 푸시는 반드시 `ios-voip`를 사용해야 합니다
- **멱등성**: 동일한 `type` + `deviceId`로 반복 호출 시 해당 토큰이 갱신되며 중복 등록이 발생하지 않습니다
