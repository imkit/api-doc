# 替用户静音聊天室

## 概述

由管理员替指定用户静音特定聊天室的通知。静音后该用户将不再收到该聊天室的推播通知，但不影响其在聊天室中的参与权限。此功能适用于管理员代替用户管理通知偏好。

------

## API 端点

### 静音指定聊天室

为指定客户端设定聊天室静音状态。

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
POST /admin/clients/aaa/mute/demo HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: your-app.imkit.io
```

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/admin/clients/${uid}/mute/${room}`,
  {},
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL 范例：**

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients/{uid}/mute/{room}" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### Response

**成功回应（200 OK）**

| 参数     | 类型   | 说明                       |
| -------- | ------ | -------------------------- |
| `RC`     | number | 回应代码（0 表示成功）     |
| `RM`     | string | 回应讯息                   |
| `result` | object | 更新后的客户端资料         |

**客户端资料物件结构**

| 参数              | 类型   | 说明                          |
| ----------------- | ------ | ----------------------------- |
| `mute`            | array  | 静音的聊天室 ID 列表          |
| `isRobot`         | bool   | 是否为机器人                  |
| `_id`             | string | 客户端唯一识别码              |
| `appID`           | string | 应用程式识别码                |
| `description`     | string | 客户端描述                    |
| `avatarUrl`       | string | 头像 URL                      |
| `nickname`        | string | 暱称                          |
| `email`           | string | 电子信箱                      |
| `address`         | object | 连线地址资讯                  |
| `userAgent`       | string | 使用者代理字串                |
| `updatedAt`       | string | 最后更新时间                  |
| `lastLoginTimeMS` | number | 最后登入时间（毫秒时间戳）    |

#### 范例回应

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
- **个人偏好**：根据个人喜好调整通知设定
- **情境切换**：在不同使用情境下快速调整通知状态
- **批量管理**：统一管理多个聊天室的通知设定

### 管理功能
- **后台控制**：管理员可为特定用户设定聊天室静音
- **用户支援**：协助用户解决通知相关问题
- **系统维护**：在系统维护期间暂时静音通知

------

## 注意事项

- **仅影响通知**：静音只会停止通知推送，不影响聊天室内的正常互动
- **管理员权限**：此 API 需要管理员权限和 API Key
- **持久化设定**：静音设定会永久保存，直到手动取消
- **阵列更新**：每次静音会将新的聊天室 ID 加入 mute 阵列
- **查询参数**：API 支援 limit 和 skip 参数，但不影响静音功能本身
- **即时生效**：静音设定会立即生效，无需重新登入