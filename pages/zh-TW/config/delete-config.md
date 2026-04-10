# 刪除系統設定

## 概述

刪除應用程式中特定的系統組態項目。透過指定組態鍵名來移除對應的設定值。此為管理員專用 API，需使用 `IM-API-KEY` 進行驗證。

------

## API 端點

### 刪除指定組態項目

依據鍵名刪除特定的系統組態設定。

```http
DELETE /config/:key
```

#### Headers

| 參數         | 類型   | 必填 | 說明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金鑰 |

#### Path Parameters

| 參數  | 類型   | 必填 | 說明                 |
| ----- | ------ | ---- | -------------------- |
| `key` | string | ✅    | 要刪除的組態鍵名     |

#### 範例請求

**JavaScript（axios）**

```javascript
const response = await axios.delete(
  "https://imkit-dev.funtek.io/config/announcement",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X DELETE "https://imkit-dev.funtek.io/config/announcement" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 空物件                 |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
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

**404 Not Found** - 指定的組態鍵名不存在

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## 使用場景

### 組態管理
- **移除過期公告**：刪除已不再需要的系統公告設定
- **清除審查詞彙**：移除整個審查詞彙設定項目
- **停用功能旗標**：刪除特定功能旗標設定以恢復預設行為

------

## 注意事項

- **僅限管理員使用**：此端點需使用 `IM-API-KEY` 驗證，僅限伺服器端呼叫
- **不可復原**：刪除操作不可復原，請確認無誤後再執行
- **即時生效**：刪除後立即生效，用戶端下次讀取 `GET /config` 將不再包含該項目
- **整個鍵值刪除**：此操作會刪除整個鍵值對，若只需移除部分內容，請改用 `POST /config` 更新
