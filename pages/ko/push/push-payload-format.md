# 푸시 페이로드 형식

## 개요

IMKIT이 APNs(iOS)와 FCM(Android) 푸시를 전송할 때의 payload 구조와 내장 로컬라이제이션(localization) 키 매핑을 설명합니다. 네이티브 앱이 원시 푸시를 수신한 후 이 문서에 따라 payload를 파싱하여 추가적인 UI 표시 및 클릭 시 라우팅을 수행할 수 있습니다.

------

## APNs 푸시 형식

```json
{
  "aps": {
    "alert": {
      "loc-key": "im_loc_text",
      "loc-args": ["How do you do?"]
    },
    "sound": "chime.aiff"
  }
}
```

| 필드       | 타입   | 설명                                                                         |
| ---------- | ------ | ---------------------------------------------------------------------------- |
| `alert`    | mixed  | Alert 객체. 문자열 또는 `loc-key`、`loc-args`를 포함하는 객체일 수 있습니다  |
| `loc-key`  | string | 로컬라이제이션 문자열의 키. 형식은 `im_loc_${MessageType}`(전체 목록은 아래 참조) |
| `loc-args` | array  | 로컬라이제이션 문자열의 인수 배열. `$1`은 발신자 nickname, `$2`는 메시지 내용 |

> 참고: [Apple Local and Remote Notification Programming Guide](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html)

------

## FCM(GCM) 푸시 형식

```javascript
{
  collapseKey: "<collapseKey>",
  timeToLive: 3600,
  notification: {
    title: "<title>",
    body: "<body>",
    icon: "<icon>",
    body_loc_key: "im_loc_text",
    body_loc_args: ["How do you do?"],
    badge: 1,
    click_action: "push_chatroom"
  },
  data: {
    "loc-key": "im_loc_text",
    "loc-args": ["How do you do?"],
    type: "<type>",
    payload: { /* 전체 메시지 객체 */ }
  }
}
```

| 영역            | 필드           | 설명                                                |
| --------------- | -------------- | --------------------------------------------------- |
| `notification`  | `title`        | 알림 제목                                           |
| `notification`  | `body`         | 알림 내용                                           |
| `notification`  | `icon`         | 알림 아이콘 URL 또는 리소스 이름                    |
| `notification`  | `body_loc_key` | 로컬라이제이션 문자열 키(형식은 APNs `loc-key`와 동일) |
| `notification`  | `body_loc_args`| 로컬라이제이션 문자열 인수                          |
| `notification`  | `badge`        | 앱 아이콘의 안 읽음 수                              |
| `notification`  | `click_action` | 푸시를 클릭한 후의 Intent action. 기본값은 `push_chatroom` |
| `data`          | `loc-key`      | 위와 동일하며, data-only 푸시 파싱에 사용           |
| `data`          | `loc-args`     | 위와 동일                                           |
| `data`          | `type`         | 푸시 유형(커스텀 분류)                             |
| `data`          | `payload`      | 원시 메시지 객체. 앱 내부에서 처리 가능(예: 페이지 이동) |

------

## 로컬라이제이션 키 목록

message type에 따라 서로 다른 로컬라이제이션 키에 매핑되며, 네이티브 앱은 string resource에서 해당 번역을 매칭할 수 있습니다.

| `loc-key`             | 대응 메시지 유형 / 이벤트 | 예시(한국어)              |
| --------------------- | ------------------- | ------------------------ |
| `im_loc_text`         | 텍스트 메시지       | `$1: $2`(`Alice: 안녕하세요`) |
| `im_loc_image`        | 이미지 메시지       | `$1님이 사진을 보냈습니다` |
| `im_loc_video`        | 동영상 메시지       | `$1님이 동영상을 보냈습니다` |
| `im_loc_audio`        | 음성 메시지         | `$1님이 음성을 보냈습니다` |
| `im_loc_sticker`      | 스티커              | `$1님이 스티커를 보냈습니다` |
| `im_loc_location`     | 위치 메시지         | `$1님이 위치를 공유했습니다` |
| `im_loc_file`         | 파일 메시지         | `$1님이 파일을 보냈습니다` |
| `im_loc_joinRoom`     | 채팅방 입장         | `$1님이 채팅방에 입장했습니다` |
| `im_loc_leaveRoom`    | 채팅방 퇴장         | `$1님이 채팅방을 떠났습니다` |
| `im_loc_addMember`    | 단일 멤버 추가      | `$1님이 $2님을 초대했습니다` |
| `im_loc_addMembers`   | 다중 멤버 추가      | `$1님이 여러 명을 초대했습니다` |
| `im_loc_deleteMember` | 멤버 제거           | `$1님이 $2님을 채팅방에서 내보냈습니다` |
| `im_loc_encrypted`    | 암호화 메시지       | `암호화된 메시지를 받았습니다` |

> 위 표는 일반적인 키이며, 실제 지원되는 키는 메시지 유형에 따라 확장됩니다. 앱에서는 알 수 없는 `loc-key`에 대해 fallback(예: `body` 필드 내용 표시) 처리를 권장합니다.

------

## 파라미터 매핑

`loc-args`의 위치 파라미터:

| 위치  | 내용           |
| ----- | -------------- |
| `$1`  | 발신자 nickname |
| `$2`  | 메시지 내용    |

예를 들어 `loc-key: "im_loc_text"`、`loc-args: ["Alice", "Hello"]`일 때 string resource에 `"%1$@: %2$@"`(iOS) 또는 `"%1$s: %2$s"`(Android)로 설정하면 최종적으로 `Alice: Hello`로 표시됩니다.

------

## 사용 시나리오

### 다국어 앱
- **로컬라이제이션 표시**: 서버에서 보낸 body 문자열을 직접 표시하지 않고 `loc-key`에 따라 앱 내 번역 파일에서 해당 문자열을 가져와 사용자 언어를 자동 적용합니다
- **새 메시지 유형 확장**: 백엔드가 새 메시지 유형을 추가할 때 앱은 string resource에 해당 키만 추가하면 되며 백엔드 푸시 문구를 변경할 필요가 없습니다

### 커스텀 푸시 문구
- **커스텀 알림 문구**: 사용자는 앱 내에서 "상대방이 $1$2를 보냈습니다" 같은 알림을 커스터마이즈할 수 있으며, `loc-args` 순서만 유지하면 됩니다

------

## 참고 사항

- **APNs와 FCM 명명 차이**: APNs는 `loc-key` / `loc-args`를 사용하고, FCM은 `notification` 영역에서 `body_loc_key` / `body_loc_args`를 사용하지만 `data` 영역에서는 여전히 `loc-key` / `loc-args`를 유지하므로 파싱 시 명확히 구분해야 합니다
- **알 수 없는 키 fallback**: string resource에 없는 `loc-key`를 만나면 FCM의 `body` 또는 APNs의 평문 alert를 백업으로 표시하는 것을 권장합니다
- **푸시 접기**: Android의 `collapseKey`는 같은 유형 메시지를 합쳐서 표시하는 데 사용되며, iOS는 `apns-collapse-id`(IMKIT 플랫폼 측에서 설정)에 대응됩니다
- **VoIP 푸시**: 음성/영상 수신 통화는 [`type: "ios-voip"`](/ko/push/device-subscription/subscribe-device)로 등록한 토큰을 사용해야 하며, payload는 PushKit을 직접 통과하므로 이 형식을 거치지 않습니다
- **사일런트 푸시**: `notification` 영역에 `title` / `body` 없이 `data`만 포함된 푸시는 사일런트 푸시이며, 백그라운드에서 안 읽음 수를 동기화하는 데 사용할 수 있습니다
- **`/push/push2clients`와의 관계**: [커스텀 푸시 API](/ko/push/push-to-clients)도 동일한 형식으로 전송되므로 네이티브 앱의 파싱 로직을 공유할 수 있습니다
