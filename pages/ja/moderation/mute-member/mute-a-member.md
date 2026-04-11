# ユーザーのチャットルーム消音 (Mute Chatroom for User)

## 概要

管理者が特定のユーザーに代わって、指定したチャットルームの通知を消音（ミュート）にします。消音後、そのユーザーはそのチャットルームからのプッシュ通知を受け取らなくなりますが、チャットルーム内での参加権限には影響しません。この機能は、管理者がユーザーに代わって通知設定を管理する場合に適しています。

------

## API エンドポイント

### 指定したチャットルームを消音にする

指定したクライアントのチャットルームの消音ステータスを設定します。

```http
POST /admin/clients/{uid}/mute/{room}
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅ | API Key |

#### パスパラメータ (Path Parameters)

| パラメータ | 型 | 必須 | 説明 |
| ------ | ------ | ---- | ------------ |
| `uid` | string | ✅ | クライアント ID |
| `room` | string | ✅ | チャットルーム ID |

#### リクエスト例

**特定のチャットルームを消音にする**

```http
POST /admin/clients/aaa/mute/demo HTTP/1.1
IM-API-KEY: {IM-API-KEY}
Host: your-app.imkit.io
```

**JavaScript 例：**

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

**cURL 例：**

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients/{uid}/mute/{room}" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### レスポンス (Response)

**成功レスポンス（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | -------------------------- |
| `RC` | number | レスポンスコード（0 は成功を示す） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 更新後のクライアントデータ |

**クライアントデータオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------------- | ------ | ----------------------------- |
| `mute` | array | 消音されたチャットルーム ID のリスト |
| `isRobot` | bool | ロボットかどうか |
| `_id` | string | クライアント一意識別子 |
| `appID` | string | アプリケーション識別子 |
| `description` | string | クライアントの説明 |
| `avatarUrl` | string | アバター URL |
| `nickname` | string | ニックネーム |
| `email` | string | メールアドレス |
| `address` | object | 接続アドレス情報 |
| `userAgent` | string | ユーザーエージェント文字列 |
| `updatedAt` | string | 最終更新日時 |
| `lastLoginTimeMS` | number | 最終ログイン時間（ミリ秒タイムスタンプ） |

#### レスポンス例

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

------

## 使用シーン

### 通知管理
- **干渉の軽減**：特定のチャットルームからの通知受信を一時的に停止します。
- **仕事への集中**：重要な仕事の時間帯に重要でないチャットルームを消音にします。
- **夜間モード**：夜間にすべてのチャットルームを自動的に消音にします。

### ユーザー体験の最適化
- **個人の好み**：個人の好みに合わせて通知設定を調整します。
- **状況の切り替え**：異なる使用状況に応じて通知ステータスを素早く調整します。
- **一括管理**：複数のチャットルームの通知設定を統合管理します。

### 管理機能
- **バックエンド制御**：管理者が特定のユーザーに対してチャットルームの消音を設定できます。
- **ユーザーサポート**：通知に関する問題の解決をユーザーに代わって行います。
- **システムメンテナンス**：システムメンテナンス中に一時的に通知を消音にします。

------

## 注意事項

- **通知のみに影響**：消音は通知のプッシュのみを停止し、チャットルーム内での正常な対話には影響しません。
- **管理者権限**：この API には管理者権限と API Key が必要です。
- **設定の永続化**：消音設定は、手動でキャンセルするまで永続的に保存されます。
- **配列の更新**：消音を行うたびに、新しいチャットルーム ID が mute 配列に追加されます。
- **クエリパラメータ**：API は limit および skip パラメータをサポートしていますが、消音機能自体には影響しません。
- **即時有効**：消音設定は即座に有効になり、再ログインの必要はありません。
