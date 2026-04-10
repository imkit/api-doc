# 批次建立用戶

## 概述

此端點允許您一次建立或更新多位用戶。適用於系統遷移、大量匯入用戶等場景。此 API 僅供伺服器端使用，需要適當的身份驗證。

------

## API 端點

### 批次建立或更新用戶

一次建立或更新多位用戶端。

```http
POST /admin/clients/list
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `data` | array[object] | ✅ | 用戶資訊陣列 |

**用戶資訊物件**

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | 用戶唯一識別碼 |
| `nickname` | string | ❌ | 用戶顯示名稱 |
| `avatarUrl` | string | ❌ | 用戶頭像圖片 URL |

#### 範例請求

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients/list",
  {
    data: [
      {
        _id: "user-001",
        nickname: "Alice",
        avatarUrl: "https://example.com/alice.jpg",
      },
      {
        _id: "user-002",
        nickname: "Bob",
        avatarUrl: "https://example.com/bob.jpg",
      },
      {
        _id: "user-003",
        nickname: "Charlie",
        avatarUrl: "https://example.com/charlie.jpg",
      },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### cURL 範例

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients/list" \
     -H 'IM-API-KEY: {您的_API_KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "data": [
    {"_id": "user-001", "nickname": "Alice", "avatarUrl": "https://example.com/alice.jpg"},
    {"_id": "user-002", "nickname": "Bob", "avatarUrl": "https://example.com/bob.jpg"}
  ]
}'
```

#### Response

**成功回應（200 OK）**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `RC` | number | 回應代碼（0 表示成功） |
| `RM` | string | 回應訊息 |
| `result.count` | number | 成功建立或更新的用戶數量 |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 3
  }
}
```

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- **無效的 API 金鑰** — 提供的 `IM-API-KEY` 無效或已過期
- **資料格式錯誤** — `data` 陣列格式不正確
- **缺少必填欄位** — 用戶資訊中缺少 `_id`
- **伺服器內部錯誤** — 伺服器端發生未預期的錯誤

------

## 使用場景

### 系統遷移
- **用戶匯入**：從現有系統遷移用戶資料到 IMKIT
- **批次初始化**：應用程式啟動時批次建立所有用戶

### 資料同步
- **定期同步**：定期從主系統同步用戶資料（暱稱、頭像等）
- **更新資訊**：批次更新多位用戶的顯示名稱或頭像

------

## 注意事項

- **僅供伺服器端使用**：此端點必須在後端呼叫
- **不產生 Token**：此 API 不會為用戶產生存取權杖，如需 Token 請使用「建立用戶」API 並設定 `issueAccessToken: true`
- **冪等性**：若 `_id` 已存在，會更新該用戶的資料而非建立新用戶
- **效能考量**：建議每次批次不超過 100 筆，避免請求超時
