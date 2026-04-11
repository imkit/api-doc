# 사용자별 읽지 않은 메시지 조회

## 개요

현재 사용자의 총 읽지 않은 메시지 수를 조회합니다. 이 API를 통해 사용자가 접근 가능한 모든 채팅방의 읽지 않은 메시지 총 수를 집계할 수 있으며, 채팅방 태그별 필터링도 지원합니다. 사용자의 전체 읽지 않은 상태를 표시하는 데 적합합니다.

------

## API 엔드포인트

### 사용자의 총 읽지 않은 메시지 수 조회

현재 사용자의 읽지 않은 메시지 수를 조회하며, 태그별 필터링을 선택적으로 적용할 수 있습니다.

```http
GET /me/badge
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization`    | string | ✅        | Client Token   |

#### Query Parameters

| Parameter  | Type   | Required | Description                                                       |
| ---------- | ------ | -------- | ----------------------------------------------------------------- |
| `roomTags` | string | ❌        | 채팅방 태그로 필터링 (여러 개의 roomTags 파라미터 사용 가능)        |

#### Example Request

**총 읽지 않은 메시지 수 조회**

```http
GET /me/badge HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**특정 태그의 읽지 않은 메시지 수 조회**

```http
GET /me/badge?roomTags=demo&roomTags=foo HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**업무 관련 채팅방의 읽지 않은 메시지 수 조회**

```http
GET /me/badge?roomTags=work&roomTags=project&roomTags=meeting HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/me/badge`,
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
curl -X "GET" "https://your-app.imkit.io/me/badge" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 의미)           |
| `RM`      | string | 응답 메시지                           |
| `result`  | object | 읽지 않은 메시지 통계 결과            |

**Result 객체 구조**

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| `badge`   | number | 읽지 않은 메시지 수 (조회된 모든 채팅방의 합계)                 |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "badge": 10
  }
}
```

**태그 필터링 적용 응답 예시**

```json
{
  "RC": 0,
  "RM": "OK", 
  "result": {
    "badge": 5
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

**400 Bad Request** - 잘못된 파라미터

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_ROOM_TAGS",
    "message": "Room tags must be valid strings"
  }
}
```

------

## Use Cases

### 전체 알림 표시
- **총 수 표시**: 앱 아이콘 또는 제목 표시줄에 총 읽지 않은 메시지 수를 표시
- **배지 표시**: 모바일 애플리케이션의 배지 숫자 표시에 활용
- **상태 표시**: 사용자에게 읽지 않은 메시지가 있는지 여부를 판단

### 카테고리별 통계
- **업무 메시지**: 업무 관련 채팅방의 읽지 않은 메시지 수 집계
- **개인 메시지**: 개인 또는 1:1 채팅의 읽지 않은 메시지 수 집계
- **시스템 알림**: 시스템 공지 채팅방의 읽지 않은 메시지 수 집계

### 사용자 경험 최적화
- **스마트 알림**: 읽지 않은 수에 따라 알림 빈도 조정
- **우선순위 표시**: 다른 태그의 중요도에 따라 정렬하여 표시
- **빠른 접근**: 읽지 않은 메시지가 있는 채팅방으로 빠르게 이동

------

## Notes

- **권한 제어**: 사용자가 접근 권한을 가진 채팅방만 집계됩니다
- **태그 필터링**: 여러 roomTags 파라미터를 사용하여 AND 조건으로 필터링 가능
- **실시간성**: 조회 시점의 실시간 읽지 않은 수를 반환합니다
- **성능 고려**: 빈번한 조회는 성능에 영향을 줄 수 있으니 적절히 사용하세요
- **파라미터 형식**: 여러 태그는 `roomTags=tag1&roomTags=tag2` 형식으로 사용해야 합니다
- **0 값 처리**: 읽지 않은 메시지가 없을 경우 0을 반환합니다
