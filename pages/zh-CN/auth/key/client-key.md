# 客户端密钥

## 概述

Client Key 是 IMKIT Platform API 中用于前端应用程序连接 Chat Server 的认证密钥。它主要用于 SDK 初始化和建立 WebSocket 连接，与后端 API 使用的 API Key 不同。

------

## Client Key 特性

### 基本信息

| 属性         | 说明                       |
| ------------ | -------------------------- |
| **用途**     | 前端 SDK 连接 Chat Server  |
| **格式**     | JWT Token 格式             |
| **有效期**   | 长期有效（除非主动撤销）   |
| **作用域**   | 特定应用程序范围           |
| **安全等级** | 公开（可暴露在前端代码中） |

### 与 API Key 的差异

| 项目         | Client Key      | API Key       |
| ------------ | --------------- | ------------- |
| **使用场景** | 前端 SDK 初始化 | 后端 API 调用 |
| **安全性**   | 公开可见        | 私密保存      |
| **权限范围** | 连接和基本操作  | 完整管理权限  |
| **暴露风险** | 低风险          | 高风险        |

------

## 获取 Client Key

### 通过 IMKIT Dashboard

1. 登录 [IMKIT Dashboard](https://dashboard.imkit.io/)
2. 选择您的应用程序
3. 进入「设置」页面
4. 复制 Client Key

### 示例 Client Key

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiIySllwWWhEYVFsSVFsRFN2VkxDTExvMk1QekZmVm05allweHcydnVCcm1rPSIsImNyZWF0ZUF0IjoxNTkxOTcyNTc2NDE0LCJjbGllbnRJZCI6IjJiM2JkNWNjLTRhODYtNGE0MC1hMTU0LTE2NDA0MDE0ZGE4OCJ9.bdIWOcPfDrNuLRszgtrQDaQiow_X-WolzjDhtiLEED8
```

------

## 使用方式

### Web SDK 初始化

```javascript
const config = {
  domain: "https://your-app.imkit.io",
  clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  token: "user-access-token"
}

window.IMKitUI.init(config);
```

### iOS SDK 初始化

```swift
let config = IMKitConfig(
    domain: "https://your-app.imkit.io",
    clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token: "user-access-token"
)

IMKit.shared.initialize(config: config)
```

### Android SDK 初始化

```kotlin
val config = IMKitConfig(
    domain = "https://your-app.imkit.io",
    clientKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token = "user-access-token"
)

IMKit.initialize(config)
```

------

## Client Key 权限

### 允许的操作

- ✅ 建立 WebSocket 连接
- ✅ 接收实时消息
- ✅ 发送聊天消息
- ✅ 加入/离开聊天室
- ✅ 上传多媒体文件
- ✅ 更新用户状态

### 不允许的操作

- ❌ 创建/删除用户
- ❌ 管理聊天室权限
- ❌ 访问管理 API
- ❌ 修改应用程序设置
- ❌ 撤销其他用户 token

------

## 安全性考量

### 为什么 Client Key 可以公开？

1. **有限权限**：Client Key 仅能进行前端连接操作
2. **用户范围**：需要配合有效的 user token 才能操作
3. **无管理权限**：无法访问敏感的管理功能
4. **应用程序隔离**：只能连接到特定的应用程序

### 最佳实践

- **版本控制**：可以将 Client Key 加入版本控制
- **环境区分**：不同环境使用不同的 Client Key
- **定期轮换**：虽然风险较低，仍建议定期更换
- **监控使用**：监控 Client Key 的使用情况

------

## 常见问题

### Q: Client Key 泄露会有什么风险？

**A:** 风险相对较低，攻击者仍需要有效的 user token 才能进行实际操作。但建议发现泄露时立即更换新的 Client Key。

### Q: 可以在移动应用程序中使用 Client Key 吗？

**A:** 可以，Client Key 设计为可以安全地嵌入在移动应用程序中，包括原生 iOS/Android 应用。

### Q: Client Key 会过期吗？

**A:** Client Key 预设不会过期，但您可以在 Dashboard 中手动撤销并生成新的 Client Key。

### Q: 一个应用程序可以有多个 Client Key 吗？

**A:** 目前每个应用程序只能有一个 Client Key，如需更换请先撤销旧的再生成新的。

------

## 错误处理

### 常见错误

**Invalid Client Key**

```json
{
  "error": "INVALID_CLIENT_KEY",
  "message": "The provided client key is invalid or expired"
}
```

**Client Key Mismatch**

```json
{
  "error": "CLIENT_KEY_MISMATCH", 
  "message": "Client key does not match the specified domain"
}
```

**Missing Client Key**

```json
{
  "error": "MISSING_CLIENT_KEY",
  "message": "Client key is required for SDK initialization"
}
```