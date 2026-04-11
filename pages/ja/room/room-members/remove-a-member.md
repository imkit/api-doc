# メンバーの削除

## 概要

このエンドポイントを使用すると、指定したチャットルームから1人または複数のメンバーを削除できます。`members` に現在のユーザー自身の ID を渡すと、そのユーザーが能動的にチャットルームから退出することを意味します。

------

## API エンドポイント

### メンバーの削除

指定したチャットルームから1人または複数のメンバーを削除します。

```http
POST /rooms/:id/delete/members
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
| `members` | array[string] | ✅ | 削除するメンバーの ID 配列。現在のユーザー自身の ID を含めると、能動的な退出を意味します。 |
| `systemMessage` | boolean | ❌ | メンバーの退出または削除のシステムメッセージ（`leaveRoom` または `deleteMember`）を自動生成するかどうか。デフォルトは `false` です。 |

#### リクエスト例

**例 1：指定したメンバーを削除**

**cURL 例：**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/delete/members" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"members": ["ccc", "bbb"], "systemMessage": true}'
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/delete/members`,
  {
    members: ["ccc", "bbb"],
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

**例 2：現在のユーザーが能動的にチャットルームから退出**

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/delete/members`,
  {
    members: [`${MY_CLIENT_ID}`],
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
    "lastMessage": {
      "_id": "58a2dc9c965d09221ea7bedb",
      "message": "sadf dsfdf",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0,
        "id": "1485248560558"
      },
      "messageTime": "2017-02-14T10:31:56.006Z",
      "messageTimeMS": 1487068316006,
      "id": "58a2dc9c965d09221ea7bedb"
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1487068306745,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 1486720993257,
        "id": "1485248566481"
      }
    ],
    "id": "demo-room"
  }
}
```

#### エラーレスポンス

リクエストが失敗した場合、エラーの詳細情報を含むエラーレスポンスが返されます。一般的なエラーシナリオは以下の通りです：

- 無効なクライアントキーまたは認証トークン
- 指定されたチャットルームが存在しない
- `members` に、チャットルームに参加していないユーザー ID が含まれている
- サーバー内部エラー

------

## ユースケース

### メンバー管理
- **メンバーの削除**: 管理者がチャットルームから1人または複数のメンバーを削除します。
- **能動的な退出**: ユーザーが自身の ID を渡すことで、能動的にチャットルームから退出します。

### システム通知
- **自動通知**: `systemMessage: true` に設定すると、システムが状況に応じて自動的に `leaveRoom` または `deleteMember` タイプのシステムメッセージを生成します。

------

## 注意事項

- **能動的な退出**: `members` 配列に現在のユーザー自身の ID を含めると、そのユーザーは能動的にチャットルームから退出したことになります。
- **システムメッセージ**: `systemMessage: true` の場合、能動的な退出であればシステムメッセージの種類は `leaveRoom`、管理者による削除であれば `deleteMember` になります。
- メンバーが削除（または退出）されると、そのユーザーは該当チャットルームのいかなるメッセージ履歴にもアクセスできなくなります。
