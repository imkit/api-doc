# 메시지 삭제

## 개요

관리자 전용 메시지 삭제 기능으로, 플랫폼 관리자, 채팅방 소유자 및 채팅방 관리자가 특정 메시지를 삭제하거나 채팅방의 모든 메시지를 비울 수 있습니다. 콘텐츠 관리, 위반 콘텐츠 정리, 채팅방 유지보수에 적합합니다.

------

## API 엔드포인트

### 채팅방 메시지 삭제

채팅방의 특정 메시지 또는 모든 메시지를 삭제합니다. 관리자 권한이 있는 사용자만 사용 가능합니다.

```http
DELETE /rooms/{roomID}/messages/{messageID}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| Parameter   | Type   | Required | Description                                                  |
| ----------- | ------ | ---- | --------------------------------------------------- |
| `roomID`    | string | ✅    | 채팅방 ID                                             |
| `messageID` | string | ✅    | 삭제할 메시지 ID, 또는 `_all`로 채팅방의 모든 메시지 삭제 |

#### Example Request

**특정 메시지 삭제**

```http
DELETE /rooms/test-room-123/messages/5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Connection: close
```

**채팅방의 모든 메시지 삭제**

```http
DELETE /rooms/test-room-123/messages/_all HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미) |
| `RM`     | string | 응답 메시지               |
| `result` | object | 삭제 결과                 |

**삭제 결과 객체 구조**

| Parameter      | Type   | Description                       |
| -------------- | ------ | ----------------------------- |
| `deletedCount` | number | 삭제된 메시지 수                   |
| `roomID`       | string | 채팅방 ID                          |
| `messageID`    | string | 삭제된 메시지 ID (또는 "_all")      |
| `deletedBy`    | string | 삭제를 실행한 사용자 ID             |
| `deletedAt`    | string | 삭제 시간                          |

#### Example Response

**단일 메시지 삭제**

```json
{
  "RC": 0,
  "RM": "Message deleted successfully",
  "result": {
    "deletedCount": 1,
    "roomID": "test-room-123",
    "messageID": "5f890cf37d980e06f6aaf349",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
  }
}
```

**모든 메시지 삭제**

```json
{
  "RC": 0,
  "RM": "All messages deleted successfully",
  "result": {
    "deletedCount": 145,
    "roomID": "test-room-123",
    "messageID": "_all",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
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
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSION",
    "message": "Only platform admin, room owner or room manager can delete messages"
  }
}
```

**404 Not Found** - 메시지 또는 채팅방이 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Message not found",
  "error": {
    "code": "MESSAGE_NOT_FOUND",
    "message": "The specified message does not exist in this room"
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
    "message": "The specified room does not exist"
  }
}
```

------

## Use Cases

### 콘텐츠 관리
- **위반 처리**: 커뮤니티 가이드라인을 위반한 메시지 삭제
- **스팸**: 광고 또는 스팸 콘텐츠 정리
- **민감 콘텐츠**: 민감한 정보가 포함된 메시지 제거

### 채팅방 유지보수
- **채팅방 초기화**: 모든 메시지를 삭제하여 채팅방의 대화를 새로 시작
- **테스트 정리**: 테스트 환경의 테스트 메시지 정리
- **주기적 유지보수**: 오래된 메시지 콘텐츠를 주기적으로 정리

### 관리 작업
- **긴급 처리**: 즉시 제거가 필요한 콘텐츠를 신속하게 처리
- **일괄 정리**: 채팅방의 모든 메시지를 한 번에 삭제
- **접근 제어**: 권한이 있는 사용자만 삭제 작업을 수행할 수 있도록 보장

------

## Notes

- **권한 제한**: 플랫폼 관리자, 채팅방 소유자 및 채팅방 관리자만 사용 가능
- **영구 삭제**: 삭제된 메시지는 복구할 수 없으므로 신중하게 사용하세요
- **일괄 삭제**: `_all` 파라미터를 사용하면 채팅방의 모든 메시지가 삭제됩니다
- **작업 로그**: 모든 삭제 작업은 실행자와 시간을 기록합니다
- **즉각적 효력**: 삭제 작업은 즉시 적용되며, 모든 사용자에게 메시지가 사라집니다
- **알림 메커니즘**: 삭제 작업은 관련 알림 또는 이벤트를 트리거할 수 있습니다
- **취소와의 차이**: 이 기능은 강제 삭제이며, 사용자가 직접 실행하는 메시지 취소와는 다릅니다
