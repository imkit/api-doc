# API Key

## Overview

The API Key (`IM-API-KEY`) is an authentication key used for backend services in the IMKIT Platform API. It represents performing operations "as a platform administrator." It has full management permissions, enabling operations such as user management, chat room management, token management, and more. It can call all APIs (including Client Key-level APIs) and must be securely stored on the server side.

------

## API Key Characteristics

### Basic Information

| Property         | Description                                     |
| ------------ | ---------------------------------------- |
| **Purpose**     | Perform operations as a platform administrator                 |
| **Pairing**     | Used independently; does not require a user Token             |
| **Format**     | Base64-encoded string                          |
| **Validity**   | Long-lived (unless manually revoked)                 |
| **Scope**   | Full management permissions; can call all APIs             |
| **Security Level** | Confidential (must never be exposed on the frontend)                 |

### Differences from Client Key

| Item         | API Key (`IM-API-KEY`)   | Client Key (`IM-CLIENT-KEY`)          |
| ------------ | ------------------------ | ------------------------------------- |
| **Pairing**     | Used independently                 | Requires user Token (`IM-Authorization`) |
| **Identity**     | Operates as platform administrator     | Operates as a specific user                    |
| **Used By**   | Backend only                   | SDK frontend / Backend                       |
| **Permission Scope** | Full management permissions             | Limited by user permissions                        |
| **Security**   | Must be kept confidential                 | Publicly visible                              |

------

## Obtaining the API Key

### Via IMKIT Dashboard

1. Log in to the [IMKIT Dashboard](https://dashboard.imkit.io/)
2. Select your application
3. Navigate to the "API Settings" page
4. Copy the API Key (displayed only once)

### Example API Key

```
MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

------

## Usage

### HTTP Header Authentication

```http
POST /admin/clients
IM-API-KEY: MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
Content-Type: application/json

{
  "_id": "user001",
  "nickname": "Alice",
  "issueAccessToken": true
}
```

### Code Examples

**Node.js**

```javascript
const axios = require('axios');

const apiKey = process.env.IMKIT_API_KEY;
const baseURL = 'https://your-app.imkit.io';

const headers = {
  'IM-API-KEY': apiKey,
  'Content-Type': 'application/json'
};

// Create a user
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/admin/clients`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error.response.data);
  }
};
```

**Python**

```python
import requests
import os

api_key = os.getenv('IMKIT_API_KEY')
base_url = 'https://your-app.imkit.io'

headers = {
    'IM-API-KEY': api_key,
    'Content-Type': 'application/json'
}

def create_user(user_data):
    try:
        response = requests.post(f'{base_url}/admin/clients', 
                               json=user_data, 
                               headers=headers)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Failed to create user: {e}')
```

**PHP**

```php
<?php
$apiKey = $_ENV['IMKIT_API_KEY'];
$baseUrl = 'https://your-app.imkit.io';

$headers = [
    'IM-API-KEY: ' . $apiKey,
    'Content-Type: application/json'
];

function createUser($userData) {
    global $baseUrl, $headers;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/clients');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
?>
```

------

## API Key Permissions

### Allowed Operations

- ✅ **User Management**
  - Create, update, and delete users
  - Query user information
  - Manage user permissions
- ✅ **Token Management**
  - Issue Token
  - Update Token
  - Revoke Token
- ✅ **Chat Room Management**
  - Create and delete chat rooms
  - Manage chat room members
  - Configure chat room permissions
- ✅ **Message Management**
  - Send system messages
  - Delete messages
  - Query message history
- ✅ **Application Settings**
  - Modify application configuration
  - Manage Webhook settings
  - View usage statistics

### High-Risk Operations

- ⚠️ **Full Control**: Can access and modify all application data
- ⚠️ **User Data**: Can access all users' private information
- ⚠️ **Chat History**: Can read message content from all chat rooms
- ⚠️ **System Settings**: Can modify the application's core settings

------

## Security Considerations

### Why Must the API Key Be Kept Confidential?

1. **Full Permissions**: Has complete control over the application
2. **Data Access**: Can access all user and chat data
3. **Irreversible Operations**: Can perform irreversible operations such as deletion
4. **No User Verification**: Does not require additional user identity verification

### Security Best Practices

#### Storage Security

- **Environment Variables**: Store the API Key in environment variables
- **Configuration Files**: Use encrypted configuration files for management
- **Secret Management Services**: Use AWS Secrets Manager, Azure Key Vault, etc.
- **Version Control Exclusion**: Never commit the API Key to version control systems

#### Access Control

- **Principle of Least Privilege**: Only use the API Key in services that require it
- **Network Restrictions**: Restrict the source IP range for the API Key
- **Regular Rotation**: Rotate the API Key periodically
- **Usage Monitoring**: Monitor API Key usage and detect anomalous activity

#### Application Security

```javascript
// ✅ Correct: Use on the server side
const apiKey = process.env.IMKIT_API_KEY; // Read from environment variable

// ❌ Wrong: Never expose on the frontend
// const apiKey = 'MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=';
```

------

## Environment Configuration Examples

### Docker

```dockerfile
ENV IMKIT_API_KEY=MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

### .env File

```env
IMKIT_API_KEY=MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
IMKIT_BASE_URL=https://your-app.imkit.io
```

### Kubernetes Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: imkit-secrets
type: Opaque
data:
  api-key: TWpKWmNGbElSR0ZSYkVsUmJFUlRkbFpNUTB4TWJ6Sk5VSEZHWmxadE9XcFpjSGgzTW5aMVFuSnRhejA9
```

------

## FAQ

### Q: What are the risks if the API Key is leaked?

**A:** Extremely high risk! An attacker could:

- Gain full control of your IMKIT application
- Access all user data and chat history
- Delete or modify critical data
- Incur additional costs

**If a leak is discovered, immediately:**

1. Revoke the old API Key in the Dashboard
2. Generate a new API Key
3. Update all services using the API Key
4. Check for any anomalous operation logs

### Q: Can I use the API Key in frontend JavaScript?

**A:** Absolutely not! Frontend code is exposed to all users. Use the Client Key for frontend integration.

### Q: How can I restrict the access scope of the API Key?

**A:** Currently, the API Key has full permissions. It is recommended to control access through:

- Restricting source IPs at the network level
- Implementing permission controls at the application level
- Using a proxy service to restrict callable APIs

### Q: Is there a rate limit on API Key usage?

**A:** Yes, the API Key has rate limiting protection:

- Maximum of 1000 requests per minute
- Exceeding the limit will result in a 429 error
- It is recommended to implement appropriate retry mechanisms

------

## Error Handling

### Common Errors

**Invalid API Key**

```json
{
  "error": "INVALID_API_KEY",
  "message": "The provided API key is invalid or expired"
}
```

**Missing API Key**

```json
{
  "error": "MISSING_API_KEY",
  "message": "IM-API-KEY header is required"
}
```

**Rate Limit Exceeded**

```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests, please try again later",
  "retryAfter": 60
}
```

**Insufficient Permissions**

```json
{
  "error": "INSUFFICIENT_PERMISSIONS",
  "message": "API key does not have permission for this operation"
}
```
