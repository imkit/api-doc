# 사용자의 채팅방 알림 음소거

## 개요

관리자가 지정된 사용자를 대신하여 특정 채팅방의 알림을 음소거합니다. 음소거 후 해당 사용자는 해당 채팅방의 푸시 알림을 더 이상 받지 않게 되지만, 채팅방 참여 권한에는 영향을 주지 않습니다. 이 기능은 관리자가 사용자를 대신하여 알림 기본 설정을 관리할 때 적합합니다.

------

## API 엔드포인트

### 지정된 채팅방 음소거

지정된 클라이언트에 대해 채팅방 음소거 상태를 설정합니다.

```http
POST /admin/clients/{uid}/mute/{room}
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅    | API 키 |

#### Path Parameters

| 매개변수 | 타입 | 필수 | 설명 |
| ------ | ------ | ---- | ------------ |
| `uid`  | string | ✅    | 클라이언트 ID |
| `room` | string | ✅    | 채팅방 ID |

#### 요청 예시

**특정 채팅방 음소거**

```http
POST /admin/clients/aaa/mute/demo HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: your-app.imkit.io
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/admin/clients/${uid}/mute/${room}`,
  {},
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients/{uid}/mute/{room}" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | -------------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 업데이트된 클라이언트 데이터 |

**클라이언트 데이터 객체 구조**

| 매개변수 | 타입 | 설명 |
| ----------------- | ------ | ----------------------------- |
| `mute`            | array  | 음소거된 채팅방 ID 목록 |
| `isRobot`         | bool   | 로봇 여부 |
| `_id`             | string | 클라이언트 고유 식별자 |
| `appID`           | string | 애플리케이션 식별자 |
| `description`     | string | 클라이언트 설명 |
| `avatarUrl`       | string | 아바타 URL |
| `nickname`        | string | 닉네임 |
| `email`           | string | 이메일 |
| `address`         | object | 연결 주소 정보 |
| `userAgent`       | string | 사용자 에이전트 문자열 |
| `updatedAt`       | string | 최종 업데이트 시간 |
| `lastLoginTimeMS` | number | 최종 로그인 시간 (밀리초 타임스탬프) |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "mute": ["demo"],
    "isRobot": false,
    "_id": "aaa",
    "__v": 0,
    "appID": "SampleApp",
    "description": "description la la #1541926309694",
    "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
    "nickname": "AAA",
    "email": "arielle.mckellar@coolgoose.ca",
    "address": {
      "address": "::1",
      "family": "IPv6",
      "port": 50392
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "updatedAt": "2020-10-09T15:11:17.153Z",
    "id": "aaa",
    "lastLoginTimeMS": 1583726632592
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
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

**404 Not Found** - 클라이언트가 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Client not found",
  "error": {
    "code": "CLIENT_NOT_FOUND",
    "message": "The specified client does not exist"
  }
}
```

**404 Not Found** - 채팅방이 존재하지 않음

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "The specified room does not exist"
  }
}
```

------

## 사용 시나리오

### 알림 관리
- **방해 감소**: 특정 채팅방의 알림 수신을 일시적으로 중단합니다.
- **업무 집중**: 중요한 업무 시간 동안 중요하지 않은 채팅방을 음소거합니다.
- **야간 모드**: 야간 시간대에 모든 채팅방을 자동으로 음소거합니다.

### 사용자 경험 최적화
- **개인 기본 설정**: 개인의 취향에 따라 알림 설정을 조정합니다.
- **상황 전환**: 다양한 사용 상황에 따라 알림 상태를 빠르게 조정합니다.
- **일괄 관리**: 여러 채팅방의 알림 설정을 통합 관리합니다.

### 관리 기능
- **백엔드 제어**: 관리자가 특정 사용자에 대해 채팅방 음소거를 설정할 수 있습니다.
- **사용자 지원**: 사용자의 알림 관련 문제 해결을 돕습니다.
- **시스템 유지보수**: 시스템 점검 기간 동안 알림을 일시적으로 음소거합니다.

------

## 주의 사항

- **알림에만 영향**: 음소거는 알림 푸시만 중단하며, 채팅방 내의 정상적인 상호작용에는 영향을 주지 않습니다.
- **관리자 권한**: 이 API는 관리자 권한과 API 키가 필요합니다.
- **설정 유지**: 음소거 설정은 수동으로 취소할 때까지 영구적으로 저장됩니다.
- **배열 업데이트**: 음소거할 때마다 새로운 채팅방 ID가 mute 배열에 추가됩니다.
- **조회 매개변수**: API는 limit 및 skip 매개변수를 지원하지만, 음소거 기능 자체에는 영향을 주지 않습니다.
- **즉시 반영**: 음소거 설정은 즉시 반영되어 다시 로그인할 필요가 없습니다.
