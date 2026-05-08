# 取消注册设备 Token

## 概述

将先前透过 [`POST /me/subscribe`](/zh-CN/push/device-subscription/subscribe-device) 注册的设备 token 从 IMKIT 移除,避免在用户登出、解除安装或更换设备后仍收到推播通知。建议在 native app 登出流程中调用此 API。

------

## API 端点

### 取消注册推播 Token

依 `deviceId` 解除当前用户在指定设备上的推播订阅。

```http
POST /me/unsubscribe
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
| `type`     | string | ✅    | 设备 token 类型,可用值:`ios`、`android`、`fcm`、`web`     |
| `deviceId` | string | ✅    | 设备唯一识别码(对应 subscribe 时所用的值)                  |
| `clientId` | string | ❌    | 解绑的 Client ID,仅在使用平台 API Key(`IM-API-KEY`)调用此 API 时需要 |

#### 示例请求

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

**成功响应(200 OK)**

| 参数         | 类型   | 说明                              |
| ------------ | ------ | --------------------------------- |
| `RC`         | number | 响应代码(0 表示成功)            |
| `RM`        | string | 响应消息                          |
| `result`     | object | 取消注册结果                      |
| `result.n`   | number | 受影响的记录数量                  |
| `result.ok`  | number | 操作状态(`1` 表示成功)          |

#### 示例响应

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

当 `result.n` 为 `0` 时,代表没有找到符合 `type` + `deviceId` 的记录(例如该设备从未注册或已被移除)。

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
    "message": "type and deviceId are required"
  }
}
```

------

## 使用场景

### 用户登出
- **登出流程**:在 native app 执行登出前调用,确保下个登录该设备的用户不会收到前一位用户的推播

### 设备更换
- **旧设备淘汰**:用户换新手机时,在旧设备上调用此 API 移除 token

### 推播权限变更
- **使用者关闭通知**:当 app 检测到使用者在系统设置中关闭推播权限时,可调用此 API 取消订阅

------

## 注意事项

- **无权限检查**:即使设备已不在线、token 已失效,仍可成功调用此 API 进行清理
- **deviceId 对应**:`deviceId` 必须与当初 [注册](/zh-CN/push/device-subscription/subscribe-device) 时使用的值一致,否则无法匹配到记录
- **type 对应**:`type` 也必须一致(例如 Android 注册时用 `fcm`,取消时也要用 `fcm`)
- **幂等性**:重复调用不会产生错误,但 `result.n` 在后续调用会回传 `0`
