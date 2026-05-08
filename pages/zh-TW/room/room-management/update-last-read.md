# 更新最後已讀

## 概述

當用戶在指定聊天室內讀完訊息後,呼叫此 API 將「最後已讀訊息」同步給伺服器。伺服器會依此重算該用戶在此聊天室的未讀數(badge),並透過 Socket [`lastRead` 事件](/zh-TW/realtime/socket-events) 通知聊天室其他成員,實現跨裝置已讀同步與已讀回條(read receipts)。

------

## API 端點

### 更新最後已讀訊息

更新當前用戶在指定聊天室的最後已讀訊息 ID。

```http
PUT /rooms/:id/lastRead
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |
| `Content-Type`     | string | ✅    | `application/json; charset=utf-8` |

#### Path Parameters

| 參數  | 類型   | 必填 | 說明        |
| ----- | ------ | ---- | ----------- |
| `:id` | string | ✅    | 聊天室 ID   |

#### Post Body

| 參數      | 類型   | 必填 | 說明                                            |
| --------- | ------ | ---- | ----------------------------------------------- |
| `message` | string | ✅    | 最後已讀訊息的 ID(該聊天室內某則訊息的 `_id`) |

#### 範例請求

**JavaScript(axios)**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomId}/lastRead`,
  {
    message: "58885c9e4d0c89571b777a81"
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X PUT "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/lastRead" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{"message":"58885c9e4d0c89571b777a81"}'
```

#### Response

**成功回應(200 OK)**

| 參數                | 類型   | 說明                              |
| ------------------- | ------ | --------------------------------- |
| `RC`                | number | 回應代碼(0 表示成功)            |
| `RM`                | string | 回應訊息                          |
| `result`            | object | 更新結果                          |
| `result.client`     | string | 當前用戶的 Client ID              |
| `result.lastRead`   | string | 已更新的最後已讀訊息 ID           |
| `result.badge`      | number | 該用戶目前在所有聊天室的總未讀數  |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "client": "1485248560558",
    "lastRead": "58b7b79b0acc250b377357ab",
    "badge": 48
  }
}
```

#### 錯誤回應

**401 Unauthorized** - 認證失敗

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**404 Not Found** - 聊天室或訊息不存在

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room or message not found"
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
    "message": "message is required"
  }
}
```

------

## Socket 事件通知

更新成功後,伺服器會對該聊天室的所有成員廣播 `lastRead` Socket 事件,內容範例:

```json
{
  "roomID": "58871b877390be11d5f1ab30",
  "memberID": "1485248560558",
  "messageID": "58b7b79b0acc250b377357ab"
}
```

其他成員的客戶端可監聽此事件,即時更新「對方已讀到哪一則訊息」的 UI 標示。詳見 [Socket 事件](/zh-TW/realtime/socket-events)。

------

## 使用場景

### 已讀同步
- **進入聊天室**:用戶開啟聊天室並把畫面捲到底時,呼叫此 API 將最新訊息標記為已讀
- **背景同步**:app 從背景回到前景並偵測到聊天室仍在最頂端時,重新標記最新訊息為已讀
- **跨裝置同步**:用戶在手機讀過後,網頁版 / 平板版會透過 Socket `lastRead` 事件即時同步未讀狀態

### 已讀回條(Read Receipts)
- **聊天室成員顯示**:傳訊者可看到對方已讀到哪則訊息
- **群組已讀數**:統計群組內每則訊息的已讀人數

### 未讀計算
- 呼叫此 API 後,[`GET /me/badge`](/zh-TW/message/message-badge/get-unread-message-by-a-user) 與 [`POST /badges/byRoomTags`](/zh-TW/message/message-badge/get-unread-message-by-a-room) 的回傳值會立即反映新狀態

------

## 注意事項

- **訊息 ID 必須屬於該聊天室**:傳入的 `message` ID 必須是 `:id` 聊天室內的某則訊息,否則會回傳 404
- **單向更新**:`lastRead` 只會往後移動;傳入比目前已讀更舊的訊息 ID,行為以伺服器實作為準,不建議倒退標記
- **頻率控制**:不需要每次捲動都呼叫;建議在離開聊天室、收到新訊息且畫面在底部、或固定間隔(如每 2 秒)時節流呼叫
- **伺服器主動通知**:成功後其他成員會收到 Socket [`lastRead` 事件](/zh-TW/realtime/socket-events),可用於即時更新 UI
- **與 badge 的關聯**:此 API 是讓 [未讀計算 API](/zh-TW/message/message-badge/get-unread-message-by-a-user) 回傳值變化的主要途徑
