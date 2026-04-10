# Delete Config

## Overview

Delete a specific system configuration item from the application. Remove the corresponding setting value by specifying the configuration key name. This is an admin-only API that requires `IM-API-KEY` for authentication.

------

## API Endpoint

### Delete a Specified Configuration Item

Delete a specific system configuration setting by key name.

```http
DELETE /config/:key
```

#### Headers

| Parameter    | Type   | Required | Description             |
| ------------ | ------ | -------- | ----------------------- |
| `IM-API-KEY` | string | ✅        | Your platform API Key   |

#### Path Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `key`     | string | ✅        | Configuration key name to delete   |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.delete(
  "https://your-app.imkit.io/config/announcement",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X DELETE "https://your-app.imkit.io/config/announcement" \
  -H "IM-API-KEY: your_api_key"
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

**404 Not Found** - Specified configuration key does not exist

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## Use Cases

### Configuration Management
- **Remove Expired Announcements**: Delete system announcement settings that are no longer needed
- **Clear Censorship Keywords**: Remove the entire censorship keyword configuration item
- **Disable Feature Flags**: Delete specific feature flag settings to restore default behavior

------

## Notes

- **Admin Only**: This endpoint requires `IM-API-KEY` authentication and is restricted to server-side use
- **Irreversible**: Delete operations cannot be undone; please confirm before proceeding
- **Immediate Effect**: Deletion takes effect immediately; clients will no longer see the deleted item on their next `GET /config` call
- **Entire Key-Value Deletion**: This operation deletes the entire key-value pair; if you only need to remove partial content, use `POST /config` to update instead
