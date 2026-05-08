# 推播 Payload 格式

## 概述

說明 IMKIT 在送出 APNs(iOS)與 FCM(Android)推播時的 payload 結構,以及內建的本地化(localization)key 對照表。Native app 收到原始推播後,可依此文件解析 payload,做進一步的 UI 顯示與點擊跳轉。

------

## APNs 推播格式

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

| 欄位       | 類型   | 說明                                                                         |
| ---------- | ------ | ---------------------------------------------------------------------------- |
| `alert`    | mixed  | Alert 物件,可為字串或包含 `loc-key`、`loc-args` 的物件                      |
| `loc-key`  | string | 本地化字串的鍵值,格式為 `im_loc_${MessageType}`(完整清單見下方)           |
| `loc-args` | array  | 本地化字串的參數陣列。`$1` 為發送者 nickname,`$2` 為訊息內容                |

> 參考:[Apple Local and Remote Notification Programming Guide](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html)

------

## FCM(GCM)推播格式

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
    payload: { /* 完整訊息物件 */ }
  }
}
```

| 區塊            | 欄位           | 說明                                                |
| --------------- | -------------- | --------------------------------------------------- |
| `notification`  | `title`        | 通知標題                                            |
| `notification`  | `body`         | 通知內容                                            |
| `notification`  | `icon`         | 通知圖示 URL 或資源名稱                             |
| `notification`  | `body_loc_key` | 本地化字串鍵值(格式同 APNs `loc-key`)             |
| `notification`  | `body_loc_args`| 本地化字串參數                                      |
| `notification`  | `badge`        | 應用程式圖示上的未讀數                              |
| `notification`  | `click_action` | 點擊推播後的 Intent action,預設為 `push_chatroom`  |
| `data`          | `loc-key`      | 同上,用於 data-only 推播解析                       |
| `data`          | `loc-args`     | 同上                                                |
| `data`          | `type`         | 推播類型(自訂分類)                                |
| `data`          | `payload`      | 原始訊息物件,可在 app 內部處理(例如導頁)         |

------

## 本地化 key 清單

依 message type 對應到不同的本地化 key,native app 可在 string resource 中對應翻譯。

| `loc-key`             | 對應訊息類型 / 事件 | 範例(中文)             |
| --------------------- | ------------------- | ------------------------ |
| `im_loc_text`         | 文字訊息            | `$1: $2`(`Alice: 你好`) |
| `im_loc_image`        | 圖片訊息            | `$1 傳送了一張圖片`      |
| `im_loc_video`        | 影片訊息            | `$1 傳送了一段影片`      |
| `im_loc_audio`        | 語音訊息            | `$1 傳送了一段語音`      |
| `im_loc_sticker`      | 貼圖                | `$1 傳送了一張貼圖`      |
| `im_loc_location`     | 位置訊息            | `$1 分享了位置`          |
| `im_loc_file`         | 檔案訊息            | `$1 傳送了一個檔案`      |
| `im_loc_joinRoom`     | 加入聊天室          | `$1 加入了聊天室`        |
| `im_loc_leaveRoom`    | 離開聊天室          | `$1 離開了聊天室`        |
| `im_loc_addMember`    | 新增單一成員        | `$1 邀請了 $2`           |
| `im_loc_addMembers`   | 新增多個成員        | `$1 邀請了多人`          |
| `im_loc_deleteMember` | 移除成員            | `$1 將 $2 移出聊天室`    |
| `im_loc_encrypted`    | 加密訊息            | `您收到一則加密訊息`     |

> 上表為常見 key,實際支援的 key 會隨訊息類型擴充。建議 app 端對未知的 `loc-key` 採取 fallback(例如顯示 `body` 欄位內容)。

------

## 參數對照

`loc-args` 的位置參數:

| 位置  | 內容           |
| ----- | -------------- |
| `$1`  | 發送者 nickname |
| `$2`  | 訊息內容       |

例如 `loc-key: "im_loc_text"`、`loc-args: ["Alice", "Hello"]`,在 string resource 設定為 `"%1$@: %2$@"`(iOS)或 `"%1$s: %2$s"`(Android),最終會顯示 `Alice: Hello`。

------

## 使用場景

### 多語系 app
- **本地化顯示**:不直接顯示伺服器送來的 body 字串,而是依 `loc-key` 從 app 內的翻譯檔取對應字串,自動套用使用者語系
- **新訊息類型擴充**:後端新增訊息類型時,app 只要在 string resource 加對應 key,不必改後端推播文案

### 客製化推播文案
- **自訂提醒語**:使用者可在 app 內客製化「對方傳了 $1$2」之類的提示,只要保持 `loc-args` 順序即可

------

## 注意事項

- **APNs 與 FCM 命名差異**:APNs 用 `loc-key` / `loc-args`,FCM 在 `notification` 區塊改用 `body_loc_key` / `body_loc_args`,但 `data` 區塊仍維持 `loc-key` / `loc-args`,解析時要分清楚
- **未知 key fallback**:遇到 string resource 中沒有的 `loc-key`,建議顯示 FCM 的 `body` 或 APNs 的純文字 alert 作為備援
- **推播折疊**:Android 的 `collapseKey` 用於同類型訊息合併顯示;iOS 對應 `apns-collapse-id`(由 IMKIT 平台側設定)
- **VoIP 推播**:語音/視訊來電應使用 [`type: "ios-voip"`](/zh-TW/push/device-subscription/subscribe-device) 註冊的 token,payload 會直接走 PushKit,不經過此格式
- **靜音推播**:在 `notification` 區塊不帶 `title` / `body`、僅有 `data` 的推播為靜音推播,可用於背景同步未讀數
- **與 `/push/push2clients` 的關係**:[自訂推播 API](/zh-TW/push/push-to-clients) 同樣會以此格式送出,因此 native app 端的解析邏輯可一份共用
