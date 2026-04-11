# 敏感ワード設定の更新

## 概要

システムの敏感ワード（不適切ワード）審査設定を更新または作成します。ランタイム設定システムを通じてブロックワードリストを管理することで、不適切なコンテンツをリアルタイムでフィルタリングし、チャット環境の品質を維持できます。この機能は、コンテンツ審査、敏感ワード管理、およびプラットフォームガバナンスに適しています。

------

## API エンドポイント

### 敏感ワード設定の更新

敏感ワードリストの設定を含む、ランタイム設定変数を作成または更新します。

```http
POST /config
```

#### ヘッダー

| パラメータ    | 型     | 必須 | 説明        |
| ------------ | ------ | ---- | ----------- |
| `IM-API-KEY` | string | ✅    | API Key     |

#### リクエストボディ (Post Body)

| パラメータ     | 型     | 必須 | 説明                          |
| -------------- | ------ | ---- | ----------------------------- |
| `censorship`   | object | ❌    | コンテンツ審査設定オブジェクト  |
| `announcement` | object | ❌    | 告知設定オブジェクト（オプション） |

**審査設定オブジェクトの構造**

| パラメータ | 型    | 必須 | 説明                          |
| --------- | ----- | ---- | ----------------------------- |
| `keywords` | array | ✅    | ブロックする敏感ワードの配列   |

#### リクエスト例

**敏感ワードリストの設定**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "announcement": {
    "text": "blahblah...",
    "pin": true
  },
  "censorship": {
    "keywords": [
      "foo",
      "bar"
    ]
  }
}
```

**敏感ワードリストのみを更新**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "censorship": {
    "keywords": [
      "spam",
      "inappropriate",
      "banned_word"
    ]
  }
}
```

**既存のリストに敏感ワードを追加**

```http
POST /config HTTP/1.1
IM-API-KEY: {API-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "censorship": {
    "keywords": [
      "foo",
      "bar",
      "newword1",
      "newword2"
    ]
  }
}
```

**JavaScript 例:**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/config`,
  {
    censorship: {
      keywords: ["foo", "bar"],
    },
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
curl -X "POST" "https://your-app.imkit.io/config" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json' \
     -d '{"censorship": {"keywords": ["foo", "bar"]}}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型     | 説明                       |
| --------- | ------ | -------------------------- |
| `RC`      | number | レスポンスコード (0 は成功) |
| `RM`      | string | レスポンスメッセージ        |
| `result`  | object | 更新後の設定データ          |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "blahblah...",
      "pin": true
    },
    "censorship": {
      "keywords": [
        "foo",
        "bar"
      ]
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
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
  }
}
```

**403 Forbidden** - 権限不足

```json
{
  "RC": 403,
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only platform admin can manage runtime config"
  }
}
```

**400 Bad Request** - リクエスト形式エラー

```json
{
  "RC": 400,
  "RM": "Invalid request format",
  "error": {
    "code": "INVALID_CONFIG_FORMAT",
    "message": "Config format is invalid or malformed"
  }
}
```

------

## ユースケース

### 敏感ワード管理
- **敏感ワードの追加**: フィルタリングリストに新しい敏感ワードを追加します。
- **リストの更新**: 既存の敏感ワードリストを修正します。
- **一括設定**: 複数の敏感ワードを一度に設定します。

### コンテンツ審査
- **動的な調整**: コンテンツの傾向に合わせてリアルタイムでフィルタリングルールを調整します。
- **緊急対応**: フィルタリングが必要な敏感な内容を迅速に追加します。
- **ルールの最適化**: 使用状況に基づいてフィルタリングルールを最適化します。

### プラットフォームガバナンス
- **ポリシーの実行**: プラットフォームのポリシーに従ってコンテンツフィルタリングルールを更新します。
- **地域への適応**: さまざまな地域の規制に合わせて敏感ワードを調整します。
- **コンプライアンス要件**: 法規制のコンテンツ審査要件を満たします。

------

## 注意事項

- **プラットフォーム管理者専用**: この機能はプラットフォーム管理者のみが利用可能で、API Key が必要です。
- **即時反映**: 設定の更新は即時に反映され、すべてのチャット内容に影響します。
- **設定の上書き**: POST リクエストは既存の設定を上書きします。必ず完全なデータを含めるようにしてください。
- **バックアップ推奨**: 更新前に現在の設定を確認してバックアップすることを推奨します。
- **キーワード形式**: 敏感ワードは文字列配列形式で保存され、大文字と小文字が区別されます。
- **ランタイム設定**: ランタイム設定システムを使用するため、サービスを再起動せずに変更を反映できます。
- **完全な更新**: 他の設定が失われないよう、保持する必要があるすべての設定項目を含めることを推奨します。
