# Send message to multiple clients of direct-chat rooms

### path

/messages/batch

### Method

POST

### Post Body

#### Message

| Field          | Type        | Description                                                                |
| -------------- | ----------- | -------------------------------------------------------------------------- |
| message        | text        | Text Message content                                                       |
| messageType    | String      | message type                                                               |
| ...            | ...         | Other message fields                                                       |
| sender         | String      | (optional) Send message with specified sender ID, only available for Admin |
| paras          | [Parameter] | Array of parameter objects                                                 |
| push           | Boolean     | Enable or disable push notification, default disabled.                     |
| skipTotalBadge | Boolean     | Skip computing sender's total badge, default false.                        |

#### Parameter object

| Field      | Type   | Description                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------- |
| receiver   | String | (Optional) receiver Client ID.                                                  |
| room       | String | (Optional) Room ID. If this field is specified, receiver field would be ignored |
| %patterns% | String | (Optional) Pattern keyword to replace template variables in message             |

#### Note:

replacing pattern must be wrapped in $ symbols.

```
POST /messages/batch HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.14.6) GCDHTTPRequest
Content-Length: 169

{
   "messageType":"text",
   "message":"Batch test cPTI34jXvLBUifnB2I501e4WMfATeouo",
   "push":false,
   "extra":{
      "key1":"$pattern1$",
      "key2":"$pattern2$"
   },
   "paras":[
      {
         "receiver":"kokodemo1",
         "$pattern1$":"value1 for kokodemo1",
         "$pattern2$":"value2 for kokodemo1"
      },
      {
         "room":"demo-room",
         "$pattern1$":"value1 for demo-room",
         "$pattern2$":"value2 for demo-room"
      }
   ]
}
```

#### Outcome

The above request would send messages with

```
A message to direct chat room of pair sender and kokodemo1 with message content
{
   "room": "SOME_DIRECT_CHAT_ROOM_ID"
   "messageType":"text",
   "message":"Batch test cPTI34jXvLBUifnB2I501e4WMfATeouo",
   "push":false,
   "extra":{
      "key1":"value1 for kokodemo1",
      "key2":"value2 for kokodemo1"
   }
}

A message to direct chat room of pair sender and kokodemo2 with message content
{
   "room": "SOME_DIRECT_CHAT_ROOM_ID"
   "messageType":"text",
   "message":"Batch test cPTI34jXvLBUifnB2I501e4WMfATeouo",
   "push":false,
   "extra":{
      "key1":"value1 for kokodemo2",
      "key2":"value2 for kokodemo2"
   }
}
```

### Response Result

Response OK if batch message are successfully added to processing queue.

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "batchID": "Created-Batch-ID",
    "count": "length of paras"
  }
}
```
