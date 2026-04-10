# 更新敏感词设定

## 概述

更新或建立系统的敏感词汇审查配置。透过运行时配置系统管理封锁用词列表，可以即时过滤不当内容，维护聊天环境的品质。此功能适用于内容审查、敏感词管理和平台治理。

------

## API 端点

### 更新敏感词配置

建立或更新运行时配置变数，包含敏感词汇列表设定。

```http
POST /config
```

#### Headers

| 参数         | 类型   | 必填 | 说明        |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅    | API Key     |

#### Post Body

| 参数           | 类型   | 必填 | 说明                    |
| -------------- | ------ | ---- | ----------------------- |
| `censorship`   | object | ❌    | 内容审查配置物件        |
| `announcement` | object | ❌    | 公告配置物件（可选）    |

**审查配置物件结构**

| 参数       | 类型  | 必填 | 说明                    |
| ---------- | ----- | ---- | ----------------------- |
| `keywords` | array | ✅    | 要封锁的敏感词汇阵列    |

#### 范例请求

**设定敏感词列表**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "announcement": {
    "text": "blahblah...",
    "pin": true
  },
  "censorship": {
    "keywords": [
      "foo",
      "bar"
    ]
  }
}
```

**仅更新敏感词列表**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "censorship": {
    "keywords": [
      "spam",
      "inappropriate",
      "banned_word"
    ]
  }
}
```

**新增敏感词到现有列表**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "censorship": {
    "keywords": [
      "foo",
      "bar",
      "newword1",
      "newword2"
    ]
  }
}
```

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/config`,
  {
    censorship: {
      keywords: ["foo", "bar"],
    },
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 范例：**

```bash
curl -X "POST" "https://your-app.imkit.io/config" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d '{"censorship": {"keywords": ["foo", "bar"]}}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 更新后的配置资料       |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "blahblah...",
      "pin": true
    },
    "censorship": {
      "keywords": [
        "foo",
        "bar"
      ]
    }
  }
}
```

#### 错误回应

**401 Unauthorized** - 认证失败

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
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only platform admin can manage runtime config"
  }
}
```

**400 Bad Request** - 请求格式错误

```json
{
  "RC": 400,
  "RM": "Invalid request format",
  "error": {
    "code": "INVALID_CONFIG_FORMAT",
    "message": "Config format is invalid or malformed"
  }
}
```

------

## 使用场景

### 敏感词管理
- **新增敏感词**：添加新的敏感词汇到过滤列表
- **更新列表**：修改现有的敏感词汇列表
- **批量设定**：一次性设定多个敏感词汇

### 内容审查
- **动态调整**：根据内容趋势即时调整过滤规则
- **紧急应对**：快速新增需要过滤的敏感内容
- **规则优化**：根据使用情况优化过滤规则

### 平台治理
- **政策执行**：根据平台政策更新内容过滤规则
- **地区适应**：根据不同地区的法规调整敏感词
- **合规要求**：满足法律法规的内容审查要求

------

## 注意事项

- **平台管理员专用**：此功能仅限平台管理员使用，需要 API Key
- **即时生效**：配置更新会立即生效，影响所有聊天内容
- **配置覆盖**：POST 请求会覆盖现有配置，请确保包含完整资料
- **备份建议**：更新前建议先查询当前配置作为备份
- **关键词格式**：敏感词以字串阵列形式储存，区分大小写
- **运行时配置**：使用运行时配置系统，无需重启服务即可生效
- **完整更新**：建议包含所有需要保留的配置项目，避免遗失其他设定