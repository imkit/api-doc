# Web URL 매개변수

## 개요

IMKIT에서 제공하는 Web URL은 query parameter를 통해 초기화 동작을 제어할 수 있습니다. 로그인 token, 기본 채팅방, 다크 모드 등을 포함합니다. 이 페이지에서는 지원되는 모든 매개변수, URL 내 배치 위치, 그리고 일반적인 사용 시나리오를 안내합니다.

------

## 매개변수 목록

| 매개변수 | 필수 | 타입 | 기본값 | 설명 |
| -------- | ---- | ---- | ------ | ---- |
| `token` | ✅(최초 임베드) | string | localStorage에 저장된 기존 token | JWT 인증 token. 읽은 후 자동으로 `localStorage`에 저장되고 URL 표시줄에서 제거됩니다 |
| `autoSelectRoom` | ❌ | `"0"` | (활성화) | 로드 시 첫 번째 채팅방을 자동 선택할지 여부. `0`으로 설정 시 비활성화 |
| `roomId` | ❌ | string | (없음) | 입장할 채팅방 ID 지정. 설정 시 RoomList가 숨겨지며 단일 채팅방 임베드에 적합 |
| `roomTag` | ❌ | string | (없음) | 채팅방 tag 필터. 지정된 tag가 있는 채팅방만 표시 |
| `darkMode` | ❌ | `"true"` / `"1"` / `"false"` / `"0"` | 시스템 설정 따름 | 다크 / 라이트 테마 전환 |

------

## URL 형식

IMKIT 프론트엔드는 hash routing을 사용하므로 **매개변수 위치가 읽기 방식에 영향을 줍니다**. 아래 표에 따라 올바른 위치에 배치하세요.

### 형식 A:hash(`#`) 앞

해당 매개변수:`token`(최초 로드)、`autoSelectRoom`、`roomId`、`roomTag`

```
https://your-app.imkit.io/?token=USER_TOKEN&roomId=ROOM_ID&autoSelectRoom=0#/
```

### 형식 B:hash 라우트 뒤

해당 매개변수:`token`(런타임 전환)、`darkMode`

```
https://your-app.imkit.io/#/?darkMode=1&token=USER_TOKEN
```

> `token`은 두 위치 모두 지원됩니다:**최초 로드** 시에는 형식 A에 배치하세요(읽은 후 localStorage에 자동 저장되고 URL에서 제거되므로 스크린샷이나 공유로 인한 유출을 방지);**런타임 중 token 동적 전환**은 형식 B에 배치하세요(socket 재연결과 기존 store 초기화가 트리거됩니다).

------

## 사용 시나리오

### 1. 특정 채팅방 임베드(채팅방 목록 숨김)

```
https://your-app.imkit.io/?token=USER_TOKEN&roomId=6073a1b2c3d4e5f6a7b8c9d0#/
```

서드파티 시스템에서 특정 채팅방만 표시하려는 경우에 적합합니다. 예를 들어 고객 지원 시스템에서 단일 대화창을 임베드하는 경우.

### 2. 다크 모드 강제 적용

```
https://your-app.imkit.io/#/?darkMode=1
```

어두운 배경의 app이나 페이지에 임베드할 때 테마 불일치를 방지하는 데 적합합니다.

### 3. 자동 선택 비활성화 + 전체 채팅방 목록 표시

```
https://your-app.imkit.io/?token=USER_TOKEN&autoSelectRoom=0#/
```

모바일 web에서 사용자가 직접 입장할 채팅방을 선택하길 원할 때 적합합니다.

### 4. tag로 채팅방 필터링

```
https://your-app.imkit.io/?token=USER_TOKEN&roomTag=customer-support#/
```

`customer-support` tag가 있는 채팅방만 표시합니다. 하나의 IMKIT app으로 여러 시나리오를 함께 사용할 때 분기 처리에 유용합니다.

------

## 주의사항

- **`token` 보안**:형식 A의 `token`은 SDK가 읽은 후 자동으로 브라우저 URL 표시줄에서 제거되고 `localStorage`에 저장됩니다. 스크린샷이나 URL 공유로 인한 유출 위험을 줄입니다.
- **`darkMode` 허용값**:현재 `"true"` / `"1"` / `"false"` / `"0"`만 인식됩니다. `"dark"`나 `"light"`로 작성하면 동작하지 않습니다.
- **`roomId`와 RoomList**:`roomId`가 지정되면 RoomList는 숨겨지며 단일 채팅방 임베드에 적합합니다. 채팅방 목록을 유지하면서 특정 채팅방만 미리 선택하려면 임베드 후 SDK API로 전환하세요.
- **`autoSelectRoom` 기본값**:이 매개변수를 지정하지 않으면 기본적으로 활성화됩니다(로드 후 첫 번째 채팅방 자동 선택). `"0"`만 비활성화합니다.

------

## 다음 단계

- [기본 연동](/ko/basic_integration) — 사용자 생성, 채팅방 생성부터 Web URL 임베드까지 전체 백엔드 연동 플로우
- [인증](/ko/auth) — API Key와 Client Key의 발급 및 사용 방법
