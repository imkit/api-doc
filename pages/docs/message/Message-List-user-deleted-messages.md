# List user deleted messages
Tracking user deleted message in a room. UI should not display user deleted messages in chat room.

### path
/messages/user-delete

### Method
GET


### Query
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| room          | String | (required) Room ID  |



### Response Result
```javascript
{
   "RC": 0,
   "RM": "OK",
   "result": {
      "totalCount": 10,
      "data": [
        {
           "message": <message-id>,
           "createdAt": <timestamp>,
           "updatedAt": <timestamp> 
        }
      ]
   }
   
}
```
