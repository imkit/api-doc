# 建立用戶群組

## 概述

建立用戶群組（User Group）。用戶群組是一個虛擬用戶，代表一個團隊或組織單位。將群組 ID 加入聊天室的成員或受邀者清單後，該群組內所有成員都可以在該聊天室中發送與接收訊息。

> **重要提示**：用戶群組（User Group）與群組聊天室（Group Chat Room）是不同的概念。用戶群組是一個虛擬的用戶身份，可被當作單一用戶加入聊天室，群組內的所有成員共享該聊天室的存取權限。

------

## API 端點

### 建立用戶群組

在系統中建立一個新的用戶群組。

```http
POST /admin/groups
```

#### Headers

| 參數           | 類型   | 必填 | 說明                            |
| -------------- | ------ | ---- | ------------------------------- |
| `IM-API-KEY`   | string | ✅    | 您的平台 API 金鑰              |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

| 參數        | 類型   | 必填 | 說明                               |
| ----------- | ------ | ---- | ---------------------------------- |
| `_id`       | string | ❌    | 群組唯一識別碼（不提供時由系統自動產生） |
| `nickname`  | string | ✅    | 群組顯示名稱                       |
| `avatarUrl` | string | ❌    | 群組頭像圖片 URL                   |
| `members`   | array  | ❌    | 群組成員的 Client ID 陣列          |

#### 範例請求

**JavaScript（axios）**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/groups",
  {
    _id: "group_customer_service",
    nickname: "客服團隊",
    avatarUrl: "https://example.com/team-avatar.png",
    members: ["agent001", "agent002", "agent003"]
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X POST "https://your-app.imkit.io/admin/groups" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "_id": "group_customer_service",
    "nickname": "客服團隊",
    "avatarUrl": "https://example.com/team-avatar.png",
    "members": ["agent001", "agent002", "agent003"]
  }'
```

#### Response

**成功回應（200 OK）**

| 參數              | 類型   | 說明                         |
| ----------------- | ------ | ---------------------------- |
| `RC`              | number | 回應代碼（0 表示成功）       |
| `RM`              | string | 回應訊息                     |
| `result`          | object | 建立的群組資訊               |
| `result._id`      | string | 群組唯一識別碼               |
| `result.nickname` | string | 群組顯示名稱                 |
| `result.avatarUrl`| string | 群組頭像圖片 URL             |
| `result.members`  | array  | 群組成員的 Client ID 陣列    |
| `result.createdAt`| string | 建立時間（ISO 格式）         |
| `result.updatedAt`| string | 最後更新時間（ISO 格式）     |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "group_customer_service",
    "nickname": "客服團隊",
    "avatarUrl": "https://example.com/team-avatar.png",
    "members": ["agent001", "agent002", "agent003"],
    "createdAt": "2026-04-11T08:30:00.000Z",
    "updatedAt": "2026-04-11T08:30:00.000Z"
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

**400 Bad Request** - 缺少必要參數

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "nickname is required"
  }
}
```

**409 Conflict** - 群組 ID 已存在

```json
{
  "RC": 409,
  "RM": "Conflict",
  "error": {
    "code": "GROUP_ALREADY_EXISTS",
    "message": "A group with this ID already exists"
  }
}
```

------

## 使用場景

### 團隊管理
- **客服團隊**：建立客服群組，將群組加入客服聊天室，團隊成員即可輪流處理客戶訊息
- **部門群組**：為各部門建立群組，方便以部門為單位管理聊天室權限

### 組織架構
- **專案團隊**：為專案建立群組，所有專案成員自動獲得相關聊天室的存取權限
- **跨部門協作**：建立跨部門群組，簡化多人聊天室的成員管理

------

## 注意事項

- **用戶群組 vs 群組聊天室**：用戶群組是一個虛擬用戶，代表一組實際用戶。它與群組聊天室（Group Chat Room）是完全不同的概念
- **加入聊天室**：建立群組後，需將群組 ID 加入聊天室的成員（members）或受邀者（invitees）清單，群組成員才能存取該聊天室
- **共享存取權限**：群組內的所有成員共享以群組身份加入的聊天室存取權限
- **成員 ID 有效性**：`members` 陣列中的 Client ID 必須是系統中已存在的用戶
- **僅限伺服器端使用**：此端點需使用 `IM-API-KEY` 驗證，僅限伺服器端呼叫
