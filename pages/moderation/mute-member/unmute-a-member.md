# 解除靜音成員

## 概述

解除靜音成員功能讓管理員可以移除特定客戶端對指定聊天室的靜音狀態，恢復該客戶端對聊天室的通知接收。此功能與靜音成員功能相對應，適用於恢復通知、重新啟用提醒和聊天室管理。

------

## API 端點

### 解除指定客戶端的聊天室靜音

移除指定客戶端對特定聊天室的靜音狀態。

```http
DELETE /admin/clients/{uid}/mute/{room}
```

#### Headers

| 參數         | 類型   | 必填 | 說明        |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅    | API Key     |

#### Path Parameters

| 參數   | 類型   | 必填 | 說明         |
| ------ | ------ | ---- | ------------ |
| `uid`  | string | ✅    | 客戶端 ID    |
| `room` | string | ✅    | 聊天室 ID    |

#### 範例請求

**解除特定聊天室靜音**

```http
DELETE /admin/clients/aaa/mute/demo?limit=10&skip=100 HTTP/1.1
IM-API-KEY: fangho_imkit_0412_2018_001_apikey
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.7) GCDHTTPRequest
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                       |
| -------- | ------ | -------------------------- |
| `RC`     | number | 回應代碼（0 表示成功）     |
| `RM`     | string | 回應訊息                   |
| `result` | object | 更新後的客戶端資料         |

**客戶端資料物件結構**

| 參數              | 類型   | 說明                          |
| ----------------- | ------ | ----------------------------- |
| `mute`            | array  | 靜音的聊天室 ID 列表          |
| `isRobot`         | bool   | 是否為機器人                  |
| `_id`             | string | 客戶端唯一識別碼              |
| `appID`           | string | 應用程式識別碼                |
| `description`     | string | 客戶端描述                    |
| `avatarUrl`       | string | 頭像 URL                      |
| `nickname`        | string | 暱稱                          |
| `email`           | string | 電子信箱                      |
| `address`         | object | 連線地址資訊                  |
| `userAgent`       | string | 使用者代理字串                |
| `updatedAt`       | string | 最後更新時間                  |
| `lastLoginTimeMS` | number | 最後登入時間（毫秒時間戳）    |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "mute": [],
    "isRobot": false,
    "_id": "aaa",
    "__v": 0,
    "appID": "SampleApp",
    "description": "description la la #1541926309694",
    "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
    "nickname": "AAA",
    "email": "arielle.mckellar@coolgoose.ca",
    "address": {
      "address": "::1",
      "family": "IPv6",
      "port": 50392
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "updatedAt": "2020-10-09T15:11:34.216Z",
    "id": "aaa",
    "lastLoginTimeMS": 1583726632592
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
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

**404 Not Found** - 客戶端不存在

```json
{
  "RC": 404,
  "RM": "Client not found",
  "error": {
    "code": "CLIENT_NOT_FOUND",
    "message": "The specified client does not exist"
  }
}
```

**404 Not Found** - 聊天室不存在

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "The specified room does not exist"
  }
}
```

**400 Bad Request** - 聊天室未被靜音

```json
{
  "RC": 400,
  "RM": "Room is not muted",
  "error": {
    "code": "ROOM_NOT_MUTED",
    "message": "The specified room is not in the mute list"
  }
}
```

------

## 使用場景

### 通知恢復
- **重新啟用提醒**：恢復特定聊天室的通知推送
- **工作時間調整**：在工作時間恢復重要聊天室的通知
- **情境切換**：根據不同使用情境恢復通知設定

### 用戶體驗管理
- **個人偏好調整**：根據用戶需求調整通知設定
- **臨時靜音解除**：解除臨時設定的靜音狀態
- **批量管理**：統一恢復多個聊天室的通知設定

### 管理功能
- **後台控制**：管理員協助用戶恢復聊天室通知
- **用戶支援**：解決用戶通知相關問題
- **系統維護**：系統維護完成後恢復通知功能

------

## 注意事項

- **管理員權限**：此 API 需要管理員權限和 API Key
- **狀態移除**：解除靜音會將聊天室 ID 從 mute 陣列中移除
- **即時生效**：解除靜音會立即生效，用戶將開始接收通知
- **空陣列**：成功解除所有靜音後，mute 陣列會變為空陣列
- **查詢參數**：API 支援 limit 和 skip 參數，但不影響解除靜音功能
- **持久化設定**：解除靜音的狀態會永久保存
- **通知恢復**：解除靜音後用戶將重新接收該聊天室的通知