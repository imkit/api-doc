# 建立聊天室

## 概述

此端點允許您在系統中建立新的聊天室，並可同時指定成員。此 API 建立聊天室但不會自動加入呼叫者，適合由後端服務進行聊天室管理。

------

## API 端點

### 建立聊天室

在系統中建立新的聊天室。

```http
POST /rooms/
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 您的平台 API 金鑰 |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### Post Body

| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ❌ | 自訂聊天室 ID，若未指定則自動產生 |
| `name` | string | ❌ | 聊天室名稱 |
| `cover` | string | ❌ | 聊天室封面圖片 URL |
| `roomType` | string | ❌ | 聊天室類型：`"direct"`（一對一）或 `"group"`（群組） |
| `members` | array[string] | ❌ | 成員用戶端 ID 陣列 |
| `description` | string | ❌ | 聊天室描述，可為純文字或序列化的 JSON 資料 |
| `roomTags` | array[string] | ❌ | 聊天室標籤陣列，用於搜尋和分類 |
| `webhook` | string | ❌ | Webhook 金鑰或 URL |
| `botMode` | boolean | ❌ | 是否啟用聊天室機器人 |
| `extParams` | string | ❌ | 擴充自訂參數，格式為 `param1=value1&param2=value2` |
| `systemMessage` | boolean | ❌ | 是否自動產生系統訊息（如加入成員訊息） |
| `owner` | string | ❌ | 聊天室擁有者 ID |

#### 範例請求

##### 建立一對一聊天室

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/rooms/",
  {
    roomType: "direct",
    members: ["user-a", "user-b"],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### 建立群組聊天室

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/rooms/",
  {
    _id: "project-room-001",
    name: "專案討論群",
    cover: "https://example.com/cover.jpg",
    roomType: "group",
    roomTags: ["project", "team-a"],
    members: ["user-a", "user-b", "user-c"],
    systemMessage: true,
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
curl -X "POST" "https://your-app.imkit.io/rooms/" \
     -H 'IM-API-KEY: {您的_API_KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "name": "專案討論群",
  "roomType": "group",
  "roomTags": ["project", "team-a"],
  "members": ["user-a", "user-b", "user-c"]
}'
```

#### Response

**成功回應（200 OK）**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `RC` | number | 回應代碼（0 表示成功） |
| `RM` | string | 回應訊息 |
| `result` | object | 建立的聊天室資訊 |

**聊天室物件欄位**

| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| `_id` | string | 聊天室唯一識別碼 |
| `name` | string | 聊天室名稱 |
| `cover` | string | 聊天室封面圖片 URL |
| `roomType` | string | 聊天室類型（`"direct"` 或 `"group"`） |
| `members` | array[string] | 成員 ID 陣列 |
| `roomTags` | array[string] | 聊天室標籤陣列 |
| `appID` | string | 應用程式識別碼 |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "project-room-001",
    "appID": "SampleApp",
    "name": "專案討論群",
    "cover": "https://example.com/cover.jpg",
    "roomType": "group",
    "roomTags": ["project", "team-a"],
    "members": ["user-a", "user-b", "user-c"]
  }
}
```

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- **無效的 API 金鑰** — 提供的 `IM-API-KEY` 無效或已過期
- **無效的聊天室類型** — `roomType` 不是 `"direct"` 或 `"group"`
- **成員不存在** — `members` 中包含不存在的用戶 ID
- **伺服器內部錯誤** — 伺服器端發生未預期的錯誤

------

## 使用場景

### 用戶配對
- **一對一客服聊天**：當用戶發起客服請求時，後端建立 `direct` 聊天室，將用戶和客服人員加入
- **訂單對談**：當訂單成立時，自動建立買賣雙方的一對一聊天室

### 群組管理
- **專案群組**：為特定專案建立群組聊天室，加入相關成員
- **活動群組**：為活動或課程建立群組，統一管理參與者

------

## 注意事項

- **不自動加入**：此 API 建立聊天室但呼叫者不會自動加入，適合由後端服務管理
- **聊天室 ID**：若未指定 `_id`，系統會自動產生唯一識別碼
- **成員管理**：可在建立時透過 `members` 直接指定成員，或之後透過「新增成員」API 加入
- **標籤用途**：`roomTags` 可用於後續的聊天室搜尋和分類功能
- **時間戳格式**：所有時間戳均為 UTC 格式，以毫秒為單位
