# 用户端金钥

## 概述

Client Key（`IM-CLIENT-KEY`）是 IMKIT Platform API 中用于识别应用程式的认证金钥，需搭配用户 Token（`IM-Authorization`）一起使用，代表「以特定用户的身分」执行操作。它主要用于 SDK 初始化、建立 WebSocket 连线，以及执行用户层级的 API 操作。

------

## Client Key 特性

### 基本资讯

| 属性         | 说明                                   |
| ------------ | -------------------------------------- |
| **用途**     | 识别应用程式，搭配用户 Token 执行操作  |
| **搭配**     | 需搭配 `IM-Authorization`（用户 Token）|
| **格式**     | JWT Token 格式                         |
| **有效期**   | 长期有效（除非主动撤销）               |
| **作用域**   | 操作范围受用户权限限制                 |
| **安全等级** | 公开（可暴露在前端代码中）             |

### 与 API Key 的差异

| 项目         | Client Key (`IM-CLIENT-KEY`)          | API Key (`IM-API-KEY`)   |
| ------------ | ------------------------------------- | ------------------------ |
| **搭配**     | 需搭配用户 Token (`IM-Authorization`) | 单独使用                 |
| **身分**     | 以特定用户身分操作                    | 以平台管理员身分操作     |
| **使用方**   | SDK 前端 / 后端                       | 仅后端                   |
| **权限范围** | 受用户权限限制                        | 完整管理权限             |
| **安全性**   | 公开可见                              | 必须保密                 |

------

## 取得 Client Key

### 透过 IMKIT Dashboard

1. 登入 [IMKIT Dashboard](https://dashboard.imkit.io/)
2. 选择您的应用程式
3. 进入「设定」页面
4. 复制 Client Key

### 范例 Client Key

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

### 允许的操作（需搭配用户 Token）

- ✅ 建立 WebSocket 连线
- ✅ 接收和发送聊天讯息
- ✅ 加入/离开聊天室
- ✅ 管理聊天室成员
- ✅ 上传多媒体档案
- ✅ 更新用户状态
- ✅ 封锁/禁止用户
- ✅ 钉选/撤回讯息

### 不允许的操作（需使用 API Key）

- ❌ 建立/删除用户
- ❌ 管理用户 Token
- ❌ 修改应用程式设定
- ❌ 存取跨聊天室讯息记录
- ❌ 批次发送讯息

------

## 安全性考量

### 为什么 Client Key 可以公开？

1. **有限权限**：操作范围受用户权限限制
2. **需搭配 Token**：必须配合有效的用户 Token 才能操作
3. **无管理权限**：无法执行用户管理、Token 管理等管理操作
4. **应用程式隔离**：只能连接到特定的应用程式

### 最佳实务

- **版本控制**：可以将 Client Key 加入版本控制
- **环境区分**：不同环境使用不同的 Client Key
- **定期轮换**：虽然风险较低，仍建议定期更换
- **监控使用**：监控 Client Key 的使用情况

------

## 常见问题

### Q: Client Key 泄露会有什么风险？

**A:** 风险相对较低，攻击者仍需要有效的 user token 才能进行实际操作。但建议发现泄露时立即更换新的 Client Key。

### Q: 可以在移动应用程式中使用 Client Key 吗？

**A:** 可以，Client Key 设计为可以安全地嵌入在移动应用程式中，包括原生 iOS/Android 应用。

### Q: Client Key 会过期吗？

**A:** Client Key 预设不会过期，但您可以在 Dashboard 中手动撤销并生成新的 Client Key。

### Q: 一个应用程式可以有多个 Client Key 吗？

**A:** 目前每个应用程式只能有一个 Client Key，如需更换请先撤销旧的再生成新的。

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
