# Web URL 参数

## 概述

IMKIT 提供的 Web URL 支持通过 query parameter 控制初始化行为,包含登入 token、预设聊天室、深色模式等。本页列出所有支持的参数、各自的 URL 摆放位置,以及常见的使用场景。

------

## 参数列表

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ------ | ---- |
| `token` | ✅(初次嵌入) | string | localStorage 内既存 token | JWT 认证 token。读取后会自动写入 `localStorage` 并从网址列移除 |
| `autoSelectRoom` | ❌ | `"0"` | (启用) | 是否在加载时自动选第一个聊天室;设为 `0` 停用 |
| `roomId` | ❌ | string | (无) | 指定要进入的聊天室 ID。设置后会隐藏 RoomList,适合单一聊天室嵌入 |
| `roomTag` | ❌ | string | (无) | 聊天室 tag 过滤,只显示带有指定 tag 的聊天室 |
| `darkMode` | ❌ | `"true"` / `"1"` / `"false"` / `"0"` | 跟随系统 | 切换深色 / 浅色主题 |

------

## URL 格式

IMKIT 前端使用 hash routing,**参数位置会影响读取机制**,请依下表选择正确摆放位置。

### 格式 A:hash(`#`)之前

适用参数:`token`(首次加载)、`autoSelectRoom`、`roomId`、`roomTag`

```
https://your-app.imkit.io/?token=用户的_TOKEN&roomId=ROOM_ID&autoSelectRoom=0#/
```

### 格式 B:hash 路由之后

适用参数:`token`(动态切换)、`darkMode`

```
https://your-app.imkit.io/#/?darkMode=1&token=用户的_TOKEN
```

> `token` 两个位置都支持:**首次加载**请放在格式 A(读取后会自动存入 localStorage 并从 URL 移除,避免被截图或分享时泄漏);**运行中动态切换 token** 请放在格式 B(会触发 socket 重连、清空原本的 store)。

------

## 使用场景

### 1. 嵌入指定聊天室(隐藏聊天室列表)

```
https://your-app.imkit.io/?token=用户的_TOKEN&roomId=6073a1b2c3d4e5f6a7b8c9d0#/
```

适合在第三方系统中只想显示特定聊天室的情境,例如客服系统嵌入单一对话窗。

### 2. 强制深色模式

```
https://your-app.imkit.io/#/?darkMode=1
```

适合嵌入在暗色背景的 app 或页面中,避免主题不一致。

### 3. 不自动选房 + 显示完整聊天室列表

```
https://your-app.imkit.io/?token=用户的_TOKEN&autoSelectRoom=0#/
```

适合手机 web 上希望用户自行选择要进入哪个聊天室的情境。

### 4. 依 tag 过滤聊天室

```
https://your-app.imkit.io/?token=用户的_TOKEN&roomTag=customer-support#/
```

只显示带有 `customer-support` tag 的聊天室,适合多场景共用同一个 IMKIT app 时做分流。

------

## 注意事项

- **`token` 安全性**:格式 A 的 `token` 会在 SDK 读取后自动从浏览器网址列移除并写入 `localStorage`,降低被截图或分享时泄漏的风险。
- **`darkMode` 字面值**:目前只接受 `"true"` / `"1"` / `"false"` / `"0"`,写成 `"dark"` 或 `"light"` 不会生效。
- **`roomId` 与 RoomList**:带入 `roomId` 时 RoomList 会被隐藏,适合单一聊天室嵌入。若要保留聊天室列表并只是预选某聊天室,请改在嵌入后透过 SDK API 切换。
- **`autoSelectRoom` 默认值**:不带此参数时默认启用(加载后自动选第一个聊天室)。只有 `"0"` 才会停用。

------

## 下一步

- [基本串接](/zh-CN/basic_integration) — 完整的后端串接流程,从建立用户、建立聊天室到嵌入 Web URL
- [权限验证](/zh-CN/auth) — 了解 API Key 与 Client Key 的取得与使用
