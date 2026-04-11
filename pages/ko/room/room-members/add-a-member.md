# 멤버 추가

## 개요

이 엔드포인트는 하나 이상의 사용자를 지정된 채팅방에 추가할 수 있도록 합니다. 초대 확인 메커니즘을 지원하며, 시스템 메시지 알림을 자동으로 생성할지 여부를 선택할 수 있습니다.

------

## API 엔드포인트

### 멤버 추가

하나 이상의 사용자를 지정된 채팅방에 추가합니다.

```http
POST /rooms/:id/members
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
| `invitees` | array[string] | ✅ | 추가할 멤버의 클라이언트 ID 배열 |
| `systemMessage` | boolean | ❌ | 멤버 추가에 대한 시스템 메시지를 자동으로 생성할지 여부 (기본값: `false`) |
| `invitationRequired` | boolean | ❌ | 초대받은 사람이 가입하기 위해 초대를 수락해야 하는지 여부 (기본값: `false`). **그룹** 채팅방에만 적용됩니다. |

#### 요청 예시

**예시 1: 여러 멤버 초대 (초대 수락 필요)**

**cURL 예시:**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"invitees": ["ccc", "bbb"], "invitationRequired": true, "systemMessage": true}'
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: true,
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

**예시 2: 멤버 직접 추가 (초대 확인 불필요)**

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: false,
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
    "name": "Demo",
    "cover": "http://loremflickr.com/240/240/style?demo",
    "description": "public demo room",
    "roomType": "group",
    "webhook": "meet-taipei-intro",
    "botState": "CONTACT",
    "botMode": false,
    "encrypted": false,
    "serviceStatus": 0,
    "roomTags": ["demo", "foo", "bar"],
    "status": 1,
    "lastMessage": {
      "_id": "5e5b88e91da9d53097b13840",
      "room": "demo-room",
      "messageType": "addMember",
      "sender": {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "id": "aaa",
        "lastLoginTimeMS": 0
      },
      "member": {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "id": "ccc",
        "lastLoginTimeMS": 0
      },
      "message": "CCC",
      "appID": "SampleApp",
      "id": "5e5b88e91da9d53097b13840",
      "messageTimeMS": 1583057129059,
      "updatedAtMS": 1583057129059,
      "createdAtMS": 1583057129059
    },
    "members": [
      {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "isRobot": false,
        "id": "aaa",
        "lastLoginTimeMS": 1541926310026
      },
      {
        "_id": "bbb",
        "nickname": "bbb",
        "avatarUrl": "",
        "isRobot": false,
        "id": "bbb",
        "lastLoginTimeMS": 1541824600261
      },
      {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "isRobot": false,
        "id": "ccc",
        "lastLoginTimeMS": 0
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
- 지정된 채팅방이 존재하지 않음
- `invitees`에 존재하지 않는 사용자 ID가 포함됨
- 서버 내부 오류

------

## 사용 시나리오

### 가입 초대
- **여러 멤버 초대**: `invitationRequired: true` 설정을 통해 초대받은 사람이 명시적으로 초대를 수락해야 채팅방에 가입되도록 합니다.
- **직접 가입**: `invitationRequired: false` 설정을 통해 초대받은 사람이 확인 절차 없이 즉시 채팅방에 가입되도록 합니다.

### 시스템 알림
- **자동 알림**: `systemMessage: true` 설정 시 시스템이 채팅방 내에 「멤버 추가」 알림 메시지를 자동으로 생성합니다.

------

## 주의 사항

- **`invitationRequired`**: `true`로 설정하면 초대받은 사람이 초대를 수락해야 가입되며, `false`로 설정하면 즉시 가입됩니다.
- **시스템 메시지**: `systemMessage: true` 설정 시 시스템이 채팅방 내에 「멤버 추가」 알림 메시지를 자동으로 생성합니다.
- **일대일 채팅방**: `invitationRequired`는 일대일(`direct`) 채팅방에는 적용되지 않으며, 시스템에서 자동으로 `false`로 설정합니다.
- 성공적으로 추가된 후 응답에는 최신 멤버 목록을 포함한 업데이트된 채팅방 전체 정보가 포함됩니다.
