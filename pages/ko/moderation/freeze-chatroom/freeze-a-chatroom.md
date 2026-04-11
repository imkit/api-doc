# 채팅방 동결

## 개요

채팅방 동결 기능은 채팅방 상태를 업데이트하여 채팅방 사용을 일시 중지하거나 비활성화합니다. 채팅방 상태를 비활성(status=0)으로 설정하면 채팅방이 동결되며, 사용자는 해당 채팅방에서 정상적으로 상호작용할 수 없습니다. 이 기능은 콘텐츠 관리, 규정 위반 처리 및 채팅방 유지보수에 적합합니다.

------

## API 엔드포인트

### 지정된 채팅방 동결

채팅방 상태를 업데이트하여 채팅방을 동결하고 비활성 상태로 만듭니다.

```http
PUT /rooms/{id}
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | 클라이언트 키 |
| `IM-Authorization` | string | ✅    | 클라이언트 토큰 |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅    | 채팅방 ID |

#### Post Body

| 매개변수 | 타입 | 필수 | 설명 |
| -------- | ------ | ---- | ---------------------------------- |
| `status` | number | ✅    | 채팅방 상태: 0=비활성(동결), 1=활성 |

#### 요청 예시

**채팅방 동결**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "status": 0
}
```

**채팅방 동결 해제**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "status": 1
}
```

**JavaScript 예시:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomId}`,
  {
    status: 0,
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
curl -X "PUT" "https://your-app.imkit.io/rooms/{id}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"status": 0}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 업데이트된 채팅방 데이터 |

**채팅방 객체 구조**

| 매개변수 | 타입 | 설명 |
| --------------- | ------ | ------------------------- |
| `_id`           | string | 채팅방 고유 식별자 |
| `name`          | string | 채팅방 이름 |
| `cover`         | string | 채팅방 커버 이미지 URL |
| `description`   | string | 채팅방 설명 |
| `status`        | number | 채팅방 상태 (0=동결, 1=정상) |
| `lastMessage`   | object | 마지막 메시지 정보 |
| `members`       | array  | 채팅방 멤버 목록 |

#### 응답 예시

**채팅방 동결 성공**

```json
{
  "RC": 0,
  "RM": "Room frozen successfully",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Test Room",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "This room has been frozen",
    "status": 0,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "Last message before freeze",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
      }
    ]
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
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
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
    "message": "Only room owner, manager, or platform admin can freeze room"
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

## 사용 시나리오

### 콘텐츠 관리
- **규정 위반 처리**: 커뮤니티 규정을 위반한 채팅방에 대해 일시적 동결을 진행합니다.
- **긴급 상황**: 긴급 사건 발생 시 채팅방을 빠르게 차단합니다.
- **콘텐츠 검토**: 콘텐츠 검토를 위해 채팅방을 일시적으로 동결합니다.

### 채팅방 유지보수
- **시스템 점검**: 시스템 점검 기간 동안 채팅방을 일시적으로 동결합니다.
- **기능 업데이트**: 채팅방 기능 업데이트 시 일시적으로 사용을 중지합니다.
- **데이터 마이그레이션**: 데이터 마이그레이션 진행 시 채팅방 사용을 중단합니다.

### 관리 작업
- **대량 관리**: 여러 채팅방을 일괄적으로 동결하거나 동결 해제합니다.
- **권한 제어**: 승인된 사용자만 동결 작업을 수행할 수 있도록 보장합니다.
- **상태 추적**: 채팅방의 동결 상태와 이력을 모니터링합니다.

------

## 주의 사항

- **권한 제한**: 채팅방 소유자, 관리자 또는 플랫폼 관리자만 동결 작업을 수행할 수 있습니다.
- **상태 영향**: 동결된 채팅방(status=0)은 정상적으로 사용할 수 없습니다.
- **사용자 경험**: 동결 기간 동안 사용자는 메시지를 보내거나 상호작용할 수 없습니다.
- **즉시 반영**: 상태 변경은 즉시 반영되어 모든 채팅방 멤버에게 영향을 미칩니다.
- **가역적 작업**: status=1로 설정하여 채팅방 동결을 해제할 수 있습니다.
- **데이터 보존**: 채팅방을 동결해도 이전 메시지와 멤버 데이터는 삭제되지 않습니다.
- **알림 메커니즘**: 동결 작업은 관련 알림이나 이벤트를 트리거할 수 있습니다.
