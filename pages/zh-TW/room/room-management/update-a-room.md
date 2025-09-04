# 更新聊天室

## 概述

更新現有聊天室的資訊和設定。此 API 允許修改聊天室的基本資訊、權限設定、管理員配置等。僅限聊天室的擁有者、管理員或平台管理員使用。

------

## API 端點

### 更新聊天室資訊

修改指定聊天室的屬性和設定。

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

| 參數          | 類型    | 必填 | 說明                                                      |
| ------------- | ------- | ---- | --------------------------------------------------------- |
| `name`        | string  | ❌    | 聊天室名稱                                                |
| `cover`       | string  | ❌    | 聊天室封面圖片 URL                                        |
| `description` | string  | ❌    | 聊天室描述                                                |
| `roomTags`    | array   | ❌    | 共享聊天室標籤陣列                                        |
| `webhook`     | string  | ❌    | Webhook 金鑰或 URL                                        |
| `botMode`     | boolean | ❌    | 是否啟用聊天室機器人                                      |
| `extParams`   | string  | ❌    | 擴展自訂參數，格式：param1=value1&param2=value2&...      |
| `opening`     | number  | ❌    | 開放狀態：0=關閉加入或邀請，1=開放加入和邀請              |
| `owner`       | string  | ❌    | 新的擁有者客戶端 ID（限平台管理員或聊天室超級用戶）       |
| `managers`    | array   | ❌    | 管理員客戶端 ID 陣列（限平台管理員或聊天室超級用戶）      |
| `status`      | number  | ❌    | 聊天室狀態：0=無效，1=有效                                |

#### 範例請求

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "description": "Description La La",
  "name": "Martena",
  "cover": "http://loremflickr.com/240/240/style?Kelly"
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
| `status`        | number | 聊天室狀態                |
| `lastMessage`   | object | 最後一則訊息資訊          |
| `members`       | array  | 聊天室成員列表            |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Martena",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "Description La La",
    "status": 1,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "hhhooo",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
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
  "RM": "Forbidden",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can update room"
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

### 聊天室管理
- **基本資訊維護**：更新聊天室名稱、描述、封面圖片
- **權限管理**：調整聊天室開放狀態和管理員配置
- **功能設定**：啟用或停用機器人模式

### 管理後台
- **批量管理**：透過管理介面批量更新聊天室設定
- **內容審核**：修改不當的聊天室資訊
- **所有權轉移**：將聊天室擁有權轉移給其他用戶

### 系統整合
- **Webhook 配置**：設定聊天室的 Webhook 接收端點
- **擴展參數**：透過 extParams 整合第三方系統
- **狀態管理**：啟用或停用特定聊天室

------

## 注意事項

- **權限限制**：僅聊天室擁有者、管理員或平台管理員可執行更新
- **所有權轉移**：更改 owner 和 managers 需要更高權限
- **參數驗證**：所有參數都是選擇性的，只更新提供的欄位
- **狀態影響**：設定 status=0 會讓聊天室變為無效狀態
- **開放設定**：opening 參數影響新用戶是否能加入聊天室
