# 解除封鎖用戶

## 概述

解除對指定用戶的封鎖狀態，恢復其與當前用戶進行直接聊天的能力。解除封鎖後，雙方可以重新發送私人訊息，但不會影響群組聊天室中的互動狀態。此功能適用於修復誤操作或重新建立聯絡關係。

------

## API 端點

### 解除封鎖指定用戶

將指定用戶從封鎖清單中移除，恢復直接聊天功能。

```http
DELETE /blockStatus/my/{blockee}
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數      | 類型   | 必填 | 說明                  |
| --------- | ------ | ---- | --------------------- |
| `blockee` | string | ✅    | 要解除封鎖的用戶 ID   |

#### 範例請求

**解除封鎖特定用戶**

```http
DELETE /blockStatus/my/ddd HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**解除封鎖其他用戶**

```http
DELETE /blockStatus/my/user123 HTTP/1.1
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
| `result` | object | 解除封鎖狀態資訊       |

**解除封鎖狀態物件結構**

| 參數        | 類型   | 說明                          |
| ----------- | ------ | ----------------------------- |
| `appID`     | string | 應用程式識別碼                |
| `blockee`   | object | 被解除封鎖用戶的詳細資訊      |
| `blocker`   | string | 執行解除封鎖的用戶 ID         |
| `room`      | string | 關聯的聊天室 ID               |
| `createdAt` | string | 原封鎖創建時間                |
| `updatedAt` | string | 解除封鎖時間                  |

**被解除封鎖用戶物件結構**

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
      "_id": "ddd",
      "nickname": "Dina",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
      "id": "ddd",
      "lastLoginTimeMS": 1628095079328
    },
    "blocker": "aaa",
    "room": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
    "createdAt": "2021-08-04T15:18:07.649Z",
    "updatedAt": "2021-08-04T15:18:07.649Z"
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

**404 Not Found** - 封鎖關係不存在

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists with this user"
  }
}
```

**400 Bad Request** - 參數無效

```json
{
  "RC": 400,
  "RM": "Invalid user ID",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## 使用場景

### 關係修復
- **誤操作修正**：解除因誤操作而封鎖的用戶
- **關係改善**：重新與曾經衝突的用戶建立聯絡
- **二次機會**：給予被封鎖用戶重新開始的機會

### 管理彈性
- **動態管理**：根據情況變化調整封鎖狀態
- **臨時封鎖**：短期封鎖後恢復正常聯絡
- **測試用途**：開發和測試階段的封鎖功能驗證

### 用戶體驗最佳化
- **便捷操作**：提供簡單的解除封鎖方式
- **即時生效**：解除封鎖後立即恢復聊天功能
- **狀態同步**：確保封鎖狀態在各平台同步更新

------

## 注意事項

- **雙向解除**：解除封鎖後，雙方都可以重新發送私人訊息
- **不存在處理**：嘗試解除不存在的封鎖關係會返回 404 錯誤
- **即時生效**：解除封鎖操作會立即生效，無需等待
- **聊天室關聯**：解除封鎖不會影響相關聊天室的存在狀態
- **歷史記錄**：解除封鎖不會刪除之前的聊天記錄
- **群組不影響**：解除封鎖不會影響群組聊天中的互動狀態
