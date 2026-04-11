# ユーザーの一括作成

## 概要

このエンドポイントを使用すると、一度に複数のユーザーを作成または更新できます。システムの移行やユーザーの大量インポートなどのシナリオに適しています。この API はサーバーサイド専用であり、適切な認証が必要です。

------

## API エンドポイント

### ユーザーの一括作成または更新

一度に複数のクライアント（ユーザー）を作成または更新します。

```http
POST /admin/clients/list
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | プラットフォーム API キー |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### リクエストボディ (Post Body)

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `data` | array[object] | ✅ | ユーザー情報の配列 |

**ユーザー情報オブジェクト**

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `_id` | string | ✅ | ユーザーの一意識別子 |
| `nickname` | string | ❌ | ユーザーの表示名 |
| `avatarUrl` | string | ❌ | ユーザーのアバター画像 URL |

#### リクエスト例

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/admin/clients/list",
  {
    data: [
      {
        _id: "user-001",
        nickname: "Alice",
        avatarUrl: "https://example.com/alice.jpg",
      },
      {
        _id: "user-002",
        nickname: "Bob",
        avatarUrl: "https://example.com/bob.jpg",
      },
      {
        _id: "user-003",
        nickname: "Charlie",
        avatarUrl: "https://example.com/charlie.jpg",
      },
    ],
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

##### cURL 例

```bash
curl -X "POST" "https://your-app.imkit.io/admin/clients/list" \
     -H 'IM-API-KEY: {IM-API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "data": [
    {"_id": "user-001", "nickname": "Alice", "avatarUrl": "https://example.com/alice.jpg"},
    {"_id": "user-002", "nickname": "Bob", "avatarUrl": "https://example.com/bob.jpg"}
  ]
}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型 | 説明 |
| ---- | ---- | ---- |
| `RC` | number | レスポンスコード (0 は成功) |
| `RM` | string | レスポンスメッセージ |
| `result.count` | number | 正常に作成または更新されたユーザー数 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 3
  }
}
```

#### エラーレスポンス

リクエストが失敗した場合、エラーの詳細情報を含むエラーレスポンスが返されます。一般的なエラーシナリオは以下の通りです：

- **無効な API キー** — 提供された `IM-API-KEY` が無効であるか、期限切れです
- **データ形式エラー** — `data` 配列の形式が正しくありません
- **必須フィールドの欠落** — ユーザー情報に `_id` が含まれていません
- **サーバー内部エラー** — サーバー側で予期しないエラーが発生しました

------

## ユースケース

### システム移行
- **ユーザーインポート**: 既存のシステムから IMKIT へユーザーデータを移行します。
- **一括初期化**: アプリケーション起動時にすべてのユーザーを一括作成します。

### データ同期
- **定期同期**: メインシステムからユーザーデータ（ニックネーム、アバターなど）を定期的に同期します。
- **情報の更新**: 複数のユーザーの表示名やアバターを一括更新します。

------

## 注意事項

- **サーバーサイド専用**: このエンドポイントはバックエンドから呼び出す必要があります。
- **トークンを生成しない**: この API はユーザーのアクセストークンを生成しません。トークンが必要な場合は、「ユーザーの作成」API を使用し、`issueAccessToken: true` を設定してください。
- **冪等性**: `_id` が既に存在する場合、新しいユーザーを作成するのではなく、既存のユーザーデータを更新します。
- **パフォーマンスの考慮**: リクエストのタイムアウトを避けるため、1回の一括処理は100件以内に抑えることをお勧めします。
