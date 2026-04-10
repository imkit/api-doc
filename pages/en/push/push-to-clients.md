# 推播通知至用戶

## 概述

透過伺服器端發送自訂推播通知至指定用戶。支援 Apple Push Notification Service（APNs）及 Firebase Cloud Messaging（FCM），可同時推送至 iOS 與 Android 裝置。適用於行銷推播、系統公告、自訂提醒等場景。

------

## API 端點

### 推播通知至指定用戶

向一組指定的用戶發送推播通知，支援 iOS 與 Android 平台的通知欄位設定。

```http
POST /push/push2clients
```

#### Headers

| 參數         | 類型   | 必填 | 說明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅  | `application/json; charset=utf-8` |

#### Post Body

| 參數      | 類型   | 必填 | 說明                             |
| --------- | ------ | ---- | -------------------------------- |
| `clients` | array  | ✅    | 目標用戶的 Client ID 陣列       |
| `payload` | object | ✅    | 推播通知內容，包含平台特定欄位   |

**payload 物件欄位**

| 參數         | 類型           | 必填 | 平台    | 說明                                                                 |
| ------------ | -------------- | ---- | ------- | -------------------------------------------------------------------- |
| `type`       | string         | ❌    | 共用    | 通知類型，自訂分類標記                                               |
| `expiry`     | number         | ❌    | iOS     | 通知過期時間（Unix 時間戳，秒）                                      |
| `alert`      | string/object  | ❌    | iOS     | 通知提示，可為字串或包含 `loc-key`、`loc-args` 的物件                |
| `badge`      | number         | ❌    | iOS     | 應用程式圖示上的未讀數字                                             |
| `sound`      | string         | ❌    | iOS     | 通知音效檔案名稱                                                     |
| `topic`      | string         | ❌    | iOS     | APNs topic，通常為應用程式的 Bundle ID                               |
| `title`      | string         | ❌    | Android | 通知標題                                                             |
| `body`       | string         | ❌    | Android | 通知內容                                                             |
| `icon`       | string         | ❌    | Android | 通知圖示 URL                                                        |
| `collapseKey` | string        | ❌    | Android | 摺疊鍵，相同 key 的通知會合併顯示                                    |

**alert 物件欄位（當 alert 為物件時）**

| 參數       | 類型   | 必填 | 說明                   |
| ---------- | ------ | ---- | ---------------------- |
| `loc-key`  | string | ❌    | 本地化字串的鍵值       |
| `loc-args` | array  | ❌    | 本地化字串的參數陣列   |

#### 範例請求

**JavaScript（axios）**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/push/push2clients",
  {
    clients: ["user001", "user002", "user003"],
    payload: {
      type: "marketing",
      alert: "您有一則新的優惠活動，立即查看！",
      badge: 1,
      sound: "default",
      topic: "io.imkit.app",
      title: "限時優惠",
      body: "您有一則新的優惠活動，立即查看！",
      icon: "https://example.com/icon.png",
      collapseKey: "promo_2026"
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**使用本地化 alert 物件**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/push/push2clients",
  {
    clients: ["user001"],
    payload: {
      alert: {
        "loc-key": "NEW_MESSAGE_NOTIFICATION",
        "loc-args": ["張小明", "您好，請問有空嗎？"]
      },
      badge: 3,
      sound: "default",
      title: "新訊息",
      body: "張小明：您好，請問有空嗎？"
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X POST "https://your-app.imkit.io/push/push2clients" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "clients": ["user001", "user002"],
    "payload": {
      "type": "alert",
      "alert": "系統維護通知：今晚 23:00 將進行例行維護",
      "badge": 1,
      "sound": "default",
      "title": "系統公告",
      "body": "系統維護通知：今晚 23:00 將進行例行維護",
      "icon": "https://example.com/icon.png"
    }
  }'
```

#### Response

**成功回應（200 OK）**

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

請求成功時，伺服器會將推播通知分別發送至 APNs（iOS）與 FCM（Android）。

#### 錯誤回應

**401 Unauthorized** - API 金鑰無效

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

**400 Bad Request** - 缺少必要參數

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "clients and payload are required"
  }
}
```

------

## 使用場景

### 行銷推播
- **促銷活動通知**：向特定用戶群發送優惠活動、折扣碼等行銷訊息
- **個人化推薦**：根據用戶行為推送個人化的產品推薦

### 系統通知
- **維護公告**：發送系統維護、版本更新等公告訊息
- **安全提醒**：通知用戶帳號異常登入、密碼變更等安全事件

### 自訂提醒
- **排程提醒**：發送預約、會議、到期提醒等時間敏感的通知
- **狀態更新**：通知用戶訂單狀態變更、審核結果等

------

## 注意事項

- **僅限伺服器端使用**：此 API 需使用 `IM-API-KEY` 進行驗證，僅供伺服器端呼叫
- **雙平台推送**：系統會同時透過 APNs（iOS）與 FCM（Android）發送推播通知
- **裝置註冊**：用戶必須已註冊推播 token，否則通知無法送達
- **推播配額**：請注意 APNs 與 FCM 各自的推播頻率限制，避免過度推送
- **alert 欄位**：iOS 的 `alert` 可以是純字串或包含本地化鍵值的物件，請根據需求選擇適當的格式
- **摺疊通知**：Android 的 `collapseKey` 可用於將相同類型的通知合併，減少用戶干擾
