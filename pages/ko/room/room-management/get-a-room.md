# 채팅방 조회

## Overview

멤버 목록, 마지막 메시지, 멤버 속성(읽지 않은 수, 읽기 위치) 등 지정된 채팅방에 대한 상세 정보를 조회합니다.

------

## API Endpoint

### 채팅방 상세 정보 조회

지정된 채팅방의 전체 정보를 조회합니다.

```http
GET /rooms/{id}
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client 토큰 |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `id` | string | ✅ | 채팅방 ID |

#### Example Request

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/${roomId}`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

##### cURL 예시

```bash
curl "https://your-app.imkit.io/rooms/project-room-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | 응답 코드 (0은 성공을 의미) |
| `RM` | string | 응답 메시지 |
| `result` | object | 채팅방 전체 정보 |

**채팅방 오브젝트 필드**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | 채팅방 고유 식별자 |
| `appID` | string | 애플리케이션 식별자 |
| `lastMessage` | object | 마지막 메시지 (발신자 정보 포함) |
| `memberProperties` | array[object] | 멤버 속성 배열 (읽지 않은 수, 읽기 위치) |
| `members` | array[object] | 멤버 상세 정보 배열 |
| `unread` | number | 현재 사용자의 읽지 않은 메시지 수 |
| `description` | string | 채팅방 설명 |
| `isSuperuser` | boolean | 현재 사용자의 슈퍼유저 여부 |

**멤버 속성 오브젝트**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `client` | string | 멤버 사용자 ID |
| `badge` | number | 읽지 않은 메시지 수 |
| `lastRead` | string | 마지막으로 읽은 메시지 ID |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "project-room-001",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": "최신 메시지 내용",
      "messageType": "text",
      "sender": {
        "_id": "user-a",
        "nickname": "Alice",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1488435140775
    },
    "memberProperties": [
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "user-a"
      },
      {
        "badge": 5,
        "client": "user-b"
      }
    ],
    "members": [
      {
        "_id": "user-a",
        "nickname": "Alice",
        "avatarUrl": "https://example.com/alice.jpg",
        "lastLoginTimeMS": 1487149355934
      },
      {
        "_id": "user-b",
        "nickname": "Bob",
        "avatarUrl": "https://example.com/bob.jpg",
        "lastLoginTimeMS": 1488438700398
      }
    ],
    "unread": 5,
    "description": "프로젝트 토론 그룹",
    "isSuperuser": false
  }
}
```

#### Error Response

**404 Not Found** — 채팅방이 존재하지 않음

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

### 채팅방 정보
- **상세 정보 표시**: 채팅방의 멤버 목록과 기본 정보 조회
- **읽음 상태**: 각 멤버의 읽지 않은 메시지 수와 읽기 위치 조회

### 관리 작업
- **멤버 확인**: 특정 사용자가 채팅방의 멤버인지 확인
- **상태 확인**: 채팅방의 마지막 활동 시간 확인

------

## Notes

- **멤버 전용**: 채팅방 멤버 또는 플랫폼 관리자만 채팅방 상세 정보를 조회할 수 있습니다
- **완전한 데이터**: 응답에는 모든 멤버의 상세 정보와 속성이 포함됩니다
- **마지막 메시지**: `lastMessage` 오브젝트에는 발신자의 전체 정보가 포함됩니다
- **읽지 않은 수 계산**: `unread` 필드는 현재 인증된 사용자의 읽지 않은 수를 나타냅니다
