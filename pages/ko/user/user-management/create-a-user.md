# 사용자 생성

## 개요

이 엔드포인트는 시스템에서 사용자를 생성하거나 업데이트할 수 있도록 합니다. `_id`가 존재하지 않으면 새로운 사용자를 생성하고, 이미 존재하면 해당 사용자의 정보를 업데이트합니다. 이 API는 서버 측 전용이며 적절한 인증이 필요합니다.

------

## API 엔드포인트

### 사용자 생성 또는 업데이트
시스템에서 새로운 사용자를 생성하거나 기존 사용자 정보를 업데이트합니다.

```http
POST /admin/clients
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 플랫폼 API 키 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

요청 내용은 JSON 형식의 클라이언트 정보를 포함해야 합니다.

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 클라이언트 고유 식별자 |
| `nickname` | string | ❌ | 클라이언트 표시 이름 |
| `avatarUrl` | string | ❌ | 클라이언트 아바타 이미지 URL |
| `issueAccessToken` | boolean | ❌ | 새로운 액세스 토큰을 생성하려면 `true`로 설정하고, 사용자 정의 토큰을 사용하려면 `false`로 설정하거나 생략합니다. |
| `token` | string | ❌ | 클라이언트에 바인딩할 사용자 정의 토큰 (`issueAccessToken`이 `false`이거나 생략된 경우 사용) |
| `expirationDate` | string | ❌ | 토큰 만료 시간 (ISO 형식, 사용자 정의 토큰 사용 시 설정) |

#### 요청 예시

##### 옵션 1: 채팅 서버에서 토큰 발급

채팅 서버에서 사용자에게 새로운 액세스 토큰을 자동으로 생성하도록 하려면 이 옵션을 사용합니다.

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    nickname: "홍길동",
    avatarUrl: "https://example.com/avatar.jpg",
    _id: "user123",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### 옵션 2: 사용자 정의 토큰 바인딩

특정 토큰을 사용자에 바인딩하고 사용자 정의 만료 시간을 설정하려면 이 옵션을 사용합니다.

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io

{
  "nickname": "홍길동",
  "avatarUrl": "https://example.com/avatar.jpg",
  "_id": "user123",
  "token": "f7b6d364-1e96-4b1a-aa75-cce93268b101",
  "expirationDate": "2026-12-31T23:59:59.000Z"
}
```

#### Response

**성공 응답 (200 OK)**

요청이 성공하면 API는 생성된 클라이언트 정보를 반환합니다.

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `RC` | number | 응답 코드 (0은 성공을 의미함) |
| `RM` | string | 응답 메시지 |
| `result` | object | 생성된 클라이언트 정보 |

**클라이언트 객체 필드**

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `_id` | string | 사용자 고유 식별자 |
| `nickname` | string | 사용자 표시 이름 |
| `avatarUrl` | string | 사용자 아바타 이미지 URL |
| `token` | string | 액세스 토큰 (`issueAccessToken`이 true인 경우에만 나타남) |
| `expirationDate` | string | 토큰 만료 시간 (토큰 발급 시에만 나타남) |
| `lastLoginTimeMS` | number | 최종 로그인 타임스탬프 (밀리초) |
| `updatedAt` | string | 최종 업데이트 타임스탬프 (ISO 형식) |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "홍길동",
    "description": "사용자 설명",
    "avatarUrl": "https://example.com/avatar.jpg",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2020-06-11T06:15:36.761Z",
    "isRobot": false,
    "mute": [],
    "id": "user123",
    "lastLoginTimeMS": 1588744338369,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2020-06-18T06:15:36.763Z"
  }
}
```

#### 오류 응답

요청이 실패하면 오류 상세 정보가 포함된 응답을 받게 됩니다. 일반적인 오류 상황은 다음과 같습니다:

- **유효하지 않은 API 키** - 제공된 `IM-API-KEY`가 유효하지 않거나 만료되었습니다.
- **필수 매개변수 누락** - 필수적인 `_id` 매개변수가 제공되지 않았습니다.
- **유효하지 않은 토큰 형식** - 사용자 정의 토큰 형식이 올바르지 않습니다.
- **서버 내부 오류** - 서버 측에서 예기치 않은 오류가 발생했습니다.

------

## 사용 시나리오

### 사용자 등록
- **서버 발급 토큰을 사용한 사용자 생성**: 새로운 사용자가 등록할 때 `issueAccessToken: true`로 설정하여 시스템이 자동으로 액세스 토큰을 생성하도록 합니다.
- **사용자 정의 토큰을 사용한 사용자 생성**: 외부 인증 시스템과 통합해야 할 때 사용자 정의 토큰을 바인딩하고 만료 시간을 설정합니다.

------

## 주의 사항

- **고유 식별자**: 각 클라이언트는 고유한 `_id` 식별자가 필요합니다.
- **토큰 필드**: 응답의 `token` 필드는 `issueAccessToken`이 `true`로 설정된 경우에만 포함됩니다.
- **타임스탬프 형식**: 모든 타임스탬프는 UTC 형식입니다.
- **아바타 이미지**: 아바타 이미지의 파일 크기는 합리적인 범위 내로 제어해야 합니다.
- **서버 측 전용**: 이 엔드포인트는 새로운 클라이언트를 생성하는 데 사용되며 서버 측에서만 호출해야 합니다.
