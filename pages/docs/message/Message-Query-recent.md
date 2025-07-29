# Query most recent messages.

### path

/messages/recent

### Method

GET

### Headers:

| Field            | Description         |
| ---------------- | ------------------- |
| IM-Authorization | Client Access Token |
| IM-Client-Key    | Client KEY          |

### Query parameters

#### Message

| Field | Type    | Description                            |
| ----- | ------- | -------------------------------------- |
| limit | Integer | Limit of most recent message to return |

```
GET /messages/batch?batchID={BATCH-ID} HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.14.6) GCDHTTPRequest## Recent Messages
curl "http://localhost:3100/messages/recent?limit=20" \
     -H 'IM-Authorization: {ACCESS_TOKEN}' \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}'

```

### Response Result

Matched message list

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
     "count": "matched count",
     "data": [ matched messages ]
  }
}
```
