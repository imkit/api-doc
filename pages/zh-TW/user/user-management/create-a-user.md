# 建立用戶

## 概述

此端點允許您在系統中建立或更新用戶。若 `_id` 不存在則建立新用戶，若已存在則更新該用戶的資料。此 API 僅供伺服器端使用，需要適當的身份驗證。

------

## API 端點

### 建立或更新用戶
在系統中建立新用戶，或更新已存在的用戶資料。

```http
POST /admin/clients
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

請求內容應包含 JSON 格式的用戶端資訊。

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 用戶端唯一識別碼 |
| `nickname` | string | ❌ | 用戶端顯示名稱 |
| `avatarUrl` | string | ❌ | 用戶端頭像圖片 URL |
| `issueAccessToken` | boolean | ❌ | 設為 `true` 以產生新的存取權杖；設為 `false` 或省略以使用自訂 token |
| `token` | string | ❌ | 要綁定到用戶端的自訂 token（當 `issueAccessToken` 為 `false` 或省略時使用） |
| `expirationDate` | string | ❌ | Token 過期時間（ISO 格式，當使用自訂 token 時設定） |

#### 範例請求

##### 選項一：聊天伺服器發行 Token

使用此選項讓聊天伺服器自動為用戶產生新的存取權杖。

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
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

##### 選項二：自訂 Token 綁定

使用此選項將特定的 token 綁定到用戶，並設定自訂的過期時間。

```http
POST /admin/clients HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io

{
  "nickname": "張小明",
  "avatarUrl": "https://example.com/avatar.jpg",
  "_id": "user123",
  "token": "f7b6d364-1e96-4b1a-aa75-cce93268b101",
  "expirationDate": "2026-12-31T23:59:59.000Z"
}
```

#### Response

**成功回應（200 OK）**

當請求成功時，API 會回傳建立的用戶端資訊：

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `RC` | number | 回應代碼（0 表示成功） |
| `RM` | string | 回應訊息 |
| `result` | object | 建立的用戶端資訊 |

**用戶端物件欄位**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `_id` | string | 用戶唯一識別碼 |
| `nickname` | string | 用戶顯示名稱 |
| `avatarUrl` | string | 用戶頭像圖片 URL |
| `token` | string | 存取權杖（僅在 `issueAccessToken` 為 true 時出現） |
| `expirationDate` | string | Token 過期時間（僅在發行 token 時出現） |
| `lastLoginTimeMS` | number | 最後登入時間戳（毫秒） |
| `updatedAt` | string | 最後更新時間戳（ISO 格式） |

#### 範例回應

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

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- **無效的 API 金鑰** - 提供的 `IM-API-KEY` 無效或已過期
- **缺少必填參數** - 未提供必要的 `_id` 參數
- **無效的 token 格式** - 自訂 token 格式不正確
- **伺服器內部錯誤** - 伺服器端發生未預期的錯誤

------

## 使用場景

### 用戶註冊
- **使用伺服器發行 Token 建立用戶**：當新用戶註冊時，設定 `issueAccessToken: true` 讓系統自動產生存取權杖
- **使用自訂 Token 建立用戶**：當需要整合外部身份驗證系統時，綁定自訂 token 並設定過期時間

------

## 注意事項

- **唯一識別碼**：每個用戶端都需要唯一的 `_id` 識別碼
- **Token 欄位**：回應中的 `token` 欄位僅在 `issueAccessToken` 設為 `true` 時包含
- **時間戳格式**：所有時間戳均為 UTC 格式
- **頭像圖片**：頭像圖片的檔案大小應控制在合理範圍內
- **伺服器端專用**：此端點用於建立新用戶端，僅供伺服器端使用
