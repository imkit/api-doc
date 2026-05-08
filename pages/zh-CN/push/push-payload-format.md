# 推播 Payload 格式

## 概述

说明 IMKIT 在送出 APNs(iOS)与 FCM(Android)推播时的 payload 结构,以及内建的本地化(localization)key 对照表。Native app 收到原始推播后,可依此文档解析 payload,做进一步的 UI 显示与点击跳转。

------

## APNs 推播格式

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

| 字段       | 类型   | 说明                                                                         |
| ---------- | ------ | ---------------------------------------------------------------------------- |
| `alert`    | mixed  | Alert 对象,可为字符串或包含 `loc-key`、`loc-args` 的对象                    |
| `loc-key`  | string | 本地化字符串的键值,格式为 `im_loc_${MessageType}`(完整清单见下方)         |
| `loc-args` | array  | 本地化字符串的参数数组。`$1` 为发送者 nickname,`$2` 为消息内容              |

> 参考:[Apple Local and Remote Notification Programming Guide](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html)

------

## FCM(GCM)推播格式

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
    payload: { /* 完整消息对象 */ }
  }
}
```

| 区块            | 字段           | 说明                                                |
| --------------- | -------------- | --------------------------------------------------- |
| `notification`  | `title`        | 通知标题                                            |
| `notification`  | `body`         | 通知内容                                            |
| `notification`  | `icon`         | 通知图标 URL 或资源名称                             |
| `notification`  | `body_loc_key` | 本地化字符串键值(格式同 APNs `loc-key`)           |
| `notification`  | `body_loc_args`| 本地化字符串参数                                    |
| `notification`  | `badge`        | 应用程序图标上的未读数                              |
| `notification`  | `click_action` | 点击推播后的 Intent action,默认为 `push_chatroom`  |
| `data`          | `loc-key`      | 同上,用于 data-only 推播解析                       |
| `data`          | `loc-args`     | 同上                                                |
| `data`          | `type`         | 推播类型(自定分类)                                |
| `data`          | `payload`      | 原始消息对象,可在 app 内部处理(例如导页)         |

------

## 本地化 key 清单

依 message type 对应到不同的本地化 key,native app 可在 string resource 中对应翻译。

| `loc-key`             | 对应消息类型 / 事件 | 示例(中文)             |
| --------------------- | ------------------- | ------------------------ |
| `im_loc_text`         | 文字消息            | `$1: $2`(`Alice: 你好`) |
| `im_loc_image`        | 图片消息            | `$1 发送了一张图片`      |
| `im_loc_video`        | 视频消息            | `$1 发送了一段视频`      |
| `im_loc_audio`        | 语音消息            | `$1 发送了一段语音`      |
| `im_loc_sticker`      | 贴图                | `$1 发送了一张贴图`      |
| `im_loc_location`     | 位置消息            | `$1 分享了位置`          |
| `im_loc_file`         | 文件消息            | `$1 发送了一个文件`      |
| `im_loc_joinRoom`     | 加入聊天室          | `$1 加入了聊天室`        |
| `im_loc_leaveRoom`    | 离开聊天室          | `$1 离开了聊天室`        |
| `im_loc_addMember`    | 新增单一成员        | `$1 邀请了 $2`           |
| `im_loc_addMembers`   | 新增多个成员        | `$1 邀请了多人`          |
| `im_loc_deleteMember` | 移除成员            | `$1 将 $2 移出聊天室`    |
| `im_loc_encrypted`    | 加密消息            | `您收到一则加密消息`     |

> 上表为常见 key,实际支持的 key 会随消息类型扩充。建议 app 端对未知的 `loc-key` 采取 fallback(例如显示 `body` 字段内容)。

------

## 参数对照

`loc-args` 的位置参数:

| 位置  | 内容           |
| ----- | -------------- |
| `$1`  | 发送者 nickname |
| `$2`  | 消息内容       |

例如 `loc-key: "im_loc_text"`、`loc-args: ["Alice", "Hello"]`,在 string resource 设置为 `"%1$@: %2$@"`(iOS)或 `"%1$s: %2$s"`(Android),最终会显示 `Alice: Hello`。

------

## 使用场景

### 多语系 app
- **本地化显示**:不直接显示服务器送来的 body 字符串,而是依 `loc-key` 从 app 内的翻译档取对应字符串,自动套用使用者语系
- **新消息类型扩充**:后端新增消息类型时,app 只要在 string resource 加对应 key,不必改后端推播文案

### 客制化推播文案
- **自定提醒语**:使用者可在 app 内客制化「对方传了 $1$2」之类的提示,只要保持 `loc-args` 顺序即可

------

## 注意事项

- **APNs 与 FCM 命名差异**:APNs 用 `loc-key` / `loc-args`,FCM 在 `notification` 区块改用 `body_loc_key` / `body_loc_args`,但 `data` 区块仍维持 `loc-key` / `loc-args`,解析时要分清楚
- **未知 key fallback**:遇到 string resource 中没有的 `loc-key`,建议显示 FCM 的 `body` 或 APNs 的纯文字 alert 作为备援
- **推播折叠**:Android 的 `collapseKey` 用于同类型消息合并显示;iOS 对应 `apns-collapse-id`(由 IMKIT 平台侧设置)
- **VoIP 推播**:语音/视频来电应使用 [`type: "ios-voip"`](/zh-CN/push/device-subscription/subscribe-device) 注册的 token,payload 会直接走 PushKit,不经过此格式
- **静音推播**:在 `notification` 区块不带 `title` / `body`、仅有 `data` 的推播为静音推播,可用于后台同步未读数
- **与 `/push/push2clients` 的关系**:[自定推播 API](/zh-CN/push/push-to-clients) 同样会以此格式送出,因此 native app 端的解析逻辑可一份共用
