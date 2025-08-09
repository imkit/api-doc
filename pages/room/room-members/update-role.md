# 更新用戶端

此端點允許您更新系統中現有的用戶端資訊。此 API 僅供伺服器端使用，需要適當的身份驗證。

## HTTP 請求

```
POST /admin/clients
```

## 身份驗證

在請求標頭中包含您的平台 API 金鑰：

| 標頭         | 類型   | 說明              | 必填 |
| ------------ | ------ | ----------------- | ---- |
| `IM-API-KEY` | string | 您的平台 API 金鑰 | ✅    |

## 請求內容

請求內容應包含 JSON 格式的用戶端更新資訊。

### 必填參數

| 參數  | 類型   | 說明                     |
| ----- | ------ | ------------------------ |
| `_id` | string | 要更新的用戶端唯一識別碼 |

### 可更新參數

| 參數        | 類型   | 說明               |
| ----------- | ------ | ------------------ |
| `nickname`  | string | 用戶端顯示名稱     |
| `avatarUrl` | string | 用戶端頭像圖片 URL |

## Token 管理選項

更新用戶端時，您可以選擇不同的 Token 管理方式：

### 選項一：重新發行存取 Token

使用此選項為現有用戶端重新產生新的存取權杖。

| 參數               | 類型    | 說明                           |
| ------------------ | ------- | ------------------------------ |
| `issueAccessToken` | boolean | 設為 `true` 以重新產生存取權杖 |

**請求範例：**

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    _id: "user123",
    nickname: "王小華", // 更新顯示名稱
    avatarUrl: "https://example.com/new-avatar.jpg", // 更新頭像
    issueAccessToken: true, // 重新發行 token
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### 選項二：綁定指定 Token

使用此選項將新的自訂 token 綁定到現有用戶端。

| 參數               | 類型    | 說明                       |
| ------------------ | ------- | -------------------------- |
| `issueAccessToken` | boolean | 設為 `false` 或省略此參數  |
| `token`            | string  | 要綁定的新 token           |
| `expirationDate`   | string  | Token 過期時間（ISO 格式） |

**請求範例：**

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {您的_API_金鑰}
Content-Type: application/json; charset=utf-8
Host: imkit-dev.funtek.io

{
  "_id": "user123",
  "nickname": "王小華",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "token": "a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
  "expirationDate": "2025-12-31T23:59:59.999Z"
}
```

### 選項三：僅更新基本資訊

如果只需要更新用戶端的基本資訊（如暱稱、頭像），可以省略所有 token 相關參數。

**請求範例：**

```javascript
const response = await axios.post(
  "https://imkit-dev.funtek.io/admin/clients",
  {
    _id: "user123",
    nickname: "王小華",
    avatarUrl: "https://example.com/new-avatar.jpg"
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

## 回應

### 成功回應

當請求成功時，API 會回傳更新後的用戶端資訊：

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user123",
    "__v": 0,
    "appID": "SampleApp",
    "nickname": "王小華",
    "description": "使用者描述",
    "avatarUrl": "https://example.com/new-avatar.jpg",
    "address": {
      "port": 56004,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36",
    "lastJoinOrCreateRoomTime": "2020-06-08T02:00:16.685Z",
    "updatedAt": "2025-08-08T10:30:45.123Z",
    "isRobot": false,
    "mute": [],
    "id": "user123",
    "lastLoginTimeMS": 1588744338369,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2025-12-31T23:59:59.999Z"
  }
}
```

### 回應欄位

| 欄位     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 更新後的用戶端資訊     |

#### 用戶端物件欄位

| 欄位              | 類型   | 說明                                          |
| ----------------- | ------ | --------------------------------------------- |
| `_id`             | string | 用戶端唯一識別碼                              |
| `nickname`        | string | 更新後的用戶端顯示名稱                        |
| `avatarUrl`       | string | 更新後的用戶端頭像圖片 URL                    |
| `token`           | string | 存取權杖（僅在重新發行或綁定新 token 時出現） |
| `expirationDate`  | string | Token 過期時間（僅在有 token 操作時出現）     |
| `updatedAt`       | string | 最後更新時間戳（ISO 格式）                    |
| `lastLoginTimeMS` | number | 最後登入時間戳（毫秒）                        |

## 錯誤處理

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的 API 金鑰
- 用戶端不存在（指定的 `_id` 找不到）
- 無效的 token 格式
- 參數格式錯誤
- 伺服器內部錯誤

## 使用注意事項

- 此端點專用於更新現有用戶端的資訊
- 必須提供有效的 `_id` 來識別要更新的用戶端
- 如果用戶端不存在，請求將會失敗
- 只有提供的欄位會被更新，未提供的欄位保持原值
- 重新發行 token 會使舊的 token 失效
- 綁定新 token 會替換原有的 token
- 所有時間戳均為 UTC 格式
- 頭像圖片的檔案大小應控制在合理範圍內
