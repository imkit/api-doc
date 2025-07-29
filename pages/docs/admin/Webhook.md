# Register Webhook to receive messages
You can register any webhook for each room for receiving messages of specified rooms.

See Model->Room->webhook property

https://github.com/FUNTEKco/chat-server-document/wiki/Model#room 


# Webhook incoming data

We would POST a JSON content with the following fields to the specified webhook URL.

| Field | type | Description |
| ----  | ---- |----------- |
| appID | String | App ID      |
| clientID | String | Sender ID |
| roomID   | String | Room ID where the message or event sent to |
| event | String | Event Type |
| botState | String | Current bot state of the room. Your robot may determine the reaction by state and message if your robot is implement as a finite state machine. |
| data  | Object | Message or event sent to the room |

## Events

### Join Room

```json
{  
   "roomID":"demo-room",
   "event":"JOIN_ROOM",
   "data":{  
      "room":"demo-room",
      "sender":{  
         "_id":"sss",
         "nickname":"Desirae",
         "isRobot":false,
         "lastLoginTimeMS":0,
         "id":"sss"
      },
      "members":[  
         {  
            "_id":"sss",
            "nickname":"Desirae",
            "isRobot":false,
            "lastLoginTimeMS":0,
            "id":"sss"
         }
      ]
   }
}
```

## Add Members

```json
{  
   "roomID":"demo-room",
   "event":"ADD_MEMBERS",
   "data":{  
      "room":"demo-room",
      "sender":{  
         "_id":"sss",
         "nickname":"Desirae",
         "isRobot":false,
         "lastLoginTimeMS":0,
         "id":"sss"
      },
      "members":[  
         {  
            "_id":"robot001",
            "nickname":"Doris Robot",
            "isRobot":true,
            "lastLoginTimeMS":0,
            "id":"robot001"
         }
      ]
   }
}
```

## Delete Members

```json
{  
   "roomID":"demo-room",
   "event":"DELETE_MEMBERS",
   "data":{  
      "room":"demo-room",
      "sender":{  
         "_id":"sss",
         "nickname":"Desirae",
         "isRobot":false,
         "lastLoginTimeMS":0,
         "id":"sss"
      },
      "members":[  
         {  
            "_id":"ccc",
            "nickname":"Aurora",
            "isRobot":false,
            "lastLoginTimeMS":0,
            "id":"ccc"
         }
      ]
   }
}
```

## Message

```json
{  
   "roomID":"demo-room",
   "event":"MESSAGE",
   "data":{  
      "_id":"5c1ddf2d1536bbb6c49f7cfe",
      "message":"Bonjour 2",
      "room":"demo-room",
      "sender":{  
         "_id":"sss",
         "nickname":"Desirae",
         "isRobot":false,
         "avatarUrl":"",
         "description":"description la la #1543989664813",
         "lastLoginTime":"2018-12-05T06:01:06.092Z",
         "lastLoginTimeMS":1543989666092,
         "id":"sss"
      },
      "messageType":"text",
      "appID":"SampleApp",
      "__v":0,
      "messageTime":"2018-12-22T06:52:29.380Z",
      "messageTimeMS":1545461549380,
      "id":"5c1ddf2d1536bbb6c49f7cfe"
   }
}
```


# Webhook response JSON (Response from Your Webhook Web Service).
| Field | Type | Description |
| ----- | ---- | ----------- |
| senderID | String | (Optional} Reply message or send message to room with specified Send ID |
| toBotState | String | (Optional) Transition room to specified bot state. If you want to keep current state, specify the current state |
| data | Message | (Optional) Reply message content |

```
{
  "toBotState": null,
  "data": null
}
```

# Sample Application

## Robot reply message
![](https://github.com/FUNTEKco/chat-server-document/blob/master/pinchat-webhook-robot.png)

## Custom push notiifcation
![](https://github.com/FUNTEKco/chat-server-document/blob/master/pinchat-webhook-push.png?raw=true)

