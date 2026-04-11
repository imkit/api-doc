# Delete Config

## 개요

애플리케이션의 특정 시스템 구성 항목을 삭제합니다. 구성 키 이름을 지정하여 해당 설정값을 제거합니다. 이 API는 관리자 전용으로 `IM-API-KEY` 인증이 필요합니다.

------

## API Endpoint

### 지정된 구성 항목 삭제

키 이름으로 특정 시스템 구성 설정을 삭제합니다.

```http
DELETE /config/:key
```

#### Headers

| Parameter    | Type   | Required | Description             |
| ------------ | ------ | -------- | ----------------------- |
| `IM-API-KEY` | string | ✅        | 플랫폼 API Key   |

#### Path Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `key`     | string | ✅        | 삭제할 구성 키 이름   |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.delete(
  "https://your-app.imkit.io/config/announcement",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X DELETE "https://your-app.imkit.io/config/announcement" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 나타냄) |
| `RM`      | string | 응답 메시지                    |
| `result`  | object | 빈 객체                        |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

#### Error Response

**401 Unauthorized** - 잘못된 API Key

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

**404 Not Found** - 지정된 구성 키가 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## 사용 사례

### 구성 관리
- **만료된 공지 제거**: 더 이상 필요하지 않은 시스템 공지 설정을 삭제합니다
- **금칙어 목록 초기화**: 전체 금칙어 구성 항목을 삭제합니다
- **기능 플래그 비활성화**: 특정 기능 플래그 설정을 삭제하여 기본 동작으로 복원합니다

------

## 참고 사항

- **관리자 전용**: 이 엔드포인트는 `IM-API-KEY` 인증이 필요하며 서버 측 사용으로 제한됩니다
- **비가역적 작업**: 삭제 작업은 취소할 수 없으므로 진행 전 반드시 확인하세요
- **즉시 적용**: 삭제는 즉시 적용되며, 다음 `GET /config` 호출 시 클라이언트에서 삭제된 항목이 더 이상 표시되지 않습니다
- **키-값 전체 삭제**: 이 작업은 전체 키-값 쌍을 삭제합니다. 일부 내용만 제거해야 하는 경우 `POST /config`를 사용하여 업데이트하세요
