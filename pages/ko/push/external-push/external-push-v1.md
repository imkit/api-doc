# 외부 푸시 서비스 v1 (Legacy)

## 개요

자체 APNs / FCM 서비스를 통해 푸시를 전송하고 싶을 때(IMKIT 내장 푸시 파이프라인 대신) 플랫폼 관리 콘솔에서 `PUSH` 환경 변수에 자체 HTTPS 엔드포인트를 설정할 수 있습니다. 채팅방에서 새 메시지가 발생하고 푸시가 필요할 때마다, IMKIT은 "평탄화된 메시지 객체"를 HTTP POST로 해당 엔드포인트에 전송하며, 이후 APNs / FCM으로의 전달은 사용자가 직접 처리합니다.

> **이 인터페이스는 legacy v1입니다**. 신규 프로젝트는 [외부 푸시 서비스 v2 (Generic)](/ko/push/external-push/external-push-v2)을 우선 사용하시기 바랍니다. v2는 더 완전한 메시지 필드와 다중 수신자 broadcast 모델을 제공합니다.

------

## 설정 방법

IMKIT 플랫폼 관리 콘솔에서 환경 변수를 설정합니다:

```
PUSH=https://your-server.example.com/imkit/push
```

설정 후, 푸시가 필요한 모든 메시지 이벤트에 대해 IMKIT은 이 URL로 `POST` 요청을 보냅니다.

------

## 요청 형식

### Method

`POST`

### Headers

| 파라미터       | 타입   | 필수 | 설명                              |
| -------------- | ------ | ---- | --------------------------------- |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

### Request Body

각 요청은 한 명의 수신자에게만 전송됩니다.

| 필드       | 타입   | 설명                                                                |
| ---------- | ------ | ------------------------------------------------------------------- |
| 메시지 필드 | mixed  | 평탄화된 메시지 객체([Message Model](/ko/realtime/socket-events#chat-message)을 따름)   |
| `alert`    | string | 조립된 APNs / FCM Alert 텍스트로, 푸시 서비스 제공자에게 직접 전달 가능 |
| `toClient` | string | 수신자 Client ID                                                    |
| `badge`    | number | 해당 수신자의 현재 총 안 읽음 메시지 수. APNs `badge` 또는 FCM `badge`에 직접 사용 가능 |

------

## 예시 요청

```javascript
{
  "_id": "5dd51a4f21841443cfd3090d",
  "message": "lala",
  "room": "demo-room",
  "sender": {
    "_id": "sss",
    "avatarUrl": "http://loremflickr.com/240/240/style?1574241882",
    "nickname": "SSS",
    "description": "description la la #1568192464957",
    "isRobot": false,
    "id": "sss",
    "lastLoginTimeMS": 1568192470942
  },
  "messageType": "text",
  "appID": "SampleApp",
  "id": "5dd51a4f21841443cfd3090d",
  "messageTimeMS": 1574246991222,
  "updatedAtMS": 1574246991223,
  "createdAtMS": 1574246991223,
  "toClient": "target-client-id",
  "badge": 100
}
```

------

## 응답

서비스는 `200 OK`(내용은 자유)로 응답해야 하며, IMKIT은 응답 내용에 따라 후속 동작을 수행하지 않습니다.

------

## 사용 시나리오

### 기존 푸시 서비스 통합
- **자체 푸시 활용**: 고객이 이미 APNs / FCM 푸시 서비스를 보유하고 있다면 IMKIT 메시지 이벤트에 직접 연결할 수 있고, 기존 흐름을 변경할 필요가 없습니다

### 커스텀 문구
- **alert 내용 커스터마이즈**: 자체 서비스에서 `messageType`、`sender`、`message`에 따라 푸시 문구를 재구성할 수 있으며, IMKIT 내장 형식의 제약을 받지 않습니다

### 다중 채널 푸시
- **APNs/FCM/Email/SMS 동시 발송**: 자체 서비스에서 메시지를 분기하여 동일한 이벤트를 여러 채널로 동시에 푸시할 수 있습니다

------

## 참고 사항

- **Legacy 인터페이스**: 이 v1 인터페이스는 단일 수신자 모델로 수신자마다 한 번씩 요청을 보냅니다. 수신자가 많을 경우 요청 수가 증가하므로 [v2 (Generic)](/ko/push/external-push/external-push-v2)의 다중 수신자 broadcast 모델 사용을 권장합니다
- **메시지 필드 차이**: v1은 `roomName` 등 일부 필드를 포함하지 않으므로, 완전한 채팅방 정보가 필요하면 v2를 사용하시기 바랍니다
- **Webhook 공존**: 이 푸시 callback은 [채팅방 Webhook](/ko/webhook/webhook)과 다른 메커니즘이며, 전자는 푸시 분배에 사용되고 후자는 봇 / 이벤트 리스너에 사용됩니다
- **HTTPS 필수**: 보안을 위해 `PUSH` URL은 반드시 HTTPS를 사용하고 출처 검증(IP 화이트리스트 또는 공유 비밀키)을 설정해야 합니다
- **Payload 형식 참고**: APNs / FCM 내용 조립 시 [푸시 페이로드 형식](/ko/push/push-payload-format)을 참고하세요
