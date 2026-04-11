# トークンの発行

## 概要

ユーザーデータはあなたのサーバーで作成されますが、認可トークン（Access Token）は IMKIT Chat Server によって発行および管理されます。このモードは、迅速な統合を希望し、自身でトークンのライフサイクルを管理する必要がないアプリケーションに適しています。

実装フロー：
1. `/admin/clients` API を使用してクライアント（ユーザー）を作成し、`issueAccessToken: true` を設定します。
2. Chat Server がアクセストークンを発行します。これは後続の API 呼び出しに使用できます。
3. 返されたトークンを使用してクライアント認証を行います。

------

## API エンドポイント

### ユーザーを作成し、トークンを発行

新しいユーザーを作成し、Chat Server によってアクセストークンを自動発行します。

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
| `issueAccessToken` | boolean | ✅ | この認証モードを有効にするには `true` に設定します |

#### リクエスト例

**JavaScript 例:**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients",
  {
    _id: "user001",
    nickname: "Amy",
    avatarUrl: "https://example.com/avatar.jpg",
    issueAccessToken: true,
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
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true
}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型 | 説明 |
| ---- | ---- | ---- |
| `_id` | string | ユーザーの一意識別子 |
| `nickname` | string | ユーザーの表示名 |
| `avatarUrl` | string | ユーザーのアバター URL |
| `issueAccessToken` | boolean | トークン発行モード |
| `token` | string | Chat Server によって発行されたアクセストークン |
| `expirationDate` | string | トークンの有効期限 (ISO 8601 形式) |

#### レスポンス例

```json
{
  "_id": "user001",
  "nickname": "Amy",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expirationDate": "2025-06-30T12:00:00Z"
}
```

#### エラーレスポンス

**400 Bad Request** — リクエストパラメータエラー

```json
{
  "error": "INVALID_REQUEST",
  "message": "Missing required field: _id"
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
  "message": "User with _id 'user001' already exists"
}
```

------

## ユースケース

### 迅速な統合
- **簡単な開発**: システムにトークンを自動生成させ、自身でトークン生成ロジックを管理する必要がありません。
- **迅速な検証**: 開発およびテスト段階で有効なアクセストークンを迅速に取得するのに適しています。

### ユーザーのアクティベーション
- **新規ユーザー登録**: ユーザー登録時に IMKIT ユーザーを同時に作成し、トークンを取得します。1ステップで完了します。
- **自動化フロー**: バックエンドサービスで新規ユーザーのアカウントを自動作成し、アクセストークンを取得します。

------

## 注意事項

- **トークンの有効期限**: Chat Server によって管理されます。`expirationDate` フィールドに注意してください。
- **トークンの期限切れ**: 期限が切れた後は、同じエンドポイント（`issueAccessToken: true` を指定した `POST /admin/clients`）を再度呼び出すことで、トークンを再取得できます。ユーザーを削除する必要はありません。
- **カスタマイズ不可**: このモードでは、トークンの内容や有効期限をカスタマイズすることはできません。
- **キャッシュの推奨**: 重複したリクエストを避けるため、アプリケーション内でトークンをキャッシュすることをお勧めします。
- **トークンの使用**: トークンを取得した後、後続 of API 呼び出しで `IM-Authorization` ヘッダーを通じて渡します。
