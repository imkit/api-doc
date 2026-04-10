# 用戶群組列表

## 概述

查詢系統中所有的用戶群組列表。可搭配 `limit` 參數控制回傳數量。此為伺服器端 API，需使用 `IM-API-KEY` 進行驗證。

------

## API 端點

### 查詢用戶群組列表

取得系統中所有用戶群組的列表。

```http
GET /admin/groups
```

#### Headers

| 參數         | 類型   | 必填 | 說明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金鑰 |

#### Query Parameters

| 參數    | 類型   | 必填 | 說明                             |
| ------- | ------ | ---- | -------------------------------- |
| `limit` | number | ❌    | 回傳的最大群組數量               |

#### 範例請求

**JavaScript（axios）**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/groups",
  {
    params: {
      limit: 50
    },
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/groups?limit=50" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**成功回應（200 OK）**

| 參數                    | 類型   | 說明                         |
| ----------------------- | ------ | ---------------------------- |
| `RC`                    | number | 回應代碼（0 表示成功）       |
| `RM`                    | string | 回應訊息                     |
| `result`                | object | 查詢結果                     |
| `result.totalCount`     | number | 群組總數                     |
| `result.data`           | array  | 群組資料陣列                 |

**群組物件結構**

| 參數        | 類型   | 說明                       |
| ----------- | ------ | -------------------------- |
| `_id`       | string | 群組唯一識別碼             |
| `nickname`  | string | 群組顯示名稱               |
| `avatarUrl` | string | 群組頭像圖片 URL           |
| `members`   | array  | 群組成員的 Client ID 陣列  |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 3,
    "data": [
      {
        "_id": "group_customer_service",
        "nickname": "客服團隊",
        "avatarUrl": "https://example.com/cs-avatar.png",
        "members": ["agent001", "agent002", "agent003"]
      },
      {
        "_id": "group_sales",
        "nickname": "業務團隊",
        "avatarUrl": "https://example.com/sales-avatar.png",
        "members": ["sales001", "sales002"]
      },
      {
        "_id": "group_engineering",
        "nickname": "工程團隊",
        "avatarUrl": "https://example.com/eng-avatar.png",
        "members": ["dev001", "dev002", "dev003", "dev004"]
      }
    ]
  }
}
```

#### 錯誤回應

**401 Unauthorized** - API 金鑰無效

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

------

## 使用場景

### 群組管理
- **群組總覽**：在管理後台列出所有用戶群組，提供管理介面
- **成員審查**：檢視各群組的成員組成，確認權限配置正確

### 系統整合
- **同步群組資料**：將群組資料同步至外部系統（如 CRM、HR 系統）
- **權限稽核**：定期匯出群組清單，進行存取權限稽核

------

## 注意事項

- **僅限伺服器端使用**：此端點需使用 `IM-API-KEY` 驗證，僅限伺服器端呼叫
- **limit 參數**：未指定 `limit` 時，系統將回傳預設數量的群組
- **群組概念**：回傳的是用戶群組（虛擬用戶），非群組聊天室
- **成員資訊**：回傳的 `members` 僅包含 Client ID，如需成員詳細資訊需另行查詢用戶 API
