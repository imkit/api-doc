# Search a Member

## Overview

The search room members feature is implemented on the frontend by first retrieving the complete member list, then performing search and filtering on the client side.

> **Note**: This page describes a frontend implementation approach, not a standalone API endpoint. Member data comes from the response of the [Get a Room](/en/room/room-management/get-a-room) API.

------

## Implementation

### Data Source

Use the **Get Room Details** API to retrieve the complete member list:

```http
GET /rooms/{id}
```

For detailed API usage, please refer to: [List Members](/en/room/room-members/list-members)

### Searchable Fields

From the `members` array in the API response, each member object contains the following searchable fields:

| Field              | Type    | Description                       | Search Use Case            |
| ------------------ | ------- | --------------------------------- | -------------------------- |
| `_id`              | string  | Member unique identifier          | Exact search for a specific member |
| `nickname`         | string  | Member nickname                   | Fuzzy search by nickname   |
| `avatarUrl`        | string  | Member avatar URL                 | Filter members with/without avatars |
| `lastLoginTime`    | string  | Last login time (ISO format)      | Filter by login time range |
| `lastActiveTime`   | string  | Last active time                  | Filter by active time      |
| `isSocketConnected`| boolean | Whether currently online          | Filter online/offline members |
| `description`      | string  | Member description                | Search description content |
| `city`             | string  | City                              | Filter by geographic location |
| `country`          | string  | Country                           | Filter by country          |
| `clientType`       | string  | Client type                       | Categorize by client type  |
| `members`          | array   | Sub-member list (group clients)   | Search sub-members within groups |
| `chatStatus`       | string  | Chat status                       | Filter by chat status      |

------

## Frontend Implementation Examples

### JavaScript Implementation

**Basic Search Function**

```javascript
// Get member list
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
const searchResults = searchMembers(members, '張三', 'nickname');
```

**Advanced Filtering Function**

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
  nickname: '張',
  isOnline: true,
  country: 'Taiwan',
  clientType: 'mobile',
  lastLoginAfter: '2023-01-01'
});
```

**Group Member Search**

```javascript
// Search including group sub-members
function searchAllMembers(members, searchTerm) {
  const results = [];
  
  members.forEach(member => {
    // Search primary members
    if (member.nickname?.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push(member);
    }
    
    // If it's a group client, search within group members
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
        <option value="">All statuses</option>
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
- **Quick lookup**: Quickly find a specific member by nickname
- **Status filtering**: Filter online/offline members
- **Batch operations**: Select members matching certain criteria for batch management

### User Experience
- **Instant search**: Real-time search results without waiting for network requests
- **Multi-criteria filtering**: Support for combined search with multiple conditions
- **Group support**: Support searching sub-members within group clients

### Administrative Features
- **Activity analysis**: Filter active members by last login time
- **Regional statistics**: Analyze member distribution by geographic location
- **Device analysis**: Understand user habits by client type

------

## Best Practices

### Performance Optimization
- **Data caching**: Cache the member list data to avoid redundant requests
- **Debounced search**: Use debounce to prevent excessively frequent search operations
- **Virtual scrolling**: Use virtual scrolling for large member lists to improve rendering performance

### User Experience
- **Search highlighting**: Highlight search keywords in the results
- **Empty state handling**: Provide a friendly no-results message
- **Loading state**: Display data loading progress

### Data Processing
- **Error tolerance**: Handle missing fields or abnormal data gracefully
- **Case insensitivity**: Ignore case differences when searching
- **Special character handling**: Properly handle special characters and Unicode

------

## Notes

- **Data source**: Search data comes from the room details API; ensure the complete member list is retrieved first
- **Group handling**: Note that the `members` field may contain sub-members, requiring recursive search
- **Real-time updates**: Frontend search cannot reflect real-time online status changes; data needs to be refreshed periodically
- **Access control**: Ensure only room members can search for other members
- **Performance considerations**: For large rooms, consider using backend search or paginated loading
- **Privacy protection**: Be careful not to expose sensitive member information
