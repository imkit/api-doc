# 更新系統設定

## 概述

更新應用程式的系統組態設定。透過此端點可以設定公告、審查詞彙、功能旗標等任意鍵值對。此為管理員專用 API，需使用 `IM-API-KEY` 進行驗證。

------

## API 端點

### 更新系統設定

新增或更新系統組態的鍵值對。

```http
POST /config
```

#### Headers

| 參數           | 類型   | 必填 | 說明                            |
| -------------- | ------ | ---- | ------------------------------- |
| `IM-API-KEY`   | string | ✅    | 您的平台 API 金鑰              |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

請求內容為任意 JSON 鍵值對，將作為系統組態儲存。

| 參數   | 類型   | 必填 | 說明                               |
| ------ | ------ | ---- | ---------------------------------- |
| （任意鍵）| any | ❌    | 任意鍵值對，將被儲存為系統組態設定 |

#### 範例請求

**JavaScript（axios）- 設定公告**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    announcement: {
      text: "系統將於 2026/04/15 02:00 進行例行維護，預計維護時間 2 小時。",
      pin: true
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

**JavaScript（axios）- 設定審查詞彙**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    censorship: {
      keywords: ["廣告", "垃圾訊息", "詐騙"]
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

**cURL - 設定多項組態**

```bash
curl -X POST "https://your-app.imkit.io/config" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "announcement": {
      "text": "歡迎使用 IMKit！",
      "pin": true
    },
    "censorship": {
      "keywords": ["廣告", "垃圾訊息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }'
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                         |
| -------- | ------ | ---------------------------- |
| `RC`     | number | 回應代碼（0 表示成功）       |
| `RM`     | string | 回應訊息                     |
| `result` | object | 更新後的系統組態設定         |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "歡迎使用 IMKit！",
      "pin": true
    },
    "censorship": {
      "keywords": ["廣告", "垃圾訊息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }
}
```

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

**400 Bad Request** - 請求格式錯誤

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "INVALID_BODY",
    "message": "Request body must be a valid JSON object"
  }
}
```

------

## 使用場景

### 公告管理
- **設定系統公告**：發布或更新系統公告訊息，可設定是否置頂顯示
- **活動公告**：發布限時活動、促銷等資訊

### 內容審查設定
- **設定審查詞彙**：新增或更新敏感詞列表，用於訊息內容過濾
- **審查規則調整**：動態調整內容審查規則

### 功能旗標管理
- **功能開關**：動態啟用或停用特定功能
- **參數調整**：更新系統參數，如檔案大小限制、訊息長度限制等

------

## 注意事項

- **僅限管理員使用**：此端點需使用 `IM-API-KEY` 驗證，僅限伺服器端呼叫
- **覆蓋行為**：相同鍵名的設定值將被覆蓋更新
- **任意鍵值對**：請求 body 支援任意 JSON 結構，系統不會對鍵名或值的格式做限制
- **即時生效**：更新後的設定會立即生效，用戶端下次讀取 `GET /config` 即可取得最新設定
