# 取得系统设定

## 概述

取得应用程式的执行时期设定。此端点回传系统中已设定的所有组态键值对，包含公告、审查词汇、功能旗标等。用户端可使用 `IM-CLIENT-KEY` 搭配 `IM-Authorization` 进行验证来读取设定。

------

## API 端点

### 取得系统设定

取得目前所有的系统组态设定。

```http
GET /config
```

#### Headers

| 参数               | 类型   | 必填 | 说明                       |
| ------------------ | ------ | ---- | -------------------------- |
| `IM-CLIENT-KEY`    | string | ✅    | 您的 Client 金钥           |
| `IM-Authorization` | string | ✅    | 用户授权 token             |

#### 范例请求

**JavaScript（axios）**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/config",
  {
    headers: {
      "IM-CLIENT-KEY": process.env.IM_CLIENT_KEY,
      "IM-Authorization": "Bearer user_access_token"
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/config" \
  -H "IM-CLIENT-KEY: your_client_key" \
  -H "IM-Authorization: Bearer user_access_token"
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                               |
| -------- | ------ | ---------------------------------- |
| `RC`     | number | 回应代码（0 表示成功）             |
| `RM`     | string | 回应讯息                           |
| `result` | object | 系统组态键值对，内容依实际设定而异 |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "欢迎使用 IMKit 即时通讯服务！",
      "pin": true
    },
    "censorship": {
      "keywords": ["广告", "垃圾讯息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true,
      "maxFileSize": 10485760
    }
  }
}
```

#### 错误回应

**401 Unauthorized** - 授权验证失败

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_AUTH",
    "message": "Invalid or missing authorization"
  }
}
```

------

## 使用场景

### 功能旗标
- **动态功能开关**：用户端启动时读取功能旗标，动态启用或停用特定功能
- **灰度发布**：透过组态控制新功能的逐步开放

### 公告讯息
- **系统公告**：读取置顶公告内容，在用户端介面显示
- **维护通知**：取得排程维护资讯，提前通知用户

### 内容审查
- **审查词汇**：取得敏感词列表，用于用户端讯息过滤
- **内容政策**：读取内容政策设定，确保用户端遵循规范

------

## 注意事项

- **用户端可读取**：此端点使用 `IM-CLIENT-KEY` 与 `IM-Authorization` 验证，用户端应用程式可直接呼叫
- **唯读操作**：此端点仅提供读取功能，更新设定需使用 `POST /config`（需 `IM-API-KEY`）
- **动态内容**：回传的组态内容取决于管理员透过 `POST /config` 设定的项目，不同应用程式的设定可能不同
- **快取建议**：建议用户端适当快取组态资料，避免频繁呼叫此 API
