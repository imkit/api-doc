# Client Key

## Overview

Client Key is an authentication key used for frontend applications to connect to Chat Server in the IMKIT Platform API. It is primarily used for SDK initialization and establishing WebSocket connections, different from the API Key used for backend APIs.

------

## Client Key Features

### Basic Information

| Property | Description |
| ------------ | -------------------------- |
| **Purpose** | Frontend SDK connection to Chat Server |
| **Format** | JWT Token format |
| **Validity** | Long-term valid (unless actively revoked) |
| **Scope** | Specific application scope |
| **Security Level** | Public (can be exposed in frontend code) |

### Differences from API Key

| Item | Client Key | API Key |
| ------------ | --------------- | ------------- |
| **Use Case** | Frontend SDK initialization | Backend API calls |
| **Security** | Publicly visible | Private storage |
| **Permission Scope** | Connection and basic operations | Complete management permissions |
| **Exposure Risk** | Low risk | High risk |

------

## Obtaining Client Key

### Through IMKIT Dashboard

1. Log in to [IMKIT Dashboard](https://dashboard.imkit.io/)
2. Select your application
3. Enter the "Settings" page
4. Copy the Client Key

### Sample Client Key

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

### Allowed Operations

- ✅ Establish WebSocket connection
- ✅ Receive real-time messages
- ✅ Send chat messages
- ✅ Join/leave chat rooms
- ✅ Upload multimedia files
- ✅ Update user status

### Disallowed Operations

- ❌ Create/delete users
- ❌ Manage chat room permissions
- ❌ Access management APIs
- ❌ Modify application settings
- ❌ Revoke other users' tokens

------

## Security Considerations

### Why Can Client Key Be Public?

1. **Limited Permissions**: Client Key can only perform frontend connection operations
2. **User Scope**: Requires a valid user token to operate
3. **No Management Permissions**: Cannot access sensitive management functions
4. **Application Isolation**: Can only connect to specific applications

### Best Practices

- **Version Control**: Client Key can be included in version control
- **Environment Separation**: Use different Client Keys for different environments
- **Regular Rotation**: Although risk is lower, still recommend periodic replacement
- **Usage Monitoring**: Monitor Client Key usage

------

## Frequently Asked Questions

### Q: What are the risks if Client Key is leaked?

**A:** Risk is relatively low, attackers still need a valid user token to perform actual operations. However, it's recommended to immediately replace with a new Client Key when a leak is discovered.

### Q: Can Client Key be used in mobile applications?

**A:** Yes, Client Key is designed to be safely embedded in mobile applications, including native iOS/Android apps.

### Q: Will Client Key expire?

**A:** Client Key does not expire by default, but you can manually revoke and generate a new Client Key in the Dashboard.

### Q: Can an application have multiple Client Keys?

**A:** Currently, each application can only have one Client Key. To replace, first revoke the old one then generate a new one.

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