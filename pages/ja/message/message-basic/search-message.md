# メッセージの検索

## 概要

キーワードを使用してメッセージ内容を検索します。この API は汎用的な検索機能を使用し、メッセージ内容に基づいて全文検索を行うことができます。すべてのチャットルームを対象とした検索や、特定のチャットルーム内に範囲を限定した検索が可能で、特定のメッセージ内容を素早く見つけるのに適しています。

------

## API エンドポイント

### メッセージ内容の検索

メッセージ内容に含まれるキーワードを使用して検索を行います。

```http
POST /search
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | ユーザートークン |

#### ポストボディ

| パラメータ | 型 | 必須 | 説明 |
| ---------- | -------- | ---- | ----------------------------------------- |
| `type` | array | ✅ | 検索タイプ。`["messages"]` に設定します |
| `keyword` | string | ✅ | 検索キーワード（メッセージ内容を検索） |
| `room` | string | ❌ | 特定のチャットルーム内に検索を制限 |
| `roomTags` | array | ❌ | 指定されたタグを持つチャットルーム内に検索を制限 |
| `limit` | number | ❌ | 最大検索結果数 |

#### リクエスト例

**すべてのチャットルームでメッセージを検索**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "hello",
  "limit": 20
}
```

**特定のチャットルームでメッセージを検索**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "project update",
  "room": "demo-room"
}
```

**特定のタグを持つチャットルームで検索**

```http
POST /search HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "type": ["messages"],
  "keyword": "meeting",
  "roomTags": ["work", "team"]
}
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/search`,
  {
    type: ["messages"],
    keyword: "hello",
    limit: 20,
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json",
    },
  }
);
```

**cURL 例：**

```bash
curl -X "POST" "https://your-app.imkit.io/search" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"type": ["messages"], "keyword": "hello", "limit": 20}'
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 検索結果 |

**検索結果の構造**

| パラメータ | 型 | 説明 |
| ---------- | ------ | --------------------------------- |
| `messages` | array | 検索されたメッセージグループ（チャットルームごとにグループ化） |

**メッセージグループオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ---------- | ------ | ------------------------- |
| `room` | object | チャットルーム情報 |
| `messages` | array | そのチャットルーム内で一致したメッセージ ID |

**チャットルーム情報オブジェクトの構造**

| パラメータ | 型 | 説明 |
| --------------- | ------- | ------------------------- |
| `_id` | string | チャットルームの一意識別子 |
| `name` | string | チャットルーム名 |
| `cover` | string | チャットルームのカバー画像 URL |
| `description` | string | チャットルームの説明 |
| `roomTags` | array | チャットルームタグのリスト |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "messages": [
      {
        "room": {
          "_id": "demo-room",
          "name": "Demo Room",
          "cover": "http://example.com/cover.jpg",
          "description": "Demo room for testing",
          "roomTags": ["demo", "test"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf349",
          "5f890cf37d980e06f6aaf350",
          "5f890cf37d980e06f6aaf351"
        ]
      },
      {
        "room": {
          "_id": "work-room",
          "name": "Work Discussion",
          "cover": "http://example.com/work-cover.jpg",
          "description": "Work related discussions",
          "roomTags": ["work"]
        },
        "messages": [
          "5f890cf37d980e06f6aaf352"
        ]
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

**400 Bad Request** - 検索パラメータが無効

```json
{
  "RC": 400,
  "RM": "Invalid search parameters",
  "error": {
    "code": "INVALID_SEARCH_TYPE",
    "message": "Search type must include 'messages'"
  }
}
```

------

## 使用シーン

### メッセージ検索
- **キーワード検索**: 特定のキーワードを含む過去のメッセージを素早く見つけます。
- **内容の振り返り**: 大量のメッセージの中から関連する対話内容を探し出します。
- **情報検索**: 特定のトピックやプロジェクトに関連する議論を検索します。

### チャットルーム管理
- **コンテンツ監査**: 特定の単語を含むメッセージを検索して監査します。
- **データ分析**: チャットルームで議論されている人気トピックを分析します。
- **コンプライアンスチェック**: 違反の可能性があるメッセージ内容を検索します。

### ユーザーエクスペリエンス
- **スマート検索**: ユーザーに過去の対話を素早く検索する機能を提供します。
- **関連表示**: 検索キーワードに関連するすべてのメッセージを表示します。
- **複数ルーム検索**: 複数のチャットルームから同時に必要な内容を検索します。

------

## 注意事項

- **検索範囲**: 現在のユーザーがアクセス権を持つチャットルームとメッセージのみが検索対象となります。
- **キーワード一致**: 全文検索をサポートし、メッセージ内容のキーワードに一致します。
- **結果のグループ化**: 検索結果はチャットルームごとにグループ化されるため、メッセージのソースがわかりやすくなっています。
- **権限制御**: 検索結果はユーザーのチャットルーム権限に基づいてフィルタリングされます。
- **パフォーマンスの考慮**: 広範囲の検索には時間がかかる場合があるため、適切な limit 値を設定することをお勧めします。
- **メッセージ ID**: 返されるのはメッセージ ID の配列です。完全なメッセージ内容を取得するには、別途 API の呼び出しが必要になる場合があります。
