# 외부 푸시 서비스 v2 (Generic)

## 개요

`PUSH_GENERIC`은 v1 이후에 제공되는 범용 외부 푸시 callback입니다. v1이 "수신자 한 명당 한 번의 요청"을 사용하는 것과 달리, v2는 **broadcast 모델**을 사용합니다. 동일한 메시지를 한 번의 요청에 `pushToClients` 수신자 배열로 함께 전달하며, 사용자의 서비스가 각 수신자에 대한 payload 조립과 badge 계산을 수행합니다. 그룹 메시지의 경우 외부 요청 수가 크게 줄어듭니다.

> **중요**: Generic Push Service는 수신자(채팅방 멤버)의 badge 계산을 직접 처리해야 합니다. IMKIT은 이 callback에서 각 수신자의 badge 값을 제공하지 않습니다.

------

## 설정 방법

IMKIT 플랫폼 관리 콘솔에서 환경 변수를 설정합니다:

```
PUSH_GENERIC=https://your-server.example.com/imkit/push/v2
```

설정 후, 푸시가 필요한 모든 메시지 이벤트에 대해 IMKIT은 동일한 메시지를 한 번의 요청으로 이 엔드포인트에 보내면서 푸시가 필요한 모든 Client ID를 함께 나열합니다.

------

## 요청 형식

### Method

`POST`

### Headers

| 파라미터       | 타입   | 필수 | 설명                              |
| -------------- | ------ | ---- | --------------------------------- |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

### Request Body

| 필드            | 타입     | 설명                                                                                  |
| --------------- | -------- | ------------------------------------------------------------------------------------- |
| 메시지 필드     | mixed    | 평탄화된 메시지 객체([Message Model](/ko/realtime/socket-events#chat-message)을 따름)                                |
| `roomName`      | string   | 채팅방 이름(커스텀 표시 이름. 푸시 제목에 사용 가능)                                  |
| `pushToClients` | string[] | 해당 메시지를 푸시해야 하는 수신자 Client ID 배열                                     |

------

## 예시 요청

```javascript
{
  "_id": "5dd51a4f21841443cfd3090d",
  "message": "lala",
  "room": "demo-room",
  "roomName": "Demo Room",
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
  "pushToClients": ["aaa", "bbb"]
}
```

------

## 서비스가 수행해야 할 일

이 요청을 수신한 후, Generic Push Service는 다음을 수행해야 합니다:

1. **badge 계산**: `pushToClients` 배열의 각 Client에 대해 자체 데이터 소스에서 총 안 읽음 수를 계산합니다(IMKIT은 이 callback에서 badge를 제공하지 않음)
2. **기기 토큰 조회**: Client ID에 따라 해당 사용자의 APNs / FCM 토큰을 조회합니다(자체 저장하거나, IMKIT의 [`/me/subscribe`](/ko/push/device-subscription/subscribe-device) 등록 데이터와 동기화 가능)
3. **payload 조립**: [푸시 페이로드 형식](/ko/push/push-payload-format)에 따라 조립하며 IMKIT의 `im_loc_*` 로컬라이제이션 키를 사용할 수 있습니다
4. **APNs / FCM으로 전송**: 푸시 서비스 제공자 API를 호출하여 푸시를 완료합니다

------

## 응답

서비스는 `200 OK`(내용은 자유)로 응답해야 하며, IMKIT은 응답 내용에 따라 후속 동작을 수행하지 않습니다.

------

## 사용 시나리오

### 그룹 푸시 최적화
- **단일 요청 + 다중 수신자**: 50명 그룹에서 새 메시지가 발생할 때 IMKIT은 callback을 1번만 보내고, 사용자의 서비스가 50명의 토큰을 한 번에 처리하므로 네트워크 비용이 감소합니다

### 고급 푸시 전략
- **사용자 환경설정에 따른 분기**: 일부 사용자가 채팅방을 음소거했거나 온라인 상태인 경우, 자체 서비스에서 푸시 여부를 결정할 수 있습니다
- **A/B 테스팅**: 서로 다른 사용자 그룹에 다른 문구 / 제목을 푸시할 수 있습니다

### 통합 badge 계산
- **크로스 비즈니스 badge**: 앱이 채팅 외에도 다른 알림(주문, 이벤트 등)을 가지고 있다면, 자체 서비스에서 총 badge를 통합 계산할 수 있습니다

------

## 참고 사항

- **Badge 직접 관리**: 이는 v2와 v1의 가장 큰 차이점입니다 — IMKIT이 더 이상 badge를 계산해 주지 않으므로 반드시 직접 구현해야 합니다
- **완전한 메시지 필드**: v2는 `roomName` 등 더 완전한 정보를 제공하며, 푸시 문구로 "<채팅방 이름> · <발신자>: <내용>"을 표시할 수 있습니다
- **v1과 상호 배타**: `PUSH`와 `PUSH_GENERIC`을 동시에 설정할 경우 동작은 IMKIT 플랫폼 측 설정을 따르며, 둘 중 하나만 활성화하는 것을 권장합니다
- **HTTPS 필수**: `PUSH_GENERIC` URL은 반드시 HTTPS를 사용하고 출처 검증을 설정해야 합니다
- **실패 처리**: 사용자의 서비스가 일시적인 오류로 처리할 수 없는 경우 자체적으로 재시도를 스케줄해야 하며, IMKIT은 자동으로 재전송하지 않습니다
- **Payload 형식 참고**: 자세한 필드와 로컬라이제이션 키는 [푸시 페이로드 형식](/ko/push/push-payload-format)을 참고하세요
