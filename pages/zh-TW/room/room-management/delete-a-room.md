# 刪除聊天室

此端點允許您永久刪除指定的聊天室及其所有訊息。刪除後,聊天室資料與訊息記錄將從資料庫中完全移除且無法復原。此 API 僅供伺服器端使用,需要適當的身份驗證。

## HTTP 請求

```
DELETE /rooms/:id
```

## 身份驗證

在請求標頭中包含您的用戶端金鑰和授權權杖:

| 標頭               | 說明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 用戶端金鑰   | ✅    |
| `IM-Authorization` | 用戶端權杖   | ✅    |

## 路徑參數

| 參數  | 類型   | 說明           | 必填 |
| ----- | ------ | -------------- | ---- |
| `:id` | string | 聊天室唯一識別碼 | ✅    |

## 使用範例

### 範例一:刪除指定聊天室

**cURL 範例:**

```bash
curl -X "DELETE" "http://localhost:3100/rooms/test-room-123" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8'
```

**JavaScript 範例:**

```javascript
const response = await axios.delete(
  "http://localhost:3100/rooms/test-room-123",
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

當請求成功時,API 會回傳刪除操作的結果:

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

### 回應欄位

| 欄位     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼(0 表示成功)   |
| `RM`     | string | 回應訊息               |
| `result` | object | 刪除操作的結果         |

#### 結果物件欄位

| 欄位   | 類型   | 說明                       |
| ------ | ------ | -------------------------- |
| `n`    | number | 受影響的文件數量           |
| `ok`   | number | 操作是否成功(1 表示成功)   |

## 錯誤處理

當請求失敗時,您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括:

- 無效的用戶端金鑰或授權權杖
- 指定的聊天室不存在
- 無刪除該聊天室的權限
- 伺服器內部錯誤

## 使用注意事項

- **永久刪除**:此操作會將聊天室及其所有訊息從資料庫永久刪除,無法復原
- **訊息一併刪除**:聊天室內所有的訊息記錄也會同步被刪除
- 請確認聊天室 ID 正確,避免誤刪重要的聊天室
- 刪除後,原本在該聊天室中的成員將無法再存取任何相關資料
