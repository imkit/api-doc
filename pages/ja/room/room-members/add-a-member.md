# メンバーの追加

## 概要

このエンドポイントを使用すると、1人または複数のユーザーを指定したチャットルームに追加できます。招待の確認メカニズムをサポートしており、システムメッセージによる通知を自動生成するかどうかを選択できます。

------

## API エンドポイント

### メンバーの追加

1人または複数のユーザーを指定したチャットルームに追加します。

```http
POST /rooms/:id/members
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | クライアントトークン |

#### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `:id` | string | ✅ | チャットルームの一意識別子 |

#### リクエストボディ (Post Body)

| パラメータ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `invitees` | array[string] | ✅ | 追加するメンバーのクライアント ID 配列 |
| `systemMessage` | boolean | ❌ | メンバー追加のシステムメッセージを自動生成するかどうか。デフォルトは `false` です。 |
| `invitationRequired` | boolean | ❌ | 招待されたユーザーが参加するために招待を承諾する必要があるかどうか。デフォルトは `false` です。**グループ**チャットルームにのみ適用されます。 |

#### リクエスト例

**例 1：複数のメンバーを招待（招待の承諾が必要）**

**cURL 例：**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"invitees": ["ccc", "bbb"], "invitationRequired": true, "systemMessage": true}'
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: true,
    systemMessage: true,
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

**例 2：メンバーを直接追加（招待の確認は不要）**

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/members`,
  {
    invitees: ["ccc", "bbb"],
    invitationRequired: false,
    systemMessage: true,
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

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `RC` | number | レスポンスコード (0 は成功) |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 更新後のチャットルームの完全な情報 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "demo-room",
    "name": "Demo",
    "cover": "http://loremflickr.com/240/240/style?demo",
    "description": "public demo room",
    "roomType": "group",
    "webhook": "meet-taipei-intro",
    "botState": "CONTACT",
    "botMode": false,
    "encrypted": false,
    "serviceStatus": 0,
    "roomTags": ["demo", "foo", "bar"],
    "status": 1,
    "lastMessage": {
      "_id": "5e5b88e91da9d53097b13840",
      "room": "demo-room",
      "messageType": "addMember",
      "sender": {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "id": "aaa",
        "lastLoginTimeMS": 0
      },
      "member": {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "id": "ccc",
        "lastLoginTimeMS": 0
      },
      "message": "CCC",
      "appID": "SampleApp",
      "id": "5e5b88e91da9d53097b13840",
      "messageTimeMS": 1583057129059,
      "updatedAtMS": 1583057129059,
      "createdAtMS": 1583057129059
    },
    "members": [
      {
        "_id": "aaa",
        "nickname": "AAA",
        "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
        "isRobot": false,
        "id": "aaa",
        "lastLoginTimeMS": 1541926310026
      },
      {
        "_id": "bbb",
        "nickname": "bbb",
        "avatarUrl": "",
        "isRobot": false,
        "id": "bbb",
        "lastLoginTimeMS": 1541824600261
      },
      {
        "_id": "ccc",
        "nickname": "CCC",
        "avatarUrl": "https://example.com/avatar.jpg",
        "isRobot": false,
        "id": "ccc",
        "lastLoginTimeMS": 0
      }
    ],
    "id": "demo-room",
    "createdTimeMS": 1525001412492
  }
}
```

#### エラーレスポンス

リクエストが失敗した場合、エラーの詳細情報を含むエラーレスポンスが返されます。一般的なエラーシナリオは以下の通りです：

- 無効なクライアントキーまたは認証トークン
- 指定されたチャットルームが存在しない
- `invitees` に存在しないユーザー ID が含まれている
- サーバー内部エラー

------

## ユースケース

### 参加の招待
- **複数のメンバーを招待**: `invitationRequired: true` に設定することで、招待されたユーザーが能動的に招待を承諾した後にチャットルームに参加するようにします。
- **直接追加**: `invitationRequired: false` に設定することで、招待されたユーザーは確認なしに直接チャットルームに追加されます。

### システム通知
- **自動通知**: `systemMessage: true` に設定すると、システムが自動的にチャットルーム内に「メンバー追加」の通知メッセージを生成します。

------

## 注意事項

- **`invitationRequired`**: `true` の場合、招待されたユーザーは能動的に招待を承諾する必要があります。`false` の場合、直接追加されます。
- **システムメッセージ**: `systemMessage: true` の場合、システムが自動的に「メンバー追加」の通知メッセージを生成します。
- **1対1のチャットルーム**: `invitationRequired` は 1対1 (`direct`) チャットルームには無効であり、システムは自動的に `false` に設定します。
- 正常に追加されると、レスポンスには最新のメンバーリストを含む更新後のチャットルーム情報が含まれます。
