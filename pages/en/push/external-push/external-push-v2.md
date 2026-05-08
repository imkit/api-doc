# External Push Service v2 (Generic)

## Overview

`PUSH_GENERIC` is the generic external push callback that supersedes v1. Compared with v1, which uses "one request per recipient", v2 uses a **broadcast model**: a single request carries the message and a `pushToClients` recipient array, and your service assembles the payload and computes the badge for each recipient. For group messages, this drastically reduces outbound request volume.

> **Important**: With Generic Push Service you must compute each recipient's (chat-room member's) badge yourself. IMKIT does not provide per-recipient badge values in this callback.

------

## Configuration

In the IMKIT platform admin, set the environment variable:

```
PUSH_GENERIC=https://your-server.example.com/imkit/push/v2
```

Once configured, IMKIT will send each push-eligible message event to this endpoint as a single request, listing every Client ID that should receive the push.

------

## Request Format

### Method

`POST`

### Headers

| Parameter      | Type   | Required | Description                       |
| -------------- | ------ | -------- | --------------------------------- |
| `Content-Type` | string | ✅        | `application/json; charset=utf-8` |

### Request Body

| Field           | Type     | Description                                                                                  |
| --------------- | -------- | -------------------------------------------------------------------------------------------- |
| Message fields  | mixed    | Flattened message object (follows the [Message Model](/en/realtime/socket-events#chat-message)) |
| `roomName`      | string   | Chat room name (custom display name, useful for push titles)                                 |
| `pushToClients` | string[] | Array of recipient Client IDs that should receive a push for this message                    |

------

## Example Request

```javascript
{
  "_id": "5dd51a4f21841443cfd3090d",
  "message": "lala",
  "room": "demo-room",
  "roomName": "Demo Room",
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
  "pushToClients": ["aaa", "bbb"]
}
```

------

## What Your Service Should Do

When this request arrives, your Generic Push Service should:

1. **Compute the badge**: For each Client in the `pushToClients` array, compute the total unread count from your own data source (IMKIT does not supply badges in this callback)
2. **Look up device tokens**: Resolve each Client ID to its APNs / FCM token (you can store these yourself, or sync them from IMKIT's [`/me/subscribe`](/en/push/device-subscription/subscribe-device) registration data)
3. **Assemble the payload**: Build it according to [Push Payload Format](/en/push/push-payload-format); you may use IMKIT's `im_loc_*` localization keys
4. **Send to APNs / FCM**: Call the push provider APIs to deliver the notification

------

## Response

Your service should return `200 OK` (body content is not constrained); IMKIT will not act on the response body.

------

## Use Cases

### Group Push Optimization
- **One Request, Many Recipients**: When a 50-person group sends a new message, IMKIT issues a single callback; your service handles all 50 tokens in one pass, reducing network cost

### Advanced Push Strategy
- **Per-User Routing**: Some users may have muted the room or be online; your service can decide whether to push for each
- **A/B Testing**: Send different copy / titles to different user cohorts

### Centralized Badge Counting
- **Cross-Domain Badge**: If your app has notifications beyond chat (orders, events, etc.), you can compute a unified total badge in your service

------

## Notes

- **Self-Managed Badge**: This is the biggest difference from v1 — IMKIT no longer computes the badge for you, you must implement it yourself
- **Richer Message Fields**: v2 provides `roomName` and other richer fields; push copy can show "<Room Name> · <Sender>: <Content>"
- **Mutually Exclusive with v1**: When both `PUSH` and `PUSH_GENERIC` are set, behavior follows the IMKIT platform-side configuration; we recommend enabling only one
- **HTTPS Required**: The `PUSH_GENERIC` URL must use HTTPS and have origin verification
- **Failure Handling**: If your service fails transiently, schedule retries on your side; IMKIT does not automatically resend
- **Payload Format Reference**: For detailed fields and localization keys, see [Push Payload Format](/en/push/push-payload-format)
