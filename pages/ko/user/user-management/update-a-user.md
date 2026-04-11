# 사용자 업데이트

## 개요

이 엔드포인트는 시스템 내 기존 사용자 정보를 업데이트할 수 있도록 합니다. 이 API는 서버 측 전용이며 적절한 인증이 필요합니다.

------

## API 엔드포인트

### 사용자 업데이트
시스템 내 기존 클라이언트 정보를 업데이트합니다.

```http
POST /admin/clients
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 플랫폼 API 키 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

요청 내용은 JSON 형식의 클라이언트 업데이트 정보를 포함해야 합니다.

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 업데이트할 클라이언트 고유 식별자 |
| `nickname` | string | ❌ | 클라이언트 표시 이름 |
| `avatarUrl` | string | ❌ | 클라이언트 아바타 이미지 URL |
| `issueAccessToken` | boolean | ❌ | 액세스 토큰을 재발급하려면 `true`로 설정하고, 사용자 정의 토큰을 사용하려면 `false`로 설정하거나 생략합니다. |
| `token` | string | ❌ | 바인딩할 새로운 토큰 (`issueAccessToken`이 `false`이거나 생략된 경우 사용) |
| `expirationDate` | string | ❌ | 토큰 만료 시간 (ISO 형식, 사용자 정의 토큰 사용 시 설정) |

#### 요청 예시

##### 옵션 1: 액세스 토큰 재발급

기존 사용자에게 새로운 액세스 토큰을 다시 생성하려면 이 옵션을 사용합니다.

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user123",
    nickname: "이영희", // 표시 이름 업데이트
    avatarUrl: "https://example.com/new-avatar.jpg", // 아바타 업데이트
    issueAccessToken: true, // 토큰 재발급
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### 옵션 2: 지정된 토큰 바인딩

기존 클라이언트에 새로운 사용자 정의 토큰을 바인딩하려면 이 옵션을 사용합니다.

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io

{
  "_id": "user123",
  "nickname": "이영희",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "token": "a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
  "expirationDate": "2025-12-31T23:59:59.999Z"
}
```

##### 옵션 3: 기본 정보만 업데이트

클라이언트의 기본 정보(예: 닉네임, 아바타)만 업데이트해야 하는 경우 토큰 관련 매개변수를 모두 생략할 수 있습니다.

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user123",
    nickname: "이영희",
    avatarUrl: "https://example.com/new-avatar.jpg"
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

**성공 응답 (200 OK)**

요청이 성공하면 API는 업데이트된 클라이언트 정보를 반환합니다.

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `RC` | number | 응답 코드 (0은 성공을 의미함) |
| `RM` | string | 응답 메시지 |
| `result` | object | 업데이트된 클라이언트 정보 |

**클라이언트 객체 필드**

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `_id` | string | 사용자 고유 식별자 |
| `nickname` | string | 업데이트된 사용자 표시 이름 |
| `avatarUrl` | string | 업데이트된 사용자 아바타 이미지 URL |
| `token` | string | 액세스 토큰 (토큰을 재발급하거나 새로운 토큰을 바인딩한 경우에만 나타남) |
| `expirationDate` | string | 토큰 만료 시간 (토큰 관련 작업이 있을 때만 나타남) |
| `updatedAt` | string | 최종 업데이트 타임스탬프 (ISO 형식) |
| `lastLoginTimeMS` | number | 최종 로그인 타임스탬프 (밀리초) |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "이영희",
    "description": "사용자 설명",
    "avatarUrl": "https://example.com/new-avatar.jpg",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2025-08-08T10:30:45.123Z",
    "isRobot": false,
    "mute": [],
    "id": "user123",
    "lastLoginTimeMS": 1588744338369,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2025-12-31T23:59:59.999Z"
  }
}
```

#### 오류 응답

요청이 실패하면 오류 상세 정보가 포함된 응답을 받게 됩니다. 일반적인 오류 상황은 다음과 같습니다:

- **유효하지 않은 API 키** - 제공된 `IM-API-KEY`가 유효하지 않거나 만료되었습니다.
- **클라이언트가 존재하지 않음** - 지정된 `_id`에 해당하는 클라이언트를 찾을 수 없습니다.
- **유효하지 않은 토큰 형식** - 사용자 정의 토큰 형식이 올바르지 않습니다.
- **매개변수 형식 오류** - 제공된 매개변수 형식이 요구 사항을 충족하지 않습니다.
- **서버 내부 오류** - 서버 측에서 예기치 않은 오류가 발생했습니다.

------

## 사용 시나리오

### 사용자 정보 유지보수
- **표시 이름 및 아바타 업데이트**: 사용자가 개인 정보를 수정할 때 `nickname` 및 `avatarUrl`과 같은 기본 정보만 업데이트합니다.
- **액세스 토큰 재발급**: 사용자의 토큰이 곧 만료되거나 갱신이 필요한 경우 `issueAccessToken: true`로 설정하여 다시 생성합니다.

### 토큰 관리
- **사용자 정의 토큰 바인딩**: 외부 인증 시스템과 통합할 때 사용자 정의 토큰을 기존 클라이언트에 바인딩합니다.
- **토큰 로테이션**: 보안을 강화하기 위해 사용자의 토큰을 정기적으로 교체합니다.

------

## 주의 사항

- **사용자가 반드시 존재해야 함**: 이 페이지는 기존 사용자를 업데이트하는 시나리오를 위한 것입니다. 생성과 업데이트를 동시에 지원해야 하는 경우 [사용자 생성](/ko/user/user-management/create-a-user)을 참조하십시오.
- **부분 업데이트**: 제공된 필드만 업데이트되며, 제공되지 않은 필드는 원래 값을 유지합니다.
- **토큰 무효화**: 토큰을 재발급하면 이전 토큰은 무효화됩니다.
- **토큰 교체**: 새로운 토큰을 바인딩하면 기존 토큰이 교체됩니다.
- **타임스탬프 형식**: 모든 타임스탬프는 UTC 형식입니다.
- **아바타 이미지**: 아바타 이미지의 파일 크기는 합리적인 범위 내로 제어해야 합니다.
- **서버 측 전용**: 이 엔드포인트는 기존 클라이언트 정보를 업데이트하기 위한 전용입니다.
