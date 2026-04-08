# 新增成員

## 概述

此端點允許您將一位或多位用戶加入指定聊天室。支援邀請確認機制，並可選擇是否自動產生系統訊息通知。此 API 僅供伺服器端使用，需要適當的身份驗證。

------

## API 端點

### 新增成員

將一位或多位用戶加入指定聊天室。

```http
POST /rooms/:id/members
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

#### Post Body

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `invitees` | array[string] | ✅ | 要加入的成員用戶端 ID 陣列 |
| `systemMessage` | boolean | ❌ | 是否自動產生加入成員的系統訊息，預設為 `false` |
| `invitationRequired` | boolean | ❌ | 受邀者是否需要接受邀請才能加入，預設為 `false`。僅適用於**群組**聊天室 |

#### 範例請求

**範例一：邀請多位成員（需接受邀請）**

**cURL 範例：**

```bash
curl -X "POST" "http://localhost:3100/rooms/demo-room/members" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"invitees": ["ccc", "bbb"], "invitationRequired": true, "systemMessage": true}'
```

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: true,
    systemMessage: true,
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

**範例二：直接加入成員（無需邀請確認）**

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `http://localhost:3100/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: false,
    systemMessage: true,
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
    "cover": "http://loremflickr.com/240/240/style?demo",
    "description": "public demo room",
    "roomType": "group",
    "webhook": "meet-taipei-intro",
    "botState": "CONTACT",
    "botMode": false,
    "encrypted": false,
    "serviceStatus": 0,
    "roomTags": ["demo", "foo", "bar"],
    "status": 1,
    "lastMessage": {
      "_id": "5e5b88e91da9d53097b13840",
      "room": "demo-room",
      "messageType": "addMember",
      "sender": {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "id": "aaa",
        "lastLoginTimeMS": 0
      },
      "member": {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "id": "ccc",
        "lastLoginTimeMS": 0
      },
      "message": "CCC",
      "appID": "SampleApp",
      "id": "5e5b88e91da9d53097b13840",
      "messageTimeMS": 1583057129059,
      "updatedAtMS": 1583057129059,
      "createdAtMS": 1583057129059
    },
    "members": [
      {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "isRobot": false,
        "id": "aaa",
        "lastLoginTimeMS": 1541926310026
      },
      {
        "_id": "bbb",
        "nickname": "bbb",
        "avatarUrl": "",
        "isRobot": false,
        "id": "bbb",
        "lastLoginTimeMS": 1541824600261
      },
      {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "isRobot": false,
        "id": "ccc",
        "lastLoginTimeMS": 0
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
- 指定的聊天室不存在
- `invitees` 中包含不存在的用戶 ID
- 伺服器內部錯誤

------

## 使用場景

### 邀請加入
- **邀請多位成員**：透過設定 `invitationRequired: true`，受邀者需主動接受邀請才會加入聊天室
- **直接加入**：設定 `invitationRequired: false`，受邀者會直接加入聊天室，無需確認

### 系統通知
- **自動通知**：設定 `systemMessage: true` 時，系統會自動在聊天室內產生「加入成員」的通知訊息

------

## 注意事項

- **`invitationRequired`**：設為 `true` 時，受邀者需主動接受邀請才會加入聊天室；設為 `false` 時，受邀者會直接加入
- **系統訊息**：設定 `systemMessage: true` 時，系統會自動在聊天室內產生「加入成員」的通知訊息
- **一對一聊天室**：`invitationRequired` 對一對一（`direct`）聊天室無效，系統會自動設為 `false`
- 成功加入後，回應會包含更新後的完整聊天室資訊，包含最新的成員列表
