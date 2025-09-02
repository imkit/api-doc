# 取得敏感詞設定

## 概述

取得當前系統的敏感詞彙審查配置。透過運行時配置系統查詢封鎖用詞列表，可以了解系統目前設定的過濾規則。此功能適用於配置檢視、系統監控和管理維護。

------

## API 端點

### 查詢敏感詞配置

取得當前的運行時配置，包含敏感詞彙列表。

```http
GET /config
```

#### Headers

| 參數               | 類型   | 必填 | 說明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### 範例請求

```http
GET /config HTTP/1.1
IM-CLIENT-KEY: {CLIENT_KEY}
IM-Authorization: {CLIENT_TOKEN}
Host: localhost:3100
Connection: close
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 運行時配置資料         |

**配置物件結構**

| 參數           | 類型   | 說明                          |
| -------------- | ------ | ----------------------------- |
| `announcement` | object | 公告配置                      |
| `censorship`   | object | 內容審查配置                  |

**審查配置物件結構**

| 參數       | 類型  | 說明                |
| ---------- | ----- | ------------------- |
| `keywords` | array | 敏感詞彙陣列        |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "blahblah...",
      "pin": true
    },
    "censorship": {
      "keywords": [
        "foo",
        "bar"
      ]
    }
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

**403 Forbidden** - 權限不足

```json
{
  "RC": 403,
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only authorized users can view runtime config"
  }
}
```

------

## 使用場景

### 配置檢視
- **配置查看**：檢視當前系統設定的敏感詞列表
- **規則了解**：了解系統目前的內容過濾規則
- **設定驗證**：驗證敏感詞配置是否正確生效

### 系統監控
- **配置監控**：定期檢查敏感詞配置狀態
- **異常偵測**：監控配置是否異常或遺失
- **合規檢查**：確認配置符合法規要求

### 管理維護
- **備份準備**：在修改前備份當前配置
- **問題診斷**：排查內容過濾相關問題
- **版本控制**：追蹤配置變更歷史

------

## 注意事項

- **認證要求**：需要有效的客戶端認證才能查看配置
- **運行時配置**：顯示當前生效的運行時配置，而非檔案配置
- **完整配置**：回應包含所有運行時配置項目，不僅限於敏感詞
- **即時狀態**：顯示系統當前的即時配置狀態
- **敏感資訊**：配置內容可能包含敏感資訊，請妥善保管
- **快取機制**：配置可能有快取，變更後需等待快取更新