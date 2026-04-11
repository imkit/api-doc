# 채팅방 생성

## Overview

시스템에 새로운 채팅방을 생성하고 필요에 따라 멤버를 동시에 지정할 수 있습니다. 이 API는 채팅방을 생성하지만 호출자를 자동으로 멤버로 추가하지 않으므로, 백엔드 서비스에 의한 채팅방 관리에 적합합니다.

------

## API Endpoint

### 채팅방 생성

시스템에 새로운 채팅방을 생성합니다.

```http
POST /rooms/
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 플랫폼 API Key |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `_id` | string | ❌ | 커스텀 채팅방 ID; 미지정 시 자동 생성 |
| `name` | string | ❌ | 채팅방 이름 |
| `cover` | string | ❌ | 채팅방 커버 이미지 URL |
| `roomType` | string | ❌ | 채팅방 유형: `"direct"` (1:1) 또는 `"group"` (그룹) |
| `members` | array[string] | ❌ | 멤버 Client ID 배열 |
| `description` | string | ❌ | 채팅방 설명; 일반 텍스트 또는 직렬화된 JSON 데이터 |
| `roomTags` | array[string] | ❌ | 검색 및 분류를 위한 채팅방 태그 배열 |
| `webhook` | string | ❌ | Webhook 키 또는 URL |
| `botMode` | boolean | ❌ | 채팅방 봇 활성화 여부 |
| `extParams` | string | ❌ | `param1=value1&param2=value2` 형식의 확장 커스텀 파라미터 |
| `systemMessage` | boolean | ❌ | 시스템 메시지 자동 생성 여부 (예: 멤버 참여 메시지) |
| `owner` | string | ❌ | 채팅방 소유자 ID |

#### Example Request

##### 1:1 채팅방 생성

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/rooms/",
  {
    roomType: "direct",
    members: ["user-a", "user-b"],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### 그룹 채팅방 생성

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/rooms/",
  {
    _id: "project-room-001",
    name: "프로젝트 토론 그룹",
    cover: "https://example.com/cover.jpg",
    roomType: "group",
    roomTags: ["project", "team-a"],
    members: ["user-a", "user-b", "user-c"],
    systemMessage: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### cURL 예시

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "name": "프로젝트 토론 그룹",
  "roomType": "group",
  "roomTags": ["project", "team-a"],
  "members": ["user-a", "user-b", "user-c"]
}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | 응답 코드 (0은 성공을 의미) |
| `RM` | string | 응답 메시지 |
| `result` | object | 생성된 채팅방 정보 |

**채팅방 오브젝트 필드**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `_id` | string | 채팅방 고유 식별자 |
| `name` | string | 채팅방 이름 |
| `cover` | string | 채팅방 커버 이미지 URL |
| `roomType` | string | 채팅방 유형 (`"direct"` 또는 `"group"`) |
| `members` | array[string] | 멤버 ID 배열 |
| `roomTags` | array[string] | 채팅방 태그 배열 |
| `appID` | string | 애플리케이션 식별자 |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "project-room-001",
    "appID": "SampleApp",
    "name": "프로젝트 토론 그룹",
    "cover": "https://example.com/cover.jpg",
    "roomType": "group",
    "roomTags": ["project", "team-a"],
    "members": ["user-a", "user-b", "user-c"]
  }
}
```

#### Error Response

요청이 실패하면 오류 상세 정보가 포함된 응답을 받게 됩니다. 일반적인 오류 시나리오는 다음과 같습니다:

- **유효하지 않은 API Key** — 제공된 `IM-API-KEY`가 유효하지 않거나 만료됨
- **유효하지 않은 채팅방 유형** — `roomType`이 `"direct"` 또는 `"group"`이 아님
- **멤버가 존재하지 않음** — `members`에 존재하지 않는 사용자 ID가 포함됨
- **내부 서버 오류** — 서버 측에서 예상치 못한 오류 발생

------

## Use Cases

### 사용자 매칭
- **1:1 고객 서비스 채팅**: 사용자가 지원 요청을 시작하면 백엔드가 `direct` 채팅방을 생성하고 사용자와 지원 담당자를 추가
- **주문 대화**: 주문이 접수되면 구매자와 판매자를 위한 1:1 채팅방을 자동으로 생성

### 그룹 관리
- **프로젝트 그룹**: 특정 프로젝트를 위한 그룹 채팅방을 생성하고 관련 멤버를 추가
- **이벤트 그룹**: 이벤트나 강좌를 위한 그룹을 생성하여 참가자를 일괄 관리

------

## Notes

- **자동 참여 없음**: 이 API는 채팅방을 생성하지만 호출자는 자동으로 멤버로 추가되지 않으므로, 백엔드 서비스 관리에 적합합니다
- **채팅방 ID**: `_id`를 지정하지 않으면 시스템이 자동으로 고유 식별자를 생성합니다
- **멤버 관리**: 생성 시 `members`를 통해 직접 멤버를 지정하거나, 나중에 "멤버 추가" API를 사용하여 추가할 수 있습니다
- **태그 활용**: `roomTags`는 이후 채팅방 검색 및 분류 기능에 활용할 수 있습니다
- **타임스탬프 형식**: 모든 타임스탬프는 UTC 형식이며, 밀리초 단위입니다
