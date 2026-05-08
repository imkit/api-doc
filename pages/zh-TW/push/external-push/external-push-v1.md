# 外部推播服務 v1(Legacy)

## 概述

當您希望以自家 APNs / FCM 服務發送推播(而非使用 IMKIT 內建推播管線)時,可在平台後台設定 `PUSH` 環境變數指向您自家的 HTTPS 端點。每當聊天室產生新訊息且需要推播時,IMKIT 會以 HTTP POST 將「壓平後的訊息物件」發送到您的端點,由您自行轉發到 APNs / FCM。

> **此為 legacy v1 介面**。新建案請優先使用 [外部推播服務 v2(Generic)](/zh-TW/push/external-push/external-push-v2),v2 提供更完整的訊息欄位與多收件人 broadcast 模型。

------

## 設定方式

於 IMKIT 平台後台設定環境變數:

```
PUSH=https://your-server.example.com/imkit/push
```

設定後,凡是有需要推播的訊息事件,IMKIT 都會以 `POST` 呼叫此 URL。

------

## 請求格式

### Method

`POST`

### Headers

| 參數           | 類型   | 必填 | 說明                              |
| -------------- | ------ | ---- | --------------------------------- |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

### Request Body

每次只針對一位收件者發送一個請求。

| 欄位       | 類型   | 說明                                                                |
| ---------- | ------ | ------------------------------------------------------------------- |
| 訊息欄位   | mixed  | 壓平後的訊息物件(沿用 [Message Model](/zh-TW/realtime/socket-events#chat-message))   |
| `alert`    | string | 已組裝好的 APNs / FCM Alert 文字,可直接送往推播服務商              |
| `toClient` | string | 收件者 Client ID                                                    |
| `badge`    | number | 該收件者目前的總未讀訊息數,可直接帶入 APNs `badge` 或 FCM `badge`  |

------

## 範例請求

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

## 回應

您的服務應回傳 `200 OK`(內容不限),IMKIT 不會根據回應內容做後續動作。

------

## 使用場景

### 既有推播服務整合
- **沿用自家推播**:若客戶已有現成的 APNs / FCM 推播服務,可直接接 IMKIT 的訊息事件而不需改動原有流程

### 客製化文案
- **自訂 alert 內容**:在自家服務內依 `messageType`、`sender`、`message` 重組推播文案,完全不受 IMKIT 內建格式限制

### 多通道推播
- **同時推 APNs/FCM/Email/SMS**:在自家服務做訊息分流,將同一筆事件同時推到不同通道

------

## 注意事項

- **Legacy 介面**:此 v1 介面為單收件者模型,每位收件者發一次請求;若收件者眾多,請求量會放大,建議使用 [v2(Generic)](/zh-TW/push/external-push/external-push-v2) 的多收件者 broadcast 模型
- **訊息欄位差異**:v1 不包含 `roomName` 等部分欄位,若需完整聊天室資訊,請改用 v2
- **Webhook 並存**:此推播 callback 與 [聊天室 Webhook](/zh-TW/webhook/webhook) 是不同的機制,前者用於推播分發,後者用於機器人 / 事件監聽
- **HTTPS 必要**:基於資安考量,`PUSH` URL 必須使用 HTTPS 並設定來源驗證(IP 白名單或共享密鑰)
- **Payload 格式參考**:組裝 APNs / FCM 內容時,可參考 [推播 Payload 格式](/zh-TW/push/push-payload-format)
