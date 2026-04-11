# Push Notifications to Clients

## Overview

Send custom push notifications to specified users from the server side. Supports Apple Push Notification Service (APNs) and Firebase Cloud Messaging (FCM), enabling simultaneous delivery to iOS and Android devices. Suitable for marketing pushes, system announcements, custom reminders, and other scenarios.

------

## API Endpoint

### Push Notifications to Specified Users

Send push notifications to a group of specified users, with notification field settings for both iOS and Android platforms.

```http
POST /push/push2clients
```

#### Headers

| Parameter      | Type   | Required | Description             |
| -------------- | ------ | -------- | ----------------------- |
| `IM-API-KEY`   | string | ✅        | Your platform API Key   |
| `Content-Type` | string | ✅       | `application/json; charset=utf-8` |

#### Post Body

| Parameter | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| `clients` | array  | ✅        | Array of target user Client IDs               |
| `payload` | object | ✅        | Push notification content with platform-specific fields |

**payload Object Fields**

| Parameter    | Type           | Required | Platform | Description                                                            |
| ------------ | -------------- | -------- | -------- | ---------------------------------------------------------------------- |
| `type`       | string         | ❌        | Shared   | Notification type, custom classification tag                           |
| `expiry`     | number         | ❌        | iOS      | Notification expiration time (Unix timestamp, seconds)                 |
| `alert`      | string/object  | ❌        | iOS      | Notification alert, can be a string or an object with `loc-key`, `loc-args` |
| `badge`      | number         | ❌        | iOS      | Badge number on the app icon                                           |
| `sound`      | string         | ❌        | iOS      | Notification sound file name                                           |
| `topic`      | string         | ❌        | iOS      | APNs topic, usually the app's Bundle ID                                |
| `title`      | string         | ❌        | Android  | Notification title                                                     |
| `body`       | string         | ❌        | Android  | Notification body                                                      |
| `icon`       | string         | ❌        | Android  | Notification icon URL                                                  |
| `collapseKey` | string        | ❌        | Android  | Collapse key; notifications with the same key are collapsed            |

**alert Object Fields (when alert is an object)**

| Parameter  | Type   | Required | Description                    |
| ---------- | ------ | -------- | ------------------------------ |
| `loc-key`  | string | ❌        | Localization string key        |
| `loc-args` | array  | ❌        | Localization string arguments  |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/push/push2clients",
  {
    clients: ["user001", "user002", "user003"],
    payload: {
      type: "marketing",
      alert: "您有一則新的優惠活動，立即查看！",
      badge: 1,
      sound: "default",
      topic: "io.imkit.app",
      title: "限時優惠",
      body: "您有一則新的優惠活動，立即查看！",
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

**Using localized alert object**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/push/push2clients",
  {
    clients: ["user001"],
    payload: {
      alert: {
        "loc-key": "NEW_MESSAGE_NOTIFICATION",
        "loc-args": ["張小明", "您好，請問有空嗎？"]
      },
      badge: 3,
      sound: "default",
      title: "新訊息",
      body: "張小明：您好，請問有空嗎？"
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
      "alert": "系統維護通知：今晚 23:00 將進行例行維護",
      "badge": 1,
      "sound": "default",
      "title": "系統公告",
      "body": "系統維護通知：今晚 23:00 將進行例行維護",
      "icon": "https://example.com/icon.png"
    }
  }'
```

#### Response

**Success Response (200 OK)**

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

When the request succeeds, the server will send push notifications to APNs (iOS) and FCM (Android) respectively.

#### Error Response

**401 Unauthorized** - Invalid API Key

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

**400 Bad Request** - Missing required parameters

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

## Use Cases

### Marketing Pushes
- **Promotional Notifications**: Send promotional campaigns, discount codes, and other marketing messages to specific user groups
- **Personalized Recommendations**: Push personalized product recommendations based on user behavior

### System Notifications
- **Maintenance Announcements**: Send system maintenance, version update, and other announcement messages
- **Security Alerts**: Notify users of suspicious login activity, password changes, and other security events

### Custom Reminders
- **Scheduled Reminders**: Send time-sensitive notifications such as appointment, meeting, and expiration reminders
- **Status Updates**: Notify users of order status changes, review results, and similar updates

------

## Notes

- **Server-Side Only**: This API requires `IM-API-KEY` authentication and is intended for server-side use only
- **Dual-Platform Push**: The system sends push notifications simultaneously via APNs (iOS) and FCM (Android)
- **Device Registration**: Users must have registered a push token; otherwise, notifications cannot be delivered
- **Push Quota**: Be mindful of APNs and FCM rate limits to avoid excessive pushing
- **alert Field**: The iOS `alert` can be a plain string or an object containing localization keys; choose the appropriate format based on your needs
- **Collapse Notifications**: The Android `collapseKey` can be used to merge notifications of the same type, reducing user disturbance
