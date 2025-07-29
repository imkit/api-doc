# List Room Messages [Deprecated]

Messages ordered by message ID.

### path

/rooms/:id/messages

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Path Parameters

| Name | Description |
| ---- | ----------- |
| :id  | Room ID     |

### URL parameters

| Name          | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| beforeMessage | (optional) query Messages earlier than the specified Message ID |
| limit         | Max number of Messages in response                              |
| q             | Mongo query syntax                                              |

search example

```
q={"message": {"$regex": "hh.*"}}
```

```
GET /rooms/58871b877390be11d5f1ab30/messages?limit=10&q=%7B%22message%22:%20%7B%22$regex%22:%20%22hh.*%22%7D%7D HTTP/1.1
IM-CLIENT-KEY: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiIySllwWWhEYVFsSVFsRFN2VkxDTExvMk1QekZmVm05allweHcydnVCcm1rPSIsImNyZWF0ZUF0IjoxNDk5NTc3MjgzMDUwLCJjbGllbnRJZCI6IjliZWQ2ZmRhLThjNTItNGE0My04OWI4LTJjMzdiZmVkMjQ2ZCJ9.bmXdn-rWmHqgX57AH2t7EfNJrm88MEVDO1t7sQTKo74
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

### Response Result

| Name       | Description                   |
| ---------- | ----------------------------- |
| totalCount | Count of messages in the room |
| data       | Array of matched Messages     |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 65,
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
