# 토큰 철회

## 개요

지정된 사용자의 액세스 토큰을 철회하여 더 이상 채팅 서비스를 사용할 수 없도록 합니다. 특정 토큰을 철회하거나 해당 사용자의 모든 토큰을 제거할 수 있습니다.

------

## API 엔드포인트

### 사용자 토큰 철회

지정된 사용자의 액세스 토큰을 철회합니다.

```http
DELETE /admin/clients/{client_id}/token
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
| `token` | string | ❌ | 철회할 특정 토큰. 제공하지 않으면 해당 사용자의 모든 토큰이 제거됩니다. |

#### 요청 예시

**특정 토큰 철회:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      token: "old-token-xyz",
    },
  }
);
```

**모든 토큰 철회:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
    data: {},
  }
);
```

**cURL 예시:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/admin/clients/{client_id}/token" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d '{"token": "old-token-xyz"}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| `success` | boolean | 작업 성공 여부 |
| `message` | string | 작업 결과 메시지 |
| `revokedTokens` | number | 철회된 토큰 수 |

#### 응답 예시

**특정 토큰 철회**

```json
{
  "success": true,
  "message": "Token revoked successfully",
  "revokedTokens": 1
}
```

**모든 토큰 철회**

```json
{
  "success": true,
  "message": "All tokens revoked successfully",
  "revokedTokens": 3
}
```

#### 오류 응답

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
  "message": "Client with id 'user001' not found"
}
```

**404 Not Found** — 토큰이 존재하지 않음

```json
{
  "error": "TOKEN_NOT_FOUND",
  "message": "Specified token not found for this client"
}
```

------

## 사용 시나리오

### 보안 고려 사항
- **계정 도용**: 보안을 위해 즉시 모든 토큰을 철회합니다.
- **기기 분실**: 특정 기기의 토큰을 철회합니다.
- **직원 퇴사**: 기업 사용자의 모든 토큰을 철회합니다.

### 시스템 관리
- **강제 로그아웃**: 토큰을 철회하여 사용자가 다시 로그인하도록 강제합니다.
- **토큰 로테이션**: 보안 강화를 위해 정기적으로 이전 토큰을 철회합니다.
- **권한 변경**: 권한을 재할당하기 위해 토큰을 철회합니다.

------

## 주의 사항

- **즉시 반영**: 토큰 철회 후 즉시 효과가 발생하며, 사용자는 더 이상 채팅 기능을 사용할 수 없습니다.
- **복구 불가**: 철회된 토큰은 복구할 수 없으며, 새로운 토큰을 발급하거나 할당해야 합니다.
- **일괄 작업**: `token` 매개변수를 제공하지 않으면 사용자의 모든 토큰을 한 번에 철회할 수 있습니다.
- **특정 토큰 우선 철회**: 사용자의 다른 기기에 영향을 주지 않으려면 특정 토큰만 우선적으로 철회하십시오.
- **감사 로그**: 향후 감사를 위해 토큰 철회 작업을 기록하는 것이 좋습니다.
