# 차단된 멤버 목록 조회

## 개요

지정한 채팅방의 차단 목록을 조회하여 해당 채팅방에서 차단된 모든 사용자의 상세 정보를 표시합니다. 채팅방 소유자만 차단 목록을 조회할 수 있는 권한이 있습니다 (소유자가 있는 그룹 채팅방에 한정). 이 기능은 채팅방 소유자가 채팅방의 차단 상태를 검토하고 관리하는 데 적합합니다.

------

## API Endpoint

### 채팅방 차단 목록 조회

지정한 채팅방에서 차단된 모든 사용자의 상세 정보를 조회합니다.

```http
GET /blockStatus/room/{roomID}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `roomID`  | string | ✅        | 채팅방 ID     |

#### Example Request

**채팅방 차단 목록 조회**

```http
GET /blockStatus/room/demo-room HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/blockStatus/room/${roomID}`,
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
curl -X "GET" "https://your-app.imkit.io/blockStatus/room/{roomID}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**성공 응답 (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 의미)         |
| `RM`      | string | 응답 메시지                         |
| `result`  | object | 차단 목록 데이터                    |

**Result 오브젝트 구조**

| Parameter | Type  | Description          |
| --------- | ----- | -------------------- |
| `data`    | array | 차단 기록 배열       |

**차단 기록 오브젝트 구조**

| Parameter   | Type   | Description                                |
| ----------- | ------ | ------------------------------------------ |
| `blockee`   | object | 차단된 사용자의 상세 정보                  |
| `blocker`   | object | 차단을 수행한 사용자의 상세 정보           |
| `room`      | object | 채팅방 상세 정보                           |
| `createdAt` | string | 차단 생성 시간                             |
| `updatedAt` | string | 차단 업데이트 시간                         |

**차단된 사용자 오브젝트 구조**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | 사용자 고유 ID                          |
| `nickname`        | string | 사용자 닉네임                           |
| `avatarUrl`       | string | 사용자 아바타 URL                       |
| `id`              | string | 사용자 ID                               |
| `lastLoginTimeMS` | number | 마지막 로그인 시간 (밀리초 타임스탬프) |

**차단을 수행한 사용자 오브젝트 구조**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | 사용자 고유 ID                          |
| `nickname`        | string | 사용자 닉네임                           |
| `avatarUrl`       | string | 사용자 아바타 URL                       |
| `id`              | string | 사용자 ID                               |
| `lastLoginTimeMS` | number | 마지막 로그인 시간 (밀리초 타임스탬프) |

**채팅방 오브젝트 구조**

| Parameter       | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| `_id`           | string | 채팅방 고유 ID                             |
| `roomType`      | string | 채팅방 유형 (group 등)                     |
| `id`            | string | 채팅방 ID                                  |
| `createdTimeMS` | number | 채팅방 생성 시간 (밀리초 타임스탬프)      |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "blockee": {
          "_id": "ccc",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
          "nickname": "Cathy",
          "id": "ccc",
          "lastLoginTimeMS": 1600006869368
        },
        "blocker": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093717",
          "nickname": "Alecia",
          "id": "aaa",
          "lastLoginTimeMS": 1583726632592
        },
        "room": {
          "_id": "demo-room",
          "roomType": "group",
          "id": "demo-room",
          "createdTimeMS": 1525001412492
        },
        "createdAt": "2021-08-04T16:08:53.057Z",
        "updatedAt": "2021-08-04T16:08:53.057Z"
      }
    ]
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
    "message": "Only room owner can view blocklist in group chat rooms"
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

## 사용 사례

### 채팅방 관리
- **차단 상태 검토**: 채팅방 소유자가 현재 차단 목록을 확인
- **멤버 관리**: 차단된 사용자의 상세 정보와 차단 기록을 조회
- **관리 결정**: 차단 목록을 기반으로 이후 관리 결정을 수행

### 권한 관리
- **소유자 전용**: 채팅방 소유자만 차단 목록을 조회할 수 있음
- **프라이버시 보호**: 승인되지 않은 사용자로부터 차단 정보를 보호
- **권한 확인**: 조회 권한이 채팅방 설정에 부합하는지 확인

### 기록 추적
- **차단 이력**: 차단 작업의 시간 기록을 조회
- **사용자 정보**: 차단된 사용자와 차단을 수행한 사용자의 상세 정보를 취득
- **채팅방 상태**: 채팅방의 차단 관리 상태를 파악

------

## 주의 사항

- **권한 제한**: 채팅방 소유자만 차단 목록을 조회할 수 있음 (소유자가 있는 그룹 채팅방에 한정)
- **채팅방 유형**: 이 기능은 주로 지정된 소유자가 있는 그룹 채팅방을 위한 것
- **완전한 정보**: 차단된 사용자, 차단을 수행한 사용자, 채팅방에 대한 완전한 정보를 반환
- **시간 기록**: 차단 생성 및 업데이트 타임스탬프를 포함
- **데이터 구조**: 배열 형식으로 반환되며 여러 차단 기록을 지원
- **빈 목록 처리**: 채팅방에서 차단된 사용자가 없는 경우 빈 배열을 반환
