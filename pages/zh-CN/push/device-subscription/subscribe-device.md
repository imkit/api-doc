# 注册设备 Token

## 概述

将 native app 的设备推播 token(APNs / FCM 等)注册到 IMKIT,让服务器端透过 [`POST /push/push2clients`](/zh-CN/push/push-to-clients) 或聊天室消息事件触发的内建推播管线,能将通知正确送达用户的实体设备。每个设备以 `deviceId` 唯一识别,同一用户可同时注册多个设备。

------

## API 端点

### 注册推播 Token

注册当前用户的设备 token,用于接收推播通知。

```http
POST /me/subscribe
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |
| `Content-Type`     | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

| 参数       | 类型   | 必填 | 说明                                                         |
| ---------- | ------ | ---- | ------------------------------------------------------------ |
| `type`     | string | ✅    | 设备 token 类型,可用值:`ios`、`android`、`fcm`、`web`、`ios-voip` |
| `token`    | string | ✅    | 设备推播 token(由 APNs 或 FCM 取得)                       |
| `deviceId` | string | ✅    | 设备唯一识别码(由 app 自行产生并持久化)                   |
| `clientId` | string | ❌    | 绑定的 Client ID,仅在使用平台 API Key(`IM-API-KEY`)调用此 API 时需要 |

#### 示例请求

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

**注册 Android FCM token**

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

**成功响应(200 OK)**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 响应代码(0 表示成功) |
| `RM`     | string | 响应消息               |
| `result` | object | 注册结果(成功时为空对象) |

#### 示例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

#### 错误响应

**401 Unauthorized** - 认证失败

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

**400 Bad Request** - 缺少必要参数

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

## 使用场景

### Native app 整合
- **iOS**:取得 APNs device token 后,以 `type: "ios"` 注册
- **Android**:取得 Firebase 的 registration token 后,以 `type: "fcm"`(或 `android`)注册
- **VoIP 通话**:使用 `type: "ios-voip"` 注册 PushKit token,用于来电推播
- **Web 浏览器**:使用 `type: "web"` 注册 Web Push 订阅

### 多设备支持
- **同一用户多设备**:用户在不同设备上各自注册不同的 `deviceId`,推播会送到所有已注册设备
- **设备切换**:用户换新手机时,新设备以新的 `deviceId` 注册;旧设备可调用 [取消注册](/zh-CN/push/device-subscription/unsubscribe-device) 移除

### 平台后端整合
- **代用户注册**:使用 `IM-API-KEY` 调用此 API 并提供 `clientId`,可代某用户绑定设备 token

------

## 注意事项

- **时机**:应在用户登录完成、且系统授权推播权限后立即调用
- **deviceId 一致性**:`deviceId` 应在 app 第一次启动时产生并持久化(例如存储于 Keychain / SharedPreferences),后续使用相同的值
- **Token 更新**:当 APNs / FCM token 变更时(系统会主动通知 app),需重新调用此 API 注册新 token
- **登出处理**:用户登出时建议调用 [取消注册](/zh-CN/push/device-subscription/unsubscribe-device) 移除 token,避免推播发送到已登出的设备
- **Token 类型**:`ios` 与 `ios-voip` 用途不同,VoIP 推播必须使用 `ios-voip`
- **幂等性**:使用相同的 `type` + `deviceId` 重复调用会更新对应的 token,不会产生重复注册
