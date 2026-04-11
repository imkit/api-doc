# 채팅방 알림 음소거 해제

## 개요

이 엔드포인트는 현재 사용자가 지정된 채팅방의 음소거 설정을 취소하고, 해당 채팅방의 푸시 알림 수신을 복구할 수 있도록 합니다. 이 설정은 개인 기본 설정이며 현재 사용자에게만 영향을 미치고 다른 멤버에게는 영향을 주지 않습니다.

------

## API 엔드포인트

### 채팅방 알림 음소거 해제
지정된 채팅방의 음소거 설정을 취소하여 푸시 알림 수신을 복구합니다.

```http
DELETE /me/mute/:room
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 클라이언트 키 |
| `IM-Authorization` | string | ✅ | 클라이언트 토큰 |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `:room` | string | ✅ | 채팅방 고유 식별자 |

이 API는 요청 본문(Request Body)이 필요하지 않습니다.

#### 요청 예시

**cURL 예시:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 예시:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/me/mute/${roomID}`,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `RC` | number | 응답 코드 (0은 성공을 의미함) |
| `RM` | string | 응답 메시지 |
| `result` | object | 업데이트된 현재 사용자 정보 |
| `result._id` | string | 사용자 고유 식별자 |
| `result.nickname` | string | 사용자 표시 이름 |
| `result.email` | string | 사용자 이메일 |
| `result.mute` | array[string] | 음소거된 채팅방 ID 배열 (취소 후 제거됨) |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test AB",
    "appID": "SampleApp",
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 56216,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36",
    "mute": [],
    "lastLoginTimeMS": 1487068306745
  }
}
```

#### 오류 응답

요청이 실패하면 오류 상세 정보가 포함된 응답을 받게 됩니다. 일반적인 오류 상황은 다음과 같습니다:

- 유효하지 않은 클라이언트 키 또는 인증 토큰
- 지정된 채팅방이 존재하지 않음
- 서버 내부 오류

------

## 사용 시나리오

- **채팅방 알림 복구**: 사용자가 특정 채팅방의 푸시 알림을 다시 받고 싶을 때 음소거를 해제할 수 있습니다.
- **채팅방 음소거**: 채팅방을 음소거하려면 [채팅방 알림 음소거](./mute-room-notification) API를 사용하십시오.

------

## 주의 사항

- **개인 기본 설정**: 음소거 해제 설정은 현재 사용자에게만 영향을 미치며, 다른 멤버의 알림에는 영향을 주지 않습니다.
- **음소거 상태**: 성공적으로 처리되면 해당 채팅방 ID가 응답의 `mute` 배열에서 제거되며, 이는 사용자가 현재 음소거한 모든 채팅방을 나타냅니다.
