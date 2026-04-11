# Update Sensitive Words

## Overview

Update or create the system's sensitive word censorship configuration. Manage the blocked word list through the runtime configuration system to filter inappropriate content in real time and maintain the quality of the chat environment. This feature is suitable for content moderation, sensitive word management, and platform governance.

------

## API Endpoint

### Update Sensitive Word Configuration

Create or update runtime configuration variables, including sensitive word list settings.

```http
POST /config
```

#### Headers

| Parameter    | Type   | Required | Description |
| ------------ | ------ | -------- | ----------- |
| `IM-API-KEY` | string | ✅        | API Key     |

#### Post Body

| Parameter      | Type   | Required | Description                        |
| -------------- | ------ | -------- | ---------------------------------- |
| `censorship`   | object | ❌        | Content censorship configuration object |
| `announcement` | object | ❌        | Announcement configuration object (optional) |

**Censorship Configuration Object Structure**

| Parameter  | Type  | Required | Description                         |
| ---------- | ----- | -------- | ----------------------------------- |
| `keywords` | array | ✅        | Array of sensitive words to block   |

#### Example Request

**Set the sensitive word list**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "announcement": {
    "text": "blahblah...",
    "pin": true
  },
  "censorship": {
    "keywords": [
      "foo",
      "bar"
    ]
  }
}
```

**Update only the sensitive word list**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "censorship": {
    "keywords": [
      "spam",
      "inappropriate",
      "banned_word"
    ]
  }
}
```

**Add sensitive words to the existing list**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "censorship": {
    "keywords": [
      "foo",
      "bar",
      "newword1",
      "newword2"
    ]
  }
}
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/config`,
  {
    censorship: {
      keywords: ["foo", "bar"],
    },
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL Example:**

```bash
curl -X "POST" "https://your-app.imkit.io/config" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d '{"censorship": {"keywords": ["foo", "bar"]}}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Updated configuration data          |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "blahblah...",
      "pin": true
    },
    "censorship": {
      "keywords": [
        "foo",
        "bar"
      ]
    }
  }
}
```

#### Error Response

**401 Unauthorized** - Authentication failed

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

**403 Forbidden** - Insufficient permissions

```json
{
  "RC": 403,
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only platform admin can manage runtime config"
  }
}
```

**400 Bad Request** - Invalid request format

```json
{
  "RC": 400,
  "RM": "Invalid request format",
  "error": {
    "code": "INVALID_CONFIG_FORMAT",
    "message": "Config format is invalid or malformed"
  }
}
```

------

## Use Cases

### Sensitive Word Management
- **Add Sensitive Words**: Add new sensitive words to the filter list
- **Update List**: Modify the existing sensitive word list
- **Batch Configuration**: Set multiple sensitive words at once

### Content Moderation
- **Dynamic Adjustment**: Adjust filtering rules in real time based on content trends
- **Emergency Response**: Quickly add sensitive content that needs to be filtered
- **Rule Optimization**: Optimize filtering rules based on usage patterns

### Platform Governance
- **Policy Enforcement**: Update content filtering rules based on platform policies
- **Regional Adaptation**: Adjust sensitive words according to different regional regulations
- **Compliance Requirements**: Meet legal and regulatory content review requirements

------

## Notes

- **Platform Admin Only**: This feature is restricted to platform administrators and requires an API Key
- **Immediate Effect**: Configuration updates take effect immediately, affecting all chat content
- **Configuration Override**: POST requests override existing configurations; ensure you include the complete data
- **Backup Recommendation**: It is recommended to query the current configuration as a backup before updating
- **Keyword Format**: Sensitive words are stored as a string array and are case-sensitive
- **Runtime Configuration**: Uses the runtime configuration system; no service restart is required for changes to take effect
- **Complete Update**: It is recommended to include all configuration items you wish to retain to avoid losing other settings
