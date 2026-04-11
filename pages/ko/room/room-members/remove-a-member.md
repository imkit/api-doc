# 멤버 제거

## 개요

이 엔드포인트는 하나 이상의 멤버를 지정된 채팅방에서 제거할 수 있도록 합니다. `members`에 현재 사용자의 ID를 전달하면 해당 사용자가 채팅방에서 나가는 것을 의미합니다.

------

## API 엔드포인트

### 멤버 제거

하나 이상의 멤버를 지정된 채팅방에서 제거합니다.

```http
POST /rooms/:id/delete/members
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

#### Post Body

| 매개변수 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `members` | array[string] | ✅ | 제거할 멤버 ID 배열. 현재 사용자의 ID가 포함되면 채팅방에서 나가는 것을 의미합니다. |
| `systemMessage` | boolean | ❌ | 멤버가 나가거나 제거될 때 시스템 메시지(`leaveRoom` 또는 `deleteMember`)를 자동으로 생성할지 여부 (기본값: `false`) |

#### 요청 예시

**예시 1: 특정 멤버 제거**

**cURL 예시:**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/delete/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"members": ["ccc", "bbb"], "systemMessage": true}'
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/delete/members`,
  {
    members: ["ccc", "bbb"],
    systemMessage: true,
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

**예시 2: 현재 사용자가 채팅방에서 나가기**

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/delete/members`,
  {
    members: [`${MY_CLIENT_ID}`],
    systemMessage: true,
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
    "lastMessage": {
      "_id": "58a2dc9c965d09221ea7bedb",
      "message": "sadf dsfdf",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0,
        "id": "1485248560558"
      },
      "messageTime": "2017-02-14T10:31:56.006Z",
      "messageTimeMS": 1487068316006,
      "id": "58a2dc9c965d09221ea7bedb"
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1487068306745,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 1486720993257,
        "id": "1485248566481"
      }
    ],
    "id": "demo-room"
  }
}
```

#### 오류 응답

요청이 실패하면 오류 상세 정보가 포함된 응답을 받게 됩니다. 일반적인 오류 상황은 다음과 같습니다:

- 유효하지 않은 클라이언트 키 또는 인증 토큰
- 지정된 채팅방이 존재하지 않음
- `members`에 채팅방 내에 없는 사용자 ID가 포함됨
- 서버 내부 오류

------

## 사용 시나리오

### 멤버 관리
- **멤버 제거**: 관리자가 채팅방에서 하나 이상의 멤버를 제거할 수 있습니다.
- **나가기**: 사용자가 자신의 ID를 전달하여 직접 채팅방에서 나갈 수 있습니다.

### 시스템 알림
- **자동 알림**: `systemMessage: true` 설정 시 상황에 따라 `leaveRoom` 또는 `deleteMember` 타입의 시스템 메시지가 자동으로 생성됩니다.

------

## 주의 사항

- **나가기**: `members` 배열에 현재 사용자의 ID를 포함하면 사용자가 직접 채팅방에서 나가는 것으로 처리됩니다.
- **시스템 메시지**: `systemMessage: true` 설정 시 멤버가 직접 나간 경우 시스템 메시지 타입은 `leaveRoom`이며, 강제로 제거된 경우에는 `deleteMember`가 됩니다.
- 멤버가 제거되면 더 이상 해당 채팅방의 메시지 기록에 접근할 수 없습니다.
