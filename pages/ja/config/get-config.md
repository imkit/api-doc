# Get Config

## Overview

Retrieve the application's runtime configuration. This endpoint returns all configuration key-value pairs set in the system, including announcements, censorship keywords, feature flags, and more. Clients can authenticate using `IM-CLIENT-KEY` with `IM-Authorization` to read the configuration.

------

## API Endpoint

### Get Config

Retrieve all current system configuration settings.

```http
GET /config
```

#### Headers

| Parameter          | Type   | Required | Description            |
| ------------------ | ------ | -------- | ---------------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Your Client Key        |
| `IM-Authorization` | string | ✅        | User authorization token |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/config",
  {
    headers: {
      "IM-CLIENT-KEY": process.env.IM_CLIENT_KEY,
      "IM-Authorization": "Bearer user_access_token"
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/config" \
  -H "IM-CLIENT-KEY: your_client_key" \
  -H "IM-Authorization: Bearer user_access_token"
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| `RC`      | number | Response code (0 indicates success)                         |
| `RM`      | string | Response message                                            |
| `result`  | object | System configuration key-value pairs, content varies by settings |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "歡迎使用 IMKit 即時通訊服務！",
      "pin": true
    },
    "censorship": {
      "keywords": ["廣告", "垃圾訊息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true,
      "maxFileSize": 10485760
    }
  }
}
```

#### Error Response

**401 Unauthorized** - Authorization verification failed

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_AUTH",
    "message": "Invalid or missing authorization"
  }
}
```

------

## Use Cases

### Feature Flags
- **Dynamic Feature Toggles**: Read feature flags at client startup to dynamically enable or disable specific features
- **Gradual Rollout**: Control the gradual release of new features through configuration

### Announcement Messages
- **System Announcements**: Read pinned announcement content to display in the client interface
- **Maintenance Notices**: Retrieve scheduled maintenance information to notify users in advance

### Content Moderation
- **Censorship Keywords**: Retrieve the sensitive word list for client-side message filtering
- **Content Policy**: Read content policy settings to ensure client compliance with guidelines

------

## Notes

- **Client Readable**: This endpoint uses `IM-CLIENT-KEY` and `IM-Authorization` for authentication, allowing client applications to call it directly
- **Read-Only Operation**: This endpoint only provides read functionality; updating settings requires `POST /config` (which needs `IM-API-KEY`)
- **Dynamic Content**: The returned configuration content depends on items set by the administrator via `POST /config`; different applications may have different settings
- **Caching Recommendation**: It is recommended that clients cache configuration data appropriately to avoid frequent calls to this API
