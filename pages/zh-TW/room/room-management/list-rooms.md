# 聊天室列表

## 概述

此端點允許您取得目前用戶所加入的聊天室清單，支援分頁、排序及條件篩選。適用於聊天室列表顯示、增量同步等場景。

------

## API 端點

### 取得聊天室列表

取得目前用戶已加入的聊天室清單，支援分頁、排序及條件篩選。

```http
GET /rooms
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 用戶端金鑰 |
| `IM-CLIENT-ID` | string | ✅ | 當前用戶的用戶端 ID |
| `IM-Authorization` | string | ✅ | 用戶端權杖 |

#### Query Parameters

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `sort` | string | ❌ | 排序條件，可組合多個欄位，以空格分隔；前綴 `-` 表示遞減排序 |
| `skip` | integer | ❌ | 分頁偏移量，預設為 `0` |
| `limit` | integer | ❌ | 回傳聊天室數量上限，預設為 `0`（不限制） |
| `updatedAfter` | string 或 integer | ❌ | 篩選在指定時間戳後有最新訊息或建立的聊天室，格式支援 ISO-8601 字串或毫秒 Epoch 整數 |
| `pref` | JSON | ❌ | 依用戶的聊天室偏好設定篩選，例如 `{"tags": "some-tag"}` |
| `sortUnreadFirst` | integer | ❌ | 非零值時，優先排序有未讀訊息的聊天室 |

**sort 參數範例**

依最新訊息和建立時間遞減排序：

```
-lastMessage -createdTime
```

依建立時間遞增排序：

```
createdTime
```

#### 範例請求

**範例一：取得聊天室列表（分頁 + 時間篩選）**

cURL 範例：

```bash
curl "https://your-app.imkit.io/rooms?skip=0&limit=20&sort=-lastMessage&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-CLIENT-ID: {您的_CLIENT_ID}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

JavaScript 範例：

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      skip: 0,
      limit: 20,
      sort: "-lastMessage",
      updatedAfter: "2020-10-15T03:28:54Z",
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

**範例二：依標籤篩選聊天室並優先顯示未讀**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      pref: JSON.stringify({ tags: "some-tag" }),
      sortUnreadFirst: 1,
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
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
| `result.totalCount` | number | 符合條件的聊天室總數 |
| `result.data` | array | 聊天室物件陣列 |
| `result.inspect` | object | 診斷資訊（查詢條件與耗時） |

**聊天室物件欄位**

| 參數 | 類型 | 說明 |
| --- | --- | --- |
| `_id` | string | 聊天室唯一識別碼 |
| `name` | string | 聊天室名稱 |
| `cover` | string | 聊天室封面圖片 URL |
| `description` | string | 聊天室描述 |
| `roomType` | string | 聊天室類型（`"direct"` 或 `"group"`） |
| `webhook` | string | Webhook 金鑰或 URL |
| `botState` | string | 機器人狀態 |
| `botMode` | boolean | 是否啟用機器人模式 |
| `encrypted` | boolean | 是否加密 |
| `serviceStatus` | number | 服務狀態 |
| `roomTags` | array[string] | 聊天室標籤陣列 |
| `status` | number | 聊天室狀態（`1` 表示正常） |
| `unread` | number | 目前用戶的未讀訊息數量 |
| `muted` | boolean | 目前用戶是否靜音此聊天室 |
| `lastMessage` | object | 最新一則訊息物件 |
| `members` | array[object] | 聊天室成員陣列 |
| `pref` | object | 目前用戶對此聊天室的個人偏好設定 |
| `createdTimeMS` | number | 聊天室建立時間戳（毫秒） |

**偏好設定物件欄位（`pref`）**

| 參數 | 類型 | 說明 |
| --- | --- | --- |
| `tags` | array[string] | 用戶為此聊天室自訂的標籤 |
| `tagColors` | object | 各標籤對應的顏色（十六進位色碼） |
| `hidden` | boolean | 是否隱藏此聊天室 |
| `sticky` | boolean | 是否置頂此聊天室 |
| `muted` | boolean | 是否靜音此聊天室的通知 |
| `folder` | string | 所屬資料夾名稱 |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "members": "sss",
        "$or": [
          { "lastMessage": { "$gt": "5f87c2cf0000000000000000" } },
          { "createdTime": { "$gt": "2020-10-15T03:32:31.000Z" } }
        ],
        "status": 1
      },
      "tookMS": 22
    },
    "data": [
      {
        "_id": "demo-room",
        "name": "Demo Demo",
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
        "unread": 0,
        "muted": false,
        "lastMessage": {
          "_id": "5f890cf37d980e06f6aaf349",
          "message": "Hello SIKTMLNP 11:01:07",
          "room": "demo-room",
          "sender": {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "id": "sss",
            "lastLoginTimeMS": 0
          },
          "messageType": "text",
          "appID": "SampleApp",
          "messageTime": "2020-10-16T03:01:07.923Z",
          "id": "5f890cf37d980e06f6aaf349",
          "messageTimeMS": 1602817267923,
          "updatedAtMS": 1602817267925,
          "createdAtMS": 1602817267925,
          "reactionCount": 0
        },
        "members": [
          {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "isRobot": false,
            "id": "sss",
            "lastLoginTimeMS": 1588744338369
          }
        ],
        "pref": {
          "tags": ["demo", "sample"],
          "tagColors": {
            "demo": "#f2d700",
            "sample": "#ffa01a"
          },
          "hidden": false,
          "sticky": false,
          "muted": false,
          "folder": "Some-Folder"
        },
        "id": "demo-room",
        "createdTimeMS": 1525001412492
      }
    ]
  }
}
```

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的用戶端金鑰或授權權杖
- `updatedAfter` 時間格式不正確
- `pref` 參數的 JSON 格式無效
- 伺服器內部錯誤

------

## 使用場景

### 聊天室列表顯示
- **首頁聊天室列表**：使用分頁和排序取得使用者的聊天室清單
- **標籤篩選**：透過 `pref` 參數依標籤篩選特定聊天室

### 增量同步
- **高效同步**：使用 `updatedAfter` 搭配上次請求的時間戳，僅拉取有更新的聊天室

------

## 注意事項

- **增量同步**：使用 `updatedAfter` 搭配上次請求的時間戳，可實現高效的增量同步，避免每次拉取全量資料
- **分頁建議**：建議搭配 `limit` 和 `skip` 進行分頁，避免一次回傳過多資料影響效能
- **排序**：`sort` 欄位以空格分隔多個條件，前綴 `-` 代表遞減排序
- **`pref` 篩選**：`pref` 參數為 JSON 格式，需進行 URL 編碼後傳遞
- **`inspect` 欄位**：僅供除錯使用，包含實際查詢條件與執行耗時，正式環境可忽略
