# 시스템 설정 업데이트

## 개요

애플리케이션의 시스템 구성 설정을 업데이트합니다. 이 엔드포인트를 통해 공지사항, 검열 어휘, 기능 플래그 등 임의의 키-값 쌍을 설정할 수 있습니다. 이 API는 관리자 전용이며, `IM-API-KEY`를 사용하여 인증해야 합니다.

------

## API 엔드포인트

### 시스템 설정 업데이트

시스템 구성의 키-값 쌍을 추가하거나 업데이트합니다.

```http
POST /config
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| -------------- | ------ | ---- | ------------------------------- |
| `IM-API-KEY`   | string | ✅    | 플랫폼 API 키 |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

요청 내용은 임의의 JSON 키-값 쌍이며, 시스템 구성으로 저장됩니다.

| 매개변수 | 타입 | 필수 | 설명 |
| ------ | ------ | ---- | ---------------------------------- |
| (임의의 키) | any | ❌    | 임의의 키-값 쌍으로, 시스템 구성 설정으로 저장됩니다. |

#### 요청 예시

**JavaScript (axios) - 공지사항 설정**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    announcement: {
      text: "시스템 정기 점검이 2026/04/15 02:00에 진행될 예정입니다. 예상 소요 시간은 2시간입니다.",
      pin: true
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**JavaScript (axios) - 검열 어휘 설정**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    censorship: {
      keywords: ["광고", "스팸", "사기"]
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL - 여러 구성 설정**

```bash
curl -X POST "https://your-app.imkit.io/config" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "announcement": {
      "text": "IMKit에 오신 것을 환영합니다!",
      "pin": true
    },
    "censorship": {
      "keywords": ["광고", "스팸"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | ---------------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 업데이트된 시스템 구성 설정 |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "IMKit에 오신 것을 환영합니다!",
      "pin": true
    },
    "censorship": {
      "keywords": ["광고", "스팸"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }
}
```

#### 오류 응답

**401 Unauthorized** - 유효하지 않은 API 키

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

**400 Bad Request** - 요청 형식 오류

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "INVALID_BODY",
    "message": "Request body must be a valid JSON object"
  }
}
```

------

## 사용 시나리오

### 공지사항 관리
- **시스템 공지 설정**: 시스템 공지 메시지를 게시하거나 업데이트하며, 상단 고정 여부를 설정할 수 있습니다.
- **이벤트 공지**: 한정 기간 이벤트, 프로모션 등의 정보를 게시합니다.

### 콘텐츠 검열 설정
- **검열 어휘 설정**: 메시지 콘텐츠 필터링을 위한 민감한 단어 목록을 추가하거나 업데이트합니다.
- **검열 규칙 조정**: 콘텐츠 검열 규칙을 동적으로 조정합니다.

### 기능 플래그 관리
- **기능 스위치**: 특정 기능을 동적으로 활성화하거나 비활성화합니다.
- **매개변수 조정**: 파일 크기 제한, 메시지 길이 제한 등 시스템 매개변수를 업데이트합니다.

------

## 주의 사항

- **관리자 전용**: 이 엔드포인트는 `IM-API-KEY` 인증이 필요하며, 서버 측에서만 호출할 수 있습니다.
- **덮어쓰기 동작**: 동일한 키 이름의 설정 값은 덮어쓰기 방식으로 업데이트됩니다.
- **임의의 키-값 쌍**: 요청 본문(body)은 임의의 JSON 구조를 지원하며, 시스템은 키 이름이나 값의 형식에 제한을 두지 않습니다.
- **즉시 반영**: 업데이트된 설정은 즉시 반영되며, 클라이언트가 다음번에 `GET /config`를 호출할 때 최신 설정을 가져올 수 있습니다.
