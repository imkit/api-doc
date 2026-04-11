# ブロックユーザーの一覧表示 (List Blocked Users)

## 概要

現在のユーザーの完全なブロックリストを取得し、ブロックされているすべてのユーザーの詳細情報を表示します。この API は、ブロックされたユーザーの基本情報、ブロック時間、関連するチャットルーム情報など、ユーザーが自身のブロックリストを管理する機能を提供し、ユーザーが自身のプライバシー設定を確認および管理するのに適しています。

------

## API エンドポイント

### ブロックリストを取得する

現在のユーザーが作成したすべてのブロック関係の詳細情報を取得します。

```http
GET /blockStatus/my
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### リクエスト例

**完全なブロックリストを取得する**

```http
GET /blockStatus/my HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/blockStatus/my`,
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
curl -X "GET" "https://your-app.imkit.io/blockStatus/my" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス (Response)

**成功レスポンス（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0 は成功を示す） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | ブロックリストデータ |

**結果オブジェクトの構造**

| パラメータ | 型 | 説明 |
| ------ | ----- | ------------------ |
| `data` | array | ブロック関係リストの配列 |

**ブロック関係オブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------- | ------ | ----------------------------- |
| `blockee` | object | ブロックされたユーザーの詳細情報 |
| `blocker` | string | ブロックを実行したユーザー ID |
| `room` | object | 関連するチャットルームの詳細情報 |
| `createdAt` | string | ブロック作成日時 |
| `updatedAt` | string | ブロック更新日時 |

**ブロックされたユーザーオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------------- | ------ | ----------------------------- |
| `_id` | string | ユーザー一意識別子 |
| `nickname` | string | ユーザーのニックネーム |
| `avatarUrl` | string | ユーザーのアバター URL |
| `id` | string | ユーザー ID |
| `lastLoginTimeMS` | number | 最終ログイン時間（ミリ秒タイムスタンプ） |

**チャットルームオブジェクトの構造**

| パラメータ | 型 | 説明 |
| --------------- | ------ | --------------------------------- |
| `_id` | string | チャットルーム一意識別子 |
| `roomType` | string | チャットルームの種類（direct/group） |
| `id` | string | チャットルーム ID |
| `createdTimeMS` | number | チャットルーム作成時間（ミリ秒タイムスタンプ） |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "blockee": {
          "_id": "ccc",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
          "nickname": "Cathy",
          "id": "ccc",
          "lastLoginTimeMS": 1600006869368
        },
        "blocker": "aaa",
        "room": {
          "_id": "2bec603e94a210092439e83ff2d79ac1",
          "roomType": "direct",
          "id": "2bec603e94a210092439e83ff2d79ac1",
          "createdTimeMS": 1628089206798
        },
        "createdAt": "2021-08-04T15:18:10.735Z",
        "updatedAt": "2021-08-04T15:18:10.735Z"
      },
      {
        "blockee": {
          "_id": "ddd",
          "nickname": "Dina",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628088855",
          "id": "ddd",
          "lastLoginTimeMS": 1628094314986
        },
        "blocker": "aaa",
        "room": {
          "_id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "roomType": "direct",
          "id": "8ab6c2ec1f2ee3f7d46cea03bdca4c9b",
          "createdTimeMS": 1628089213796
        },
        "createdAt": "2021-08-04T15:18:07.649Z",
        "updatedAt": "2021-08-04T15:18:07.649Z"
      }
    ]
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
    "message": "You don't have permission to access this resource"
  }
}
```

------

## 使用シーン

### 個人のプライバシー管理
- **ブロックリストの確認**：現在ブロックしているすべてのユーザーを確認します。
- **プライバシー設定の管理**：個人のプライバシー状態を統一的に確認および管理します。
- **関係ステータスの確認**：特定のユーザーのブロックステータスを確認します。

### ユーザー体験の最適化
- **リスト管理インターフェース**：完全なブロックユーザー管理機能を提供します。
- **迅速なブロック解除**：リストからブロックを解除したいユーザーを素早く選択します。
- **ステータスの同期**：各プラットフォーム間でブロックリストの一貫性を確保します。

### システム管理
- **行動追跡**：ユーザーのブロック行動パターンを把握します。
- **関係分析**：ユーザー間のインタラクション関係を分析します。
- **データ統計**：ブロック機能の使用状況を統計します。

------

## 注意事項

- **自身のリストのみ表示**：現在認証されているユーザーが作成したブロック関係のみを表示できます。
- **完全な情報の提供**：ブロックされたユーザーおよび関連するチャットルームの詳細情報が含まれます。
- **時間順のソート**：通常、ブロックした時間の順にソートされて表示されます。
- **チャットルームの種類**：直接チャット（direct）およびグループチャット（group）のブロック関係をサポートします。
- **即時性**：現在の最新のブロックリストステータスを返します。
- **空のリストの処理**：ユーザーを一人もブロックしていない場合は、空の配列が返されます。
