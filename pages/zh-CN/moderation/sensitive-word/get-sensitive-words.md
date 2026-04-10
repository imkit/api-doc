# 取得敏感词设定

## 概述

取得当前系统的敏感词汇审查配置。此 API 使用与[取得系统设定](/zh-TW/config/get-config)相同的端点 `GET /config`，本页聚焦于敏感词相关的设定项。

------

## API 端点

### 查询敏感词配置

取得当前的运行时配置，包含敏感词汇列表。

```http
GET /config
```

#### Headers

| 参数               | 类型   | 必填 | 说明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### 范例请求

```http
GET /config HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 范例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/config`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 范例：**

```bash
curl -X "GET" "https://your-app.imkit.io/config" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 运行时配置资料         |

**配置物件结构**

| 参数           | 类型   | 说明                          |
| -------------- | ------ | ----------------------------- |
| `announcement` | object | 公告配置                      |
| `censorship`   | object | 内容审查配置                  |

**审查配置物件结构**

| 参数       | 类型  | 说明                |
| ---------- | ----- | ------------------- |
| `keywords` | array | 敏感词汇阵列        |

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
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
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
    "message": "Only authorized users can view runtime config"
  }
}
```

------

## 使用场景

### 配置检视
- **配置查看**：检视当前系统设定的敏感词列表
- **规则了解**：了解系统目前的内容过滤规则
- **设定验证**：验证敏感词配置是否正确生效

### 系统监控
- **配置监控**：定期检查敏感词配置状态
- **异常侦测**：监控配置是否异常或遗失
- **合规检查**：确认配置符合法规要求

### 管理维护
- **备份准备**：在修改前备份当前配置
- **问题诊断**：排查内容过滤相关问题
- **版本控制**：追踪配置变更历史

------

## 注意事项

- **认证要求**：需要有效的客户端认证才能查看配置
- **运行时配置**：显示当前生效的运行时配置，而非档案配置
- **完整配置**：回应包含所有运行时配置项目，不仅限于敏感词
- **即时状态**：显示系统当前的即时配置状态
- **敏感资讯**：配置内容可能包含敏感资讯，请妥善保管
- **快取机制**：配置可能有快取，变更后需等待快取更新