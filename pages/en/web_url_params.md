# Web URL Parameters

## Overview

The IMKIT Web URL supports query parameters to control initialization behavior, including login token, default room, dark mode, and more. This page lists all supported parameters, where to place them in the URL, and common usage scenarios.

------

## Parameter List

| Parameter | Required | Type | Default | Description |
| --------- | -------- | ---- | ------- | ----------- |
| `token` | ✅ (first embed) | string | Existing token in localStorage | JWT auth token. After read, it is automatically saved to `localStorage` and removed from the URL bar |
| `autoSelectRoom` | ❌ | `"0"` | (enabled) | Whether to auto-select the first room on load. Set to `0` to disable |
| `roomId` | ❌ | string | (none) | Target room ID. When set, RoomList is hidden — suitable for single-room embeds |
| `roomTag` | ❌ | string | (none) | Room tag filter. Only rooms with the specified tag are shown |
| `darkMode` | ❌ | `"true"` / `"1"` / `"false"` / `"0"` | Follow system | Toggle dark / light theme |

------

## URL Format

The IMKIT frontend uses hash routing, so **parameter placement affects how it is read**. Use the right placement per the table below.

### Format A: Before the hash (`#`)

Applies to: `token` (initial load), `autoSelectRoom`, `roomId`, `roomTag`

```
https://your-app.imkit.io/?token=USER_TOKEN&roomId=ROOM_ID&autoSelectRoom=0#/
```

### Format B: After the hash route

Applies to: `token` (runtime switch), `darkMode`

```
https://your-app.imkit.io/#/?darkMode=1&token=USER_TOKEN
```

> `token` is supported in both placements: for the **first load**, use Format A (it is saved to localStorage and removed from the URL to prevent leaking via screenshots or sharing); for **runtime token switching**, use Format B (it triggers a socket reconnect and clears the existing store).

------

## Usage Scenarios

### 1. Embed a specific room (hide room list)

```
https://your-app.imkit.io/?token=USER_TOKEN&roomId=6073a1b2c3d4e5f6a7b8c9d0#/
```

Useful when embedding a single conversation in a third-party system, e.g., a customer-support widget showing one chat window.

### 2. Force dark mode

```
https://your-app.imkit.io/#/?darkMode=1
```

Useful when embedding into a dark-themed app or page to keep the theme consistent.

### 3. Disable auto-select + show full room list

```
https://your-app.imkit.io/?token=USER_TOKEN&autoSelectRoom=0#/
```

Useful on mobile web where you want users to pick their own room.

### 4. Filter rooms by tag

```
https://your-app.imkit.io/?token=USER_TOKEN&roomTag=customer-support#/
```

Only rooms tagged with `customer-support` are shown — useful when one IMKIT app serves multiple scenarios.

------

## Notes

- **`token` security**: The `token` in Format A is automatically removed from the URL bar and stored in `localStorage` after the SDK reads it, reducing leak risk from screenshots or URL sharing.
- **`darkMode` accepted values**: Only `"true"` / `"1"` / `"false"` / `"0"` are recognized. Writing `"dark"` or `"light"` has no effect.
- **`roomId` and RoomList**: When `roomId` is present, the RoomList is hidden — suitable for single-room embeds. If you want to keep the room list and just preselect a room, switch programmatically via the SDK API after embed.
- **`autoSelectRoom` default**: When omitted, the default is enabled (auto-select the first room on load). Only `"0"` disables it.

------

## Next Steps

- [Basic Integration](/en/basic_integration) — Full backend integration flow, from creating users and rooms to embedding the Web URL
- [Authentication](/en/auth) — Learn how to obtain and use the API Key and Client Key
