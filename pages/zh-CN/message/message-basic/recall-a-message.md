# 撤回讯息

## 概述

此端点允许用户撤回聊天室中的指定讯息。撤回后，原讯息内容会被清空，讯息类型变更为 `recall`，聊天室中的所有成员都能看到该讯息已被撤回。支援用户端和平台 API 两种验证方式。

------

## API 端点

### 撤回讯息

撤回聊天室中的指定讯息。

```http
POST /rooms/:roomId/message
```

#### Headers

此 API 支援两种验证方式，择一使用：

**用户端验证**

| 参数               | 类型   | 必填 | 说明         |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY`    | string | ✅   | 用户端金钥   |
| `IM-Authorization` | string | ✅   | 用户端权杖   |

**平台 API 验证**

| 参数         | 类型   | 必填 | 说明             |
| ------------ | ------ | ---- | ---------------- |
| `IM-API-KEY` | string | ✅   | 平台 API 金钥    |

#### Path Parameters

| 参数       | 类型   | 必填 | 说明             |
| ---------- | ------ | ---- | ---------------- |
| `:roomId`  | string | ✅   | 聊天室唯一识别码 |

#### Post Body

| 参数          | 类型   | 必填 | 说明                            |
| ------------- | ------ | ---- | ------------------------------- |
| `messageType` | string | ✅   | 固定填入 `"recall"`             |
| `_id`         | string | ✅   | 要撤回的讯息唯一识别码          |

#### 范例请求

**范例一：用户端验证撤回讯息**

**cURL 范例：**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"_id": "5ce3d80bd594874e495895a4", "messageType": "recall"}'
```

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**范例二：平台 API 验证撤回讯息**

**JavaScript 范例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### Response

**成功回应（200 OK）**

| 参数                  | 类型   | 说明                               |
| --------------------- | ------ | ---------------------------------- |
| `RC`                  | number | 回应代码（0 表示成功）             |
| `RM`                  | string | 回应讯息                           |
| `result._id`          | string | 讯息唯一识别码                     |
| `result.message`      | string | 讯息内容（撤回后为空字串）         |
| `result.room`         | string | 所属聊天室 ID                      |
| `result.sender`       | object | 撤回操作的发送者资讯               |
| `result.messageType`  | string | 讯息类型（撤回后为 `"recall"`）    |
| `result.messageTimeMS`| number | 讯息发送时间戳（毫秒）             |
| `result.updatedAtMS`  | number | 最后更新时间戳（毫秒）             |

#### 范例回应

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5ce3d80bd594874e495895a4",
    "message": "",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Nita",
      "avatarUrl": "http://loremflickr.com/240/240/style?1558435839",
      "isRobot": false,
      "id": "sss",
      "lastLoginTimeMS": 1553145898032
    },
    "messageType": "recall",
    "appID": "SampleApp",
    "id": "5ce3d80bd594874e495895a4",
    "messageTimeMS": 1558435851576,
    "updatedAtMS": 1558435921086,
    "createdAtMS": 1558435851580
  }
}
```

#### 错误回应

当请求失败时，您会收到包含错误详细资讯的错误回应。常见的错误情况包括：

- 无效的验证金钥或权杖
- 指定的讯息或聊天室不存在
- 无权限撤回该讯息
- 伺服器内部错误

------

## 使用场景

### 讯息管理

- **误发讯息修正**：用户发送错误讯息后可立即撤回
- **敏感资讯移除**：撤回包含敏感或不当内容的讯息
- **后台管理**：管理员透过平台 API 撤回违规讯息

------

## 注意事项

- **撤回效果**：撤回后，讯息的 `message` 栏位会变为空字串，`messageType` 变为 `"recall"`，聊天室所有成员均可看到撤回状态
- **`_id`**：请求 Body 中的 `_id` 为要撤回的**讯息** ID，非聊天室 ID
- **两种验证**：用户端验证（`IM-CLIENT-KEY` + `IM-Authorization`）适用于一般用户操作；平台 API 验证（`IM-API-KEY`）适用于后台管理操作
