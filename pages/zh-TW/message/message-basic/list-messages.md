# 列出訊息

## 概述

查詢指定聊天室的訊息記錄，支援時間範圍、分頁和多種排序方式。此 API 使用訊息的更新時間進行排序，提供更準確的訊息順序。適用於訊息記錄查詢、訊息搜尋和聊天室訊息瀏覽。

------

## API 端點

### 取得聊天室訊息列表 (V3)

查詢指定聊天室的訊息記錄，按更新時間排序。

```http
GET /rooms/{id}/messages/v3
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數   | 類型   | 必填 | 說明        |
| ------ | ------ | ---- | ----------- |
| `id`   | string | ✅    | 聊天室 ID   |

#### Query Parameters

| 參數             | 類型   | 必填 | 說明                                                         |
| ---------------- | ------ | ---- | ------------------------------------------------------------ |
| `beforeMessage`  | string | ❌    | 查詢指定訊息 ID 之前的訊息                                   |
| `afterMessage`   | string | ❌    | 查詢指定訊息 ID 之後的訊息                                   |
| `limit`          | number | ❌    | 回應訊息數量上限，預設值 20                                  |
| `afterTime`      | string | ❌    | 查詢指定時間之後的訊息（ISO-8601 格式或毫秒時間戳）          |
| `timeRangeField` | string | ❌    | 時間範圍查詢使用的時間欄位（updatedAt/createdAt/messageTime），預設 updatedAt |

#### 範例請求

**基本查詢**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=10&afterTime=2020-10-15T03:50:04Z HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

**分頁查詢**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?limit=20&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
```

**時間範圍查詢**

```http
GET /rooms/58871b877390be11d5f1ab30/messages/v3?afterTime=1602817267000&timeRangeField=messageTime&limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
```

#### Response

**成功回應（200 OK）**

| 參數              | 類型   | 說明                                            |
| ----------------- | ------ | ----------------------------------------------- |
| `RC`              | number | 回應代碼（0 表示成功）                          |
| `RM`              | string | 回應訊息                                        |
| `result`          | object | 查詢結果                                        |

**查詢結果物件結構**

| 參數              | 類型   | 說明                                            |
| ----------------- | ------ | ----------------------------------------------- |
| `totalCount`      | number | 聊天室內總訊息數量                              |
| `data`            | array  | 符合條件的訊息陣列                              |
| `userDeletedIDs`  | array  | 當前用戶已刪除的訊息 ID 陣列（UI 應隱藏這些訊息）|
| `inspect`         | object | 診斷資訊                                        |

**訊息物件結構**

| 參數             | 類型   | 說明                          |
| ---------------- | ------ | ----------------------------- |
| `_id`            | string | 訊息唯一識別碼                |
| `message`        | any    | 訊息內容                      |
| `room`           | string | 所屬聊天室 ID                 |
| `sender`         | object | 發送者資訊                    |
| `messageType`    | string | 訊息類型                      |
| `messageTimeMS`  | number | 訊息發送時間（毫秒時間戳）    |
| `updatedAtMS`    | number | 訊息更新時間（毫秒時間戳）    |
| `createdAtMS`    | number | 訊息建立時間（毫秒時間戳）    |
| `reactions`      | array  | 訊息反應陣列                  |
| `reactionCount`  | number | 反應總數                      |
| `isDeleted`      | bool   | 是否已刪除                    |

**發送者物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用戶唯一識別碼                |
| `nickname`        | string | 用戶暱稱                      |
| `description`     | string | 用戶描述                      |
| `avatarUrl`       | string | 用戶頭像 URL                  |
| `lastLoginTimeMS` | number | 最後登入時間（毫秒時間戳）    |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 515,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "messageTime": {
          "$gt": "2020-10-15T03:50:04.000Z"
        }
      },
      "tookMS": 5
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Helloこんにちは SIKTMLNP 11:01:07",
        "room": "demo-room",
        "sender": {
          "_id": "sss",
          "nickname": "Elsa",
          "description": "description la la #1583637224106",
          "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
          "id": "sss",
          "lastLoginTimeMS": 1588744338369
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1602817267923,
        "updatedAtMS": 1602817267925,
        "createdAtMS": 1602817267925,
        "reactionCount": 0,
        "isDeleted": true
      }
    ],
    "userDeletedIDs": [
      "5f890cf37d980e06f6aaf349"
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

**403 Forbidden** - 權限不足或聊天室不存在

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "Client is not in the room or room does not exist"
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
    "message": "The specified room does not exist"
  }
}
```

------

## 使用場景

### 訊息瀏覽
- **聊天記錄**：顯示聊天室的歷史訊息
- **訊息搜尋**：根據時間範圍查找特定訊息
- **分頁載入**：實現訊息列表的分頁功能

### 同步與備份
- **訊息同步**：同步最新的訊息更新
- **離線備份**：備份聊天室訊息資料
- **資料分析**：分析聊天室活動和互動情況

### 應用整合
- **訊息匯出**：將聊天記錄匯出到其他系統
- **內容審核**：檢視和管理聊天室內容
- **統計分析**：計算訊息數量和用戶活躍度

------

## 注意事項

- **排序方式**：V3 版本使用 updatedAt 時間排序，比訊息 ID 排序更準確
- **時間格式**：支援 ISO-8601 格式或毫秒時間戳
- **分頁查詢**：使用 beforeMessage 或 afterMessage 進行分頁
- **用戶權限**：只有聊天室成員才能查詢訊息
- **已刪除訊息**：userDeletedIDs 中的訊息 UI 應隱藏顯示
- **診斷資訊**：inspect 物件提供查詢效能和條件的診斷資訊
- **預設限制**：未指定 limit 時預設回應 20 筆訊息