# Delete Sensitive Words

## Overview

Delete the system's sensitive word censorship configuration. By removing the censorship settings from the runtime configuration, you can disable the sensitive word filtering feature or clear specific configuration items. This feature is suitable for configuration cleanup, feature deactivation, and system maintenance.

------

## API Endpoint

### Delete Configuration Item

Delete a specified runtime configuration item.

```http
DELETE /config/{key}
```

#### Headers

| Parameter    | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `IM-API-KEY` | string | ✅        | Platform Admin API Key |

#### Path Parameters

| Parameter | Type   | Required | Description              |
| --------- | ------ | -------- | ------------------------ |
| `key`     | string | ✅        | Runtime configuration key |

#### Example Request

**Delete sensitive word configuration**

```http
DELETE /config/censorship HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**Delete announcement configuration**

```http
DELETE /config/announcement HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**Delete other configuration**

```http
DELETE /config/push HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/config/censorship`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/config/censorship" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Empty object                        |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
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

**404 Not Found** - Configuration item does not exist

```json
{
  "RC": 404,
  "RM": "Config not found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## Use Cases

### Feature Deactivation
- **Disable Filtering**: Completely disable the sensitive word filtering feature
- **Temporary Shutdown**: Temporarily disable certain configuration features
- **Test Environment**: Remove production configurations in the test environment

### Configuration Cleanup
- **Expired Configuration**: Clean up configuration items that are no longer in use
- **Reconfiguration**: Clear old configurations to prepare for reconfiguration
- **System Reset**: Reset configurations to their default state

### Maintenance Operations
- **Emergency Handling**: Urgently remove problematic configurations
- **Version Update**: Clean up old configurations during system updates
- **Bug Fix**: Remove configuration items that are causing issues

------

## Notes

- **Platform Admin Only**: This feature is restricted to platform administrators and requires an API Key
- **Immediate Effect**: Configuration deletion takes effect immediately, and the related feature will be disabled instantly
- **Irreversible**: Delete operations cannot be undone; it is recommended to back up configurations beforehand
- **Feature Impact**: Deleting the censorship configuration will completely disable sensitive word filtering
- **Runtime Configuration**: Only affects runtime configuration and does not modify file-based configuration
- **Dependency Check**: Before deleting, ensure no other features depend on this configuration
- **Monitoring Recommendation**: After deletion, monitor system functionality to ensure everything operates normally
