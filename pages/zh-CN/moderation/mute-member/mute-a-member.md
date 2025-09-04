# 静音成员

## 概述

静音指定聊天室功能让用户可以暂时停止接收特定聊天室的通知，但不会影响用户在该聊天室的参与权限。此功能适用于临时减少干扰或过滤不重要的聊天室通知。

------

## API 端点

### 静音指定聊天室

为指定客户端设置聊天室静音状态。

```http
POST /admin/clients/{uid}/mute/{room}
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

**静音特定聊天室**

```http
POST /admin/clients/aaa/mute/demo?limit=10&skip=100 HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.7) GCDHTTPRequest
Content-Length: 0
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
    "mute": ["demo"],
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
    "updatedAt": "2020-10-09T15:11:17.153Z",
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

------

## 使用场景

### 通知管理
- **减少干扰**：暂时停止接收特定聊天室的通知
- **专注工作**：在重要工作时段静音不重要的聊天室
- **夜间模式**：夜间时段自动静音所有聊天室

### 用户体验优化
- **个人偏好**：根据个人喜好调整通知设置
- **情境切换**：在不同使用情境下快速调整通知状态
- **批量管理**：统一管理多个聊天室的通知设置

### 管理功能
- **后台控制**：管理员可为特定用户设置聊天室静音
- **用户支持**：协助用户解决通知相关问题
- **系统维护**：在系统维护期间暂时静音通知

------

## 注意事项

- **仅影响通知**：静音只会停止通知推送，不影响聊天室内的正常互动
- **管理员权限**：此 API 需要管理员权限和 API Key
- **持久化设置**：静音设置会永久保存，直到手动取消
- **数组更新**：每次静音会将新的聊天室 ID 加入 mute 数组
- **查询参数**：API 支持 limit 和 skip 参数，但不影响静音功能本身
- **即时生效**：静音设置会立即生效，无需重新登录