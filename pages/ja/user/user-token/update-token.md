# トークンの更新

## 概要

指定したユーザーのアクセストークンと有効期限を更新します。トークンのローテーション、有効期限の延長、または認証情報の変更などのシナリオに適しています。

------

## API エンドポイント

### ユーザーのトークンを更新

指定したユーザーのアクセストークンと有効期限を更新します。

```http
PUT /admin/clients/{client_id}/token
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | あなたの API キー |
| `Content-Type` | string | ✅ | `application/json` |

#### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `client_id` | string | ✅ | ユーザーの一意識別子 |

#### リクエストボディ (Request Body)

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `token` | string | ✅ | 新しいアクセストークン |
| `expirationDate` | string | ✅ | トークンの有効期限 (ISO 8601 形式) |

#### リクエスト例

**JavaScript 例:**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    token: "new-token-001",
    expirationDate: "2026-01-01T00:00:00Z",
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
curl -X "PUT" "https://your-app.imkit.io/admin/clients/{client_id}/token" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d $'{
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z"
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
| `token` | string | 更新後のアクセストークン |
| `expirationDate` | string | 更新後のトークン有効期限 |
| `updatedAt` | string | トークンの更新日時 (ISO 8601 形式) |

#### レスポンス例

```json
{
  "_id": "user002",
  "nickname": "John",
  "avatarUrl": "https://example.com/avatar.jpg",
  "issueAccessToken": false,
  "token": "new-token-001",
  "expirationDate": "2026-01-01T00:00:00Z",
  "updatedAt": "2025-08-10T10:30:00Z"
}
```

#### エラーレスポンス

**400 Bad Request** — リクエストパラメータエラー

```json
{
  "error": "INVALID_REQUEST",
  "message": "Invalid expirationDate format"
}
```

**401 Unauthorized** — API キーが無効

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

**404 Not Found** — ユーザーが存在しません

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "Client with id 'user002' not found"
}
```

**409 Conflict** — トークンの競合

```json
{
  "error": "TOKEN_CONFLICT",
  "message": "Token already exists for another client"
}
```

------

## ユースケース

### トークンのライフサイクル管理
- **定期的なローテーション**: セキュリティ向上のためにトークンを定期的に更新します。
- **有効期限の延長**: 期限切れ間近のトークンの有効期限を延長します。
- **緊急更新**: セキュリティインシデント発生時にトークンを緊急に変更します。

### システムメンテナンス
- **一括更新**: システムアップグレード時にユーザーのトークンを一括更新します。
- **形式の移行**: 旧形式のトークンから新形式に移行します。

------

## 注意事項

- **即時反映**: トークンの更新は即時に有効になり、古いトークンは使用できなくなります。
- **一意性チェック**: システムは、新しいトークンが他のユーザーと競合していないかチェックします。
- **時間形式**: `expirationDate` は ISO 8601 形式を使用する必要があります。
- **トークンの複雑さ**: 十分に複雑なトークン形式を使用することをお勧めします。
- **有効期限の設定**: セキュリティと利便性のバランスを考慮して、適切な有効期限を設定してください。
- **同期メカニズム**: あなたの認証システムと同期して更新されるようにしてください。
