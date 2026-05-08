# 기기 토큰 등록 해제

## 개요

이전에 [`POST /me/subscribe`](/ko/push/device-subscription/subscribe-device)를 통해 등록한 기기 토큰을 IMKIT에서 제거하여, 사용자가 로그아웃하거나 앱을 삭제하거나 기기를 교체한 후에도 푸시 알림이 계속 수신되는 것을 방지합니다. 네이티브 앱의 로그아웃 흐름에서 이 API를 호출하는 것을 권장합니다.

------

## API 엔드포인트

### 푸시 토큰 등록 해제

`deviceId`에 따라 현재 사용자의 지정 기기에서 푸시 구독을 해제합니다.

```http
POST /me/unsubscribe
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
| `type`     | string | ✅    | 기기 토큰 유형. 사용 가능 값: `ios`、`android`、`fcm`、`web` |
| `deviceId` | string | ✅    | 기기 고유 식별자(subscribe 시 사용한 값과 동일)             |
| `clientId` | string | ❌    | 바인딩 해제할 Client ID. 플랫폼 API Key(`IM-API-KEY`)로 이 API를 호출할 때만 필요 |

#### 예시 요청

**JavaScript(axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/unsubscribe",
  {
    type: "fcm",
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
curl -X POST "https://your-app.imkit.io/me/unsubscribe" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "type": "fcm",
       "deviceId": "pixel-8-uuid-002"
     }'
```

#### Response

**성공 응답(200 OK)**

| 파라미터     | 타입   | 설명                              |
| ------------ | ------ | --------------------------------- |
| `RC`         | number | 응답 코드(0이면 성공)            |
| `RM`         | string | 응답 메시지                       |
| `result`     | object | 등록 해제 결과                    |
| `result.n`   | number | 영향을 받은 레코드 수             |
| `result.ok`  | number | 작업 상태(`1`이면 성공)          |

#### 예시 응답

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

`result.n`이 `0`이면 `type` + `deviceId`에 일치하는 레코드를 찾지 못했음을 의미합니다(예: 해당 기기가 등록된 적이 없거나 이미 제거됨).

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
    "message": "type and deviceId are required"
  }
}
```

------

## 사용 시나리오

### 사용자 로그아웃
- **로그아웃 흐름**: 네이티브 앱이 로그아웃을 실행하기 전에 호출하여, 다음에 해당 기기에 로그인하는 사용자가 이전 사용자의 푸시를 받지 않도록 합니다

### 기기 교체
- **기존 기기 폐기**: 사용자가 새 휴대폰으로 교체할 때 기존 기기에서 이 API를 호출하여 토큰을 제거합니다

### 푸시 권한 변경
- **사용자가 알림 비활성화**: 앱이 사용자가 시스템 설정에서 푸시 권한을 비활성화한 것을 감지하면 이 API를 호출하여 구독을 해제할 수 있습니다

------

## 참고 사항

- **권한 검사 없음**: 기기가 오프라인이거나 토큰이 만료되어도 정리를 위해 이 API를 성공적으로 호출할 수 있습니다
- **deviceId 매칭**: `deviceId`는 [등록](/ko/push/device-subscription/subscribe-device) 시 사용한 값과 정확히 일치해야 하며, 그렇지 않으면 레코드를 매칭할 수 없습니다
- **type 매칭**: `type`도 동일하게 일치해야 합니다(예: Android 등록 시 `fcm`을 사용했다면 해제 시에도 `fcm` 사용)
- **멱등성**: 반복 호출해도 오류가 발생하지 않지만, 이후 호출에서는 `result.n`이 `0`으로 반환됩니다
