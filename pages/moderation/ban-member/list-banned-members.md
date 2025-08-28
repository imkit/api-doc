# 列出禁止成員

## 概述

取得指定聊天室的禁止清單，顯示該聊天室中所有被禁止的用戶詳細資訊。只有聊天室擁有者具備查看禁止清單的權限（限群組聊天室且設有擁有者）。此功能適用於聊天室擁有者檢視和管理聊天室的禁止狀態。

------

## API 端點

### 取得聊天室禁止清單

獲取指定聊天室中所有被禁止用戶的詳細資訊。

```http
GET /blockStatus/room/{roomID}
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數     | 類型   | 必填 | 說明        |
| -------- | ------ | ---- | ----------- |
| `roomID` | string | ✅    | 聊天室 ID   |

#### 範例請求

**取得聊天室禁止清單**

```http
GET /blockStatus/room/demo-room HTTP/1.1
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
| `result` | object | 禁止清單資料           |

**結果物件結構**

| 參數   | 類型  | 說明             |
| ------ | ----- | ---------------- |
| `data` | array | 禁止記錄清單陣列 |

**禁止記錄物件結構**

| 參數        | 類型   | 說明                        |
| ----------- | ------ | --------------------------- |
| `blockee`   | object | 被禁止用戶的詳細資訊        |
| `blocker`   | object | 執行禁止用戶的詳細資訊      |
| `room`      | object | 聊天室詳細資訊              |
| `createdAt` | string | 禁止創建時間                |
| `updatedAt` | string | 禁止更新時間                |

**被禁止用戶物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用戶唯一識別碼                |
| `nickname`        | string | 用戶暱稱                      |
| `avatarUrl`       | string | 用戶頭像 URL                  |
| `id`              | string | 用戶 ID                       |
| `lastLoginTimeMS` | number | 最後登入時間（毫秒時間戳）    |

**執行禁止用戶物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用戶唯一識別碼                |
| `nickname`        | string | 用戶暱稱                      |
| `avatarUrl`       | string | 用戶頭像 URL                  |
| `id`              | string | 用戶 ID                       |
| `lastLoginTimeMS` | number | 最後登入時間（毫秒時間戳）    |

**聊天室物件結構**

| 參數            | 類型   | 說明                          |
| --------------- | ------ | ----------------------------- |
| `_id`           | string | 聊天室唯一識別碼              |
| `roomType`      | string | 聊天室類型（group等）         |
| `id`            | string | 聊天室 ID                     |
| `createdTimeMS` | number | 聊天室創建時間（毫秒時間戳）  |

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
        "blocker": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093717",
          "nickname": "Alecia",
          "id": "aaa",
          "lastLoginTimeMS": 1583726632592
        },
        "room": {
          "_id": "demo-room",
          "roomType": "group",
          "id": "demo-room",
          "createdTimeMS": 1525001412492
        },
        "createdAt": "2021-08-04T16:08:53.057Z",
        "updatedAt": "2021-08-04T16:08:53.057Z"
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
    "message": "Only room owner can view blocklist in group chat rooms"
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

### 聊天室管理
- **禁止狀態檢視**：聊天室擁有者查看當前禁止清單
- **成員管理**：檢視被禁止用戶的詳細資訊和禁止記錄
- **管理決策**：基於禁止清單進行後續管理決策

### 權限管理
- **擁有者專屬**：只有聊天室擁有者可以查看禁止清單
- **隱私保護**：保護禁止資訊不被未授權用戶查看
- **權限驗證**：確保查看權限符合聊天室設定

### 記錄追蹤
- **禁止歷史**：查看禁止操作的時間記錄
- **用戶資訊**：獲取被禁止用戶和執行禁止用戶的詳細資訊
- **聊天室狀態**：了解聊天室的禁止管理狀況

------

## 注意事項

- **權限限制**：只有聊天室擁有者可以查看禁止清單（限群組聊天室且設有擁有者）
- **聊天室類型**：此功能主要針對群組聊天室，且該聊天室必須設有擁有者
- **完整資訊**：返回被禁止用戶、執行用戶和聊天室的完整資訊
- **時間記錄**：包含禁止創建和更新的時間戳記
- **資料結構**：返回陣列格式，支援多個禁止記錄
- **空清單處理**：如果聊天室沒有禁止任何用戶，則返回空陣列
