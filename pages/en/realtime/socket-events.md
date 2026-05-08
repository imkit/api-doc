# Socket Events

## Overview

Once a client establishes a Socket connection and successfully authenticates (see [Socket Connection](/en/realtime/socket-connection)), it can receive real-time events pushed by the server. This page lists every event type and its payload format for native app / web clients to parse.

------

## Event Overview

| Event Name           | Trigger                                               | Purpose                              |
| -------------------- | ----------------------------------------------------- | ------------------------------------ |
| `chat message`       | A new message is received in a chat room              | Display the message, trigger local notification |
| `room`               | Chat room properties change (members, settings, etc.) | Update room list and member list     |
| `lastRead`           | A member updates their last read marker               | Update read-receipt UI               |
| `typing`             | A member is typing                                    | Show "typing…" indicator             |
| `ai_streaming`       | An AI message is streamed back in chunks              | Progressively render AI-generated content |
| `roomPref`           | The user updates a chat room preference               | Sync chat room preferences across devices |
| `myPrefChange`       | The user updates a personal preference                | Sync personal preferences across devices |
| `myPrefDelete`       | The user deletes a personal preference                | Sync across devices                  |
| `invitation`         | A group invitation is received                        | Display invitation notification      |
| `userDeleteMessages` | The user deletes messages (visible to themselves only)| Remove messages from UI              |
| `messageDeleted`     | An admin (super-user) permanently deletes a message   | All members remove the message from UI |

------

## chat message

Triggered when a chat room receives a new message.

| Field | Content        |
| ----- | -------------- |
| Data  | Message object |

**Example payload**

```json
{
  "_id": "5c1ddf2d1536bbb6c49f7cfe",
  "message": "Bonjour 2",
  "room": "demo-room",
  "sender": {
    "_id": "sss",
    "nickname": "Desirae",
    "isRobot": false,
    "avatarUrl": "",
    "id": "sss"
  },
  "messageType": "text",
  "appID": "SampleApp",
  "messageTime": "2018-12-22T06:52:29.380Z",
  "messageTimeMS": 1545461549380,
  "id": "5c1ddf2d1536bbb6c49f7cfe"
}
```

------

## room

Triggered when chat room properties (members, name, settings, etc.) change.

| Field | Content              |
| ----- | -------------------- |
| Data  | Updated chat room object |

------

## lastRead

When a chat room member calls [`PUT /rooms/:id/lastRead`](/en/room/room-management/update-last-read) to update their last read marker, the event is broadcast to all members of that room.

| Field       | Description                       |
| ----------- | --------------------------------- |
| `roomID`    | Chat room ID                      |
| `memberID`  | Client ID of the reporting member |
| `messageID` | The member's last read message ID |

**Example payload**

```json
{
  "roomID": "5be660651a71681534245a4e",
  "messageID": "5be7edaced649e42234f0699",
  "memberID": "aaa"
}
```

------

## typing

Triggered when a member is typing, typically used to display "typing…".

| Field     | Description                       |
| --------- | --------------------------------- |
| `room`    | Chat room ID                      |
| `message` | Typed content (may be partial)    |

**Example payload**

```json
{
  "room": "58871b877390be11d5f1ab30",
  "message": "typing content"
}
```

------

## ai_streaming

Receive streamed AI message chunks, useful for AI assistant real-time replies.

| Field    | Description           |
| -------- | --------------------- |
| `room`   | Chat room ID          |
| `sender` | AI Client ID          |
| `text`   | Message chunk content |

**Example payload**

```json
{
  "room": "<RoomID>",
  "sender": "<ClientID>",
  "text": "<Message chunk content>"
}
```

------

## roomPref

When the current user updates a chat room preference (mute, pin, hide) on one device, the event is broadcast to that user's other connected devices.

| Field | Description                     |
| ----- | ------------------------------- |
| Data  | Updated chat room preference object |

**Example payload**

```json
{
  "room": "demo-room",
  "folder": "Some-Folder",
  "hidden": false,
  "muted": false,
  "sticky": false,
  "tags": ["demo", "sample"]
}
```

------

## myPrefChange

When the current user updates a personal preference on one device, the event is broadcast to that user's other connected devices.

| Field | Description                                |
| ----- | ------------------------------------------ |
| Data  | Object containing `data` and `key` fields  |

**Example payload**

```json
{
  "data": {
    "foo": "bar",
    "folders": {
      "folder 1": { "rooms": ["aaabbb", "cccddd"] }
    }
  },
  "key": "demokey"
}
```

------

## myPrefDelete

Triggered when the current user deletes a personal preference.

| Field | Description           |
| ----- | --------------------- |
| Data  | The deleted preference key |

**Example payload**

```json
"demokey"
```

------

## invitation

Triggered when a group invitation is received.

| Field | Description       |
| ----- | ----------------- |
| Data  | Invitation object |

------

## userDeleteMessages

Triggered when a user deletes messages (visible only to themselves).

| Field                              | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| `room`                             | Chat room ID                                       |
| `messages`                         | Array of deleted message IDs                       |
| `isUserDeleteAllMessagesInRoom`    | Whether this is "delete all messages in the room" (boolean) |

**Example payload**

```json
{
  "room": "demo-FpOtW6",
  "messages": ["64623ad9f83f7f1a35009d6b"],
  "isUserDeleteAllMessagesInRoom": true
}
```

------

## messageDeleted

Triggered when an admin (super-user) permanently deletes a message; received by all members of the chat room.

| Field        | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| `room`       | Chat room ID                                                         |
| `messageID`  | The deleted message ID; if `_all`, all messages in the room have been permanently deleted |

------

## Notes

- **Event Names with Spaces**: `chat message` contains a space — supply the full string when subscribing
- **Payload Decoding**: If `encoding: "base64"` was enabled at connection time, every event payload must first be base64-decoded and then `JSON.parse`d
- **Online Only**: These events are received only while the socket is connected. Events missed while the app is in background or offline must be backfilled via [`POST /push/push2clients`](/en/push/push-to-clients), [Webhook](/en/webhook/webhook), or by re-fetching the message list after reconnect
- **Source Identification**: When `chat message`'s `sender._id` equals the current user, it is a message sent from another device of theirs — the UI should still display it
- **Pair with Push**: Mobile apps should use socket (foreground) + APNs/FCM push (background) together to avoid missed messages
- **Idempotent Handling**: After reconnect, previously processed events may arrive again; clients should de-duplicate by `_id`
