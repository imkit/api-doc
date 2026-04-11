# 토큰 발급

## 개요

사용자 데이터는 귀하의 서버에서 생성되지만, 인증 토큰은 IMKIT 채팅 서버에서 발급 및 관리합니다. 이 모드는 빠른 통합을 원하며 토큰 수명 주기를 직접 관리할 필요가 없는 애플리케이션에 적합합니다.

구현 프로세스:
1. `/admin/clients` API를 사용하여 클라이언트를 생성하고 `issueAccessToken: true`로 설정합니다.
2. 채팅 서버에서 액세스 토큰을 발급하며, 이는 후속 API 호출에 사용할 수 있습니다.
3. 반환된 토큰을 사용하여 클라이언트 인증을 수행합니다.

------

## API 엔드포인트

### 사용자 생성 및 토큰 발급

새 사용자를 생성하고 채팅 서버에서 자동으로 액세스 토큰을 발급합니다.

```http
POST /admin/clients
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 귀하의 API 키 |
| `Content-Type` | string | ✅ | `application/json` |

#### Request Body

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 사용자 고유 식별자 |
| `nickname` | string | ❌ | 사용자 표시 이름 |
| `avatarUrl` | string | ❌ | 사용자 아바타 URL |
| `issueAccessToken` | boolean | ✅ | 이 권한 부여 모드를 활성화하려면 `true`로 설정하십시오. |

#### 요청 예시

**JavaScript 예시:**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user001",
    nickname: "Amy",
    avatarUrl: "https://example.com/avatar.jpg",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d $'{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true
}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `_id` | string | 사용자 고유 식별자 |
| `nickname` | string | 사용자 표시 이름 |
| `avatarUrl` | string | 사용자 아바타 URL |
| `issueAccessToken` | boolean | 토큰 발급 모드 |
| `token` | string | 채팅 서버에서 발급한 액세스 토큰 |
| `expirationDate` | string | 토큰 만료 시간 (ISO 8601 형식) |

#### 응답 예시

```json
{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expirationDate": "2025-06-30T12:00:00Z"
}
```

#### 오류 응답

**400 Bad Request** — 요청 매개변수 오류

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: _id"
}
```

**401 Unauthorized** — API 키 유효하지 않음

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**409 Conflict** — 사용자가 이미 존재함

```json
{
  "error": "USER_EXISTS",
  "message": "User with _id 'user001' already exists"
}
```

------

## 사용 시나리오

### 빠른 통합
- **간편한 개발**: 시스템이 토큰을 자동으로 생성하도록 하여 토큰 생성 로직을 직접 관리할 필요가 없습니다.
- **빠른 검증**: 개발 및 테스트 단계에서 유효한 액세스 토큰을 신속하게 획득하는 데 적합합니다.

### 사용자 활성화
- **새 사용자 등록**: 사용자 등록 시 IMKIT 사용자를 동시에 생성하고 토큰을 획득하여 한 번에 처리합니다.
- **자동화 프로세스**: 백엔드 서비스에서 새 사용자의 계정을 자동으로 생성하고 액세스 토큰을 가져옵니다.

------

## 주의 사항

- **토큰 유효 기간**: 채팅 서버에서 관리하며 `expirationDate` 필드를 주의 깊게 확인하십시오.
- **토큰 만료**: 만료 후에는 동일한 엔드포인트(`POST /admin/clients`에 `issueAccessToken: true` 조합)를 다시 호출하여 토큰을 재획득할 수 있으며 사용자를 삭제할 필요는 없습니다.
- **사용자 정의 불가**: 이 모드에서는 토큰 내용이나 만료 시간을 직접 설정할 수 없습니다.
- **캐싱 권장**: 중복 요청을 피하기 위해 애플리케이션에서 토큰을 캐싱하는 것이 좋습니다.
- **토큰 사용**: 토큰을 획득한 후 후속 API 호출 시 `IM-Authorization` 헤더를 통해 전달하십시오.
