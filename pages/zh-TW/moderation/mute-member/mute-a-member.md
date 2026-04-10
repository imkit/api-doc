# 替用戶靜音聊天室

## 概述

由管理員替指定用戶靜音特定聊天室的通知。靜音後該用戶將不再收到該聊天室的推播通知，但不影響其在聊天室中的參與權限。此功能適用於管理員代替用戶管理通知偏好。

------

## API 端點

### 靜音指定聊天室

為指定客戶端設定聊天室靜音狀態。

```http
POST /admin/clients/{uid}/mute/{room}
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

**靜音特定聊天室**

```http
POST /admin/clients/aaa/mute/demo HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: your-app.imkit.io
```

**JavaScript 範例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/admin/clients/${uid}/mute/${room}`,
  {},
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL 範例：**

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients/{uid}/mute/{room}" \
     -H 'IM-API-KEY: {IM-API-KEY}'
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
    "mute": ["demo"],
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
    "updatedAt": "2020-10-09T15:11:17.153Z",
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

------

## 使用場景

### 通知管理
- **減少干擾**：暫時停止接收特定聊天室的通知
- **專注工作**：在重要工作時段靜音不重要的聊天室
- **夜間模式**：夜間時段自動靜音所有聊天室

### 用戶體驗優化
- **個人偏好**：根據個人喜好調整通知設定
- **情境切換**：在不同使用情境下快速調整通知狀態
- **批量管理**：統一管理多個聊天室的通知設定

### 管理功能
- **後台控制**：管理員可為特定用戶設定聊天室靜音
- **用戶支援**：協助用戶解決通知相關問題
- **系統維護**：在系統維護期間暫時靜音通知

------

## 注意事項

- **僅影響通知**：靜音只會停止通知推送，不影響聊天室內的正常互動
- **管理員權限**：此 API 需要管理員權限和 API Key
- **持久化設定**：靜音設定會永久保存，直到手動取消
- **陣列更新**：每次靜音會將新的聊天室 ID 加入 mute 陣列
- **查詢參數**：API 支援 limit 和 skip 參數，但不影響靜音功能本身
- **即時生效**：靜音設定會立即生效，無需重新登入