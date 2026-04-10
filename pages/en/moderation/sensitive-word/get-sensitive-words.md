# Get Sensitive Words

## Overview

Retrieve the current system's sensitive word censorship configuration. This API uses the same endpoint `GET /config` as [Get Config](/en/config/get-config). This page focuses on sensitive word-related configuration items.

------

## API Endpoint

### Query Sensitive Word Configuration

Retrieve the current runtime configuration, including the sensitive word list.

```http
GET /config
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Example Request

```http
GET /config HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/config`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "GET" "https://your-app.imkit.io/config" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Runtime configuration data          |

**Configuration Object Structure**

| Parameter      | Type   | Description                  |
| -------------- | ------ | ---------------------------- |
| `announcement` | object | Announcement configuration   |
| `censorship`   | object | Content censorship configuration |

**Censorship Configuration Object Structure**

| Parameter  | Type  | Description          |
| ---------- | ----- | -------------------- |
| `keywords` | array | Sensitive word array  |

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

### Configuration Review
- **View Configuration**: Review the currently configured sensitive word list
- **Understand Rules**: Understand the current content filtering rules
- **Setting Verification**: Verify that the sensitive word configuration is properly applied

### System Monitoring
- **Configuration Monitoring**: Periodically check the sensitive word configuration status
- **Anomaly Detection**: Monitor for missing or abnormal configurations
- **Compliance Check**: Confirm that configurations meet regulatory requirements

### Administrative Maintenance
- **Backup Preparation**: Back up the current configuration before making changes
- **Issue Diagnosis**: Troubleshoot content filtering-related issues
- **Version Control**: Track configuration change history

------

## Notes

- **Authentication Required**: Valid client authentication is required to view the configuration
- **Runtime Configuration**: Displays the currently active runtime configuration, not file-based configuration
- **Complete Configuration**: The response includes all runtime configuration items, not just sensitive words
- **Real-Time Status**: Displays the system's current real-time configuration status
- **Sensitive Information**: Configuration content may contain sensitive information; handle with care
- **Caching Mechanism**: Configuration may be cached; changes may require waiting for cache updates
