# Get sticker resource on S3
This API is open to all client, no auth is required.

### path
/stickers/res

### Method
GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |

### URL Query Parameters
| Key           | Description  |
| ------------- | ------------ |
| resourceId    | Resource ID. `${stickerId}/${fileName}`  |


```
GET /stickers/res?resourceId=sticker%2Ftab.png HTTP/1.1
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.8 (Macintosh; OS X/10.13.6) GCDHTTPRequest
```

### Response Result
Sticker list, ordered by _id: ascending, updatedAt: descending.

```http
HTTP/1.1 302 Found
X-Powered-By: Express
Access-Control-Allow-Origin: *
Location: https://chatserver-upload.s3.ap-southeast-1.amazonaws.com/app-prefix/stickers/sticker/tab.png?AWSAccessKeyId=AKIAJVHZCB65R3HFB2UA&Expires=1550554820&Signature=2aiPySjNyrp013A6aRsQmRobK2U%3D
Date: Tue, 19 Feb 2019 05:25:20 GMT
Connection: close
Transfer-Encoding: chunked

```