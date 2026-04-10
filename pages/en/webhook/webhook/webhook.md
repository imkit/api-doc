# Webhook

## Overview

The Webhook feature allows you to register specific URL endpoints to receive real-time messages and event notifications from chatrooms. When specific events occur in a chatroom (such as new messages, member joins, member leaves, etc.), the system will automatically send a POST request to your registered Webhook URL containing the relevant event data. This feature is suitable for building bots, automated processing, push notification systems, and other application scenarios.

------

## API Endpoint

### Register a Webhook

You can register a Webhook URL for each chatroom to receive messages and events from that chatroom.

For Webhook configuration, refer to the `webhook` property in the [Update a Room](/en/room/room-management/update-a-room) API.

------

## Webhook Received Data Format

When an event occurs in a chatroom, the system sends a POST request to your registered Webhook URL containing JSON-formatted data as follows:

### Basic Data Structure

| Parameter  | Type   | Description                                                                                   |
| ---------- | ------ | --------------------------------------------------------------------------------------------- |
| `appID`    | string | Application ID                                                                                |
| `clientID` | string | Sender ID                                                                                     |
| `roomID`   | string | Chatroom ID where the event occurred                                                          |
| `event`    | string | Event type                                                                                    |
| `botState` | string | Current bot state of the chatroom (if your bot is implemented as a finite state machine, you can determine reactions based on the state and message) |
| `data`     | object | Message or event data sent to the chatroom                                                    |

------

## Event Types

### Join Room Event

Triggered when a user joins a chatroom.

**Event Type**: `JOIN_ROOM`

```json
{
  "roomID": "demo-room",
  "event": "JOIN_ROOM",
  "data": {
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Desirae",
      "isRobot": false,
      "lastLoginTimeMS": 0,
      "id": "sss"
    },
    "members": [
      {
        "_id": "sss",
        "nickname": "Desirae",
        "isRobot": false,
        "lastLoginTimeMS": 0,
        "id": "sss"
      }
    ]
  }
}
```

### Add Members Event

Triggered when members are added to a chatroom.

**Event Type**: `ADD_MEMBERS`

```json
{
  "roomID": "demo-room",
  "event": "ADD_MEMBERS",
  "data": {
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Desirae",
      "isRobot": false,
      "lastLoginTimeMS": 0,
      "id": "sss"
    },
    "members": [
      {
        "_id": "robot001",
        "nickname": "Doris Robot",
        "isRobot": true,
        "lastLoginTimeMS": 0,
        "id": "robot001"
      }
    ]
  }
}
```

### Remove Members Event

Triggered when members are removed from a chatroom.

**Event Type**: `DELETE_MEMBERS`

```json
{
  "roomID": "demo-room",
  "event": "DELETE_MEMBERS",
  "data": {
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Desirae",
      "isRobot": false,
      "lastLoginTimeMS": 0,
      "id": "sss"
    },
    "members": [
      {
        "_id": "ccc",
        "nickname": "Aurora",
        "isRobot": false,
        "lastLoginTimeMS": 0,
        "id": "ccc"
      }
    ]
  }
}
```

### Message Event

Triggered when a new message is received in a chatroom.

**Event Type**: `MESSAGE`

```json
{
  "roomID": "demo-room",
  "event": "MESSAGE",
  "data": {
    "_id": "5c1ddf2d1536bbb6c49f7cfe",
    "message": "Bonjour 2",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Desirae",
      "isRobot": false,
      "avatarUrl": "",
      "description": "description la la #1543989664813",
      "lastLoginTime": "2018-12-05T06:01:06.092Z",
      "lastLoginTimeMS": 1543989666092,
      "id": "sss"
    },
    "messageType": "text",
    "appID": "SampleApp",
    "__v": 0,
    "messageTime": "2018-12-22T06:52:29.380Z",
    "messageTimeMS": 1545461549380,
    "id": "5c1ddf2d1536bbb6c49f7cfe"
  }
}
```

------

## Webhook Response Format

Your Webhook service can return a JSON-formatted response to control bot behavior and send messages.

### Response Data Structure

| Parameter    | Type    | Required | Description                                                                  |
| ------------ | ------- | -------- | ---------------------------------------------------------------------------- |
| `senderID`   | string  | ❌        | Specify a sender ID to reply or send messages to the chatroom                |
| `toBotState` | string  | ❌        | Transition the chatroom to the specified bot state; specify the current state to maintain it |
| `data`       | message | ❌        | Reply message content                                                        |

### Example Response

**Basic response** (no action taken)

```json
{
  "toBotState": null,
  "data": null
}
```

**Bot reply message**

```json
{
  "senderID": "robot001",
  "toBotState": "active",
  "data": {
    "message": "您好！我是機器人助手，有什麼可以幫助您的嗎？",
    "messageType": "text"
  }
}
```

------

## Use Cases

### Bot Development
- **Auto Reply**: Automatically reply with appropriate messages based on received message content
- **State Management**: Implement a finite state machine to manage conversation flow
- **Command Processing**: Parse user commands and execute corresponding actions

### Notification System
- **Custom Pushes**: Send customized push notifications based on specific events
- **Real-Time Monitoring**: Monitor chatroom activity and trigger corresponding processing
- **Event Logging**: Record important events for analysis or auditing

### System Integration
- **Third-Party Services**: Integrate chat events with other systems or services
- **Data Synchronization**: Synchronize chat data to external databases or systems
- **Workflows**: Trigger automated workflows and business logic

### Content Management
- **Message Filtering**: Automatically detect and process inappropriate content
- **Content Analysis**: Analyze message content for sentiment analysis or keyword extraction
- **Smart Assistant**: Provide smart Q&A or customer service functionality

------

## Notes

- **HTTP POST**: All Webhook requests use the HTTP POST method
- **JSON Format**: Both requests and responses use JSON format
- **Real-Time**: Webhooks are triggered immediately when events occur
- **Reliability**: It is recommended to implement retry mechanisms and error handling
- **Security**: It is recommended to verify request origins and implement appropriate security measures
- **Performance Consideration**: Webhook endpoints should respond quickly to avoid timeouts
- **State Management**: Bot states can be used to implement complex conversation logic
- **Response Format**: Incorrect response formats may cause bot functionality to malfunction
