# Update Sensitive Words

## Overview

Update or create the system's sensitive word censorship configuration. Manage blocked word lists through the runtime configuration system to filter inappropriate content in real-time and maintain the quality of the chat environment. This feature is suitable for content censorship, sensitive word management, and platform governance.

------

## API Endpoint

### Update Sensitive Word Configuration

Create or update runtime configuration variables, including sensitive word list settings.

```http
POST /config
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | API Key |

#### Post Body

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `censorship` | object | ❌ | Content censorship configuration object |
| `announcement` | object | ❌ | Announcement configuration object (optional) |

**Censorship Configuration Object Structure**

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `keywords` | array | ✅ | Array of sensitive words to block |

#### Example Request

**Set sensitive word list**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
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

**Update sensitive word list only**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
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

**Add sensitive words to existing list**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
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

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Updated configuration data |

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
- **Add sensitive words**: Add new sensitive words to the filter list
- **Update list**: Modify existing sensitive word list
- **Batch settings**: Set multiple sensitive words at once

### Content Censorship
- **Dynamic adjustment**: Adjust filtering rules in real-time based on content trends
- **Emergency response**: Quickly add sensitive content that needs filtering
- **Rule optimization**: Optimize filtering rules based on usage patterns

### Platform Governance
- **Policy enforcement**: Update content filtering rules according to platform policies
- **Regional adaptation**: Adjust sensitive words according to different regional regulations
- **Compliance requirements**: Meet legal and regulatory content censorship requirements

------

## Important Notes

- **Platform administrator only**: This feature is limited to platform administrators and requires API Key
- **Immediate effect**: Configuration updates take effect immediately, affecting all chat content
- **Configuration override**: POST requests will override existing configurations, ensure complete data is included
- **Backup recommendation**: Recommend querying current configuration as backup before updates
- **Keyword format**: Sensitive words are stored as string arrays, case-sensitive
- **Runtime configuration**: Uses runtime configuration system, effective without service restart
- **Complete update**: Recommend including all configuration items that need to be preserved to avoid losing other settings