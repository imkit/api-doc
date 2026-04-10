# API 金钥

## 概述

API Key（`IM-API-KEY`）是 IMKIT Platform API 中用于后端服务的认证金钥，代表「以平台管理员的身分」执行操作。它拥有完整的管理权限，能够执行用户管理、聊天室管理、Token 管理等所有操作，且可呼叫所有 API（包含 Client Key 层级的 API），必须妥善保管在伺服器端。

------

## API Key 特性

### 基本资讯

| 属性         | 说明                                     |
| ------------ | ---------------------------------------- |
| **用途**     | 以平台管理员身分执行操作                 |
| **搭配**     | 单独使用，不需搭配用户 Token             |
| **格式**     | Base64 编码字串                          |
| **有效期**   | 长期有效（除非主动撤销）                 |
| **作用域**   | 完整管理权限，可呼叫所有 API             |
| **安全等级** | 机密（绝不可暴露在前端）                 |

### 与 Client Key 的差异

| 项目         | API Key (`IM-API-KEY`)   | Client Key (`IM-CLIENT-KEY`)          |
| ------------ | ------------------------ | ------------------------------------- |
| **搭配**     | 单独使用                 | 需搭配用户 Token (`IM-Authorization`) |
| **身分**     | 以平台管理员身分操作     | 以特定用户身分操作                    |
| **使用方**   | 仅后端                   | SDK 前端 / 后端                       |
| **权限范围** | 完整管理权限             | 受用户权限限制                        |
| **安全性**   | 必须保密                 | 公开可见                              |

------

## 取得 API Key

### 透过 IMKIT Dashboard

1. 登入 [IMKIT Dashboard](https://dashboard.imkit.io/)
2. 选择您的应用程式
3. 进入「API 设定」页面
4. 复制 API Key（仅显示一次）

### 范例 API Key

```
MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

------

## 使用方式

### HTTP Header 认证

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

### 程式码范例

**Node.js**

```javascript
const axios = require('axios');

const apiKey = process.env.IMKIT_API_KEY;
const baseURL = 'https://your-app.imkit.io';

const headers = {
  'IM-API-KEY': apiKey,
  'Content-Type': 'application/json'
};

// 建立用户
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

## API Key 权限

### 允许的操作

- ✅ **用户管理**
  - 建立、更新、删除用户
  - 查询用户资讯
  - 管理用户权限
- ✅ **Token 管理**
  - Issue Token
  - 更新 Token
  - 撤销 Token
- ✅ **聊天室管理**
  - 建立、删除聊天室
  - 管理聊天室成员
  - 设定聊天室权限
- ✅ **讯息管理**
  - 发送系统讯息
  - 删除讯息
  - 查询讯息记录
- ✅ **应用程式设定**
  - 修改应用程式配置
  - 管理 Webhook 设定
  - 查看使用统计

### 高风险操作

- ⚠️ **完全控制权**：可以存取和修改所有应用程式资料
- ⚠️ **用户资料**：可以存取所有用户的私人资讯
- ⚠️ **聊天记录**：可以读取所有聊天室的讯息内容
- ⚠️ **系统设定**：可以修改应用程式的核心设定

------

## 安全性考量

### 为什么 API Key 必须保密？

1. **完整权限**：拥有应用程式的完全控制权
2. **资料存取**：可以存取所有用户和聊天资料
3. **不可撤销操作**：可以执行删除等不可逆操作
4. **无使用者验证**：不需要额外的用户身份验证

### 安全最佳实务

#### 存储安全

- **环境变数**：将 API Key 存放在环境变数中
- **配置档案**：使用加密的配置档案管理
- **密钥管理服务**：使用 AWS Secrets Manager、Azure Key Vault 等
- **版本控制排除**：绝不将 API Key 提交到版本控制系统

#### 存取控制

- **最小权限原则**：仅在必要的服务中使用 API Key
- **网路限制**：限制 API Key 的来源 IP 范围
- **定期轮换**：定期更换 API Key
- **监控使用**：监控 API Key 的使用情况和异常活动

#### 应用程式安全

```javascript
// ✅ 正确：在伺服器端使用
const apiKey = process.env.IMKIT_API_KEY; // 从环境变数读取

// ❌ 错误：绝不在前端暴露
// const apiKey = 'MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=';
```

------

## 环境设定范例

### Docker

```dockerfile
ENV IMKIT_API_KEY=MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

### .env 档案

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

## 常见问题

### Q: API Key 泄露会有什么风险？

**A:** 极高风险！攻击者可以：

- 完全控制您的 IMKIT 应用程式
- 存取所有用户资料和聊天记录
- 删除或修改重要资料
- 产生额外的费用

**发现泄露请立即：**

1. 在 Dashboard 中撤销旧的 API Key
2. 生成新的 API Key
3. 更新所有使用该 API Key 的服务
4. 检查是否有异常操作记录

### Q: 可以在前端 JavaScript 中使用 API Key 吗？

**A:** 绝对不可以！前端代码会暴露给所有用户，使用 Client Key 进行前端整合。

### Q: 如何限制 API Key 的存取范围？

**A:** 目前 API Key 拥有完整权限，建议通过以下方式控制：

- 网路层面限制来源 IP
- 应用程式层面实作权限控制
- 使用代理服务限制可呼叫的 API

### Q: API Key 有使用频率限制吗？

**A:** 是的，API Key 有 rate limiting 保护：

- 每分钟最多 1000 次请求
- 超过限制会收到 429 错误
- 建议实作适当的重试机制

------

## 错误处理

### 常见错误

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
