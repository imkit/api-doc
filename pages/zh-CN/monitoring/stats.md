# 统计报告

## 概述

取得应用程式的统计报告数据，包含用户列表、聊天室数量、讯息数量、连线峰值及系统记忆体资讯。预设取样最近一小时（3600 秒）的数据。适用于使用量分析、容量监控及营运报告等场景。

------

## API 端点

### 取得统计报告

查询应用程式在指定时间区间内的统计数据。

```http
GET /admin/stats
```

#### Headers

| 参数         | 类型   | 必填 | 说明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金钥 |

#### 范例请求

**JavaScript（axios）**

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

**成功回应（200 OK）**

| 参数                  | 类型   | 说明                                         |
| --------------------- | ------ | -------------------------------------------- |
| `RC`                  | number | 回应代码（0 表示成功）                       |
| `RM`                  | string | 回应讯息                                     |
| `result`              | object | 统计结果                                     |
| `result.clientKey`    | string | Client Key（敏感资讯，请勿记录至日志）       |
| `result.apiKey`       | string | API Key（敏感资讯，请勿记录至日志）          |
| `result.startTime`    | string | 统计起始时间（ISO 格式）                     |
| `result.endTime`      | string | 统计结束时间（ISO 格式）                     |
| `result.start`        | number | 统计起始时间（Unix 时间戳，秒）              |
| `result.end`          | number | 统计结束时间（Unix 时间戳，秒）              |
| `result.userList`     | array  | 期间内活跃用户列表                           |
| `result.roomCount`    | number | 期间内活跃聊天室数量                         |
| `result.totalRoomCount` | number | 聊天室总数                                 |
| `result.messageCount` | number | 期间内讯息总数                               |
| `result.peakConnectionCount` | number | 期间内 WebSocket 连线峰值              |
| `result.totalMem`     | number | 系统总记忆体（bytes）                        |
| `result.freeMem`      | number | 系统可用记忆体（bytes）                      |

#### 范例回应

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

#### 错误回应

**401 Unauthorized** - API 金钥无效

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

**403 Forbidden** - 权限不足

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

## 使用场景

### 使用量分析
- **活跃用户统计**：透过 `userList` 了解期间内的活跃用户
- **讯息量分析**：追踪 `messageCount` 了解讯息传送趋势
- **聊天室活跃度**：比较 `roomCount`（活跃）与 `totalRoomCount`（总数）的比例

### 容量监控
- **连线峰值追踪**：透过 `peakConnectionCount` 了解连线高峰，规划伺服器扩展
- **记忆体监控**：透过 `totalMem` 与 `freeMem` 监控系统记忆体使用状况
- **效能基准**：建立效能基准线，侦测异常负载

### 营运报告
- **每小时报告**：定期取得统计数据，产出营运报告
- **趋势分析**：累积历史数据进行长期趋势分析

------

## 注意事项

- **取样区间**：预设取样最近一小时（3600 秒）的数据
- **需要平台 API 权限**：此端点需使用 `IM-API-KEY` 进行验证
- **记忆体数据**：`totalMem` 与 `freeMem` 为伺服器主机的记忆体资讯，单位为 bytes
- **活跃用户**：`userList` 仅包含取样区间内有活动的用户，不代表所有已注册用户
- **资料即时性**：统计数据为查询当下的快照，可能有些微延迟
