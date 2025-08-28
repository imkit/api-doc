# 獲取用戶未讀訊息

## 概述

取得當前用戶的總未讀訊息數量。此 API 可以統計用戶在所有有權限的聊天室中的未讀訊息總數，並支援按聊天室標籤進行篩選統計，適用於顯示用戶的整體未讀狀態。

------

## API 端點

### 取得用戶未讀訊息總數

獲取當前用戶的未讀訊息數量，可選擇按標籤篩選。

```http
GET /me/badge
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `Authorization`    | string | ✅    | Client Token   |

#### Query Parameters

| 參數       | 類型   | 必填 | 說明                                                      |
| ---------- | ------ | ---- | --------------------------------------------------------- |
| `roomTags` | string | ❌    | 按聊天室標籤篩選（可重複使用多個 roomTags 參數）          |

#### 範例請求

**取得總未讀訊息數**

```http
GET /me/badge HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

**取得特定標籤的未讀訊息數**

```http
GET /me/badge?roomTags=demo&roomTags=foo HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

**取得工作相關聊天室的未讀訊息數**

```http
GET /me/badge?roomTags=work&roomTags=project&roomTags=meeting HTTP/1.1
Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: localhost:3100
Connection: close
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 未讀訊息統計結果       |

**結果物件結構**

| 參數    | 類型   | 說明                                    |
| ------- | ------ | --------------------------------------- |
| `badge` | number | 未讀訊息數量（所有符合條件的聊天室總和） |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "badge": 10
  }
}
```

**按標籤篩選的回應範例**

```json
{
  "RC": 0,
  "RM": "OK", 
  "result": {
    "badge": 5
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

**400 Bad Request** - 參數無效

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_ROOM_TAGS",
    "message": "Room tags must be valid strings"
  }
}
```

------

## 使用場景

### 全局通知顯示
- **總數顯示**：在應用程式圖示或標題列顯示未讀訊息總數
- **Badge 標記**：用於移動應用的 badge 數字顯示
- **狀態指示**：判斷用戶是否有未讀訊息需要處理

### 分類統計
- **工作訊息**：統計工作相關聊天室的未讀數量
- **個人訊息**：統計個人或私人聊天的未讀數量
- **系統通知**：統計系統公告類聊天室的未讀數量

### 用戶體驗最佳化
- **智能提醒**：根據未讀數量調整提醒頻率
- **優先級顯示**：根據不同標籤的重要性排序顯示
- **快捷訪問**：提供快速跳轉到有未讀訊息的聊天室

------

## 注意事項

- **權限控制**：只統計用戶有權限訪問的聊天室
- **標籤篩選**：可使用多個 roomTags 參數進行 AND 條件篩選
- **即時性**：返回查詢當下的即時未讀數量
- **效能考量**：頻繁查詢可能影響效能，建議適度使用
- **參數格式**：多個標籤需使用 `roomTags=tag1&roomTags=tag2` 格式
- **零值處理**：沒有未讀訊息時返回 0
