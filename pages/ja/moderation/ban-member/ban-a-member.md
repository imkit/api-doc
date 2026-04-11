# メンバーの禁止 (Ban Member)

## 概要

チャットルーム内で特定のユーザーを禁止し、そのチャットルームでの活動を阻止します。この機能により、プラットフォーム管理者やチャットルームのオーナーは、グループチャットルーム内のメンバーを管理できます。チャットルームにオーナーが設定されている場合、プラットフォーム管理者とチャットルームのオーナーのみがこの権限を持ちます。禁止されたユーザーは、そのチャットルームでメッセージを送信したり、対話に参加したりすることができなくなります。

------

## API エンドポイント

### チャットルームで特定のユーザーを禁止する

指定したユーザーをチャットルームの禁止リストに追加し、そのチャットルームでの活動権限を制限します。

```http
POST /blockStatus/room/{roomID}/{blockee}
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### パスパラメータ (Path Parameters)

| パラメータ | 型 | 必須 | 説明 |
| --------- | ------ | ---- | ----------------- |
| `roomID` | string | ✅ | チャットルーム ID |
| `blockee` | string | ✅ | 禁止するユーザー ID |

#### リクエスト例

**チャットルームで特定のユーザーを禁止する**

```http
POST /blockStatus/room/demo-room/ccc HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/blockStatus/room/${roomID}/${blockee}`,
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
curl -X "POST" "https://your-app.imkit.io/blockStatus/room/{roomID}/{blockee}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス (Response)

**成功レスポンス（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0 は成功を示す） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 禁止ステータス情報 |

**禁止ステータスオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------- | ------ | ------------------------- |
| `appID` | string | アプリケーション識別子 |
| `blockee` | object | 禁止されたユーザーの詳細情報 |
| `blocker` | string | 禁止を実行したユーザー ID |
| `room` | string | チャットルーム ID |
| `createdAt` | string | 禁止作成日時 |
| `updatedAt` | string | 禁止更新日時 |

**禁止されたユーザーオブジェクトの構造**

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
    "message": "Only platform admin and room owner can block users in group chat rooms"
  }
}
```

**404 Not Found** - チャットルームまたはユーザーが存在しない

```json
{
  "RC": 404,
  "RM": "Resource not found",
  "error": {
    "code": "ROOM_OR_USER_NOT_FOUND",
    "message": "The specified room or user does not exist"
  }
}
```

**409 Conflict** - ユーザーは既に禁止されている

```json
{
  "RC": 409,
  "RM": "User already blocked",
  "error": {
    "code": "USER_ALREADY_BLOCKED",
    "message": "This user is already blocked in this room"
  }
}
```

------

## 使用シーン

### チャットルーム管理
- **メンバー制限**：チャットルームのオーナーがグループメンバーの参加権限を管理します。
- **違反対応**：チャットルーム内で不適切なコンテンツを送信したユーザーに対応します。
- **秩序維持**：チャットルームの良好な議論環境を維持します。

### 権限管理
- **オーナー権限**：チャットルーム의 オーナーがメンバーを管理します。
- **プラットフォーム管理**：プラットフォーム管理者がチャットルームの管理問題を解決するのを支援します。
- **階層管理**：異なる権限レベルのユーザーが異なる管理能力を持ちます。

### セキュリティ保護
- **嫌がらせ防止**：特定のユーザーがチャットルームで他のメンバーに嫌がらせをするのを阻止します。
- **コンテンツ規制**：不適切なコンテンツを送信するユーザーを制限します。
- **環境保護**：チャットルームの健全な議論環境を保護します。

------

## 注意事項

- **権限制限**：プラットフォーム管理者とチャットルームのオーナーのみがこの操作を実行できます（オーナーが設定されているグループチャットルームに限ります）。
- **チャットルームの種類**：この機能は主にグループチャットルームを対象としており、そのチャットルームにはオーナーが設定されている必要があります。
- **禁止範囲**：禁止は指定されたチャットルームに限定され、他のチャットルームでのユーザーの権限には影響しません。
- **即時有効**：禁止ステータスは即座に有効になり、禁止されたユーザーはそのチャットルームで活動できなくなります。
- **重複操作**：既に禁止されているユーザーに対して繰り返し禁止を実行すると、コンフリクトエラーが返されます。
- **ログ保存**：すべての禁止操作は、実行者と時間の情報を含めて記録されます。
