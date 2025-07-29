# External Push API URL
External push v1. Legacy.

Setup environment variable `PUSH`

https://github.com/FUNTEKco/chat-server-document/wiki/Configuration

### Method
POST

### Request JSON from Chat Server

| Field | Description |
| ----- | ----------- |
| payload  | Deflaten message content. | 
| alert    | FCM/APNs Alert content |
| toClient | Receiver Client ID |
| badge    | Total unread messages of the target client |

Message Model

https://github.com/FUNTEKco/chat-server-document/wiki/Model#message


### Request Sample from Chat Server

```javascript
{
    _id: '5dd51a4f21841443cfd3090d',
     message: 'lala',
     room: 'demo-room',
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
     toClient: 'target-client-id',
     badge: 100
 }
```