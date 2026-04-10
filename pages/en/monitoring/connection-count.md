# Connection Count

## Overview

Retrieve the current number of WebSocket real-time connections in the system. This endpoint can be used for real-time system load monitoring, capacity planning, and operational monitoring. Platform API permissions are required to call this endpoint.

------

## API Endpoint

### Get Current Connection Count

Query the current number of WebSocket connections on the system.

```http
GET /admin/connection-count
```

#### Headers

| Parameter    | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `IM-API-KEY` | string | ✅        | Your platform API Key |

#### Example Request

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/connection-count",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/connection-count" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**Success Response (200 OK)**

| Parameter      | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| `RC`           | number | Response code (0 indicates success) |
| `RM`           | string | Response message                    |
| `result`       | object | Query result                        |
| `result.count` | number | Current WebSocket connection count  |

#### Example Response

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 1523
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

### Real-Time Monitoring
- **Connection Monitoring**: Display the current WebSocket connection count in real-time on a monitoring dashboard
- **Anomaly Detection**: Set connection count thresholds to trigger alerts when counts exceed or suddenly drop

### Capacity Planning
- **Load Assessment**: Periodically retrieve connection counts to assess system load conditions
- **Scaling Decisions**: Decide whether server resources need to be scaled based on connection count trends

### Operational Reports
- **Usage Statistics**: Record connection counts at various time periods to generate usage reports
- **Peak Analysis**: Analyze connection peaks at different times to optimize resource allocation

------

## Notes

- **Platform API Permission Required**: This endpoint requires authentication using an `IM-API-KEY` with platform API permissions
- **Real-Time Data**: The returned value is the real-time connection count at the moment of the call; results may differ with each call
- **WebSocket Connections**: The count includes only WebSocket persistent connections, not regular HTTP requests
- **Monitoring Frequency**: It is recommended to poll at an appropriate interval (e.g., every 30 seconds or every minute) to avoid overly frequent calls
