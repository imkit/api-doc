# Delete messages in certain room from current user's perspective
Tracking user deleted/hide messages in room. The user would not get these deleted messages from room messages api

### path
/messages/user-delete/all-in-room

### Method
POST


### Post Body
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| room          | String | Room ID  |



### Response Result
Count of delete messages

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 4,
    "nModified": 4,
    "ok": 1,
    "room": "demo-eUCMU",
    "totalCount": 4,
    "messages": [
      "6464fc7f24214a185a902676",
      "6464fc8254cc59185df5965c",
      "6464fc842f75f7185994427b",
      "6464fcf0bbecc0185b236fe6"
    ]
  }
}
```