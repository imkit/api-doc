# 멤버 속성 업데이트

## 개요

이 엔드포인트는 역할(role), 위치, 점수, 등급 또는 임의의 사용자 정의 필드와 같이 채팅방 내 특정 멤버의 사용자 정의 속성을 업데이트할 수 있도록 합니다. 이 API는 서버 측 전용이며 적절한 인증이 필요합니다.

------

## API 엔드포인트

### 멤버 속성 업데이트

채팅방 내 특정 멤버의 사용자 정의 속성을 업데이트합니다.

```http
PUT /rooms/:id/member/:client
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 클라이언트 키 |
| `IM-Authorization` | string | ✅ | 클라이언트 토큰 |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `:id` | string | ✅ | 채팅방 고유 식별자 |
| `:client` | string | ✅ | 멤버의 클라이언트 ID |

#### Request Body

| 매개변수 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `property` | string | ✅ | 업데이트할 멤버 속성 필드 이름 |
| `value` | mixed | ✅ | 속성의 새로운 값 |

#### 요청 예시

**예시 1: 멤버를 관리자로 설정**

**cURL 예시:**

```bash
curl -X "PUT" "https://your-app.imkit.io/rooms/demo-room/member/user-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"property": "role", "value": "admin"}'
```

**JavaScript 예시:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "admin",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**예시 2: 사용자 정의 속성 업데이트**

**JavaScript 예시:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "score",
    value: 100,
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `RC` | number | 응답 코드 (0은 성공을 의미함) |
| `RM` | string | 응답 메시지 |
| `result` | object | 업데이트된 채팅방 전체 정보 |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "name": "Demo",
    "roomType": "group",
    "members": [
      {
        "_id": "user-001",
        "nickname": "User 001",
        "avatarUrl": "http://example.com/avatar.jpg",
        "isRobot": false,
        "id": "user-001",
        "lastLoginTimeMS": 1583057133276
      }
    ],
    "id": "demo-room",
    "createdTimeMS": 1525001412492
  }
}
```

#### 오류 응답

요청이 실패하면 오류 상세 정보가 포함된 응답을 받게 됩니다. 일반적인 오류 상황은 다음과 같습니다:

- 유효하지 않은 클라이언트 키 또는 인증 토큰
- 지정된 채팅방 또는 멤버가 존재하지 않음
- 서버 내부 오류

------

## 사용 시나리오

### 역할 관리
- **관리자 지정**: `property`를 `"role"`로, `value`를 `"admin"`으로 설정하여 관리자 역할을 부여합니다.

### 사용자 정의 속성
- **점수 설정**: 멤버의 채팅방 내 점수를 추적하기 위해 `property`를 `"score"`로 설정합니다.
- **등급 설정**: 멤버의 등급을 관리하기 위해 `property`를 `"level"`로 설정합니다.
- **위치 설정**: 멤버의 위치 정보를 기록하기 위해 `property`를 `"location"`으로 설정합니다.

------

## 주의 사항

- **역할 설정**: `property`가 `"role"`이고 `value`가 `"admin"`인 경우, 시스템은 채팅방 내에 `assignAdmin` 시스템 메시지를 자동으로 생성합니다.
- **사용자 정의 속성**: `role` 외에도 위치(`location`), 점수(`score`), 등급(`level`) 등 임의의 사용자 정의 속성을 설정할 수 있습니다.
- `property` 필드는 멤버 속성 객체의 필드 이름과 직접 매칭되며, `value`의 타입은 필드 정의와 일치해야 합니다.
