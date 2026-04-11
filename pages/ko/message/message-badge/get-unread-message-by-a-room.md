# 채팅방별 읽지 않은 메시지 조회

## 개요

채팅방 태그별로 읽지 않은 메시지 수를 집계합니다. 이 API를 통해 채팅방 태그별로 읽지 않은 메시지 수를 그룹화하여 표시할 수 있으며, 다양한 유형의 채팅방에서 읽지 않은 상태를 표시하거나, 메시지 요약을 구성하거나, 알림 관리에 활용할 수 있습니다.

------

## API 엔드포인트

### 채팅방 태그별 읽지 않은 메시지 집계

지정된 채팅방 태그를 기준으로 읽지 않은 메시지 수를 집계합니다.

```http
POST /badges/byRoomTags
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Post Body

| Parameter | Type   | Required | Description                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `tags`    | array  | ❌        | 채팅방 태그 배열 (생략 시 모든 태그를 조회)          |

#### Example Request

**특정 태그의 읽지 않은 수 조회**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": ["demo", "sample"]
}
```

**업무 관련 채팅방의 읽지 않은 수 조회**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": ["work", "project", "meeting"]
}
```

**모든 태그의 읽지 않은 수 조회**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": []
}
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/badges/byRoomTags`,
  {
    tags: ["demo", "sample"],
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "POST" "https://your-app.imkit.io/badges/byRoomTags" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"tags": ["demo", "sample"]}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 의미)           |
| `RM`      | string | 응답 메시지                           |
| `result`  | object | 통계 결과                             |

**통계 결과 구조**

| Parameter    | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| `totalBadge` | number | 조회된 모든 태그의 총 읽지 않은 메시지 수          |
| `data`       | object | 태그별 읽지 않은 메시지 수                         |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalBadge": 15,
    "data": {
      "demo": 2,
      "sample": 0,
      "work": 8,
      "project": 3,
      "meeting": 2
    }
  }
}
```

#### Error Response

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

**400 Bad Request** - 잘못된 요청 파라미터

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_TAGS",
    "message": "Tags must be an array of strings"
  }
}
```

------

## Use Cases

### 읽지 않은 상태 표시
- **태그 그룹화**: 채팅방 목록에서 태그별로 읽지 않은 수를 그룹화하여 표시
- **우선순위 표시**: 태그 우선순위에 따라 다른 알림 상태를 표시
- **시각적 알림**: 다른 색상이나 스타일을 사용하여 읽지 않은 메시지 유형을 구분

### 알림 관리
- **스마트 알림**: 채팅방 태그에 따라 다른 알림 전략 설정
- **일괄 처리**: 특정 태그의 채팅방 메시지를 일괄적으로 읽음 처리
- **필터 제어**: 사용자가 특정 태그의 채팅방에 집중할 수 있도록 허용

### 데이터 통계
- **활동 분석**: 다양한 유형의 채팅방 활동 수준 분석
- **워크플로우**: 업무 관련 채팅방의 미처리 메시지 수 집계
- **우선순위 관리**: 우선적으로 주의가 필요한 채팅방 유형 파악

------

## Notes

- **태그 권한**: 사용자가 접근 권한을 가진 채팅방만 집계됩니다
- **빈 배열 처리**: 빈 배열을 전달하면 사용 가능한 모든 태그를 조회합니다
- **실시간성**: 통계 결과는 조회 시점의 실시간 데이터를 반영합니다
- **태그 일치**: 지정된 태그 이름과 정확히 일치하는 항목만 매칭됩니다
- **성능 고려**: 많은 수의 태그를 조회하면 응답 시간에 영향을 줄 수 있습니다
- **0 값 표시**: 읽지 않은 메시지가 없는 태그는 0으로 표시됩니다
