# 封鎖用戶

## 概述

封鎖指定用戶，阻止其與當前用戶進行直接聊天。封鎖後，被封鎖的用戶將無法發送私人訊息給封鎖者，但不會影響在群組聊天室中的互動。此功能適用於防止騷擾和管理個人隱私。

------

## API 端點

### 封鎖指定用戶

將指定用戶加入封鎖清單，阻止其進行直接聊天。

```http
POST /blockStatus/my/{blockee}
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數      | 類型   | 必填 | 說明              |
| --------- | ------ | ---- | ----------------- |
| `blockee` | string | ✅    | 要封鎖的用戶 ID   |

#### 範例請求

**封鎖特定用戶**

```http
POST /blockStatus/my/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: localhost:3100
Connection: close
```

**封鎖其他用戶**

```http
POST /blockStatus/my/user123 HTTP/1.1
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
| `result` | object | 封鎖狀態資訊           |

**封鎖狀態物件結構**

| 參數        | 類型   | 說明                          |
| ----------- | ------ | ----------------------------- |
| `appID`     | string | 應用程式識別碼                |
| `blockee`   | object | 被封鎖用戶的詳細資訊          |
| `blocker`   | string | 執行封鎖的用戶 ID             |
| `room`      | string | 關聯的聊天室 ID               |
| `createdAt` | string | 封鎖創建時間                  |
| `updatedAt` | string | 封鎖更新時間                  |

**被封鎖用戶物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 用戶唯一識別碼                |
| `nickname`        | string | 用戶暱稱                      |
| `avatarUrl`       | string | 用戶頭像 URL                  |
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
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "2bec603e94a210092439e83ff2d79ac1",
    "createdAt": "2021-08-04T15:18:10.735Z",
    "updatedAt": "2021-08-04T16:35:41.341Z"
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

**404 Not Found** - 用戶不存在

```json
{
  "RC": 404,
  "RM": "User not found",
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The specified user does not exist"
  }
}
```

**400 Bad Request** - 不能封鎖自己

```json
{
  "RC": 400,
  "RM": "Cannot block yourself",
  "error": {
    "code": "SELF_BLOCK_FORBIDDEN",
    "message": "Users cannot block themselves"
  }
}
```

**409 Conflict** - 用戶已被封鎖

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already in your block list"
  }
}
```

------

## 使用場景

### 個人隱私保護
- **防止騷擾**：阻止不當用戶發送私人訊息
- **隱私管理**：控制誰能與自己進行直接聯絡
- **安全防護**：防範惡意用戶的持續騷擾行為

### 用戶體驗改善
- **內容過濾**：避免接收不想要的訊息內容
- **環境淨化**：創造更舒適的聊天環境
- **專注工作**：減少非必要的打擾和干擾

### 社群管理
- **行為規範**：對違規用戶採取個人層級的防護措施
- **衝突處理**：處理用戶間的個人衝突
- **自主管理**：讓用戶自行管理個人的社交圈

------

## 注意事項

- **僅限直接聊天**：封鎖只影響私人聊天，不影響群組聊天室中的互動
- **雙向效果**：封鎖生效後，雙方都無法發送私人訊息
- **自動創建聊天室**：封鎖會關聯到相應的直接聊天室
- **不能自封**：無法封鎖自己的帳號
- **重複封鎖**：對已封鎖的用戶執行封鎖會返回衝突錯誤
- **狀態持久**：封鎖狀態會持續存在，直到手動解除封鎖
