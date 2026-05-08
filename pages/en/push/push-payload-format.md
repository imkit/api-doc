# Push Payload Format

## Overview

This page documents the payload structure IMKIT uses when delivering APNs (iOS) and FCM (Android) pushes, along with the built-in localization key reference. After receiving the raw push, the native app can parse the payload according to this document for further UI display and click-through routing.

------

## APNs Push Format

```json
{
  "aps": {
    "alert": {
      "loc-key": "im_loc_text",
      "loc-args": ["How do you do?"]
    },
    "sound": "chime.aiff"
  }
}
```

| Field      | Type   | Description                                                                  |
| ---------- | ------ | ---------------------------------------------------------------------------- |
| `alert`    | mixed  | Alert object; can be a string or an object containing `loc-key`, `loc-args`  |
| `loc-key`  | string | Localization string key, in the form `im_loc_${MessageType}` (full list below) |
| `loc-args` | array  | Localization string argument array. `$1` is the sender's nickname, `$2` is the message content |

> Reference: [Apple Local and Remote Notification Programming Guide](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html)

------

## FCM (GCM) Push Format

```javascript
{
  collapseKey: "<collapseKey>",
  timeToLive: 3600,
  notification: {
    title: "<title>",
    body: "<body>",
    icon: "<icon>",
    body_loc_key: "im_loc_text",
    body_loc_args: ["How do you do?"],
    badge: 1,
    click_action: "push_chatroom"
  },
  data: {
    "loc-key": "im_loc_text",
    "loc-args": ["How do you do?"],
    type: "<type>",
    payload: { /* full message object */ }
  }
}
```

| Block           | Field          | Description                                              |
| --------------- | -------------- | -------------------------------------------------------- |
| `notification`  | `title`        | Notification title                                       |
| `notification`  | `body`         | Notification body                                        |
| `notification`  | `icon`         | Notification icon URL or resource name                   |
| `notification`  | `body_loc_key` | Localization string key (same format as APNs `loc-key`)  |
| `notification`  | `body_loc_args`| Localization string arguments                            |
| `notification`  | `badge`        | Unread count on the app icon                             |
| `notification`  | `click_action` | Intent action when the push is tapped, defaults to `push_chatroom` |
| `data`          | `loc-key`      | Same as above, used for parsing data-only pushes         |
| `data`          | `loc-args`     | Same as above                                            |
| `data`          | `type`         | Push type (custom classification)                        |
| `data`          | `payload`      | Original message object, available for in-app processing (e.g. routing) |

------

## Localization Key Reference

Each message type maps to a different localization key, which the native app can translate via its string resources.

| `loc-key`             | Message Type / Event       | Example (Chinese)        |
| --------------------- | -------------------------- | ------------------------ |
| `im_loc_text`         | Text message               | `$1: $2` (`Alice: 你好`) |
| `im_loc_image`        | Image message              | `$1 傳送了一張圖片`      |
| `im_loc_video`        | Video message              | `$1 傳送了一段影片`      |
| `im_loc_audio`        | Audio message              | `$1 傳送了一段語音`      |
| `im_loc_sticker`      | Sticker                    | `$1 傳送了一張貼圖`      |
| `im_loc_location`     | Location message           | `$1 分享了位置`          |
| `im_loc_file`         | File message               | `$1 傳送了一個檔案`      |
| `im_loc_joinRoom`     | Join chat room             | `$1 加入了聊天室`        |
| `im_loc_leaveRoom`    | Leave chat room            | `$1 離開了聊天室`        |
| `im_loc_addMember`    | Add a single member        | `$1 邀請了 $2`           |
| `im_loc_addMembers`   | Add multiple members       | `$1 邀請了多人`          |
| `im_loc_deleteMember` | Remove a member            | `$1 將 $2 移出聊天室`    |
| `im_loc_encrypted`    | Encrypted message          | `您收到一則加密訊息`     |

> The table above lists the common keys; the actual supported keys grow with new message types. Apps should fall back gracefully on unknown `loc-key` values (e.g. display the `body` field).

------

## Argument Mapping

Positional arguments in `loc-args`:

| Position | Content          |
| -------- | ---------------- |
| `$1`     | Sender's nickname |
| `$2`     | Message content  |

For example, with `loc-key: "im_loc_text"` and `loc-args: ["Alice", "Hello"]`, defining the string resource as `"%1$@: %2$@"` (iOS) or `"%1$s: %2$s"` (Android) yields `Alice: Hello`.

------

## Use Cases

### Multilingual Apps
- **Localized Display**: Instead of showing the body string straight from the server, look up the `loc-key` in the app's translation files to apply the user's locale automatically
- **New Message Type Expansion**: When the backend adds new message types, the app only needs to add the corresponding key to its string resources — no backend push copy changes required

### Custom Push Copy
- **Custom Alert Text**: Users can customize alerts like "$1 sent $2" inside the app, as long as the `loc-args` order is preserved

------

## Notes

- **APNs vs. FCM Naming**: APNs uses `loc-key` / `loc-args`; FCM's `notification` block uses `body_loc_key` / `body_loc_args`, while the `data` block still uses `loc-key` / `loc-args` — keep them straight when parsing
- **Unknown Key Fallback**: When a `loc-key` is missing from the string resources, fall back to FCM's `body` or APNs' plain alert text
- **Push Collapsing**: Android's `collapseKey` merges similar notifications; iOS's counterpart is `apns-collapse-id` (configured on the IMKIT platform side)
- **VoIP Pushes**: Audio / video calls should use a token registered with [`type: "ios-voip"`](/en/push/device-subscription/subscribe-device); the payload goes directly through PushKit and does not follow this format
- **Silent Pushes**: A push without `title` / `body` in the `notification` block (only `data`) is a silent push, useful for background unread-count sync
- **Relationship with `/push/push2clients`**: The [Custom Push API](/en/push/push-to-clients) sends in this same format, so the native app's parsing logic can be shared
