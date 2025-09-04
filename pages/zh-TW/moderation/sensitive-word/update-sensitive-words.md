# 更新敏感詞設定

## 概述

更新或建立系統的敏感詞彙審查配置。透過運行時配置系統管理封鎖用詞列表，可以即時過濾不當內容，維護聊天環境的品質。此功能適用於內容審查、敏感詞管理和平台治理。

------

## API 端點

### 更新敏感詞配置

建立或更新運行時配置變數，包含敏感詞彙列表設定。

```http
POST /config
```

#### Headers

| 參數         | 類型   | 必填 | 說明        |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅    | API Key     |

#### Post Body

| 參數           | 類型   | 必填 | 說明                    |
| -------------- | ------ | ---- | ----------------------- |
| `censorship`   | object | ❌    | 內容審查配置物件        |
| `announcement` | object | ❌    | 公告配置物件（可選）    |

**審查配置物件結構**

| 參數       | 類型  | 必填 | 說明                    |
| ---------- | ----- | ---- | ----------------------- |
| `keywords` | array | ✅    | 要封鎖的敏感詞彙陣列    |

#### 範例請求

**設定敏感詞列表**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
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
```

**僅更新敏感詞列表**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "censorship": {
    "keywords": [
      "spam",
      "inappropriate",
      "banned_word"
    ]
  }
}
```

**新增敏感詞到現有列表**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close

{
  "censorship": {
    "keywords": [
      "foo",
      "bar",
      "newword1",
      "newword2"
    ]
  }
}
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 更新後的配置資料       |

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
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
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
    "message": "Only platform admin can manage runtime config"
  }
}
```

**400 Bad Request** - 請求格式錯誤

```json
{
  "RC": 400,
  "RM": "Invalid request format",
  "error": {
    "code": "INVALID_CONFIG_FORMAT",
    "message": "Config format is invalid or malformed"
  }
}
```

------

## 使用場景

### 敏感詞管理
- **新增敏感詞**：添加新的敏感詞彙到過濾列表
- **更新列表**：修改現有的敏感詞彙列表
- **批量設定**：一次性設定多個敏感詞彙

### 內容審查
- **動態調整**：根據內容趨勢即時調整過濾規則
- **緊急應對**：快速新增需要過濾的敏感內容
- **規則優化**：根據使用情況優化過濾規則

### 平台治理
- **政策執行**：根據平台政策更新內容過濾規則
- **地區適應**：根據不同地區的法規調整敏感詞
- **合規要求**：滿足法律法規的內容審查要求

------

## 注意事項

- **平台管理員專用**：此功能僅限平台管理員使用，需要 API Key
- **即時生效**：配置更新會立即生效，影響所有聊天內容
- **配置覆蓋**：POST 請求會覆蓋現有配置，請確保包含完整資料
- **備份建議**：更新前建議先查詢當前配置作為備份
- **關鍵詞格式**：敏感詞以字串陣列形式儲存，區分大小寫
- **運行時配置**：使用運行時配置系統，無需重啟服務即可生效
- **完整更新**：建議包含所有需要保留的配置項目，避免遺失其他設定