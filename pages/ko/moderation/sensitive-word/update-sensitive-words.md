# 민감 단어 설정 업데이트

## 개요

시스템의 민감 단어 검열 구성을 업데이트하거나 생성합니다. 런타임 구성 시스템을 통해 차단 단어 목록을 관리함으로써 부적절한 콘텐츠를 실시간으로 필터링하고 채팅 환경의 품질을 유지할 수 있습니다. 이 기능은 콘텐츠 검열, 민감 단어 관리 및 플랫폼 운영에 적합합니다.

------

## API 엔드포인트

### 민감 단어 구성 업데이트

민감 단어 목록 설정을 포함한 런타임 구성 변수를 생성하거나 업데이트합니다.

```http
POST /config
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅    | API 키 |

#### Post Body

| 매개변수 | 타입 | 필수 | 설명 |
| -------------- | ------ | ---- | ----------------------- |
| `censorship`   | object | ❌    | 콘텐츠 검열 구성 객체 |
| `announcement` | object | ❌    | 공지사항 구성 객체 (선택 사항) |

**검열 구성 객체 구조**

| 매개변수 | 타입 | 필수 | 설명 |
| ---------- | ----- | ---- | ----------------------- |
| `keywords` | array | ✅    | 차단할 민감 단어 배열 |

#### 요청 예시

**민감 단어 목록 설정**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
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
```

**민감 단어 목록만 업데이트**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "censorship": {
    "keywords": [
      "spam",
      "inappropriate",
      "banned_word"
    ]
  }
}
```

**기존 목록에 민감 단어 추가**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "censorship": {
    "keywords": [
      "foo",
      "bar",
      "newword1",
      "newword2"
    ]
  }
}
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/config`,
  {
    censorship: {
      keywords: ["foo", "bar"],
    },
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
curl -X "POST" "https://your-app.imkit.io/config" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d '{"censorship": {"keywords": ["foo", "bar"]}}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 업데이트된 구성 데이터 |

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
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
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
    "message": "Only platform admin can manage runtime config"
  }
}
```

**400 Bad Request** - 요청 형식 오류

```json
{
  "RC": 400,
  "RM": "Invalid request format",
  "error": {
    "code": "INVALID_CONFIG_FORMAT",
    "message": "Config format is invalid or malformed"
  }
}
```

------

## 사용 시나리오

### 민감 단어 관리
- **민감 단어 추가**: 필터링 목록에 새로운 민감 단어를 추가합니다.
- **목록 업데이트**: 기존 민감 단어 목록을 수정합니다.
- **일괄 설정**: 한 번에 여러 민감 단어를 설정합니다.

### 콘텐츠 검열
- **동적 조정**: 콘텐츠 트렌드에 따라 필터링 규칙을 실시간으로 조정합니다.
- **긴급 대응**: 필터링이 필요한 민감한 내용을 신속하게 추가합니다.
- **규칙 최적화**: 사용 상황에 따라 필터링 규칙을 최적화합니다.

### 플랫폼 운영
- **정책 집행**: 플랫폼 정책에 따라 콘텐츠 필터링 규칙을 업데이트합니다.
- **지역 적응**: 다양한 지역의 법규에 따라 민감 단어를 조정합니다.
- **규정 준수**: 법률 및 규정의 콘텐츠 검열 요구 사항을 충족합니다.

------

## 주의 사항

- **플랫폼 관리자 전용**: 이 기능은 플랫폼 관리자만 사용할 수 있으며 API 키가 필요합니다.
- **즉시 반영**: 구성 업데이트는 즉시 반영되어 모든 채팅 내용에 영향을 미칩니다.
- **구성 덮어쓰기**: POST 요청은 기존 구성을 덮어쓰므로 전체 데이터를 포함해야 합니다.
- **백업 권장**: 업데이트 전에 현재 구성을 조회하여 백업하는 것이 좋습니다.
- **키워드 형식**: 민감 단어는 문자열 배열 형태로 저장되며 대소문자를 구분합니다.
- **런타임 구성**: 런타임 구성 시스템을 사용하므로 서비스를 재시작하지 않고도 반영됩니다.
- **전체 업데이트**: 다른 설정이 유실되지 않도록 유지하려는 모든 구성 항목을 포함하는 것이 좋습니다.
