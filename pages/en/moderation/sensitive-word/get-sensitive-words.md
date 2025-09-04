# Get Sensitive Words

## Overview

Retrieve the current system's sensitive word censorship configuration. Query the blocked word list through the runtime configuration system to understand the current filtering rules set by the system. This feature is suitable for configuration viewing, system monitoring, and administrative maintenance.

------

## API Endpoint

### Query Sensitive Word Configuration

Retrieve the current runtime configuration, including the sensitive word list.

```http
GET /config
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### Example Request

```http
GET /config HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {CLIENT_TOKEN}
Host: localhost:3100
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Runtime configuration data |

**Configuration Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `announcement` | object | Announcement configuration |
| `censorship` | object | Content censorship configuration |

**Censorship Configuration Object Structure**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `keywords` | array | Sensitive word array |

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
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
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
    "message": "Only authorized users can view runtime config"
  }
}
```

------

## Use Cases

### Configuration Viewing
- **Configuration viewing**: View the current system's sensitive word list
- **Rule understanding**: Understand the current content filtering rules
- **Setting verification**: Verify if sensitive word configuration is correctly effective

### System Monitoring
- **Configuration monitoring**: Regularly check sensitive word configuration status
- **Anomaly detection**: Monitor for abnormal or missing configurations
- **Compliance checking**: Ensure configuration complies with regulatory requirements

### Administrative Maintenance
- **Backup preparation**: Backup current configuration before modifications
- **Problem diagnosis**: Troubleshoot content filtering related issues
- **Version control**: Track configuration change history

------

## Important Notes

- **Authentication required**: Valid client authentication is required to view configuration
- **Runtime configuration**: Displays currently effective runtime configuration, not file configuration
- **Complete configuration**: Response includes all runtime configuration items, not limited to sensitive words
- **Real-time status**: Displays current real-time configuration status
- **Sensitive information**: Configuration content may include sensitive information, please handle with care
- **Caching mechanism**: Configuration may be cached, changes require waiting for cache updates