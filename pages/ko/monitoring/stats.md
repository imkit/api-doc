# 통계 보고서

## Overview

사용자 목록, 채팅방 수, 메시지 수, 연결 피크, 시스템 메모리 정보 등 애플리케이션 통계 보고서 데이터를 조회합니다. 기본적으로 최근 1시간(3600초)의 데이터를 샘플링합니다. 사용량 분석, 용량 모니터링 및 운영 보고에 적합합니다.

------

## API Endpoint

### 통계 보고서 조회

지정된 시간 범위 내의 애플리케이션 통계 데이터를 조회합니다.

```http
GET /admin/stats
```

#### Headers

| Parameter    | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `IM-API-KEY` | string | ✅        | 플랫폼 API Key |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/stats",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/stats" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**Success Response (200 OK)**

| Parameter                    | Type   | Description                                          |
| ---------------------------- | ------ | ---------------------------------------------------- |
| `RC`                         | number | 응답 코드 (0은 성공을 의미)                  |
| `RM`                         | string | 응답 메시지                                     |
| `result`                     | object | 통계 결과                                    |
| `result.clientKey`           | string | Client Key (민감한 정보이므로 로그에 기록하지 않을 것) |
| `result.apiKey`              | string | API Key (민감한 정보이므로 로그에 기록하지 않을 것)  |
| `result.startTime`           | string | 통계 시작 시간 (ISO 형식)                   |
| `result.endTime`             | string | 통계 종료 시간 (ISO 형식)                   |
| `result.start`               | number | 통계 시작 시간 (Unix 타임스탬프, 초 단위)      |
| `result.end`                 | number | 통계 종료 시간 (Unix 타임스탬프, 초 단위)      |
| `result.userList`            | array  | 해당 기간 활성 사용자 목록               |
| `result.roomCount`           | number | 해당 기간 활성 채팅방 수               |
| `result.totalRoomCount`      | number | 전체 채팅방 수                          |
| `result.messageCount`        | number | 해당 기간 총 메시지 수               |
| `result.peakConnectionCount` | number | 해당 기간 WebSocket 연결 피크          |
| `result.totalMem`            | number | 시스템 전체 메모리 (바이트)                          |
| `result.freeMem`             | number | 시스템 사용 가능 메모리 (바이트)                      |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "clientKey": "ck_abcdef1234567890",
    "apiKey": "ak_abcdef1234567890",
    "startTime": "2026-04-11T09:00:00.000Z",
    "endTime": "2026-04-11T10:00:00.000Z",
    "start": 1744362000,
    "end": 1744365600,
    "userList": ["user001", "user002", "user003", "user004", "user005"],
    "roomCount": 12,
    "totalRoomCount": 358,
    "messageCount": 2467,
    "peakConnectionCount": 1893,
    "totalMem": 8589934592,
    "freeMem": 3221225472
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

### 사용량 분석
- **활성 사용자 통계**: `userList`를 사용하여 해당 기간의 활성 사용자 파악
- **메시지 양 분석**: `messageCount`를 추적하여 메시지 전송 추이 파악
- **채팅방 활동도**: `roomCount`(활성)와 `totalRoomCount`(전체)의 비율 비교

### 용량 모니터링
- **연결 피크 추적**: `peakConnectionCount`를 사용하여 연결 피크를 파악하고 서버 확장 계획 수립
- **메모리 모니터링**: `totalMem`과 `freeMem`을 통해 시스템 메모리 사용량 모니터링
- **성능 기준선**: 성능 기준선을 수립하여 비정상적인 부하 감지

### 운영 보고서
- **시간별 보고서**: 주기적으로 통계 데이터를 조회하여 운영 보고서 생성
- **추이 분석**: 장기적인 추이 분석을 위해 과거 데이터 축적

------

## Notes

- **샘플링 간격**: 기본적으로 최근 1시간(3600초)의 데이터를 샘플링합니다
- **플랫폼 API 권한 필요**: 이 엔드포인트는 `IM-API-KEY`를 사용한 인증이 필요합니다
- **메모리 데이터**: `totalMem`과 `freeMem`은 서버 호스트의 메모리 정보를 나타내며, 단위는 바이트입니다
- **활성 사용자**: `userList`에는 샘플링 간격 동안 활성 상태였던 사용자만 포함되며, 모든 등록된 사용자가 포함되지는 않습니다
- **데이터 적시성**: 통계 데이터는 조회 시점의 스냅샷이며, 약간의 지연이 있을 수 있습니다
