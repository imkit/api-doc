# 메시지 목록 조회

## 개요

지정된 채팅방의 메시지 기록을 조회하며, 시간 범위, 페이지네이션 및 다양한 정렬 방법을 지원합니다. 이 API는 [채팅방별 메시지 조회](/ko/message/message-basic/get-message-by-a-room)와 동일한 엔드포인트 `GET /rooms/{id}/messages/v3`를 사용합니다. 이 페이지에서는 전체 파라미터 설명과 고급 조회 예시를 제공합니다.

------

## API 엔드포인트

### 채팅방 메시지 목록 조회 (V3)

지정된 채팅방의 메시지 기록을 업데이트 시간 기준으로 조회합니다.

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

| Parameter        | Type   | Required | Description                                                              |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------ |
| `beforeMessage`  | string | ❌        | 지정된 메시지 ID 이전 메시지 조회                                          |
| `afterMessage`   | string | ❌        | 지정된 메시지 ID 이후 메시지 조회                                          |
| `limit`          | number | ❌        | 응답에 포함할 최대 메시지 수, 기본값 20                                    |
| `afterTime`      | string | ❌        | 지정된 시간 이후 메시지 조회 (ISO-8601 형식 또는 밀리초 타임스탬프)        |
| `timeRangeField` | string | ❌        | 시간 범위 조회에 사용할 시간 필드 (updatedAt/createdAt/messageTime), 기본값 updatedAt |

#### Example Request

**기본 조회**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=10&afterTime=2020-10-15T03:50:04Z HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

**페이지네이션 조회**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=20&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**시간 범위 조회**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?afterTime=1602817267000&timeRangeField=messageTime&limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/messages/v3`,
  {
    params: {
      limit: 10,
      afterTime: "2020-10-15T03:50:04Z",
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
curl -X "GET" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/messages/v3?limit=10&afterTime=2020-10-15T03:50:04Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter         | Type   | Description                         |
| ----------------- | ------ | ----------------------------------- |
| `RC`              | number | 응답 코드 (0은 성공을 의미)           |
| `RM`              | string | 응답 메시지                           |
| `result`          | object | 조회 결과                             |

**조회 결과 객체 구조**

| Parameter         | Type   | Description                                                   |
| ----------------- | ------ | ------------------------------------------------------------- |
| `totalCount`      | number | 채팅방의 총 메시지 수                                          |
| `data`            | array  | 조건에 맞는 메시지 배열                                        |
| `userDeletedIDs`  | array  | 현재 사용자가 삭제한 메시지 ID 배열 (UI에서 해당 메시지를 숨겨야 함) |
| `inspect`         | object | 진단 정보                                                      |

**메시지 객체 구조**

| Parameter        | Type   | Description                              |
| ---------------- | ------ | ---------------------------------------- |
| `_id`            | string | 메시지 고유 ID                            |
| `message`        | any    | 메시지 내용                               |
| `room`           | string | 연결된 채팅방 ID                          |
| `sender`         | object | 발신자 정보                               |
| `messageType`    | string | 메시지 유형                               |
| `messageTimeMS`  | number | 메시지 전송 시간 (밀리초 타임스탬프)       |
| `updatedAtMS`    | number | 메시지 업데이트 시간 (밀리초 타임스탬프)   |
| `createdAtMS`    | number | 메시지 생성 시간 (밀리초 타임스탬프)       |
| `reactions`      | array  | 메시지 반응 배열                          |
| `reactionCount`  | number | 총 반응 수                                |
| `isDeleted`      | bool   | 메시지 삭제 여부                          |

**발신자 객체 구조**

| Parameter         | Type   | Description                                 |
| ----------------- | ------ | ------------------------------------------- |
| `_id`             | string | 사용자 고유 ID                               |
| `nickname`        | string | 사용자 닉네임                                |
| `description`     | string | 사용자 설명                                  |
| `avatarUrl`       | string | 사용자 아바타 URL                            |
| `lastLoginTimeMS` | number | 마지막 로그인 시간 (밀리초 타임스탬프)        |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 515,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "messageTime": {
          "$gt": "2020-10-15T03:50:04.000Z"
        }
      },
      "tookMS": 5
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Helloこんにちは SIKTMLNP 11:01:07",
        "room": "demo-room",
        "sender": {
          "_id": "sss",
          "nickname": "Elsa",
          "description": "description la la #1583637224106",
          "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
          "id": "sss",
          "lastLoginTimeMS": 1588744338369
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1602817267923,
        "updatedAtMS": 1602817267925,
        "createdAtMS": 1602817267925,
        "reactionCount": 0,
        "isDeleted": true
      }
    ],
    "userDeletedIDs": [
      "5f890cf37d980e06f6aaf349"
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

**403 Forbidden** - 권한 부족 또는 채팅방이 존재하지 않음

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "Client is not in the room or room does not exist"
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

### 메시지 탐색
- **채팅 기록**: 채팅방의 이전 메시지를 표시
- **메시지 검색**: 시간 범위로 특정 메시지를 찾기
- **페이지네이션 로딩**: 메시지 목록의 페이지네이션 구현

### 동기화 및 백업
- **메시지 동기화**: 최신 메시지 업데이트를 동기화
- **오프라인 백업**: 채팅방 메시지 데이터를 백업
- **데이터 분석**: 채팅방 활동 및 상호작용을 분석

### 애플리케이션 통합
- **메시지 내보내기**: 채팅 기록을 다른 시스템으로 내보내기
- **콘텐츠 모더레이션**: 채팅방 콘텐츠를 검토하고 관리
- **통계 분석**: 메시지 수와 사용자 활동을 계산

------

## Notes

- **정렬 방식**: V3 버전은 updatedAt 시간 정렬을 사용하며, 메시지 ID 정렬보다 정확합니다
- **시간 형식**: ISO-8601 형식 또는 밀리초 타임스탬프를 지원합니다
- **페이지네이션 조회**: beforeMessage 또는 afterMessage를 사용하여 페이지네이션을 구현하세요
- **사용자 권한**: 채팅방 멤버만 메시지를 조회할 수 있습니다
- **삭제된 메시지**: userDeletedIDs에 포함된 메시지는 UI에서 숨겨야 합니다
- **진단 정보**: inspect 객체는 조회 성능 및 조건에 대한 진단 정보를 제공합니다
- **기본 limit**: limit이 지정되지 않으면 기본적으로 20개의 메시지를 반환합니다
