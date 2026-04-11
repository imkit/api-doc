# 사용자 목록 조회

## 개요

애플리케이션의 사용자 목록을 조회하고 검색합니다. MongoDB 쿼리 구문을 사용한 조건 필터링, 페이지네이션, 복잡한 검색을 지원합니다. 사용자 관리, 데이터 분석, 시스템 모니터링 등의 시나리오에 적합합니다.

------

## API 엔드포인트

### 사용자 목록 조회

필터링 및 페이지네이션을 지원하여 애플리케이션의 사용자 목록을 가져옵니다.

```http
GET /admin/clients
```

#### Headers

| Parameter         | Type   | Required | Description          |
| ------------ | ------ | ---- | ------------- |
| `IM-API-KEY` | string | ✅    | API 키 |

#### Query Parameters

| Parameter    | Type   | Required | Description                                          |
| ------- | ------ | ---- | --------------------------------------------- |
| `q`     | string | ❌    | 조건 필터링을 위한 MongoDB 쿼리 구문                |
| `limit` | number | ❌    | 페이지당 최대 반환 사용자 수 (기본값: 50, 최대: 100) |
| `skip`  | number | ❌    | 건너뛸 사용자 수, 페이지네이션에 사용 (기본값: 0)           |

#### 쿼리 구문 예시

**기본 필터링**

```javascript
// 닉네임에 "AB"가 포함된 사용자 조회
q={"nickname": {"$regex": ".*AB.*"}}

// 특정 이메일을 가진 사용자 조회
q={"email": "user@example.com"}

// 최근 로그인 사용자 조회 (최근 7일 이내)
q={"lastLoginTimeMS": {"$gte": 1640995200000}}
```

**복합 조건**

```javascript
// 닉네임에 "admin"이 포함되고 이메일이 있는 사용자 조회
q={"nickname": {"$regex": ".*admin.*"}, "email": {"$exists": true}}

// 특정 기간 내에 등록된 사용자 조회
q={"createdAt": {"$gte": "2025-01-01T00:00:00Z", "$lt": "2025-02-01T00:00:00Z"}}
```

#### Example Request

**전체 사용자 조회**

```http
GET /admin/clients?limit=20&skip=0
```

**특정 사용자 검색**

```http
GET /admin/clients?q=%7B%22nickname%22:%7B%22%24regex%22:%22.*AB.*%22%7D%7D&limit=10
```

**JavaScript 예시:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/admin/clients`,
  {
    params: {
      q: JSON.stringify({ nickname: { $regex: ".*AB.*" } }),
      limit: 20,
      skip: 0,
    },
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL 예시:**

```bash
curl -X "GET" "https://your-app.imkit.io/admin/clients?q=%7B%22nickname%22%3A%7B%22%24regex%22%3A%22.*AB.*%22%7D%7D&limit=20&skip=0" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### Response

**Success Response (200 OK)**

| Parameter                | Type   | Description                   |
| ------------------- | ------ | ---------------------- |
| `RC`                | number | 응답 코드 (0은 성공을 나타냄) |
| `RM`                | string | 응답 메시지               |
| `result`            | object | 조회 결과               |
| `result.totalCount` | number | 조건에 일치하는 전체 사용자 수     |
| `result.data`       | array  | 사용자 데이터 배열           |

**사용자 객체 구조**

| Parameter              | Type   | Description                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 사용자 고유 식별자                |
| `nickname`        | string | 사용자 표시 이름                  |
| `email`           | string | 사용자 이메일 (제공된 경우)    |
| `avatarUrl`       | string | 사용자 아바타 URL                  |
| `address`         | object | 마지막 접속 네트워크 주소 정보        |
| `userAgent`       | string | 마지막으로 사용한 브라우저/애플리케이션 정보 |
| `lastLoginTimeMS` | number | 마지막 로그인 시각 (밀리초 타임스탬프)    |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "_id": "user001",
        "email": "test@example.com",
        "nickname": "Test AB User",
        "avatarUrl": "https://example.com/avatar.jpg",
        "address": {
          "port": 49315,
          "family": "IPv6",
          "address": "::ffff:118.168.96.151"
        },
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "lastLoginTimeMS": 1640995200000
      }
    ]
  }
}
```

#### Error Response

**400 Bad Request** - 쿼리 구문이 유효하지 않음

```json
{
  "RC": 400,
  "RM": "Invalid query syntax",
  "error": {
    "code": "INVALID_QUERY",
    "message": "MongoDB query syntax error"
  }
}
```

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

**413 Payload Too Large** - 조회 결과가 너무 큼

```json
{
  "RC": 413,
  "RM": "Query result too large",
  "error": {
    "code": "RESULT_TOO_LARGE",
    "message": "Please use more specific query or smaller limit"
  }
}
```

------

## 사용 사례

### 사용자 관리

- **사용자 목록 표시**: 관리자 대시보드에서 모든 사용자 표시
- **사용자 검색**: 닉네임, 이메일 등의 조건으로 특정 사용자 검색
- **일괄 처리**: 여러 사용자를 선택하여 일괄 관리

### 데이터 분석

- **활동 분석**: 최근 로그인 사용자 통계 조회
- **사용자 분포**: 사용자의 지역 분포 및 기기 사용 현황 분석
- **성장 추적**: 특정 기간의 사용자 증가 추이 추적

### 시스템 모니터링

- **이상 감지**: 비정상적인 로그인 행동을 보이는 사용자 조회
- **용량 계획**: 전체 사용자 수 및 증가 추세 파악
- **컴플라이언스 감사**: 필요에 따라 특정 사용자 데이터 조회

------

## 주의사항

- **쿼리 구문**: 유효한 MongoDB 쿼리 구문을 사용해야 합니다
- **URL 인코딩**: 쿼리 파라미터는 URL 인코딩이 필요합니다
- **민감 정보**: 응답에는 사용자 토큰 등 민감한 정보가 포함되지 않습니다
- **권한 제어**: 관리자만 이 API를 호출할 수 있습니다
- **페이지네이션 제한**: 단일 쿼리는 최대 100건을 반환합니다
- **인덱스 활용**: 자주 조회하는 필드(닉네임, 이메일 등)는 인덱스가 적용되어 있습니다
- **쿼리 최적화**: 지나치게 복잡한 정규 표현식 사용을 피하세요
- **캐시 권장**: 자주 변경되지 않는 조회 결과는 캐시 구현을 권장합니다

------

## 부록: MongoDB 쿼리 구문 가이드

### 기본 연산자

| Operator | Description     | Example                                          |
| ------ | -------- | --------------------------------------------- |
| `$eq`  | 같음     | `{"nickname": {"$eq": "Alice"}}`              |
| `$ne`  | 다름   | `{"nickname": {"$ne": "Admin"}}`              |
| `$gt`  | 초과     | `{"lastLoginTimeMS": {"$gt": 1640995200000}}` |
| `$gte` | 이상 | `{"createdAt": {"$gte": "2025-01-01"}}`       |
| `$lt`  | 미만     | `{"lastLoginTimeMS": {"$lt": 1640995200000}}` |
| `$lte` | 이하 | `{"createdAt": {"$lte": "2025-12-31"}}`       |

### 문자열 연산

| Operator   | Description         | Example                                                     |
| -------- | ------------ | -------------------------------------------------------- |
| `$regex` | 정규 표현식   | `{"nickname": {"$regex": ".*admin.*", "$options": "i"}}` |
| `$in`    | 목록에 포함   | `{"_id": {"$in": ["user1", "user2", "user3"]}}`          |
| `$nin`   | 목록에 미포함 | `{"nickname": {"$nin": ["admin", "test"]}}`              |

### 존재 여부 확인

| Operator    | Description     | Example                                       |
| --------- | -------- | ------------------------------------------ |
| `$exists` | 필드 존재 | `{"email": {"$exists": true}}`             |
| `$type`   | 데이터 타입 | `{"lastLoginTimeMS": {"$type": "number"}}` |

------

## 페이지네이션 모범 사례

### 기본 페이지네이션

```javascript
// 첫 번째 페이지 (페이지당 20건)
GET /admin/clients?limit=20&skip=0

// 두 번째 페이지
GET /admin/clients?limit=20&skip=20

// 세 번째 페이지
GET /admin/clients?limit=20&skip=40
```

### 대용량 데이터 처리

```javascript
// 대용량 데이터의 경우 더 구체적인 조건을 사용하는 것을 권장합니다
GET /admin/clients?q={"lastLoginTimeMS":{"$gte":1640995200000}}&limit=50
```

## 페이지네이션 권장사항

- 대용량 데이터의 경우 더 구체적인 조건과 페이지네이션을 함께 사용하는 것을 권장합니다
- 단일 쿼리는 최대 100건을 반환합니다
