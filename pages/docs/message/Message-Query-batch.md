# Query batch messages.

### path

/messages/batch

### Method

GET

### Headers:

| Field      | Description |
| ---------- | ----------- |
| IM-API-KEY | API Key     |

### Query parameters

#### Message

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| batchID | String | Batch ID    |

```
GET /messages/batch?batchID={BATCH-ID} HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.14.6) GCDHTTPRequest

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
