# IMKIT Doc Website - 待補充內容清單

## 專案架構說明
- `@imkit-doc-website/` - 主要改動專案（只能改動此專案）
- `@chat-server-document.wiki/` - 參考專案（內含 .md 文檔，需要複製內容）
- `@pinchat-landing-page-i18n/` - 無關專案（不處理）

## 待補充的空白 .md 文件清單

### 用戶 (User)
#### 用戶列表 (User List)
- [ ] `pages/user/user-list/get-a-user.md` 
  - 對應 URL: https://imkit.github.io/api-doc/user/user-list/get-a-user
  - 來源參考: `@chat-server-document.wiki/me/[Me]-Get.md`

### 聊天室 (Room)
#### 聊天室管理 (Room Management)  
- [ ] `pages/room/room-management/update-a-room.md`
  - 對應 URL: https://imkit.github.io/api-doc/room/room-management/update-a-room/
  - 來源參考: `@chat-server-document.wiki/room/[Room]-Update.md`

#### 聊天室成員 (Room Members)
- [ ] `pages/room/room-members/list-members.md`
  - 對應 URL: https://imkit.github.io/api-doc/room/room-members/list-members/
  - 來源參考: 需要找對應的文檔

- [ ] `pages/room/room-members/search-a-member.md`
  - 對應 URL: https://imkit.github.io/api-doc/room/room-members/search-a-member/
  - 來源參考: 需要找對應的文檔

### 訊息 (Message)
#### 訊息功能 (Message Basic)
- [ ] `pages/message/message-basic/get-a-message.md`
  - 對應 URL: https://imkit.github.io/api-doc/message/message-basic/get-a-message/
  - 來源參考: 需要找對應的文檔

- [ ] `pages/message/message-basic/delete-a-message.md`
  - 對應 URL: https://imkit.github.io/api-doc/message/message-basic/delete-a-message/
  - 來源參考: 需要找對應的文檔

- [ ] `pages/message/message-basic/send-a-message.md`
  - 對應 URL: https://imkit.github.io/api-doc/message/message-basic/send-a-message/
  - 來源參考: `@chat-server-document.wiki/room/[Room]-Send-Message.md`

- [ ] `pages/message/message-basic/search-message.md`
  - 對應 URL: https://imkit.github.io/api-doc/message/message-basic/search-message/
  - 來源參考: `@chat-server-document.wiki/[Search].md`

- [ ] `pages/message/message-basic/get-message-by-a-room.md`
  - 對應 URL: https://imkit.github.io/api-doc/message/message-basic/get-message-by-a-room/
  - 來源參考: `@chat-server-document.wiki/room/[Room]-List-Room-Messages-V3.md`

- [ ] `pages/message/message-basic/list-messages.md`
  - 對應 URL: https://imkit.github.io/api-doc/message/message-basic/list-messages/
  - 來源參考: 需要找對應的文檔

#### 未讀計算 (Message Badge)
- [ ] `pages/message/message-badge/get-unread-message-by-a-room.md`
  - 對應 URL: https://imkit.github.io/api-doc/message/message-badge/get-unread-message-by-a-room/
  - 來源參考: `@chat-server-document.wiki/badge/[Badge]-Count-unreads-by-room-tags.md`

- [ ] `pages/message/message-badge/get-unread-message-by-a-user.md`
  - 對應 URL: https://imkit.github.io/api-doc/message/message-badge/get-unread-message-by-a-user/
  - 來源參考: `@chat-server-document.wiki/me/[Me]-Badge.md`

### 管理機制 (Moderation)
#### 封鎖用戶 (Block User)
- [ ] `pages/moderation/block-user/block-a-user.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/block-user/block-a-user/
  - 來源參考: `@chat-server-document.wiki/blocklist/[Blocklist]-Block-a-user.md`

- [ ] `pages/moderation/block-user/unblock-a-user.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/block-user/unblock-a-user/
  - 來源參考: `@chat-server-document.wiki/blocklist/[Blocklist]-Unblock-a-user.md`

- [ ] `pages/moderation/block-user/list-blocked-users.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/block-user/list-blocked-users/
  - 來源參考: `@chat-server-document.wiki/blocklist/[Blocklist]-Get-my-blocklist.md`

#### 靜音成員 (Mute Member)
- [ ] `pages/moderation/mute-member/mute-a-member.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/mute-member/mute-a-member/
  - 來源參考: `@chat-server-document.wiki/me/[Me]-Mute-room.md`

- [ ] `pages/moderation/mute-member/unmute-a-member.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/mute-member/unmute-a-member/
  - 來源參考: `@chat-server-document.wiki/me/[Me]-UnMute-Room.md`

- [ ] `pages/moderation/mute-member/list-muted-members.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/mute-member/list-muted-members/
  - 來源參考: 需要找對應的文檔

#### 禁止成員 (Ban Member)
- [ ] `pages/moderation/ban-member/ban-a-member.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/ban-member/ban-a-member/
  - 來源參考: 需要找對應的文檔

- [ ] `pages/moderation/ban-member/unban-a-member.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/ban-member/unban-a-member/
  - 來源參考: 需要找對應的文檔

- [ ] `pages/moderation/ban-member/list-banned-members.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/ban-member/list-banned-members/
  - 來源參考: 需要找對應的文檔

#### 凍結聊天室 (Freeze Chatroom)
- [ ] `pages/moderation/freeze-chatroom/freeze-a-chatroom.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/freeze-chatroom/freeze-a-chatroom/
  - 來源參考: 需要找對應的文檔

#### 敏感用詞 (Sensitive Word)
- [ ] `pages/moderation/sensitive-word/blocklist.md`
  - 對應 URL: https://imkit.github.io/api-doc/moderation/sensitive-word/blocklist/
  - 來源參考: 需要找對應的文檔

### Webhook
- [ ] `pages/webhook/webhook/webhook.md`
  - 對應 URL: https://imkit.github.io/api-doc/webhook/webhook/webhook/
  - 來源參考: `@chat-server-document.wiki/Webhook.md`

## 工作流程
1. 從 `@chat-server-document.wiki/` 找到對應的 .md 文件
2. 讀取內容並適當格式化
3. 複製到對應的 `@imkit-doc-website/pages/` 目錄下的 .md 文件
4. 確保格式符合既定的 Layout 規範

## Layout 規範
**參考檔案**：`@imkit-doc-website/pages/user/user-list/list-users.md`

### 標準結構
```markdown
# 標題

## 概述
API 的詳細說明和用途

------

## API 端點

### 功能名稱
功能的簡短描述

```http
METHOD /api/path
```

#### Headers
| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| ... | ... | ✅/❌ | ... |

#### Query Parameters / Post Body
| 參數 | 類型 | 必填 | 說明 |
| ---- | ---- | ---- | ---- |
| ... | ... | ✅/❌ | ... |

#### 範例請求
```http
實際的 HTTP 請求範例
```

#### Response
**成功回應（200 OK）**
| 參數 | 類型 | 說明 |
| ---- | ---- | ---- |
| ... | ... | ... |

#### 範例回應
```json
{
  實際的 JSON 回應範例
}
```

#### 錯誤回應
**HTTP狀態碼** - 錯誤說明
```json
{
  錯誤回應範例
}
```

------

## 使用場景
### 場景分類
- **具體用途**：詳細說明

------

## 注意事項
- **重點提醒**：具體說明
```

### 格式要點
1. **分隔線**：使用 `------` 分隔主要區塊
2. **表格欄位**：統一使用中文（參數、類型、必填、說明）
3. **必填標示**：✅ 必填，❌ 選填
4. **程式碼區塊**：使用適當的語言標籤（`http`, `json`, `javascript` 等）
5. **區塊標題**：使用 `##` 和 `###` 層級結構
6. **強調格式**：使用 `**粗體**` 強調重點

## 注意事項
- 只能改動 `@imkit-doc-website/` 專案
- 所有內容來源應為 `@chat-server-document.wiki/` 
- 需要保持 API 文檔的完整性和準確性
- **嚴格遵循 Layout 規範**：確保所有文檔格式一致
- **內容本土化**：適當翻譯技術術語為繁體中文