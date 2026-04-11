# API Key

## 개요

API Key(`IM-API-KEY`)는 IMKIT Platform API의 백엔드 서비스용 인증 키입니다. "플랫폼 관리자로서" 작업을 수행하는 것을 나타내며, 완전한 관리 권한을 가집니다. 사용자 관리, 채팅방 관리, 토큰 관리 등의 작업을 수행할 수 있으며, 모든 API(Client Key 수준 API 포함)를 호출할 수 있습니다. 반드시 서버 측에 안전하게 보관해야 합니다.

------

## API Key 특성

### 기본 정보

| Property         | Description                                     |
| ------------ | ---------------------------------------- |
| **Purpose**     | 플랫폼 관리자로서 작업 수행                 |
| **Pairing**     | 단독 사용 가능; 사용자 Token 불필요             |
| **Format**     | Base64 인코딩 문자열                          |
| **Validity**   | 장기 유효 (수동으로 취소하지 않는 한)                 |
| **Scope**   | 완전한 관리 권한; 모든 API 호출 가능             |
| **Security Level** | 기밀 (프론트엔드에 절대 노출 금지)                 |

### Client Key와의 차이점

| Item         | API Key (`IM-API-KEY`)   | Client Key (`IM-CLIENT-KEY`)          |
| ------------ | ------------------------ | ------------------------------------- |
| **Pairing**     | 단독 사용 가능                 | 사용자 Token (`IM-Authorization`) 필요 |
| **Identity**     | 플랫폼 관리자로서 작업     | 특정 사용자로서 작업                    |
| **Used By**   | 백엔드 전용                   | SDK 프론트엔드 / 백엔드                       |
| **Permission Scope** | 완전한 관리 권한             | 사용자 권한에 의해 제한                        |
| **Security**   | 반드시 기밀 유지                 | 공개 가능                              |

------

## API Key 발급

### IMKIT Dashboard에서

1. [IMKIT Dashboard](https://dashboard.imkit.io/)에 로그인
2. 애플리케이션 선택
3. "API Settings" 페이지로 이동
4. API Key 복사 (한 번만 표시됨)

### API Key 예시

```
MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

------

## 사용법

### HTTP 헤더 인증

```http
POST /admin/clients
IM-API-KEY: MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
Content-Type: application/json

{
  "_id": "user001",
  "nickname": "Alice",
  "issueAccessToken": true
}
```

### 코드 예시

**Node.js**

```javascript
const axios = require('axios');

const apiKey = process.env.IMKIT_API_KEY;
const baseURL = 'https://your-app.imkit.io';

const headers = {
  'IM-API-KEY': apiKey,
  'Content-Type': 'application/json'
};

// 사용자 생성
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/admin/clients`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error.response.data);
  }
};
```

**Python**

```python
import requests
import os

api_key = os.getenv('IMKIT_API_KEY')
base_url = 'https://your-app.imkit.io'

headers = {
    'IM-API-KEY': api_key,
    'Content-Type': 'application/json'
}

def create_user(user_data):
    try:
        response = requests.post(f'{base_url}/admin/clients', 
                               json=user_data, 
                               headers=headers)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Failed to create user: {e}')
```

**PHP**

```php
<?php
$apiKey = $_ENV['IMKIT_API_KEY'];
$baseUrl = 'https://your-app.imkit.io';

$headers = [
    'IM-API-KEY: ' . $apiKey,
    'Content-Type: application/json'
];

function createUser($userData) {
    global $baseUrl, $headers;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/clients');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
?>
```

------

## API Key 권한

### 허용된 작업

- ✅ **사용자 관리**
  - 사용자 생성, 수정, 삭제
  - 사용자 정보 조회
  - 사용자 권한 관리
- ✅ **Token 관리**
  - Token 발급
  - Token 갱신
  - Token 취소
- ✅ **채팅방 관리**
  - 채팅방 생성 및 삭제
  - 채팅방 멤버 관리
  - 채팅방 권한 설정
- ✅ **메시지 관리**
  - 시스템 메시지 전송
  - 메시지 삭제
  - 메시지 기록 조회
- ✅ **애플리케이션 설정**
  - 애플리케이션 구성 수정
  - Webhook 설정 관리
  - 사용 통계 조회

### 고위험 작업

- ⚠️ **완전 제어**: 모든 애플리케이션 데이터에 접근 및 수정 가능
- ⚠️ **사용자 데이터**: 모든 사용자의 개인 정보 접근 가능
- ⚠️ **채팅 기록**: 모든 채팅방의 메시지 내용 열람 가능
- ⚠️ **시스템 설정**: 애플리케이션의 핵심 설정 수정 가능

------

## 보안 고려 사항

### API Key를 반드시 기밀로 유지해야 하는 이유

1. **완전한 권한**: 애플리케이션에 대한 완전한 제어권을 가집니다
2. **데이터 접근**: 모든 사용자 및 채팅 데이터에 접근 가능합니다
3. **비가역적 작업**: 삭제 등 되돌릴 수 없는 작업을 수행할 수 있습니다
4. **사용자 인증 불필요**: 추가적인 사용자 신원 확인이 필요하지 않습니다

### 보안 모범 사례

#### 저장 보안

- **환경 변수**: API Key를 환경 변수에 저장하세요
- **구성 파일**: 암호화된 구성 파일로 관리하세요
- **시크릿 관리 서비스**: AWS Secrets Manager, Azure Key Vault 등을 사용하세요
- **버전 관리 제외**: API Key를 버전 관리 시스템에 커밋하지 마세요

#### 접근 제어

- **최소 권한 원칙**: API Key가 필요한 서비스에서만 사용하세요
- **네트워크 제한**: API Key의 소스 IP 범위를 제한하세요
- **정기적 교체**: API Key를 주기적으로 교체하세요
- **사용 모니터링**: API Key 사용 현황을 모니터링하고 이상 활동을 감지하세요

#### 애플리케이션 보안

```javascript
// ✅ 올바른 방법: 서버 측에서 사용
const apiKey = process.env.IMKIT_API_KEY; // 환경 변수에서 읽기

// ❌ 잘못된 방법: 프론트엔드에 절대 노출하지 마세요
// const apiKey = 'MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=';
```

------

## 환경 구성 예시

### Docker

```dockerfile
ENV IMKIT_API_KEY=MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

### .env 파일

```env
IMKIT_API_KEY=MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
IMKIT_BASE_URL=https://your-app.imkit.io
```

### Kubernetes Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: imkit-secrets
type: Opaque
data:
  api-key: TWpKWmNGbElSR0ZSYkVsUmJFUlRkbFpNUTB4TWJ6Sk5VSEZHWmxadE9XcFpjSGgzTW5aMVFuSnRhejA9
```

------

## 자주 묻는 질문

### Q: API Key가 유출되었을 때의 위험성은?

**A:** 매우 높은 위험도입니다! 공격자는 다음을 할 수 있습니다:

- IMKIT 애플리케이션에 대한 완전한 제어권 획득
- 모든 사용자 데이터 및 채팅 기록 접근
- 중요 데이터 삭제 또는 수정
- 추가 비용 발생

**유출이 발견된 경우 즉시:**

1. Dashboard에서 기존 API Key 취소
2. 새 API Key 생성
3. API Key를 사용하는 모든 서비스 업데이트
4. 이상 작업 로그 확인

### Q: 프론트엔드 JavaScript에서 API Key를 사용할 수 있나요?

**A:** 절대 안 됩니다! 프론트엔드 코드는 모든 사용자에게 노출됩니다. 프론트엔드 연동에는 Client Key를 사용하세요.

### Q: API Key의 접근 범위를 제한할 수 있나요?

**A:** 현재 API Key는 완전한 권한을 가집니다. 다음 방법으로 접근을 제어하는 것을 권장합니다:

- 네트워크 수준에서 소스 IP 제한
- 애플리케이션 수준에서 권한 제어 구현
- 프록시 서비스를 사용하여 호출 가능한 API 제한

### Q: API Key 사용에 요청 속도 제한이 있나요?

**A:** 네, API Key에는 속도 제한 보호가 있습니다:

- 분당 최대 1000개 요청
- 제한을 초과하면 429 에러가 발생합니다
- 적절한 재시도 메커니즘 구현을 권장합니다

------

## 에러 처리

### 일반적인 에러

**잘못된 API Key**

```json
{
  "error": "INVALID_API_KEY",
  "message": "The provided API key is invalid or expired"
}
```

**API Key 누락**

```json
{
  "error": "MISSING_API_KEY",
  "message": "IM-API-KEY header is required"
}
```

**요청 속도 제한 초과**

```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests, please try again later",
  "retryAfter": 60
}
```

**권한 부족**

```json
{
  "error": "INSUFFICIENT_PERMISSIONS",
  "message": "API key does not have permission for this operation"
}
```
