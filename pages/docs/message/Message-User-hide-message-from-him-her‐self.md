# User hide/delete messages from him/her-self
Tracking user deleted/hide message.

### path
/messages/user-delete

### Method
POST


### Post Body
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| room          | String | Room ID  |
| messages      | [String] | Array of message IDs  |



### Response Result
Count of user deleted/hide messages
