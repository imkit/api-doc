# 取消靜音聊天室通知

## 概述

此端點允許當前用戶取消指定聊天室的靜音設定，恢復接收該聊天室的推播通知。此設定為個人偏好，僅影響當前用戶，不影響其他成員。

------

## API 端點

### 取消靜音聊天室通知
取消指定聊天室的靜音設定，恢復接收推播通知。

```http
DELETE /me/mute/:room
```

#### Headers

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | 用戶端金鑰 |
| `IM-Authorization` | string | ✅ | 用戶端權杖 |

#### Path Parameters

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `:room` | string | ✅ | 聊天室唯一識別碼 |

此 API 無需請求內容（Request Body）。

#### 範例請求

**cURL 範例：**

```bash
curl -X "DELETE" "https://your-app.imkit.io/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 範例：**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/me/mute/${roomID}`,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
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
| `result` | object | 更新後的當前用戶資訊 |
| `result._id` | string | 用戶唯一識別碼 |
| `result.nickname` | string | 用戶顯示名稱 |
| `result.email` | string | 用戶電子郵件 |
| `result.mute` | array[string] | 已靜音的聊天室 ID 陣列（取消後移除） |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test AB",
    "appID": "SampleApp",
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 56216,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36",
    "mute": [],
    "lastLoginTimeMS": 1487068306745
  }
}
```

#### 錯誤回應

當請求失敗時，您會收到包含錯誤詳細資訊的錯誤回應。常見的錯誤情況包括：

- 無效的用戶端金鑰或授權權杖
- 指定的聊天室不存在
- 伺服器內部錯誤

------

## 使用場景

- **恢復聊天室通知**：當用戶希望重新接收某個聊天室的推播通知時，可取消靜音
- **靜音聊天室**：若要靜音聊天室，請使用[靜音聊天室通知](./mute-room-notification) API

------

## 注意事項

- **個人偏好**：取消靜音設定僅影響當前用戶，其他成員的通知不受影響
- **靜音狀態**：成功後，該聊天室 ID 會從回應中 `mute` 陣列移除，代表用戶目前靜音的所有聊天室
