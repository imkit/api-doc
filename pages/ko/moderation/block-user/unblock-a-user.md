# 사용자 차단 해제

## 개요

지정된 사용자에 대한 차단 상태를 해제하여 현재 사용자와의 직접 채팅 기능을 복구합니다. 차단 해제 후 양측은 다시 개인 메시지를 주고받을 수 있지만, 그룹 채팅방에서의 상호작용 상태에는 영향을 주지 않습니다. 이 기능은 오작동을 수정하거나 연락 관계를 다시 구축할 때 적합합니다.

------

## API 엔드포인트

### 지정된 사용자 차단 해제

지정된 사용자를 차단 목록에서 제거하고 직접 채팅 기능을 복구합니다.

```http
DELETE /blockStatus/my/{blockee}
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | 클라이언트 키 |
| `IM-Authorization` | string | ✅    | 클라이언트 토큰 |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| --------- | ------ | ---- | --------------------- |
| `blockee` | string | ✅    | 차단 해제할 사용자 ID |

#### 요청 예시

**특정 사용자 차단 해제**

```http
DELETE /blockStatus/my/ddd HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**다른 사용자 차단 해제**

```http
DELETE /blockStatus/my/user123 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/blockStatus/my/${blockee}`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/blockStatus/my/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 차단 해제 상태 정보 |

**차단 해제 상태 객체 구조**

| 매개변수 | 타입 | 설명 |
| ----------- | ------ | ----------------------------- |
| `appID`     | string | 애플리케이션 식별자 |
| `blockee`   | object | 차단 해제된 사용자의 상세 정보 |
| `blocker`   | string | 차단 해제를 수행한 사용자 ID |
| `room`      | string | 연결된 채팅방 ID |
| `createdAt` | string | 원래 차단이 생성된 시간 |
| `updatedAt` | string | 차단 해제 시간 |

**차단 해제된 사용자 객체 구조**

| 매개변수 | 타입 | 설명 |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 사용자 고유 식별자 |
| `nickname`        | string | 사용자 닉네임 |
| `avatarUrl`       | string | 사용자 아바타 URL |
| `id`              | string | 사용자 ID |
| `lastLoginTimeMS` | number | 최종 로그인 시간 (밀리초 타임스탬프) |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ddd",
      "nickname": "Dina",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
      "id": "ddd",
      "lastLoginTimeMS": 1628095079328
    },
    "blocker": "aaa",
    "room": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
    "createdAt": "2021-08-04T15:18:07.649Z",
    "updatedAt": "2021-08-04T15:18:07.649Z"
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

**404 Not Found** - 차단 관계가 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists with this user"
  }
}
```

**400 Bad Request** - 매개변수 유효하지 않음

```json
{
  "RC": 400,
  "RM": "Invalid user ID",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## 사용 시나리오

### 관계 복구
- **오작동 수정**: 실수로 차단한 사용자의 차단을 해제합니다.
- **관계 개선**: 이전에 갈등이 있었던 사용자와 다시 연락 관계를 맺습니다.
- **두 번째 기회**: 차단된 사용자에게 다시 시작할 기회를 줍니다.

### 관리 유연성
- **동적 관리**: 상황 변화에 따라 차단 상태를 조정합니다.
- **일시적 차단**: 단기 차단 후 정상 연락을 재개합니다.
- **테스트 용도**: 개발 및 테스트 단계에서 차단 기능의 유효성을 검증합니다.

### 사용자 경험 최적화
- **편리한 조작**: 간편한 차단 해제 방식을 제공합니다.
- **즉시 반영**: 차단 해제 후 즉시 채팅 기능이 복구됩니다.
- **상태 동기화**: 차단 상태가 각 플랫폼에서 동기화되어 업데이트되도록 보장합니다.

------

## 주의 사항

- **양방향 해제**: 차단 해제 후 양측 모두 다시 개인 메시지를 보낼 수 있습니다.
- **존재하지 않는 관계 처리**: 존재하지 않는 차단 관계를 해제하려고 하면 404 오류가 반환됩니다.
- **즉시 반영**: 차단 해제 작업은 즉시 반영되어 대기 시간이 필요하지 않습니다.
- **채팅방 연관**: 차단 해제는 관련 채팅방의 존재 상태에 영향을 주지 않습니다.
- **기록 보존**: 차단 해제 시 이전 채팅 기록은 삭제되지 않습니다.
- **그룹 채팅 미영향**: 차단 해제는 그룹 채팅 내의 상호작용 상태에는 영향을 주지 않습니다.
