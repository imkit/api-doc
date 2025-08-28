# 獲取聊天室未讀訊息

## 概述

根據聊天室標籤統計未讀訊息數量。此 API 允許按聊天室標籤分組統計未讀訊息，適用於顯示不同類型聊天室的未讀狀態、建立訊息摘要和管理通知提醒。

------

## API 端點

### 按聊天室標籤統計未讀訊息

根據指定的聊天室標籤統計未讀訊息數量。

```http
POST /badges/byRoomTags
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Post Body

| 參數   | 類型   | 必填 | 說明                                    |
| ------ | ------ | ---- | --------------------------------------- |
| `tags` | array  | ❌    | 聊天室標籤陣列（省略時查詢所有標籤）    |

#### 範例請求

**查詢特定標籤的未讀數量**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": ["demo", "sample"]
}
```

**查詢工作相關聊天室的未讀數量**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": ["work", "project", "meeting"]
}
```

**查詢所有標籤的未讀數量**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "tags": []
}
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 統計結果               |

**統計結果結構**

| 參數         | 類型   | 說明                              |
| ------------ | ------ | --------------------------------- |
| `totalBadge` | number | 所有查詢標籤的未讀訊息總數        |
| `data`       | object | 各標籤對應的未讀訊息數量          |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalBadge": 15,
    "data": {
      "demo": 2,
      "sample": 0,
      "work": 8,
      "project": 3,
      "meeting": 2
    }
  }
}
```

#### 錯誤回應

**401 Unauthorized** - 認證失敗

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**400 Bad Request** - 請求參數無效

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_TAGS",
    "message": "Tags must be an array of strings"
  }
}
```

------

## 使用場景

### 未讀狀態顯示
- **標籤分組**：在聊天室列表中按標籤顯示未讀數量
- **重要性分級**：根據標籤優先級顯示不同的通知狀態
- **視覺提醒**：用不同顏色或樣式標示不同類型的未讀訊息

### 通知管理
- **智能通知**：根據聊天室標籤設定不同的通知策略
- **批量操作**：批量標記特定標籤聊天室的訊息為已讀
- **過濾控制**：允許用戶選擇關注特定標籤的聊天室

### 數據統計
- **活躍度分析**：分析不同類型聊天室的活躍程度
- **工作流程**：統計工作相關聊天室的未處理訊息
- **優先級管理**：識別需要優先處理的聊天室類型

------

## 注意事項

- **標籤權限**：只會統計用戶有權限訪問的聊天室
- **空陣列處理**：傳入空陣列時會查詢所有可用標籤
- **即時性**：統計結果為查詢當下的即時數據
- **標籤匹配**：完全匹配指定的標籤名稱
- **效能考量**：查詢大量標籤時可能影響響應時間
- **零值顯示**：沒有未讀訊息的標籤會顯示為 0
