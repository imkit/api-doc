# 사용자 일괄 생성

## 개요

이 엔드포인트를 사용하면 여러 사용자를 한 번에 생성하거나 업데이트할 수 있습니다. 시스템 마이그레이션, 사용자 대량 가져오기 등의 시나리오에 적합합니다. 이 API는 서버 사이드 전용이며 적절한 인증이 필요합니다.

------

## API 엔드포인트

### 사용자 일괄 생성 또는 업데이트

여러 사용자를 한 번에 생성하거나 업데이트합니다.

```http
POST /admin/clients/list
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 플랫폼 API 키 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Request Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `data` | array[object] | ✅ | 사용자 정보 객체 배열 |

**사용자 정보 객체**

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 사용자 고유 식별자 |
| `nickname` | string | ❌ | 사용자 표시 이름 |
| `avatarUrl` | string | ❌ | 사용자 아바타 이미지 URL |

#### Example Request

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients/list",
  {
    data: [
      {
        _id: "user-001",
        nickname: "Alice",
        avatarUrl: "https://example.com/alice.jpg",
      },
      {
        _id: "user-002",
        nickname: "Bob",
        avatarUrl: "https://example.com/bob.jpg",
      },
      {
        _id: "user-003",
        nickname: "Charlie",
        avatarUrl: "https://example.com/charlie.jpg",
      },
    ],
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
curl -X "POST" "https://your-app.imkit.io/admin/clients/list" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "data": [
    {"_id": "user-001", "nickname": "Alice", "avatarUrl": "https://example.com/alice.jpg"},
    {"_id": "user-002", "nickname": "Bob", "avatarUrl": "https://example.com/bob.jpg"}
  ]
}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | 응답 코드 (0은 성공을 나타냄) |
| `RM` | string | 응답 메시지 |
| `result.count` | number | 성공적으로 생성 또는 업데이트된 사용자 수 |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 3
  }
}
```

#### Error Response

요청 실패 시 오류 세부 정보가 포함된 오류 응답을 받습니다. 일반적인 오류 시나리오:

- **Invalid API Key** — 제공된 `IM-API-KEY`가 유효하지 않거나 만료됨
- **Invalid Data Format** — `data` 배열 형식이 잘못됨
- **Missing Required Fields** — 사용자 정보에 `_id` 필드가 누락됨
- **Internal Server Error** — 서버 측에서 예기치 않은 오류가 발생함

------

## 사용 사례

### 시스템 마이그레이션
- **사용자 가져오기**: 기존 시스템에서 IMKIT으로 사용자 데이터 마이그레이션
- **일괄 초기화**: 애플리케이션 출시 시 모든 사용자 일괄 생성

### 데이터 동기화
- **정기 동기화**: 주 시스템에서 주기적으로 사용자 데이터(닉네임, 아바타 등) 동기화
- **정보 업데이트**: 여러 사용자의 표시 이름 또는 아바타 일괄 업데이트

------

## 주의사항

- **서버 전용**: 이 엔드포인트는 백엔드에서 호출해야 합니다
- **토큰 미생성**: 이 API는 사용자를 위한 액세스 토큰을 생성하지 않습니다. 토큰이 필요한 경우 `issueAccessToken: true`를 설정하여 "사용자 생성" API를 사용하세요
- **멱등성**: `_id`가 이미 존재하는 경우 새 사용자를 생성하지 않고 해당 사용자의 데이터를 업데이트합니다
- **성능 고려**: 요청 타임아웃을 방지하기 위해 각 배치를 100건 미만으로 유지하는 것을 권장합니다
