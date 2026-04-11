# 웹훅(Webhook)

## 개요

웹훅 기능은 특정 URL 엔드포인트를 등록하여 채팅방의 실시간 메시지 및 이벤트 알림을 받을 수 있도록 합니다. 채팅방에서 특정 이벤트(예: 새 메시지, 멤버 가입, 멤버 탈퇴 등)가 발생하면 시스템은 등록된 웹훅 URL로 관련 이벤트 데이터를 포함한 POST 요청을 자동으로 보냅니다. 이 기능은 봇 구축, 자동화 처리, 푸시 알림 시스템 등의 애플리케이션 시나리오에 적합합니다.

------

## API 엔드포인트

### 웹훅 등록

각 채팅방에 대해 웹훅 URL을 등록하여 해당 채팅방의 메시지 및 이벤트를 수신할 수 있습니다.

웹훅 설정은 [채팅방 업데이트](/ko/room/room-management/update-a-room) API의 `webhook` 속성을 참조하십시오.

------

## 웹훅 수신 데이터 형식

채팅방에서 이벤트가 발생하면 시스템은 등록된 웹훅 URL로 다음과 같은 JSON 형식의 데이터를 포함한 POST 요청을 보냅니다.

### 기본 데이터 구조

| 매개변수 | 타입 | 설명 |
| ---------- | ------ | ----------------------------------------------------------------------------- |
| `appID`    | string | 애플리케이션 식별자 |
| `clientID` | string | 발신자 ID |
| `roomID`   | string | 이벤트가 발생한 채팅방 ID |
| `event`    | string | 이벤트 타입 |
| `botState` | string | 채팅방의 현재 봇 상태 (봇이 유한 상태 기계로 구현된 경우 상태와 메시지에 따라 반응을 결정할 수 있음) |
| `data`     | object | 채팅방으로 전송된 메시지 또는 이벤트 데이터 |

------

## 이벤트 타입

### 채팅방 가입 이벤트

사용자가 채팅방에 가입할 때 이 이벤트가 트리거됩니다.

**이벤트 타입**: `JOIN_ROOM`

```json
{
  "roomID": "demo-room",
  "event": "JOIN_ROOM",
  "data": {
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Desirae",
      "isRobot": false,
      "lastLoginTimeMS": 0,
      "id": "sss"
    },
    "members": [
      {
        "_id": "sss",
        "nickname": "Desirae",
        "isRobot": false,
        "lastLoginTimeMS": 0,
        "id": "sss"
      }
    ]
  }
}
```

### 멤버 추가 이벤트

채팅방에 새로운 멤버가 추가될 때 이 이벤트가 트리거됩니다.

**이벤트 타입**: `ADD_MEMBERS`

```json
{
  "roomID": "demo-room",
  "event": "ADD_MEMBERS",
  "data": {
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Desirae",
      "isRobot": false,
      "lastLoginTimeMS": 0,
      "id": "sss"
    },
    "members": [
      {
        "_id": "robot001",
        "nickname": "Doris Robot",
        "isRobot": true,
        "lastLoginTimeMS": 0,
        "id": "robot001"
      }
    ]
  }
}
```

### 멤버 제거 이벤트

채팅방에서 멤버가 제거될 때 이 이벤트가 트리거됩니다.

**이벤트 타입**: `DELETE_MEMBERS`

```json
{
  "roomID": "demo-room",
  "event": "DELETE_MEMBERS",
  "data": {
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Desirae",
      "isRobot": false,
      "lastLoginTimeMS": 0,
      "id": "sss"
    },
    "members": [
      {
        "_id": "ccc",
        "nickname": "Aurora",
        "isRobot": false,
        "lastLoginTimeMS": 0,
        "id": "ccc"
      }
    ]
  }
}
```

### 메시지 이벤트

채팅방에 새로운 메시지가 수신될 때 이 이벤트가 트리거됩니다.

**이벤트 타입**: `MESSAGE`

```json
{
  "roomID": "demo-room",
  "event": "MESSAGE",
  "data": {
    "_id": "5c1ddf2d1536bbb6c49f7cfe",
    "message": "Bonjour 2",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Desirae",
      "isRobot": false,
      "avatarUrl": "",
      "description": "description la la #1543989664813",
      "lastLoginTime": "2018-12-05T06:01:06.092Z",
      "lastLoginTimeMS": 1543989666092,
      "id": "sss"
    },
    "messageType": "text",
    "appID": "SampleApp",
    "__v": 0,
    "messageTime": "2018-12-22T06:52:29.380Z",
    "messageTimeMS": 1545461549380,
    "id": "5c1ddf2d1536bbb6c49f7cfe"
  }
}
```

------

## 웹훅 응답 형식

웹훅 서비스는 봇의 행동을 제어하고 메시지를 보내기 위해 JSON 형식의 응답을 반환할 수 있습니다.

### 응답 데이터 구조

| 매개변수 | 타입 | 필수 | 설명 |
| ------------ | ------- | ---- | -------------------------------------------------------------- |
| `senderID`   | string  | ❌    | 메시지에 답장하거나 채팅방으로 메시지를 보낼 때 사용할 발신자 ID 지정 |
| `toBotState` | string  | ❌    | 채팅방을 지정된 봇 상태로 전환. 현재 상태를 유지하려면 현재 상태 지정 |
| `data`       | message | ❌    | 답장 메시지 내용 |

### 응답 예시

**기본 응답** (아무 작업도 수행하지 않음)

```json
{
  "toBotState": null,
  "data": null
}
```

**봇 메시지 답장**

```json
{
  "senderID": "robot001",
  "toBotState": "active",
  "data": {
    "message": "안녕하세요! 저는 봇 도우미입니다. 무엇을 도와드릴까요?",
    "messageType": "text"
  }
}
```

------

## 사용 시나리오

### 봇 개발
- **자동 응답**: 수신된 메시지 내용에 따라 적절한 메시지로 자동 답장합니다.
- **상태 관리**: 대화 흐름을 관리하기 위해 유한 상태 기계를 구현합니다.
- **명령어 처리**: 사용자 명령어를 파싱하고 해당 작업을 실행합니다.

### 알림 시스템
- **사용자 정의 푸시**: 특정 이벤트에 따라 맞춤형 푸시 알림을 보냅니다.
- **실시간 모니터링**: 채팅방 활동을 모니터링하고 해당 처리를 트리거합니다.
- **이벤트 기록**: 분석 또는 감사를 위해 중요한 이벤트를 기록합니다.

### 시스템 통합
- **제3자 서비스**: 채팅 이벤트를 다른 시스템이나 서비스와 통합합니다.
- **데이터 동기화**: 채팅 데이터를 외부 데이터베이스나 시스템과 동기화합니다.
- **워크플로우**: 자동화된 워크플로우 및 비즈니스 로직을 트리거합니다.

### 콘텐츠 관리
- **메시지 필터링**: 부적절한 콘텐츠를 자동으로 감지하고 처리합니다.
- **콘텐츠 분석**: 메시지 내용을 분석하여 감정 분석이나 키워드 추출을 수행합니다.
- **지능형 도우미**: 지능형 질의응답 또는 고객 서비스 기능을 제공합니다.

------

## 주의 사항

- **HTTP POST**: 모든 웹훅 요청은 HTTP POST 메서드를 사용합니다.
- **JSON 형식**: 요청과 응답 모두 JSON 형식을 사용합니다.
- **실시간성**: 웹훅은 이벤트 발생 시 즉시 트리거됩니다.
- **신뢰성**: 재시도 메커니즘과 오류 처리를 구현하는 것이 좋습니다.
- **보안**: 요청 소스를 검증하고 적절한 보안 조치를 구현하는 것이 좋습니다.
- **성능 고려 사항**: 웹훅 엔드포인트는 타임아웃을 피하기 위해 신속하게 응답해야 합니다.
- **상태 관리**: 봇 상태는 복잡한 대화 로직을 구현하는 데 사용할 수 있습니다.
- **응답 형식**: 올바르지 않은 응답 형식은 봇 기능의 이상을 초래할 수 있습니다.
