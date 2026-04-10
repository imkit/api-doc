# 撤回訊息

## 概述

此端點允許用戶撤回聊天室中的指定訊息。撤回後，原訊息內容會被清空，訊息類型變更為 `recall`，聊天室中的所有成員都能看到該訊息已被撤回。支援用戶端和平台 API 兩種驗證方式。

------

## API 端點

### 撤回訊息

撤回聊天室中的指定訊息。

```http
POST /rooms/:roomId/message
```

#### Headers

此 API 支援兩種驗證方式，擇一使用：

**用戶端驗證**

| 參數               | 類型   | 必填 | 說明         |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅   | 用戶端金鑰   |
| `IM-Authorization` | string | ✅   | 用戶端權杖   |

**平台 API 驗證**

| 參數         | 類型   | 必填 | 說明             |
| ------------ | ------ | ---- | ---------------- |
| `IM-API-KEY` | string | ✅   | 平台 API 金鑰    |

#### Path Parameters

| 參數       | 類型   | 必填 | 說明             |
| ---------- | ------ | ---- | ---------------- |
| `:roomId`  | string | ✅   | 聊天室唯一識別碼 |

#### Post Body

| 參數          | 類型   | 必填 | 說明                            |
| ------------- | ------ | ---- | ------------------------------- |
| `messageType` | string | ✅   | 固定填入 `"recall"`             |
| `_id`         | string | ✅   | 要撤回的訊息唯一識別碼          |

#### 範例請求

**範例一：用戶端驗證撤回訊息**

**cURL 範例：**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"_id": "5ce3d80bd594874e495895a4", "messageType": "recall"}'
```

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
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

**範例二：平台 API 驗證撤回訊息**

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**成功回應（200 OK）**

| 參數                  | 類型   | 說明                               |
| --------------------- | ------ | ---------------------------------- |
| `RC`                  | number | 回應代碼（0 表示成功）             |
| `RM`                  | string | 回應訊息                           |
| `result._id`          | string | 訊息唯一識別碼                     |
| `result.message`      | string | 訊息內容（撤回後為空字串）         |
| `result.room`         | string | 所屬聊天室 ID                      |
| `result.sender`       | object | 撤回操作的發送者資訊               |
| `result.messageType`  | string | 訊息類型（撤回後為 `"recall"`）    |
| `result.messageTimeMS`| number | 訊息發送時間戳（毫秒）             |
| `result.updatedAtMS`  | number | 最後更新時間戳（毫秒）             |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5ce3d80bd594874e495895a4",
    "message": "",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Nita",
      "avatarUrl": "http://loremflickr.com/240/240/style?1558435839",
      "isRobot": false,
      "id": "sss",
      "lastLoginTimeMS": 1553145898032
    },
    "messageType": "recall",
    "appID": "SampleApp",
    "id": "5ce3d80bd594874e495895a4",
    "messageTimeMS": 1558435851576,
    "updatedAtMS": 1558435921086,
    "createdAtMS": 1558435851580
  }
}
```

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的驗證金鑰或權杖
- 指定的訊息或聊天室不存在
- 無權限撤回該訊息
- 伺服器內部錯誤

------

## 使用場景

### 訊息管理

- **誤發訊息修正**：用戶發送錯誤訊息後可立即撤回
- **敏感資訊移除**：撤回包含敏感或不當內容的訊息
- **後台管理**：管理員透過平台 API 撤回違規訊息

------

## 注意事項

- **撤回效果**：撤回後，訊息的 `message` 欄位會變為空字串，`messageType` 變為 `"recall"`，聊天室所有成員均可看到撤回狀態
- **`_id`**：請求 Body 中的 `_id` 為要撤回的**訊息** ID，非聊天室 ID
- **兩種驗證**：用戶端驗證（`IM-CLIENT-KEY` + `IM-Authorization`）適用於一般用戶操作；平台 API 驗證（`IM-API-KEY`）適用於後台管理操作
