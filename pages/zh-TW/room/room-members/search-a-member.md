# 搜尋成員

## 概述

搜尋聊天室成員功能透過前端實作，先取得完整的成員列表，然後在客戶端進行搜尋和過濾。此方式可以提供即時的搜尋體驗，減少網路請求，並支援多種搜尋條件的組合過濾。

------

## 實作方式

### 資料來源

使用 **取得聊天室詳細資訊** API 來獲取完整成員列表：

```http
GET /rooms/{id}
```

詳細的 API 使用方式請參考：[列出成員](/room/room-members/list-members)

### 可搜尋欄位

從 API 回應中的 `members` 陣列，每個成員物件包含以下可搜尋的欄位：

| 欄位                | 類型    | 說明                          | 搜尋用途                |
| ------------------ | ------- | ----------------------------- | ---------------------- |
| `_id`              | string  | 成員唯一識別碼                | 精確搜尋特定成員        |
| `nickname`         | string  | 成員暱稱                      | 模糊搜尋暱稱           |
| `avatarUrl`        | string  | 成員頭像 URL                  | 過濾有/無頭像的成員     |
| `lastLoginTime`    | string  | 最後登入時間（ISO 格式）      | 按登入時間範圍過濾      |
| `lastActiveTime`   | string  | 最後活躍時間                  | 按活躍時間過濾         |
| `isSocketConnected`| boolean | 是否目前線上                  | 過濾線上/離線成員       |
| `description`      | string  | 成員描述                      | 搜尋描述內容           |
| `city`             | string  | 城市                          | 按地理位置過濾         |
| `country`          | string  | 國家                          | 按國家過濾             |
| `clientType`       | string  | 客戶端類型                    | 按客戶端類型分類       |
| `members`          | array   | 子成員列表（群組客戶端）      | 搜尋群組內的子成員     |
| `chatStatus`       | string  | 聊天狀態                      | 按聊天狀態過濾         |

------

## 前端實作範例

### JavaScript 實作

**基本搜尋功能**

```javascript
// 取得成員列表
async function getRoomMembers(roomId) {
  const response = await fetch(`/rooms/${roomId}`, {
    headers: {
      'IM-CLIENT-KEY': '{CLIENT_KEY}',
      'Authorization': '{TOKEN}'
    }
  });
  const data = await response.json();
  return data.result.members;
}

// 搜尋成員函數
function searchMembers(members, searchTerm, searchField = 'nickname') {
  if (!searchTerm) return members;
  
  return members.filter(member => {
    const fieldValue = member[searchField];
    if (typeof fieldValue === 'string') {
      return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });
}

// 使用範例
const members = await getRoomMembers('room123');
const searchResults = searchMembers(members, '張三', 'nickname');
```

**進階過濾功能**

```javascript
// 多條件搜尋
function advancedSearchMembers(members, filters) {
  return members.filter(member => {
    // 暱稱搜尋
    if (filters.nickname && 
        !member.nickname?.toLowerCase().includes(filters.nickname.toLowerCase())) {
      return false;
    }
    
    // 線上狀態過濾
    if (filters.isOnline !== undefined && 
        member.isSocketConnected !== filters.isOnline) {
      return false;
    }
    
    // 地區過濾
    if (filters.country && member.country !== filters.country) {
      return false;
    }
    
    // 客戶端類型過濾
    if (filters.clientType && member.clientType !== filters.clientType) {
      return false;
    }
    
    // 最後登入時間範圍過濾
    if (filters.lastLoginAfter) {
      const lastLogin = new Date(member.lastLoginTime);
      const filterDate = new Date(filters.lastLoginAfter);
      if (lastLogin < filterDate) return false;
    }
    
    return true;
  });
}

// 使用範例
const filteredMembers = advancedSearchMembers(members, {
  nickname: '張',
  isOnline: true,
  country: 'Taiwan',
  clientType: 'mobile',
  lastLoginAfter: '2023-01-01'
});
```

**群組成員搜尋**

```javascript
// 搜尋包含群組內成員
function searchAllMembers(members, searchTerm) {
  const results = [];
  
  members.forEach(member => {
    // 搜尋主要成員
    if (member.nickname?.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push(member);
    }
    
    // 如果是群組客戶端，搜尋群組內成員
    if (member.members && Array.isArray(member.members)) {
      const groupMembers = searchMembers(member.members, searchTerm);
      results.push(...groupMembers.map(subMember => ({
        ...subMember,
        parentGroup: member._id
      })));
    }
  });
  
  return results;
}
```

### React 實作範例

```jsx
import { useState, useEffect, useMemo } from 'react';

function MemberSearch({ roomId }) {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    isOnline: null,
    clientType: '',
    country: ''
  });

  // 取得成員列表
  useEffect(() => {
    async function fetchMembers() {
      const memberList = await getRoomMembers(roomId);
      setMembers(memberList);
    }
    fetchMembers();
  }, [roomId]);

  // 即時搜尋結果
  const searchResults = useMemo(() => {
    return advancedSearchMembers(members, {
      nickname: searchTerm,
      ...filters
    });
  }, [members, searchTerm, filters]);

  return (
    <div>
      {/* 搜尋輸入框 */}
      <input
        type="text"
        placeholder="搜尋成員暱稱..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* 過濾選項 */}
      <select 
        value={filters.isOnline ?? ''} 
        onChange={(e) => setFilters({...filters, isOnline: e.target.value === '' ? null : e.target.value === 'true'})}
      >
        <option value="">全部狀態</option>
        <option value="true">線上</option>
        <option value="false">離線</option>
      </select>
      
      {/* 搜尋結果 */}
      <div>
        {searchResults.map(member => (
          <div key={member._id}>
            <img src={member.avatarUrl} alt={member.nickname} />
            <span>{member.nickname}</span>
            <span>{member.isSocketConnected ? '線上' : '離線'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

------

## 使用場景

### 成員管理
- **快速查找**：透過暱稱快速找到特定成員
- **狀態篩選**：過濾線上/離線成員
- **批量操作**：選擇符合條件的成員進行批量管理

### 用戶體驗
- **即時搜尋**：不需要等待網路請求的即時搜尋結果
- **多條件過濾**：支援多種條件的組合搜尋
- **群組支援**：支援搜尋群組客戶端內的子成員

### 管理功能
- **活躍度分析**：按最後登入時間篩選活躍成員
- **地區統計**：按地理位置分析成員分布
- **設備分析**：按客戶端類型了解用戶使用習慣

------

## 最佳實作建議

### 效能優化
- **資料快取**：快取成員列表資料，避免重複請求
- **防抖搜尋**：使用 debounce 避免過於頻繁的搜尋操作
- **虛擬滾動**：大量成員時使用虛擬滾動提升渲染效能

### 用戶體驗
- **搜尋高亮**：在結果中高亮顯示搜尋關鍵字
- **空狀態處理**：提供友好的無結果提示
- **載入狀態**：顯示資料載入進度

### 資料處理
- **容錯處理**：處理缺失欄位或異常資料
- **大小寫不敏感**：搜尋時忽略大小寫差異
- **特殊字元處理**：正確處理特殊字元和 Unicode

------

## 注意事項

- **資料來源**：搜尋資料來自聊天室詳細資訊 API，確保先取得完整成員列表
- **群組處理**：注意 `members` 欄位可能包含子成員，需要遞迴搜尋
- **即時性**：前端搜尋無法反映即時的線上狀態變化，需定期更新資料
- **權限控制**：確保只有聊天室成員才能搜尋其他成員
- **效能考量**：大型聊天室建議使用後端搜尋或分頁載入
- **隱私保護**：注意不要暴露敏感的成員資訊