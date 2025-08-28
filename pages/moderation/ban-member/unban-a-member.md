# 解除禁止成員

## 概述

在聊天室中解除對指定用戶的禁止狀態，恢復其在該聊天室中的正常活動權限。只有聊天室擁有者具備解除禁止的權限（限群組聊天室且設有擁有者）。解除禁止後，該用戶可以重新在聊天室中進行互動和發送訊息。

------

## API 端點

### 在聊天室中解除禁止指定用戶

將指定用戶從聊天室的禁止清單中移除，恢復其在該聊天室的活動權限。

```http
DELETE /blockStatus/room/{roomID}/{blockee}
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數      | 類型   | 必填 | 說明                  |
| --------- | ------ | ---- | --------------------- |
| `roomID`  | string | ✅    | 聊天室 ID             |
| `blockee` | string | ✅    | 要解除禁止的用戶 ID   |

#### 範例請求

**解除禁止特定用戶**

```http
DELETE /blockStatus/room/demo-room/ccc HTTP/1.1
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
| `result` | object | 解除禁止狀態資訊       |

**解除禁止狀態物件結構**

| 參數        | 類型   | 說明                      |
| ----------- | ------ | ------------------------- |
| `appID`     | string | 應用程式識別碼            |
| `blockee`   | object | 被解除禁止用戶的詳細資訊  |
| `blocker`   | string | 執行禁止的用戶 ID         |
| `room`      | string | 聊天室 ID                 |
| `createdAt` | string | 原禁止創建時間            |
| `updatedAt` | string | 解除禁止時間              |

**被解除禁止用戶物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用戶唯一識別碼                |
| `nickname`        | string | 用戶暱稱                      |
| `avatarUrl`       | string | 用戶頭像 URL                  |
| `id`              | string | 用戶 ID                       |
| `lastLoginTimeMS` | number | 最後登入時間（毫秒時間戳）    |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093304",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "demo-room",
    "createdAt": "2021-08-04T16:08:53.057Z",
    "updatedAt": "2021-08-04T16:08:53.057Z"
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
    "message": "Only room owner can unblock users in group chat rooms"
  }
}
```

**404 Not Found** - 禁止關係不存在

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists for this user in the specified room"
  }
}
```

**400 Bad Request** - 參數無效

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## 使用場景

### 聊天室管理
- **禁止解除**：聊天室擁有者解除對用戶的禁止狀態
- **管理決策**：基於情況變化調整禁止政策
- **成員恢復**：恢復用戶在聊天室中的正常參與權限

### 權限管理
- **擁有者專屬**：只有聊天室擁有者可以解除禁止
- **權限恢復**：恢復用戶在該聊天室的完整活動權限
- **管理彈性**：提供靈活的禁止管理機制

### 關係修復
- **誤判糾正**：解除因誤判而禁止的用戶
- **情況改善**：用戶行為改善後的權限恢復
- **和解機制**：提供聊天室成員關係修復的途徑

------

## 注意事項

- **權限限制**：只有聊天室擁有者可以執行解除禁止操作（限群組聊天室且設有擁有者）
- **聊天室類型**：此功能主要針對群組聊天室，且該聊天室必須設有擁有者
- **即時生效**：解除禁止狀態會立即生效，用戶可立即在聊天室中活動
- **禁止範圍**：解除禁止僅限於指定的聊天室，不影響其他聊天室的禁止狀態
- **不存在處理**：嘗試解除不存在的禁止關係會返回 404 錯誤
- **記錄保存**：解除禁止操作會更新禁止記錄的時間戳記
