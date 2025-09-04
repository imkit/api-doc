# 凍結聊天室

## 概述

凍結聊天室功能透過更新聊天室狀態來暫停或禁用聊天室的使用。當聊天室狀態設為無效（status=0）時，聊天室將被凍結，用戶無法在其中正常互動。此功能適用於內容管理、違規處理和聊天室維護。

------

## API 端點

### 凍結指定聊天室

透過更新聊天室狀態來凍結聊天室，使其變為無效狀態。

```http
PUT /rooms/{id}
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

#### Post Body

| 參數     | 類型   | 必填 | 說明                               |
| -------- | ------ | ---- | ---------------------------------- |
| `status` | number | ✅    | 聊天室狀態：0=無效（凍結），1=有效 |

#### 範例請求

**凍結聊天室**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "status": 0
}
```

**解除凍結聊天室**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "status": 1
}
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 更新後的聊天室資料     |

**聊天室物件結構**

| 參數            | 類型   | 說明                      |
| --------------- | ------ | ------------------------- |
| `_id`           | string | 聊天室唯一識別碼          |
| `name`          | string | 聊天室名稱                |
| `cover`         | string | 聊天室封面圖片 URL        |
| `description`   | string | 聊天室描述                |
| `status`        | number | 聊天室狀態（0=凍結，1=正常）|
| `lastMessage`   | object | 最後一則訊息資訊          |
| `members`       | array  | 聊天室成員列表            |

#### 範例回應

**凍結聊天室成功**

```json
{
  "RC": 0,
  "RM": "Room frozen successfully",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Test Room",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "This room has been frozen",
    "status": 0,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "Last message before freeze",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
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
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can freeze room"
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

### 內容管理
- **違規處理**：對違反社群規範的聊天室進行暫時凍結
- **緊急狀況**：在發生緊急事件時快速封鎖聊天室
- **內容審核**：暫時凍結聊天室進行內容審核

### 聊天室維護
- **系統維護**：在系統維護期間暫時凍結聊天室
- **功能更新**：在聊天室功能更新時暫時停用
- **資料遷移**：在進行資料遷移時暫停聊天室使用

### 管理操作
- **批量管理**：批量凍結或解除凍結多個聊天室
- **權限控制**：確保只有授權用戶能執行凍結操作
- **狀態追蹤**：監控聊天室的凍結狀態和歷史

------

## 注意事項

- **權限限制**：僅聊天室擁有者、管理員或平台管理員可執行凍結操作
- **狀態影響**：凍結的聊天室（status=0）將無法正常使用
- **用戶體驗**：凍結期間用戶可能無法發送訊息或進行互動
- **即時生效**：狀態更改會立即生效，影響所有聊天室成員
- **可逆操作**：可透過設定 status=1 來解除聊天室凍結
- **資料保存**：凍結聊天室不會刪除歷史訊息和成員資料
- **通知機制**：凍結操作可能會觸發相關的通知或事件