# 統計報告

## 概述

取得應用程式的統計報告數據，包含用戶列表、聊天室數量、訊息數量、連線峰值及系統記憶體資訊。預設取樣最近一小時（3600 秒）的數據。適用於使用量分析、容量監控及營運報告等場景。

------

## API 端點

### 取得統計報告

查詢應用程式在指定時間區間內的統計數據。

```http
GET /admin/stats
```

#### Headers

| 參數         | 類型   | 必填 | 說明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金鑰 |

#### 範例請求

**JavaScript（axios）**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/stats",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/stats" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**成功回應（200 OK）**

| 參數                  | 類型   | 說明                                         |
| --------------------- | ------ | -------------------------------------------- |
| `RC`                  | number | 回應代碼（0 表示成功）                       |
| `RM`                  | string | 回應訊息                                     |
| `result`              | object | 統計結果                                     |
| `result.clientKey`    | string | Client Key（敏感資訊，請勿記錄至日誌）       |
| `result.apiKey`       | string | API Key（敏感資訊，請勿記錄至日誌）          |
| `result.startTime`    | string | 統計起始時間（ISO 格式）                     |
| `result.endTime`      | string | 統計結束時間（ISO 格式）                     |
| `result.start`        | number | 統計起始時間（Unix 時間戳，秒）              |
| `result.end`          | number | 統計結束時間（Unix 時間戳，秒）              |
| `result.userList`     | array  | 期間內活躍用戶列表                           |
| `result.roomCount`    | number | 期間內活躍聊天室數量                         |
| `result.totalRoomCount` | number | 聊天室總數                                 |
| `result.messageCount` | number | 期間內訊息總數                               |
| `result.peakConnectionCount` | number | 期間內 WebSocket 連線峰值              |
| `result.totalMem`     | number | 系統總記憶體（bytes）                        |
| `result.freeMem`      | number | 系統可用記憶體（bytes）                      |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "clientKey": "ck_abcdef1234567890",
    "apiKey": "ak_abcdef1234567890",
    "startTime": "2026-04-11T09:00:00.000Z",
    "endTime": "2026-04-11T10:00:00.000Z",
    "start": 1744362000,
    "end": 1744365600,
    "userList": ["user001", "user002", "user003", "user004", "user005"],
    "roomCount": 12,
    "totalRoomCount": 358,
    "messageCount": 2467,
    "peakConnectionCount": 1893,
    "totalMem": 8589934592,
    "freeMem": 3221225472
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

### 使用量分析
- **活躍用戶統計**：透過 `userList` 了解期間內的活躍用戶
- **訊息量分析**：追蹤 `messageCount` 了解訊息傳送趨勢
- **聊天室活躍度**：比較 `roomCount`（活躍）與 `totalRoomCount`（總數）的比例

### 容量監控
- **連線峰值追蹤**：透過 `peakConnectionCount` 了解連線高峰，規劃伺服器擴展
- **記憶體監控**：透過 `totalMem` 與 `freeMem` 監控系統記憶體使用狀況
- **效能基準**：建立效能基準線，偵測異常負載

### 營運報告
- **每小時報告**：定期取得統計數據，產出營運報告
- **趨勢分析**：累積歷史數據進行長期趨勢分析

------

## 注意事項

- **取樣區間**：預設取樣最近一小時（3600 秒）的數據
- **需要平台 API 權限**：此端點需使用 `IM-API-KEY` 進行驗證
- **記憶體數據**：`totalMem` 與 `freeMem` 為伺服器主機的記憶體資訊，單位為 bytes
- **活躍用戶**：`userList` 僅包含取樣區間內有活動的用戶，不代表所有已註冊用戶
- **資料即時性**：統計數據為查詢當下的快照，可能有些微延遲
