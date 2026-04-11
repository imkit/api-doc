# 채팅방 업데이트

## 개요

기존 채팅방의 정보와 설정을 업데이트합니다. 이 API를 통해 채팅방의 기본 정보, 권한 설정, 관리자 구성 등을 수정할 수 있습니다. 채팅방 소유자, 관리자 또는 플랫폼 관리자만 사용할 수 있습니다.

------

## API 엔드포인트

### 채팅방 정보 업데이트

지정된 채팅방의 속성과 설정을 수정합니다.

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

#### Request Body

| 매개변수 | 타입 | 필수 | 설명 |
| ------------- | ------- | ---- | --------------------------------------------------------- |
| `name`        | string  | ❌    | 채팅방 이름 |
| `cover`       | string  | ❌    | 채팅방 커버 이미지 URL |
| `description` | string  | ❌    | 채팅방 설명 |
| `roomTags`    | array   | ❌    | 공유 채팅방 태그 배열 |
| `webhook`     | string  | ❌    | Webhook 키 또는 URL |
| `botMode`     | boolean | ❌    | 채팅방 봇 활성화 여부 |
| `extParams`   | string  | ❌    | 확장 사용자 정의 매개변수, 형식: param1=value1&param2=value2&... |
| `opening`     | number  | ❌    | 개방 상태: 0=가입 또는 초대 비허용, 1=가입 및 초대 허용 |
| `owner`       | string  | ❌    | 새로운 소유자 클라이언트 ID (플랫폼 관리자 또는 채팅방 슈퍼 유저 전용) |
| `managers`    | array   | ❌    | 관리자 클라이언트 ID 배열 (플랫폼 관리자 또는 채팅방 슈퍼 유저 전용) |
| `status`      | number  | ❌    | 채팅방 상태: 0=비활성, 1=활성 |

#### 요청 예시

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "description": "Description La La",
  "name": "Martena",
  "cover": "http://loremflickr.com/240/240/style?Kelly"
}
```

**JavaScript 예시:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30`,
  {
    description: "Description La La",
    name: "Martena",
    cover: "http://loremflickr.com/240/240/style?Kelly",
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
curl -X "PUT" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"description": "Description La La", "name": "Martena", "cover": "http://loremflickr.com/240/240/style?Kelly"}'
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
| `status`        | number | 채팅방 상태 |
| `lastMessage`   | object | 마지막 메시지 정보 |
| `members`       | array  | 채팅방 멤버 목록 |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Martena",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "Description La La",
    "status": 1,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "hhhooo",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
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
  "RM": "Forbidden",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can update room"
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

### 채팅방 관리
- **기본 정보 유지보수**: 채팅방 이름, 설명, 커버 이미지를 업데이트합니다.
- **권한 관리**: 채팅방 개방 상태와 관리자 구성을 조정합니다.
- **기능 설정**: 봇 모드를 활성화하거나 비활성화합니다.

### 관리자 페이지
- **일괄 관리**: 관리 인터페이스를 통해 채팅방 설정을 대량으로 업데이트합니다.
- **콘텐츠 검토**: 부적절한 채팅방 정보를 수정합니다.
- **소유권 이전**: 채팅방 소유권을 다른 사용자에게 이전합니다.

### 시스템 통합
- **Webhook 구성**: 채팅방의 Webhook 수신 엔드포인트를 설정합니다.
- **확장 매개변수**: extParams를 통해 제3자 시스템과 통합합니다.
- **상태 관리**: 특정 채팅방을 활성화하거나 비활성화합니다.

------

## 주의 사항

- **권한 제한**: 채팅방 소유자, 관리자 또는 플랫폼 관리자만 업데이트를 수행할 수 있습니다.
- **소유권 이전**: owner 및 managers 변경에는 더 높은 권한이 필요합니다.
- **매개변수 검증**: 모든 매개변수는 선택 사항이며, 제공된 필드만 업데이트됩니다.
- **상태 영향**: status=0으로 설정하면 채팅방이 비활성 상태가 됩니다.
- **개방 설정**: opening 매개변수는 새로운 사용자의 채팅방 가입 가능 여부에 영향을 미칩니다.
