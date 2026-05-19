# Web URL 參數

## 概述

IMKIT 提供的 Web URL 支援透過 query parameter 控制初始化行為,包含登入 token、預設聊天室、深色模式等。本頁列出所有支援的參數、各自的 URL 擺放位置,以及常見的使用場景。

------

## 參數列表

| 參數 | 必填 | 類型 | 預設值 | 說明 |
| ---- | ---- | ---- | ------ | ---- |
| `token` | ✅(初次嵌入) | string | localStorage 內既存 token | JWT 認證 token。讀取後會自動寫入 `localStorage` 並從網址列移除 |
| `autoSelectRoom` | ❌ | `"0"` | (啟用) | 是否在載入時自動選第一個房間;設為 `0` 停用 |
| `roomId` | ❌ | string | (無) | 指定要進入的聊天室 ID。設定後會隱藏 RoomList,適合單一聊天室嵌入 |
| `roomTag` | ❌ | string | (無) | 房間 tag 過濾,只顯示帶有指定 tag 的房間 |
| `darkMode` | ❌ | `"true"` / `"1"` / `"false"` / `"0"` | 跟隨系統 | 切換深色 / 淺色主題 |

------

## URL 格式

IMKIT 前端使用 hash routing,**參數位置會影響讀取機制**,請依下表選擇正確擺放位置。

### 格式 A:hash(`#`)之前

適用參數:`token`(首次載入)、`autoSelectRoom`、`roomId`、`roomTag`

```
https://your-app.imkit.io/?token=用戶的_TOKEN&roomId=ROOM_ID&autoSelectRoom=0#/
```

### 格式 B:hash 路由之後

適用參數:`token`(動態切換)、`darkMode`

```
https://your-app.imkit.io/#/?darkMode=1&token=用戶的_TOKEN
```

> `token` 兩個位置都支援:**首次載入**請放在格式 A(讀取後會自動存入 localStorage 並從 URL 移除,避免被截圖或分享時洩漏);**執行中動態切換 token** 請放在格式 B(會觸發 socket 重連、清空原本的 store)。

------

## 使用場景

### 1. 嵌入指定聊天室(隱藏房間列表)

```
https://your-app.imkit.io/?token=用戶的_TOKEN&roomId=6073a1b2c3d4e5f6a7b8c9d0#/
```

適合在第三方系統中只想顯示特定聊天室的情境,例如客服系統嵌入單一對話窗。

### 2. 強制深色模式

```
https://your-app.imkit.io/#/?darkMode=1
```

適合嵌入在暗色背景的 app 或頁面中,避免主題不一致。

### 3. 不自動選房 + 顯示完整房間列表

```
https://your-app.imkit.io/?token=用戶的_TOKEN&autoSelectRoom=0#/
```

適合手機 web 上希望使用者自行選擇要進入哪個房間的情境。

### 4. 依 tag 過濾房間

```
https://your-app.imkit.io/?token=用戶的_TOKEN&roomTag=customer-support#/
```

只顯示帶有 `customer-support` tag 的房間,適合多場景共用同一個 IMKIT app 時做分流。

------

## 注意事項

- **`token` 安全性**:格式 A 的 `token` 會在 SDK 讀取後自動從瀏覽器網址列移除並寫入 `localStorage`,降低被截圖或分享時洩漏的風險。
- **`darkMode` 字面值**:目前只接受 `"true"` / `"1"` / `"false"` / `"0"`,寫成 `"dark"` 或 `"light"` 不會生效。
- **`roomId` 與 RoomList**:帶入 `roomId` 時 RoomList 會被隱藏,適合單一聊天室嵌入。若要保留房間列表並只是預選某房間,請改在嵌入後透過 SDK API 切換。
- **`autoSelectRoom` 預設值**:不帶此參數時預設啟用(載入後自動選第一個房間)。只有 `"0"` 才會停用。

------

## 下一步

- [基本串接](/zh-TW/basic_integration) — 完整的後端串接流程,從建立用戶、建立聊天室到嵌入 Web URL
- [權限驗證](/zh-TW/auth) — 了解 API Key 與 Client Key 的取得與使用
