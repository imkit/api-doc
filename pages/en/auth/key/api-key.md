# API Key

## Overview

API Key is an authentication key used for backend service calls to management APIs in the IMKIT Platform API. It possesses complete management permissions, capable of executing all backend operations such as user management, chat room management, Token management, and must be securely stored on the server side.

------

## API Key Features

### Basic Information

| Property | Description |
| ------------ | ------------------------ |
| **Purpose** | Backend management API authentication |
| **Format** | Base64 encoded string |
| **Validity** | Long-term valid (unless actively revoked) |
| **Scope** | Complete application management permissions |
| **Security Level** | Confidential (must never be exposed in frontend) |

### Differences from Client Key

| Item | API Key | Client Key |
| ------------ | -------------- | --------------- |
| **Use Case** | Backend API calls | Frontend SDK initialization |
| **Security** | Private storage | Publicly visible |
| **Permission Scope** | Complete management permissions | Connection and basic operations |
| **Exposure Risk** | Extremely high risk | Low risk |
| **Storage Location** | Server environment variables | Frontend code |

------

## Obtaining API Key

### Through IMKIT Dashboard

1. Log in to [IMKIT Dashboard](https://dashboard.imkit.io/)
2. Select your application
3. Enter the "API Settings" page
4. Copy the API Key (displayed only once)

### Sample API Key

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

// Create user
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
  - Create, update, delete users
  - Query user information
  - Manage user permissions
- ✅ **Token Management**
  - Issue Token
  - Update Token
  - Revoke Token
- ✅ **Chat Room Management**
  - Create, delete chat rooms
  - Manage chat room members
  - Set chat room permissions
- ✅ **Message Management**
  - Send system messages
  - Delete messages
  - Query message records
- ✅ **Application Settings**
  - Modify application configuration
  - Manage Webhook settings
  - View usage statistics

### High-Risk Operations

- ⚠️ **Complete Control**: Can access and modify all application data
- ⚠️ **User Data**: Can access all users' private information
- ⚠️ **Chat Records**: Can read message content from all chat rooms
- ⚠️ **System Settings**: Can modify core application settings

------

## Security Considerations

### Why Must API Key Be Kept Secret?

1. **Complete Permissions**: Possesses full control over the application
2. **Data Access**: Can access all user and chat data
3. **Irreversible Operations**: Can execute irreversible operations like deletion
4. **No User Authentication**: Does not require additional user identity verification

### Security Best Practices

#### Storage Security

- **Environment Variables**: Store API Key in environment variables
- **Configuration Files**: Use encrypted configuration file management
- **Key Management Services**: Use AWS Secrets Manager, Azure Key Vault, etc.
- **Version Control Exclusion**: Never commit API Key to version control systems

#### Access Control

- **Principle of Least Privilege**: Use API Key only in necessary services
- **Network Restrictions**: Limit API Key source IP ranges
- **Regular Rotation**: Regularly rotate API Key
- **Usage Monitoring**: Monitor API Key usage and abnormal activities

#### Application Security

```javascript
// ✅ Correct: Use on server side
const apiKey = process.env.IMKIT_API_KEY; // Read from environment variables

// ❌ Wrong: Never expose in frontend
// const apiKey = 'MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=';
```

------

## Environment Setup Examples

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

## Frequently Asked Questions

### Q: What are the risks if API Key is leaked?

**A:** Extremely high risk! Attackers can:

- Completely control your IMKIT application
- Access all user data and chat records
- Delete or modify important data
- Generate additional costs

**If a leak is discovered, immediately:**

1. Revoke the old API Key in Dashboard
2. Generate a new API Key
3. Update all services using that API Key
4. Check for any abnormal operation records

### Q: Can API Key be used in frontend JavaScript?

**A:** Absolutely not! Frontend code is exposed to all users, use Client Key for frontend integration.

### Q: How to limit API Key access scope?

**A:** Currently API Key has complete permissions, recommend controlling through:

- Network level restrictions on source IPs
- Application level implementation of permission control
- Using proxy services to limit callable APIs

### Q: Does API Key have usage frequency limits?

**A:** Yes, API Key has rate limiting protection:

- Maximum 1000 requests per minute
- Exceeding the limit will receive 429 error
- Recommend implementing appropriate retry mechanisms

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