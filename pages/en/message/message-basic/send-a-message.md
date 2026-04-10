# 發送訊息

## 概述

透過平台管理 API 向指定聊天室發送訊息。可指定發送者身分，適用於系統通知、機器人訊息、後端自動化等場景。

------

## API 端點

### 發送聊天室訊息

以指定發送者的身分，向指定聊天室發送訊息。

```http
POST /messages
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | 訊息內容 |
| `messageType` | string | ✅ | 訊息類型（如 `"text"`、`"image"`、`"announcement"` 等） |
| `room` | string | ✅ | 聊天室 ID |
| `sender` | string | ✅ | 發送者用戶 ID |
| `push` | boolean | ❌ | 是否推播通知給聊天室成員，預設為 `true` |
| `skipTotalBadge` | boolean | ❌ | 是否跳過計算發送者的總未讀數，預設為 `false` |
| `mentions` | array[string] | ❌ | 提及的用戶 ID 陣列 |

#### 範例請求

**發送文字訊息**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "system",
    message: "歡迎加入專案討論群！",
    messageType: "text",
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**發送公告訊息**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "admin",
    message: "系統將於今晚 22:00 進行維護",
    messageType: "announcement",
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**發送帶提及的訊息**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "user-a",
    message: "請 @user-b 確認這份文件",
    messageType: "text",
    mentions: ["user-b"],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**發送訊息但不推播**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages",
  {
    room: "project-room-001",
    sender: "system",
    message: "背景任務完成",
    messageType: "text",
    push: false,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### cURL 範例

```bash
curl -X "POST" "https://your-app.imkit.io/messages" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "room": "project-room-001",
  "sender": "system",
  "message": "歡迎加入！",
  "messageType": "text"
}'
```

#### Response

**成功回應（200 OK）**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `RC` | number | 回應代碼（0 表示成功） |
| `RM` | string | 回應訊息 |
| `result` | object | 發送的訊息資料 |

**訊息物件結構**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `_id` | string | 訊息唯一識別碼 |
| `room` | string | 所屬聊天室 ID |
| `message` | any | 訊息內容 |
| `messageType` | string | 訊息類型 |
| `sender` | string | 發送者 ID |
| `appID` | string | 應用程式識別碼 |
| `messageTimeMS` | number | 訊息發送時間（毫秒時間戳） |
| `updatedAtMS` | number | 訊息更新時間（毫秒時間戳） |
| `createdAtMS` | number | 訊息建立時間（毫秒時間戳） |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58bf8f1dc3b24c04d19d9add",
    "room": "project-room-001",
    "message": "歡迎加入專案討論群！",
    "messageType": "text",
    "sender": "system",
    "appID": "SampleApp",
    "messageTimeMS": 1488949021290,
    "updatedAtMS": 1488949021290,
    "createdAtMS": 1488949021290
  }
}
```

#### 錯誤回應

**401 Unauthorized** — 認證失敗

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired"
  }
}
```

**404 Not Found** — 聊天室不存在

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "The specified room does not exist"
  }
}
```

------

## 使用場景

### 系統通知
- **系統公告**：由後端服務自動發送系統公告或維護通知
- **狀態更新**：訂單狀態變更時自動通知相關用戶

### 機器人訊息
- **自動回覆**：透過 API 實現聊天機器人功能
- **智能助手**：搭配 Webhook 接收訊息並回覆

### 應用整合
- **第三方整合**：將外部系統的事件以訊息形式發送到聊天室
- **工作流程**：在業務流程的關鍵節點插入聊天室通知

------

## 注意事項

- **發送者身分**：`sender` 必須為系統中已存在的用戶 ID
- **推播控制**：透過 `push` 參數控制是否推播，適合靜默通知場景
- **訊息類型**：`messageType` 為自訂欄位，可根據應用需求設定任意類型
- **提及功能**：`mentions` 陣列中的用戶 ID 會收到提及通知
- **與 Socket 的區別**：此 API 適用於後端服務發送訊息，一般用戶聊天由 SDK 透過 Socket 連線處理
