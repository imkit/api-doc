# 채팅방 삭제

## Overview

지정된 채팅방과 모든 메시지를 영구적으로 삭제합니다. 삭제 후 채팅방 데이터와 메시지 기록은 데이터베이스에서 완전히 제거되며 복구할 수 없습니다.

------

## API Endpoint

### 채팅방 삭제

지정된 채팅방과 모든 메시지를 영구적으로 삭제합니다.

```http
DELETE /rooms/:id
```

#### Headers

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client 토큰 |

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `:id` | string | ✅ | 채팅방 고유 식별자 |

#### Example Request

**cURL 예시:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/rooms/test-room-123" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8'
```

**JavaScript 예시:**

```javascript
const response = await axios.delete(
  "https://your-app.imkit.io/rooms/test-room-123",
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

**Success Response (200 OK)**

| Parameter | Type | Description |
| --- | --- | --- |
| `RC` | number | 응답 코드 (0은 성공을 의미) |
| `RM` | string | 응답 메시지 |
| `result` | object | 삭제 작업 결과 |

**result 오브젝트 필드**

| Parameter | Type | Description |
| --- | --- | --- |
| `n` | number | 영향받은 도큐먼트 수 |
| `ok` | number | 작업 성공 여부 (1은 성공을 의미) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

#### Error Response

요청이 실패하면 오류 상세 정보가 포함된 오류 응답을 받게 됩니다. 일반적인 오류 시나리오는 다음과 같습니다:

- 유효하지 않은 Client Key 또는 인증 토큰
- 지정된 채팅방이 존재하지 않음
- 채팅방 삭제 권한 없음
- 내부 서버 오류

------

## Use Cases

### 채팅방 관리
- **미사용 채팅방 정리**: 더 이상 활성 상태가 아니거나 필요 없는 채팅방을 영구적으로 삭제
- **데이터 관리**: 필요한 경우 채팅방과 관련된 모든 메시지 기록을 삭제

------

## Notes

- **영구 삭제**: 이 작업은 채팅방과 모든 메시지를 데이터베이스에서 영구적으로 삭제하며 취소할 수 없습니다
- **메시지 함께 삭제**: 채팅방 내의 모든 메시지 기록도 함께 삭제됩니다
- 중요한 채팅방을 실수로 삭제하지 않도록 채팅방 ID가 올바른지 확인하세요
- 삭제 후 해당 채팅방에 있던 멤버들은 관련 데이터에 더 이상 접근할 수 없습니다
