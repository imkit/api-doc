# 釘選訊息

此端點允許聊天室擁有者或管理員將指定訊息釘選至聊天室頂部，方便成員快速查閱重要訊息。每個聊天室同一時間只能有一則釘選訊息。

## HTTP 請求

```
POST /messages/:id/pin
```

## 身份驗證

在請求標頭中包含您的用戶端金鑰和授權權杖：

| 標頭               | 說明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 用戶端金鑰   | ✅    |
| `IM-Authorization` | 用戶端權杖   | ✅    |

## 路徑參數

| 參數  | 類型   | 說明             | 必填 |
| ----- | ------ | ---------------- | ---- |
| `:id` | string | 訊息唯一識別碼   | ✅    |

此 API 無需請求內容（Request Body）。

## 使用範例

**cURL 範例：**

```bash
curl -X "POST" "http://localhost:3100/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}'
```

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/messages/${messageID}/pin`,
  null,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

## 回應

### 成功回應

當請求成功時，API 會回傳已釘選的訊息物件：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5f890cf37d980e06f6aaf349",
    "message": "重要公告：明天下午兩點開會",
    "room": "demo-room",
    "sender": {
      "_id": "aaa",
      "nickname": "AAA",
      "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
      "isRobot": false,
      "id": "aaa",
      "lastLoginTimeMS": 1602817267900
    },
    "messageType": "text",
    "appID": "SampleApp",
    "pinned": true,
    "id": "5f890cf37d980e06f6aaf349",
    "messageTimeMS": 1602817267923,
    "updatedAtMS": 1602817290000,
    "createdAtMS": 1602817267925
  }
}
```

### 回應欄位

| 欄位                  | 類型    | 說明                               |
| --------------------- | ------- | ---------------------------------- |
| `RC`                  | number  | 回應代碼（0 表示成功）             |
| `RM`                  | string  | 回應訊息                           |
| `result._id`          | string  | 訊息唯一識別碼                     |
| `result.message`      | string  | 訊息內容                           |
| `result.room`         | string  | 所屬聊天室 ID                      |
| `result.sender`       | object  | 訊息發送者資訊                     |
| `result.messageType`  | string  | 訊息類型                           |
| `result.pinned`       | boolean | 是否已釘選（釘選後為 `true`）      |
| `result.messageTimeMS`| number  | 訊息發送時間戳（毫秒）             |
| `result.updatedAtMS`  | number  | 最後更新時間戳（毫秒）             |

## 錯誤處理

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的用戶端金鑰或授權權杖
- 指定的訊息不存在
- 當前用戶不是聊天室擁有者或管理員
- 伺服器內部錯誤

## 使用注意事項

- **權限限制**：僅聊天室**擁有者（owner）**或**管理員（admin）**可以執行釘選操作
- 若要取消釘選，請使用[取消釘選訊息](./unpin-a-message) API
