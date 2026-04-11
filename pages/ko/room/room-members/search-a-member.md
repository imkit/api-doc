# 멤버 검색

## 개요

채팅방 멤버 검색 기능은 프론트엔드에서 구현됩니다. 먼저 전체 멤버 목록을 가져온 다음 클라이언트 측에서 검색 및 필터링을 수행합니다.

> **주의**: 이 페이지는 프론트엔드 구현 방식을 설명하며 별도의 API 엔드포인트가 아닙니다. 멤버 데이터는 [채팅방 조회](/ko/room/room-management/get-a-room) API의 반환 결과에서 가져옵니다.

------

## 구현 방식

### 데이터 소스

**채팅방 상세 정보 조회** API를 사용하여 전체 멤버 목록을 가져옵니다.

```http
GET /rooms/{id}
```

상세한 API 사용법은 [멤버 목록 조회](/ko/room/room-members/list-members)를 참조하십시오.

### 검색 가능 필드

API 응답의 `members` 배열에서 각 멤버 객체는 다음과 같은 검색 가능 필드를 포함합니다.

| 필드 | 타입 | 설명 | 검색 용도 |
| ------------------ | ------- | ----------------------------- | ---------------------- |
| `_id` | string | 멤버 고유 식별자 | 특정 멤버 정밀 검색 |
| `nickname` | string | 멤버 닉네임 | 닉네임 모호 검색 |
| `avatarUrl` | string | 멤버 아바타 URL | 아바타 유무에 따른 멤버 필터링 |
| `lastLoginTime` | string | 최종 로그인 시간 (ISO 형식) | 로그인 시간 범위별 필터링 |
| `lastActiveTime` | string | 최종 활동 시간 | 활동 시간별 필터링 |
| `isSocketConnected`| boolean | 현재 온라인 여부 | 온라인/오프라인 멤버 필터링 |
| `description` | string | 멤버 설명 | 설명 내용 검색 |
| `city` | string | 도시 | 지리적 위치별 필터링 |
| `country` | string | 국가 | 국가별 필터링 |
| `clientType` | string | 클라이언트 타입 | 클라이언트 타입별 분류 |
| `members` | array | 하위 멤버 목록 (그룹 클라이언트) | 그룹 내 하위 멤버 검색 |
| `chatStatus` | string | 채팅 상태 | 채팅 상태별 필터링 |

------

## 프론트엔드 구현 예시

### JavaScript 구현

**기본 검색 기능**

```javascript
// 멤버 목록 가져오기
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

// 멤버 검색 함수
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

// 사용 예시
const members = await getRoomMembers('room123');
const searchResults = searchMembers(members, '홍길동', 'nickname');
```

**고급 필터링 기능**

```javascript
// 다중 조건 검색
function advancedSearchMembers(members, filters) {
  return members.filter(member => {
    // 닉네임 검색
    if (filters.nickname && 
        !member.nickname?.toLowerCase().includes(filters.nickname.toLowerCase())) {
      return false;
    }
    
    // 온라인 상태 필터링
    if (filters.isOnline !== undefined && 
        member.isSocketConnected !== filters.isOnline) {
      return false;
    }
    
    // 지역 필터링
    if (filters.country && member.country !== filters.country) {
      return false;
    }
    
    // 클라이언트 타입 필터링
    if (filters.clientType && member.clientType !== filters.clientType) {
      return false;
    }
    
    // 최종 로그인 시간 범위 필터링
    if (filters.lastLoginAfter) {
      const lastLogin = new Date(member.lastLoginTime);
      const filterDate = new Date(filters.lastLoginAfter);
      if (lastLogin < filterDate) return false;
    }
    
    return true;
  });
}

// 사용 예시
const filteredMembers = advancedSearchMembers(members, {
  nickname: '홍',
  isOnline: true,
  country: 'Korea',
  clientType: 'mobile',
  lastLoginAfter: '2023-01-01'
});
```

**그룹 멤버 검색**

```javascript
// 그룹 내 멤버 포함 검색
function searchAllMembers(members, searchTerm) {
  const results = [];
  
  members.forEach(member => {
    // 주요 멤버 검색
    if (member.nickname?.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push(member);
    }
    
    // 그룹 클라이언트인 경우 그룹 내 멤버 검색
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

### React 구현 예시

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

  // 멤버 목록 가져오기
  useEffect(() => {
    async function fetchMembers() {
      const memberList = await getRoomMembers(roomId);
      setMembers(memberList);
    }
    fetchMembers();
  }, [roomId]);

  // 실시간 검색 결과
  const searchResults = useMemo(() => {
    return advancedSearchMembers(members, {
      nickname: searchTerm,
      ...filters
    });
  }, [members, searchTerm, filters]);

  return (
    <div>
      {/* 검색 입력창 */}
      <input
        type="text"
        placeholder="멤버 닉네임 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* 필터 옵션 */}
      <select 
        value={filters.isOnline ?? ''} 
        onChange={(e) => setFilters({...filters, isOnline: e.target.value === '' ? null : e.target.value === 'true'})}
      >
        <option value="">전체 상태</option>
        <option value="true">온라인</option>
        <option value="false">오프라인</option>
      </select>
      
      {/* 검색 결과 */}
      <div>
        {searchResults.map(member => (
          <div key={member._id}>
            <img src={member.avatarUrl} alt={member.nickname} />
            <span>{member.nickname}</span>
            <span>{member.isSocketConnected ? '온라인' : '오프라인'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

------

## 사용 시나리오

### 멤버 관리
- **빠른 찾기**: 닉네임을 통해 특정 멤버를 신속하게 찾습니다.
- **상태 선별**: 온라인/오프라인 멤버를 필터링합니다.
- **일괄 작업**: 조건에 맞는 멤버를 선택하여 일괄 관리합니다.

### 사용자 경험
- **실시간 검색**: 네트워크 요청을 기다릴 필요 없는 즉각적인 검색 결과를 제공합니다.
- **다중 조건 필터링**: 다양한 조건의 조합 검색을 지원합니다.
- **그룹 지원**: 그룹 클라이언트 내의 하위 멤버 검색을 지원합니다.

### 관리 기능
- **활동성 분석**: 최종 로그인 시간에 따라 활발한 멤버를 선별합니다.
- **지역 통계**: 지리적 위치에 따라 멤버 분포를 분석합니다.
- **기기 분석**: 클라이언트 타입에 따라 사용자의 사용 습관을 파악합니다.

------

## 최적의 구현 제안

### 성능 최적화
- **데이터 캐싱**: 멤버 목록 데이터를 캐싱하여 중복 요청을 방지합니다.
- **디바운스 검색**: 너무 빈번한 검색 작업을 방지하기 위해 debounce를 사용합니다.
- **가상 스크롤**: 멤버 수가 많을 경우 가상 스크롤을 사용하여 렌더링 성능을 높입니다.

### 사용자 경험
- **검색 하이라이트**: 결과에서 검색 키워드를 강조 표시합니다.
- **빈 상태 처리**: 결과가 없을 때 친절한 안내를 제공합니다.
- **로딩 상태**: 데이터 로딩 진행 상황을 표시합니다.

### 데이터 처리
- **예외 처리**: 누락된 필드나 비정상적인 데이터를 처리합니다.
- **대소문자 미구분**: 검색 시 대소문자 차이를 무시합니다.
- **특수 문자 처리**: 특수 문자와 유니코드를 올바르게 처리합니다.

------

## 주의 사항

- **데이터 소스**: 검색 데이터는 채팅방 상세 정보 API에서 가져오므로 먼저 전체 멤버 목록을 가져왔는지 확인하십시오.
- **그룹 처리**: `members` 필드에 하위 멤버가 포함될 수 있으므로 재귀적 검색이 필요할 수 있습니다.
- **실시간성**: 프론트엔드 검색은 실시간 온라인 상태 변화를 즉각 반영하지 못하므로 데이터를 정기적으로 업데이트해야 합니다.
- **권한 제어**: 채팅방 멤버만 다른 멤버를 검색할 수 있도록 보장하십시오.
- **성능 고려**: 규모가 매우 큰 채팅방의 경우 백엔드 검색 또는 페이지네이션 로딩 사용을 권장합니다.
- **개인정보 보호**: 민감한 멤버 정보가 노출되지 않도록 주의하십시오.
