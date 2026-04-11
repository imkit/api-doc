# ユーザーのブロック (Block User)

## 概要

指定したユーザーをブロックし、現在のユーザーとの直接のチャットを阻止します。ブロック後、ブロックされたユーザーはブロックしたユーザーにプライベートメッセージを送信できなくなりますが、グループチャットルーム内での対話には影響しません。この機能は、嫌がらせの防止や個人のプライバシー管理に適しています。

------

## API エンドポイント

### 特定のユーザーをブロックする

指定したユーザーをブロックリストに追加し、直接のチャットを阻止します。

```http
POST /blockStatus/my/{blockee}
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### パスパラメータ (Path Parameters)

| パラメータ | 型 | 必須 | 説明 |
| --------- | ------ | ---- | ----------------- |
| `blockee` | string | ✅ | ブロックするユーザー ID |

#### リクエスト例

**特定のユーザーをブロックする**

```http
POST /blockStatus/my/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**他のユーザーをブロックする**

```http
POST /blockStatus/my/user123 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/blockStatus/my/${blockee}`,
  {},
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 例：**

```bash
curl -X "POST" "https://your-app.imkit.io/blockStatus/my/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス (Response)

**成功レスポンス（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0 は成功を示す） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | ブロックステータス情報 |

**ブロックステータスオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------- | ------ | ----------------------------- |
| `appID` | string | アプリケーション識別子 |
| `blockee` | object | ブロックされたユーザーの詳細情報 |
| `blocker` | string | ブロックを実行したユーザー ID |
| `room` | string | 関連付けられたチャットルーム ID |
| `createdAt` | string | ブロック作成日時 |
| `updatedAt` | string | ブロック更新日時 |

**ブロックされたユーザーオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------------- | ------ | ----------------------------- |
| `_id` | string | ユーザー一意識別子 |
| `nickname` | string | ユーザーのニックネーム |
| `avatarUrl` | string | ユーザーのアバター URL |
| `lastLoginTimeMS` | number | 最終ログイン時間（ミリ秒タイムスタンプ） |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "2bec603e94a210092439e83ff2d79ac1",
    "createdAt": "2021-08-04T15:18:10.735Z",
    "updatedAt": "2021-08-04T16:35:41.341Z"
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

**404 Not Found** - ユーザーが存在しない

```json
{
  "RC": 404,
  "RM": "User not found",
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The specified user does not exist"
  }
}
```

**400 Bad Request** - 自分自身をブロックすることはできません

```json
{
  "RC": 400,
  "RM": "Cannot block yourself",
  "error": {
    "code": "SELF_BLOCK_FORBIDDEN",
    "message": "Users cannot block themselves"
  }
}
```

**409 Conflict** - ユーザーは既にブロックされています

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already in your block list"
  }
}
```

------

## 使用シーン

### 個人のプライバシー保護
- **嫌がらせ防止**：不適切なユーザーがプライベートメッセージを送信するのを阻止します。
- **プライバシー管理**：誰が自分と直接連絡を取れるかをコントロールします。
- **セキュリティ保護**：悪意のあるユーザーによる継続的な嫌がらせ行為を防ぎます。

### ユーザー体験の改善
- **コンテンツフィルタリング**：望まないメッセージ内容の受信を避けます。
- **環境の浄化**：より快適なチャット環境を構築します。
- **仕事への集中**：不要な邪魔や干渉を減らします。

### コミュニティ管理
- **行動規範**：違反ユーザーに対して個人レベルの保護措置を講じます。
- **紛争処理**：ユーザー間の個人的な紛争を処理します。
- **自主管理**：ユーザーが自身のソーシャルサークルを自ら管理できるようにします。

------

## 注意事項

- **直接チャット限定**：ブロックはプライベートチャットにのみ影響し、グループチャットルーム内での対話には影響しません。
- **双方向の効果**：ブロックが有効になると、双方ともプライベートメッセージを送信できなくなります。
- **チャットルームの自動作成**：ブロックは対応する直接チャットルームに関連付けられます。
- **自己ブロック不可**：自分自身のアカウントをブロックすることはできません。
- **重複ブロック**：既にブロックされているユーザーに対してブロックを実行すると、コンフリクトエラーが返されます。
- **ステータスの持続**：ブロックステータスは、手動でブロックを解除するまで持続します。
