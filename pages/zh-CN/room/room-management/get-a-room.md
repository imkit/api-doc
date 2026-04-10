# 取得聊天室

## 概述

此端點允許您取得指定聊天室的詳細資訊，包含成員列表、最後一則訊息、成員屬性（未讀數、已讀位置）等完整資料。

------

## API 端點

### 取得聊天室詳情

取得指定聊天室的完整資訊。

```http
GET /rooms/{id}
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | 用戶端金鑰 |
| `IM-Authorization` | string | ✅ | 用戶端權杖 |

#### Path Parameters

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `id` | string | ✅ | 聊天室 ID |

#### 範例請求

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/${roomId}`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

##### cURL 範例

```bash
curl "https://your-app.imkit.io/rooms/project-room-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**成功回應（200 OK）**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `RC` | number | 回應代碼（0 表示成功） |
| `RM` | string | 回應訊息 |
| `result` | object | 聊天室完整資訊 |

**聊天室物件欄位**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `_id` | string | 聊天室唯一識別碼 |
| `appID` | string | 應用程式識別碼 |
| `lastMessage` | object | 最後一則訊息（含發送者資訊） |
| `memberProperties` | array[object] | 成員屬性陣列（未讀數、已讀位置） |
| `members` | array[object] | 成員詳細資訊陣列 |
| `unread` | number | 當前用戶的未讀訊息數 |
| `description` | string | 聊天室描述 |
| `isSuperuser` | boolean | 當前用戶是否為超級用戶 |

**成員屬性物件**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `client` | string | 成員用戶 ID |
| `badge` | number | 未讀訊息數 |
| `lastRead` | string | 最後已讀的訊息 ID |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "project-room-001",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": "最新的訊息內容",
      "messageType": "text",
      "sender": {
        "_id": "user-a",
        "nickname": "Alice",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1488435140775
    },
    "memberProperties": [
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "user-a"
      },
      {
        "badge": 5,
        "client": "user-b"
      }
    ],
    "members": [
      {
        "_id": "user-a",
        "nickname": "Alice",
        "avatarUrl": "https://example.com/alice.jpg",
        "lastLoginTimeMS": 1487149355934
      },
      {
        "_id": "user-b",
        "nickname": "Bob",
        "avatarUrl": "https://example.com/bob.jpg",
        "lastLoginTimeMS": 1488438700398
      }
    ],
    "unread": 5,
    "description": "專案討論群",
    "isSuperuser": false
  }
}
```

#### 錯誤回應

**404 Not Found** — 聊天室不存在

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

### 聊天室資訊
- **顯示詳情**：取得聊天室的成員列表和基本資訊
- **未讀狀態**：查詢各成員的未讀訊息數和已讀位置

### 管理操作
- **成員確認**：確認特定用戶是否為聊天室成員
- **狀態檢查**：檢查聊天室的最後活動時間

------

## 注意事項

- **成員限定**：只有聊天室成員或平台管理員可以取得聊天室詳情
- **完整資料**：回應包含所有成員的詳細資訊和屬性
- **最後訊息**：`lastMessage` 物件包含發送者的完整資訊
- **未讀計算**：`unread` 欄位為當前認證用戶的未讀數
