# 멤버 차단

## 개요

채팅방에서 지정한 사용자를 차단하여 해당 채팅방 내 활동을 제한합니다. 이 기능을 통해 플랫폼 관리자와 채팅방 소유자는 그룹 채팅방의 멤버를 관리할 수 있습니다. 채팅방에 소유자가 있는 경우, 플랫폼 관리자와 채팅방 소유자만 이 권한을 갖습니다. 차단된 사용자는 해당 채팅방에서 메시지를 전송하거나 상호작용에 참여할 수 없습니다.

------

## API Endpoint

### 채팅방에서 지정한 사용자 차단

지정한 사용자를 채팅방의 차단 목록에 추가하여 해당 채팅방 내 활동 권한을 제한합니다.

```http
POST /blockStatus/room/{roomID}/{blockee}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| `roomID`  | string | ✅        | 채팅방 ID              |
| `blockee` | string | ✅        | 차단할 사용자 ID       |

#### Example Request

**채팅방에서 특정 사용자 차단**

```http
POST /blockStatus/room/demo-room/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/blockStatus/room/${roomID}/${blockee}`,
  {},
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
curl -X "POST" "https://your-app.imkit.io/blockStatus/room/{roomID}/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**성공 응답 (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 의미)         |
| `RM`      | string | 응답 메시지                         |
| `result`  | object | 차단 상태 정보                      |

**차단 상태 오브젝트 구조**

| Parameter   | Type   | Description                            |
| ----------- | ------ | -------------------------------------- |
| `appID`     | string | 애플리케이션 ID                        |
| `blockee`   | object | 차단된 사용자의 상세 정보              |
| `blocker`   | string | 차단을 수행한 사용자 ID                |
| `room`      | string | 채팅방 ID                              |
| `createdAt` | string | 차단 생성 시간                         |
| `updatedAt` | string | 차단 업데이트 시간                     |

**차단된 사용자 오브젝트 구조**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | 사용자 고유 ID                          |
| `nickname`        | string | 사용자 닉네임                           |
| `avatarUrl`       | string | 사용자 아바타 URL                       |
| `id`              | string | 사용자 ID                               |
| `lastLoginTimeMS` | number | 마지막 로그인 시간 (밀리초 타임스탬프) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093304",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "demo-room",
    "createdAt": "2021-08-04T16:08:53.057Z",
    "updatedAt": "2021-08-04T16:08:53.057Z"
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
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only platform admin and room owner can block users in group chat rooms"
  }
}
```

**404 Not Found** - 채팅방 또는 사용자가 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Resource not found",
  "error": {
    "code": "ROOM_OR_USER_NOT_FOUND",
    "message": "The specified room or user does not exist"
  }
}
```

**409 Conflict** - 이미 차단된 사용자

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already blocked in this room"
  }
}
```

------

## 사용 사례

### 채팅방 관리
- **멤버 통제**: 채팅방 소유자가 그룹 멤버의 참여 권한을 관리
- **위반 처리**: 채팅방에서 부적절한 콘텐츠를 전송한 사용자 처리
- **질서 유지**: 채팅방의 건전한 토론 환경 유지

### 권한 관리
- **소유자 권한**: 채팅방 소유자가 멤버를 관리
- **플랫폼 관리**: 플랫폼 관리자가 채팅방 관리 문제를 지원
- **계층적 관리**: 권한 수준이 다른 사용자는 서로 다른 관리 기능을 가짐

### 보안 보호
- **괴롭힘 방지**: 특정 사용자가 채팅방 내 다른 멤버를 괴롭히는 것을 차단
- **콘텐츠 통제**: 부적절한 콘텐츠를 전송하는 사용자 제한
- **환경 보호**: 채팅방의 건전한 토론 환경을 보호

------

## 주의 사항

- **권한 제한**: 플랫폼 관리자와 채팅방 소유자만 이 작업을 수행할 수 있음 (소유자가 있는 그룹 채팅방에 한정)
- **채팅방 유형**: 이 기능은 주로 지정된 소유자가 있는 그룹 채팅방을 위한 것
- **차단 범위**: 차단은 지정된 채팅방에 한정되며 다른 채팅방에서의 사용자 권한에는 영향을 주지 않음
- **즉시 적용**: 차단은 즉시 효력이 발생하며, 차단된 사용자는 해당 채팅방에서 활동에 참여할 수 없음
- **중복 작업**: 이미 차단된 사용자를 다시 차단하면 충돌 오류가 반환됨
- **기록 보관**: 모든 차단 작업은 운영자 및 타임스탬프 정보를 포함하여 기록됨
