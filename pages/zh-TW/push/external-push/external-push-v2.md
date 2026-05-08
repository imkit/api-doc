# 外部推播服務 v2(Generic)

## 概述

`PUSH_GENERIC` 是 v1 之後的通用版外部推播 callback。相較 v1 採「每位收件者一次請求」,v2 採 **broadcast 模型**:同一封訊息以一個請求帶上 `pushToClients` 收件者陣列,由您的服務自行對每位收件者組裝 payload 並計算 badge。對於群組訊息,大幅減少對外請求數量。

> **重要**:Generic Push Service 必須由您自行處理收件者(聊天室成員)的 badge 計數,IMKIT 不會在這個 callback 提供每位收件者的 badge 數值。

------

## 設定方式

於 IMKIT 平台後台設定環境變數:

```
PUSH_GENERIC=https://your-server.example.com/imkit/push/v2
```

設定後,凡是有推播需求的訊息事件,IMKIT 會將同一筆訊息以一個請求發送至此端點,並列出所有需推播的 Client ID。

------

## 請求格式

### Method

`POST`

### Headers

| 參數           | 類型   | 必填 | 說明                              |
| -------------- | ------ | ---- | --------------------------------- |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

### Request Body

| 欄位            | 類型     | 說明                                                                                  |
| --------------- | -------- | ------------------------------------------------------------------------------------- |
| 訊息欄位        | mixed    | 壓平後的訊息物件(沿用 [Message Model](/zh-TW/realtime/socket-events#chat-message))                                |
| `roomName`      | string   | 聊天室名稱(自訂顯示名,可用於推播標題)                                              |
| `pushToClients` | string[] | 該訊息需推播的收件者 Client ID 陣列                                                   |

------

## 範例請求

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

## 您的服務應做的事

收到此請求後,Generic Push Service 應:

1. **計算 badge**:對 `pushToClients` 陣列中每位 Client,從您自家資料源計算其總未讀數(IMKIT 不在此 callback 提供 badge)
2. **取裝置 token**:依 Client ID 查出該用戶的 APNs / FCM token(可由您自行儲存,或透過 IMKIT 的 [`/me/subscribe`](/zh-TW/push/device-subscription/subscribe-device) 註冊資料同步)
3. **組 payload**:依 [推播 Payload 格式](/zh-TW/push/push-payload-format) 組裝,可使用 IMKIT 的 `im_loc_*` 本地化 key
4. **發送到 APNs / FCM**:呼叫推播服務商 API 完成推送

------

## 回應

您的服務應回傳 `200 OK`(內容不限),IMKIT 不會根據回應內容做後續動作。

------

## 使用場景

### 群組推播優化
- **單次請求 + 多收件者**:50 人群組產生新訊息時,IMKIT 只發 1 次 callback,由您的服務一次處理 50 位 token,降低網路成本

### 進階推播策略
- **依用戶偏好分流**:某些用戶設定 mute 該聊天室、某些用戶在線中,可在您的服務內自行決定是否推播
- **A/B testing**:對不同用戶群推送不同文案 / 標題

### 集中式 badge 計數
- **跨業務 badge**:若您的 app 除了聊天還有其他通知(訂單、活動等),可在自家服務統一計算總 badge

------

## 注意事項

- **Badge 自管**:這是 v2 與 v1 最大差別 — IMKIT 不再幫您算 badge,請務必自行實作
- **訊息欄位完整**:v2 提供 `roomName` 等較完整資訊,推播文案可顯示「<聊天室名稱> · <發送者>:<內容>」
- **與 v1 互斥**:同時設定 `PUSH` 與 `PUSH_GENERIC` 時,行為以 IMKIT 平台側設定為準,建議只擇一啟用
- **HTTPS 必要**:`PUSH_GENERIC` URL 必須使用 HTTPS 並設定來源驗證
- **失敗處理**:您的服務若因暫時性錯誤無法處理,應自行排程重試;IMKIT 不會自動重送
- **Payload 格式參考**:詳細欄位與本地化 key 請見 [推播 Payload 格式](/zh-TW/push/push-payload-format)
