# 刪除訊息

## 概述

管理員權限專用的訊息刪除功能，允許平台管理員、聊天室擁有者和聊天室管理員刪除指定的訊息或清空整個聊天室的所有訊息。此功能適用於內容管理、違規內容清理和聊天室維護。

------

## API 端點

### 刪除聊天室訊息

刪除聊天室中的特定訊息或所有訊息，僅限具備管理權限的用戶使用。

```http
DELETE /rooms/{roomID}/messages/{messageID}
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### Path Parameters

| 參數        | 類型   | 必填 | 說明                                                |
| ----------- | ------ | ---- | --------------------------------------------------- |
| `roomID`    | string | ✅    | 聊天室 ID                                           |
| `messageID` | string | ✅    | 要刪除的訊息 ID，或使用 `_all` 刪除聊天室內所有訊息 |

#### 範例請求

**刪除特定訊息**

```http
DELETE /rooms/test-room-123/messages/5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```

**刪除聊天室所有訊息**

```http
DELETE /rooms/test-room-123/messages/_all HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {ACCESS_TOKEN}
Content-Type: application/json; charset=utf-8
Connection: close
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 刪除操作結果           |

**刪除結果物件結構**

| 參數           | 類型   | 說明                          |
| -------------- | ------ | ----------------------------- |
| `deletedCount` | number | 已刪除的訊息數量              |
| `roomID`       | string | 聊天室 ID                     |
| `messageID`    | string | 被刪除的訊息 ID（或 "_all"）  |
| `deletedBy`    | string | 執行刪除操作的用戶 ID         |
| `deletedAt`    | string | 刪除時間                      |

#### 範例回應

**刪除單一訊息**

```json
{
  "RC": 0,
  "RM": "Message deleted successfully",
  "result": {
    "deletedCount": 1,
    "roomID": "test-room-123",
    "messageID": "5f890cf37d980e06f6aaf349",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
  }
}
```

**刪除所有訊息**

```json
{
  "RC": 0,
  "RM": "All messages deleted successfully",
  "result": {
    "deletedCount": 145,
    "roomID": "test-room-123",
    "messageID": "_all",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
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
    "code": "INSUFFICIENT_PERMISSION",
    "message": "Only platform admin, room owner or room manager can delete messages"
  }
}
```

**404 Not Found** - 訊息或聊天室不存在

```json
{
  "RC": 404,
  "RM": "Message not found",
  "error": {
    "code": "MESSAGE_NOT_FOUND",
    "message": "The specified message does not exist in this room"
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

### 內容管理
- **違規處理**：刪除違反社群規範的不當訊息
- **垃圾訊息**：清理廣告訊息或垃圾內容
- **敏感內容**：移除包含敏感資訊的訊息

### 聊天室維護
- **聊天室重置**：清空聊天室重新開始對話
- **測試清理**：清理測試環境的測試訊息
- **定期維護**：定期清理過舊的訊息內容

### 管理操作
- **緊急處理**：快速處理需要立即移除的內容
- **批量清理**：一次性刪除聊天室內所有訊息
- **權限控制**：確保只有授權用戶能執行刪除操作

------

## 注意事項

- **權限限制**：僅限平台管理員、聊天室擁有者和聊天室管理員使用
- **永久刪除**：訊息刪除後無法復原，請謹慎使用
- **批量刪除**：使用 `_all` 參數會刪除聊天室內所有訊息
- **操作記錄**：所有刪除操作都會記錄執行者和時間
- **即時生效**：刪除操作會立即生效，所有用戶都會看到訊息消失
- **通知機制**：刪除操作可能會觸發相關的通知或事件
- **與撤回區別**：此功能為強制刪除，與用戶自主撤回功能不同