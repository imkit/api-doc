# 메시지 회수

## 개요

이 엔드포인트는 사용자가 채팅방에서 지정된 메시지를 회수할 수 있도록 합니다. 회수 후에는 원래 메시지 내용이 삭제되고, 메시지 타입이 `recall`로 변경되며, 채팅방의 모든 멤버는 해당 메시지가 회수되었음을 볼 수 있습니다. 클라이언트 키와 플랫폼 API 키 두 가지 인증 방식을 모두 지원합니다.

------

## API 엔드포인트

### 메시지 회수

채팅방에서 지정된 메시지를 회수합니다.

```http
POST /rooms/:roomId/message
```

#### Headers

이 API는 두 가지 인증 방식을 지원하며, 그중 하나를 선택하여 사용합니다.

**클라이언트 인증**

| 매개변수 | 타입 | 필수 | 설명 |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅   | 클라이언트 키 |
| `IM-Authorization` | string | ✅   | 클라이언트 토큰 |

**플랫폼 API 인증**

| 매개변수 | 타입 | 필수 | 설명 |
| ------------ | ------ | ---- | ---------------- |
| `IM-API-KEY` | string | ✅   | 플랫폼 API 키 |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| ---------- | ------ | ---- | ---------------- |
| `:roomId`  | string | ✅   | 채팅방 고유 식별자 |

#### Post Body

| 매개변수 | 타입 | 필수 | 설명 |
| ------------- | ------ | ---- | ------------------------------- |
| `messageType` | string | ✅   | `"recall"`로 고정 입력 |
| `_id`         | string | ✅   | 회수할 메시지의 고유 식별자 |

#### 요청 예시

**예시 1: 클라이언트 인증을 통한 메시지 회수**

**cURL 예시:**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"_id": "5ce3d80bd594874e495895a4", "messageType": "recall"}'
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
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

**예시 2: 플랫폼 API 인증을 통한 메시지 회수**

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| --------------------- | ------ | ---------------------------------- |
| `RC`                  | number | 응답 코드 (0은 성공을 의미함) |
| `RM`                  | string | 응답 메시지 |
| `result._id`          | string | 메시지 고유 식별자 |
| `result.message`      | string | 메시지 내용 (회수 후에는 빈 문자열) |
| `result.room`         | string | 소속 채팅방 ID |
| `result.sender`       | object | 회수 작업을 수행한 발신자 정보 |
| `result.messageType`  | string | 메시지 타입 (회수 후에는 `"recall"`) |
| `result.messageTimeMS`| number | 메시지 발신 타임스탬프 (밀리초) |
| `result.updatedAtMS`  | number | 최종 업데이트 타임스탬프 (밀리초) |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5ce3d80bd594874e495895a4",
    "message": "",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Nita",
      "avatarUrl": "http://loremflickr.com/240/240/style?1558435839",
      "isRobot": false,
      "id": "sss",
      "lastLoginTimeMS": 1553145898032
    },
    "messageType": "recall",
    "appID": "SampleApp",
    "id": "5ce3d80bd594874e495895a4",
    "messageTimeMS": 1558435851576,
    "updatedAtMS": 1558435921086,
    "createdAtMS": 1558435851580
  }
}
```

#### 오류 응답

요청이 실패하면 오류 상세 정보가 포함된 응답을 받게 됩니다. 일반적인 오류 상황은 다음과 같습니다:

- 유효하지 않은 인증 키 또는 토큰
- 지정된 메시지나 채팅방이 존재하지 않음
- 해당 메시지를 회수할 권한이 없음
- 서버 내부 오류

------

## 사용 시나리오

### 메시지 관리

- **잘못 보낸 메시지 수정**: 사용자가 메시지를 잘못 보냈을 때 즉시 회수할 수 있습니다.
- **민감 정보 제거**: 민감하거나 부적절한 내용이 포함된 메시지를 회수합니다.
- **백엔드 관리**: 관리자가 플랫폼 API를 통해 규정 위반 메시지를 회수합니다.

------

## 주의 사항

- **회수 효과**: 회수 후에는 메시지의 `message` 필드가 빈 문자열이 되고, `messageType`은 `"recall"`로 변경됩니다. 채팅방의 모든 멤버는 회수 상태를 확인할 수 있습니다.
- **`_id`**: 요청 본문의 `_id`는 채팅방 ID가 아니라 회수하고자 하는 **메시지**의 ID입니다.
- **두 가지 인증**: 클라이언트 인증(`IM-CLIENT-KEY` + `IM-Authorization`)은 일반 사용자 작업에 적합하며, 플랫폼 API 인증(`IM-API-KEY`)은 백엔드 관리 작업에 적합합니다.
