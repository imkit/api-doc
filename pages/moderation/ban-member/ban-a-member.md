# 禁止成員

## 概述

在聊天室中禁止指定用戶，阻止其在該聊天室中進行活動。此功能允許平台管理員和聊天室擁有者對群組聊天室中的成員進行管理，當聊天室設有擁有者時，只有平台管理員和聊天室擁有者具備此權限。禁止後，被禁止的用戶將無法在該聊天室中發送訊息或參與互動。

------

## API 端點

### 在聊天室中禁止指定用戶

將指定用戶加入聊天室的禁止清單，限制其在該聊天室的活動權限。

```http
POST /blockStatus/room/{roomID}/{blockee}
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數      | 類型   | 必填 | 說明              |
| --------- | ------ | ---- | ----------------- |
| `roomID`  | string | ✅    | 聊天室 ID         |
| `blockee` | string | ✅    | 要禁止的用戶 ID   |

#### 範例請求

**在聊天室中禁止特定用戶**

```http
POST /blockStatus/room/demo-room/ccc HTTP/1.1
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
| `result` | object | 禁止狀態資訊           |

**禁止狀態物件結構**

| 參數        | 類型   | 說明                      |
| ----------- | ------ | ------------------------- |
| `appID`     | string | 應用程式識別碼            |
| `blockee`   | object | 被禁止用戶的詳細資訊      |
| `blocker`   | string | 執行禁止的用戶 ID         |
| `room`      | string | 聊天室 ID                 |
| `createdAt` | string | 禁止創建時間              |
| `updatedAt` | string | 禁止更新時間              |

**被禁止用戶物件結構**

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
    "message": "Only platform admin and room owner can block users in group chat rooms"
  }
}
```

**404 Not Found** - 聊天室或用戶不存在

```json
{
  "RC": 404,
  "RM": "Resource not found",
  "error": {
    "code": "ROOM_OR_USER_NOT_FOUND",
    "message": "The specified room or user does not exist"
  }
}
```

**409 Conflict** - 用戶已被禁止

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already blocked in this room"
  }
}
```

------

## 使用場景

### 聊天室管理
- **成員管制**：聊天室擁有者管理群組成員的參與權限
- **違規處理**：處理在聊天室中發送不當內容的用戶
- **秩序維護**：維持聊天室的良好討論環境

### 權限管理
- **擁有者權限**：聊天室擁有者對成員進行管理
- **平台管理**：平台管理員協助處理聊天室管理問題
- **分級管理**：不同權限等級的用戶擁有不同管理能力

### 安全防護
- **防範騷擾**：阻止特定用戶在聊天室中騷擾其他成員
- **內容管制**：對發送不當內容的用戶進行限制
- **環境保護**：保護聊天室的健康討論環境

------

## 注意事項

- **權限限制**：只有平台管理員和聊天室擁有者可以執行此操作（限群組聊天室且設有擁有者）
- **聊天室類型**：此功能主要針對群組聊天室，且該聊天室必須設有擁有者
- **禁止範圍**：禁止僅限於指定的聊天室，不影響用戶在其他聊天室的權限
- **即時生效**：禁止狀態會立即生效，被禁止的用戶無法在該聊天室中活動
- **重複操作**：對已被禁止的用戶重複執行禁止會返回衝突錯誤
- **記錄保存**：所有禁止操作都會被記錄，包含執行者和時間資訊
