# 更新用戶

## 概述

此端點允許您更新系統中現有的用戶資訊。此 API 僅供伺服器端使用，需要適當的身份驗證。

------

## API 端點

### 更新用戶
更新系統中現有的用戶端資訊。

```http
POST /admin/clients
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

請求內容應包含 JSON 格式的用戶端更新資訊。

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 要更新的用戶端唯一識別碼 |
| `nickname` | string | ❌ | 用戶端顯示名稱 |
| `avatarUrl` | string | ❌ | 用戶端頭像圖片 URL |
| `issueAccessToken` | boolean | ❌ | 設為 `true` 以重新產生存取權杖；設為 `false` 或省略以使用自訂 token |
| `token` | string | ❌ | 要綁定的新 token（當 `issueAccessToken` 為 `false` 或省略時使用） |
| `expirationDate` | string | ❌ | Token 過期時間（ISO 格式，當使用自訂 token 時設定） |

#### 範例請求

##### 選項一：重新發行存取 Token

使用此選項為現有用戶重新產生新的存取權杖。

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
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

##### 選項二：綁定指定 Token

使用此選項將新的自訂 token 綁定到現有用戶端。

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io

{
  "_id": "user123",
  "nickname": "王小華",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "token": "a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
  "expirationDate": "2025-12-31T23:59:59.999Z"
}
```

##### 選項三：僅更新基本資訊

如果只需要更新用戶端的基本資訊（如暱稱、頭像），可以省略所有 token 相關參數。

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
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

#### Response

**成功回應（200 OK）**

當請求成功時，API 會回傳更新後的用戶端資訊：

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `RC` | number | 回應代碼（0 表示成功） |
| `RM` | string | 回應訊息 |
| `result` | object | 更新後的用戶端資訊 |

**用戶端物件欄位**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `_id` | string | 用戶唯一識別碼 |
| `nickname` | string | 更新後的用戶顯示名稱 |
| `avatarUrl` | string | 更新後的用戶頭像圖片 URL |
| `token` | string | 存取權杖（僅在重新發行或綁定新 token 時出現） |
| `expirationDate` | string | Token 過期時間（僅在有 token 操作時出現） |
| `updatedAt` | string | 最後更新時間戳（ISO 格式） |
| `lastLoginTimeMS` | number | 最後登入時間戳（毫秒） |

#### 範例回應

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

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- **無效的 API 金鑰** - 提供的 `IM-API-KEY` 無效或已過期
- **用戶端不存在** - 指定的 `_id` 找不到對應的用戶端
- **無效的 token 格式** - 自訂 token 格式不正確
- **參數格式錯誤** - 提供的參數格式不符合要求
- **伺服器內部錯誤** - 伺服器端發生未預期的錯誤

------

## 使用場景

### 用戶資訊維護
- **更新顯示名稱與頭像**：當用戶修改個人資料時，僅更新 `nickname` 和 `avatarUrl` 等基本資訊
- **重新發行存取權杖**：當用戶的 token 即將過期或需要刷新時，設定 `issueAccessToken: true` 重新產生

### Token 管理
- **綁定自訂 Token**：當整合外部身份驗證系統時，將自訂的 token 綁定到現有用戶端
- **Token 輪換**：定期更換用戶的 token 以提升安全性

------

## 注意事項

- **用戶必須存在**：此頁面的使用場景為更新已存在的用戶。若需同時支援建立和更新，請參考[建立用戶](/zh-TW/user/user-management/create-a-user)
- **部分更新**：只有提供的欄位會被更新，未提供的欄位保持原值
- **Token 失效**：重新發行 token 會使舊的 token 失效
- **Token 替換**：綁定新 token 會替換原有的 token
- **時間戳格式**：所有時間戳均為 UTC 格式
- **頭像圖片**：頭像圖片的檔案大小應控制在合理範圍內
- **伺服器端專用**：此端點專用於更新現有用戶端的資訊
