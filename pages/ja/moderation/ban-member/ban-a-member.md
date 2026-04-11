# Ban a Member

## Overview

Ban a specified user in a chatroom, preventing them from participating in activities within that chatroom. This feature allows platform administrators and chatroom owners to manage members in group chatrooms. When a chatroom has an owner, only platform administrators and the chatroom owner have this permission. After being banned, the user will be unable to send messages or participate in interactions in that chatroom.

------

## API Endpoint

### Ban a Specified User in a Chatroom

Add a specified user to the chatroom's ban list, restricting their activity permissions in that chatroom.

```http
POST /blockStatus/room/{roomID}/{blockee}
```

#### Headers

| Parameter          | Type   | Required | Description    |
| ------------------ | ------ | -------- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅        | Client Key     |
| `IM-Authorization` | string | ✅        | Client Token   |

#### Path Parameters

| Parameter | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| `roomID`  | string | ✅        | Chatroom ID            |
| `blockee` | string | ✅        | ID of the user to ban  |

#### Example Request

**Ban a specific user in a chatroom**

```http
POST /blockStatus/room/demo-room/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript Example:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/blockStatus/room/${roomID}/${blockee}`,
  {},
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL Example:**

```bash
curl -X "POST" "https://your-app.imkit.io/blockStatus/room/{roomID}/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**Success Response (200 OK)**

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `RC`      | number | Response code (0 indicates success) |
| `RM`      | string | Response message                    |
| `result`  | object | Ban status information              |

**Ban Status Object Structure**

| Parameter   | Type   | Description                            |
| ----------- | ------ | -------------------------------------- |
| `appID`     | string | Application ID                         |
| `blockee`   | object | Detailed information of banned user    |
| `blocker`   | string | ID of the user who performed the ban   |
| `room`      | string | Chatroom ID                            |
| `createdAt` | string | Ban creation time                      |
| `updatedAt` | string | Ban update time                        |

**Banned User Object Structure**

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `_id`             | string | User unique ID                          |
| `nickname`        | string | User nickname                           |
| `avatarUrl`       | string | User avatar URL                         |
| `id`              | string | User ID                                 |
| `lastLoginTimeMS` | number | Last login time (millisecond timestamp) |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093304",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "demo-room",
    "createdAt": "2021-08-04T16:08:53.057Z",
    "updatedAt": "2021-08-04T16:08:53.057Z"
  }
}
```

#### Error Response

**401 Unauthorized** - Authentication failed

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

**403 Forbidden** - Insufficient permissions

```json
{
  "RC": 403,
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only platform admin and room owner can block users in group chat rooms"
  }
}
```

**404 Not Found** - Chatroom or user does not exist

```json
{
  "RC": 404,
  "RM": "Resource not found",
  "error": {
    "code": "ROOM_OR_USER_NOT_FOUND",
    "message": "The specified room or user does not exist"
  }
}
```

**409 Conflict** - User is already banned

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already blocked in this room"
  }
}
```

------

## Use Cases

### Chatroom Management
- **Member Control**: Chatroom owners manage group members' participation permissions
- **Violation Handling**: Handle users who send inappropriate content in the chatroom
- **Order Maintenance**: Maintain a healthy discussion environment in the chatroom

### Permission Management
- **Owner Privileges**: Chatroom owners manage members
- **Platform Administration**: Platform administrators assist with chatroom management issues
- **Tiered Management**: Users with different permission levels have different management capabilities

### Security Protection
- **Harassment Prevention**: Block specific users from harassing other members in the chatroom
- **Content Control**: Restrict users who send inappropriate content
- **Environment Protection**: Protect the healthy discussion environment of the chatroom

------

## Notes

- **Permission Restriction**: Only platform administrators and chatroom owners can perform this operation (limited to group chatrooms with an owner)
- **Chatroom Type**: This feature is primarily for group chatrooms that have a designated owner
- **Ban Scope**: The ban is limited to the specified chatroom and does not affect the user's permissions in other chatrooms
- **Immediate Effect**: The ban takes effect immediately; the banned user cannot participate in activities in that chatroom
- **Duplicate Operation**: Banning an already banned user will return a conflict error
- **Record Keeping**: All ban operations are recorded, including the operator and timestamp information
