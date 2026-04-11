# 멤버 차단 해제

## 개요

채팅방에서 지정한 사용자의 차단을 해제하여 해당 채팅방 내 정상적인 활동 권한을 복원합니다. 채팅방 소유자만 사용자 차단 해제 권한이 있습니다 (소유자가 있는 그룹 채팅방에 한정). 차단 해제 후 사용자는 채팅방에서 상호작용을 재개하고 메시지를 전송할 수 있습니다.

------

## API Endpoint

### 채팅방에서 지정한 사용자 차단 해제

지정한 사용자를 채팅방의 차단 목록에서 제거하여 해당 채팅방 내 활동 권한을 복원합니다.

```http
DELETE /blockStatus/room/{roomID}/{blockee}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description              |
| --------- | ------ | -------- | ------------------------ |
| `roomID`  | string | ✅        | 채팅방 ID                |
| `blockee` | string | ✅        | 차단 해제할 사용자 ID    |

#### Example Request

**특정 사용자 차단 해제**

```http
DELETE /blockStatus/room/demo-room/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/blockStatus/room/${roomID}/${blockee}`,
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
curl -X "DELETE" "https://your-app.imkit.io/blockStatus/room/{roomID}/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**성공 응답 (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 의미)         |
| `RM`      | string | 응답 메시지                         |
| `result`  | object | 차단 해제 상태 정보                 |

**차단 해제 상태 오브젝트 구조**

| Parameter   | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| `appID`     | string | 애플리케이션 ID                         |
| `blockee`   | object | 차단 해제된 사용자의 상세 정보          |
| `blocker`   | string | 차단을 수행한 사용자 ID                 |
| `room`      | string | 채팅방 ID                               |
| `createdAt` | string | 원래 차단 생성 시간                     |
| `updatedAt` | string | 차단 해제 시간                          |

**차단 해제된 사용자 오브젝트 구조**

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
    "message": "Only room owner can unblock users in group chat rooms"
  }
}
```

**404 Not Found** - 차단 관계가 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists for this user in the specified room"
  }
}
```

**400 Bad Request** - 잘못된 파라미터

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## 사용 사례

### 채팅방 관리
- **차단 해제**: 채팅방 소유자가 사용자의 차단 상태를 해제
- **관리 결정**: 상황 변화에 따라 차단 정책을 조정
- **멤버 복원**: 사용자의 채팅방 내 정상적인 참여 권한을 복원

### 권한 관리
- **소유자 전용**: 채팅방 소유자만 사용자 차단을 해제할 수 있음
- **권한 복원**: 사용자의 채팅방 내 모든 활동 권한을 복원
- **관리 유연성**: 유연한 차단 관리 메커니즘을 제공

### 관계 회복
- **오판 정정**: 실수로 차단된 사용자의 차단 해제
- **행동 개선**: 사용자의 행동이 개선된 후 권한 복원
- **화해 메커니즘**: 채팅방 멤버 관계 회복을 위한 경로 제공

------

## 주의 사항

- **권한 제한**: 채팅방 소유자만 차단 해제 작업을 수행할 수 있음 (소유자가 있는 그룹 채팅방에 한정)
- **채팅방 유형**: 이 기능은 주로 지정된 소유자가 있는 그룹 채팅방을 위한 것
- **즉시 적용**: 차단 해제는 즉시 효력이 발생하며, 사용자는 바로 채팅방에서 활동을 재개할 수 있음
- **차단 범위**: 차단 해제는 지정된 채팅방에 한정되며 다른 채팅방에서의 차단 상태에는 영향을 주지 않음
- **미존재 처리**: 존재하지 않는 차단 관계를 해제하려 하면 404 오류가 반환됨
- **기록 보관**: 차단 해제 작업은 차단 기록의 타임스탬프를 업데이트함
