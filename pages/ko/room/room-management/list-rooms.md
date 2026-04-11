# 채팅방 목록 조회

## Overview

현재 사용자가 참여한 채팅방 목록을 페이지네이션, 정렬, 조건 필터링을 지원하여 조회합니다. 채팅방 목록 표시 및 증분 동기화 등의 시나리오에 적합합니다.

------

## API Endpoint

### 채팅방 목록 조회

현재 사용자가 참여한 채팅방 목록을 페이지네이션, 정렬, 조건 필터링을 지원하여 조회합니다.

```http
GET /rooms
```

#### Headers

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-CLIENT-ID` | string | ✅ | 현재 사용자의 Client ID (읽지 않은 수 등 사용자별 데이터 계산에 필요) |
| `IM-Authorization` | string | ✅ | Client 토큰 |

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sort` | string | ❌ | 정렬 기준; 여러 필드를 공백으로 구분하여 조합 가능; `-` 접두사는 내림차순을 의미 |
| `skip` | integer | ❌ | 페이지네이션 오프셋, 기본값 `0` |
| `limit` | integer | ❌ | 반환할 최대 채팅방 수, 기본값 `0` (제한 없음) |
| `updatedAfter` | string or integer | ❌ | 지정된 타임스탬프 이후에 새 메시지가 있거나 생성된 채팅방을 필터링; ISO-8601 문자열 또는 밀리초 Epoch 정수 지원 |
| `pref` | JSON | ❌ | 사용자의 채팅방 환경설정으로 필터링, 예: `{"tags": "some-tag"}` |
| `sortUnreadFirst` | integer | ❌ | 0이 아닌 경우, 읽지 않은 메시지가 있는 채팅방을 먼저 정렬 |

**sort 파라미터 예시**

최신 메시지와 생성 시간 기준 내림차순 정렬:

```
-lastMessage -createdTime
```

생성 시간 기준 오름차순 정렬:

```
createdTime
```

#### Example Request

**예시 1: 채팅방 목록 조회 (페이지네이션 + 시간 필터)**

cURL 예시:

```bash
curl "https://your-app.imkit.io/rooms?skip=0&limit=20&sort=-lastMessage&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-CLIENT-ID: {IM-CLIENT-ID}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

JavaScript 예시:

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      skip: 0,
      limit: 20,
      sort: "-lastMessage",
      updatedAfter: "2020-10-15T03:28:54Z",
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

**예시 2: 태그로 채팅방 필터링 및 읽지 않은 채팅방 우선 표시**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      pref: JSON.stringify({ tags: "some-tag" }),
      sortUnreadFirst: 1,
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
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
| `result.totalCount` | number | 조건에 맞는 채팅방의 총 수 |
| `result.data` | array | 채팅방 오브젝트 배열 |
| `result.inspect` | object | 진단 정보 (쿼리 기준 및 처리 시간) |

**채팅방 오브젝트 필드**

| Parameter | Type | Description |
| --- | --- | --- |
| `_id` | string | 채팅방 고유 식별자 |
| `name` | string | 채팅방 이름 |
| `cover` | string | 채팅방 커버 이미지 URL |
| `description` | string | 채팅방 설명 |
| `roomType` | string | 채팅방 유형 (`"direct"` 또는 `"group"`) |
| `webhook` | string | Webhook 키 또는 URL |
| `botState` | string | 봇 상태 |
| `botMode` | boolean | 봇 모드 활성화 여부 |
| `encrypted` | boolean | 암호화 활성화 여부 |
| `serviceStatus` | number | 서비스 상태 |
| `roomTags` | array[string] | 채팅방 태그 배열 |
| `status` | number | 채팅방 상태 (`1`은 활성을 의미) |
| `unread` | number | 현재 사용자의 읽지 않은 메시지 수 |
| `muted` | boolean | 현재 사용자의 채팅방 알림 음소거 여부 |
| `lastMessage` | object | 최신 메시지 오브젝트 |
| `members` | array[object] | 채팅방 멤버 배열 |
| `pref` | object | 이 채팅방에 대한 현재 사용자의 개인 환경설정 |
| `createdTimeMS` | number | 채팅방 생성 타임스탬프 (밀리초) |

**환경설정 오브젝트 필드 (`pref`)**

| Parameter | Type | Description |
| --- | --- | --- |
| `tags` | array[string] | 사용자가 이 채팅방에 설정한 커스텀 태그 |
| `tagColors` | object | 각 태그의 색상 (헥스 색상 코드) |
| `hidden` | boolean | 이 채팅방의 숨김 여부 |
| `sticky` | boolean | 이 채팅방의 고정 여부 |
| `muted` | boolean | 이 채팅방의 알림 음소거 여부 |
| `folder` | string | 이 채팅방이 속한 폴더 이름 |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "members": "sss",
        "$or": [
          { "lastMessage": { "$gt": "5f87c2cf0000000000000000" } },
          { "createdTime": { "$gt": "2020-10-15T03:32:31.000Z" } }
        ],
        "status": 1
      },
      "tookMS": 22
    },
    "data": [
      {
        "_id": "demo-room",
        "name": "Demo Demo",
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
        "unread": 0,
        "muted": false,
        "lastMessage": {
          "_id": "5f890cf37d980e06f6aaf349",
          "message": "Hello SIKTMLNP 11:01:07",
          "room": "demo-room",
          "sender": {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "id": "sss",
            "lastLoginTimeMS": 0
          },
          "messageType": "text",
          "appID": "SampleApp",
          "messageTime": "2020-10-16T03:01:07.923Z",
          "id": "5f890cf37d980e06f6aaf349",
          "messageTimeMS": 1602817267923,
          "updatedAtMS": 1602817267925,
          "createdAtMS": 1602817267925,
          "reactionCount": 0
        },
        "members": [
          {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "isRobot": false,
            "id": "sss",
            "lastLoginTimeMS": 1588744338369
          }
        ],
        "pref": {
          "tags": ["demo", "sample"],
          "tagColors": {
            "demo": "#f2d700",
            "sample": "#ffa01a"
          },
          "hidden": false,
          "sticky": false,
          "muted": false,
          "folder": "Some-Folder"
        },
        "id": "demo-room",
        "createdTimeMS": 1525001412492
      }
    ]
  }
}
```

#### Error Response

요청이 실패하면 오류 상세 정보가 포함된 오류 응답을 받게 됩니다. 일반적인 오류 시나리오는 다음과 같습니다:

- 유효하지 않은 Client Key 또는 인증 토큰
- 잘못된 `updatedAfter` 시간 형식
- `pref` 파라미터의 유효하지 않은 JSON 형식
- 내부 서버 오류

------

## Use Cases

### 채팅방 목록 표시
- **홈 채팅방 목록**: 페이지네이션과 정렬을 사용하여 사용자의 채팅방 목록 조회
- **태그 필터링**: `pref` 파라미터를 사용하여 태그로 특정 채팅방 필터링

### 증분 동기화
- **효율적인 동기화**: `updatedAfter`를 마지막 요청의 타임스탬프와 함께 사용하여 업데이트된 채팅방만 가져오기

------

## Notes

- **증분 동기화**: `updatedAfter`를 마지막 요청의 타임스탬프와 함께 사용하여 효율적인 증분 동기화를 구현하고, 매번 전체 데이터를 가져오는 것을 방지
- **페이지네이션 권장**: 한 번에 너무 많은 데이터 반환으로 인한 성능 저하를 방지하기 위해 `limit`와 `skip`을 사용한 페이지네이션을 권장
- **정렬**: `sort` 필드는 여러 기준을 공백으로 구분하며, `-` 접두사는 내림차순을 의미
- **`pref` 필터링**: `pref` 파라미터는 JSON 형식이며 전달 전 URL 인코딩이 필요
- **`inspect` 필드**: 디버깅 목적으로만 사용; 실제 쿼리 기준 및 실행 시간이 포함되며, 운영 환경에서는 무시해도 됩니다
