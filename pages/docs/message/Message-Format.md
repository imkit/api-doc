# Sending Message Format
| Field       | Type   | Description |
| -------     | ------ | ----------- |
| _id         | String | (Optional), if provided, update the existing message by id 
| message     | String | Text message content |
| messageType | String | Custom message type |
| room        | String | Room ID |
| originalUrl | String | (optional) Media URL |
| thumbnailUrl | String | (optional) Thumbnail URL |
| width       | Number (Int) | (optional) Image or video width |
| height      | Number (Int) | (optional) Image or video height |
| duration    | Number (Long) | (optional) Video or audio length in seconds |
| latitude    | Number (Double) | (optional) Location latitude |
| longitude   | Number (Double) | (optional) Location longitude |
| reply       | String | (optional) a Message ID that current message replies to |
| sticker     | String | (optional) Sticker ID |
| extra       | Object | (optional) Any extra JSON object |
| template    | Object | (optional) Template object, compatible to LINE template. https://developers.line.biz/en/reference/messaging-api/#template-messages |
| contents    | Object | (optional) Contents object, compatible to LINE flex. https://developers.line.biz/en/reference/messaging-api/#flex-message |
| mentions   | Array[String] | (Optional) List of mentioning clients  |
| batchID     | String | (Reserved) System assigned for batch message |
| reactions   | Array<Reaction> | (Reserved) Member reactions. System maintained. | 

```javascript
var message = {};
//message['message'] = 'text message content';
message['message'] = {'customProperty': 'custom content'};
message['room'] = $('#room').val();
socket.emit('chat message', message, function(ack) {
  if (ack && ack.RC !== 0) {
    console.error(ack);
  } else {
    console.log(ack);
  }
});
```
# Predefined Message Types
| MessageType  |
| ------------ |
| text         |
| image        |
| video        |
| audio        |
| location     |
| sticker      |
| url          |
| file         |
| joinRoom     |
| leaveRoom    |
| addMembers   |
| deleteMembers |
| cancelInvitations |
| recall |
| encrypted    |
| announcement    |
| flex    |


### Text
```javascript
{
  "_id": "58bec67de0eeac088c70ef04",
  "message": "aaaaaa",
  "messageType": "text",
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  },
  "messageTime": "2017-03-07T14:41:01.934Z",
  "messageTimeMS": 1488897661934,
  "id": "58bec67de0eeac088c70ef04"
}
```

### URL
```javascript
{
  "_id": "58bec67de0eeac088c70ef04",
  "message": "aaaaaa",
  "messageType": "url",
  "url": "http://example.com",
  "extra": {
     "title": "web site title",
     "description": "web description",
     "images": "preview image url"
  },
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  },
  "messageTime": "2017-03-07T14:41:01.934Z",
  "messageTimeMS": 1488897661934,
  "id": "58bec67de0eeac088c70ef04"
}
```

### File
```javascript
{
  "_id": "58bec67de0eeac088c70ef04",
  "messageType": "file",
  "url": "file-url",
  "extra": {
     "title": "File display name",
     "mimetype": "File mime-type"
  },
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  },
  "messageTime": "2017-03-07T14:41:01.934Z",
  "messageTimeMS": 1488897661934,
  "id": "58bec67de0eeac088c70ef04"
}
```

### Join Room
```javascript
{
  "_id": "58bec8fc63a60808a2522be0",
  "messageType": "joinRoom",
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  },
  "messageTime": "2017-03-07T14:51:40.522Z",
  "messageTimeMS": 1488898300522,
  "id": "58bec8fc63a60808a2522be0"
}
```
### Leave Room
```javascript
{
  "_id": "58bec8ec63a60808a2522bdf",
  "messageType": "leaveRoom",
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  },
  "messageTime": "2017-03-07T14:51:24.386Z",
  "messageTimeMS": 1488898284386,
  "id": "58bec8ec63a60808a2522bdf"
},
```

### Add Members
```javascript
{
      "reactions": [],
      "_id": "5f53905b422b320d069b85ef",
      "room": "demo-room",
      "messageType": "addMembers",
      "sender": {
        "_id": "sss",
        "nickname": "Elsa",
        "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
        "id": "sss",
        "lastLoginTimeMS": 0
      },
      "message": "BBB, ccc", // nicknames
      "extra": {
        "invitees": [
          {
            "_id": "bbb",
            "avatarUrl": "",
            "nickname": "BBB"
          },
          {
            "_id": "ccc",
            "avatarUrl": "",
            "nickname": "ccc"
          }
        ]
}
```

### Delete Member
```javascript
{
      "reactions": [],
      "_id": "5f5391cb06def70daafcdb9f",
      "room": "demo-room",
      "messageType": "deleteMembers",
      "sender": {
        "_id": "sss",
        "nickname": "Elsa",
        "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
        "id": "sss",
        "lastLoginTimeMS": 0
      },
      "extra": {
        "members": [{
          "_id": "ccc",
          "avatarUrl": "",
          "nickname": "ccc"
        }]
      },
      "message": "ccc", // nickname
      "appID": "SampleApp",
      "id": "5f5391cb06def70daafcdb9f",
      "messageTimeMS": 1599312331647,
      "updatedAtMS": 1599312331648,
      "createdAtMS": 1599312331648,
      "reactionCount": 0
}
```

### Cancel Invitations
```
{
  "reactions": [],
  "_id": "5f698af00d25f1065933b258",
  "room": "demo-room",
  "messageType": "cancelInvitations",
  "sender": {
    "_id": "sss",
    "nickname": "Elsa",
    "avatarUrl": "https://lumiere-a.akamaihd.net/v1/images/f_frozen2_header_mobile_18432_d258f93f.jpeg",
    "id": "sss",
    "lastLoginTimeMS": 0
  },
  "message": "BBB, ccc",
  "extra": {
    "invitees": [
    {
       "_id": "bbb",
       "avatarUrl": "",
       "nickname": "BBB"
    },
    {
       "_id": "ccc",
       "avatarUrl": "",
       "nickname": "ccc"
     }
  ]
}
```

### Recall Message
```
{
  "_id": "58bec8c363a60808a2522bde",
  "messageType": "recall",
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  }
}
```

### Announcement
```javascript
{
  "_id": "58bec67de0eeac088c70ef04",
  "message": "Announcement text content",
  "messageType": "announcement",
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  },
  "messageTime": "2017-03-07T14:41:01.934Z",
  "messageTimeMS": 1488897661934,
  "id": "58bec67de0eeac088c70ef04"
}
```

### Payment
```javascript
{
    "_id": "61e15be274541c0028a278ba",
    "messageType": "payment",
    "message": "嗨",
    "sender": {
        "_id": "ho2",
        "avatarUrl": null,
        "nickname": "ho2",
        "description": "hi",
        "id": "ho2",
        "lastLoginTimeMS": 1644245541593
    },
    "extra": {
        "type": "request", // or response
        "payer": {
            "id": "ho2",
            "nickname": "ho2",
        },
        "payee": {
            "id": "ho3",
            "nickname": "ho3",
        },
        "value": 1500,
        "timestamp": 1644245541593,
        "status": 0,
        "method": 0,
        "currency": "NTD", // or USD
        "remark": "備註"
    },
    "room": "5e773096df548b0028a541aa",
    "messageTime": "2022-01-14T11:17:54.546Z",
    "id": "61e15be274541c0028a278ba",
    "messageTimeMS": 1642159074546,
    "updatedAtMS": 1642159074547,
    "createdAtMS": 1642159074547,
}
```

### Encrypted Message

The message filed should formatted as:
```
{Base64 Encoded MEMBER_ID}:{Base64 Encoded AES IV}:{Base64 Encoded AES KEY}[|{Base64 Encoded MEMBER_ID}:{Base64 Encoded AES IV}:{Base64 Encoded AES KEY}:]|{Base64 Encoded AES-Encrypted Message}

=
Base64(CLIENT_1):Base64(Encrypt(AES_IV, CLIENT_1_PUBLIC_KEY)):Base64(Encrypt(AES_KEY, CLIENT_1_PUBLIC_KEY))|base64(CLIENT_2):Base64(Encrypt(AES_IV, CLIENT_2_PUBLIC_KEY)):Base64(Encrypt(AES_KEY, CLIENT_2_PUBLIC_KEY))|...|AES_ENCRYPTED_MESSAGE

```

RSA Cipher Parameter: **RSA/None/PKCS1Padding**

AES Cipher Transformation: AES/CBC/PKCS5Padding




```javascript
{
  "_id": "5c2f2e52a2051b6289d3b7ad",
  "messageType": "encrypted",
  "message": "c3Nz:mIFJcaXk58v2LSakX1FohJNurf8mPy2fzGHAxpBZwVReLz1+3iRfamjfRfk/43mnILH9vaw9Emh9twoMeTyUoaOHTpKL+m/oDD60l0LXLAuFPxe6m6TI+Df7ZBujufNTMomn8P19w7vDfuF0ccOH1dxXyVn3kfX6yMp4b/oIoGoERp62oGQr92gYM1VeJtCxTFanAvfMb76BtSYM5dzEfSOYj0TDdp4Uv/ZQqTqbgu+GReuN+3BkMmZ2YDMrSS9WxZRN9UvpAJ/PePrqFxU6UcTae94A9ntYaOb1Gd24XoaAYcqNLNN/sDDXB8uS4aH86OQGb4WaEpQf6AxjzuxiFQ==:sUXk6iLZBBGBO69GtcbZKfscIBGcQSl2z0D1V4CzHTwDqShjzM5Jheaw29jmjE0w3oC0ZJr0fb8+UZz7K2Lg7rhFZlbjQUgZjbXPipCzoJkulHgJoP1KO1/qR+Jb1S5ALsUrugNbeYJmlZIapiYv2D7iMDpG8vmlGQCZBVukYkw55Nqs2qcs9qvp76gY3Gahrbhc8KRi8V6knm80GpmBspuDuGFBd0k544S2C5aKJpA//c/y/Ik2zEKljsGxTcFb9TdbXBTWTVfGrTYjNc+KoH4k50yO/aIyQRqlC3GewbfsnbnhmcUJguEOr+31mzvBQlqq8NkhZkiSeMqzHhXRFg==|YWFh:jtZYTdT+teVpAKCVKg6uGd+/FPseIaKZM5zeMe84xovY3wGaK8c4LdgNVtPEj0/E6wbZbMsD05fFmjwvydkZca73/P9Mp5GRR5QkE1SzlYupFz/pJimF8G2xc6WcY/Xyn1w0mTzvXE7JP6N/4n49/GF+Fmbne3Fe2G4fsghpeK0SkHKFnig+XA0nWXv/VJKne5sUmARj2Ti7g39mmtNbn1mTx8LoyRIsSZokZbjN5SfoiLBjfnYg2av7umx/CIY6xyzdR3n0s6KaPjKNohf48326B9Tjb9mB3KlVRgoIjbe5GsVoRMUYg2SN1s1qFf2x5OaZ7528GExHd4KehJwNtQ==:pEnpV/c4rR+N9tz6Ntu/4eUpd/Z3d0z5+ZuXBmCzRF3NM7afnXhqSyyy+FEinpMy+3HIDV1hoBS9Xz+bvh/tNZzhuwV/0rPPhPKmR9jGoJ4ke+Jgw/zgGo9+0D2ZJqDg0Z3Zxn0KRypjQu6Wgf5qYtv/3zOx1DPHMhK9poUvm+gY0Bg3zvfmLbf2C5QJoBPd74lxbkvsoNBXjFKc7oG/ARteSHxSc5mocrf69Dcg/pUyDXE/mp1vEDmeWHo+XwHmoGIMoR19ems86wlNtWns/mu9VqvPsfPVd1U2HA7i3Ma0vWFiMEbsK8P5bbajfprsZfG5UJf2P9EW7VOfkDbmlQ==|HqF/6yHme/aBBGpbDShEiotOi6SmJdrw5wrOLhY7rJIY++CTG1VBudhw2x3E+gUTsK2kt5QiTBfOKklQqwt8hw==",
  "sender": {
    "_id": "aaa",
    "nickname": "Karyn",
    "avatarUrl": "",
    "description": "description la la #1546595914843",
    "isRobot": false,
    "lastLoginTime": "2019-01-04T09:58:40.002Z",
    "lastLoginTimeMS": 1546595920002,
    "id": "aaa"
  },
  "createdAt": "2019-01-04T09:58:42.243Z",
  "updatedAt": "2019-01-04T09:58:42.243Z",
  "messageTime": "2019-01-04T09:58:42.243Z",
  "messageTimeMS": 1546595922243,
  "updatedAtMS": 1546595922243,
  "id": "5c2f2e52a2051b6289d3b7ad"
}

```

### WebRTC Call Messages
#### waitingCall
```javascript
{
  "_id": "58bec8c363a60808a2522bde",
  "messageType": "waitingCall",
  "rtcSession": "58bec8c363a60808a2522000"
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  }
}
```
#### missingCall
{
  "_id": "58bec8c363a60808a2522bde",
  "messageType": "missingCall",
  "rtcSession": "58bec8c363a60808a2522000"
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  }
}
#### endCall
{
  "_id": "58bec8c363a60808a2522bde",
  "messageType": "endCall",
  "rtcSession": "58bec8c363a60808a2522000"
  "duration": 120000,
  "sender": {
    "_id": "1485248560558",
    "nickname": "Test AB",
    "avatarUrl": "http://example.com/avatarUrl",
    "lastLoginTime": "2017-03-07T14:40:57.470Z",
    "lastLoginTimeMS": 1488897657470,
    "id": "1485248560558"
  }
}