# Create or update a user group/team/organization

This API should be used by server side.

An `user group` is not a group chat room. An `user group` can join chat rooms. All members in the `user group` can send and receive messages of the rooms.

The `user group id` is a special`user id` represents a group. You can add the user group to a room by put the user group `id` into room `members` or `invitees`.

### path
/admin/groups

### Method
POST

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-API-KEY    | Platform API Key |

### Request Parameters

| Name        | Description  |
| ----------- | ------------ |
| _id         | (optional) Group ID    |
| nickname    | Title of the group     |
| avatarUrl   | Group cover image   |
| members     | Array of member ids   |

##### Create or update a user group/team/organization

```javascript
axios.post(
  "https://imkit-dev.funtek.io/admin/groups",
  {
    nickname: "Demo Team",
    avatarUrl: "http://example.com/avatarUrl",
    _id: "demo-team",
    "members":["aaa","sss"]
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### Response Result

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "members": [
      "aaa",
      "sss"
    ],
    "_id": "demo-team",
    "avatarUrl": "http://example.com/avatarUrl",
    "createdAt": "2023-04-01T13:46:12.228Z",
    "nickname": "Demo Team",
    "updatedAt": "2023-04-01T13:46:31.589Z",
  }
}
```