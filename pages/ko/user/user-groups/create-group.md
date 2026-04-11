# 사용자 그룹 생성

## 개요

사용자 그룹을 생성합니다. 사용자 그룹은 팀이나 조직 단위를 나타내는 가상 사용자입니다. 그룹 ID를 채팅방의 멤버 또는 초대 대상자 목록에 추가하면, 그룹 내 모든 멤버가 해당 채팅방에서 메시지를 송수신할 수 있습니다.

> **중요**: 사용자 그룹은 그룹 채팅방과는 다른 개념입니다. 사용자 그룹은 단일 사용자로 채팅방에 추가할 수 있는 가상 사용자 신원이며, 그룹 내 모든 멤버가 해당 채팅방에 대한 접근권을 공유합니다.

------

## API 엔드포인트

### 사용자 그룹 생성

시스템에 새 사용자 그룹을 생성합니다.

```http
POST /admin/groups
```

#### Headers

| Parameter           | Type   | Required | Description                            |
| -------------- | ------ | ---- | ------------------------------- |
| `IM-API-KEY`   | string | ✅    | 플랫폼 API 키              |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

#### Request Body

| Parameter        | Type   | Required | Description                               |
| ----------- | ------ | ---- | ---------------------------------- |
| `_id`       | string | ❌    | 그룹 고유 식별자 (제공하지 않으면 시스템이 자동 생성) |
| `nickname`  | string | ✅    | 그룹 표시 이름                       |
| `avatarUrl` | string | ❌    | 그룹 아바타 이미지 URL                   |
| `members`   | array  | ❌    | 그룹 멤버의 Client ID 배열          |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/groups",
  {
    _id: "group_customer_service",
    nickname: "고객 서비스 팀",
    avatarUrl: "https://example.com/team-avatar.png",
    members: ["agent001", "agent002", "agent003"]
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X POST "https://your-app.imkit.io/admin/groups" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "_id": "group_customer_service",
    "nickname": "고객 서비스 팀",
    "avatarUrl": "https://example.com/team-avatar.png",
    "members": ["agent001", "agent002", "agent003"]
  }'
```

#### Response

**Success Response (200 OK)**

| Parameter              | Type   | Description                         |
| ----------------- | ------ | ---------------------------- |
| `RC`              | number | 응답 코드 (0은 성공을 나타냄)       |
| `RM`              | string | 응답 메시지                     |
| `result`          | object | 생성된 그룹 정보               |
| `result._id`      | string | 그룹 고유 식별자               |
| `result.nickname` | string | 그룹 표시 이름                 |
| `result.avatarUrl`| string | 그룹 아바타 이미지 URL             |
| `result.members`  | array  | 그룹 멤버의 Client ID 배열    |
| `result.createdAt`| string | 생성 시각 (ISO 형식)         |
| `result.updatedAt`| string | 마지막 업데이트 시각 (ISO 형식)     |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "group_customer_service",
    "nickname": "고객 서비스 팀",
    "avatarUrl": "https://example.com/team-avatar.png",
    "members": ["agent001", "agent002", "agent003"],
    "createdAt": "2026-04-11T08:30:00.000Z",
    "updatedAt": "2026-04-11T08:30:00.000Z"
  }
}
```

#### Error Response

**401 Unauthorized** - API 키가 유효하지 않음

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

**400 Bad Request** - 필수 파라미터 누락

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "nickname is required"
  }
}
```

**409 Conflict** - 그룹 ID가 이미 존재함

```json
{
  "RC": 409,
  "RM": "Conflict",
  "error": {
    "code": "GROUP_ALREADY_EXISTS",
    "message": "A group with this ID already exists"
  }
}
```

------

## 사용 사례

### 팀 관리
- **고객 서비스 팀**: 고객 서비스 그룹을 생성하고, 그룹을 고객 서비스 채팅방에 추가하면 팀 멤버가 교대로 고객 메시지를 처리할 수 있음
- **부서 그룹**: 각 부서별로 그룹을 생성하여 부서 단위로 채팅방 권한을 편리하게 관리

### 조직 구조
- **프로젝트 팀**: 프로젝트별 그룹을 생성하면 모든 프로젝트 멤버가 관련 채팅방에 자동으로 접근 가능
- **부서 간 협업**: 부서 횡단 그룹을 생성하여 다중 사용자 채팅방의 멤버 관리를 단순화

------

## 주의사항

- **사용자 그룹 vs 그룹 채팅방**: 사용자 그룹은 실제 사용자 집합을 나타내는 가상 사용자이며, 그룹 채팅방과는 완전히 다른 개념입니다
- **채팅방에 추가**: 그룹 생성 후, 그룹 멤버가 채팅방에 접근하려면 그룹 ID를 채팅방의 멤버 또는 초대 대상자 목록에 추가해야 합니다
- **공유 접근**: 그룹 내 모든 멤버는 그룹 신원으로 참가한 채팅방에 대한 접근권을 공유합니다
- **멤버 ID 유효성**: `members` 배열의 Client ID는 시스템에 이미 존재하는 사용자여야 합니다
- **서버 전용**: 이 엔드포인트는 `IM-API-KEY` 인증이 필요하며 서버 사이드 전용입니다
