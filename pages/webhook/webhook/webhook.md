# Webhook

## 概述

Webhook 功能允許您註冊特定的 URL 端點來接收聊天室的即時訊息和事件通知。當聊天室中發生特定事件（如新訊息、成員加入、成員離開等）時，系統會自動向您註冊的 Webhook URL 發送 POST 請求，包含相關的事件資料。此功能適用於建立機器人、自動化處理、推播通知系統等應用場景。

------

## API 端點

### 註冊 Webhook

您可以為每個聊天室註冊 Webhook URL 來接收該聊天室的訊息和事件。

Webhook 設定請參考聊天室模型的 webhook 屬性：
https://github.com/FUNTEKco/chat-server-document/wiki/Model#room

------

## Webhook 接收資料格式

當聊天室中發生事件時，系統會向您註冊的 Webhook URL 發送 POST 請求，包含以下 JSON 格式的資料：

### 基本資料結構

| 參數       | 類型   | 說明                                                                          |
| ---------- | ------ | ----------------------------------------------------------------------------- |
| `appID`    | string | 應用程式識別碼                                                                |
| `clientID` | string | 發送者 ID                                                                     |
| `roomID`   | string | 事件發生的聊天室 ID                                                           |
| `event`    | string | 事件類型                                                                      |
| `botState` | string | 聊天室當前的機器人狀態（若您的機器人實作為有限狀態機，可根據狀態和訊息決定反應） |
| `data`     | object | 發送到聊天室的訊息或事件資料                                                  |

------

## 事件類型

### 加入聊天室事件

當用戶加入聊天室時觸發此事件。

**事件類型**：`JOIN_ROOM`

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

### 新增成員事件

當聊天室新增成員時觸發此事件。

**事件類型**：`ADD_MEMBERS`

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

### 移除成員事件

當聊天室移除成員時觸發此事件。

**事件類型**：`DELETE_MEMBERS`

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

### 訊息事件

當聊天室收到新訊息時觸發此事件。

**事件類型**：`MESSAGE`

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

## Webhook 回應格式

您的 Webhook 服務可以回傳 JSON 格式的回應來控制機器人行為和發送訊息。

### 回應資料結構

| 參數         | 類型    | 必填 | 說明                                                           |
| ------------ | ------- | ---- | -------------------------------------------------------------- |
| `senderID`   | string  | ❌    | 指定發送者 ID 來回覆訊息或發送訊息到聊天室                     |
| `toBotState` | string  | ❌    | 將聊天室轉換到指定的機器人狀態，若要保持當前狀態請指定當前狀態 |
| `data`       | message | ❌    | 回覆訊息內容                                                   |

### 範例回應

**基本回應**（不執行任何動作）

```json
{
  "toBotState": null,
  "data": null
}
```

**機器人回覆訊息**

```json
{
  "senderID": "robot001",
  "toBotState": "active",
  "data": {
    "message": "您好！我是機器人助手，有什麼可以幫助您的嗎？",
    "messageType": "text"
  }
}
```

------

## 使用場景

### 機器人開發
- **自動回覆**：根據收到的訊息內容自動回覆相應訊息
- **狀態管理**：實作有限狀態機來管理對話流程
- **指令處理**：解析用戶指令並執行相應動作

### 通知系統
- **自訂推播**：根據特定事件發送客製化推播通知
- **即時監控**：監控聊天室活動並觸發相應處理
- **事件記錄**：記錄重要事件用於分析或稽核

### 系統整合
- **第三方服務**：將聊天事件整合到其他系統或服務
- **資料同步**：將聊天資料同步到外部資料庫或系統
- **工作流程**：觸發自動化工作流程和業務邏輯

### 內容管理
- **訊息過濾**：自動檢測和處理不當內容
- **內容分析**：分析訊息內容進行情感分析或關鍵字提取
- **智能助手**：提供智能問答或客服功能

------

## 注意事項

- **HTTP POST**：所有 Webhook 請求都是 HTTP POST 方法
- **JSON 格式**：請求和回應都使用 JSON 格式
- **即時性**：Webhook 會在事件發生時立即觸發
- **可靠性**：建議實作重試機制和錯誤處理
- **安全性**：建議驗證請求來源和實作適當的安全措施
- **效能考量**：Webhook 端點應該快速回應避免超時
- **狀態管理**：機器人狀態可用於實作複雜的對話邏輯
- **回應格式**：不正確的回應格式可能導致機器人功能異常
