# Client Key

## Overview

The Client Key (`IM-CLIENT-KEY`) is an authentication key used to identify applications in the IMKIT Platform API. It must be used together with a user Token (`IM-Authorization`), representing performing operations "as a specific user." It is primarily used for SDK initialization, establishing WebSocket connections, and performing user-level API operations.

------

## Client Key Characteristics

### Basic Information

| Property         | Description                                   |
| ------------ | -------------------------------------- |
| **Purpose**     | Identifies the application; used with a user Token to perform operations  |
| **Pairing**     | Requires `IM-Authorization` (user Token)|
| **Format**     | JWT Token format                         |
| **Validity**   | Long-lived (unless manually revoked)               |
| **Scope**   | Operation scope is limited by user permissions                 |
| **Security Level** | Public (can be exposed in frontend code)             |

### Differences from API Key

| Item         | Client Key (`IM-CLIENT-KEY`)          | API Key (`IM-API-KEY`)   |
| ------------ | ------------------------------------- | ------------------------ |
| **Pairing**     | Requires user Token (`IM-Authorization`) | Used independently                 |
| **Identity**     | Operates as a specific user                    | Operates as platform administrator     |
| **Used By**   | SDK frontend / Backend                       | Backend only                   |
| **Permission Scope** | Limited by user permissions                        | Full management permissions             |
| **Security**   | Publicly visible                              | Must be kept confidential                 |

------

## Obtaining the Client Key

### Via IMKIT Dashboard

1. Log in to the [IMKIT Dashboard](https://dashboard.imkit.io/)
2. Select your application
3. Navigate to the "Settings" page
4. Copy the Client Key

### Example Client Key

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiIySllwWWhEYVFsSVFsRFN2VkxDTExvMk1QekZmVm05allweHcydnVCcm1rPSIsImNyZWF0ZUF0IjoxNTkxOTcyNTc2NDE0LCJjbGllbnRJZCI6IjJiM2JkNWNjLTRhODYtNGE0MC1hMTU0LTE2NDA0MDE0ZGE4OCJ9.bdIWOcPfDrNuLRszgtrQDaQiow_X-WolzjDhtiLEED8
```

------

## Usage

### Web SDK Initialization

```javascript
const config = {
  domain: "https://your-app.imkit.io",
  clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  token: "user-access-token"
}

window.IMKitUI.init(config);
```

### iOS SDK Initialization

```swift
let config = IMKitConfig(
    domain: "https://your-app.imkit.io",
    clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token: "user-access-token"
)

IMKit.shared.initialize(config: config)
```

### Android SDK Initialization

```kotlin
val config = IMKitConfig(
    domain = "https://your-app.imkit.io",
    clientKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token = "user-access-token"
)

IMKit.initialize(config)
```

------

## Client Key Permissions

### Allowed Operations (requires user Token)

- ✅ Establish WebSocket connections
- ✅ Receive and send chat messages
- ✅ Join/leave chat rooms
- ✅ Manage chat room members
- ✅ Upload multimedia files
- ✅ Update user status
- ✅ Block/ban users
- ✅ Pin/recall messages

### Disallowed Operations (requires API Key)

- ❌ Create/delete users
- ❌ Manage user Tokens
- ❌ Modify application settings
- ❌ Access cross-chat room message history
- ❌ Batch send messages

------

## Security Considerations

### Why Can the Client Key Be Public?

1. **Limited Permissions**: Operation scope is restricted by user permissions
2. **Requires Token**: Must be paired with a valid user Token to perform operations
3. **No Admin Permissions**: Cannot perform user management, token management, or other administrative operations
4. **Application Isolation**: Can only connect to a specific application

### Best Practices

- **Version Control**: The Client Key can be included in version control
- **Environment Separation**: Use different Client Keys for different environments
- **Regular Rotation**: Although the risk is relatively low, periodic rotation is still recommended
- **Usage Monitoring**: Monitor Client Key usage patterns

------

## FAQ

### Q: What are the risks if the Client Key is leaked?

**A:** The risk is relatively low, as an attacker would still need a valid user token to perform actual operations. However, it is recommended to replace the Client Key immediately upon discovering a leak.

### Q: Can the Client Key be used in mobile applications?

**A:** Yes, the Client Key is designed to be safely embedded in mobile applications, including native iOS/Android apps.

### Q: Does the Client Key expire?

**A:** The Client Key does not expire by default, but you can manually revoke it and generate a new Client Key in the Dashboard.

### Q: Can an application have multiple Client Keys?

**A:** Currently, each application can only have one Client Key. If you need to replace it, revoke the old one first and then generate a new one.

------

## Error Handling

### Common Errors

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
