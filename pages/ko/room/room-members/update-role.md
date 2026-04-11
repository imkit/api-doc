# 멤버 역할 업데이트

## 개요

이 엔드포인트는 채팅방 내 특정 멤버의 역할을 업데이트할 수 있도록 합니다. 역할이 관리자로 변경되면 시스템은 채팅방 내에 해당 시스템 메시지를 자동으로 생성합니다. 이 API는 서버 측 전용이며 적절한 인증이 필요합니다.

------

## API 엔드포인트

### 멤버 역할 업데이트

채팅방 내 특정 멤버의 역할을 업데이트합니다.

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
| `property` | string | ✅ | `"role"`로 고정 입력 |
| `value` | string | ✅ | 역할 값. `"admin"` 또는 `"member"`가 가능합니다. |

**역할 설명**

| 역할 값 | 설명 |
| --- | --- |
| `"admin"` | 관리자. 채팅방 멤버를 관리할 수 있는 권한을 가집니다. |
| `"member"` | 일반 멤버 |

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

**예시 2: 관리자를 일반 멤버로 강등**

**JavaScript 예시:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "member",
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
- `value`가 유효한 역할 값이 아님
- 서버 내부 오류

------

## 사용 시나리오

### 권한 관리
- **관리자로 승격**: 멤버의 역할을 `"member"`에서 `"admin"`으로 변경하여 채팅방 멤버를 관리할 수 있는 권한을 부여합니다.
- **일반 멤버로 강등**: 관리자의 역할을 `"admin"`에서 `"member"`로 변경하여 관리 권한을 제거합니다.

------

## 주의 사항

- **시스템 메시지**: `value`가 `"admin"`으로 설정되면 시스템은 다른 멤버들에게 알리기 위해 채팅방 내에 `assignAdmin` 시스템 메시지를 자동으로 생성합니다.
- `property` 필드는 반드시 `"role"`로 고정 입력해야 합니다. 다른 멤버 속성을 업데이트하려면 [멤버 속성 업데이트](./update-member-property) API를 사용하십시오.
- 이 작업은 해당 채팅방 내에서의 멤버 역할만 변경하며, 다른 채팅방의 역할 설정에는 영향을 주지 않습니다.
