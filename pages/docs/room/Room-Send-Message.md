# Send a Message to room via API.

Not required when sending message via Socket.

**If client is not in the room or room does not exist, response 403**

### path

/rooms/:roomId/message

| Field  | Description |
| ------ | ----------- |
| roomId | Room ID     |

### Method

POST

### Post Body

#### Message

| Field       | Type          | Description                                                |
| ----------- | ------------- | ---------------------------------------------------------- |
| message     | Any           | Message content                                            |
| messageType | String        | Custom message type                                        |
| \_id        | String        | (Optional), if provided, update the existing message by id |
| mentions    | Array[String] | List of mentioning client IDs                              |

```
POST /rooms/demo-room/message HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Authorization: {TOKEN}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.0.16 (Macintosh; OS X/10.11.6) GCDHTTPRequest
Content-Length: 83

{"message":"hhhooo","messageType":"announcement"}

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
