# 撤回訊息

此端點允許用戶撤回聊天室中的指定訊息。撤回後，原訊息內容會被清空，訊息類型變更為 `recall`，聊天室中的所有成員都能看到該訊息已被撤回。支援用戶端和平台 API 兩種驗證方式。

## HTTP 請求

```
POST /rooms/:roomId/message
```

## 身份驗證

此 API 支援兩種驗證方式，擇一使用：

### 用戶端驗證

| 標頭               | 說明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 用戶端金鑰   | ✅    |
| `IM-Authorization` | 用戶端權杖   | ✅    |

### 平台 API 驗證

| 標頭         | 說明             | 必填 |
| ------------ | ---------------- | ---- |
| `IM-API-KEY` | 平台 API 金鑰    | ✅    |

## 路徑參數

| 參數       | 類型   | 說明             | 必填 |
| ---------- | ------ | ---------------- | ---- |
| `:roomId`  | string | 聊天室唯一識別碼 | ✅    |

## 請求內容

| 參數          | 類型   | 必填 | 說明                            |
| ------------- | ------ | ---- | ------------------------------- |
| `messageType` | string | ✅    | 固定填入 `"recall"`             |
| `_id`         | string | ✅    | 要撤回的訊息唯一識別碼          |

## 使用範例

### 範例一：用戶端驗證撤回訊息

**cURL 範例：**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"_id": "5ce3d80bd594874e495895a4", "messageType": "recall"}'
```

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### 範例二：平台 API 驗證撤回訊息

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

## 回應

### 成功回應

當請求成功時，API 會回傳已撤回的訊息物件，訊息內容會被清空：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5ce3d80bd594874e495895a4",
    "message": "",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Nita",
      "avatarUrl": "http://loremflickr.com/240/240/style?1558435839",
      "isRobot": false,
      "id": "sss",
      "lastLoginTimeMS": 1553145898032
    },
    "messageType": "recall",
    "appID": "SampleApp",
    "id": "5ce3d80bd594874e495895a4",
    "messageTimeMS": 1558435851576,
    "updatedAtMS": 1558435921086,
    "createdAtMS": 1558435851580
  }
}
```

### 回應欄位

| 欄位                  | 類型   | 說明                               |
| --------------------- | ------ | ---------------------------------- |
| `RC`                  | number | 回應代碼（0 表示成功）             |
| `RM`                  | string | 回應訊息                           |
| `result._id`          | string | 訊息唯一識別碼                     |
| `result.message`      | string | 訊息內容（撤回後為空字串）         |
| `result.room`         | string | 所屬聊天室 ID                      |
| `result.sender`       | object | 撤回操作的發送者資訊               |
| `result.messageType`  | string | 訊息類型（撤回後為 `"recall"`）    |
| `result.messageTimeMS`| number | 訊息發送時間戳（毫秒）             |
| `result.updatedAtMS`  | number | 最後更新時間戳（毫秒）             |

## 錯誤處理

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的驗證金鑰或權杖
- 指定的訊息或聊天室不存在
- 無權限撤回該訊息
- 伺服器內部錯誤

## 使用注意事項

- **撤回效果**：撤回後，訊息的 `message` 欄位會變為空字串，`messageType` 變為 `"recall"`，聊天室所有成員均可看到撤回狀態
- **`_id`**：請求 Body 中的 `_id` 為要撤回的**訊息** ID，非聊天室 ID
- **兩種驗證**：用戶端驗證（`IM-CLIENT-KEY` + `IM-Authorization`）適用於一般用戶操作；平台 API 驗證（`IM-API-KEY`）適用於後台管理操作
