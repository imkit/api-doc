# 解除静音成员

## 概述

解除静音成员功能让管理员可以移除特定客户端对指定聊天室的静音状态，恢复该客户端对聊天室的通知接收。此功能与静音成员功能相对应，适用于恢复通知、重新启用提醒和聊天室管理。

------

## API 端点

### 解除指定客户端的聊天室静音

移除指定客户端对特定聊天室的静音状态。

```http
DELETE /admin/clients/{uid}/mute/{room}
```

#### Headers

| 参数         | 类型   | 必填 | 说明        |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅    | API Key     |

#### Path Parameters

| 参数   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| `uid`  | string | ✅    | 客户端 ID    |
| `room` | string | ✅    | 聊天室 ID    |

#### 范例请求

**解除特定聊天室静音**

```http
DELETE /admin/clients/aaa/mute/demo?limit=10&skip=100 HTTP/1.1
IM-API-KEY: fangho_imkit_0412_2018_001_apikey
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.7) GCDHTTPRequest
```

#### Response

**成功响应（200 OK）**

| 参数     | 类型   | 说明                       |
| -------- | ------ | -------------------------- |
| `RC`     | number | 响应代码（0 表示成功）     |
| `RM`     | string | 响应消息                   |
| `result` | object | 更新后的客户端数据         |

**客户端数据对象结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `mute`            | array  | 静音的聊天室 ID 列表          |
| `isRobot`         | bool   | 是否为机器人                  |
| `_id`             | string | 客户端唯一识别码              |
| `appID`           | string | 应用程序识别码                |
| `description`     | string | 客户端描述                    |
| `avatarUrl`       | string | 头像 URL                      |
| `nickname`        | string | 昵称                          |
| `email`           | string | 电子信箱                      |
| `address`         | object | 连接地址信息                  |
| `userAgent`       | string | 用户代理字符串                |
| `updatedAt`       | string | 最后更新时间                  |
| `lastLoginTimeMS` | number | 最后登录时间（毫秒时间戳）    |

#### 范例响应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "mute": [],
    "isRobot": false,
    "_id": "aaa",
    "__v": 0,
    "appID": "SampleApp",
    "description": "description la la #1541926309694",
    "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
    "nickname": "AAA",
    "email": "arielle.mckellar@coolgoose.ca",
    "address": {
      "address": "::1",
      "family": "IPv6",
      "port": 50392
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "updatedAt": "2020-10-09T15:11:34.216Z",
    "id": "aaa",
    "lastLoginTimeMS": 1583726632592
  }
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

**404 Not Found** - 客户端不存在

```json
{
  "RC": 404,
  "RM": "Client not found",
  "error": {
    "code": "CLIENT_NOT_FOUND",
    "message": "The specified client does not exist"
  }
}
```

**404 Not Found** - 聊天室不存在

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "The specified room does not exist"
  }
}
```

**400 Bad Request** - 聊天室未被静音

```json
{
  "RC": 400,
  "RM": "Room is not muted",
  "error": {
    "code": "ROOM_NOT_MUTED",
    "message": "The specified room is not in the mute list"
  }
}
```

------

## 使用场景

### 通知恢复
- **重新启用提醒**：恢复特定聊天室的通知推送
- **工作时间调整**：在工作时间恢复重要聊天室的通知
- **情境切换**：根据不同使用情境恢复通知设置

### 用户体验管理
- **个人偏好调整**：根据用户需求调整通知设置
- **临时静音解除**：解除临时设置的静音状态
- **批量管理**：统一恢复多个聊天室的通知设置

### 管理功能
- **后台控制**：管理员协助用户恢复聊天室通知
- **用户支持**：解决用户通知相关问题
- **系统维护**：系统维护完成后恢复通知功能

------

## 注意事项

- **管理员权限**：此 API 需要管理员权限和 API Key
- **状态移除**：解除静音会将聊天室 ID 从 mute 数组中移除
- **即时生效**：解除静音会立即生效，用户将开始接收通知
- **空数组**：成功解除所有静音后，mute 数组会变为空数组
- **查询参数**：API 支持 limit 和 skip 参数，但不影响解除静音功能
- **持久化设置**：解除静音的状态会永久保存
- **通知恢复**：解除静音后用户将重新接收该聊天室的通知