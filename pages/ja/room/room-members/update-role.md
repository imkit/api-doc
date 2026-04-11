# メンバーロールの更新

## 概要

このエンドポイントを使用すると、チャットルーム内の特定のメンバーのロール（役割）を更新できます。ロールが管理者に変更されると、システムは自動的にチャットルーム内に対応するシステムメッセージを生成します。この API はサーバーサイド専用であり、適切な認証が必要です。

------

## API エンドポイント

### メンバーロールを更新

チャットルーム内の特定のメンバーのロールを更新します。

```http
PUT /rooms/:id/member/:client
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
| `:client` | string | ✅ | メンバーのクライアント ID |

#### リクエストボディ (Request Body)

| パラメータ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `property` | string | ✅ | 固定で `"role"` を入力します |
| `value` | string | ✅ | ロール値。`"admin"` または `"member"` を指定できます |

**ロールの説明**

| ロール値 | 説明 |
| --- | --- |
| `"admin"` | 管理者。チャットルームメンバーを管理する権限を持ちます |
| `"member"` | 一般メンバー |

#### リクエスト例

**例 1：メンバーを管理者に設定**

**cURL 例：**

```bash
curl -X "PUT" "https://your-app.imkit.io/rooms/demo-room/member/user-001" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"property": "role", "value": "admin"}'
```

**JavaScript 例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "admin",
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

**例 2：管理者を一般メンバーに降格**

**JavaScript 例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "role",
    value: "member",
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
    "roomType": "group",
    "members": [
      {
        "_id": "user-001",
        "nickname": "User 001",
        "avatarUrl": "http://example.com/avatar.jpg",
        "isRobot": false,
        "id": "user-001",
        "lastLoginTimeMS": 1583057133276
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
- 指定されたチャットルームまたはメンバーが存在しない
- `value` が有効なロール値ではない
- サーバー内部エラー

------

## ユースケース

### 権限管理
- **管理者へのアップグレード**: メンバーのロールを `"member"` から `"admin"` に変更し、チャットルームメンバーを管理する権限を付与します。
- **一般メンバーへの降格**: 管理者のロールを `"admin"` から `"member"` に変更し、管理権限を削除します。

------

## 注意事項

- **システムメッセージ**: `value` を `"admin"` に設定すると、システムは自動的にチャットルーム内に `assignAdmin` システムメッセージを生成し、他のメンバーに通知します。
- `property` フィールドには固定で `"role"` を入力する必要があります。他のメンバー属性を更新する場合は、[メンバー属性の更新](./update-member-property) API を使用してください。
- この操作は、該当するチャットルーム内でのメンバーのロールのみを変更し、他のチャットルームでのロール設定には影響しません。
