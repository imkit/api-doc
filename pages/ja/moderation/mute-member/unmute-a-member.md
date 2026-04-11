# ユーザーのチャットルーム消音を解除

## 概要

管理者が指定したユーザーの特定のチャットルームに対する消音（ミュート）状態を解除し、そのユーザーがチャットルームからの通知を再び受信できるようにします。この機能は「ユーザーのチャットルームを消音」と対になる機能です。

------

## API エンドポイント

### 指定したクライアントのチャットルーム消音を解除

指定したクライアントの特定のチャットルームに対する消音状態を削除します。

```http
DELETE /admin/clients/{uid}/mute/{room}
```

#### ヘッダー

| パラメータ    | 型     | 必須 | 説明        |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅    | API Key     |

#### パスパラメータ

| パラメータ | 型     | 必須 | 説明            |
| --------- | ------ | ---- | -------------- |
| `uid`     | string | ✅    | クライアント ID |
| `room`    | string | ✅    | チャットルーム ID |

#### リクエスト例

**特定のチャットルームの消音を解除**

```http
DELETE /admin/clients/aaa/mute/demo HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: your-app.imkit.io
```

**JavaScript 例:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${uid}/mute/${room}`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL 例:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/admin/clients/{uid}/mute/{room}" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型     | 説明                         |
| --------- | ------ | ---------------------------- |
| `RC`      | number | レスポンスコード (0 は成功)   |
| `RM`      | string | レスポンスメッセージ          |
| `result`  | object | 更新後のクライアントデータ    |

**クライアントデータオブジェクトの構造**

| パラメータ         | 型     | 説明                               |
| ----------------- | ------ | ---------------------------------- |
| `mute`            | array  | 消音設定されているチャットルーム ID リスト |
| `isRobot`         | bool   | ロボット（ボット）かどうか          |
| `_id`             | string | クライアントの一意識別子            |
| `appID`           | string | アプリケーション ID                |
| `description`     | string | クライアントの説明                  |
| `avatarUrl`       | string | アバターの URL                      |
| `nickname`        | string | ニックネーム                        |
| `email`           | string | メールアドレス                      |
| `address`         | object | 接続アドレス情報                    |
| `userAgent`       | string | ユーザーエージェント文字列           |
| `updatedAt`       | string | 最終更新日時                        |
| `lastLoginTimeMS` | number | 最終ログイン時間（ミリ秒タイムスタンプ） |

#### レスポンス例

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

#### エラーレスポンス

**401 Unauthorized** - 認証失敗

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

**404 Not Found** - クライアントが存在しない

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

**404 Not Found** - チャットルームが存在しない

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

**400 Bad Request** - チャットルームが消音されていない

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

## ユースケース

### 通知の復元
- **通知の再開**: 特定のチャットルームのプッシュ通知を復元します。
- **勤務時間の調整**: 勤務時間中に重要なチャットルームの通知を復元します。
- **シチュエーションの切り替え**: 利用シーンに合わせて通知設定を復元します。

### ユーザー体験管理
- **個人の好みに合わせた調整**: ユーザーのニーズに応じて通知設定を調整します。
- **一時的な消音の解除**: 一時的に設定した消音状態を解除します。
- **一括管理**: 複数のチャットルームの通知設定を一括で復元します。

### 管理機能
- **バックエンド制御**: 管理者がユーザーに代わってチャットルームの通知を復元します。
- **ユーザーサポート**: ユーザーの通知に関する問題を解決します。
- **システムメンテナンス**: システムメンテナンス完了後に通知機能を復元します。

------

## 注意事項

- **管理者権限**: この API には管理者権限と API Key が必要です。
- **ステータスの削除**: 消音を解除すると、チャットルーム ID が mute 配列から削除されます。
- **即時反映**: 消音解除は即時に反映され、ユーザーは通知の受信を開始します。
- **空の配列**: すべての消音を正常に解除すると、mute 配列は空になります。
- **クエリパラメータ**: API は limit と skip パラメータをサポートしていますが、消音解除機能には影響しません。
- **永続的な設定**: 消音解除の状態は永続的に保存されます。
- **通知の復元**: 消音解除後、ユーザーは該当するチャットルームからの通知を再び受信するようになります。
