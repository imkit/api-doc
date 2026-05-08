# 外部推播服务 v2(Generic)

## 概述

`PUSH_GENERIC` 是 v1 之后的通用版外部推播 callback。相较 v1 采「每位收件者一次请求」,v2 采 **broadcast 模型**:同一封消息以一个请求带上 `pushToClients` 收件者数组,由您的服务自行对每位收件者组装 payload 并计算 badge。对于群组消息,大幅减少对外请求数量。

> **重要**:Generic Push Service 必须由您自行处理收件者(聊天室成员)的 badge 计数,IMKIT 不会在这个 callback 提供每位收件者的 badge 数值。

------

## 设置方式

于 IMKIT 平台后台设置环境变量:

```
PUSH_GENERIC=https://your-server.example.com/imkit/push/v2
```

设置后,凡是有推播需求的消息事件,IMKIT 会将同一笔消息以一个请求发送至此端点,并列出所有需推播的 Client ID。

------

## 请求格式

### Method

`POST`

### Headers

| 参数           | 类型   | 必填 | 说明                              |
| -------------- | ------ | ---- | --------------------------------- |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

### Request Body

| 字段            | 类型     | 说明                                                                                  |
| --------------- | -------- | ------------------------------------------------------------------------------------- |
| 消息字段        | mixed    | 压平后的消息对象(沿用 [Message Model](/zh-CN/realtime/socket-events#chat-message))                                |
| `roomName`      | string   | 聊天室名称(自定显示名,可用于推播标题)                                              |
| `pushToClients` | string[] | 该消息需推播的收件者 Client ID 数组                                                   |

------

## 示例请求

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

## 您的服务应做的事

收到此请求后,Generic Push Service 应:

1. **计算 badge**:对 `pushToClients` 数组中每位 Client,从您自家数据源计算其总未读数(IMKIT 不在此 callback 提供 badge)
2. **取设备 token**:依 Client ID 查出该用户的 APNs / FCM token(可由您自行存储,或透过 IMKIT 的 [`/me/subscribe`](/zh-CN/push/device-subscription/subscribe-device) 注册数据同步)
3. **组 payload**:依 [推播 Payload 格式](/zh-CN/push/push-payload-format) 组装,可使用 IMKIT 的 `im_loc_*` 本地化 key
4. **发送到 APNs / FCM**:调用推播服务商 API 完成推送

------

## 响应

您的服务应回传 `200 OK`(内容不限),IMKIT 不会根据响应内容做后续动作。

------

## 使用场景

### 群组推播优化
- **单次请求 + 多收件者**:50 人群组产生新消息时,IMKIT 只发 1 次 callback,由您的服务一次处理 50 位 token,降低网络成本

### 进阶推播策略
- **依用户偏好分流**:某些用户设置 mute 该聊天室、某些用户在线中,可在您的服务内自行决定是否推播
- **A/B testing**:对不同用户群推送不同文案 / 标题

### 集中式 badge 计数
- **跨业务 badge**:若您的 app 除了聊天还有其他通知(订单、活动等),可在自家服务统一计算总 badge

------

## 注意事项

- **Badge 自管**:这是 v2 与 v1 最大差别 — IMKIT 不再帮您算 badge,请务必自行实现
- **消息字段完整**:v2 提供 `roomName` 等较完整信息,推播文案可显示「<聊天室名称> · <发送者>:<内容>」
- **与 v1 互斥**:同时设置 `PUSH` 与 `PUSH_GENERIC` 时,行为以 IMKIT 平台侧设置为准,建议只择一启用
- **HTTPS 必要**:`PUSH_GENERIC` URL 必须使用 HTTPS 并设置来源验证
- **失败处理**:您的服务若因暂时性错误无法处理,应自行排程重试;IMKIT 不会自动重发
- **Payload 格式参考**:详细字段与本地化 key 请见 [推播 Payload 格式](/zh-CN/push/push-payload-format)
