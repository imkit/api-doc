# 建立用戶

此端點允許您在系統中建立新的用戶。此 API 僅供伺服器端使用，需要適當的身份驗證。

## HTTP 請求

```
POST /admin/clients
```

## 身份驗證

在請求標頭中包含您的平台 API 金鑰：

| 標頭         | 說明              | 必填 |
| ------------ | ----------------- | ---- |
| `IM-API-KEY` | 您的平台 API 金鑰 | ✅    |

## 請求內容

請求內容應包含 JSON 格式的用戶端資訊。

### 必填參數

| 參數  | 類型   | 說明             |
| ----- | ------ | ---------------- |
| `_id` | string | 用戶端唯一識別碼 |

### 選填參數

| 參數        | 類型   | 說明               |
| ----------- | ------ | ------------------ |
| `nickname`  | string | 用戶端顯示名稱     |
| `avatarUrl` | string | 用戶端頭像圖片 URL |

## 身份驗證選項

建立用戶時，您可以選擇兩種身份驗證方式：

### 選項一：聊天伺服器發行 Token

使用此選項讓聊天伺服器自動為用戶產生新的存取權杖。

| 參數               | 類型    | 說明                           |
| ------------------ | ------- | ------------------------------ |
| `issueAccessToken` | boolean | 設為 `true` 以產生新的存取權杖 |

**請求範例：**

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    nickname: "張小明",
    avatarUrl: "https://example.com/avatar.jpg",
    _id: "user123",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### 選項二：自訂 Token 綁定

使用此選項將特定的 token 綁定到用戶，並設定自訂的過期時間。

| 參數               | 類型    | 說明                       |
| ------------------ | ------- | -------------------------- |
| `issueAccessToken` | boolean | 設為 `false` 或省略此參數  |
| `token`            | string  | 要綁定到用戶端的自訂 token |
| `expirationDate`   | string  | Token 過期時間（ISO 格式） |

**請求範例：**

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {您的_API_金鑰}
Content-Type: application/json; charset=utf-8
Host: imkit-dev.funtek.io

{
  "nickname": "張小明",
  "avatarUrl": "https://example.com/avatar.jpg",
  "_id": "user123",
  "token": "f7b6d364-1e96-4b1a-aa75-cce93268b101",
  "expirationDate": "2020-06-18T06:15:36.763Z"
}
```

## 回應

### 成功回應

當請求成功時，API 會回傳建立的用戶端資訊：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "張小明",
    "description": "使用者描述",
    "avatarUrl": "https://example.com/avatar.jpg",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2020-06-11T06:15:36.761Z",
    "isRobot": false,
    "mute": [],
    "id": "user123",
    "lastLoginTimeMS": 1588744338369,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2020-06-18T06:15:36.763Z"
  }
}
```

### 回應欄位

| 欄位     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 建立的用戶端資訊       |

#### 用戶端物件欄位

| 欄位              | 類型   | 說明                                               |
| ----------------- | ------ | -------------------------------------------------- |
| `_id`             | string | 用戶唯一識別碼                                     |
| `nickname`        | string | 用戶顯示名稱                                       |
| `avatarUrl`       | string | 用戶頭像圖片 URL                                   |
| `token`           | string | 存取權杖（僅在 `issueAccessToken` 為 true 時出現） |
| `expirationDate`  | string | Token 過期時間（僅在發行 token 時出現）            |
| `lastLoginTimeMS` | number | 最後登入時間戳（毫秒）                             |
| `updatedAt`       | string | 最後更新時間戳（ISO 格式）                         |

## 錯誤處理

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的 API 金鑰
- 缺少必填參數
- 無效的 token 格式
- 伺服器內部錯誤

## 使用注意事項

- 此端點用於建立新用戶端
- 每個用戶端都需要唯一的 `_id` 識別碼
- 回應中的 `token` 欄位僅在 `issueAccessToken` 設為 `true` 時包含
- 所有時間戳均為 UTC 格式
- 頭像圖片的檔案大小應控制在合理範圍內
