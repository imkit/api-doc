# 取得連線數

## 概述

取得目前系統的 WebSocket 即時連線數量。此端點可用於即時監控系統負載、容量規劃及營運監控等用途。需具備平台 API 權限方可呼叫。

------

## API 端點

### 取得目前連線數

查詢目前系統上的 WebSocket 連線數量。

```http
GET /admin/connection-count
```

#### Headers

| 參數         | 類型   | 必填 | 說明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金鑰 |

#### 範例請求

**JavaScript（axios）**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/connection-count",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/connection-count" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**成功回應（200 OK）**

| 參數           | 類型   | 說明                         |
| -------------- | ------ | ---------------------------- |
| `RC`           | number | 回應代碼（0 表示成功）       |
| `RM`           | string | 回應訊息                     |
| `result`       | object | 查詢結果                     |
| `result.count` | number | 目前的 WebSocket 連線數量    |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 1523
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

**403 Forbidden** - 權限不足

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Platform API permission required"
  }
}
```

------

## 使用場景

### 即時監控
- **連線數監控**：在監控儀表板即時顯示目前的 WebSocket 連線數量
- **異常偵測**：設定連線數閾值，當超過或驟降時觸發警報

### 容量規劃
- **負載評估**：定期取得連線數，評估系統負載狀況
- **擴展決策**：根據連線數趨勢決定是否需要擴展伺服器資源

### 營運報告
- **使用統計**：記錄各時段連線數，產出使用報告
- **高峰分析**：分析不同時段的連線高峰，最佳化資源配置

------

## 注意事項

- **需要平台 API 權限**：此端點需使用具有平台 API 權限的 `IM-API-KEY` 進行驗證
- **即時數據**：回傳的是呼叫當下的即時連線數，每次呼叫結果可能不同
- **WebSocket 連線**：統計的是 WebSocket 長連線數量，不包含一般 HTTP 請求
- **監控頻率**：建議以適當的間隔輪詢（如每 30 秒或每分鐘），避免過於頻繁的呼叫
