# List Pined Messages


### path

/rooms/:id/pined-messages

### Method

GET

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Room ID     |


```
GET /rooms/58871b877390be11d5f1ab30/messages/pined-messages HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {TOKEN}
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

### Response Result

| Name           | Description                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------- |
| totalCount     | Amount of pined messages in the room                                                                    |
| data           | Array of pined Messages                                                                         |
| inspect        | Diagnosis info                                                                                    |

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 2,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "messageTime": {
          "$gt": "2020-10-15T03:50:04.000Z"
        }
      },
      "tookMS": 5
    },
    "data": [
      { Pined Messages }
    ],
  }
}
```
