# Statistics Report

Get statistic report sampling last one hour (3600 seconds).

### path

/admin/stats

### Method

GET

### Headers:

| Field      | Description |
| ---------- | ----------- |
| IM-API-KEY | API Key     |

```
GET /admin/stats HTTP/1.1
IM-API-KEY: fangho_imkit_0412_2018_001_apikey
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.2) GCDHTTPRequest




```

### Response Result

Statistic report

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "clientKey": "fangho_imkit_0412_2018_001_clientkey",
    "apiKey": "fangho_imkit_0412_2018_001_apikey",
    "clientId": "9bed6fda-8c52-4a43-89b8-2c37bfed246d",
    "startTime": 1579527617368,
    "endTime": 1579531217368,
    "userList": [],
    "roomCount": 0,
    "totalRoomCount": 26,
    "messageCount": 0,
    "peakConnectionCount": 0,
    "totalMem": 3147395072,
    "freeMem": 347262976,
    "start": "2020-01-20T13:40:17.368Z",
    "end": "2020-01-20T14:40:17.368Z"
  }
}
```
