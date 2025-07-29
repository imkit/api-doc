# Deprecated

# Search Messages

### path

/messages

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### URL Params

| Field | Description              |
| ----- | ------------------------ |
| q     | Mongo query syntax       |
| limit | Max messages in response |

Example

```json
{ "sender": "1485248560558", "message": { "$regex": ".*tt.*" } }
```

```
GET /messages?q=%7B%22sender%22:%20%221485248560558%22,%20%22message%22:%20%7B%22$regex%22:%20%22.*tt.*%22%7D%7D&limit=10 HTTP/1.1
Authorization: fVy7YhqBZqEzNO9LhMmcyA==
IM-CLIENT-KEY: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiIySllwWWhEYVFsSVFsRFN2VkxDTExvMk1QekZmVm05allweHcydnVCcm1rPSIsImNyZWF0ZUF0IjoxNDk5NTc3MjgzMDUwLCJjbGllbnRJZCI6IjliZWQ2ZmRhLThjNTItNGE0My04OWI4LTJjMzdiZmVkMjQ2ZCJ9.bmXdn-rWmHqgX57AH2t7EfNJrm88MEVDO1t7sQTKo74
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Host: 104.199.197.188:3100
Connection: close
User-Agent: Paw/3.1.1 (Macintosh; OS X/10.12.5) GCDHTTPRequest
```

### Respnose Result

| Property   | Description                       |
| ---------- | --------------------------------- |
| totalCount | (int) matched count               |
| data       | (array) Array of matched Messages |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 4,
    "data": [
      {
        "_id": "5961d63c64a75e63bf02c38e",
        "message": "tttt",
        "messageType": "text",
        "sender": {
          "_id": "1485248560558",
          "nickname": "Test AB",
          "avatarUrl": "https://farm2.staticflickr.com/1261/5110834170_0797f39278_z_d.jpg",
          "lastLoginTimeMS": 1499602388127
        },
        "messageTimeMS": 1499584060378
      },
      {
        "_id": "595efe6364a75e63bf02c387",
        "message": "tthji",
        "sender": {
          "_id": "1485248560558",
          "nickname": "Test AB",
          "avatarUrl": "https://farm2.staticflickr.com/1261/5110834170_0797f39278_z_d.jpg"
          "lastLoginTimeMS": 1499602388127
        },
        "messageType": "text",
        "messageTimeMS": 1499397731177
      },
      {
        "_id": "5930e1080eef3c1c53f33874",
        "message": "though hi\nttyl\nmuyu9iy",
        "sender": {
          "_id": "1485248560558",
          "nickname": "Test AB",
          "avatarUrl": "https://farm2.staticflickr.com/1261/5110834170_0797f39278_z_d.jpg",
          "lastLoginTimeMS": 1499602388127
        },
        "messageType": "text",
        "messageTimeMS": 1496375560050
      },
      {
        "_id": "5900c6851c563b118362634c",
        "message": "ttgccf",
        "sender": {
          "_id": "1485248560558",
          "nickname": "Test AB",
          "avatarUrl": "https://farm2.staticflickr.com/1261/5110834170_0797f39278_z_d.jpg"
          "lastLoginTimeMS": 1499602388127
        },
        "messageType": "text",
        "messageTimeMS": 1493223045250
      }
    ]
  }
}
```
