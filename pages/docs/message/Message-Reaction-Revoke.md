# Revoke user's reaction from a message
### path
/messages/:id/reaction?reaction={reaction}

### Method
DELETE

### Path Parameter
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| id       | text   | Message ID  |

### Query Parameter
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| reaction      | text   | The reaction that the client desires to revoke from the message  |


### Response Result
Updated Message
