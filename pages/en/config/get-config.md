# 取得系統設定

## 概述

取得應用程式的執行時期設定。此端點回傳系統中已設定的所有組態鍵值對，包含公告、審查詞彙、功能旗標等。用戶端可使用 `IM-CLIENT-KEY` 搭配 `IM-Authorization` 進行驗證來讀取設定。

------

## API 端點

### 取得系統設定

取得目前所有的系統組態設定。

```http
GET /config
```

#### Headers

| 參數               | 類型   | 必填 | 說明                       |
| ------------------ | ------ | ---- | -------------------------- |
| `IM-CLIENT-KEY`    | string | ✅    | 您的 Client 金鑰           |
| `IM-Authorization` | string | ✅    | 用戶授權 token             |

#### 範例請求

**JavaScript（axios）**

```javascript
const response = await axios.get(
  "https://imkit-dev.funtek.io/config",
  {
    headers: {
      "IM-CLIENT-KEY": process.env.IM_CLIENT_KEY,
      "IM-Authorization": "Bearer user_access_token"
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://imkit-dev.funtek.io/config" \
  -H "IM-CLIENT-KEY: your_client_key" \
  -H "IM-Authorization: Bearer user_access_token"
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                               |
| -------- | ------ | ---------------------------------- |
| `RC`     | number | 回應代碼（0 表示成功）             |
| `RM`     | string | 回應訊息                           |
| `result` | object | 系統組態鍵值對，內容依實際設定而異 |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "歡迎使用 IMKit 即時通訊服務！",
      "pin": true
    },
    "censorship": {
      "keywords": ["廣告", "垃圾訊息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true,
      "maxFileSize": 10485760
    }
  }
}
```

#### 錯誤回應

**401 Unauthorized** - 授權驗證失敗

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_AUTH",
    "message": "Invalid or missing authorization"
  }
}
```

------

## 使用場景

### 功能旗標
- **動態功能開關**：用戶端啟動時讀取功能旗標，動態啟用或停用特定功能
- **灰度發布**：透過組態控制新功能的逐步開放

### 公告訊息
- **系統公告**：讀取置頂公告內容，在用戶端介面顯示
- **維護通知**：取得排程維護資訊，提前通知用戶

### 內容審查
- **審查詞彙**：取得敏感詞列表，用於用戶端訊息過濾
- **內容政策**：讀取內容政策設定，確保用戶端遵循規範

------

## 注意事項

- **用戶端可讀取**：此端點使用 `IM-CLIENT-KEY` 與 `IM-Authorization` 驗證，用戶端應用程式可直接呼叫
- **唯讀操作**：此端點僅提供讀取功能，更新設定需使用 `POST /config`（需 `IM-API-KEY`）
- **動態內容**：回傳的組態內容取決於管理員透過 `POST /config` 設定的項目，不同應用程式的設定可能不同
- **快取建議**：建議用戶端適當快取組態資料，避免頻繁呼叫此 API
