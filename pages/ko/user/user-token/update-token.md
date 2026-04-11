# 토큰 업데이트

## 개요

지정된 사용자의 액세스 토큰 및 유효 기간을 업데이트합니다. 토큰 로테이션, 유효 기간 연장 또는 인증 자격 증명 변경 등의 시나리오에 적합합니다.

------

## API 엔드포인트

### 사용자 토큰 업데이트

지정된 사용자의 액세스 토큰 및 만료 시간을 업데이트합니다.

```http
PUT /admin/clients/{client_id}/token
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 귀하의 API 키 |
| `Content-Type` | string | ✅ | `application/json` |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `client_id` | string | ✅ | 사용자 고유 식별자 |

#### Request Body

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ---- | ---- | ---- |
| `token` | string | ✅ | 새로운 액세스 토큰 |
| `expirationDate` | string | ✅ | 토큰 만료 시간 (ISO 8601 형식) |

#### 요청 예시

**JavaScript 예시:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    token: "new-token-001",
    expirationDate: "2026-01-01T00:00:00Z",
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
curl -X "PUT" "https://your-app.imkit.io/admin/clients/{client_id}/token" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d $'{
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z"
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
| `token` | string | 업데이트된 액세스 토큰 |
| `expirationDate` | string | 업데이트된 토큰 만료 시간 |
| `updatedAt` | string | 토큰 업데이트 시간 (ISO 8601 형식) |

#### 응답 예시

```json
{
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z",
  "updatedAt": "2025-08-10T10:30:00Z"
}
```

#### 오류 응답

**400 Bad Request** — 요청 매개변수 오류

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid expirationDate format"
}
```

**401 Unauthorized** — API 키 유효하지 않음

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** — 사용자가 존재하지 않음

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user002' not found"
}
```

**409 Conflict** — 토큰 충돌

```json
{
  "error": "TOKEN_CONFLICT",
  "message": "Token already exists for another client"
}
```

------

## 사용 시나리오

### 토큰 수명 주기 관리
- **정기 로테이션**: 보안 강화를 위해 정기적으로 토큰을 업데이트합니다.
- **유효 기간 연장**: 곧 만료될 토큰의 유효 기간을 연장합니다.
- **긴급 업데이트**: 보안 사고 발생 시 긴급하게 토큰을 교체합니다.

### 시스템 유지보수
- **일괄 업데이트**: 시스템 업그레이드 시 사용자의 토큰을 일괄적으로 업데이트합니다.
- **형식 마이그레이션**: 이전 형식의 토큰에서 새로운 형식으로 마이그레이션합니다.

------

## 주의 사항

- **즉시 반영**: 토큰 업데이트 후 즉시 효과가 발생하며, 이전 토큰은 무효화됩니다.
- **고유성 확인**: 시스템은 새로운 토큰이 다른 사용자와 충돌하는지 확인합니다.
- **시간 형식**: `expirationDate`는 반드시 ISO 8601 형식을 사용해야 합니다.
- **토큰 복잡성**: 충분히 복잡한 토큰 형식을 사용하는 것이 좋습니다.
- **만료 시간 설정**: 보안과 사용 편의성의 균형을 맞추어 합리적인 만료 시간을 설정하십시오.
- **동기화 메커니즘**: 귀하의 인증 시스템과 동기화되어 업데이트되도록 하십시오.
