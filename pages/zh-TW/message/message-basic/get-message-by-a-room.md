# 收到指定聊天室內的訊息

## 概述

取得指定聊天室中的所有訊息，適用於載入聊天室的完整訊息歷史記錄。此 API 基於聊天室訊息查詢功能，支援時間範圍篩選、分頁查詢，讓用戶能夠完整瀏覽聊天室中的對話內容。

------

## API 端點

### 取得聊天室所有訊息

獲取指定聊天室中的訊息記錄，支援分頁和時間篩選。

```http
GET /rooms/{id}/messages/v3
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數 | 類型   | 必填 | 說明        |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅    | 聊天室 ID   |

#### Query Parameters

| 參數               | 類型   | 必填 | 說明                                                    |
| ------------------ | ------ | ---- | ------------------------------------------------------- |
| `limit`            | number | ❌    | 回傳訊息的最大數量（預設：20，建議 50-100）             |
| `beforeMessage`    | string | ❌    | 查詢指定訊息 ID 之前的訊息（用於向前分頁）              |
| `afterMessage`     | string | ❌    | 查詢指定訊息 ID 之後的訊息（用於向後分頁）              |
| `afterTime`        | string | ❌    | 查詢指定時間之後的訊息（ISO-8601 或毫秒時間戳格式）     |
| `timeRangeField`   | string | ❌    | 時間範圍查詢的欄位：updatedAt, createdAt, messageTime（預設：updatedAt） |

#### 範例請求

**取得聊天室最新訊息**

```http
GET /rooms/demo-room/messages/v3?limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**取得歷史訊息（分頁）**

```http
GET /rooms/demo-room/messages/v3?limit=50&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**取得特定時間後的訊息**

```http
GET /rooms/demo-room/messages/v3?afterTime=2024-01-01T00:00:00Z&limit=100 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 訊息查詢結果           |

**查詢結果結構**

| 參數               | 類型   | 說明                                    |
| ------------------ | ------ | --------------------------------------- |
| `totalCount`       | number | 聊天室中的訊息總數                      |
| `data`             | array  | 訊息陣列（按時間順序排列）              |
| `userDeletedIDs`   | array  | 當前用戶已刪除的訊息 ID 陣列            |
| `inspect`          | object | 診斷資訊（包含查詢條件和執行時間）      |

**訊息物件結構**

| 參數             | 類型    | 說明                          |
| ---------------- | ------- | ----------------------------- |
| `_id`            | string  | 訊息唯一識別碼                |
| `message`        | any     | 訊息內容                      |
| `room`           | string  | 所屬聊天室 ID                 |
| `sender`         | object  | 發送者資訊                    |
| `messageType`    | string  | 訊息類型                      |
| `messageTimeMS`  | number  | 訊息發送時間（毫秒時間戳）    |
| `updatedAtMS`    | number  | 訊息更新時間（毫秒時間戳）    |
| `createdAtMS`    | number  | 訊息建立時間（毫秒時間戳）    |
| `reactions`      | array   | 訊息反應列表                  |
| `reactionCount`  | number  | 反應總數                      |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 245,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "status": { "$ne": 0 }
      },
      "tookMS": 8
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Hello everyone! Welcome to our chat room.",
        "room": "demo-room",
        "sender": {
          "_id": "user123",
          "nickname": "Alice",
          "avatarUrl": "https://example.com/avatar1.jpg",
          "id": "user123",
          "lastLoginTimeMS": 1640995200000
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1640995200000,
        "updatedAtMS": 1640995200001,
        "createdAtMS": 1640995200001,
        "reactionCount": 0
      }
    ],
    "userDeletedIDs": []
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

**403 Forbidden** - 權限不足

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "User is not a member of this room"
  }
}
```

**404 Not Found** - 聊天室不存在

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room with specified ID does not exist"
  }
}
```

------

## 使用場景

### 聊天室載入
- **初始載入**：用戶進入聊天室時載入最新訊息
- **歷史瀏覽**：用戶向上滑動查看更早的訊息記錄
- **重新整理**：重新載入聊天室的完整對話內容

### 訊息同步
- **離線同步**：用戶重新上線時同步錯過的訊息
- **跨設備同步**：在多個設備間保持訊息一致性
- **備份恢復**：從備份中恢復聊天室的完整記錄

### 內容分析
- **對話分析**：分析聊天室中的對話模式和熱門話題
- **活躍度統計**：統計聊天室的訊息量和用戶參與度
- **內容審核**：審核聊天室中的所有對話內容

------

## 注意事項

- **權限要求**：只有聊天室成員才能獲取訊息內容
- **分頁建議**：建議使用適當的 limit 值（20-100）避免一次載入過多資料
- **時間排序**：訊息按 updatedAt 時間排序，最新訊息在前
- **刪除處理**：userDeletedIDs 陣列包含當前用戶已刪除的訊息，需在 UI 中過濾
- **效能最佳化**：大型聊天室建議使用時間範圍限制以提升查詢效能
- **即時更新**：此 API 適用於批量載入，即時訊息建議使用 WebSocket 連線
