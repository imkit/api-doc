# 채팅방별 메시지 조회

## 개요

지정된 채팅방의 메시지 기록을 조회하며, 시간 범위 필터링 및 페이지네이션을 지원합니다. 이 API는 [메시지 목록 조회](/ko/message/message-basic/list-messages)와 동일한 엔드포인트 `GET /rooms/{id}/messages/v3`를 사용합니다. 이 페이지는 일반적인 조회 시나리오와 예시에 초점을 맞춥니다.

------

## API 엔드포인트

### 채팅방의 모든 메시지 조회

지정된 채팅방의 메시지 기록을 조회하며, 페이지네이션 및 시간 필터링을 지원합니다.

```http
GET /rooms/{id}/messages/v3
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `id`      | string | ✅        | 채팅방 ID     |

#### Query Parameters

| Parameter          | Type   | Required | Description                                                         |
| ------------------ | ------ | -------- | ------------------------------------------------------------------- |
| `limit`            | number | ❌        | 반환할 최대 메시지 수 (기본값: 20, 권장: 50-100)                      |
| `beforeMessage`    | string | ❌        | 지정된 메시지 ID 이전 메시지 조회 (이전 페이지 이동)                  |
| `afterMessage`     | string | ❌        | 지정된 메시지 ID 이후 메시지 조회 (다음 페이지 이동)                  |
| `afterTime`        | string | ❌        | 지정된 시간 이후 메시지 조회 (ISO-8601 또는 밀리초 타임스탬프 형식)   |
| `timeRangeField`   | string | ❌        | 시간 범위 조회에 사용할 필드: updatedAt, createdAt, messageTime (기본값: updatedAt) |

#### Example Request

**채팅방의 최신 메시지 조회**

```http
GET /rooms/demo-room/messages/v3?limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**이전 메시지 조회 (페이지네이션)**

```http
GET /rooms/demo-room/messages/v3?limit=50&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**특정 시간 이후 메시지 조회**

```http
GET /rooms/demo-room/messages/v3?afterTime=2024-01-01T00:00:00Z&limit=100 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/demo-room/messages/v3`,
  {
    params: {
      limit: 50,
    },
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "GET" "https://your-app.imkit.io/rooms/demo-room/messages/v3?limit=50" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 의미)           |
| `RM`      | string | 응답 메시지                           |
| `result`  | object | 메시지 조회 결과                      |

**조회 결과 구조**

| Parameter          | Type   | Description                                        |
| ------------------ | ------ | -------------------------------------------------- |
| `totalCount`       | number | 채팅방의 총 메시지 수                               |
| `data`             | array  | 메시지 배열 (시간순 정렬)                           |
| `userDeletedIDs`   | array  | 현재 사용자가 삭제한 메시지 ID 배열                 |
| `inspect`          | object | 진단 정보 (조회 조건 및 실행 시간 포함)             |

**메시지 객체 구조**

| Parameter        | Type    | Description                              |
| ---------------- | ------- | ---------------------------------------- |
| `_id`            | string  | 메시지 고유 ID                            |
| `message`        | any     | 메시지 내용                               |
| `room`           | string  | 연결된 채팅방 ID                          |
| `sender`         | object  | 발신자 정보                               |
| `messageType`    | string  | 메시지 유형                               |
| `messageTimeMS`  | number  | 메시지 전송 시간 (밀리초 타임스탬프)       |
| `updatedAtMS`    | number  | 메시지 업데이트 시간 (밀리초 타임스탬프)   |
| `createdAtMS`    | number  | 메시지 생성 시간 (밀리초 타임스탬프)       |
| `reactions`      | array   | 메시지 반응 목록                          |
| `reactionCount`  | number  | 총 반응 수                                |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 245,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "status": { "$ne": 0 }
      },
      "tookMS": 8
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Hello everyone! Welcome to our chat room.",
        "room": "demo-room",
        "sender": {
          "_id": "user123",
          "nickname": "Alice",
          "avatarUrl": "https://example.com/avatar1.jpg",
          "id": "user123",
          "lastLoginTimeMS": 1640995200000
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1640995200000,
        "updatedAtMS": 1640995200001,
        "createdAtMS": 1640995200001,
        "reactionCount": 0
      }
    ],
    "userDeletedIDs": []
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

**403 Forbidden** - 권한 부족

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "User is not a member of this room"
  }
}
```

**404 Not Found** - 채팅방이 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room with specified ID does not exist"
  }
}
```

------

## Use Cases

### 채팅방 로딩
- **초기 로드**: 사용자가 채팅방 진입 시 최신 메시지를 로드
- **기록 탐색**: 사용자가 스크롤을 올려 이전 메시지 기록을 열람
- **새로 고침**: 채팅방의 전체 대화 내용을 다시 로드

### 메시지 동기화
- **오프라인 동기화**: 사용자가 다시 온라인이 될 때 놓친 메시지를 동기화
- **기기 간 동기화**: 여러 기기에서 메시지 일관성을 유지
- **백업 복구**: 백업으로부터 채팅방의 전체 기록을 복원

### 콘텐츠 분석
- **대화 분석**: 채팅방의 대화 패턴 및 인기 주제 분석
- **활동 통계**: 채팅방의 메시지 양과 사용자 참여도 추적
- **콘텐츠 모더레이션**: 채팅방의 모든 대화 내용을 검토

------

## Notes

- **권한 필요**: 채팅방 멤버만 메시지 내용을 조회할 수 있습니다
- **페이지네이션 권장**: 한 번에 너무 많은 데이터를 로드하지 않도록 적절한 limit 값 (20-100)을 사용하세요
- **시간 정렬**: 메시지는 updatedAt 시간 기준으로 정렬되며, 최신 메시지가 먼저 표시됩니다
- **삭제 처리**: userDeletedIDs 배열에는 현재 사용자가 삭제한 메시지가 포함되므로 UI에서 필터링해야 합니다
- **성능 최적화**: 대형 채팅방의 경우 시간 범위 제한을 사용하여 조회 성능을 향상시키는 것이 권장됩니다
- **실시간 업데이트**: 이 API는 일괄 로딩에 적합하며, 실시간 메시지는 WebSocket 연결을 사용하세요
