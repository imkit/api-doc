# メンバー属性の更新

## 概要

このエンドポイントを使用すると、チャットルーム内の特定のメンバーのカスタム属性（ロール、位置、スコア、レベル、または任意のカスタムフィールドなど）を更新できます。この API はサーバーサイド専用であり、適切な認証が必要です。

------

## API エンドポイント

### メンバー属性を更新

チャットルーム内の特定のメンバーのカスタム属性を更新します。

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
| `property` | string | ✅ | 更新するメンバー属性のフィールド名 |
| `value` | mixed | ✅ | 属性の新しい値 |

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

**例 2：カスタム属性を更新**

**JavaScript 例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomID}/member/${clientID}`,
  {
    property: "score",
    value: 100,
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
- サーバー内部エラー

------

## ユースケース

### ロール（役割）管理
- **管理者の指派**: `property` を `"role"`、`value` を `"admin"` に設定して、管理者ロールを割り当てます。

### カスタム属性
- **スコアの設定**: `property` を `"score"` に設定して、チャットルーム内でのメンバーのスコアを追跡します。
- **レベルの設定**: `property` を `"level"` に設定して、メンバーのレベルを管理します。
- **位置の設定**: `property` を `"location"` に設定して、メンバーの位置情報を記録します。

------

## 注意事項

- **ロール設定**: `property` が `"role"` で `value` が `"admin"` の場合、システムは自動的にチャットルーム内に `assignAdmin` システムメッセージを生成します。
- **カスタム属性**: `role` 以外にも、位置（`location`）、スコア（`score`）、レベル（`level`）などの任意のカスタム属性を設定できます。
- `property` フィールドはメンバー属性オブジェクト内のフィールド名に直接対応し、`value` の型はフィールド定義と一致する必要があります。
