# 搜寻成员

## 概述

搜寻聊天室成员功能透过前端实作，先取得完整的成员列表，然后在客户端进行搜寻和过滤。

> **注意**：此页面描述的是前端实作方式，不是独立的 API 端点。成员资料来自[取得聊天室](/zh-TW/room/room-management/get-a-room) API 的回传结果。

------

## 实作方式

### 资料来源

使用 **取得聊天室详细资讯** API 来获取完整成员列表：

```http
GET /rooms/{id}
```

详细的 API 使用方式请参考：[列出成员](/zh-TW/room/room-members/list-members)

### 可搜寻栏位

从 API 回应中的 `members` 阵列，每个成员物件包含以下可搜寻的栏位：

| 栏位                | 类型    | 说明                          | 搜寻用途                |
| ------------------ | ------- | ----------------------------- | ---------------------- |
| `_id`              | string  | 成员唯一识别码                | 精确搜寻特定成员        |
| `nickname`         | string  | 成员暱称                      | 模糊搜寻暱称           |
| `avatarUrl`        | string  | 成员头像 URL                  | 过滤有/无头像的成员     |
| `lastLoginTime`    | string  | 最后登入时间（ISO 格式）      | 按登入时间范围过滤      |
| `lastActiveTime`   | string  | 最后活跃时间                  | 按活跃时间过滤         |
| `isSocketConnected`| boolean | 是否目前线上                  | 过滤线上/离线成员       |
| `description`      | string  | 成员描述                      | 搜寻描述内容           |
| `city`             | string  | 城市                          | 按地理位置过滤         |
| `country`          | string  | 国家                          | 按国家过滤             |
| `clientType`       | string  | 客户端类型                    | 按客户端类型分类       |
| `members`          | array   | 子成员列表（群组客户端）      | 搜寻群组内的子成员     |
| `chatStatus`       | string  | 聊天状态                      | 按聊天状态过滤         |

------

## 前端实作范例

### JavaScript 实作

**基本搜寻功能**

```javascript
// 取得成员列表
async function getRoomMembers(roomId) {
  const response = await fetch(`/rooms/${roomId}`, {
    headers: {
      'IM-CLIENT-KEY': '{IM-CLIENT-KEY}',
      'IM-Authorization': '{IM-Authorization}'
    }
  });
  const data = await response.json();
  return data.result.members;
}

// 搜寻成员函数
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

// 使用范例
const members = await getRoomMembers('room123');
const searchResults = searchMembers(members, '张三', 'nickname');
```

**进阶过滤功能**

```javascript
// 多条件搜寻
function advancedSearchMembers(members, filters) {
  return members.filter(member => {
    // 暱称搜寻
    if (filters.nickname && 
        !member.nickname?.toLowerCase().includes(filters.nickname.toLowerCase())) {
      return false;
    }
    
    // 线上状态过滤
    if (filters.isOnline !== undefined && 
        member.isSocketConnected !== filters.isOnline) {
      return false;
    }
    
    // 地区过滤
    if (filters.country && member.country !== filters.country) {
      return false;
    }
    
    // 客户端类型过滤
    if (filters.clientType && member.clientType !== filters.clientType) {
      return false;
    }
    
    // 最后登入时间范围过滤
    if (filters.lastLoginAfter) {
      const lastLogin = new Date(member.lastLoginTime);
      const filterDate = new Date(filters.lastLoginAfter);
      if (lastLogin < filterDate) return false;
    }
    
    return true;
  });
}

// 使用范例
const filteredMembers = advancedSearchMembers(members, {
  nickname: '张',
  isOnline: true,
  country: 'Taiwan',
  clientType: 'mobile',
  lastLoginAfter: '2023-01-01'
});
```

**群组成员搜寻**

```javascript
// 搜寻包含群组内成员
function searchAllMembers(members, searchTerm) {
  const results = [];
  
  members.forEach(member => {
    // 搜寻主要成员
    if (member.nickname?.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push(member);
    }
    
    // 如果是群组客户端，搜寻群组内成员
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

### React 实作范例

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

  // 取得成员列表
  useEffect(() => {
    async function fetchMembers() {
      const memberList = await getRoomMembers(roomId);
      setMembers(memberList);
    }
    fetchMembers();
  }, [roomId]);

  // 即时搜寻结果
  const searchResults = useMemo(() => {
    return advancedSearchMembers(members, {
      nickname: searchTerm,
      ...filters
    });
  }, [members, searchTerm, filters]);

  return (
    <div>
      {/* 搜寻输入框 */}
      <input
        type="text"
        placeholder="搜寻成员暱称..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* 过滤选项 */}
      <select 
        value={filters.isOnline ?? ''} 
        onChange={(e) => setFilters({...filters, isOnline: e.target.value === '' ? null : e.target.value === 'true'})}
      >
        <option value="">全部状态</option>
        <option value="true">线上</option>
        <option value="false">离线</option>
      </select>
      
      {/* 搜寻结果 */}
      <div>
        {searchResults.map(member => (
          <div key={member._id}>
            <img src={member.avatarUrl} alt={member.nickname} />
            <span>{member.nickname}</span>
            <span>{member.isSocketConnected ? '线上' : '离线'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

------

## 使用场景

### 成员管理
- **快速查找**：透过暱称快速找到特定成员
- **状态筛选**：过滤线上/离线成员
- **批量操作**：选择符合条件的成员进行批量管理

### 用户体验
- **即时搜寻**：不需要等待网路请求的即时搜寻结果
- **多条件过滤**：支援多种条件的组合搜寻
- **群组支援**：支援搜寻群组客户端内的子成员

### 管理功能
- **活跃度分析**：按最后登入时间筛选活跃成员
- **地区统计**：按地理位置分析成员分布
- **设备分析**：按客户端类型了解用户使用习惯

------

## 最佳实作建议

### 效能优化
- **资料快取**：快取成员列表资料，避免重复请求
- **防抖搜寻**：使用 debounce 避免过于频繁的搜寻操作
- **虚拟滚动**：大量成员时使用虚拟滚动提升渲染效能

### 用户体验
- **搜寻高亮**：在结果中高亮显示搜寻关键字
- **空状态处理**：提供友好的无结果提示
- **载入状态**：显示资料载入进度

### 资料处理
- **容错处理**：处理缺失栏位或异常资料
- **大小写不敏感**：搜寻时忽略大小写差异
- **特殊字元处理**：正确处理特殊字元和 Unicode

------

## 注意事项

- **资料来源**：搜寻资料来自聊天室详细资讯 API，确保先取得完整成员列表
- **群组处理**：注意 `members` 栏位可能包含子成员，需要递回搜寻
- **即时性**：前端搜寻无法反映即时的线上状态变化，需定期更新资料
- **权限控制**：确保只有聊天室成员才能搜寻其他成员
- **效能考量**：大型聊天室建议使用后端搜寻或分页载入
- **隐私保护**：注意不要暴露敏感的成员资讯