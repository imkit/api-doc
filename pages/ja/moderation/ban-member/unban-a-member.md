# メンバーの禁止解除 (Unban Member)

## 概要

チャットルーム内で特定のユーザーに対する禁止ステータスを解除し、そのチャットルームでの通常の活動権限を回復させます。禁止を解除できるのは、チャットルームのオーナーのみです（オーナーが設定されているグループチャットルームに限ります）。禁止解除後、そのユーザーはチャットルームで再び対話したりメッセージを送信したりできるようになります。

------

## API エンドポイント

### チャットルームで特定のユーザーの禁止を解除する

指定したユーザーをチャットルームの禁止リストから削除し、そのチャットルームでの活動権限を回復させます。

```http
DELETE /blockStatus/room/{roomID}/{blockee}
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### パスパラメータ (Path Parameters)

| パラメータ | 型 | 必須 | 説明 |
| --------- | ------ | ---- | --------------------- |
| `roomID` | string | ✅ | チャットルーム ID |
| `blockee` | string | ✅ | 禁止を解除するユーザー ID |

#### リクエスト例

**特定のユーザーの禁止を解除する**

```http
DELETE /blockStatus/room/demo-room/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例：**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/blockStatus/room/${roomID}/${blockee}`,
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
curl -X "DELETE" "https://your-app.imkit.io/blockStatus/room/{roomID}/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス (Response)

**成功レスポンス（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0 は成功を示す） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 禁止解除ステータス情報 |

**禁止解除ステータスオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------- | ------ | ------------------------- |
| `appID` | string | アプリケーション識別子 |
| `blockee` | object | 禁止を解除されたユーザーの詳細情報 |
| `blocker` | string | 禁止を実行したユーザー ID |
| `room` | string | チャットルーム ID |
| `createdAt` | string | 元の禁止作成日時 |
| `updatedAt` | string | 禁止解除日時 |

**禁止解除されたユーザーオブジェクトの構造**

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
      "_id": "ccc",
      "avatarUrl": "http://loremflickr.com/240/240/style?1628093304",
      "nickname": "Cathy",
      "id": "ccc",
      "lastLoginTimeMS": 1600006869368
    },
    "blocker": "aaa",
    "room": "demo-room",
    "createdAt": "2021-08-04T16:08:53.057Z",
    "updatedAt": "2021-08-04T16:08:53.057Z"
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
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner can unblock users in group chat rooms"
  }
}
```

**404 Not Found** - 禁止関係が存在しない

```json
{
  "RC": 404,
  "RM": "Block relationship not found",
  "error": {
    "code": "BLOCK_NOT_FOUND",
    "message": "No block relationship exists for this user in the specified room"
  }
}
```

**400 Bad Request** - パラメータが無効

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_USER_ID",
    "message": "The specified user ID is not valid"
  }
}
```

------

## 使用シーン

### チャットルーム管理
- **禁止の解除**：チャットルームのオーナーがユーザーの禁止ステータスを解除します。
- **管理上の意思決定**：状況の変化に基づき、禁止ポリシーを調整します。
- **メンバーの復帰**：ユーザーのチャットルームへの通常の参加権限を復帰させます。

### 権限管理
- **オーナー専用**：チャットルームのオーナーのみが禁止を解除できます。
- **権限の復帰**：そのチャットルームでのユーザーの完全な活動権限を復帰させます。
- **柔軟な管理**：柔軟な禁止管理メカニズムを提供します。

### 関係の修復
- **誤判断の訂正**：誤って禁止されたユーザーの禁止を解除します。
- **状況の改善**：ユーザーの行動が改善された後の権限復帰。
- **和解メカニズム**：チャットルームメンバー間の関係修復の手段を提供します。

------

## 注意事項

- **権限制限**：チャットルームのオーナーのみが禁止解除操作を実行できます（オーナーが設定されているグループチャットルームに限ります）。
- **チャットルームの種類**：この機能は主にグループチャットルームを対象としており、そのチャットルームにはオーナーが設定されている必要があります。
- **即時有効**：禁止解除ステータスは即座に有効になり、ユーザーはすぐにチャットルームで活動できるようになります。
- **禁止範囲**：禁止の解除は指定されたチャットルームに限定され、他のチャットルームの禁止ステータスには影響しません。
- **存在しない場合の処理**：存在しない禁止関係を解除しようとすると、404 エラーが返されます。
- **ログ保存**：禁止解除操作により、禁止記録のタイムスタンプが更新されます。
