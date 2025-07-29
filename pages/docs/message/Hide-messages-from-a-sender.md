# Hide messages from a sender
Hide messages from a sender in a room

Note: restrict to room owner or managers.


### path
/messages/hide-by-sender-in-room

### Method
POST


### Post Body
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| room          | String | Room ID  |
| sender        | String | Sender ID  |



### Response Result
Result of affected messages
