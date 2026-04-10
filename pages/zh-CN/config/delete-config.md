# 删除系统设定

## 概述

删除应用程式中特定的系统组态项目。透过指定组态键名来移除对应的设定值。此为管理员专用 API，需使用 `IM-API-KEY` 进行验证。

------

## API 端点

### 删除指定组态项目

依据键名删除特定的系统组态设定。

```http
DELETE /config/:key
```

#### Headers

| 参数         | 类型   | 必填 | 说明              |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅    | 您的平台 API 金钥 |

#### Path Parameters

| 参数  | 类型   | 必填 | 说明                 |
| ----- | ------ | ---- | -------------------- |
| `key` | string | ✅    | 要删除的组态键名     |

#### 范例请求

**JavaScript（axios）**

```javascript
const response = await axios.delete(
  "https://your-app.imkit.io/config/announcement",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X DELETE "https://your-app.imkit.io/config/announcement" \
  -H "IM-API-KEY: your_api_key"
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                   |
| -------- | ------ | ---------------------- |
| `RC`     | number | 回应代码（0 表示成功） |
| `RM`     | string | 回应讯息               |
| `result` | object | 空物件                 |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
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

**404 Not Found** - 指定的组态键名不存在

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## 使用场景

### 组态管理
- **移除过期公告**：删除已不再需要的系统公告设定
- **清除审查词汇**：移除整个审查词汇设定项目
- **停用功能旗标**：删除特定功能旗标设定以恢复预设行为

------

## 注意事项

- **仅限管理员使用**：此端点需使用 `IM-API-KEY` 验证，仅限伺服器端呼叫
- **不可复原**：删除操作不可复原，请确认无误后再执行
- **即时生效**：删除后立即生效，用户端下次读取 `GET /config` 将不再包含该项目
- **整个键值删除**：此操作会删除整个键值对，若只需移除部分内容，请改用 `POST /config` 更新
