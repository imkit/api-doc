# 연결 수 조회

## Overview

시스템의 현재 WebSocket 실시간 연결 수를 조회합니다. 이 엔드포인트는 실시간 시스템 부하 모니터링, 용량 계획 및 운영 모니터링에 활용할 수 있습니다. 이 엔드포인트를 호출하려면 플랫폼 API 권한이 필요합니다.

------

## API Endpoint

### 현재 연결 수 조회

시스템의 현재 WebSocket 연결 수를 조회합니다.

```http
GET /admin/connection-count
```

#### Headers

| Parameter    | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `IM-API-KEY` | string | ✅        | 플랫폼 API Key |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/connection-count",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/connection-count" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**Success Response (200 OK)**

| Parameter      | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| `RC`           | number | 응답 코드 (0은 성공을 의미) |
| `RM`           | string | 응답 메시지                    |
| `result`       | object | 조회 결과                        |
| `result.count` | number | 현재 WebSocket 연결 수  |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 1523
  }
}
```

#### Error Response

**401 Unauthorized** - 유효하지 않은 API Key

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
  "RM": "Forbidden",
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Platform API permission required"
  }
}
```

------

## Use Cases

### 실시간 모니터링
- **연결 모니터링**: 모니터링 대시보드에서 현재 WebSocket 연결 수를 실시간으로 표시
- **이상 감지**: 연결 수 임계값을 설정하여 초과 또는 급격한 감소 시 알림 발생

### 용량 계획
- **부하 평가**: 주기적으로 연결 수를 조회하여 시스템 부하 상태를 평가
- **스케일링 결정**: 연결 수 추이를 기반으로 서버 리소스 확장 여부 결정

### 운영 보고서
- **사용 통계**: 다양한 시간대의 연결 수를 기록하여 사용 보고서 생성
- **피크 분석**: 시간대별 연결 피크를 분석하여 리소스 배분 최적화

------

## Notes

- **플랫폼 API 권한 필요**: 이 엔드포인트는 플랫폼 API 권한이 있는 `IM-API-KEY`를 사용한 인증이 필요합니다
- **실시간 데이터**: 반환되는 값은 호출 시점의 실시간 연결 수이며, 호출할 때마다 결과가 다를 수 있습니다
- **WebSocket 연결**: 카운트에는 WebSocket 영구 연결만 포함되며, 일반 HTTP 요청은 포함되지 않습니다
- **모니터링 빈도**: 과도한 호출을 피하기 위해 적절한 간격(예: 30초 또는 1분마다)으로 폴링하는 것을 권장합니다
