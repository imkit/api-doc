# 搜尋訊息

## 概述

透過關鍵字搜尋訊息內容。此 API 使用通用搜尋功能，可以根據訊息內容進行全文搜尋，支援跨聊天室搜尋或限定特定聊天室範圍，適用於快速定位特定訊息內容。

------

## API 端點

### 搜尋訊息內容

使用關鍵字在訊息內容中進行搜尋。

```http
POST /search
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Post Body

| 參數       | 類型     | 必填 | 說明                                      |
| ---------- | -------- | ---- | ----------------------------------------- |
| `type`     | array    | ✅    | 搜尋類型，設定為 ["messages"]             |
| `keyword`  | string   | ✅    | 搜尋關鍵字（在訊息內容中搜尋）            |
| `room`     | string   | ❌    | 限制在特定聊天室內搜尋                    |
| `roomTags` | array    | ❌    | 限制在擁有指定標籤的聊天室內搜尋          |
| `limit`    | number   | ❌    | 最大搜尋結果數量                          |

#### 範例請求

**在所有聊天室中搜尋訊息**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "hello",
  "limit": 20
}
```

**在特定聊天室中搜尋訊息**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "project update",
  "room": "demo-room"
}
```

**在特定標籤的聊天室中搜尋**

```http
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "type": ["messages"],
  "keyword": "meeting",
  "roomTags": ["work", "team"]
}
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 搜尋結果               |

**搜尋結果結構**

| 參數       | 類型   | 說明                              |
| ---------- | ------ | --------------------------------- |
| `messages` | array  | 搜尋到的訊息群組，按聊天室分組    |

**訊息群組物件結構**

| 參數       | 類型   | 說明                      |
| ---------- | ------ | ------------------------- |
| `room`     | object | 聊天室資訊                |
| `messages` | array  | 該聊天室中符合的訊息 ID   |

**聊天室資訊物件結構**

| 參數            | 類型    | 說明                      |
| --------------- | ------- | ------------------------- |
| `_id`           | string  | 聊天室唯一識別碼          |
| `name`          | string  | 聊天室名稱                |
| `cover`         | string  | 聊天室封面圖片 URL        |
| `description`   | string  | 聊天室描述                |
| `roomTags`      | array   | 聊天室標籤列表            |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "messages": [
      {
        "room": {
          "_id": "demo-room",
          "name": "Demo Room",
          "cover": "http://example.com/cover.jpg",
          "description": "Demo room for testing",
          "roomTags": ["demo", "test"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf349",
          "5f890cf37d980e06f6aaf350",
          "5f890cf37d980e06f6aaf351"
        ]
      },
      {
        "room": {
          "_id": "work-room",
          "name": "Work Discussion",
          "cover": "http://example.com/work-cover.jpg",
          "description": "Work related discussions",
          "roomTags": ["work"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf352"
        ]
      }
    ]
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

**400 Bad Request** - 搜尋參數無效

```json
{
  "RC": 400,
  "RM": "Invalid search parameters",
  "error": {
    "code": "INVALID_SEARCH_TYPE",
    "message": "Search type must include 'messages'"
  }
}
```

------

## 使用場景

### 訊息搜尋
- **關鍵字查找**：快速找到包含特定關鍵字的歷史訊息
- **內容回溯**：在大量訊息中找到相關的對話內容
- **資訊檢索**：搜尋特定主題或專案相關的討論

### 聊天室管理
- **內容審核**：搜尋包含特定詞彙的訊息進行審核
- **資料分析**：分析聊天室中討論的熱門話題
- **合規檢查**：搜尋可能違規的訊息內容

### 用戶體驗
- **智能搜尋**：提供用戶快速搜尋歷史對話的功能
- **關聯顯示**：顯示與搜尋關鍵字相關的所有訊息
- **跨室搜尋**：在多個聊天室中同時搜尋相關內容

------

## 注意事項

- **搜尋範圍**：只會搜尋當前用戶有權限訪問的聊天室和訊息
- **關鍵字匹配**：支援全文搜尋，匹配訊息內容中的關鍵字
- **結果分組**：搜尋結果按聊天室分組，便於理解訊息來源
- **權限控制**：搜尋結果會根據用戶的聊天室權限進行過濾
- **效能考量**：大範圍搜尋可能需要較長時間，建議設定合理的 limit 值
- **訊息 ID**：返回的是訊息 ID 陣列，需要額外 API 調用來獲取完整訊息內容
