# 민감 단어 설정 삭제

## 개요

시스템의 민감 단어 검열 구성을 삭제합니다. 런타임 구성에서 검열 설정을 제거함으로써 민감 단어 필터링 기능을 비활성화하거나 특정 구성 항목을 지울 수 있습니다. 이 기능은 구성 정리, 기능 비활성화 및 시스템 유지보수에 적합합니다.

------

## API 엔드포인트

### 구성 항목 삭제

지정된 런타임 구성 항목을 삭제합니다.

```http
DELETE /config/{key}
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 플랫폼 관리자 API 키 |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| ----- | ------ | ---- | -------------- |
| `key` | string | ✅    | 런타임 구성 키 |

#### 요청 예시

**민감 단어 구성 삭제**

```http
DELETE /config/censorship HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**공지사항 구성 삭제**

```http
DELETE /config/announcement HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**기타 구성 삭제**

```http
DELETE /config/push HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/config/censorship`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/config/censorship" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 빈 객체 |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
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

**404 Not Found** - 구성 항목이 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Config not found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## 사용 시나리오

### 기능 비활성화
- **필터링 비활성화**: 민감 단어 필터링 기능을 완전히 비활성화합니다.
- **일시적 중단**: 특정 구성 기능을 일시적으로 중단합니다.
- **테스트 환경**: 테스트 환경에서 운영 구성을 제거합니다.

### 구성 정리
- **만료된 구성**: 더 이상 사용하지 않는 구성 항목을 정리합니다.
- **재설정**: 기존 구성을 지우고 새로 설정할 준비를 합니다.
- **시스템 초기화**: 구성을 기본 상태로 재설정합니다.

### 유지보수 작업
- **긴급 처리**: 문제가 있는 구성을 긴급히 제거합니다.
- **버전 업데이트**: 시스템 업데이트 시 이전 구성을 정리합니다.
- **오류 수정**: 문제를 일으키는 구성 항목을 제거합니다.

------

## 주의 사항

- **플랫폼 관리자 전용**: 이 기능은 플랫폼 관리자만 사용할 수 있으며 API 키가 필요합니다.
- **즉시 반영**: 구성 삭제는 즉시 반영되며 관련 기능이 즉시 중단됩니다.
- **복구 불가**: 삭제 작업은 복구할 수 없으므로 미리 구성을 백업하는 것을 권장합니다.
- **기능 영향**: censorship 구성을 삭제하면 민감 단어 필터링이 완전히 비활성화됩니다.
- **런타임 구성**: 런타임 구성에만 영향을 미치며 파일 구성은 수정하지 않습니다.
- **의존성 확인**: 삭제 전에 다른 기능이 이 구성에 의존하고 있지 않은지 확인하십시오.
- **모니터링 권장**: 삭제 후 시스템 기능이 정상적으로 작동하는지 모니터링하십시오.
