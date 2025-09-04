# Webhook

## Overview

Webhook functionality allows you to register specific URL endpoints to receive real-time message and event notifications from chatrooms. When specific events occur in chatrooms (such as new messages, member joins, member leaves, etc.), the system will automatically send POST requests to your registered Webhook URL, including relevant event data. This feature is suitable for building bots, automation processing, push notification systems, and other application scenarios.

------

## API Endpoint

### Register Webhook

You can register Webhook URLs for each chatroom to receive messages and events from that chatroom.

For Webhook configuration, please refer to the webhook attribute of the chatroom model:
https://github.com/FUNTEKco/chat-server-document/wiki/Model#room

------

## Webhook Received Data Format

When events occur in chatrooms, the system will send POST requests to your registered Webhook URL, containing JSON formatted data as follows:

### Basic Data Structure

| Parameter | Type | Description |
| ---- | ---- | ---- |
| `appID` | string | Application identifier |
| `clientID` | string | Sender ID |
| `roomID` | string | Chatroom ID where the event occurred |
| `event` | string | Event type |
| `botState` | string | Current bot state of the chatroom (if your bot is implemented as a finite state machine, you can decide reactions based on state and messages) |
| `data` | object | Message or event data sent to the chatroom |

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

Triggered when new members are added to a chatroom.

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

### Delete Members Event

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

Triggered when a chatroom receives a new message.

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

Your Webhook service can return JSON formatted responses to control bot behavior and send messages.

### Response Data Structure

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `senderID` | string | ❌ | Specify sender ID to reply messages or send messages to chatroom |
| `toBotState` | string | ❌ | Convert chatroom to specified bot state, specify current state to maintain current state |
| `data` | message | ❌ | Reply message content |

### Example Responses

**Basic response** (no action performed)

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
    "message": "Hello! I'm the bot assistant, how can I help you?",
    "messageType": "text"
  }
}
```

------

## Use Cases

### Bot Development
- **Auto-reply**: Automatically reply with appropriate messages based on received message content
- **State management**: Implement finite state machines to manage conversation flows
- **Command processing**: Parse user commands and execute corresponding actions

### Notification System
- **Custom push notifications**: Send customized push notifications based on specific events
- **Real-time monitoring**: Monitor chatroom activities and trigger appropriate processing
- **Event logging**: Record important events for analysis or auditing

### System Integration
- **Third-party services**: Integrate chat events with other systems or services
- **Data synchronization**: Synchronize chat data to external databases or systems
- **Workflow**: Trigger automated workflows and business logic

### Content Management
- **Message filtering**: Automatically detect and handle inappropriate content
- **Content analysis**: Analyze message content for sentiment analysis or keyword extraction
- **Intelligent assistant**: Provide intelligent Q&A or customer service functions

------

## Important Notes

- **HTTP POST**: All Webhook requests use HTTP POST method
- **JSON format**: Both requests and responses use JSON format
- **Real-time**: Webhooks are triggered immediately when events occur
- **Reliability**: Recommend implementing retry mechanisms and error handling
- **Security**: Recommend verifying request sources and implementing appropriate security measures
- **Performance considerations**: Webhook endpoints should respond quickly to avoid timeouts
- **State management**: Bot states can be used to implement complex conversation logic
- **Response format**: Incorrect response formats may cause bot functionality issues