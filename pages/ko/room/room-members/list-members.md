# 멤버 목록 조회

## 개요

지정된 채팅방의 멤버 목록을 가져옵니다. 이 API는 [채팅방 조회](/ko/room/room-management/get-a-room)와 동일한 엔드포인트인 `GET /rooms/{id}`를 사용하며, 반환되는 채팅방 데이터에는 전체 `members` 멤버 배열과 `memberProperties` 멤버 속성이 포함되어 있습니다.

------

## API 엔드포인트

### 채팅방 상세 정보 조회 (멤버 목록 포함)

모든 멤버의 상세 정보를 포함하여 지정된 채팅방의 전체 정보를 조회합니다.

```http
GET /rooms/{id}
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

#### 요청 예시

```http
GET /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Host: your-app.imkit.io
Connection: close
User-Agent: Paw/3.0.14 (Macintosh; OS X/10.11.6) GCDHTTPRequest
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30`,
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
curl -X "GET" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 채팅방 상세 정보 |

**채팅방 상세 정보 객체 구조**

| 매개변수 | 타입 | 설명 |
| ------------------- | ------ | ----------------------------- |
| `_id`               | string | 채팅방 고유 식별자 |
| `appID`             | string | 애플리케이션 식별자 |
| `description`       | string | 채팅방 설명 |
| `lastMessage`       | object | 마지막 메시지 정보 |
| `memberProperties`  | array  | 멤버 속성 목록 (읽지 않은 수, 마지막으로 읽은 메시지) |
| `members`           | array  | 멤버 상세 정보 목록 |
| `unread`            | number | 현재 사용자의 읽지 않은 메시지 수 |
| `isSuperuser`       | bool   | 현재 사용자가 슈퍼 유저인지 여부 |

**멤버 객체 구조**

| 매개변수 | 타입 | 설명 |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 멤버 고유 식별자 |
| `nickname`        | string | 멤버 닉네임 |
| `avatarUrl`       | string | 멤버 아바타 URL |
| `lastLoginTime`   | string | 최종 로그인 시간 (ISO 형식) |
| `lastLoginTimeMS` | number | 최종 로그인 시간 (밀리초 타임스탬프) |

**멤버 속성 객체 구조**

| 매개변수 | 타입 | 설명 |
| ---------- | ------ | ----------------------------- |
| `client`   | string | 멤버 클라이언트 ID |
| `badge`    | number | 읽지 않은 메시지 수 |
| `lastRead` | string | 마지막으로 읽은 메시지 ID |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": 1111234,
      "messageType": "text",
      "sender": {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 0,
        "id": "1485248566481"
      },
      "messageTime": "2017-03-02T06:12:20.775Z",
      "messageTimeMS": 1488435140775,
      "id": "58b7b7c4c246bc0b41afb148"
    },
    "memberProperties": [
      {
        "badge": 5,
        "lastRead": "58b7a2c5f034920a878e9a53",
        "client": "1485248560558"
      },
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "1485248566481"
      },
      {
        "badge": 61,
        "client": "1485250743313"
      }
    ],
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTime": "2017-02-15T09:02:35.934Z",
        "lastLoginTimeMS": 1487149355934,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTime": "2017-03-02T07:11:40.398Z",
        "lastLoginTimeMS": 1488438700398,
        "id": "1485248566481"
      },
      {
        "_id": "1485250743313",
        "nickname": "Test 3",
        "lastLoginTime": "2017-03-02T07:18:31.436Z",
        "lastLoginTimeMS": 1488439111436,
        "id": "1485250743313"
      }
    ],
    "unread": 5,
    "description": "Sample Description",
    "isSuperuser": true,
    "id": "58871b877390be11d5f1ab30"
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

**403 Forbidden** - 권한 부족 또는 멤버 아님

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "You are not a member of this room"
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

### 멤버 관리
- **멤버 목록**: 채팅방 내 모든 멤버의 상세 정보를 표시합니다.
- **멤버 모니터링**: 멤버의 로그인 상태와 활동성을 확인합니다.
- **권한 확인**: 현재 사용자의 채팅방 내 권한 레벨을 확인합니다.

### 채팅방 정보
- **채팅방 상태**: 채팅방의 전체 상태 정보를 가져옵니다.
- **읽지 않은 수 통계**: 개인 및 전체의 읽지 않은 메시지 통계를 확인합니다.
- **최신 메시지**: 채팅방의 마지막 메시지 정보를 가져옵니다.

### 애플리케이션 통합
- **데이터 동기화**: 채팅방 멤버 및 상태 정보를 동기화합니다.
- **UI 표시**: 채팅방 인터페이스에 필요한 전체 표시 데이터를 제공합니다.
- **분석 통계**: 채팅방 멤버의 참여도와 활동성을 분석합니다.

------

## 주의 사항

- **멤버 권한**: 채팅방 멤버만 상세 정보를 조회할 수 있습니다.
- **데이터 완전성**: 응답에는 멤버 목록과 멤버 속성의 전체 정보가 포함됩니다.
- **읽지 않은 수 계산**: `memberProperties`에 각 멤버의 읽지 않은 메시지 수가 포함됩니다.
- **권한 식별**: `isSuperuser` 필드는 현재 사용자가 관리자인지 여부를 나타냅니다.
- **시간 형식**: ISO 형식과 밀리초 타임스탬프 두 가지 시간 형식을 제공합니다.
- **데이터량**: 규모가 큰 채팅방의 경우 대량의 멤버 데이터가 반환될 수 있으므로 처리 성능에 주의하십시오.
- **실시간성**: 멤버 상태와 읽지 않은 수는 실시간성을 유지하기 위해 정기적으로 업데이트해야 할 수 있습니다.
