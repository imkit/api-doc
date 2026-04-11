# 사용자 그룹 목록 조회

## 개요

시스템 내 모든 사용자 그룹의 목록을 조회합니다. `limit` 파라미터로 반환할 결과 수를 제어할 수 있습니다. 이 API는 `IM-API-KEY` 인증이 필요한 서버 사이드 전용 API입니다.

------

## API 엔드포인트

### 사용자 그룹 목록 조회

시스템 내 모든 사용자 그룹의 목록을 가져옵니다.

```http
GET /admin/groups
```

#### Headers

| Parameter         | Type   | Required | Description              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 플랫폼 API 키 |

#### Query Parameters

| Parameter    | Type   | Required | Description                             |
| ------- | ------ | ---- | -------------------------------- |
| `limit` | number | ❌    | 반환할 최대 그룹 수               |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/groups",
  {
    params: {
      limit: 50
    },
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/groups?limit=50" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**Success Response (200 OK)**

| Parameter                    | Type   | Description                         |
| ----------------------- | ------ | ---------------------------- |
| `RC`                    | number | 응답 코드 (0은 성공을 나타냄)       |
| `RM`                    | string | 응답 메시지                     |
| `result`                | object | 조회 결과                     |
| `result.totalCount`     | number | 전체 그룹 수                     |
| `result.data`           | array  | 그룹 데이터 배열                 |

**그룹 객체 구조**

| Parameter        | Type   | Description                       |
| ----------- | ------ | -------------------------- |
| `_id`       | string | 그룹 고유 식별자             |
| `nickname`  | string | 그룹 표시 이름               |
| `avatarUrl` | string | 그룹 아바타 이미지 URL           |
| `members`   | array  | 그룹 멤버의 Client ID 배열  |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 3,
    "data": [
      {
        "_id": "group_customer_service",
        "nickname": "고객 서비스 팀",
        "avatarUrl": "https://example.com/cs-avatar.png",
        "members": ["agent001", "agent002", "agent003"]
      },
      {
        "_id": "group_sales",
        "nickname": "영업 팀",
        "avatarUrl": "https://example.com/sales-avatar.png",
        "members": ["sales001", "sales002"]
      },
      {
        "_id": "group_engineering",
        "nickname": "엔지니어링 팀",
        "avatarUrl": "https://example.com/eng-avatar.png",
        "members": ["dev001", "dev002", "dev003", "dev004"]
      }
    ]
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

------

## 사용 사례

### 그룹 관리
- **그룹 현황 파악**: 관리자 대시보드에서 모든 사용자 그룹을 나열하여 관리 인터페이스 제공
- **멤버 확인**: 각 그룹의 멤버 구성을 확인하여 권한 설정이 올바른지 검토

### 시스템 연동
- **그룹 데이터 동기화**: 그룹 데이터를 외부 시스템(CRM 또는 HR 시스템 등)에 동기화
- **권한 감사**: 접근 권한 감사를 위해 주기적으로 그룹 목록을 내보내기

------

## 주의사항

- **서버 전용**: 이 엔드포인트는 `IM-API-KEY` 인증이 필요하며 서버 사이드 전용입니다
- **limit 파라미터**: `limit`을 지정하지 않으면 시스템이 기본 수의 그룹을 반환합니다
- **그룹 개념**: 반환되는 결과는 그룹 채팅방이 아닌 사용자 그룹(가상 사용자)입니다
- **멤버 정보**: `members` 필드에는 Client ID만 포함됩니다. 상세 멤버 정보는 사용자 API를 별도로 조회하세요
