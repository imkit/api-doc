# External Push Service v1 (Legacy)

## Overview

When you want to send pushes via your own APNs / FCM service (instead of using the IMKIT built-in push pipeline), you can configure the `PUSH` environment variable in the platform admin to point to your own HTTPS endpoint. Whenever a chat room produces a new message that requires a push, IMKIT will send a "flattened message object" via HTTP POST to your endpoint, which then forwards it to APNs / FCM.

> **This is the legacy v1 interface.** New integrations should prefer [External Push Service v2 (Generic)](/en/push/external-push/external-push-v2), which provides a more complete set of message fields and a multi-recipient broadcast model.

------

## Configuration

In the IMKIT platform admin, set the environment variable:

```
PUSH=https://your-server.example.com/imkit/push
```

Once configured, IMKIT will `POST` to this URL for every message event that requires a push.

------

## Request Format

### Method

`POST`

### Headers

| Parameter      | Type   | Required | Description                       |
| -------------- | ------ | -------- | --------------------------------- |
| `Content-Type` | string | ✅        | `application/json; charset=utf-8` |

### Request Body

Each request targets exactly one recipient.

| Field      | Type   | Description                                                            |
| ---------- | ------ | ---------------------------------------------------------------------- |
| Message fields | mixed | Flattened message object (follows the [Message Model](/en/realtime/socket-events#chat-message)) |
| `alert`    | string | Pre-assembled APNs / FCM alert text, ready to send to push providers   |
| `toClient` | string | Recipient Client ID                                                    |
| `badge`    | number | The recipient's current total unread count, ready for APNs `badge` or FCM `badge` |

------

## Example Request

```javascript
{
  "_id": "5dd51a4f21841443cfd3090d",
  "message": "lala",
  "room": "demo-room",
  "sender": {
    "_id": "sss",
    "avatarUrl": "http://loremflickr.com/240/240/style?1574241882",
    "nickname": "SSS",
    "description": "description la la #1568192464957",
    "isRobot": false,
    "id": "sss",
    "lastLoginTimeMS": 1568192470942
  },
  "messageType": "text",
  "appID": "SampleApp",
  "id": "5dd51a4f21841443cfd3090d",
  "messageTimeMS": 1574246991222,
  "updatedAtMS": 1574246991223,
  "createdAtMS": 1574246991223,
  "toClient": "target-client-id",
  "badge": 100
}
```

------

## Response

Your service should return `200 OK` (body content is not constrained); IMKIT will not act on the response body.

------

## Use Cases

### Existing Push Service Integration
- **Reuse Your Own Push Service**: If you already have an APNs / FCM push service in place, you can hook IMKIT message events into it without changing the existing flow

### Custom Copy
- **Custom Alert Text**: Reassemble push copy in your service based on `messageType`, `sender`, `message`, free of IMKIT's built-in format constraints

### Multi-Channel Push
- **APNs / FCM / Email / SMS Together**: Fan out a single event to multiple channels in your service

------

## Notes

- **Legacy Interface**: The v1 interface uses a single-recipient model with one request per recipient; for many recipients the request volume amplifies. Prefer the [v2 (Generic)](/en/push/external-push/external-push-v2) multi-recipient broadcast model
- **Message Field Differences**: v1 does not include some fields such as `roomName`; for full chat room information use v2
- **Coexistence with Webhook**: This push callback is distinct from the [Chat Room Webhook](/en/webhook/webhook); the former is for push delivery, the latter for bot / event monitoring
- **HTTPS Required**: For security, the `PUSH` URL must use HTTPS and have origin verification (IP allowlist or shared secret)
- **Payload Format Reference**: When assembling APNs / FCM payloads, refer to [Push Payload Format](/en/push/push-payload-format)
