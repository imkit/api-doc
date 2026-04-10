# 取得连线数

## 概述

取得目前系统的 WebSocket 即时连线数量。此端点可用于即时监控系统负载、容量规划及营运监控等用途。需具备平台 API 权限方可呼叫。

------

## API 端点

### 取得目前连线数

查询目前系统上的 WebSocket 连线数量。

```http
GET /admin/connection-count
```

#### Headers

| 参数         | 类型   | 必填 | 说明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金钥 |

#### 范例请求

**JavaScript（axios）**

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

**成功回应（200 OK）**

| 参数           | 类型   | 说明                         |
| -------------- | ------ | ---------------------------- |
| `RC`           | number | 回应代码（0 表示成功）       |
| `RM`           | string | 回应讯息                     |
| `result`       | object | 查询结果                     |
| `result.count` | number | 目前的 WebSocket 连线数量    |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 1523
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

### 即时监控
- **连线数监控**：在监控仪表板即时显示目前的 WebSocket 连线数量
- **异常侦测**：设定连线数阈值，当超过或骤降时触发警报

### 容量规划
- **负载评估**：定期取得连线数，评估系统负载状况
- **扩展决策**：根据连线数趋势决定是否需要扩展伺服器资源

### 营运报告
- **使用统计**：记录各时段连线数，产出使用报告
- **高峰分析**：分析不同时段的连线高峰，最佳化资源配置

------

## 注意事项

- **需要平台 API 权限**：此端点需使用具有平台 API 权限的 `IM-API-KEY` 进行验证
- **即时数据**：回传的是呼叫当下的即时连线数，每次呼叫结果可能不同
- **WebSocket 连线**：统计的是 WebSocket 长连线数量，不包含一般 HTTP 请求
- **监控频率**：建议以适当的间隔轮询（如每 30 秒或每分钟），避免过于频繁的呼叫
