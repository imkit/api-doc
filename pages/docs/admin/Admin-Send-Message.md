# Send message via platform admin
### path
/messages

### Method
POST

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-API-KEY       | API Key      |


### Post Body
#### Message

More message types and fields please refer to

https://github.com/FUNTEKco/chat-server-document/wiki/%5BMessage%5D-Format

| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| message       | String | [Required] Message content      |
| messageType   | String | [Required] Custom message type  |
| room          | String | [Required] Room ID |
| sender        | String | [Required] Send message with specified sender ID |
| push          | Boolean | [Optional] Whether Push Notification to room members. Default is **true**. |
| skipTotalBadge | Boolean | [Optional] Skip computing sender's total badge. Default is **false** |
| mentions   | Array[String] | [Optional] List of mentioning clients  |

```
POST /messages/ HTTP/1.1
IM-API-KEY: API KEY
Content-Type: application/json; charset=utf-8
Host: Chat Server Host Name
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.13.6) GCDHTTPRequest
Content-Length: 75

{"room":"demo-room","message":"hhhooo","messageType":"text","sender":"aaa"}

```

### Response Result
Sent message data

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58bf8f1dc3b24c04d19d9add",
    "room": "58871b877390be11d5f1ab30",
    "message": "hhhooo",
    "messageType": "announcement",
    "sender": null,
    "appID": "SampleApp",
    "__v": 0,
    "messageTimeMS": 1488949021290,
    "updatedAtMS": 1488949021290,
    "createdAtMS": 1488949021290
  }
}
```