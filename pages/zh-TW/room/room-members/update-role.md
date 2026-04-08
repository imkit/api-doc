# 更新成員角色

## 概述

此端點允許您更新聊天室中特定成員的角色。當角色變更為管理員時，系統會自動在聊天室內產生對應的系統訊息。此 API 僅供伺服器端使用，需要適當的身份驗證。

------

## API 端點

### 更新成員角色

更新聊天室中特定成員的角色。

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

#### Post Body

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `property` | string | ✅ | 固定填入 `"role"` |
| `value` | string | ✅ | 角色值，可為 `"admin"` 或 `"member"` |

**角色說明**

| 角色值 | 說明 |
| --- | --- |
| `"admin"` | 管理員，擁有管理聊天室成員的權限 |
| `"member"` | 一般成員 |

#### 範例請求

**範例一：將成員設為管理員**

**cURL 範例：**

```bash
curl -X "PUT" "http://localhost:3100/rooms/demo-room/member/user-001" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"property": "role", "value": "admin"}'
```

**JavaScript 範例：**

```javascript
const response = await axios.put(
  `http://localhost:3100/rooms/${roomID}/member/${clientID}`,
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

**範例二：將管理員降為一般成員**

**JavaScript 範例：**

```javascript
const response = await axios.put(
  `http://localhost:3100/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "member",
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
- `value` 不是有效的角色值
- 伺服器內部錯誤

------

## 使用場景

### 權限管理
- **升級為管理員**：將成員的角色從 `"member"` 變更為 `"admin"`，賦予其管理聊天室成員的權限
- **降級為一般成員**：將管理員的角色從 `"admin"` 變更為 `"member"`，移除其管理權限

------

## 注意事項

- **系統訊息**：當 `value` 設為 `"admin"` 時，系統會自動在聊天室內產生 `assignAdmin` 系統訊息通知其他成員
- `property` 欄位必須固定填入 `"role"`；若需更新其他成員屬性，請使用[更新成員屬性](./update-member-property) API
- 此操作僅變更成員在該聊天室內的角色，不影響其他聊天室的角色設定
