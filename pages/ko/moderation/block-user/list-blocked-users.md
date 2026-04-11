# 차단된 사용자 목록 조회

## 개요

현재 사용자의 전체 차단 목록을 조회하여 차단된 모든 사용자의 상세 정보를 표시합니다. 이 API는 사용자가 개인 차단 목록을 관리할 수 있도록 차단된 사용자의 기본 정보, 차단 시간, 관련 채팅방 정보를 포함하여 조회하는 기능을 제공합니다. 사용자가 프라이버시 설정을 검토하고 관리하는 데 적합합니다.

------

## API Endpoint

### 차단 목록 조회

현재 사용자가 생성한 모든 차단 관계의 상세 정보를 조회합니다.

```http
GET /blockStatus/my
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Example Request

**전체 차단 목록 조회**

```http
GET /blockStatus/my HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/blockStatus/my`,
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
curl -X "GET" "https://your-app.imkit.io/blockStatus/my" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**성공 응답 (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | 응답 코드 (0은 성공을 의미)         |
| `RM`      | string | 응답 메시지                         |
| `result`  | object | 차단 목록 데이터                    |

**Result 오브젝트 구조**

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `data`    | array | 차단 관계 배열             |

**차단 관계 오브젝트 구조**

| Parameter   | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `blockee`   | object | 차단된 사용자의 상세 정보                |
| `blocker`   | string | 차단을 수행한 사용자 ID                  |
| `room`      | object | 연결된 채팅방의 상세 정보                |
| `createdAt` | string | 차단 생성 시간                           |
| `updatedAt` | string | 차단 업데이트 시간                       |

**차단된 사용자 오브젝트 구조**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | 사용자 고유 ID                          |
| `nickname`        | string | 사용자 닉네임                           |
| `avatarUrl`       | string | 사용자 아바타 URL                       |
| `id`              | string | 사용자 ID                               |
| `lastLoginTimeMS` | number | 마지막 로그인 시간 (밀리초 타임스탬프) |

**채팅방 오브젝트 구조**

| Parameter       | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| `_id`           | string | 채팅방 고유 ID                             |
| `roomType`      | string | 채팅방 유형 (direct/group)                 |
| `id`            | string | 채팅방 ID                                  |
| `createdTimeMS` | number | 채팅방 생성 시간 (밀리초 타임스탬프)      |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "blockee": {
          "_id": "ccc",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
          "nickname": "Cathy",
          "id": "ccc",
          "lastLoginTimeMS": 1600006869368
        },
        "blocker": "aaa",
        "room": {
          "_id": "2bec603e94a210092439e83ff2d79ac1",
          "roomType": "direct",
          "id": "2bec603e94a210092439e83ff2d79ac1",
          "createdTimeMS": 1628089206798
        },
        "createdAt": "2021-08-04T15:18:10.735Z",
        "updatedAt": "2021-08-04T15:18:10.735Z"
      },
      {
        "blockee": {
          "_id": "ddd",
          "nickname": "Dina",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
          "id": "ddd",
          "lastLoginTimeMS": 1628094314986
        },
        "blocker": "aaa",
        "room": {
          "_id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "roomType": "direct",
          "id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "createdTimeMS": 1628089213796
        },
        "createdAt": "2021-08-04T15:18:07.649Z",
        "updatedAt": "2021-08-04T15:18:07.649Z"
      }
    ]
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

**403 Forbidden** - 권한 부족

```json
{
  "RC": 403,
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to access this resource"
  }
}
```

------

## 사용 사례

### 개인 프라이버시 관리
- **차단 목록 검토**: 현재 차단된 모든 사용자를 확인
- **프라이버시 설정 관리**: 개인 프라이버시 상태를 한 곳에서 검토 및 관리
- **관계 상태 확인**: 특정 사용자의 차단 상태를 확인

### 사용자 경험 최적화
- **목록 관리 인터페이스**: 완전한 차단 사용자 관리 기능을 제공
- **빠른 차단 해제**: 목록에서 차단 해제할 사용자를 빠르게 선택
- **상태 동기화**: 모든 플랫폼에서 차단 목록의 일관성 보장

### 시스템 관리
- **행동 추적**: 사용자 차단 행동 패턴을 파악
- **관계 분석**: 사용자 간의 상호작용 관계를 분석
- **데이터 통계**: 차단 기능의 사용 통계를 추적

------

## 주의 사항

- **본인 목록만 조회**: 사용자는 자신이 생성한 차단 관계만 조회할 수 있음
- **완전한 정보**: 차단된 사용자와 연결된 채팅방의 상세 정보를 포함
- **시간 정렬**: 일반적으로 차단 시간 순으로 정렬됨
- **채팅방 유형**: 1:1 채팅과 그룹 채팅 모두의 차단 관계를 지원
- **실시간 반영**: 현재 최신 차단 목록 상태를 반환
- **빈 목록 처리**: 차단된 사용자가 없는 경우 빈 배열을 반환
