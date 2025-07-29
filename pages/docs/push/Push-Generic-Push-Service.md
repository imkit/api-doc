# Generic External Push API URL
External push v2

Setup environment variable `PUSH_GENERIC`

https://github.com/FUNTEKco/chat-server-document/wiki/Configuration

***The generic push service must handle the badge count of the receivers (room members).***

### Method
POST

### Request JSON from Chat Server

| Field | Description |
| ----- | ----------- |
| ...Message | Deflaten message content. Message Model refers to https://github.com/FUNTEKco/chat-server-document/wiki/Model#message |
| roomName      | Custom room name |
| pushToClients | Array of client IDs that the message pushing to |

Message Model

https://github.com/FUNTEKco/chat-server-document/wiki/Model#message


### Request Sample from Chat Server

```javascript
{
    _id: '5dd51a4f21841443cfd3090d',
     message: 'lala',
     room: 'demo-room',
     roomName: 'Demo Room'
     sender:
      { _id: 'sss',
        avatarUrl: 'http://loremflickr.com/240/240/style?1574241882',
        nickname: 'SSS',
        description: 'description la la #1568192464957',
        isRobot: false,
        id: 'sss',
        lastLoginTimeMS: 1568192470942 },
     messageType: 'text',
     appID: 'SampleApp',
     id: '5dd51a4f21841443cfd3090d',
     messageTimeMS: 1574246991222,
     updatedAtMS: 1574246991223,
     createdAtMS: 1574246991223,
     pushToClients: [
       "aaa",
       "bbb",
     ]
 }
```