# 删除敏感词设置

## 概述

删除系统的敏感词汇审查配置。通过移除运行时配置中的审查设置，可以停用敏感词过滤功能或清除特定的配置项目。此功能适用于配置清理、功能停用和系统维护。

------

## API 端点

### 删除配置项目

删除指定的运行时配置项目。

```http
DELETE /config/{key}
```

#### Headers

| 参数         | 类型   | 必填 | 说明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 平台管理员 API Key |

#### Path Parameters

| 参数  | 类型   | 必填 | 说明           |
| ----- | ------ | ---- | -------------- |
| `key` | string | ✅    | 运行时配置键值 |

#### 范例请求

**删除敏感词配置**

```http
DELETE /config/censorship HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

**删除公告配置**

```http
DELETE /config/announcement HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

**删除其他配置**

```http
DELETE /config/push HTTP/1.1
IM-API-KEY: {API-KEY}
Host: localhost:3100
Connection: close
```

#### Response

**成功响应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 响应代码（0 表示成功） |
| `RM`     | string | 响应消息               |
| `result` | object | 空对象                 |

#### 范例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

#### 错误响应

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

**404 Not Found** - 配置项目不存在

```json
{
  "RC": 404,
  "RM": "Config not found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## 使用场景

### 功能停用
- **停用过滤**：完全停用敏感词过滤功能
- **临时关闭**：暂时关闭某些配置功能
- **测试环境**：在测试环境中移除生产配置

### 配置清理
- **过期配置**：清理不再使用的配置项目
- **重新设置**：清除旧配置准备重新设置
- **系统重置**：重置配置到预设状态

### 维护操作
- **紧急处理**：紧急移除有问题的配置
- **版本更新**：在系统更新时清理旧配置
- **错误修复**：移除导致问题的配置项目

------

## 注意事项

- **平台管理员专用**：此功能仅限平台管理员使用，需要 API Key
- **即时生效**：配置删除会立即生效，相关功能会立即停用
- **不可恢复**：删除操作无法复原，建议事先备份配置
- **功能影响**：删除 censorship 配置会完全停用敏感词过滤
- **运行时配置**：只影响运行时配置，不会修改文件配置
- **依赖检查**：删除前请确认没有其他功能依赖此配置
- **监控建议**：删除后请监控系统功能是否正常运作