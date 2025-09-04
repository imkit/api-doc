# Webhook

## 概述

Webhook 功能允许您注册特定的 URL 端点来接收聊天室的实时消息和事件通知。当聊天室中发生特定事件（如新消息、成员加入、成员离开等）时，系统会自动向您注册的 Webhook URL 发送 POST 请求，包含相关的事件数据。此功能适用于建立机器人、自动化处理、推播通知系统等应用场景。

------

## API 端点

### 注册 Webhook

您可以为每个聊天室注册 Webhook URL 来接收该聊天室的消息和事件。

Webhook 设置请参考聊天室模型的 webhook 属性：
https://github.com/FUNTEKco/chat-server-document/wiki/Model#room

------

## Webhook 接收数据格式

当聊天室中发生事件时，系统会向您注册的 Webhook URL 发送 POST 请求，包含以下 JSON 格式的数据：

### 基本数据结构

| 参数       | 类型   | 说明                                                                          |
| ---------- | ------ | ----------------------------------------------------------------------------- |
| `appID`    | string | 应用程序识别码                                                                |
| `clientID` | string | 发送者 ID                                                                     |
| `roomID`   | string | 事件发生的聊天室 ID                                                           |
| `event`    | string | 事件类型                                                                      |
| `botState` | string | 聊天室当前的机器人状态（若您的机器人实现为有限状态机，可根据状态和消息决定反应） |
| `data`     | object | 发送到聊天室的消息或事件数据                                                  |

------

## 事件类型

### 加入聊天室事件

当用户加入聊天室时触发此事件。

**事件类型**：`JOIN_ROOM`

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

### 新增成员事件

当聊天室新增成员时触发此事件。

**事件类型**：`ADD_MEMBERS`

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

### 移除成员事件

当聊天室移除成员时触发此事件。

**事件类型**：`DELETE_MEMBERS`

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

### 消息事件

当聊天室收到新消息时触发此事件。

**事件类型**：`MESSAGE`

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

## Webhook 响应格式

您的 Webhook 服务可以返回 JSON 格式的响应来控制机器人行为和发送消息。

### 响应数据结构

| 参数         | 类型    | 必填 | 说明                                                           |
| ------------ | ------- | ---- | -------------------------------------------------------------- |
| `senderID`   | string  | ❌    | 指定发送者 ID 来回复消息或发送消息到聊天室                     |
| `toBotState` | string  | ❌    | 将聊天室转换到指定的机器人状态，若要保持当前状态请指定当前状态 |
| `data`       | message | ❌    | 回复消息内容                                                   |

### 示例响应

**基本响应**（不执行任何动作）

```json
{
  "toBotState": null,
  "data": null
}
```

**机器人回复消息**

```json
{
  "senderID": "robot001",
  "toBotState": "active",
  "data": {
    "message": "您好！我是机器人助手，有什么可以帮助您的吗？",
    "messageType": "text"
  }
}
```

------

## 使用场景

### 机器人开发
- **自动回复**：根据收到的消息内容自动回复相应消息
- **状态管理**：实现有限状态机来管理对话流程
- **指令处理**：解析用户指令并执行相应动作

### 通知系统
- **自定义推播**：根据特定事件发送客制化推播通知
- **实时监控**：监控聊天室活动并触发相应处理
- **事件记录**：记录重要事件用于分析或稽核

### 系统集成
- **第三方服务**：将聊天事件集成到其他系统或服务
- **数据同步**：将聊天数据同步到外部数据库或系统
- **工作流程**：触发自动化工作流程和业务逻辑

### 内容管理
- **消息过滤**：自动检测和处理不当内容
- **内容分析**：分析消息内容进行情感分析或关键字提取
- **智能助手**：提供智能问答或客服功能

------

## 注意事项

- **HTTP POST**：所有 Webhook 请求都是 HTTP POST 方法
- **JSON 格式**：请求和响应都使用 JSON 格式
- **实时性**：Webhook 会在事件发生时立即触发
- **可靠性**：建议实现重试机制和错误处理
- **安全性**：建议验证请求来源和实现适当的安全措施
- **性能考量**：Webhook 端点应该快速响应避免超时
- **状态管理**：机器人状态可用于实现复杂的对话逻辑
- **响应格式**：不正确的响应格式可能导致机器人功能异常