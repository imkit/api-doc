# 更新成員屬性

## 概述

此端點允許您更新聊天室中特定成員的自訂屬性，例如角色（role）、位置、分數、等級或任何自訂欄位。此 API 僅供伺服器端使用，需要適當的身份驗證。

------

## API 端點

### 更新成員屬性

更新聊天室中特定成員的自訂屬性。

```http
PUT /rooms/:id/member/:client
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 用戶端金鑰 |
| `IM-Authorization` | string | ✅ | 用戶端權杖 |

#### Path Parameters

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `:id` | string | ✅ | 聊天室唯一識別碼 |
| `:client` | string | ✅ | 成員的用戶端 ID |

#### Request Body

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `property` | string | ✅ | 要更新的成員屬性欄位名稱 |
| `value` | mixed | ✅ | 屬性的新值 |

#### 範例請求

**範例一：將成員設為管理員**

**cURL 範例：**

```bash
curl -X "PUT" "https://your-app.imkit.io/rooms/demo-room/member/user-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"property": "role", "value": "admin"}'
```

**JavaScript 範例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "admin",
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

**範例二：更新自訂屬性**

**JavaScript 範例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "score",
    value: 100,
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

#### Response

**成功回應（200 OK）**

| 參數 | 類型 | 說明 |
| --- | --- | --- |
| `RC` | number | 回應代碼（0 表示成功） |
| `RM` | string | 回應訊息 |
| `result` | object | 更新後的聊天室完整資訊 |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "name": "Demo",
    "roomType": "group",
    "members": [
      {
        "_id": "user-001",
        "nickname": "User 001",
        "avatarUrl": "http://example.com/avatar.jpg",
        "isRobot": false,
        "id": "user-001",
        "lastLoginTimeMS": 1583057133276
      }
    ],
    "id": "demo-room",
    "createdTimeMS": 1525001412492
  }
}
```

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的用戶端金鑰或授權權杖
- 指定的聊天室或成員不存在
- 伺服器內部錯誤

------

## 使用場景

### 角色管理
- **指派管理員**：將 `property` 設為 `"role"`、`value` 設為 `"admin"` 來指派管理員角色

### 自訂屬性
- **設定分數**：將 `property` 設為 `"score"` 來追蹤成員在聊天室中的分數
- **設定等級**：將 `property` 設為 `"level"` 來管理成員等級
- **設定位置**：將 `property` 設為 `"location"` 來記錄成員位置資訊

------

## 注意事項

- **角色設定**：當 `property` 設為 `"role"` 且 `value` 設為 `"admin"` 時，系統會自動在聊天室內產生 `assignAdmin` 系統訊息
- **自訂屬性**：除了 `role` 之外，可設定任意自訂屬性，例如位置（`location`）、分數（`score`）、等級（`level`）等
- `property` 欄位直接對應到成員屬性物件中的欄位名稱，`value` 的型別應與欄位定義相符
