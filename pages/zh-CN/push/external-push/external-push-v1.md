# 外部推播服务 v1(Legacy)

## 概述

当您希望以自家 APNs / FCM 服务发送推播(而非使用 IMKIT 内建推播管线)时,可在平台后台设置 `PUSH` 环境变量指向您自家的 HTTPS 端点。每当聊天室产生新消息且需要推播时,IMKIT 会以 HTTP POST 将「压平后的消息对象」发送到您的端点,由您自行转发到 APNs / FCM。

> **此为 legacy v1 接口**。新建案请优先使用 [外部推播服务 v2(Generic)](/zh-CN/push/external-push/external-push-v2),v2 提供更完整的消息字段与多收件人 broadcast 模型。

------

## 设置方式

于 IMKIT 平台后台设置环境变量:

```
PUSH=https://your-server.example.com/imkit/push
```

设置后,凡是有需要推播的消息事件,IMKIT 都会以 `POST` 调用此 URL。

------

## 请求格式

### Method

`POST`

### Headers

| 参数           | 类型   | 必填 | 说明                              |
| -------------- | ------ | ---- | --------------------------------- |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

### Request Body

每次只针对一位收件者发送一个请求。

| 字段       | 类型   | 说明                                                                |
| ---------- | ------ | ------------------------------------------------------------------- |
| 消息字段   | mixed  | 压平后的消息对象(沿用 [Message Model](/zh-CN/realtime/socket-events#chat-message))   |
| `alert`    | string | 已组装好的 APNs / FCM Alert 文字,可直接送往推播服务商              |
| `toClient` | string | 收件者 Client ID                                                    |
| `badge`    | number | 该收件者目前的总未读消息数,可直接带入 APNs `badge` 或 FCM `badge`  |

------

## 示例请求

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

## 响应

您的服务应回传 `200 OK`(内容不限),IMKIT 不会根据响应内容做后续动作。

------

## 使用场景

### 既有推播服务整合
- **沿用自家推播**:若客户已有现成的 APNs / FCM 推播服务,可直接接 IMKIT 的消息事件而不需改动原有流程

### 客制化文案
- **自定 alert 内容**:在自家服务内依 `messageType`、`sender`、`message` 重组推播文案,完全不受 IMKIT 内建格式限制

### 多通道推播
- **同时推 APNs/FCM/Email/SMS**:在自家服务做消息分流,将同一笔事件同时推到不同通道

------

## 注意事项

- **Legacy 接口**:此 v1 接口为单收件者模型,每位收件者发一次请求;若收件者众多,请求量会放大,建议使用 [v2(Generic)](/zh-CN/push/external-push/external-push-v2) 的多收件者 broadcast 模型
- **消息字段差异**:v1 不包含 `roomName` 等部分字段,若需完整聊天室信息,请改用 v2
- **Webhook 并存**:此推播 callback 与 [聊天室 Webhook](/zh-CN/webhook/webhook) 是不同的机制,前者用于推播分发,后者用于机器人 / 事件监听
- **HTTPS 必要**:基于安全考量,`PUSH` URL 必须使用 HTTPS 并设置来源验证(IP 白名单或共享密钥)
- **Payload 格式参考**:组装 APNs / FCM 内容时,可参考 [推播 Payload 格式](/zh-CN/push/push-payload-format)
