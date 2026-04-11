# 토큰 할당

## 개요

사용자가 직접 토큰을 생성하고 검증하며, 이를 IMKIT 채팅 서버에 할당하여 사용합니다. IMKIT은 메시지 처리만 담당하게 되며, 이 모드는 이미 기존 인증 시스템이 있고 토큰 수명 주기를 완전히 제어하려는 애플리케이션에 적합합니다.

구현 프로세스:
1. 귀하의 시스템에서 사용자 정의 토큰 생성
2. `/admin/clients` API를 사용하여 클라이언트를 생성하고, 귀하가 제공하는 토큰과 `expirationDate`를 전달합니다.
3. 이후 「토큰 업데이트」 API를 통해 업데이트하거나 「토큰 철회」 API를 통해 철회할 수 있습니다.
4. 귀하의 시스템이 토큰 검증 로직을 담당합니다.

------

## API 엔드포인트

### 사용자 생성 및 외부 토큰 할당

새 사용자를 생성하고 귀하의 시스템에서 생성된 액세스 토큰을 할당합니다.

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
| `issueAccessToken` | boolean | ✅ | 이 권한 부여 모드를 활성화하려면 `false`로 설정하십시오. |
| `token` | string | ✅ | 귀하의 시스템에서 생성된 사용자 정의 토큰 |
| `expirationDate` | string | ✅ | 토큰 만료 시간 (ISO 8601 형식) |

#### 요청 예시

**JavaScript 예시:**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user002",
    nickname: "John",
    avatarUrl: "https://example.com/avatar.jpg",
    issueAccessToken: false,
    token: "my-custom-token-xyz",
    expirationDate: "2025-06-30T12:00:00Z",
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
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "my-custom-token-xyz",
  "expirationDate": "2025-06-30T12:00:00Z"
}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `_id` | string | 사용자 고유 식별자 |
| `nickname` | string | 사용자 표시 이름 |
| `avatarUrl` | string | 사용자 아바타 URL |
| `issueAccessToken` | boolean | 토큰 발급 모드 (false는 외부 토큰 사용을 의미함) |
| `token` | string | 귀하가 제공한 사용자 정의 토큰 |
| `expirationDate` | string | 토큰 만료 시간 (ISO 8601 형식) |

#### 응답 예시

```json
{
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "my-custom-token-xyz",
  "expirationDate": "2025-06-30T12:00:00Z"
}
```

#### 오류 응답

**400 Bad Request** — 요청 매개변수 오류

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: token"
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
  "message": "User with _id 'user002' already exists"
}
```

------

## 사용 시나리오

### 외부 신원 통합
- **SSO 통합**: 외부 인증 시스템의 토큰을 IMKIT 사용자에 바인딩합니다.
- **사용자 정의 만료 시간**: 비즈니스 요구에 따라 토큰의 유효 기간을 설정합니다.

### 토큰 관리
- **토큰 로테이션**: 보안을 보장하기 위해 사용자의 액세스 토큰을 정기적으로 업데이트합니다.
- **다중 시스템 동기화**: 다른 시스템에서 발급된 토큰을 IMKIT으로 동기화합니다.

------

## 주의 사항

- **토큰 검증 책임**: 귀하의 시스템이 토큰의 유효성을 검증할 책임이 있습니다.
- **만료 시간 관리**: `expirationDate`가 귀하의 시스템 내 토큰 만료 시간과 일치하는지 확인하십시오.
- **토큰 형식**: IMKIT은 토큰 형식을 제한하지 않지만 JWT 또는 이와 유사한 표준 형식을 권장합니다.
- **보안**: 토큰이 충분한 엔트로피와 적절한 서명 메커니즘을 갖추도록 하십시오.
- **업데이트 빈도**: 서비스 중단을 피하기 위해 토큰이 만료되기 전에 능동적으로 업데이트하는 것이 좋습니다.
- **통합 인증**: 자동 업데이트 메커니즘을 구현하기 위해 IMKIT 토큰을 기존 인증 시스템과 통합하는 것이 좋습니다.
- **토큰 사용**: 토큰을 획득한 후 후속 API 호출 시 `IM-Authorization` 헤더를 통해 전달하십시오.
