# 민감 단어 설정 조회

## 개요

현재 시스템의 민감 단어 검열 구성을 가져옵니다. 이 API는 [시스템 설정 조회](/ko/config/get-config)와 동일한 엔드포인트인 `GET /config`를 사용하며, 이 페이지에서는 민감 단어와 관련된 설정 항목에 초점을 맞춥니다.

------

## API 엔드포인트

### 민감 단어 구성 조회

민감 단어 목록을 포함한 현재의 런타임 구성을 가져옵니다.

```http
GET /config
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | 클라이언트 키 |
| `IM-Authorization` | string | ✅    | 클라이언트 토큰 |

#### 요청 예시

```http
GET /config HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/config`,
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
curl -X "GET" "https://your-app.imkit.io/config" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 런타임 구성 데이터 |

**구성 객체 구조**

| 매개변수 | 타입 | 설명 |
| -------------- | ------ | ----------------------------- |
| `announcement` | object | 공지사항 구성 |
| `censorship`   | object | 콘텐츠 검열 구성 |

**검열 구성 객체 구조**

| 매개변수 | 타입 | 설명 |
| ---------- | ----- | ------------------- |
| `keywords` | array | 민감 단어 배열 |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "blahblah...",
      "pin": true
    },
    "censorship": {
      "keywords": [
        "foo",
        "bar"
      ]
    }
  }
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

**403 Forbidden** - 권한 부족

```json
{
  "RC": 403,
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only authorized users can view runtime config"
  }
}
```

------

## 사용 시나리오

### 구성 검토
- **구성 확인**: 현재 시스템에 설정된 민감 단어 목록을 검토합니다.
- **규칙 이해**: 시스템의 현재 콘텐츠 필터링 규칙을 파악합니다.
- **설정 검증**: 민감 단어 구성이 올바르게 반영되었는지 확인합니다.

### 시스템 모니터링
- **구성 모니터링**: 민감 단어 구성 상태를 정기적으로 확인합니다.
- **이상 탐지**: 구성이 비정상적이거나 유실되었는지 모니터링합니다.
- **규정 준수 확인**: 구성이 법적 요구 사항을 충족하는지 확인합니다.

### 관리 및 유지보수
- **백업 준비**: 수정 전에 현재 구성을 백업합니다.
- **문제 진단**: 콘텐츠 필터링 관련 문제를 조사합니다.
- **버전 제어**: 구성 변경 이력을 추적합니다.

------

## 주의 사항

- **인증 요구**: 구성을 보려면 유효한 클라이언트 인증이 필요합니다.
- **런타임 구성**: 파일 구성이 아닌 현재 활성화된 런타임 구성을 표시합니다.
- **전체 구성**: 응답에는 민감 단어뿐만 아니라 모든 런타임 구성 항목이 포함됩니다.
- **실시간 상태**: 시스템의 현재 실시간 구성 상태를 보여줍니다.
- **민감 정보**: 구성 내용에 민감한 정보가 포함될 수 있으므로 안전하게 관리하십시오.
- **캐싱 메커니즘**: 구성에 캐시가 적용되어 있을 수 있으므로 변경 후 캐시가 업데이트될 때까지 기다려야 할 수 있습니다.
