# Client Key

## 개요

Client Key(`IM-CLIENT-KEY`)는 IMKIT Platform API에서 애플리케이션을 식별하는 인증 키입니다. 사용자 Token(`IM-Authorization`)과 함께 사용해야 하며, "특정 사용자로서" 작업을 수행하는 것을 나타냅니다. SDK 초기화, WebSocket 연결 수립, 사용자 수준 API 작업에 주로 사용됩니다.

------

## Client Key 특성

### 기본 정보

| Property         | Description                                   |
| ------------ | -------------------------------------- |
| **Purpose**     | 애플리케이션 식별; 사용자 Token과 함께 작업 수행  |
| **Pairing**     | `IM-Authorization` (사용자 Token) 필요|
| **Format**     | JWT Token 형식                         |
| **Validity**   | 장기 유효 (수동으로 취소하지 않는 한)               |
| **Scope**     | 작업 범위는 사용자 권한에 의해 제한                 |
| **Security Level** | 공개 가능 (프론트엔드 코드에 노출 허용)             |

### API Key와의 차이점

| Item         | Client Key (`IM-CLIENT-KEY`)          | API Key (`IM-API-KEY`)   |
| ------------ | ------------------------------------- | ------------------------ |
| **Pairing**     | 사용자 Token (`IM-Authorization`) 필요 | 단독 사용 가능                 |
| **Identity**     | 특정 사용자로서 작업                    | 플랫폼 관리자로서 작업     |
| **Used By**   | SDK 프론트엔드 / 백엔드                       | 백엔드 전용                   |
| **Permission Scope** | 사용자 권한에 의해 제한                        | 완전한 관리 권한             |
| **Security**   | 공개 가능                              | 반드시 기밀 유지                 |

------

## Client Key 발급

### IMKIT Dashboard에서

1. [IMKIT Dashboard](https://dashboard.imkit.io/)에 로그인
2. 애플리케이션 선택
3. "Settings" 페이지로 이동
4. Client Key 복사

### Client Key 예시

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiIySllwWWhEYVFsSVFsRFN2VkxDTExvMk1QekZmVm05allweHcydnVCcm1rPSIsImNyZWF0ZUF0IjoxNTkxOTcyNTc2NDE0LCJjbGllbnRJZCI6IjJiM2JkNWNjLTRhODYtNGE0MC1hMTU0LTE2NDA0MDE0ZGE4OCJ9.bdIWOcPfDrNuLRszgtrQDaQiow_X-WolzjDhtiLEED8
```

------

## 사용법

### Web SDK 초기화

```javascript
const config = {
  domain: "https://your-app.imkit.io",
  clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  token: "user-access-token"
}

window.IMKitUI.init(config);
```

### iOS SDK 초기화

```swift
let config = IMKitConfig(
    domain: "https://your-app.imkit.io",
    clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token: "user-access-token"
)

IMKit.shared.initialize(config: config)
```

### Android SDK 초기화

```kotlin
val config = IMKitConfig(
    domain = "https://your-app.imkit.io",
    clientKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token = "user-access-token"
)

IMKit.initialize(config)
```

------

## Client Key 권한

### 허용된 작업 (사용자 Token 필요)

- ✅ WebSocket 연결 수립
- ✅ 채팅 메시지 수신 및 전송
- ✅ 채팅방 참가/퇴장
- ✅ 채팅방 멤버 관리
- ✅ 멀티미디어 파일 업로드
- ✅ 사용자 상태 업데이트
- ✅ 사용자 차단/금지
- ✅ 메시지 고정/취소

### 허용되지 않는 작업 (API Key 필요)

- ❌ 사용자 생성/삭제
- ❌ 사용자 Token 관리
- ❌ 애플리케이션 설정 수정
- ❌ 채팅방을 넘나드는 메시지 기록 접근
- ❌ 메시지 일괄 전송

------

## 보안 고려 사항

### Client Key를 공개해도 되는 이유

1. **제한된 권한**: 작업 범위가 사용자 권한에 의해 제한됩니다
2. **Token 필요**: 유효한 사용자 Token과 함께 사용해야 작업이 가능합니다
3. **관리자 권한 없음**: 사용자 관리, 토큰 관리 등의 관리 작업을 수행할 수 없습니다
4. **애플리케이션 격리**: 특정 애플리케이션에만 연결 가능합니다

### 모범 사례

- **버전 관리**: Client Key는 버전 관리 시스템에 포함할 수 있습니다
- **환경 분리**: 환경별로 다른 Client Key를 사용하세요
- **정기적 교체**: 위험은 상대적으로 낮지만, 주기적인 교체를 권장합니다
- **사용 모니터링**: Client Key 사용 패턴을 모니터링하세요

------

## 자주 묻는 질문

### Q: Client Key가 유출되었을 때의 위험성은?

**A:** 위험도는 상대적으로 낮습니다. 공격자가 실제 작업을 수행하려면 유효한 사용자 Token이 여전히 필요하기 때문입니다. 그러나 유출이 발견된 경우 즉시 Client Key를 교체하는 것을 권장합니다.

### Q: 모바일 애플리케이션에서 Client Key를 사용할 수 있나요?

**A:** 네, Client Key는 네이티브 iOS/Android 앱을 포함한 모바일 애플리케이션에 안전하게 내장할 수 있도록 설계되었습니다.

### Q: Client Key가 만료되나요?

**A:** Client Key는 기본적으로 만료되지 않습니다. 다만 Dashboard에서 수동으로 취소하고 새 Client Key를 생성할 수 있습니다.

### Q: 하나의 애플리케이션에 여러 Client Key를 가질 수 있나요?

**A:** 현재 각 애플리케이션은 하나의 Client Key만 가질 수 있습니다. 교체가 필요한 경우 기존 것을 먼저 취소한 후 새 것을 생성하세요.

------

## 에러 처리

### 일반적인 에러

**잘못된 Client Key**

```json
{
  "error": "INVALID_CLIENT_KEY",
  "message": "The provided client key is invalid or expired"
}
```

**Client Key 불일치**

```json
{
  "error": "CLIENT_KEY_MISMATCH", 
  "message": "Client key does not match the specified domain"
}
```

**Client Key 누락**

```json
{
  "error": "MISSING_CLIENT_KEY",
  "message": "Client key is required for SDK initialization"
}
```
