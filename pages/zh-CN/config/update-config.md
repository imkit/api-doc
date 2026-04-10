# 更新系统设定

## 概述

更新应用程式的系统组态设定。透过此端点可以设定公告、审查词汇、功能旗标等任意键值对。此为管理员专用 API，需使用 `IM-API-KEY` 进行验证。

------

## API 端点

### 更新系统设定

新增或更新系统组态的键值对。

```http
POST /config
```

#### Headers

| 参数           | 类型   | 必填 | 说明                            |
| -------------- | ------ | ---- | ------------------------------- |
| `IM-API-KEY`   | string | ✅    | 您的平台 API 金钥              |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

请求内容为任意 JSON 键值对，将作为系统组态储存。

| 参数   | 类型   | 必填 | 说明                               |
| ------ | ------ | ---- | ---------------------------------- |
| （任意键）| any | ❌    | 任意键值对，将被储存为系统组态设定 |

#### 范例请求

**JavaScript（axios）- 设定公告**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    announcement: {
      text: "系统将于 2026/04/15 02:00 进行例行维护，预计维护时间 2 小时。",
      pin: true
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**JavaScript（axios）- 设定审查词汇**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    censorship: {
      keywords: ["广告", "垃圾讯息", "诈骗"]
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL - 设定多项组态**

```bash
curl -X POST "https://your-app.imkit.io/config" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "announcement": {
      "text": "欢迎使用 IMKit！",
      "pin": true
    },
    "censorship": {
      "keywords": ["广告", "垃圾讯息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                         |
| -------- | ------ | ---------------------------- |
| `RC`     | number | 回应代码（0 表示成功）       |
| `RM`     | string | 回应讯息                     |
| `result` | object | 更新后的系统组态设定         |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "欢迎使用 IMKit！",
      "pin": true
    },
    "censorship": {
      "keywords": ["广告", "垃圾讯息"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
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

**400 Bad Request** - 请求格式错误

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "INVALID_BODY",
    "message": "Request body must be a valid JSON object"
  }
}
```

------

## 使用场景

### 公告管理
- **设定系统公告**：发布或更新系统公告讯息，可设定是否置顶显示
- **活动公告**：发布限时活动、促销等资讯

### 内容审查设定
- **设定审查词汇**：新增或更新敏感词列表，用于讯息内容过滤
- **审查规则调整**：动态调整内容审查规则

### 功能旗标管理
- **功能开关**：动态启用或停用特定功能
- **参数调整**：更新系统参数，如档案大小限制、讯息长度限制等

------

## 注意事项

- **仅限管理员使用**：此端点需使用 `IM-API-KEY` 验证，仅限伺服器端呼叫
- **覆盖行为**：相同键名的设定值将被覆盖更新
- **任意键值对**：请求 body 支援任意 JSON 结构，系统不会对键名或值的格式做限制
- **即时生效**：更新后的设定会立即生效，用户端下次读取 `GET /config` 即可取得最新设定
