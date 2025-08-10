# API 金鑰

## 概述

API Key 是 IMKIT Platform API 中用於後端服務呼叫管理 API 的認證金鑰。它擁有完整的管理權限，能夠執行用戶管理、聊天室管理、Token 管理等所有後端操作，必須妥善保管在伺服器端。

------

## API Key 特性

### 基本資訊

| 屬性         | 說明                     |
| ------------ | ------------------------ |
| **用途**     | 後端管理 API 認證        |
| **格式**     | Base64 編碼字串          |
| **有效期**   | 長期有效（除非主動撤銷） |
| **作用域**   | 應用程式完整管理權限     |
| **安全等級** | 機密（絕不可暴露在前端） |

### 與 Client Key 的差異

| 項目         | API Key        | Client Key      |
| ------------ | -------------- | --------------- |
| **使用場景** | 後端 API 呼叫  | 前端 SDK 初始化 |
| **安全性**   | 私密保存       | 公開可見        |
| **權限範圍** | 完整管理權限   | 連線和基本操作  |
| **暴露風險** | 極高風險       | 低風險          |
| **存放位置** | 伺服器環境變數 | 前端代碼        |

------

## 取得 API Key

### 透過 IMKIT Dashboard

1. 登入 [IMKIT Dashboard](https://dashboard.imkit.io/)
2. 選擇您的應用程式
3. 進入「API 設定」頁面
4. 複製 API Key（僅顯示一次）

### 範例 API Key

```
MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

------

## 使用方式

### HTTP Header 認證

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

### 程式碼範例

**Node.js**

```javascript
const axios = require('axios');

const apiKey = process.env.IMKIT_API_KEY;
const baseURL = 'https://your-app.imkit.io';

const headers = {
  'IM-API-KEY': apiKey,
  'Content-Type': 'application/json'
};

// 建立用戶
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

## API Key 權限

### 允許的操作

- ✅ **用戶管理**
  - 建立、更新、刪除用戶
  - 查詢用戶資訊
  - 管理用戶權限
- ✅ **Token 管理**
  - Issue Token
  - 更新 Token
  - 撤銷 Token
- ✅ **聊天室管理**
  - 建立、刪除聊天室
  - 管理聊天室成員
  - 設定聊天室權限
- ✅ **訊息管理**
  - 發送系統訊息
  - 刪除訊息
  - 查詢訊息記錄
- ✅ **應用程式設定**
  - 修改應用程式配置
  - 管理 Webhook 設定
  - 查看使用統計

### 高風險操作

- ⚠️ **完全控制權**：可以存取和修改所有應用程式資料
- ⚠️ **用戶資料**：可以存取所有用戶的私人資訊
- ⚠️ **聊天記錄**：可以讀取所有聊天室的訊息內容
- ⚠️ **系統設定**：可以修改應用程式的核心設定

------

## 安全性考量

### 為什麼 API Key 必須保密？

1. **完整權限**：擁有應用程式的完全控制權
2. **資料存取**：可以存取所有用戶和聊天資料
3. **不可撤銷操作**：可以執行刪除等不可逆操作
4. **無使用者驗證**：不需要額外的用戶身份驗證

### 安全最佳實務

#### 存儲安全

- **環境變數**：將 API Key 存放在環境變數中
- **配置檔案**：使用加密的配置檔案管理
- **密鑰管理服務**：使用 AWS Secrets Manager、Azure Key Vault 等
- **版本控制排除**：絕不將 API Key 提交到版本控制系統

#### 存取控制

- **最小權限原則**：僅在必要的服務中使用 API Key
- **網路限制**：限制 API Key 的來源 IP 範圍
- **定期輪換**：定期更換 API Key
- **監控使用**：監控 API Key 的使用情況和異常活動

#### 應用程式安全

```javascript
// ✅ 正確：在伺服器端使用
const apiKey = process.env.IMKIT_API_KEY; // 從環境變數讀取

// ❌ 錯誤：絕不在前端暴露
// const apiKey = 'MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=';
```

------

## 環境設定範例

### Docker

```dockerfile
ENV IMKIT_API_KEY=MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

### .env 檔案

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

## 常見問題

### Q: API Key 洩露會有什麼風險？

**A:** 極高風險！攻擊者可以：

- 完全控制您的 IMKIT 應用程式
- 存取所有用戶資料和聊天記錄
- 刪除或修改重要資料
- 產生額外的費用

**發現洩露請立即：**

1. 在 Dashboard 中撤銷舊的 API Key
2. 生成新的 API Key
3. 更新所有使用該 API Key 的服務
4. 檢查是否有異常操作記錄

### Q: 可以在前端 JavaScript 中使用 API Key 嗎？

**A:** 絕對不可以！前端代碼會暴露給所有用戶，使用 Client Key 進行前端整合。

### Q: 如何限制 API Key 的存取範圍？

**A:** 目前 API Key 擁有完整權限，建議通過以下方式控制：

- 網路層面限制來源 IP
- 應用程式層面實作權限控制
- 使用代理服務限制可呼叫的 API

### Q: API Key 有使用頻率限制嗎？

**A:** 是的，API Key 有 rate limiting 保護：

- 每分鐘最多 1000 次請求
- 超過限制會收到 429 錯誤
- 建議實作適當的重試機制

------

## 錯誤處理

### 常見錯誤

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
