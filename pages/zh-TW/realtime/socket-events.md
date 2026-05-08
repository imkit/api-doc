# Socket 事件

## 概述

當客戶端透過 Socket 連線並通過驗證後(請見 [Socket 連線](/zh-TW/realtime/socket-connection)),即可接收伺服器推送的即時事件。本頁列出所有事件類型與其 payload 格式,供 native app / web 客戶端解析使用。

------

## 事件總覽

| 事件名稱             | 觸發時機                                       | 用途                            |
| -------------------- | ---------------------------------------------- | ------------------------------- |
| `chat message`       | 聊天室收到新訊息                               | 即時顯示訊息、觸發本地通知      |
| `room`               | 聊天室屬性更新(成員、設定等)                 | 更新聊天室列表、成員列表        |
| `lastRead`           | 某位成員更新最後已讀                           | 更新已讀回條 UI                 |
| `typing`             | 某位成員正在輸入                               | 顯示「對方輸入中…」             |
| `ai_streaming`       | AI 訊息分段串流回傳                            | 漸進式顯示 AI 生成內容          |
| `roomPref`           | 用戶自身更新某聊天室偏好                       | 跨裝置同步聊天室偏好            |
| `myPrefChange`       | 用戶自身更新個人偏好                           | 跨裝置同步個人偏好              |
| `myPrefDelete`       | 用戶自身刪除某偏好                             | 跨裝置同步                      |
| `invitation`         | 收到群組邀請                                   | 顯示邀請通知                    |
| `userDeleteMessages` | 用戶自行刪除訊息(限自己看見)                | 從 UI 移除訊息                  |
| `messageDeleted`     | 管理員(super-user)永久刪除訊息              | 全成員從 UI 移除訊息            |

------

## chat message

聊天室有新訊息時觸發。

| 欄位 | 內容             |
| ---- | ---------------- |
| Data | Message 物件     |

**範例 payload**

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

聊天室屬性(成員、名稱、設定等)有更新時觸發。

| 欄位 | 內容        |
| ---- | ----------- |
| Data | 更新後的聊天室物件 |

------

## lastRead

某位聊天室成員呼叫 [`PUT /rooms/:id/lastRead`](/zh-TW/room/room-management/update-last-read) 更新最後已讀後,廣播給該聊天室所有成員。

| 欄位        | 說明                       |
| ----------- | -------------------------- |
| `roomID`    | 聊天室 ID                  |
| `memberID`  | 回報已讀的成員 Client ID   |
| `messageID` | 該成員的最後已讀訊息 ID    |

**範例 payload**

```json
{
  "roomID": "5be660651a71681534245a4e",
  "messageID": "5be7edaced649e42234f0699",
  "memberID": "aaa"
}
```

------

## typing

某位成員正在輸入時觸發,通常用於顯示「對方輸入中…」。

| 欄位      | 說明                       |
| --------- | -------------------------- |
| `room`    | 聊天室 ID                  |
| `message` | 輸入中的內容(可能為片段) |

**範例 payload**

```json
{
  "room": "58871b877390be11d5f1ab30",
  "message": "typing content"
}
```

------

## ai_streaming

接收來自 AI 的串流訊息片段,適用於 AI 助手即時回覆場景。

| 欄位     | 說明              |
| -------- | ----------------- |
| `room`   | 聊天室 ID         |
| `sender` | AI Client ID      |
| `text`   | 訊息片段內容      |

**範例 payload**

```json
{
  "room": "<RoomID>",
  "sender": "<ClientID>",
  "text": "<Message chunk content>"
}
```

------

## roomPref

當前用戶在某裝置上更新某聊天室偏好(如靜音、置頂、隱藏)時,廣播給該用戶的其他連線裝置。

| 欄位 | 說明                  |
| ---- | --------------------- |
| Data | 更新後的聊天室偏好物件 |

**範例 payload**

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

當前用戶在某裝置上更新個人偏好設定時,廣播給該用戶的其他連線裝置。

| 欄位 | 說明                       |
| ---- | -------------------------- |
| Data | 包含 `data` 與 `key` 兩個欄位 |

**範例 payload**

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

當前用戶刪除某項個人偏好時觸發。

| 欄位 | 說明              |
| ---- | ----------------- |
| Data | 被刪除的偏好 key   |

**範例 payload**

```json
"demokey"
```

------

## invitation

收到群組邀請時觸發。

| 欄位 | 說明        |
| ---- | ----------- |
| Data | 邀請物件     |

------

## userDeleteMessages

用戶自行刪除訊息(僅對自己隱藏)時觸發。

| 欄位                              | 說明                                       |
| --------------------------------- | ------------------------------------------ |
| `room`                            | 聊天室 ID                                  |
| `messages`                        | 被刪除的訊息 ID 陣列                       |
| `isUserDeleteAllMessagesInRoom`   | 是否為「刪除聊天室內所有訊息」(boolean)   |

**範例 payload**

```json
{
  "room": "demo-FpOtW6",
  "messages": ["64623ad9f83f7f1a35009d6b"],
  "isUserDeleteAllMessagesInRoom": true
}
```

------

## messageDeleted

管理員(super-user)永久刪除某則訊息時觸發,所有聊天室成員都會收到。

| 欄位         | 說明                                                                 |
| ------------ | -------------------------------------------------------------------- |
| `room`       | 聊天室 ID                                                            |
| `messageID`  | 被刪除的訊息 ID;若為 `_all`,代表聊天室內所有訊息都被永久刪除     |

------

## 注意事項

- **事件名含空格**:`chat message` 是含空格的事件名,monitor 時請完整輸入字串
- **payload 解碼**:若連線時啟用 `encoding: "base64"`,所有事件 payload 都需先 base64 decode 再 `JSON.parse`
- **僅在線時收到**:這些事件只在 socket 連線中才會收到;app 在背景或離線時錯過的事件,需以 [`POST /push/push2clients`](/zh-TW/push/push-to-clients)、[Webhook](/zh-TW/webhook/webhook) 或重連後拉取訊息列表來補齊
- **訊息來源判斷**:`chat message` 的 `sender._id` 等於自己時,代表是自己另一個裝置發出的訊息,UI 上仍應顯示
- **與推播搭配**:行動 app 應同時使用 socket(前景)+ APNs/FCM 推播(背景),避免漏訊息
- **冪等處理**:重連時可能收到先前已處理過的事件,客戶端應以 `_id` 為鍵做去重
