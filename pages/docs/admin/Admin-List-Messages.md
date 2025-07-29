# List Messages from All Rooms

Messages ordered by message time in descending order.

### path

/admin/messages

### Method

GET

### Headers:

| Field      | Description   |
| ---------- | ------------- |
| IM-API-KEY | Admin API Key |

### URL parameters

| Name      | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| startDate | (optional) query Messages later than or equal to the specified timestamp |
| endDate   | (optional) query Messages earlier than the specified timestamp           |
| limit     | Max number of Messages in response. Default 100.                         |

#### Timestamp

In ISO-8601 format

See Timestamp String
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

### Request Example

```
GET /admin/messages?limit=10&startDate=2020-08-25T15:34:32Z&endDate=2020-08-26T15:34:32Z HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.6) GCDHTTPRequest

```

### Response Result

| Name       | Description                              |
| ---------- | ---------------------------------------- |
| totalCount | Count of messages in the specified range |
| data       | Array of matched Messages                |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 2,
    "data": [
      {
        "_id": "59282c8b0eef3c1c53f3384c",
        "messageType": "text",
        "sender": {
          "_id": "1485248566481",
          "nickname": "Test2",
          "avatarUrl": "https://farm5.staticflickr.com/4187/34380436201_fb445103e6_z_d.jpg",
          "lastLoginTimeMS": 1496976369986
        },
        "message": "hh",
        "messageTimeMS": 1495805067114,
        "updatedAtMS": 1495805067114,
        "createdAtMS": 1495805067114
      },
      {
        "_id": "59282bf00eef3c1c53f33846",
        "messageType": "text",
        "sender": {
          "_id": "1485248560558",
          "nickname": "Test AB",
          "avatarUrl": "https://farm2.staticflickr.com/1261/5110834170_0797f39278_z_d.jpg",
          "lastLoginTimeMS": 1499602388127
        },
        "message": "hhues",
        "messageTimeMS": 1495804912636,
        "updatedAtMS": 1495804912636,
        "createdAtMS": 1495804912636
      }
    ]
  }
}
```
