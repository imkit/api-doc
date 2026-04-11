# ユーザー情報の取得

## 概要

現在ログインしているユーザーの詳細情報を取得します。この API は、現在認証されているユーザーのプロフィール、ログイン状態、およびその他の関連情報を取得するために使用できます。

------

## API エンドポイント

### 現在のユーザー情報を取得

現在ログインしているユーザーの完全なデータを取得します。

```http
GET /me
```

#### ヘッダー

| パラメータ            | 型     | 必須 | 説明            |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### リクエスト例

```http
GET /me HTTP/1.1
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/me`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 例:**

```bash
curl -X "GET" "https://your-app.imkit.io/me" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ     | 型     | 説明                       |
| -------- | ------ | -------------------------- |
| `RC`     | number | レスポンスコード (0 は成功) |
| `RM`     | string | レスポンスメッセージ        |
| `result` | object | ユーザーの詳細情報          |

**ユーザーオブジェクトの構造**

| パラメータ              | 型      | 説明                               |
| ----------------------- | ------ | ---------------------------------- |
| `_id`                   | string | ユーザーの一意識別子                 |
| `email`                 | string | ユーザーのメールアドレス             |
| `nickname`              | string | ユーザーの表示名                     |
| `appID`                 | string | アプリケーション ID                |
| `avatarUrl`             | string | ユーザーのアバター URL               |
| `address`               | object | 最終接続時のネットワークアドレス情報   |
| `userAgent`             | string | 最後に使用されたブラウザ/アプリの情報 |
| `lastLoginTimeMS`       | number | 最終ログイン時間 (ミリ秒タイムスタンプ) |
| `notificationEnabled`   | boolean| 通知が有効かどうか                   |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test CCDD",
    "appID": "SampleApp",
    "__v": 0,
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 52808,
      "family": "IPv6",
      "address": "::ffff:210.242.193.226"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    "lastLoginTimeMS": 1486027236514,
    "notificationEnabled": true
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

**403 Forbidden** - 無効な Client Key

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "INVALID_CLIENT_KEY",
    "message": "Invalid client key"
  }
}
```

------

## ユースケース

### ユーザーデータの表示
- **プロフィールページ**: アプリケーション内でユーザーの個人情報を表示します。
- **設定ページ**: 現在のユーザー設定を読み込んで編集します。
- **権限チェック**: ユーザーの身分と権限を確認します。

### ステータスチェック
- **ログイン検証**: ユーザーのログイン状態が有効であることを確認します。
- **セッション管理**: ユーザーセッションが期限切れになっていないかチェックします。
- **通知設定**: ユーザーの通知設定（好み）を確認します。

------

## 注意事項

- **認証の必要性**: この API には有効なユーザー認証が必要です。
- **機密情報**: パスワードなどの機密情報は返されません。
- **キャッシュの推奨**: パフォーマンス向上のため、ユーザー情報は適宜キャッシュすることを検討してください。
- **プライバシー保護**: 現在認証されているユーザーの情報のみが返されます。
