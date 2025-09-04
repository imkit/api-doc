# 列出成員

## 概述

取得指定聊天室的詳細資訊，包含完整的成員列表、成員屬性和聊天室相關資料。此 API 提供聊天室的完整狀態資訊，適用於成員管理、聊天室監控和資料同步。

------

## API 端點

### 取得聊天室詳細資訊（包含成員列表）

查詢指定聊天室的完整資訊，包含所有成員的詳細資料。

```http
GET /rooms/{id}
```

#### Headers

| 參數            | 類型   | 必填 | 說明           |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數 | 類型   | 必填 | 說明        |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅    | 聊天室 ID   |

#### 範例請求

```http
GET /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Host: localhost:3100
Connection: close
User-Agent: Paw/3.0.14 (Macintosh; OS X/10.11.6) GCDHTTPRequest
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 聊天室詳細資訊         |

**聊天室詳細資訊物件結構**

| 參數                | 類型   | 說明                          |
| ------------------- | ------ | ----------------------------- |
| `_id`               | string | 聊天室唯一識別碼              |
| `appID`             | string | 應用程式識別碼                |
| `description`       | string | 聊天室描述                    |
| `lastMessage`       | object | 最後一則訊息資訊              |
| `memberProperties`  | array  | 成員屬性列表（未讀數、最後讀取）|
| `members`           | array  | 成員詳細資訊列表              |
| `unread`            | number | 當前用戶未讀訊息數            |
| `isSuperuser`       | bool   | 當前用戶是否為超級用戶        |

**成員物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `_id`             | string | 成員唯一識別碼                |
| `nickname`        | string | 成員暱稱                      |
| `avatarUrl`       | string | 成員頭像 URL                  |
| `lastLoginTime`   | string | 最後登入時間（ISO 格式）      |
| `lastLoginTimeMS` | number | 最後登入時間（毫秒時間戳）    |

**成員屬性物件結構**

| 參數       | 類型   | 說明                          |
| ---------- | ------ | ----------------------------- |
| `client`   | string | 成員客戶端 ID                 |
| `badge`    | number | 未讀訊息數量                  |
| `lastRead` | string | 最後讀取的訊息 ID             |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": 1111234,
      "messageType": "text",
      "sender": {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 0,
        "id": "1485248566481"
      },
      "messageTime": "2017-03-02T06:12:20.775Z",
      "messageTimeMS": 1488435140775,
      "id": "58b7b7c4c246bc0b41afb148"
    },
    "memberProperties": [
      {
        "badge": 5,
        "lastRead": "58b7a2c5f034920a878e9a53",
        "client": "1485248560558"
      },
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "1485248566481"
      },
      {
        "badge": 61,
        "client": "1485250743313"
      }
    ],
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTime": "2017-02-15T09:02:35.934Z",
        "lastLoginTimeMS": 1487149355934,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTime": "2017-03-02T07:11:40.398Z",
        "lastLoginTimeMS": 1488438700398,
        "id": "1485248566481"
      },
      {
        "_id": "1485250743313",
        "nickname": "Test 3",
        "lastLoginTime": "2017-03-02T07:18:31.436Z",
        "lastLoginTimeMS": 1488439111436,
        "id": "1485250743313"
      }
    ],
    "unread": 5,
    "description": "Sample Description",
    "isSuperuser": true,
    "id": "58871b877390be11d5f1ab30"
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

**403 Forbidden** - 權限不足或非成員

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "You are not a member of this room"
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

### 成員管理
- **成員列表**：顯示聊天室內所有成員的詳細資訊
- **成員監控**：查看成員的登入狀態和活躍度
- **權限檢查**：確認當前用戶在聊天室中的權限級別

### 聊天室資訊
- **聊天室狀態**：獲取聊天室的完整狀態資訊
- **未讀統計**：查看個人和整體的未讀訊息統計
- **最新訊息**：獲取聊天室的最後一則訊息資訊

### 應用整合
- **資料同步**：同步聊天室成員和狀態資訊
- **UI 顯示**：為聊天室界面提供完整的顯示資料
- **分析統計**：分析聊天室成員的參與度和活躍度

------

## 注意事項

- **成員權限**：只有聊天室成員才能查看詳細資訊
- **資料完整性**：回應包含成員列表和成員屬性的完整資訊
- **未讀計算**：memberProperties 中包含每個成員的未讀訊息數量
- **權限識別**：isSuperuser 欄位標識當前用戶是否為管理員
- **時間格式**：提供 ISO 格式和毫秒時間戳兩種時間格式
- **資料量**：大型聊天室可能返回大量成員資料，注意處理效能
- **即時性**：成員狀態和未讀數可能需要定期更新以保持即時性