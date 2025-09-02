# 刪除敏感詞設定

## 概述

刪除系統的敏感詞彙審查配置。透過移除運行時配置中的審查設定，可以停用敏感詞過濾功能或清除特定的配置項目。此功能適用於配置清理、功能停用和系統維護。

------

## API 端點

### 刪除配置項目

刪除指定的運行時配置項目。

```http
DELETE /config/{key}
```

#### Headers

| 參數         | 類型   | 必填 | 說明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 平台管理員 API Key |

#### Path Parameters

| 參數  | 類型   | 必填 | 說明           |
| ----- | ------ | ---- | -------------- |
| `key` | string | ✅    | 運行時配置鍵值 |

#### 範例請求

**刪除敏感詞配置**

```http
DELETE /config/censorship HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

**刪除公告配置**

```http
DELETE /config/announcement HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

**刪除其他配置**

```http
DELETE /config/push HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

#### Response

**成功回應（200 OK）**

| 參數     | 類型   | 說明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回應代碼（0 表示成功） |
| `RM`     | string | 回應訊息               |
| `result` | object | 空物件                 |

#### 範例回應

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
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

**404 Not Found** - 配置項目不存在

```json
{
  "RC": 404,
  "RM": "Config not found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## 使用場景

### 功能停用
- **停用過濾**：完全停用敏感詞過濾功能
- **臨時關閉**：暫時關閉某些配置功能
- **測試環境**：在測試環境中移除生產配置

### 配置清理
- **過期配置**：清理不再使用的配置項目
- **重新設定**：清除舊配置準備重新設定
- **系統重置**：重置配置到預設狀態

### 維護操作
- **緊急處理**：緊急移除有問題的配置
- **版本更新**：在系統更新時清理舊配置
- **錯誤修復**：移除導致問題的配置項目

------

## 注意事項

- **平台管理員專用**：此功能僅限平台管理員使用，需要 API Key
- **即時生效**：配置刪除會立即生效，相關功能會立即停用
- **不可恢復**：刪除操作無法復原，建議事先備份配置
- **功能影響**：刪除 censorship 配置會完全停用敏感詞過濾
- **運行時配置**：只影響運行時配置，不會修改檔案配置
- **依賴檢查**：刪除前請確認沒有其他功能依賴此配置
- **監控建議**：刪除後請監控系統功能是否正常運作