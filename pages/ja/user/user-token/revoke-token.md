# トークンの撤回

## 概要

指定したユーザーのアクセストークンを撤回（無効化）し、チャットサービスを継続して利用できないようにします。特定のトークンを撤回するか、そのユーザーのすべてのトークンを削除するかを選択できます。

------

## API エンドポイント

### ユーザーのトークンを撤回

指定したユーザーのアクセストークンを撤回します。

```http
DELETE /admin/clients/{client_id}/token
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
| `token` | string | ❌ | 撤回する特定のトークン。指定しない場合は、そのユーザーのすべてのトークンが削除されます |

#### リクエスト例

**特定のトークンを撤回：**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      token: "old-token-xyz",
    },
  }
);
```

**すべてのトークンを撤回：**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/admin/clients/${clientId}/token`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json",
    },
    data: {},
  }
);
```

**cURL 例：**

```bash
curl -X "DELETE" "https://your-app.imkit.io/admin/clients/{client_id}/token" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d '{"token": "old-token-xyz"}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型 | 説明 |
| ---- | ---- | ---- |
| `success` | boolean | 操作が成功したかどうか |
| `message` | string | 操作結果メッセージ |
| `revokedTokens` | number | 撤回されたトークンの数 |

#### レスポンス例

**特定のトークンを撤回**

```json
{
  "success": true,
  "message": "Token revoked successfully",
  "revokedTokens": 1
}
```

**すべてのトークンを撤回**

```json
{
  "success": true,
  "message": "All tokens revoked successfully",
  "revokedTokens": 3
}
```

#### エラーレスポンス

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
  "message": "Client with id 'user001' not found"
}
```

**404 Not Found** — トークンが存在しません

```json
{
  "error": "TOKEN_NOT_FOUND",
  "message": "Specified token not found for this client"
}
```

------

## ユースケース

### セキュリティ上の考慮事項
- **アカウントの盗用**: セキュリティを確保するために、すべてのトークンを直ちに撤回します。
- **デバイスの紛失**: 特定のデバイスのトークンを撤回します。
- **従業員の退職**: 企業ユーザーのすべてのトークンを撤回します。

### システム管理
- **強制ログアウト**: トークンを撤回してユーザーに再ログインを強制します。
- **トークンのローテーション**: セキュリティ向上のために古いトークンを定期的に撤回します。
- **権限の変更**: トークンを撤回して権限を再割り当てします。

------

## 注意事項

- **即時反映**: トークンの撤回は即時に有効になり、ユーザーはチャット機能を継続して利用できなくなります。
- **復旧不可**: 撤回されたトークンを元に戻すことはできません。新しいトークンを再発行または指派する必要があります。
- **一括操作**: `token` パラメータを指定しないことで、ユーザーのすべてのトークンを一度に撤回できます。
- **特定のトークンの優先撤回**: ユーザーの他のデバイスに影響を与えないよう、特定のトークンを優先的に撤回してください。
- **監査ログ**: 後で監査できるように、トークンの撤回操作を記録しておくことをお勧めします。
