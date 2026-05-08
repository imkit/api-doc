# Socket 이벤트

## 개요

클라이언트가 Socket 연결을 통해 인증을 통과한 후([Socket 연결](/ko/realtime/socket-connection) 참고), 서버에서 푸시되는 실시간 이벤트를 수신할 수 있습니다. 이 페이지는 모든 이벤트 유형과 payload 형식을 나열하여 네이티브 앱 / 웹 클라이언트가 파싱하여 사용할 수 있도록 합니다.

------

## 이벤트 개요

| 이벤트 이름          | 트리거 시점                                    | 용도                            |
| -------------------- | ---------------------------------------------- | ------------------------------- |
| `chat message`       | 채팅방에서 새 메시지 수신                      | 메시지 실시간 표시, 로컬 알림 트리거 |
| `room`               | 채팅방 속성 업데이트(멤버, 설정 등)            | 채팅방 목록, 멤버 목록 업데이트 |
| `lastRead`           | 특정 멤버가 마지막 읽음 업데이트               | 읽음 확인 UI 업데이트           |
| `typing`             | 특정 멤버가 입력 중                            | "상대방 입력 중..." 표시        |
| `ai_streaming`       | AI 메시지 분할 스트리밍 반환                   | AI 생성 콘텐츠 점진적 표시      |
| `roomPref`           | 사용자 자신이 특정 채팅방 환경설정 업데이트    | 크로스 디바이스 채팅방 환경설정 동기화 |
| `myPrefChange`       | 사용자 자신이 개인 환경설정 업데이트           | 크로스 디바이스 개인 환경설정 동기화 |
| `myPrefDelete`       | 사용자 자신이 특정 환경설정 삭제               | 크로스 디바이스 동기화          |
| `invitation`         | 그룹 초대 수신                                 | 초대 알림 표시                  |
| `userDeleteMessages` | 사용자 자신이 메시지 삭제(본인에게만 보임)    | UI에서 메시지 제거              |
| `messageDeleted`     | 관리자(super-user)가 메시지 영구 삭제         | 모든 멤버 UI에서 메시지 제거    |

------

## chat message

채팅방에 새 메시지가 있을 때 트리거됩니다.

| 필드 | 내용             |
| ---- | ---------------- |
| Data | Message 객체     |

**예시 payload**

```json
{
  "_id": "5c1ddf2d1536bbb6c49f7cfe",
  "message": "Bonjour 2",
  "room": "demo-room",
  "sender": {
    "_id": "sss",
    "nickname": "Desirae",
    "isRobot": false,
    "avatarUrl": "",
    "id": "sss"
  },
  "messageType": "text",
  "appID": "SampleApp",
  "messageTime": "2018-12-22T06:52:29.380Z",
  "messageTimeMS": 1545461549380,
  "id": "5c1ddf2d1536bbb6c49f7cfe"
}
```

------

## room

채팅방 속성(멤버, 이름, 설정 등)이 업데이트될 때 트리거됩니다.

| 필드 | 내용              |
| ---- | ----------------- |
| Data | 업데이트된 채팅방 객체 |

------

## lastRead

특정 채팅방 멤버가 [`PUT /rooms/:id/lastRead`](/ko/room/room-management/update-last-read)를 호출하여 마지막 읽음을 업데이트한 후, 해당 채팅방의 모든 멤버에게 브로드캐스트됩니다.

| 필드        | 설명                       |
| ----------- | -------------------------- |
| `roomID`    | 채팅방 ID                  |
| `memberID`  | 읽음을 보고한 멤버의 Client ID |
| `messageID` | 해당 멤버의 마지막 읽음 메시지 ID |

**예시 payload**

```json
{
  "roomID": "5be660651a71681534245a4e",
  "messageID": "5be7edaced649e42234f0699",
  "memberID": "aaa"
}
```

------

## typing

특정 멤버가 입력 중일 때 트리거되며, 일반적으로 "상대방 입력 중..." 표시에 사용됩니다.

| 필드      | 설명                       |
| --------- | -------------------------- |
| `room`    | 채팅방 ID                  |
| `message` | 입력 중인 내용(부분일 수 있음) |

**예시 payload**

```json
{
  "room": "58871b877390be11d5f1ab30",
  "message": "typing content"
}
```

------

## ai_streaming

AI로부터 스트리밍 메시지 조각을 수신하며, AI 어시스턴트의 실시간 응답 시나리오에 적합합니다.

| 필드     | 설명              |
| -------- | ----------------- |
| `room`   | 채팅방 ID         |
| `sender` | AI Client ID      |
| `text`   | 메시지 조각 내용  |

**예시 payload**

```json
{
  "room": "<RoomID>",
  "sender": "<ClientID>",
  "text": "<Message chunk content>"
}
```

------

## roomPref

현재 사용자가 특정 기기에서 어떤 채팅방의 환경설정(예: 음소거, 상단 고정, 숨김)을 업데이트할 때, 해당 사용자의 다른 연결된 기기로 브로드캐스트됩니다.

| 필드 | 설명                  |
| ---- | --------------------- |
| Data | 업데이트된 채팅방 환경설정 객체 |

**예시 payload**

```json
{
  "room": "demo-room",
  "folder": "Some-Folder",
  "hidden": false,
  "muted": false,
  "sticky": false,
  "tags": ["demo", "sample"]
}
```

------

## myPrefChange

현재 사용자가 특정 기기에서 개인 환경설정을 업데이트할 때, 해당 사용자의 다른 연결된 기기로 브로드캐스트됩니다.

| 필드 | 설명                       |
| ---- | -------------------------- |
| Data | `data`와 `key` 두 필드를 포함 |

**예시 payload**

```json
{
  "data": {
    "foo": "bar",
    "folders": {
      "folder 1": { "rooms": ["aaabbb", "cccddd"] }
    }
  },
  "key": "demokey"
}
```

------

## myPrefDelete

현재 사용자가 어떤 개인 환경설정을 삭제할 때 트리거됩니다.

| 필드 | 설명              |
| ---- | ----------------- |
| Data | 삭제된 환경설정 key |

**예시 payload**

```json
"demokey"
```

------

## invitation

그룹 초대를 수신할 때 트리거됩니다.

| 필드 | 설명        |
| ---- | ----------- |
| Data | 초대 객체   |

------

## userDeleteMessages

사용자가 자신의 메시지를 삭제할 때(본인에게만 숨김) 트리거됩니다.

| 필드                              | 설명                                       |
| --------------------------------- | ------------------------------------------ |
| `room`                            | 채팅방 ID                                  |
| `messages`                        | 삭제된 메시지 ID 배열                      |
| `isUserDeleteAllMessagesInRoom`   | "채팅방 내 모든 메시지 삭제" 여부 (boolean) |

**예시 payload**

```json
{
  "room": "demo-FpOtW6",
  "messages": ["64623ad9f83f7f1a35009d6b"],
  "isUserDeleteAllMessagesInRoom": true
}
```

------

## messageDeleted

관리자(super-user)가 어떤 메시지를 영구 삭제할 때 트리거되며, 채팅방의 모든 멤버가 수신합니다.

| 필드         | 설명                                                                 |
| ------------ | -------------------------------------------------------------------- |
| `room`       | 채팅방 ID                                                            |
| `messageID`  | 삭제된 메시지 ID. `_all`이면 채팅방 내 모든 메시지가 영구 삭제되었음을 의미 |

------

## 참고 사항

- **이벤트 이름에 공백 포함**: `chat message`는 공백을 포함한 이벤트 이름이며, 모니터링 시 문자열을 정확히 입력해야 합니다
- **payload 디코딩**: 연결 시 `encoding: "base64"`를 활성화한 경우 모든 이벤트 payload는 먼저 base64 decode 후 `JSON.parse`해야 합니다
- **온라인일 때만 수신**: 이러한 이벤트는 socket이 연결되어 있을 때만 수신됩니다. 앱이 백그라운드 또는 오프라인 상태일 때 놓친 이벤트는 [`POST /push/push2clients`](/ko/push/push-to-clients), [Webhook](/ko/webhook/webhook), 또는 재연결 후 메시지 목록을 가져와 보완해야 합니다
- **메시지 출처 판별**: `chat message`의 `sender._id`가 자기 자신과 같으면 본인의 다른 기기에서 보낸 메시지를 의미하며, UI에는 여전히 표시해야 합니다
- **푸시와의 결합**: 모바일 앱은 socket(포그라운드)과 APNs/FCM 푸시(백그라운드)를 동시에 사용하여 메시지 누락을 방지해야 합니다
- **멱등 처리**: 재연결 시 이전에 처리한 이벤트를 다시 받을 수 있으므로, 클라이언트는 `_id`를 키로 중복 제거해야 합니다
