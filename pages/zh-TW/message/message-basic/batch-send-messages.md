# 批次發送訊息

## 概述

透過平台管理 API 一次發送訊息到多個聊天室或多位用戶。支援樣板變數替換，適用於廣播通知、行銷推送、系統公告等場景。

------

## API 端點

### 批次發送訊息

將訊息發送到多個聊天室或用戶的一對一聊天室。

```http
POST /messages/batch
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | 訊息內容，支援 `$pattern$` 樣板替換 |
| `messageType` | string | ✅ | 訊息類型（如 `"text"`） |
| `sender` | string | ❌ | 指定發送者 ID（僅管理員可用） |
| `push` | boolean | ❌ | 是否啟用推播通知，預設為 `false` |
| `skipTotalBadge` | boolean | ❌ | 跳過計算發送者的總未讀數，預設為 `false` |
| `paras` | array[object] | ✅ | 接收者參數陣列 |

**接收者參數物件**

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `receiver` | string | ❌ | 接收者用戶 ID（發送至一對一聊天室） |
| `room` | string | ❌ | 聊天室 ID（若指定，`receiver` 會被忽略） |
| `$pattern$` | string | ❌ | 樣板變數的替換值 |

#### 範例請求

**基本批次發送**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "系統公告：明天將進行例行維護",
    push: true,
    sender: "system",
    paras: [
      { receiver: "user-a" },
      { receiver: "user-b" },
      { receiver: "user-c" },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**使用樣板變數**

訊息中以 `$pattern$` 包裹的變數會被替換為每個接收者對應的值：

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "Hi $name$，您的訂單 $orderId$ 已出貨！",
    push: true,
    sender: "system",
    paras: [
      {
        receiver: "user-a",
        "$name$": "Alice",
        "$orderId$": "ORD-001",
      },
      {
        receiver: "user-b",
        "$name$": "Bob",
        "$orderId$": "ORD-002",
      },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**發送至指定聊天室**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "活動提醒：明天 14:00 開始",
    sender: "system",
    paras: [
      { room: "room-001" },
      { room: "room-002" },
      { room: "room-003" },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**成功回應（200 OK）**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `RC` | number | 回應代碼（0 表示成功） |
| `RM` | string | 回應訊息 |
| `result.batchID` | string | 批次任務 ID |
| `result.count` | number | 接收者數量 |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "batchID": "batch-20260410-abc123",
    "count": 3
  }
}
```

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- **無效的 API 金鑰** — 提供的 `IM-API-KEY` 無效或已過期
- **缺少必填參數** — 未提供 `message`、`messageType` 或 `paras`
- **接收者不存在** — `paras` 中的 `receiver` 不存在
- **伺服器內部錯誤** — 伺服器端發生未預期的錯誤

------

## 使用場景

### 廣播通知
- **系統公告**：向所有用戶推送維護通知或重要公告
- **活動推播**：向特定用戶群發送活動或優惠訊息

### 個人化訊息
- **樣板訊息**：透過 `$pattern$` 變數，發送包含個人資訊的通知（如訂單編號、用戶名稱）
- **帳務通知**：發送帳單到期、付款成功等個人化通知

------

## 注意事項

- **非同步處理**：批次訊息會加入處理佇列，回應僅表示任務已建立
- **樣板替換**：變數名稱需以 `$` 包裹，如 `$name$`，替換適用於 `message` 和 `extra` 欄位
- **接收者優先順序**：若 `paras` 中同時指定 `receiver` 和 `room`，`room` 優先
- **推播預設關閉**：`push` 預設為 `false`，需明確設為 `true` 才會推播
