# チャットルームリスト

## 概要

このエンドポイントを使用すると、現在のユーザーが参加しているチャットルームのリストを取得できます。ページネーション、ソート、および条件フィルタリングをサポートしています。チャットルームリストの表示や増分同期などのシナリオに適しています。

------

## API エンドポイント

### チャットルームリストを取得

現在のユーザーが参加しているチャットルームのリストを取得します。ページネーション、ソート、および条件フィルタリングをサポートしています。

```http
GET /rooms
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-CLIENT-ID` | string | ✅ | 現在のユーザーのクライアント ID (このエンドポイントでは、未読数の計算などのユーザー関連データのために追加で提供する必要があります) |
| `IM-Authorization` | string | ✅ | クライアントトークン |

#### クエリパラメータ

| パラメータ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `sort` | string | ❌ | ソート条件。複数のフィールドをスペースで区切って組み合わせることができます。接頭辞 `-` は降順を意味します。 |
| `skip` | integer | ❌ | ページネーションのオフセット。デフォルトは `0` です。 |
| `limit` | integer | ❌ | 返されるチャットルーム数の上限。デフォルトは `0` (制限なし) です。 |
| `updatedAfter` | string または integer | ❌ | 指定したタイムスタンプ以降に最新メッセージがある、または作成されたチャットルームをフィルタリングします。ISO-8601 文字列またはミリ秒 Epoch 整数をサポートしています。 |
| `pref` | JSON | ❌ | ユーザーのチャットルーム設定（好み）に基づいてフィルタリングします。例: `{"tags": "some-tag"}` |
| `sortUnreadFirst` | integer | ❌ | 0 以外の値の場合、未読メッセージがあるチャットルームを優先的にソートします。 |

**sort パラメータの例**

最新メッセージと作成時間で降順にソートする場合：

```
-lastMessage -createdTime
```

作成時間で昇順にソートする場合：

```
createdTime
```

#### リクエスト例

**例 1：チャットルームリストを取得（ページネーション + 時間フィルタリング）**

cURL 例：

```bash
curl "https://your-app.imkit.io/rooms?skip=0&limit=20&sort=-lastMessage&updatedAfter=2020-10-15T03:28:54Z" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-CLIENT-ID: {IM-CLIENT-ID}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

JavaScript 例：

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      skip: 0,
      limit: 20,
      sort: "-lastMessage",
      updatedAfter: "2020-10-15T03:28:54Z",
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

**例 2：タグでチャットルームをフィルタリングし、未読を優先表示**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/rooms",
  {
    params: {
      pref: JSON.stringify({ tags: "some-tag" }),
      sortUnreadFirst: 1,
    },
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-CLIENT-ID": `${CLIENT_ID}`,
      "IM-Authorization": `${TOKEN}`,
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
| `result.totalCount` | number | 条件に一致するチャットルームの総数 |
| `result.data` | array | チャットルームオブジェクトの配列 |
| `result.inspect` | object | 診断情報 (クエリ条件と所要時間) |

**チャットルームオブジェクトのフィールド**

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `_id` | string | チャットルームの一意識別子 |
| `name` | string | チャットルーム名 |
| `cover` | string | チャットルームのカバー画像 URL |
| `description` | string | チャットルームの説明 |
| `roomType` | string | チャットルームの種類 (`"direct"` または `"group"`) |
| `webhook` | string | Webhook キーまたは URL |
| `botState` | string | ボットの状態 |
| `botMode` | boolean | ボットモードが有効かどうか |
| `encrypted` | boolean | 暗号化されているかどうか |
| `serviceStatus` | number | サービスステータス |
| `roomTags` | array[string] | チャットルームタグの配列 |
| `status` | number | チャットルームのステータス (`1` は正常) |
| `unread` | number | 現在のユーザーの未読メッセージ数 |
| `muted` | boolean | 現在のユーザーがこのチャットルームを消音しているかどうか |
| `lastMessage` | object | 最新のメッセージオブジェクト |
| `members` | array[object] | チャットルームメンバーの配列 |
| `pref` | object | 現在のユーザーのこのチャットルームに対する個人設定（好み） |
| `createdTimeMS` | number | チャットルーム作成時間のタイムスタンプ (ミリ秒) |

**個人設定オブジェクトのフィールド (`pref`)**

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `tags` | array[string] | ユーザーがこのチャットルームに設定したカスタムタグ |
| `tagColors` | object | 各タグに対応する色 (16進数カラーコード) |
| `hidden` | boolean | このチャットルームを非表示にするかどうか |
| `sticky` | boolean | このチャットルームをピン留め（トップに固定）するかどうか |
| `muted` | boolean | このチャットルームの通知を消音するかどうか |
| `folder` | string | 所属するフォルダ名 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "members": "sss",
        "$or": [
          { "lastMessage": { "$gt": "5f87c2cf0000000000000000" } },
          { "createdTime": { "$gt": "2020-10-15T03:32:31.000Z" } }
        ],
        "status": 1
      },
      "tookMS": 22
    },
    "data": [
      {
        "_id": "demo-room",
        "name": "Demo Demo",
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
        "unread": 0,
        "muted": false,
        "lastMessage": {
          "_id": "5f890cf37d980e06f6aaf349",
          "message": "Hello SIKTMLNP 11:01:07",
          "room": "demo-room",
          "sender": {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "id": "sss",
            "lastLoginTimeMS": 0
          },
          "messageType": "text",
          "appID": "SampleApp",
          "messageTime": "2020-10-16T03:01:07.923Z",
          "id": "5f890cf37d980e06f6aaf349",
          "messageTimeMS": 1602817267923,
          "updatedAtMS": 1602817267925,
          "createdAtMS": 1602817267925,
          "reactionCount": 0
        },
        "members": [
          {
            "_id": "sss",
            "nickname": "Elsa",
            "avatarUrl": "https://example.com/avatar.jpg",
            "isRobot": false,
            "id": "sss",
            "lastLoginTimeMS": 1588744338369
          }
        ],
        "pref": {
          "tags": ["demo", "sample"],
          "tagColors": {
            "demo": "#f2d700",
            "sample": "#ffa01a"
          },
          "hidden": false,
          "sticky": false,
          "muted": false,
          "folder": "Some-Folder"
        },
        "id": "demo-room",
        "createdTimeMS": 1525001412492
      }
    ]
  }
}
```

#### エラーレスポンス

リクエストが失敗した場合、エラーの詳細情報を含むエラーレスポンスが返されます。一般的なエラーシナリオは以下の通りです：

- 無効なクライアントキーまたは認証トークン
- `updatedAfter` の時間形式が正しくない
- `pref` パラメータの JSON 形式が無効
- サーバー内部エラー

------

## ユースケース

### チャットルームリストの表示
- **トップページのチャットルームリスト**: ページネーションとソートを使用して、ユーザーのチャットルームリストを取得します。
- **タグフィルタリング**: `pref` パラメータを使用して、タグごとに特定のチャットルームをフィルタリングします。

### 増分同期
- **効率的な同期**: `updatedAfter` を前回のクエストのタイムスタンプと組み合わせて使用し、更新があったチャットルームのみを取得します。

------

## 注意事項

- **増分同期**: `updatedAfter` を前回のクエストのタイムスタンプと組み合わせて使用することで、毎回全データを取得することを避け、効率的な増分同期を実現できます。
- **ページネーションの推奨**: 一度に大量のデータが返されることによるパフォーマンスへの影響を避けるため、`limit` と `skip` を組み合わせたページネーションの使用を推奨します。
- **ソート**: `sort` フィールドは複数の条件をスペースで区切り、接頭辞 `-` は降順を表します。
- **`pref` フィルタリング**: `pref` パラメータは JSON 形式であり、URL エンコードして渡す必要があります。
- **`inspect` フィールド**: デバッグ専用です。実際のクエリ条件と実行所要時間が含まれています。本番環境では無視して構いません。
