# Update Config

## Overview

Update the application's system configuration settings. This endpoint allows you to set announcements, censorship keywords, feature flags, and other arbitrary key-value pairs. This is an admin-only API that requires `IM-API-KEY` for authentication.

------

## API Endpoint

### Update Config

Add or update system configuration key-value pairs.

```http
POST /config
```

#### Headers

| Parameter      | Type   | Required | Description                       |
| -------------- | ------ | -------- | --------------------------------- |
| `IM-API-KEY`   | string | ✅        | Your platform API Key             |
| `Content-Type` | string | ✅        | `application/json; charset=utf-8` |

#### Post Body

The request body consists of arbitrary JSON key-value pairs that will be stored as system configuration.

| Parameter    | Type | Required | Description                                        |
| ------------ | ---- | -------- | -------------------------------------------------- |
| (any key)    | any  | ❌        | Any key-value pair, will be stored as system config |

#### Example Request

**JavaScript (axios) - Set announcement**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    announcement: {
      text: "系統將於 2026/04/15 02:00 進行例行維護，預計維護時間 2 小時。",
      pin: true
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

**JavaScript (axios) - Set censorship keywords**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    censorship: {
      keywords: ["廣告", "垃圾訊息", "詐騙"]
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

**cURL - Set multiple configuration items**

```bash
curl -X POST "https://your-app.imkit.io/config" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "announcement": {
      "text": "歡迎使用 IMKit！",
      "pin": true
    },
    "censorship": {
      "keywords": ["廣告", "垃圾訊息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| `RC`      | number | Response code (0 indicates success)    |
| `RM`      | string | Response message                       |
| `result`  | object | Updated system configuration settings  |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "歡迎使用 IMKit！",
      "pin": true
    },
    "censorship": {
      "keywords": ["廣告", "垃圾訊息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }
}
```

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

**400 Bad Request** - Invalid request format

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "INVALID_BODY",
    "message": "Request body must be a valid JSON object"
  }
}
```

------

## Use Cases

### Announcement Management
- **Set System Announcements**: Publish or update system announcement messages, with the option to pin them
- **Event Announcements**: Publish information about limited-time events, promotions, etc.

### Content Moderation Settings
- **Set Censorship Keywords**: Add or update the sensitive word list for message content filtering
- **Moderation Rule Adjustment**: Dynamically adjust content moderation rules

### Feature Flag Management
- **Feature Toggles**: Dynamically enable or disable specific features
- **Parameter Adjustment**: Update system parameters such as file size limits, message length limits, etc.

------

## Notes

- **Admin Only**: This endpoint requires `IM-API-KEY` authentication and is restricted to server-side use
- **Override Behavior**: Settings with the same key name will be overwritten
- **Arbitrary Key-Value Pairs**: The request body supports any JSON structure; the system does not restrict key names or value formats
- **Immediate Effect**: Updated settings take effect immediately; clients will receive the latest settings on their next `GET /config` call
