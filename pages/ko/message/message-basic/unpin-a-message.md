# 메시지 고정 취소

## 개요

이 엔드포인트는 채팅방 소유자나 관리자가 현재 고정된 메시지를 고정 해제하여 채팅방 상단에서 제거할 수 있도록 합니다.

------

## API 엔드포인트

### 메시지 고정 취소

현재 고정된 메시지를 고정 해제하여 채팅방 상단에서 제거합니다.

```http
DELETE /messages/:id/pin
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
curl -X "DELETE" "https://your-app.imkit.io/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 예시:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/messages/${messageID}/pin`,
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
| `result.pinned`       | boolean | 고정 여부 (취소 후에는 `false`) |
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
    "pinned": false,
    "id": "5f890cf37d980e06f6aaf349",
    "messageTimeMS": 1602817267923,
    "updatedAtMS": 1602817300000,
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

### 메시지 관리

- **만료된 공지 제거**: 고정된 메시지가 더 이상 유효하지 않을 때 고정 해제하여 채팅방을 깔끔하게 유지합니다.
- **고정 내용 교체**: 이전 메시지의 고정을 해제한 후 새로운 중요 메시지를 고정할 수 있습니다.

------

## 주의 사항

- **권한 제한**: 채팅방 **소유자(owner)** 또는 **관리자(admin)**만 고정 취소 작업을 수행할 수 있습니다.
- 메시지를 고정하려면 [메시지 고정](./pin-a-message) API를 사용하세요.
