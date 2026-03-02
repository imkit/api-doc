# 移除成員

此端點允許您將一位或多位成員從指定聊天室中移除。若在 `members` 中傳入當前用戶自身的 ID，則代表該用戶主動離開聊天室。此 API 僅供伺服器端使用，需要適當的身份驗證。

## HTTP 請求

```
POST /rooms/:id/delete/members
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
| `:id` | string | 聊天室唯一識別碼 | ✅    |

## 請求內容

| 參數            | 類型          | 必填 | 說明                                                                                         |
| --------------- | ------------- | ---- | -------------------------------------------------------------------------------------------- |
| `members`       | array[string] | ✅    | 要移除的成員 ID 陣列；若包含當前用戶自身 ID，代表主動離開聊天室                             |
| `systemMessage` | boolean       | ❌    | 是否自動產生離開或移除成員的系統訊息（`leaveRoom` 或 `deleteMember`），預設為 `false`        |

## 使用範例

### 範例一：移除指定成員

**cURL 範例：**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/delete/members" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"members": ["ccc", "bbb"], "systemMessage": true}'
```

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/delete/members`,
  {
    members: ["ccc", "bbb"],
    systemMessage: true,
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

### 範例二：當前用戶主動離開聊天室

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/delete/members`,
  {
    members: [`${MY_CLIENT_ID}`],
    systemMessage: true,
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

## 回應

### 成功回應

當請求成功時，API 會回傳更新後的聊天室資訊：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "lastMessage": {
      "_id": "58a2dc9c965d09221ea7bedb",
      "message": "sadf dsfdf",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0,
        "id": "1485248560558"
      },
      "messageTime": "2017-02-14T10:31:56.006Z",
      "messageTimeMS": 1487068316006,
      "id": "58a2dc9c965d09221ea7bedb"
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1487068306745,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 1486720993257,
        "id": "1485248566481"
      }
    ],
    "id": "demo-room"
  }
}
```

### 回應欄位

| 欄位     | 類型   | 說明                     |
| -------- | ------ | ------------------------ |
| `RC`     | number | 回應代碼（0 表示成功）   |
| `RM`     | string | 回應訊息                 |
| `result` | object | 更新後的聊天室完整資訊   |

## 錯誤處理

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的用戶端金鑰或授權權杖
- 指定的聊天室不存在
- `members` 中包含不在聊天室內的用戶 ID
- 伺服器內部錯誤

## 使用注意事項

- **主動離開**：在 `members` 陣列中傳入當前用戶自身的 ID，即代表該用戶主動離開聊天室
- **系統訊息**：設定 `systemMessage: true` 時，若成員為主動離開，系統訊息類型為 `leaveRoom`；若為被移除，則為 `deleteMember`
- 成員被移除後，將無法再存取該聊天室的任何訊息記錄
