# Unsubscribe Device Token

## Overview

Remove a device token previously registered via [`POST /me/subscribe`](/en/push/device-subscription/subscribe-device) from IMKIT, preventing the device from receiving push notifications after the user logs out, uninstalls the app, or switches devices. It is recommended to call this API as part of the native app's logout flow.

------

## API Endpoint

### Unsubscribe Push Token

Unsubscribe the current user's push subscription on the specified device by `deviceId`.

```http
POST /me/unsubscribe
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |
| `Content-Type`     | string | ✅        | `application/json; charset=utf-8` |

#### Post Body

| Parameter  | Type   | Required | Description                                                  |
| ---------- | ------ | -------- | ------------------------------------------------------------ |
| `type`     | string | ✅        | Device token type. Allowed values: `ios`, `android`, `fcm`, `web` |
| `deviceId` | string | ✅        | Unique device identifier (must match the value used when subscribing) |
| `clientId` | string | ❌        | The Client ID to unbind. Required only when calling this API with the platform API Key (`IM-API-KEY`) |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/unsubscribe",
  {
    type: "fcm",
    deviceId: "pixel-8-uuid-002"
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X POST "https://your-app.imkit.io/me/unsubscribe" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "type": "fcm",
       "deviceId": "pixel-8-uuid-002"
     }'
```

#### Response

**Success Response (200 OK)**

| Parameter    | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| `RC`         | number | Response code (0 indicates success)      |
| `RM`         | string | Response message                         |
| `result`     | object | Unsubscribe result                       |
| `result.n`   | number | Number of records affected               |
| `result.ok`  | number | Operation status (`1` indicates success) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

When `result.n` is `0`, no record matching the given `type` + `deviceId` was found (e.g. the device was never registered or has already been removed).

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

**400 Bad Request** - Missing required parameters

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "type and deviceId are required"
  }
}
```

------

## Use Cases

### User Logout
- **Logout Flow**: Call this API before logging out in the native app to ensure the next user who logs in on the same device does not receive the previous user's pushes

### Device Replacement
- **Retiring Old Devices**: When the user switches phones, call this API on the old device to remove its token

### Push Permission Changes
- **User Disables Notifications**: When the app detects that the user has disabled push permission in system settings, call this API to unsubscribe

------

## Notes

- **No Permission Check**: This API can still be called successfully for cleanup even when the device is offline or the token has already expired
- **deviceId Match**: `deviceId` must match the value used when calling [Subscribe](/en/push/device-subscription/subscribe-device); otherwise no record will match
- **type Match**: `type` must also match (e.g. if registered with `fcm` on Android, unsubscribe must also use `fcm`)
- **Idempotency**: Repeated calls do not produce errors, but `result.n` will return `0` on subsequent calls
