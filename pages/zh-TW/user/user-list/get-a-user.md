# 獲取用戶資訊

## 概述

取得目前已登入用戶的詳細資訊。此 API 可用於獲取當前認證用戶的個人資料、登入狀態和其他相關資訊。

------

## API 端點

### 獲取當前用戶資訊

取得目前已登入用戶的完整資料。

```http
GET /me
```

#### Headers

| 參數            | 類型   | 必填 | 說明           |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `Authorization` | string | ✅    | Client Token   |

#### 範例請求

```http
GET /me HTTP/1.1
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Host: 104.199.197.188:3100
Connection: close
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 用戶詳細資訊           |

**用戶物件結構**

| 參數                    | 類型   | 說明                          |
| ----------------------- | ------ | ----------------------------- |
| `_id`                   | string | 用戶唯一識別碼                |
| `email`                 | string | 用戶電子郵件                  |
| `nickname`              | string | 用戶顯示名稱                  |
| `appID`                 | string | 應用程式識別碼                |
| `avatarUrl`             | string | 用戶頭像 URL                  |
| `address`               | object | 最後連線的網路地址資訊        |
| `userAgent`             | string | 最後使用的瀏覽器/應用程式資訊 |
| `lastLoginTimeMS`       | number | 最後登入時間（毫秒時間戳）    |
| `notificationEnabled`   | boolean| 是否啟用通知                  |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test CCDD",
    "appID": "SampleApp",
    "__v": 0,
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 52808,
      "family": "IPv6",
      "address": "::ffff:210.242.193.226"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    "lastLoginTimeMS": 1486027236514,
    "notificationEnabled": true
  }
}
```

#### 錯誤回應

**401 Unauthorized** - 認證失敗

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**403 Forbidden** - 無效的 Client Key

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "INVALID_CLIENT_KEY",
    "message": "Invalid client key"
  }
}
```

------

## 使用場景

### 用戶資料顯示
- **個人資料頁面**：在應用程式中顯示用戶的個人資訊
- **設定頁面**：載入當前用戶設定進行編輯
- **權限檢查**：確認用戶身分和權限

### 狀態檢查
- **登入驗證**：確認用戶登入狀態是否有效
- **會話管理**：檢查用戶會話是否過期
- **通知設定**：確認用戶的通知偏好設定

------

## 注意事項

- **認證必要性**：此 API 需要有效的用戶認證
- **敏感資訊**：不會返回密碼等敏感資訊
- **快取建議**：用戶資訊可以適當快取以提升效能
- **隱私保護**：僅返回當前認證用戶的資訊
