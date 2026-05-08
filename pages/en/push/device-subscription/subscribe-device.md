# Subscribe Device Token

## Overview

Register a native app's device push token (APNs / FCM, etc.) with IMKIT so that the server-side built-in push pipeline triggered by [`POST /push/push2clients`](/en/push/push-to-clients) or chat room message events can correctly deliver notifications to the user's physical device. Each device is uniquely identified by its `deviceId`, and a single user can register multiple devices simultaneously.

------

## API Endpoint

### Subscribe Push Token

Register the current user's device token to receive push notifications.

```http
POST /me/subscribe
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
| `type`     | string | ✅        | Device token type. Allowed values: `ios`, `android`, `fcm`, `web`, `ios-voip` |
| `token`    | string | ✅        | Device push token (issued by APNs or FCM)                    |
| `deviceId` | string | ✅        | Unique device identifier (generated and persisted by the app) |
| `clientId` | string | ❌        | The Client ID to bind. Required only when calling this API with the platform API Key (`IM-API-KEY`) |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/subscribe",
  {
    type: "ios",
    token: "17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6",
    deviceId: "iphone-15-pro-uuid-001"
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

**Register an Android FCM token**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/subscribe",
  {
    type: "fcm",
    token: "dGhpcyBpcyBhIGZjbSB0b2tlbg...",
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
curl -X POST "https://your-app.imkit.io/me/subscribe" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "type": "ios",
       "token": "17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6",
       "deviceId": "iphone-15-pro-uuid-001"
     }'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| `RC`      | number | Response code (0 indicates success)          |
| `RM`     | string | Response message                             |
| `result`  | object | Subscription result (empty object on success) |

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
    "message": "type, token and deviceId are required"
  }
}
```

------

## Use Cases

### Native App Integration
- **iOS**: After obtaining the APNs device token, register with `type: "ios"`
- **Android**: After obtaining the Firebase registration token, register with `type: "fcm"` (or `android`)
- **VoIP Calls**: Use `type: "ios-voip"` to register the PushKit token, used for incoming-call pushes
- **Web Browsers**: Use `type: "web"` to register the Web Push subscription

### Multi-Device Support
- **Multiple Devices per User**: A user registers a separate `deviceId` on each device; pushes are delivered to all registered devices
- **Device Switching**: When a user changes phones, the new device registers with a new `deviceId`; the old device can call [Unsubscribe](/en/push/device-subscription/unsubscribe-device) to remove its token

### Platform Backend Integration
- **Register on Behalf of a User**: Use `IM-API-KEY` to call this API with `clientId` to bind a device token for a specific user

------

## Notes

- **Timing**: Should be called immediately after the user logs in and the system grants push permission
- **deviceId Consistency**: `deviceId` should be generated and persisted on first app launch (e.g. stored in Keychain / SharedPreferences) and reused thereafter
- **Token Refresh**: When the APNs / FCM token changes (the system notifies the app), call this API again to register the new token
- **Logout Handling**: When the user logs out, it is recommended to call [Unsubscribe](/en/push/device-subscription/unsubscribe-device) to remove the token, preventing pushes from being sent to a logged-out device
- **Token Types**: `ios` and `ios-voip` serve different purposes; VoIP pushes must use `ios-voip`
- **Idempotency**: Calling this API repeatedly with the same `type` + `deviceId` updates the corresponding token without creating duplicate subscriptions
