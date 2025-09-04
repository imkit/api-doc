# 用戶列表

## 概述

查詢和搜尋應用程式中的用戶列表。支援條件篩選、分頁查詢，以及使用 MongoDB 查詢語法進行複雜搜尋。適用於用戶管理、數據分析和系統監控等場景。

------

## API 端點

### 查詢用戶列表

取得應用程式中的用戶列表，支援篩選和分頁功能。

```http
GET /admin/clients
```

#### Headers

| 參數         | 類型   | 必填 | 說明          |
| ------------ | ------ | ---- | ------------- |
| `IM-API-KEY` | string | ✅    | 您的 API 金鑰 |

#### Query Parameters

| 參數    | 類型   | 必填 | 說明                                          |
| ------- | ------ | ---- | --------------------------------------------- |
| `q`     | string | ❌    | MongoDB 查詢語法，用於條件篩選                |
| `limit` | number | ❌    | 每頁回傳的最大用戶數量（預設：50，最大：100） |
| `skip`  | number | ❌    | 跳過的用戶數量，用於分頁（預設：0）           |

#### 查詢語法範例

**基本篩選**

```javascript
// 查詢暱稱包含 "AB" 的用戶
q={"nickname": {"$regex": ".*AB.*"}}

// 查詢特定 email 的用戶
q={"email": "user@example.com"}

// 查詢最近登入的用戶（7天內）
q={"lastLoginTimeMS": {"$gte": 1640995200000}}
```

**複合條件**

```javascript
// 查詢暱稱包含 "admin" 且有 email 的用戶
q={"nickname": {"$regex": ".*admin.*"}, "email": {"$exists": true}}

// 查詢特定時間範圍內註冊的用戶
q={"createdAt": {"$gte": "2025-01-01T00:00:00Z", "$lt": "2025-02-01T00:00:00Z"}}
```

#### 範例請求

**獲取所有用戶**

```http
GET /admin/clients?limit=20&skip=0
```

**搜尋特定用戶**

```http
GET /admin/clients?q=%7B%22nickname%22:%7B%22%24regex%22:%22.*AB.*%22%7D%7D&limit=10
```

#### Response

**成功回應（200 OK）**

| 參數                | 類型   | 說明                   |
| ------------------- | ------ | ---------------------- |
| `RC`                | number | 回應代碼（0 表示成功） |
| `RM`                | string | 回應訊息               |
| `result`            | object | 查詢結果               |
| `result.totalCount` | number | 符合條件的用戶總數     |
| `result.data`       | array  | 用戶資料陣列           |

**用戶物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用戶唯一識別碼                |
| `nickname`        | string | 用戶顯示名稱                  |
| `email`           | string | 用戶電子郵件（如果有提供）    |
| `avatarUrl`       | string | 用戶頭像 URL                  |
| `address`         | object | 最後連線的網路地址資訊        |
| `userAgent`       | string | 最後使用的瀏覽器/應用程式資訊 |
| `lastLoginTimeMS` | number | 最後登入時間（毫秒時間戳）    |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "_id": "user001",
        "email": "test@example.com",
        "nickname": "Test AB User",
        "avatarUrl": "https://example.com/avatar.jpg",
        "address": {
          "port": 49315,
          "family": "IPv6",
          "address": "::ffff:118.168.96.151"
        },
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "lastLoginTimeMS": 1640995200000
      }
    ]
  }
}
```

#### 錯誤回應

**400 Bad Request** - 查詢語法錯誤

```json
{
  "RC": 400,
  "RM": "Invalid query syntax",
  "error": {
    "code": "INVALID_QUERY",
    "message": "MongoDB query syntax error"
  }
}
```

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

**413 Payload Too Large** - 查詢結果過大

```json
{
  "RC": 413,
  "RM": "Query result too large",
  "error": {
    "code": "RESULT_TOO_LARGE",
    "message": "Please use more specific query or smaller limit"
  }
}
```

------

## 使用場景

### 用戶管理

- **用戶列表展示**：在管理後台顯示所有用戶
- **用戶搜尋**：根據暱稱、email 等條件搜尋特定用戶
- **批次操作**：選取多個用戶進行批次管理

### 數據分析

- **活躍度分析**：查詢最近登入的用戶統計
- **用戶分佈**：分析用戶的地理分佈和設備使用情況
- **成長追蹤**：追蹤特定時間段的用戶成長

### 系統監控

- **異常偵測**：查詢異常登入行為的用戶
- **容量規劃**：了解用戶總數和增長趨勢
- **合規審查**：根據需要查詢特定用戶資料

------

## MongoDB 查詢語法指南

### 基本操作符

| 操作符 | 說明     | 範例                                          |
| ------ | -------- | --------------------------------------------- |
| `$eq`  | 等於     | `{"nickname": {"$eq": "Alice"}}`              |
| `$ne`  | 不等於   | `{"nickname": {"$ne": "Admin"}}`              |
| `$gt`  | 大於     | `{"lastLoginTimeMS": {"$gt": 1640995200000}}` |
| `$gte` | 大於等於 | `{"createdAt": {"$gte": "2025-01-01"}}`       |
| `$lt`  | 小於     | `{"lastLoginTimeMS": {"$lt": 1640995200000}}` |
| `$lte` | 小於等於 | `{"createdAt": {"$lte": "2025-12-31"}}`       |

### 字串操作

| 操作符   | 說明         | 範例                                                     |
| -------- | ------------ | -------------------------------------------------------- |
| `$regex` | 正規表達式   | `{"nickname": {"$regex": ".*admin.*", "$options": "i"}}` |
| `$in`    | 包含於列表   | `{"_id": {"$in": ["user1", "user2", "user3"]}}`          |
| `$nin`   | 不包含於列表 | `{"nickname": {"$nin": ["admin", "test"]}}`              |

### 存在性檢查

| 操作符    | 說明     | 範例                                       |
| --------- | -------- | ------------------------------------------ |
| `$exists` | 欄位存在 | `{"email": {"$exists": true}}`             |
| `$type`   | 資料型別 | `{"lastLoginTimeMS": {"$type": "number"}}` |

------

## 分頁最佳實務

### 基本分頁

```javascript
// 第一頁（每頁 20 筆）
GET /admin/clients?limit=20&skip=0

// 第二頁
GET /admin/clients?limit=20&skip=20

// 第三頁
GET /admin/clients?limit=20&skip=40
```

### 大數據集處理

```javascript
// 對於大量數據，建議使用更具體的查詢條件
GET /admin/clients?q={"lastLoginTimeMS":{"$gte":1640995200000}}&limit=50
```

## 效能考量

- **索引使用**：常用的查詢欄位（如 nickname、email）已建立索引
- **查詢最佳化**：避免使用過於複雜的正規表達式
- **分頁限制**：單次查詢最多回傳 100 筆資料
- **快取建議**：對於不常變動的查詢結果建議實作快取機制

## 注意事項

- **查詢語法**：必須使用有效的 MongoDB 查詢語法
- **URL 編碼**：查詢參數需要進行 URL 編碼
- **敏感資訊**：回應不包含用戶的 token 等敏感資訊
- **權限控制**：僅管理員權限可以呼叫此 API
