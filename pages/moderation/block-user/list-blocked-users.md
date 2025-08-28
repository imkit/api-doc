# 列出封鎖用戶

## 概述

取得當前用戶的完整封鎖清單，顯示所有被封鎖的用戶詳細資訊。此 API 提供用戶管理個人封鎖清單的功能，包括檢視被封鎖用戶的基本資訊、封鎖時間以及相關聊天室資訊，適用於用戶檢視和管理自己的隱私設定。

------

## API 端點

### 取得封鎖清單

獲取當前用戶建立的所有封鎖關係詳細資訊。

```http
GET /blockStatus/my
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### 範例請求

**取得完整封鎖清單**

```http
GET /blockStatus/my HTTP/1.1
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
| `result` | object | 封鎖清單資料           |

**結果物件結構**

| 參數   | 類型  | 說明               |
| ------ | ----- | ------------------ |
| `data` | array | 封鎖關係清單陣列   |

**封鎖關係物件結構**

| 參數        | 類型   | 說明                          |
| ----------- | ------ | ----------------------------- |
| `blockee`   | object | 被封鎖用戶的詳細資訊          |
| `blocker`   | string | 執行封鎖的用戶 ID             |
| `room`      | object | 關聯聊天室的詳細資訊          |
| `createdAt` | string | 封鎖創建時間                  |
| `updatedAt` | string | 封鎖更新時間                  |

**被封鎖用戶物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用戶唯一識別碼                |
| `nickname`        | string | 用戶暱稱                      |
| `avatarUrl`       | string | 用戶頭像 URL                  |
| `id`              | string | 用戶 ID                       |
| `lastLoginTimeMS` | number | 最後登入時間（毫秒時間戳）    |

**聊天室物件結構**

| 參數            | 類型   | 說明                              |
| --------------- | ------ | --------------------------------- |
| `_id`           | string | 聊天室唯一識別碼                  |
| `roomType`      | string | 聊天室類型（direct/group）        |
| `id`            | string | 聊天室 ID                         |
| `createdTimeMS` | number | 聊天室創建時間（毫秒時間戳）      |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "blockee": {
          "_id": "ccc",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
          "nickname": "Cathy",
          "id": "ccc",
          "lastLoginTimeMS": 1600006869368
        },
        "blocker": "aaa",
        "room": {
          "_id": "2bec603e94a210092439e83ff2d79ac1",
          "roomType": "direct",
          "id": "2bec603e94a210092439e83ff2d79ac1",
          "createdTimeMS": 1628089206798
        },
        "createdAt": "2021-08-04T15:18:10.735Z",
        "updatedAt": "2021-08-04T15:18:10.735Z"
      },
      {
        "blockee": {
          "_id": "ddd",
          "nickname": "Dina",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
          "id": "ddd",
          "lastLoginTimeMS": 1628094314986
        },
        "blocker": "aaa",
        "room": {
          "_id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "roomType": "direct",
          "id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "createdTimeMS": 1628089213796
        },
        "createdAt": "2021-08-04T15:18:07.649Z",
        "updatedAt": "2021-08-04T15:18:07.649Z"
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

**403 Forbidden** - 權限不足

```json
{
  "RC": 403,
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to access this resource"
  }
}
```

------

## 使用場景

### 個人隱私管理
- **封鎖清單檢視**：查看當前封鎖的所有用戶
- **隱私設定管理**：統一檢視和管理個人隱私狀態
- **關係狀態確認**：確認特定用戶的封鎖狀態

### 用戶體驗最佳化
- **清單管理界面**：提供完整的封鎖用戶管理功能
- **快速解封**：在清單中快速選擇要解除封鎖的用戶
- **狀態同步**：確保各平台封鎖清單的一致性

### 系統管理
- **行為追蹤**：了解用戶的封鎖行為模式
- **關係分析**：分析用戶間的互動關係
- **數據統計**：統計封鎖功能的使用情況

------

## 注意事項

- **僅顯示自己的清單**：只能查看當前認證用戶建立的封鎖關係
- **完整資訊提供**：包含被封鎖用戶和相關聊天室的詳細資訊
- **時間排序**：通常按封鎖時間進行排序顯示
- **聊天室類型**：支援直接聊天（direct）和群組聊天（group）的封鎖關係
- **即時性**：返回當前最新的封鎖清單狀態
- **空清單處理**：如果沒有封鎖任何用戶，則返回空陣列
