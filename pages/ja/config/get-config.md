# システム設定の取得

## 概要

アプリケーションのランタイム設定を取得します。このエンドポイントは、システムに設定されているすべての構成キーと値のペア（お知らせ、検閲ワード、機能フラグなど）を返します。クライアントは `IM-CLIENT-KEY` と `IM-Authorization` を使用して認証を行い、設定を読み取ることができます。

------

## API エンドポイント

### システム設定の取得

現在設定されているすべてのシステム構成を取得します。

```http
GET /config
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------------------- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | ユーザー認証トークン |

#### リクエスト例

**JavaScript（axios）**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/config",
  {
    headers: {
      "IM-CLIENT-KEY": process.env.IM_CLIENT_KEY,
      "IM-Authorization": "Bearer user_access_token"
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/config" \
  -H "IM-CLIENT-KEY: your_client_key" \
  -H "IM-Authorization: Bearer user_access_token"
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | システム構成のキーと値。内容は実際の設定により異なります |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "IMKit リアルタイムメッセージングサービスへようこそ！",
      "pin": true
    },
    "censorship": {
      "keywords": ["広告", "スパム"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true,
      "maxFileSize": 10485760
    }
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
    "code": "INVALID_AUTH",
    "message": "Invalid or missing authorization"
  }
}
```

------

## 使用シーン

### 機能フラグ
- **動的な機能切り替え**: クライアント起動時に機能フラグを読み取り、特定の機能を動的に有効化または無効化します。
- **カナリアリリース**: 構成制御を通じて新機能を段階的に開放します。

### お知らせメッセージ
- **システムお知らせ**: 固定表示のお知らせ内容を読み取り、クライアントインターフェースに表示します。
- **メンテナンス通知**: 予定されているメンテナンス情報を取得し、事前にユーザーに通知します。

### コンテンツ検閲
- **検閲ワード**: クライアント側でのメッセージフィルタリングに使用する禁止ワードリストを取得します。
- **コンテンツポリシー**: コンテンツポリシー設定を読み取り、クライアントが規範に従うようにします。

------

## 注意事項

- **クライアント側で読み取り可能**: このエンドポイントは `IM-CLIENT-KEY` と `IM-Authorization` で認証され、クライアントアプリケーションから直接呼び出すことができます。
- **読み取り専用操作**: このエンドポイントは読み取り機能のみを提供します。設定の更新には `POST /config`（`IM-API-KEY` が必要）を使用してください。
- **動的なコンテンツ**: 返される構成内容は、管理者が `POST /config` で設定した項目に依存します。アプリケーションによって設定が異なる場合があります。
- **キャッシュの推奨**: 頻繁な呼び出しを避けるため、クライアント側で構成データを適切にキャッシュすることをお勧めします。
