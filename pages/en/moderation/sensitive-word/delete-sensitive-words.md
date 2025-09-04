# Delete Sensitive Words

## Overview

Delete the system's sensitive word censorship configuration. By removing censorship settings from the runtime configuration, you can disable sensitive word filtering functionality or clear specific configuration items. This feature is suitable for configuration cleanup, feature disabling, and system maintenance.

------

## API Endpoint

### Delete Configuration Item

Delete a specified runtime configuration item.

```http
DELETE /config/{key}
```

#### Headers

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | Platform administrator API Key |

#### Path Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `key` | string | ✅ | Runtime configuration key |

#### Example Request

**Delete sensitive word configuration**

```http
DELETE /config/censorship HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

**Delete announcement configuration**

```http
DELETE /config/announcement HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

**Delete other configuration**

```http
DELETE /config/push HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

#### Response

**Success Response (200 OK)**

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `RC` | number | Response code (0 indicates success) |
| `RM` | string | Response message |
| `result` | object | Empty object |

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

### Feature Disabling
- **Disable filtering**: Completely disable sensitive word filtering functionality
- **Temporary shutdown**: Temporarily disable certain configuration features
- **Test environment**: Remove production configurations in test environments

### Configuration Cleanup
- **Expired configurations**: Clean up configuration items that are no longer used
- **Reset settings**: Clear old configurations to prepare for new settings
- **System reset**: Reset configuration to default state

### Maintenance Operations
- **Emergency handling**: Urgently remove problematic configurations
- **Version updates**: Clean old configurations during system updates
- **Error fixing**: Remove configuration items causing issues

------

## Important Notes

- **Platform administrator only**: This feature is limited to platform administrators and requires API Key
- **Immediate effect**: Configuration deletion takes effect immediately, related functions will be disabled immediately
- **Irreversible**: Delete operations cannot be undone, recommend backing up configuration beforehand
- **Function impact**: Deleting censorship configuration will completely disable sensitive word filtering
- **Runtime configuration only**: Only affects runtime configuration, does not modify file configurations
- **Dependency check**: Ensure no other functions depend on this configuration before deletion
- **Monitoring recommendation**: Monitor system functions for normal operation after deletion