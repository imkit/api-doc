# 시스템 설정 조회

## 개요

애플리케이션의 런타임 구성을 가져옵니다. 이 엔드포인트는 시스템에 설정된 모든 구성 키-값 쌍을 반환하며, 공지사항, 금칙어, 기능 플래그 등이 포함됩니다. 클라이언트는 `IM-CLIENT-KEY`와 `IM-Authorization`을 사용하여 인증 후 구성을 읽을 수 있습니다.

------

## API Endpoint

### 구성 가져오기

현재 모든 시스템 구성 설정을 가져옵니다.

```http
GET /config
```

#### Headers

| Parameter          | Type   | Required | Description            |
| ------------------ | ------ | -------- | ---------------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key        |
| `IM-Authorization` | string | ✅        | 사용자 인증 Token |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/config",
  {
    headers: {
      "IM-CLIENT-KEY": process.env.IM_CLIENT_KEY,
      "IM-Authorization": "Bearer user_access_token"
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/config" \
  -H "IM-CLIENT-KEY: your_client_key" \
  -H "IM-Authorization: Bearer user_access_token"
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 나타냄)                         |
| `RM`      | string | 응답 메시지                                            |
| `result`  | object | 시스템 구성 키-값 쌍, 내용은 설정에 따라 다름 |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "IMKit 실시간 통신 서비스를 이용해 주셔서 감사합니다!",
      "pin": true
    },
    "censorship": {
      "keywords": ["광고", "스팸"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true,
      "maxFileSize": 10485760
    }
  }
}
```

#### Error Response

**401 Unauthorized** - 인증 확인 실패

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_AUTH",
    "message": "Invalid or missing authorization"
  }
}
```

------

## 사용 사례

### 기능 플래그
- **동적 기능 전환**: 클라이언트 시작 시 기능 플래그를 읽어 특정 기능을 동적으로 활성화하거나 비활성화합니다
- **단계적 출시**: 구성을 통해 새 기능의 점진적 배포를 제어합니다

### 공지 메시지
- **시스템 공지**: 고정된 공지 내용을 읽어 클라이언트 인터페이스에 표시합니다
- **점검 공지**: 예정된 점검 정보를 가져와 사용자에게 사전 알림합니다

### 콘텐츠 필터링
- **금칙어**: 클라이언트 측 메시지 필터링을 위한 금칙어 목록을 가져옵니다
- **콘텐츠 정책**: 클라이언트가 가이드라인을 준수하도록 콘텐츠 정책 설정을 읽습니다

------

## 참고 사항

- **클라이언트에서 읽기 가능**: 이 엔드포인트는 `IM-CLIENT-KEY`와 `IM-Authorization`을 사용하여 인증하므로, 클라이언트 애플리케이션에서 직접 호출할 수 있습니다
- **읽기 전용 작업**: 이 엔드포인트는 읽기 기능만 제공합니다. 설정 업데이트는 `POST /config`를 사용하세요 (`IM-API-KEY` 필요)
- **동적 콘텐츠**: 반환되는 구성 내용은 관리자가 `POST /config`를 통해 설정한 항목에 따라 달라지며, 애플리케이션마다 설정이 다를 수 있습니다
- **캐싱 권장**: 클라이언트가 구성 데이터를 적절히 캐싱하여 이 API를 자주 호출하지 않도록 권장합니다
