# 사용자 정보 조회

## 개요

현재 로그인한 사용자의 상세 정보를 가져옵니다. 이 API를 통해 현재 인증된 사용자의 개인 프로필, 로그인 상태 및 기타 관련 정보를 얻을 수 있습니다.

------

## API 엔드포인트

### 현재 사용자 정보 조회

현재 로그인한 사용자의 전체 프로필을 가져옵니다.

```http
GET /me
```

#### Headers

| Parameter            | Type   | Required | Description           |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Example Request

```http
GET /me HTTP/1.1
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/me`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "GET" "https://your-app.imkit.io/me" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter     | Type   | Description                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 나타냄) |
| `RM`     | string | 응답 메시지               |
| `result` | object | 사용자 상세 정보           |

**사용자 객체 구조**

| Parameter                    | Type   | Description                          |
| ----------------------- | ------ | ----------------------------- |
| `_id`                   | string | 사용자 고유 식별자                |
| `email`                 | string | 사용자 이메일                  |
| `nickname`              | string | 사용자 표시 이름                  |
| `appID`                 | string | 애플리케이션 식별자                |
| `avatarUrl`             | string | 사용자 아바타 URL                  |
| `address`               | object | 마지막 접속 네트워크 주소 정보        |
| `userAgent`             | string | 마지막으로 사용한 브라우저/애플리케이션 정보 |
| `lastLoginTimeMS`       | number | 마지막 로그인 시각 (밀리초 타임스탬프)    |
| `notificationEnabled`   | boolean| 알림 활성화 여부                  |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test CCDD",
    "appID": "SampleApp",
    "__v": 0,
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 52808,
      "family": "IPv6",
      "address": "::ffff:210.242.193.226"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    "lastLoginTimeMS": 1486027236514,
    "notificationEnabled": true
  }
}
```

#### Error Response

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

**403 Forbidden** - Client Key가 유효하지 않음

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "INVALID_CLIENT_KEY",
    "message": "Invalid client key"
  }
}
```

------

## 사용 사례

### 사용자 프로필 표시
- **프로필 페이지**: 애플리케이션에서 사용자의 개인 정보 표시
- **설정 페이지**: 현재 사용자의 설정을 불러와 편집
- **권한 확인**: 사용자 신원 및 권한 검증

### 상태 확인
- **로그인 검증**: 사용자의 로그인 상태가 유효한지 확인
- **세션 관리**: 사용자의 세션이 만료되었는지 확인
- **알림 설정**: 사용자의 알림 환경설정 확인

------

## 주의사항

- **인증 필수**: 이 API는 유효한 사용자 인증이 필요합니다
- **민감 정보**: 비밀번호 등 민감한 정보는 반환되지 않습니다
- **캐시 권장**: 성능 향상을 위해 사용자 정보를 적절히 캐시할 수 있습니다
- **개인정보 보호**: 현재 인증된 사용자의 정보만 반환됩니다
