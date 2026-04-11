# トークンの指派

## 概要

ユーザーのトークンを独自に生成および検証し、そのトークンを IMKIT Chat Server に指派して使用します。IMKIT はメッセージ処理のみを担当します。このモードは、既存の認証システムがあり、トークンのライフサイクルを完全に制御したいアプリケーションに適しています。

実装フロー：
1. あなたのシステムでカスタムトークンを生成します。
2. `/admin/clients` API を使用してクライアント（ユーザー）を作成し、あなたが提供する `token` と `expirationDate` を渡します。
3. 後で「トークンの更新」API を通じて更新したり、「トークンの撤回」API を通じて撤回したりできます。
4. あなたのシステムがトークンの検証ロジックを担当します。

------

## API エンドポイント

### ユーザーを作成し、外部トークンを指派

新しいユーザーを作成し、あなたのシステムで生成されたアクセストークンを指派します。

```http
POST /admin/clients
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | あなたの API キー |
| `Content-Type` | string | ✅ | `application/json` |

#### リクエストボディ (Request Body)

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | ユーザーの一意識別子 |
| `nickname` | string | ❌ | ユーザーの表示名 |
| `avatarUrl` | string | ❌ | ユーザーのアバター URL |
| `issueAccessToken` | boolean | ✅ | この認証モードを有効にするには `false` に設定します |
| `token` | string | ✅ | あなたのシステムで生成されたカスタムトークン |
| `expirationDate` | string | ✅ | トークンの有効期限 (ISO 8601 形式) |

#### リクエスト例

**JavaScript 例:**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user002",
    nickname: "John",
    avatarUrl: "https://example.com/avatar.jpg",
    issueAccessToken: false,
    token: "my-custom-token-xyz",
    expirationDate: "2025-06-30T12:00:00Z",
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 例:**

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d $'{
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "my-custom-token-xyz",
  "expirationDate": "2025-06-30T12:00:00Z"
}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型 | 説明 |
| ---- | ---- | ---- |
| `_id` | string | ユーザーの一意識別子 |
| `nickname` | string | ユーザーの表示名 |
| `avatarUrl` | string | ユーザーのアバター URL |
| `issueAccessToken` | boolean | トークン発行モード (false は外部トークンを使用することを意味します) |
| `token` | string | あなたが提供したカスタムトークン |
| `expirationDate` | string | トークンの有効期限 (ISO 8601 形式) |

#### レスポンス例

```json
{
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "my-custom-token-xyz",
  "expirationDate": "2025-06-30T12:00:00Z"
}
```

#### エラーレスポンス

**400 Bad Request** — リクエストパラメータエラー

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: token"
}
```

**401 Unauthorized** — API キーが無効

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**409 Conflict** — ユーザーが既に存在します

```json
{
  "error": "USER_EXISTS",
  "message": "User with _id 'user002' already exists"
}
```

------

## ユースケース

### 外部 ID 統合
- **SSO 統合**: 外部認証システムのトークンを IMKIT ユーザーに紐付けます。
- **カスタム有効期限**: ビジネス要件に応じてトークンの有効期限を設定します。

### トークン管理
- **トークンのローテーション**: セキュリティを確保するために、ユーザーのアクセストークンを定期的に更新します。
- **複数システム間の同期**: 他のシステムで発行されたトークンを IMKIT に同期します。

------

## 注意事項

- **トークン検証の責任**: あなたのシステムがトークンの有効性を検証する責任を負います。
- **有効期限の管理**: `expirationDate` があなたのシステムのトークン有効期限と一致していることを確認してください。
- **トークン形式**: IMKIT はトークンの形式を制限しませんが、JWT または類似の標準形式の使用をお勧めします。
- **セキュリティ**: トークンが十分なエントロピーと適切な署名メカニズムを持っていることを確認してください。
- **更新頻度**: サービスの中断を避けるため、トークンの有効期限が切れる前に能動的に更新することをお勧めします。
- **統合認証**: IMKIT トークンを既存の認証システムと統合し、自動更新メカニズムを実装することをお勧めします。
- **トークンの使用**: トークンを取得した後、後続の API 呼び出しで `IM-Authorization` ヘッダーを通じて渡します。
