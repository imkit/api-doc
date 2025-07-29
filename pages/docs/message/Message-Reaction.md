# Send reaction to a message
### path
/messages/:id/reaction

### Method
POST

### Path Parameter
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| id       | text   | Message ID  |

### Post Body
#### Reaction
| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| reaction       | String   | Reaction key/text, could be 'like', 'wow', 'joy', 'sad', and any other custom text.  |



### Response Result
Updated Message
Example
```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "641d3b846dfcad415c2c0f35",
    "message": "@ccc @bbb, Helloこんにちは jTesixmE 13:56:19",
    "messageType": "text",
    "room": "demo-room",
    "sender": {
      "_id": "aaa",
      "nickname": "Alicia",
      "id": "aaa",
      "lastLoginTimeMS": 1679639463219
    },
    "messageTime": "2023-03-24T05:56:20.012Z",
    "reactions": [
      {
        "client": "aaa",
        "reaction": "like"
      }
    ],
    "id": "641d3b846dfcad415c2c0f35",
    "messageTimeMS": 1679637380012,
    "updatedAtMS": 1679639463201,
    "createdAtMS": 1679637380015,
    "reactionCount": 1
  }
}
```
