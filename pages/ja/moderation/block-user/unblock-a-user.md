# ユーザーのブロック解除 (Unblock User)

## 概要

指定したユーザーのブロック状態を解除し、現在のユーザーとの直接チャット機能を回復させます。ブロック解除後、双方は再びプライベートメッセージを送信できるようになりますが、グループチャットルーム内での対話ステータスには影響しません。この機能は、誤操作の修正や連絡関係の再構築に適しています。

------

## API エンドポイント

### 特定のユーザーのブロックを解除する

指定したユーザーをブロックリストから削除し、直接チャット機能を回復させます。

```http
DELETE /blockStatus/my/{blockee}
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### パスパラメータ (Path Parameters)

| パラメータ | 型 | 必須 | 説明 |
| --------- | ------ | ---- | --------------------- |
| `blockee` | string | ✅ | ブロックを解除するユーザー ID |

#### リクエスト例

**特定のユーザーのブロックを解除する**

```http
DELETE /blockStatus/my/ddd HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**他のユーザーのブロックを解除する**

```http
DELETE /blockStatus/my/user123 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例：**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/blockStatus/my/${blockee}`,
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
curl -X "DELETE" "https://your-app.imkit.io/blockStatus/my/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス (Response)

**成功レスポンス（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0 は成功を示す） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | ブロック解除ステータス情報 |

**ブロック解除ステータスオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------- | ------ | ----------------------------- |
| `appID` | string | アプリケーション識別子 |
| `blockee` | object | ブロックを解除されたユーザーの詳細情報 |
| `blocker` | string | ブロック解除を実行したユーザー ID |
| `room` | string | 関連付けられたチャットルーム ID |
| `createdAt` | string | 元のブロック作成日時 |
| `updatedAt` | string | ブロック解除日時 |

**ブロックを解除されたユーザーオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------------- | ------ | ----------------------------- |
| `_id` | string | ユーザー一意識別子 |
| `nickname` | string | ユーザーのニックネーム |
| `avatarUrl` | string | ユーザーのアバター URL |
| `id` | string | ユーザー ID |
| `lastLoginTimeMS` | number | 最終ログイン時間（ミリ秒タイムスタンプ） |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "appID": "SampleApp",
    "blockee": {
      "_id": "ddd",
      "nickname": "Dina",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
      "id": "ddd",
      "lastLoginTimeMS": 1628095079328
    },
    "blocker": "aaa",
    "room": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
    "createdAt": "2021-08-04T15:18:07.649Z",
    "updatedAt": "2021-08-04T15:18:07.649Z"
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

**404 Not Found** - ブロック関係が存在しない

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists with this user"
  }
}
```

**400 Bad Request** - パラメータが無効

```json
{
  "RC": 400,
  "RM": "Invalid user ID",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## 使用シーン

### 関係の修復
- **誤操作の修正**：誤ってブロックしたユーザーのブロックを解除します。
- **関係の改善**：かつて紛争があったユーザーと再び連絡を取れるようにします。
- **セカンドチャンス**：ブロックされたユーザーにやり直しの機会を与えます。

### 管理の柔軟性
- **動的な管理**：状況の変化に応じてブロックステータスを調整します。
- **一時的なブロック**：短期間のブロックの後に通常の連絡を回復させます。
- **テスト用途**：開発およびテスト段階でのブロック機能の検証。

### ユーザー体験の最適化
- **便利な操作**：簡単なブロック解除方法を提供します。
- **即時有効**：ブロック解除後、すぐにチャット機能が回復します。
- **ステータスの同期**：ブロックステータスが各プラットフォーム間で同期して更新されるようにします。

------

## 注意事項

- **双方向の解除**：ブロック解除後、双方が再びプライベートメッセージを送信できるようになります。
- **存在しない場合の処理**：存在しないブロック関係を解除しようとすると、404 エラーが返されます。
- **即時有効**：ブロック解除操作は即座に有効になります。
- **チャットルームの関連付け**：ブロックを解除しても、関連するチャットルームの存在状態には影響しません。
- **履歴記録**：ブロックを解除しても、以前のチャット履歴は削除されません。
- **グループへの影響なし**：ブロック解除は、グループチャットでの対話ステータスには影響しません。
