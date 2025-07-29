```javascript
let messageOptions = {
    /* For app to customize notificaiotn message handling */
    data: {
      'title': title + "",
      'body': body + "",
      'badge': badge + "",
      'loc-key': bodyLocKey + "",
      'loc-args': JSON.stringify(bodyLocArgs),
      'type': type + "",
      'payload': JSON.stringify(options.payload),
      'redirect': '/chat',
      'roomTags': JSON.stringify(roomTags),
    },
    /* Andorid Config */
    android: {
      'collapse_key': collapseKey,
    },
    apns: {
      'payload': {
        'headers': {
          'apns-priority': '5',
        },
        'aps': {
          'badge': parseInt(badge || 0),
          "mutable-content" : 1,
          'alert': {
            'title': title + "",
            'locKey': bodyLocKey,
            'locArgs': bodyLocArgs,
          },
          sound: config.notificationSoundIOS || 'default',
        },
      }
    },
    webpush: {
      notification: {
        'title': title + "",
        'body': body + "",
      }
    }
  }
```

bodyLocKey = 'im_loc_{MESSAGE_TYPE}'

bodyLocArgs = ['{MESSAGE TEXT}']

payload = {Message Model}

