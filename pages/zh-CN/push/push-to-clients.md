# 推播通知至用户

## 概述

透过伺服器端发送自订推播通知至指定用户。支援 Apple Push Notification Service（APNs）及 Firebase Cloud Messaging（FCM），可同时推送至 iOS 与 Android 装置。适用于行销推播、系统公告、自订提醒等场景。

------

## API 端点

### 推播通知至指定用户

向一组指定的用户发送推播通知，支援 iOS 与 Android 平台的通知栏位设定。

```http
POST /push/push2clients
```

#### Headers

| 参数         | 类型   | 必填 | 说明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金钥 |
| `Content-Type` | string | ✅  | `application/json; charset=utf-8` |

#### Post Body

| 参数      | 类型   | 必填 | 说明                             |
| --------- | ------ | ---- | -------------------------------- |
| `clients` | array  | ✅    | 目标用户的 Client ID 阵列       |
| `payload` | object | ✅    | 推播通知内容，包含平台特定栏位   |

**payload 物件栏位**

| 参数         | 类型           | 必填 | 平台    | 说明                                                                 |
| ------------ | -------------- | ---- | ------- | -------------------------------------------------------------------- |
| `type`       | string         | ❌    | 共用    | 通知类型，自订分类标记                                               |
| `expiry`     | number         | ❌    | iOS     | 通知过期时间（Unix 时间戳，秒）                                      |
| `alert`      | string/object  | ❌    | iOS     | 通知提示，可为字串或包含 `loc-key`、`loc-args` 的物件                |
| `badge`      | number         | ❌    | iOS     | 应用程式图示上的未读数字                                             |
| `sound`      | string         | ❌    | iOS     | 通知音效档案名称                                                     |
| `topic`      | string         | ❌    | iOS     | APNs topic，通常为应用程式的 Bundle ID                               |
| `title`      | string         | ❌    | Android | 通知标题                                                             |
| `body`       | string         | ❌    | Android | 通知内容                                                             |
| `icon`       | string         | ❌    | Android | 通知图示 URL                                                        |
| `collapseKey` | string        | ❌    | Android | 折叠键，相同 key 的通知会合并显示                                    |

**alert 物件栏位（当 alert 为物件时）**

| 参数       | 类型   | 必填 | 说明                   |
| ---------- | ------ | ---- | ---------------------- |
| `loc-key`  | string | ❌    | 本地化字串的键值       |
| `loc-args` | array  | ❌    | 本地化字串的参数阵列   |

#### 范例请求

**JavaScript（axios）**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/push/push2clients",
  {
    clients: ["user001", "user002", "user003"],
    payload: {
      type: "marketing",
      alert: "您有一则新的优惠活动，立即查看！",
      badge: 1,
      sound: "default",
      topic: "io.imkit.app",
      title: "限时优惠",
      body: "您有一则新的优惠活动，立即查看！",
      icon: "https://example.com/icon.png",
      collapseKey: "promo_2026"
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**使用本地化 alert 物件**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/push/push2clients",
  {
    clients: ["user001"],
    payload: {
      alert: {
        "loc-key": "NEW_MESSAGE_NOTIFICATION",
        "loc-args": ["张小明", "您好，请问有空吗？"]
      },
      badge: 3,
      sound: "default",
      title: "新讯息",
      body: "张小明：您好，请问有空吗？"
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X POST "https://your-app.imkit.io/push/push2clients" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "clients": ["user001", "user002"],
    "payload": {
      "type": "alert",
      "alert": "系统维护通知：今晚 23:00 将进行例行维护",
      "badge": 1,
      "sound": "default",
      "title": "系统公告",
      "body": "系统维护通知：今晚 23:00 将进行例行维护",
      "icon": "https://example.com/icon.png"
    }
  }'
```

#### Response

**成功回应（200 OK）**

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

请求成功时，伺服器会将推播通知分别发送至 APNs（iOS）与 FCM（Android）。

#### 错误回应

**401 Unauthorized** - API 金钥无效

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
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
    "message": "clients and payload are required"
  }
}
```

------

## 使用场景

### 行销推播
- **促销活动通知**：向特定用户群发送优惠活动、折扣码等行销讯息
- **个人化推荐**：根据用户行为推送个人化的产品推荐

### 系统通知
- **维护公告**：发送系统维护、版本更新等公告讯息
- **安全提醒**：通知用户帐号异常登入、密码变更等安全事件

### 自订提醒
- **排程提醒**：发送预约、会议、到期提醒等时间敏感的通知
- **状态更新**：通知用户订单状态变更、审核结果等

------

## 注意事项

- **仅限伺服器端使用**：此 API 需使用 `IM-API-KEY` 进行验证，仅供伺服器端呼叫
- **双平台推送**：系统会同时透过 APNs（iOS）与 FCM（Android）发送推播通知
- **装置注册**：用户必须已注册推播 token，否则通知无法送达
- **推播配额**：请注意 APNs 与 FCM 各自的推播频率限制，避免过度推送
- **alert 栏位**：iOS 的 `alert` 可以是纯字串或包含本地化键值的物件，请根据需求选择适当的格式
- **折叠通知**：Android 的 `collapseKey` 可用于将相同类型的通知合并，减少用户干扰
