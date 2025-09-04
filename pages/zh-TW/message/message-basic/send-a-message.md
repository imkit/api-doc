# 發送訊息

## 概述

透過 API 向指定聊天室發送訊息。支援多種訊息類型、提及功能和訊息更新。此 API 適用於需要透過後端服務發送訊息的場景，不同於透過 Socket 的即時訊息發送。

------

## API 端點

### 發送聊天室訊息

向指定聊天室發送新訊息或更新現有訊息。

```http
POST /rooms/{roomId}/message
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `Authorization`    | string | ✅    | Client Token   |

#### Path Parameters

| 參數     | 類型   | 必填 | 說明        |
| -------- | ------ | ---- | ----------- |
| `roomId` | string | ✅    | 聊天室 ID   |

#### Post Body

| 參數          | 類型   | 必填 | 說明                                    |
| ------------- | ------ | ---- | --------------------------------------- |
| `message`     | any    | ✅    | 訊息內容（可為文字、物件等任意格式）    |
| `messageType` | string | ✅    | 自訂訊息類型                            |
| `_id`         | string | ❌    | 訊息 ID（提供時為更新現有訊息）         |
| `mentions`    | array  | ❌    | 提及的用戶 ID 陣列                      |

#### 範例請求

**發送文字訊息**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "Hello everyone!",
  "messageType": "text"
}
```

**發送公告訊息**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "hhhooo",
  "messageType": "announcement"
}
```

**發送帶提及的訊息**

```http
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "message": "Hello @user1 and @user2!",
  "messageType": "text",
  "mentions": ["user1", "user2"]
}
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 發送的訊息資料         |

**訊息物件結構**

| 參數             | 類型   | 說明                          |
| ---------------- | ------ | ----------------------------- |
| `_id`            | string | 訊息唯一識別碼                |
| `room`           | string | 所屬聊天室 ID                 |
| `message`        | any    | 訊息內容                      |
| `messageType`    | string | 訊息類型                      |
| `sender`         | object | 發送者資訊                    |
| `appID`          | string | 應用程式識別碼                |
| `messageTimeMS`  | number | 訊息發送時間（毫秒時間戳）    |
| `updatedAtMS`    | number | 訊息更新時間（毫秒時間戳）    |
| `createdAtMS`    | number | 訊息建立時間（毫秒時間戳）    |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58bf8f1dc3b24c04d19d9add",
    "room": "58871b877390be11d5f1ab30",
    "message": "hhhooo",
    "messageType": "announcement",
    "sender": null,
    "appID": "SampleApp",
    "__v": 0,
    "messageTimeMS": 1488949021290,
    "updatedAtMS": 1488949021290,
    "createdAtMS": 1488949021290
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

**403 Forbidden** - 權限不足或聊天室不存在

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "Client is not in the room or room does not exist"
  }
}
```

**400 Bad Request** - 請求參數無效

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_MESSAGE_FORMAT",
    "message": "Message content or type is invalid"
  }
}
```

------

## 使用場景

### 後端服務整合
- **系統通知**：由後端服務自動發送系統公告或通知
- **機器人訊息**：透過 API 實現聊天機器人功能
- **批量傳送**：程式化發送大量訊息

### 訊息管理
- **公告發布**：發送重要公告或系統消息
- **提及通知**：發送包含用戶提及的訊息以觸發通知
- **訊息更新**：透過提供 _id 參數更新現有訊息

### 應用整合
- **第三方整合**：將外部系統的資料以訊息形式發送到聊天室
- **自動回覆**：實現自動客服或問答功能
- **工作流程**：在工作流程中插入聊天室通知

------

## 注意事項

- **成員權限**：只有聊天室成員才能發送訊息
- **訊息格式**：message 欄位支援任意格式，可為文字、JSON 物件等
- **訊息類型**：messageType 為自訂欄位，可根據應用需求設定
- **提及功能**：mentions 陣列中的用戶 ID 會收到提及通知
- **訊息更新**：提供 _id 參數時會更新現有訊息而非建立新訊息
- **API vs Socket**：此 API 用於後端服務，一般用戶聊天建議使用 Socket 連線
