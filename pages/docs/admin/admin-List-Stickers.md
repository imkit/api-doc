# List sticker sets

This API should be used by platform console.

### path

/admin/stickers

### Method

GET

### Headers:

| Field      | Description |
| ---------- | ----------- |
| IM-API-KEY | API Key     |

```
GET /admin/stickers HTTP/1.1
IM-API-KEY: fangho_imkit_0412_2018_001_apikey
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.13.6) GCDHTTPRequest
```

### Response Result

Sticker set list, order by \_id: ascending, updatedAt: descending.

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "_id": "sticker",
        "__v": 0,
        "name": "Sample",
        "zip": {
          "ETag": "\"9f6dea4133ed9fa2d0a7932bd8da9fe2\"",
          "Location": "https://chatserver-upload.s3.amazonaws.com/app-prefix/stickers/sticker/sticker.zip",
          "Key": "app-prefix/stickers/sticker/sticker.zip",
          "Bucket": "chatserver-upload",
          "resourceId": "sticker/sticker.zip"
        },
        "order": 1,
        "images": [
          {
            "ETag": "\"5a5ef7d8a22cc58efbfe14b136cfa17c\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/01.png",
            "Key": "app-prefix/stickers/sticker/01.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/01.png"
          },
          {
            "ETag": "\"ac891e496b7157cd35c65b74fdf94610\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/03.png",
            "Key": "app-prefix/stickers/sticker/03.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/03.png"
          },
          {
            "ETag": "\"67e07f96c4686299fb38ebe2fc515dae\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/02.png",
            "Key": "app-prefix/stickers/sticker/02.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/02.png"
          },
          {
            "ETag": "\"5a5ef7d8a22cc58efbfe14b136cfa17c\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/tab.png",
            "Key": "app-prefix/stickers/sticker/tab.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/tab.png"
          },
          {
            "ETag": "\"2a00bf686b447dc457c59083a641eaac\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/06.png",
            "Key": "app-prefix/stickers/sticker/06.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/06.png"
          },
          {
            "ETag": "\"325c80dddd4762ab6804b04e04ff4526\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/07.png",
            "Key": "app-prefix/stickers/sticker/07.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/07.png"
          },
          {
            "ETag": "\"7b3da7c9b24251a6cf97bece9e6483ee\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/05.png",
            "Key": "app-prefix/stickers/sticker/05.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/05.png"
          },
          {
            "ETag": "\"5110a09a37355332e064f51bd5af5172\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/04.png",
            "Key": "app-prefix/stickers/sticker/04.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/04.png"
          },
          {
            "ETag": "\"9cfdd87da494497034590c328609f429\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/10.png",
            "Key": "app-prefix/stickers/sticker/10.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/10.png"
          },
          {
            "ETag": "\"848187107078190e279cea5e8a921a98\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/09.png",
            "Key": "app-prefix/stickers/sticker/09.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/09.png"
          },
          {
            "ETag": "\"b6ae0036b5f765e1ea98cbfacd6f8cad\"",
            "Location": "https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/08.png",
            "Key": "app-prefix/stickers/sticker/08.png",
            "Bucket": "chatserver-upload",
            "resourceId": "sticker/08.png"
          }
        ],
        "updatedAtMS": 1550553501434,
        "createdAtMS": 1550549103225
      }
    ]
  }
}
```
