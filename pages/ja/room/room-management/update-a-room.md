# チャットルームの更新

## 概要

既存のチャットルームの情報と設定を更新します。この API を使用すると、チャットルームの基本情報、権限設定、管理者構成などを変更できます。チャットルームの所有者、管理者、またはプラットフォーム管理者のみが使用できます。

------

## API エンドポイント

### チャットルーム情報を更新

指定したチャットルームの属性と設定を変更します。

```http
PUT /rooms/{id}
```

#### ヘッダー

| パラメータ            | 型     | 必須 | 説明            |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### パスパラメータ

| パラメータ | 型     | 必須 | 説明            |
| ---- | ------ | ---- | -------------- |
| `id` | string | ✅    | チャットルーム ID |

#### リクエストボディ (Request Body)

| パラメータ          | 型      | 必須 | 説明                                                      |
| ------------- | ------- | ---- | --------------------------------------------------------- |
| `name`        | string  | ❌    | チャットルーム名                                            |
| `cover`       | string  | ❌    | チャットルームのカバー画像 URL                                |
| `description` | string  | ❌    | チャットルームの説明                                        |
| `roomTags`    | array   | ❌    | 共有チャットルームタグの配列                                  |
| `webhook`     | string  | ❌    | Webhook キーまたは URL                                      |
| `botMode`     | boolean | ❌    | チャットルームボットを有効にするかどうか                        |
| `extParams`   | string  | ❌    | 拡張カスタムパラメータ。形式：param1=value1&param2=value2&... |
| `opening`     | number  | ❌    | 開放状態：0=参加または招待を閉じる、1=参加と招待を開放する        |
| `owner`       | string  | ❌    | 新しい所有者のクライアント ID（プラットフォーム管理者またはチャットルーム特権ユーザー限定） |
| `managers`    | array   | ❌    | 管理者クライアント ID の配列（プラットフォーム管理者またはチャットルーム特権ユーザー限定） |
| `status`      | number  | ❌    | チャットルームのステータス：0=無効、1=有効                      |

#### リクエスト例

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "description": "Description La La",
  "name": "Martena",
  "cover": "http://loremflickr.com/240/240/style?Kelly"
}
```

**JavaScript 例:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30`,
  {
    description: "Description La La",
    name: "Martena",
    cover: "http://loremflickr.com/240/240/style?Kelly",
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 例:**

```bash
curl -X "PUT" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"description": "Description La La", "name": "Martena", "cover": "http://loremflickr.com/240/240/style?Kelly"}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ     | 型     | 説明                       |
| -------- | ------ | -------------------------- |
| `RC`     | number | レスポンスコード (0 は成功) |
| `RM`     | string | レスポンスメッセージ        |
| `result` | object | 更新後のチャットルームデータ |

**チャットルームオブジェクトの構造**

| パラメータ            | 型     | 説明                      |
| --------------- | ------ | ------------------------- |
| `_id`           | string | チャットルームの一意識別子 |
| `name`          | string | チャットルーム名           |
| `cover`         | string | チャットルームのカバー画像 URL |
| `description`   | string | チャットルームの説明        |
| `status`        | number | チャットルームのステータス  |
| `lastMessage`   | object | 最新メッセージの情報        |
| `members`       | array  | チャットルームメンバーリスト |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Martena",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "Description La La",
    "status": 1,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "hhhooo",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test CCDD",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
      }
    ]
  }
}
```

#### エラーレスポンス

**401 Unauthorized** - 認証失敗

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**403 Forbidden** - 権限不足

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can update room"
  }
}
```

**404 Not Found** - チャットルームが存在しない

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room with specified ID does not exist"
  }
}
```

------

## ユースケース

### チャットルーム管理
- **基本情報のメンテナンス**: チャットルーム名、説明、カバー画像を更新します。
- **権限管理**: チャットルームの開放状態と管理者の構成を調整します。
- **機能設定**: ボットモードの有効化または無効化を行います。

### 管理バックエンド
- **一括管理**: 管理インターフェースを通じてチャットルームの設定を一括更新します。
- **コンテンツ審査**: 不適切なチャットルーム情報を修正します。
- **所有権の移転**: チャットルームの所有権を他のユーザーに移転します。

### システム統合
- **Webhook 構成**: チャットルームの Webhook 受信エンドポイントを設定します。
- **拡張パラメータ**: extParams を通じてサードパーティシステムと統合します。
- **ステータス管理**: 特定のチャットルームを有効または無効にします。

------

## 注意事項

- **権限制限**: チャットルームの所有者、管理者、またはプラットフォーム管理者のみが更新を実行できます。
- **所有権の移転**: `owner` や `managers` の変更には、より高い権限が必要です。
- **パラメータの検証**: すべてのパラメータはオプションであり、提供されたフィールドのみが更新されます。
- **ステータスの影響**: `status=0` に設定すると、チャットルームは無効状態になります。
- **開放設定**: `opening` パラメータは、新しいユーザーがチャットルームに参加できるかどうかに影響します。
