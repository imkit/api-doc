# 建立聊天室

## 概述

此端點允許您建立新的聊天室,並讓當前用戶(呼叫者)自動加入該聊天室,同時可邀請指定的成員。此 API 僅供伺服器端使用,需要適當的身份驗證。

注意:如果呼叫者是管理員(使用 platform-api-key),管理員用戶也會自動加入該聊天室。

------

## API 端點

### 建立並加入聊天室

建立新的聊天室,呼叫者自動加入並可邀請指定成員。

```http
POST /rooms/createAndJoin
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 用戶端金鑰 |
| `IM-Authorization` | string | ✅ | 用戶端權杖 |

#### Post Body

請求內容應包含 JSON 格式的聊天室資訊。無必填參數,但建議至少提供 `roomType` 以明確指定聊天室類型。

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `_id` | string | ❌ | 自訂聊天室 ID |
| `name` | string | ❌ | 聊天室名稱 |
| `cover` | string | ❌ | 聊天室封面圖片 URL |
| `roomType` | string | ❌ | 聊天室類型:"direct"(一對一)或 "group"(群組) |
| `description` | string | ❌ | 聊天室描述,可為純文字或序列化的 JSON 資料 |
| `roomTags` | array[string] | ❌ | 聊天室標籤陣列,用於搜尋 |
| `webhook` | string | ❌ | Webhook 金鑰或 URL |
| `botMode` | boolean | ❌ | 是否啟用聊天室機器人 |
| `invitee` | string 或 array | ❌ | 要加入聊天室的成員,可為單一用戶端 ID(字串)或用戶端 ID 陣列 |
| `systemMessage` | boolean | ❌ | 是否自動建立系統訊息(例如加入成員訊息) |
| `invitationRequired` | boolean | ❌ | 受邀者是否需要接受或拒絕邀請才能加入聊天室。僅適用於**群組**聊天。對於**一對一**聊天,系統會自動將此參數設為 `false`,受邀者會立即加入 |
| `extParams` | string | ❌ | 擴充自訂參數,格式可為 param1=value1&param2=value2、JSON 字串或自訂編碼文字 |

#### 範例請求

**範例一:建立群組聊天室(需要邀請確認)**

使用此方式建立群組聊天室,受邀者需要接受邀請才能加入。

cURL 範例:

```bash
curl -X "POST" "http://localhost:3100/rooms/createAndJoin" \
     -H 'IM-CLIENT-KEY: {您的_CLIENT_KEY}' \
     -H 'IM-Authorization: {您的_TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "_id": "demo-room",
  "invitationRequired": true,
  "roomType": "group",
  "systemMessage": true,
  "invitee": [
    "ccc",
    "bbb"
  ]
}'
```

JavaScript 範例:

```javascript
const response = await axios.post(
  "http://localhost:3100/rooms/createAndJoin",
  {
    _id: "demo-room",
    invitationRequired: true,
    systemMessage: true,
    invitee: ["ccc", "bbb"],
    roomType: "group",
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

**範例二:建立群組聊天室(立即加入)**

使用此方式建立群組聊天室,受邀者會立即加入而不需要確認。

```javascript
const response = await axios.post(
  "http://localhost:3100/rooms/createAndJoin",
  {
    _id: "demo-room",
    invitationRequired: false,
    systemMessage: true,
    invitee: ["ccc", "bbb"],
    roomType: "group",
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

**範例三:建立一對一聊天室**

使用此方式建立一對一聊天室,受邀者會立即加入(系統會自動將 `invitationRequired` 設為 `false`)。

```javascript
const response = await axios.post(
  "http://localhost:3100/rooms/createAndJoin",
  {
    systemMessage: true,
    invitee: ["ccc"],
    roomType: "direct",
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
| `RC` | number | 回應代碼(0 表示成功) |
| `RM` | string | 回應訊息 |
| `result` | object | 建立的聊天室資訊 |

**聊天室物件欄位**

| 參數 | 類型 | 說明 |
| --- | --- | --- |
| `_id` | string | 聊天室唯一識別碼 |
| `name` | string | 聊天室名稱 |
| `cover` | string | 聊天室封面圖片 URL |
| `description` | string | 聊天室描述 |
| `roomType` | string | 聊天室類型("direct" 或 "group") |
| `webhook` | string | Webhook 金鑰或 URL |
| `botState` | string | 機器人狀態 |
| `botMode` | boolean | 是否啟用機器人模式 |
| `encrypted` | boolean | 是否加密 |
| `serviceStatus` | number | 服務狀態 |
| `roomTags` | array[string] | 聊天室標籤陣列 |
| `status` | number | 聊天室狀態 |
| `lastMessage` | object | 最後一則訊息物件 |
| `memberProperties` | array[object] | 成員屬性陣列 |
| `members` | array[object] | 成員物件陣列 |
| `createdTimeMS` | number | 建立時間戳(毫秒) |

**成員物件欄位**

| 參數 | 類型 | 說明 |
| --- | --- | --- |
| `_id` | string | 成員唯一識別碼 |
| `nickname` | string | 成員顯示名稱 |
| `avatarUrl` | string | 成員頭像圖片 URL |
| `description` | string | 成員描述 |
| `userAgent` | string | 用戶代理字串 |
| `isRobot` | boolean | 是否為機器人 |
| `lastLoginTimeMS` | number | 最後登入時間戳(毫秒) |

**成員屬性物件欄位**

| 參數 | 類型 | 說明 |
| --- | --- | --- |
| `client` | string | 成員用戶端 ID |
| `badge` | number | 未讀訊息數量 |
| `lastRead` | string | 最後已讀訊息 ID |

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
    "lastMessage": {
      "_id": "5e5b89a77508ac31c0d91835",
      "room": "demo-room",
      "messageType": "deleteMember",
      "sender": {
        "_id": "aaa",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "nickname": "AAA",
        "id": "aaa",
        "lastLoginTimeMS": 0
      },
      "member": {
        "_id": "ccc",
        "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
        "nickname": "CCC",
        "id": "ccc",
        "lastLoginTimeMS": 0
      },
      "message": "CCC",
      "appID": "SampleApp",
      "id": "5e5b89a77508ac31c0d91835",
      "messageTimeMS": 1583057319965,
      "updatedAtMS": 1583057319967,
      "createdAtMS": 1583057319967
    },
    "roomType": "group",
    "webhook": "meet-taipei-intro",
    "botState": "CONTACT",
    "botMode": false,
    "encrypted": false,
    "serviceStatus": 0,
    "roomTags": ["demo", "foo", "bar"],
    "status": 1,
    "memberProperties": [
      {
        "badge": 0,
        "lastRead": "5e5b89a77508ac31c0d91835",
        "client": "aaa"
      },
      {
        "badge": 223,
        "client": "bbb"
      },
      {
        "badge": 220,
        "client": "ccc"
      }
    ],
    "members": [
      {
        "_id": "aaa",
        "description": "description la la #1541926309694",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "nickname": "AAA",
        "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.007)",
        "isRobot": false,
        "id": "aaa",
        "lastLoginTimeMS": 1541926310026
      },
      {
        "_id": "bbb",
        "description": "description la la #1541824599613",
        "avatarUrl": "",
        "nickname": "bbb",
        "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; Android SDK built for x86 Build/OSM1.180201.007)",
        "isRobot": false,
        "id": "bbb",
        "lastLoginTimeMS": 1541824600261
      },
      {
        "_id": "ccc",
        "avatarUrl": "https://globalassets.starbucks.com/assets/c1f4cd02de24483eb86c696401ad4213.jpg",
        "nickname": "CCC",
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

當請求失敗時,您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括:

- 無效的用戶端金鑰或授權權杖
- 無效的聊天室類型
- 指定的受邀者不存在
- 伺服器內部錯誤

------

## 使用場景

### 群組聊天
- **需要邀請確認的群組聊天室**:設定 `invitationRequired` 為 `true`,受邀者需要接受邀請才能加入
- **立即加入的群組聊天室**:設定 `invitationRequired` 為 `false`,受邀者會立即加入而不需要確認

### 一對一聊天
- **建立一對一聊天室**:設定 `roomType` 為 `"direct"`,系統會自動將 `invitationRequired` 設為 `false`,受邀者會立即加入

------

## 注意事項

- 此端點用於建立新聊天室並讓當前用戶和指定的受邀者加入
- 聊天室 ID(`_id`)若未指定,系統會自動產生唯一識別碼
- 對於**群組聊天室**(`roomType: "group"`),可設定 `invitationRequired` 為 `true` 要求受邀者接受邀請
- 對於**一對一聊天室**(`roomType: "direct"`),系統會自動將 `invitationRequired` 設為 `false`,受邀者會立即加入
- 呼叫者(當前用戶)會自動成為聊天室成員
- 如果使用管理員金鑰(platform-api-key)呼叫此 API,管理員用戶也會自動加入聊天室
- 所有時間戳均為 UTC 格式,以毫秒為單位
- 封面圖片的檔案大小應控制在合理範圍內
- `roomTags` 可用於後續的聊天室搜尋功能
