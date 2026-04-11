# ユーザーリスト

## 概要

アプリケーション内のユーザーリストを照会および検索します。条件フィルタリング、ページネーションクエリ、および MongoDB クエリ構文を使用した複雑な検索をサポートしています。ユーザー管理、データ分析、およびシステム監視などのシナリオに適しています。

------

## API エンドポイント

### ユーザーリストを照会

アプリケーション内のユーザーリストを取得します。フィルタリングとページネーション機能をサポートしています。

```http
GET /admin/clients
```

#### ヘッダー

| パラメータ         | 型     | 必須 | 説明          |
| ------------ | ------ | ---- | ------------- |
| `IM-API-KEY` | string | ✅    | あなたの API キー |

#### クエリパラメータ (Query Parameters)

| パラメータ | 型     | 必須 | 説明                                          |
| ------- | ------ | ---- | --------------------------------------------- |
| `q`     | string | ❌    | 条件フィルタリング用の MongoDB クエリ構文        |
| `limit` | number | ❌    | 1ページあたりの最大ユーザー数（デフォルト：50、最大：100） |
| `skip`  | number | ❌    | ページネーション用のスキップ件数（デフォルト：0）    |

#### クエリ構文の例

**基本フィルタリング**

```javascript
// ニックネームに "AB" を含むユーザーを検索
q={"nickname": {"$regex": ".*AB.*"}}

// 特定のメールアドレスを持つユーザーを検索
q={"email": "user@example.com"}

// 最近ログインしたユーザー（7日以内）を検索
q={"lastLoginTimeMS": {"$gte": 1640995200000}}
```

**複合条件**

```javascript
// ニックネームに "admin" を含み、かつメールアドレスが設定されているユーザーを検索
q={"nickname": {"$regex": ".*admin.*"}, "email": {"$exists": true}}

// 特定の時間範囲内に登録されたユーザーを検索
q={"createdAt": {"$gte": "2025-01-01T00:00:00Z", "$lt": "2025-02-01T00:00:00Z"}}
```

#### リクエスト例

**すべてのユーザーを取得**

```http
GET /admin/clients?limit=20&skip=0
```

**特定のユーザーを検索**

```http
GET /admin/clients?q=%7B%22nickname%22:%7B%22%24regex%22:%22.*AB.*%22%7D%7D&limit=10
```

**JavaScript 例:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/admin/clients`,
  {
    params: {
      q: JSON.stringify({ nickname: { $regex: ".*AB.*" } }),
      limit: 20,
      skip: 0,
    },
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL 例:**

```bash
curl -X "GET" "https://your-app.imkit.io/admin/clients?q=%7B%22nickname%22%3A%7B%22%24regex%22%3A%22.*AB.*%22%7D%7D&limit=20&skip=0" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ          | 型     | 説明                       |
| ------------------- | ------ | -------------------------- |
| `RC`                | number | レスポンスコード (0 は成功) |
| `RM`                | string | レスポンスメッセージ        |
| `result`            | object | 照会結果                   |
| `result.totalCount` | number | 条件に一致するユーザーの総数 |
| `result.data`       | array  | ユーザーデータの配列         |

**ユーザーオブジェクトの構造**

| パラメータ              | 型     | 説明                               |
| ----------------- | ------ | ---------------------------------- |
| `_id`             | string | ユーザーの一意識別子                 |
| `nickname`        | string | ユーザーの表示名                     |
| `email`           | string | ユーザーのメールアドレス (設定されている場合) |
| `avatarUrl`       | string | ユーザーのアバター URL               |
| `address`         | object | 最終接続時のネットワークアドレス情報   |
| `userAgent`       | string | 最後に使用されたブラウザ/アプリの情報 |
| `lastLoginTimeMS` | number | 最終ログイン時間 (ミリ秒タイムスタンプ) |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 1,
    "data": [
      {
        "_id": "user001",
        "email": "test@example.com",
        "nickname": "Test AB User",
        "avatarUrl": "https://example.com/avatar.jpg",
        "address": {
          "port": 49315,
          "family": "IPv6",
          "address": "::ffff:118.168.96.151"
        },
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "lastLoginTimeMS": 1640995200000
      }
    ]
  }
}
```

#### エラーレスポンス

**400 Bad Request** - クエリ構文エラー

```json
{
  "RC": 400,
  "RM": "Invalid query syntax",
  "error": {
    "code": "INVALID_QUERY",
    "message": "MongoDB query syntax error"
  }
}
```

**401 Unauthorized** - API キーが無効

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

**413 Payload Too Large** - クエリ結果が大きすぎる

```json
{
  "RC": 413,
  "RM": "Query result too large",
  "error": {
    "code": "RESULT_TOO_LARGE",
    "message": "Please use more specific query or smaller limit"
  }
}
```

------

## ユースケース

### ユーザー管理

- **ユーザーリストの表示**: 管理バックエンドですべてのユーザーを表示します。
- **ユーザー検索**: ニックネームやメールアドレスなどの条件に基づいて特定のユーザーを検索します。
- **一括操作**: 複数のユーザーを選択して一括管理を行います。

### データ分析

- **アクティブ度分析**: 最近ログインしたユーザーの統計を照会します。
- **ユーザー分布**: ユーザーの地理的分布やデバイスの使用状況を分析します。
- **成長追跡**: 特定の期間のユーザー成長を追跡します。

### システム監視

- **異常検知**: 異常なログイン動作を行っているユーザーを照会します。
- **キャパシティプランニング**: ユーザー総数と増加傾向を把握します。
- **コンプライアンス審査**: 必要に応じて特定のユーザーデータを照会します。

------

## 注意事項

- **クエリ構文**: 有効な MongoDB クエリ構文を使用する必要があります。
- **URL エンコード**: クエリパラメータは URL エンコードする必要があります。
- **機密情報**: レスポンスにはユーザーのトークンなどの機密情報は含まれません。
- **権限管理**: 管理者権限を持つユーザーのみがこの API を呼び出すことができます。
- **ページネーションの制限**: 1回の照会で返されるデータは最大100件です。
- **インデックスの使用**: 頻繁に使用されるクエリフィールド（nickname、email など）にはインデックスが作成されています。
- **クエリの最適化**: 過度に複雑な正規表現の使用は避けてください。
- **キャッシュの推奨**: 頻繁に変更されないクエリ結果については、キャッシュメカニズムの実装を検討してください。

------

## 付録：MongoDB クエリ構文ガイド

### 基本演算子

| 演算子 | 説明     | 例                                          |
| ------ | -------- | --------------------------------------------- |
| `$eq`  | 等しい   | `{"nickname": {"$eq": "Alice"}}`              |
| `$ne`  | 等しくない | `{"nickname": {"$ne": "Admin"}}`              |
| `$gt`  | より大きい | `{"lastLoginTimeMS": {"$gt": 1640995200000}}` |
| `$gte` | 以上     | `{"createdAt": {"$gte": "2025-01-01"}}`       |
| `$lt`  | 未満     | `{"lastLoginTimeMS": {"$lt": 1640995200000}}` |
| `$lte` | 以下     | `{"createdAt": {"$lte": "2025-12-31"}}`       |

### 文字列操作

| 演算子   | 説明         | 例                                                     |
| -------- | ------------ | -------------------------------------------------------- |
| `$regex` | 正規表現     | `{"nickname": {"$regex": ".*admin.*", "$options": "i"}}` |
| `$in`    | リストに含まれる | `{"_id": {"$in": ["user1", "user2", "user3"]}}`          |
| `$nin`   | リストに含まれない | `{"nickname": {"$nin": ["admin", "test"]}}`              |

### 存在チェック

| 演算子    | 説明     | 例                                       |
| --------- | -------- | ------------------------------------------ |
| `$exists` | フィールドの存在 | `{"email": {"$exists": true}}`             |
| `$type`   | データ型 | `{"lastLoginTimeMS": {"$type": "number"}}` |

------

## ページネーションのベストプラクティス

### 基本的なページネーション

```javascript
// 1ページ目（1ページ20件）
GET /admin/clients?limit=20&skip=0

// 2ページ目
GET /admin/clients?limit=20&skip=20

// 3ページ目
GET /admin/clients?limit=20&skip=40
```

### 大規模データセットの処理

```javascript
// 大量データの場合は、より具体的なクエリ条件を併用することをお勧めします
GET /admin/clients?q={"lastLoginTimeMS":{"$gte":1640995200000}}&limit=50
```

## ページネーションに関するアドバイス

- 大量データの場合は、より具体的なクエリ条件をページネーションと組み合わせて使用することをお勧めします。
- 1回の照会で返されるデータは最大100件です。
