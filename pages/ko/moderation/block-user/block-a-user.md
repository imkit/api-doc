# 사용자 차단

## 개요

지정한 사용자를 차단하여 현재 사용자와의 1:1 채팅을 방지합니다. 차단 후 차단된 사용자는 차단한 사용자에게 개인 메시지를 전송할 수 없지만, 그룹 채팅방에서의 상호작용에는 영향을 미치지 않습니다. 이 기능은 괴롭힘 방지 및 개인 프라이버시 관리에 적합합니다.

------

## API Endpoint

### 지정한 사용자 차단

지정한 사용자를 차단 목록에 추가하여 1:1 채팅을 방지합니다.

```http
POST /blockStatus/my/{blockee}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| `blockee` | string | ✅        | 차단할 사용자 ID        |

#### Example Request

**특정 사용자 차단**

```http
POST /blockStatus/my/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**다른 사용자 차단**

```http
POST /blockStatus/my/user123 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/blockStatus/my/${blockee}`,
  {},
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
curl -X "POST" "https://your-app.imkit.io/blockStatus/my/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**성공 응답 (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 의미)         |
| `RM`      | string | 응답 메시지                         |
| `result`  | object | 차단 상태 정보                      |

**차단 상태 오브젝트 구조**

| Parameter   | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| `appID`     | string | 애플리케이션 ID                       |
| `blockee`   | object | 차단된 사용자의 상세 정보             |
| `blocker`   | string | 차단을 수행한 사용자 ID               |
| `room`      | string | 연결된 채팅방 ID                      |
| `createdAt` | string | 차단 생성 시간                        |
| `updatedAt` | string | 차단 업데이트 시간                    |

**차단된 사용자 오브젝트 구조**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | 사용자 고유 ID                          |
| `nickname`        | string | 사용자 닉네임                           |
| `avatarUrl`       | string | 사용자 아바타 URL                       |
| `lastLoginTimeMS` | number | 마지막 로그인 시간 (밀리초 타임스탬프) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "2bec603e94a210092439e83ff2d79ac1",
    "createdAt": "2021-08-04T15:18:10.735Z",
    "updatedAt": "2021-08-04T16:35:41.341Z"
  }
}
```

#### Error Response

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

**404 Not Found** - 사용자가 존재하지 않음

```json
{
  "RC": 404,
  "RM": "User not found",
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The specified user does not exist"
  }
}
```

**400 Bad Request** - 자기 자신을 차단할 수 없음

```json
{
  "RC": 400,
  "RM": "Cannot block yourself",
  "error": {
    "code": "SELF_BLOCK_FORBIDDEN",
    "message": "Users cannot block themselves"
  }
}
```

**409 Conflict** - 이미 차단된 사용자

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already in your block list"
  }
}
```

------

## 사용 사례

### 개인 프라이버시 보호
- **괴롭힘 방지**: 부적절한 사용자가 개인 메시지를 전송하는 것을 차단
- **프라이버시 관리**: 나에게 직접 연락할 수 있는 사람을 통제
- **안전 보호**: 악의적인 사용자의 지속적인 괴롭힘으로부터 보호

### 사용자 경험 개선
- **콘텐츠 필터링**: 원치 않는 메시지 콘텐츠 수신 방지
- **환경 정화**: 보다 쾌적한 채팅 환경 조성
- **업무 집중**: 불필요한 방해와 알림 감소

### 커뮤니티 관리
- **행동 기준**: 규칙을 위반하는 사용자에 대해 개인 수준의 보호 조치 시행
- **분쟁 해결**: 사용자 간의 개인적 분쟁 처리
- **자기 관리**: 사용자가 자신의 소셜 환경을 관리할 수 있도록 허용

------

## 주의 사항

- **1:1 채팅에만 적용**: 차단은 개인 채팅에만 영향을 미치며 그룹 채팅방에서의 상호작용에는 영향을 주지 않음
- **양방향 효과**: 차단이 효력을 발휘하면 양 당사자 모두 개인 메시지를 전송할 수 없음
- **자동 채팅방 연동**: 차단은 해당 1:1 채팅방과 연결됨
- **자기 차단 불가**: 사용자는 자신의 계정을 차단할 수 없음
- **중복 차단**: 이미 차단된 사용자를 다시 차단하면 충돌 오류가 반환됨
- **지속적 상태**: 차단 상태는 수동으로 해제할 때까지 유지됨
