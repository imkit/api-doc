# Search Member

## Overview

The member search functionality is implemented on the frontend by first retrieving the complete member list, then performing search and filtering on the client side. This approach provides real-time search experience, reduces network requests, and supports combination filtering with multiple search criteria.

------

## Implementation Method

### Data Source

Use the **Get Room Details** API to obtain the complete member list:

```http
GET /rooms/{id}
```

For detailed API usage, please refer to: [List Members](/room/room-members/list-members)

### Searchable Fields

From the `members` array in the API response, each member object contains the following searchable fields:

| Field              | Type    | Description                       | Search Purpose              |
| ------------------ | ------- | --------------------------------- | -------------------------- |
| `_id`              | string  | Member unique identifier          | Exact search for specific member |
| `nickname`         | string  | Member nickname                   | Fuzzy search by nickname   |
| `avatarUrl`        | string  | Member avatar URL                 | Filter members with/without avatar |
| `lastLoginTime`    | string  | Last login time (ISO format)     | Filter by login time range |
| `lastActiveTime`   | string  | Last active time                  | Filter by active time      |
| `isSocketConnected`| boolean | Whether currently online          | Filter online/offline members |
| `description`      | string  | Member description                | Search description content |
| `city`             | string  | City                              | Filter by geographic location |
| `country`          | string  | Country                           | Filter by country          |
| `clientType`       | string  | Client type                       | Filter by client type      |
| `members`          | array   | Sub-member list (group clients)   | Search sub-members in groups |
| `chatStatus`       | string  | Chat status                       | Filter by chat status      |

------

## Frontend Implementation Examples

### JavaScript Implementation

**Basic Search Functionality**

```javascript
// Get member list
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

// Search members function
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

// Usage example
const members = await getRoomMembers('room123');
const searchResults = searchMembers(members, 'John', 'nickname');
```

**Advanced Filtering Functionality**

```javascript
// Multi-criteria search
function advancedSearchMembers(members, filters) {
  return members.filter(member => {
    // Nickname search
    if (filters.nickname && 
        !member.nickname?.toLowerCase().includes(filters.nickname.toLowerCase())) {
      return false;
    }
    
    // Online status filter
    if (filters.isOnline !== undefined && 
        member.isSocketConnected !== filters.isOnline) {
      return false;
    }
    
    // Region filter
    if (filters.country && member.country !== filters.country) {
      return false;
    }
    
    // Client type filter
    if (filters.clientType && member.clientType !== filters.clientType) {
      return false;
    }
    
    // Last login time range filter
    if (filters.lastLoginAfter) {
      const lastLogin = new Date(member.lastLoginTime);
      const filterDate = new Date(filters.lastLoginAfter);
      if (lastLogin < filterDate) return false;
    }
    
    return true;
  });
}

// Usage example
const filteredMembers = advancedSearchMembers(members, {
  nickname: 'John',
  isOnline: true,
  country: 'Taiwan',
  clientType: 'mobile',
  lastLoginAfter: '2023-01-01'
});
```

**Group Member Search**

```javascript
// Search including group members
function searchAllMembers(members, searchTerm) {
  const results = [];
  
  members.forEach(member => {
    // Search main members
    if (member.nickname?.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push(member);
    }
    
    // If it's a group client, search group members
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

### React Implementation Example

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

  // Get member list
  useEffect(() => {
    async function fetchMembers() {
      const memberList = await getRoomMembers(roomId);
      setMembers(memberList);
    }
    fetchMembers();
  }, [roomId]);

  // Real-time search results
  const searchResults = useMemo(() => {
    return advancedSearchMembers(members, {
      nickname: searchTerm,
      ...filters
    });
  }, [members, searchTerm, filters]);

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search member nickname..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Filter options */}
      <select 
        value={filters.isOnline ?? ''} 
        onChange={(e) => setFilters({...filters, isOnline: e.target.value === '' ? null : e.target.value === 'true'})}
      >
        <option value="">All Status</option>
        <option value="true">Online</option>
        <option value="false">Offline</option>
      </select>
      
      {/* Search results */}
      <div>
        {searchResults.map(member => (
          <div key={member._id}>
            <img src={member.avatarUrl} alt={member.nickname} />
            <span>{member.nickname}</span>
            <span>{member.isSocketConnected ? 'Online' : 'Offline'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

------

## Use Cases

### Member Management
- **Quick Search**: Quickly find specific members by nickname
- **Status Filter**: Filter online/offline members
- **Batch Operations**: Select members matching criteria for batch management

### User Experience
- **Real-time Search**: Instant search results without waiting for network requests
- **Multi-criteria Filter**: Support combination search with multiple conditions
- **Group Support**: Support searching sub-members within group clients

### Management Functions
- **Activity Analysis**: Filter active members by last login time
- **Regional Statistics**: Analyze member distribution by geographic location
- **Device Analysis**: Understand user usage patterns by client type

------

## Best Practice Recommendations

### Performance Optimization
- **Data Caching**: Cache member list data to avoid repeated requests
- **Debounced Search**: Use debounce to avoid overly frequent search operations
- **Virtual Scrolling**: Use virtual scrolling for better rendering performance with large member lists

### User Experience
- **Search Highlighting**: Highlight search keywords in results
- **Empty State Handling**: Provide friendly no-results messages
- **Loading State**: Show data loading progress

### Data Processing
- **Error Handling**: Handle missing fields or abnormal data
- **Case Insensitive**: Ignore case differences when searching
- **Special Character Handling**: Properly handle special characters and Unicode

------

## Notes

- **Data Source**: Search data comes from room details API, ensure complete member list is retrieved first
- **Group Handling**: Note that `members` field may contain sub-members, requiring recursive search
- **Real-time**: Frontend search cannot reflect real-time online status changes, data needs periodic updates
- **Permission Control**: Ensure only room members can search other members
- **Performance Consideration**: Large rooms recommend using backend search or paginated loading
- **Privacy Protection**: Be careful not to expose sensitive member information