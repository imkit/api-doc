# 註冊裝置 Token

## 概述

將 native app 的裝置推播 token(APNs / FCM 等)註冊到 IMKIT,讓伺服器端透過 [`POST /push/push2clients`](/zh-TW/push/push-to-clients) 或聊天室訊息事件觸發的內建推播管線,能將通知正確送達用戶的實體裝置。每個裝置以 `deviceId` 唯一識別,同一用戶可同時註冊多個裝置。

------

## API 端點

### 註冊推播 Token

註冊當前用戶的裝置 token,用於接收推播通知。

```http
POST /me/subscribe
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
| `type`     | string | ✅    | 裝置 token 類型,可用值:`ios`、`android`、`fcm`、`web`、`ios-voip` |
| `token`    | string | ✅    | 裝置推播 token(由 APNs 或 FCM 取得)                       |
| `deviceId` | string | ✅    | 裝置唯一識別碼(由 app 自行產生並持久化)                   |
| `clientId` | string | ❌    | 綁定的 Client ID,僅在使用平台 API Key(`IM-API-KEY`)呼叫此 API 時需要 |

#### 範例請求

**JavaScript(axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/subscribe",
  {
    type: "ios",
    token: "17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6",
    deviceId: "iphone-15-pro-uuid-001"
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

**註冊 Android FCM token**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/subscribe",
  {
    type: "fcm",
    token: "dGhpcyBpcyBhIGZjbSB0b2tlbg...",
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
curl -X POST "https://your-app.imkit.io/me/subscribe" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "type": "ios",
       "token": "17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6",
       "deviceId": "iphone-15-pro-uuid-001"
     }'
```

#### Response

**成功回應(200 OK)**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼(0 表示成功) |
| `RM`     | string | 回應訊息               |
| `result` | object | 註冊結果(成功時為空物件) |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
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

**400 Bad Request** - 缺少必要參數

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "type, token and deviceId are required"
  }
}
```

------

## 使用場景

### Native app 整合
- **iOS**:取得 APNs device token 後,以 `type: "ios"` 註冊
- **Android**:取得 Firebase 的 registration token 後,以 `type: "fcm"`(或 `android`)註冊
- **VoIP 通話**:使用 `type: "ios-voip"` 註冊 PushKit token,用於來電推播
- **Web 瀏覽器**:使用 `type: "web"` 註冊 Web Push 訂閱

### 多裝置支援
- **同一用戶多裝置**:用戶在不同裝置上各自註冊不同的 `deviceId`,推播會送到所有已註冊裝置
- **裝置切換**:用戶換新手機時,新裝置以新的 `deviceId` 註冊;舊裝置可呼叫 [取消註冊](/zh-TW/push/device-subscription/unsubscribe-device) 移除

### 平台後端整合
- **代用戶註冊**:使用 `IM-API-KEY` 呼叫此 API 並提供 `clientId`,可代某用戶綁定裝置 token

------

## 注意事項

- **時機**:應在用戶登入完成、且系統授權推播權限後立即呼叫
- **deviceId 一致性**:`deviceId` 應在 app 第一次啟動時產生並持久化(例如儲存於 Keychain / SharedPreferences),後續使用相同的值
- **Token 更新**:當 APNs / FCM token 變更時(系統會主動通知 app),需重新呼叫此 API 註冊新 token
- **登出處理**:用戶登出時建議呼叫 [取消註冊](/zh-TW/push/device-subscription/unsubscribe-device) 移除 token,避免推播發送到已登出的裝置
- **Token 類型**:`ios` 與 `ios-voip` 用途不同,VoIP 推播必須使用 `ios-voip`
- **冪等性**:使用相同的 `type` + `deviceId` 重複呼叫會更新對應的 token,不會產生重複註冊
