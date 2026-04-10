# Statistics Report

## Overview

Retrieve application statistics report data, including the user list, chatroom count, message count, connection peak, and system memory information. By default, the data is sampled from the most recent one hour (3600 seconds). Suitable for usage analysis, capacity monitoring, and operational reporting.

------

## API Endpoint

### Get Statistics Report

Query the application's statistical data within a specified time range.

```http
GET /admin/stats
```

#### Headers

| Parameter    | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `IM-API-KEY` | string | ✅        | Your platform API Key |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/stats",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/stats" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**Success Response (200 OK)**

| Parameter                    | Type   | Description                                          |
| ---------------------------- | ------ | ---------------------------------------------------- |
| `RC`                         | number | Response code (0 indicates success)                  |
| `RM`                         | string | Response message                                     |
| `result`                     | object | Statistics result                                    |
| `result.clientKey`           | string | Client Key (sensitive information, do not log)       |
| `result.apiKey`              | string | API Key (sensitive information, do not log)          |
| `result.startTime`           | string | Statistics start time (ISO format)                   |
| `result.endTime`             | string | Statistics end time (ISO format)                     |
| `result.start`               | number | Statistics start time (Unix timestamp, seconds)      |
| `result.end`                 | number | Statistics end time (Unix timestamp, seconds)        |
| `result.userList`            | array  | List of active users during the period               |
| `result.roomCount`           | number | Number of active chatrooms during the period         |
| `result.totalRoomCount`      | number | Total chatroom count                                 |
| `result.messageCount`        | number | Total message count during the period                |
| `result.peakConnectionCount` | number | WebSocket connection peak during the period          |
| `result.totalMem`            | number | Total system memory (bytes)                          |
| `result.freeMem`             | number | Available system memory (bytes)                      |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "clientKey": "ck_abcdef1234567890",
    "apiKey": "ak_abcdef1234567890",
    "startTime": "2026-04-11T09:00:00.000Z",
    "endTime": "2026-04-11T10:00:00.000Z",
    "start": 1744362000,
    "end": 1744365600,
    "userList": ["user001", "user002", "user003", "user004", "user005"],
    "roomCount": 12,
    "totalRoomCount": 358,
    "messageCount": 2467,
    "peakConnectionCount": 1893,
    "totalMem": 8589934592,
    "freeMem": 3221225472
  }
}
```

#### Error Response

**401 Unauthorized** - Invalid API Key

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

**403 Forbidden** - Insufficient permissions

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Platform API permission required"
  }
}
```

------

## Use Cases

### Usage Analysis
- **Active User Statistics**: Use `userList` to identify active users during the period
- **Message Volume Analysis**: Track `messageCount` to understand message sending trends
- **Chatroom Activity**: Compare the ratio of `roomCount` (active) to `totalRoomCount` (total)

### Capacity Monitoring
- **Peak Connection Tracking**: Use `peakConnectionCount` to understand connection peaks and plan for server scaling
- **Memory Monitoring**: Monitor system memory usage through `totalMem` and `freeMem`
- **Performance Baseline**: Establish performance baselines to detect abnormal loads

### Operational Reports
- **Hourly Reports**: Periodically retrieve statistical data to generate operational reports
- **Trend Analysis**: Accumulate historical data for long-term trend analysis

------

## Notes

- **Sampling Interval**: By default, data is sampled from the most recent one hour (3600 seconds)
- **Platform API Permission Required**: This endpoint requires authentication using `IM-API-KEY`
- **Memory Data**: `totalMem` and `freeMem` represent the server host's memory information, in bytes
- **Active Users**: `userList` includes only users who were active during the sampling interval, not all registered users
- **Data Timeliness**: Statistical data is a snapshot at the time of the query and may have slight delays
