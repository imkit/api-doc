# 取消註冊裝置 Token

## 概述

將先前透過 [`POST /me/subscribe`](/zh-TW/push/device-subscription/subscribe-device) 註冊的裝置 token 從 IMKIT 移除,避免在用戶登出、解除安裝或更換裝置後仍收到推播通知。建議在 native app 登出流程中呼叫此 API。

------

## API 端點

### 取消註冊推播 Token

依 `deviceId` 解除當前用戶在指定裝置上的推播訂閱。

```http
POST /me/unsubscribe
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |
| `Content-Type`     | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

| 參數       | 類型   | 必填 | 說明                                                         |
| ---------- | ------ | ---- | ------------------------------------------------------------ |
| `type`     | string | ✅    | 裝置 token 類型,可用值:`ios`、`android`、`fcm`、`web`     |
| `deviceId` | string | ✅    | 裝置唯一識別碼(對應 subscribe 時所用的值)                  |
| `clientId` | string | ❌    | 解綁的 Client ID,僅在使用平台 API Key(`IM-API-KEY`)呼叫此 API 時需要 |

#### 範例請求

**JavaScript(axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/unsubscribe",
  {
    type: "fcm",
    deviceId: "pixel-8-uuid-002"
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
curl -X POST "https://your-app.imkit.io/me/unsubscribe" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "type": "fcm",
       "deviceId": "pixel-8-uuid-002"
     }'
```

#### Response

**成功回應(200 OK)**

| 參數         | 類型   | 說明                              |
| ------------ | ------ | --------------------------------- |
| `RC`         | number | 回應代碼(0 表示成功)            |
| `RM`        | string | 回應訊息                          |
| `result`     | object | 取消註冊結果                      |
| `result.n`   | number | 受影響的紀錄數量                  |
| `result.ok`  | number | 操作狀態(`1` 表示成功)          |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

當 `result.n` 為 `0` 時,代表沒有找到符合 `type` + `deviceId` 的紀錄(例如該裝置從未註冊或已被移除)。

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

**400 Bad Request** - 缺少必要參數

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "type and deviceId are required"
  }
}
```

------

## 使用場景

### 用戶登出
- **登出流程**:在 native app 執行登出前呼叫,確保下個登入該裝置的用戶不會收到前一位用戶的推播

### 裝置更換
- **舊裝置淘汰**:用戶換新手機時,在舊裝置上呼叫此 API 移除 token

### 推播權限變更
- **使用者關閉通知**:當 app 偵測到使用者在系統設定中關閉推播權限時,可呼叫此 API 取消訂閱

------

## 注意事項

- **無權限檢查**:即使裝置已不在線、token 已失效,仍可成功呼叫此 API 進行清理
- **deviceId 對應**:`deviceId` 必須與當初 [註冊](/zh-TW/push/device-subscription/subscribe-device) 時使用的值一致,否則無法匹配到紀錄
- **type 對應**:`type` 也必須一致(例如 Android 註冊時用 `fcm`,取消時也要用 `fcm`)
- **冪等性**:重複呼叫不會產生錯誤,但 `result.n` 在後續呼叫會回傳 `0`
