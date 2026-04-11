# 메시지 고정

## 개요

이 엔드포인트를 사용하면 채팅방 소유자나 관리자가 특정 메시지를 채팅방 상단에 고정하여 멤버들이 중요한 정보를 빠르게 확인할 수 있도록 할 수 있습니다. 각 채팅방에는 한 번에 하나의 메시지만 고정할 수 있습니다.

------

## API 엔드포인트

### 메시지 고정

지정된 메시지를 채팅방 상단에 고정합니다.

```http
POST /messages/:id/pin
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅   | 클라이언트 키 |
| `IM-Authorization` | string | ✅   | 클라이언트 토큰 |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| ----- | ------ | ---- | ---------------- |
| `:id` | string | ✅   | 메시지 고유 식별자 |

이 API는 요청 본문(Request Body)이 필요하지 않습니다.

#### 요청 예시

**cURL 예시:**

```bash
curl -X "POST" "https://your-app.imkit.io/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/messages/${messageID}/pin`,
  null,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| --------------------- | ------- | ---------------------------------- |
| `RC`                  | number  | 응답 코드 (0은 성공을 의미함) |
| `RM`                  | string  | 응답 메시지 |
| `result._id`          | string  | 메시지 고유 식별자 |
| `result.message`      | string  | 메시지 내용 |
| `result.room`         | string  | 소속 채팅방 ID |
| `result.sender`       | object  | 메시지 발신자 정보 |
| `result.messageType`  | string  | 메시지 타입 |
| `result.pinned`       | boolean | 고정 여부 (고정 후에는 `true`) |
| `result.messageTimeMS`| number  | 메시지 발신 타임스탬프 (밀리초) |
| `result.updatedAtMS`  | number  | 최종 업데이트 타임스탬프 (밀리초) |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5f890cf37d980e06f6aaf349",
    "message": "중요 공지: 내일 오후 2시에 회의가 있습니다.",
    "room": "demo-room",
    "sender": {
      "_id": "aaa",
      "nickname": "AAA",
      "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
      "isRobot": false,
      "id": "aaa",
      "lastLoginTimeMS": 1602817267900
    },
    "messageType": "text",
    "appID": "SampleApp",
    "pinned": true,
    "id": "5f890cf37d980e06f6aaf349",
    "messageTimeMS": 1602817267923,
    "updatedAtMS": 1602817290000,
    "createdAtMS": 1602817267925
  }
}
```

#### 오류 응답

요청이 실패하면 오류 상세 정보가 포함된 응답을 받게 됩니다. 일반적인 오류 상황은 다음과 같습니다:

- 유효하지 않은 클라이언트 키 또는 인증 토큰
- 지정된 메시지가 존재하지 않음
- 현재 사용자가 채팅방 소유자나 관리자가 아님
- 서버 내부 오류

------

## 사용 시나리오

### 중요 메시지 관리

- **공지사항 상단 고정**: 중요 공지사항을 채팅방 상단에 고정하여 모든 멤버가 볼 수 있도록 합니다.
- **빠른 확인**: 멤버들이 대화 기록을 뒤지지 않고도 핵심 정보를 찾을 수 있도록 합니다.

------

## 주의 사항

- **권한 제한**: 채팅방 **소유자(owner)** 또는 **관리자(admin)**만 고정 작업을 수행할 수 있습니다.
- 고정을 취소하려면 [메시지 고정 취소](./unpin-a-message) API를 사용하세요.
