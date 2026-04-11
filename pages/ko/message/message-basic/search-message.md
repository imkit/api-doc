# 메시지 검색

## 개요

키워드를 통해 메시지 내용을 검색합니다. 이 API는 범용 검색 기능을 사용하여 메시지 내용에 대해 전체 텍스트 검색을 수행하며, 모든 채팅방 검색 또는 특정 채팅방으로 범위를 제한한 검색을 지원하여 특정 메시지 내용을 빠르게 찾는 데 유용합니다.

------

## API 엔드포인트

### 메시지 내용 검색

키워드를 사용하여 메시지 내용 중에서 검색합니다.

```http
POST /search
```

#### Headers

| 매개변수 | 타입 | 필수 | 설명 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | 클라이언트 키 |
| `IM-Authorization` | string | ✅    | 클라이언트 토큰 |

#### Post Body

| 매개변수 | 타입 | 필수 | 설명 |
| ---------- | -------- | ---- | ----------------------------------------- |
| `type`     | array    | ✅    | 검색 타입, ["messages"]로 설정 |
| `keyword`  | string   | ✅    | 검색 키워드 (메시지 내용에서 검색) |
| `room`     | string   | ❌    | 특정 채팅방 내로 검색 제한 |
| `roomTags` | array    | ❌    | 지정된 태그가 있는 채팅방 내로 검색 제한 |
| `limit`    | number   | ❌    | 최대 검색 결과 수 |

#### 요청 예시

**모든 채팅방에서 메시지 검색**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "hello",
  "limit": 20
}
```

**특정 채팅방에서 메시지 검색**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "project update",
  "room": "demo-room"
}
```

**특정 태그가 있는 채팅방에서 검색**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "meeting",
  "roomTags": ["work", "team"]
}
```

**JavaScript 예시:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/search`,
  {
    type: ["messages"],
    keyword: "hello",
    limit: 20,
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "POST" "https://your-app.imkit.io/search" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"type": ["messages"], "keyword": "hello", "limit": 20}'
```

#### Response

**성공 응답 (200 OK)**

| 매개변수 | 타입 | 설명 |
| -------- | ------ | ---------------------- |
| `RC`     | number | 응답 코드 (0은 성공을 의미함) |
| `RM`     | string | 응답 메시지 |
| `result` | object | 검색 결과 |

**검색 결과 구조**

| 매개변수 | 타입 | 설명 |
| ---------- | ------ | --------------------------------- |
| `messages` | array  | 검색된 메시지 그룹 (채팅방별로 그룹화됨) |

**메시지 그룹 객체 구조**

| 매개변수 | 타입 | 설명 |
| ---------- | ------ | ------------------------- |
| `room`     | object | 채팅방 정보 |
| `messages` | array  | 해당 채팅방에서 일치하는 메시지 ID 목록 |

**채팅방 정보 객체 구조**

| 매개변수 | 타입 | 설명 |
| --------------- | ------- | ------------------------- |
| `_id`           | string  | 채팅방 고유 식별자 |
| `name`          | string  | 채팅방 이름 |
| `cover`         | string  | 채팅방 커버 이미지 URL |
| `description`   | string  | 채팅방 설명 |
| `roomTags`      | array   | 채팅방 태그 목록 |

#### 응답 예시

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "messages": [
      {
        "room": {
          "_id": "demo-room",
          "name": "Demo Room",
          "cover": "http://example.com/cover.jpg",
          "description": "Demo room for testing",
          "roomTags": ["demo", "test"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf349",
          "5f890cf37d980e06f6aaf350",
          "5f890cf37d980e06f6aaf351"
        ]
      },
      {
        "room": {
          "_id": "work-room",
          "name": "Work Discussion",
          "cover": "http://example.com/work-cover.jpg",
          "description": "Work related discussions",
          "roomTags": ["work"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf352"
        ]
      }
    ]
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

**400 Bad Request** - 검색 매개변수 유효하지 않음

```json
{
  "RC": 400,
  "RM": "Invalid search parameters",
  "error": {
    "code": "INVALID_SEARCH_TYPE",
    "message": "Search type must include 'messages'"
  }
}
```

------

## 사용 시나리오

### 메시지 검색
- **키워드 찾기**: 특정 키워드가 포함된 이전 메시지를 빠르게 찾습니다.
- **내용 역추적**: 대량의 메시지 중에서 관련 대화 내용을 찾습니다.
- **정보 검색**: 특정 주제나 프로젝트와 관련된 논의를 검색합니다.

### 채팅방 관리
- **콘텐츠 검토**: 특정 단어가 포함된 메시지를 검색하여 검토를 진행합니다.
- **데이터 분석**: 채팅방에서 논의되는 인기 화제를 분석합니다.
- **규정 준수 확인**: 규정 위반 가능성이 있는 메시지 내용을 검색합니다.

### 사용자 경험
- **지능형 검색**: 사용자에게 대화 기록을 빠르게 검색할 수 있는 기능을 제공합니다.
- **연관 표시**: 검색 키워드와 관련된 모든 메시지를 표시합니다.
- **교차 검색**: 여러 채팅방에서 동시에 관련 내용을 검색합니다.

------

## 주의 사항

- **검색 범위**: 현재 사용자가 접근 권한을 가진 채팅방과 메시지만 검색됩니다.
- **키워드 매칭**: 전체 텍스트 검색을 지원하며, 메시지 내용 중 키워드와 일치하는 부분을 찾습니다.
- **결과 그룹화**: 검색 결과는 채팅방별로 그룹화되어 메시지 출처를 쉽게 파악할 수 있습니다.
- **권한 제어**: 검색 결과는 사용자의 채팅방 권한에 따라 필터링됩니다.
- **성능 고려**: 광범위한 검색은 시간이 소요될 수 있으므로 적절한 limit 값을 설정하는 것이 좋습니다.
- **메시지 ID**: 반환되는 값은 메시지 ID 배열이며, 전체 메시지 내용을 가져오려면 추가 API 호출이 필요합니다.
