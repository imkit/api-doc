# 取消靜音聊天室通知

此端點允許當前用戶取消指定聊天室的靜音設定，恢復接收該聊天室的推播通知。此設定為個人偏好，僅影響當前用戶，不影響其他成員。

## HTTP 請求

```
DELETE /me/mute/:room
```

## 身份驗證

在請求標頭中包含您的用戶端金鑰和授權權杖：

| 標頭               | 說明         | 必填 |
| ------------------ | ------------ | ---- |
| `IM-CLIENT-KEY`    | 用戶端金鑰   | ✅    |
| `IM-Authorization` | 用戶端權杖   | ✅    |

## 路徑參數

| 參數    | 類型   | 說明             | 必填 |
| ------- | ------ | ---------------- | ---- |
| `:room` | string | 聊天室唯一識別碼 | ✅    |

此 API 無需請求內容（Request Body）。

## 使用範例

**cURL 範例：**

```bash
curl -X "DELETE" "http://localhost:3100/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}'
```

**JavaScript 範例：**

```javascript
const response = await axios.delete(
  `http://localhost:3100/me/mute/${roomID}`,
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

當請求成功時，API 會回傳更新後的當前用戶資訊，`mute` 陣列中將不再包含該聊天室 ID：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test AB",
    "appID": "SampleApp",
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 56216,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36",
    "mute": [],
    "lastLoginTimeMS": 1487068306745
  }
}
```

### 回應欄位

| 欄位              | 類型          | 說明                                     |
| ----------------- | ------------- | ---------------------------------------- |
| `RC`              | number        | 回應代碼（0 表示成功）                   |
| `RM`              | string        | 回應訊息                                 |
| `result`          | object        | 更新後的當前用戶資訊                     |
| `result._id`      | string        | 用戶唯一識別碼                           |
| `result.nickname` | string        | 用戶顯示名稱                             |
| `result.email`    | string        | 用戶電子郵件                             |
| `result.mute`     | array[string] | 已靜音的聊天室 ID 陣列（取消後移除）     |

## 錯誤處理

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的用戶端金鑰或授權權杖
- 指定的聊天室不存在
- 伺服器內部錯誤

## 使用注意事項

- **個人偏好**：取消靜音設定僅影響當前用戶，其他成員的通知不受影響
- **靜音狀態**：成功後，該聊天室 ID 會從回應中 `mute` 陣列移除，代表用戶目前靜音的所有聊天室
- 若要靜音聊天室，請使用[靜音聊天室通知](./mute-room-notification) API
