# ユーザーの未読メッセージ取得

## 概要

現在のユーザーの総未読メッセージ数を取得します。この API は、ユーザーが権限を持つすべてのチャットルームにおける未読メッセージの総計を算出でき、チャットルームタグによるフィルタリング集計もサポートしています。ユーザー全体の未読状態を表示するのに適しています。

------

## API エンドポイント

### ユーザーの未読メッセージ総数の取得

現在のユーザーの未読メッセージ数を取得します。オプションでタグによるフィルタリングが可能です。

```http
GET /me/badge
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | ユーザートークン |

#### クエリパラメータ

| パラメータ | 型 | 必須 | 説明 |
| ---------- | ------ | ---- | --------------------------------------------------------- |
| `roomTags` | string | ❌ | チャットルームタグによるフィルタリング（複数指定可能） |

#### リクエスト例

**総未読メッセージ数の取得**

```http
GET /me/badge HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**特定のタグの未読メッセージ数の取得**

```http
GET /me/badge?roomTags=demo&roomTags=foo HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**業務関連チャットルームの未読メッセージ数の取得**

```http
GET /me/badge?roomTags=work&roomTags=project&roomTags=meeting HTTP/1.1
IM-Authorization: {IM-Authorization}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/me/badge`,
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
curl -X "GET" "https://your-app.imkit.io/me/badge" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 未読メッセージ集計結果 |

**結果オブジェクトの構造**

| パラメータ | 型 | 説明 |
| ------- | ------ | --------------------------------------- |
| `badge` | number | 未読メッセージ数（条件に一致するすべてのチャットルームの合計） |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "badge": 10
  }
}
```

**タグによるフィルタリング時のレスポンス例**

```json
{
  "RC": 0,
  "RM": "OK", 
  "result": {
    "badge": 5
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

**400 Bad Request** - パラメータが無効

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_ROOM_TAGS",
    "message": "Room tags must be valid strings"
  }
}
```

------

## 使用シーン

### グローバルな通知表示
- **総数の表示**: アプリケーションのアイコンやタイトルバーに未読メッセージの総数を表示します。
- **バッジ表示**: モバイルアプリのバッジ（数字）表示に使用します。
- **ステータス表示**: ユーザーが処理すべき未読メッセージがあるかどうかを判断します。

### カテゴリ別の集計
- **業務メッセージ**: 業務関連チャットルームの未読数を集計します。
- **個人メッセージ**: 個人またはプライベートチャットの未読数を集計します。
- **システム通知**: システムお知らせタイプのチャットルームの未読数を集計します。

### ユーザーエクスペリエンスの最適化
- **スマート通知**: 未読数に応じて通知頻度を調整します。
- **優先順位表示**: タグの重要度に応じて優先的に表示します。
- **クイックアクセス**: 未読メッセージがあるチャットルームへのクイックジャンプを提供します。

------

## 注意事項

- **権限制御**: ユーザーがアクセス権を持つチャットルームのみが集計されます。
- **タグフィルタリング**: 複数の `roomTags` パラメータを使用して AND 条件でフィルタリングできます。
- **即時性**: 照会時点のリアルタイムな未読数を返します。
- **パフォーマンスの考慮**: 頻繁な照会はパフォーマンスに影響を与える可能性があるため、適切な使用を推奨します。
- **パラメータ形式**: 複数タグの場合は `roomTags=tag1&roomTags=tag2` 形式を使用します。
- **ゼロ値の処理**: 未読メッセージがない場合は 0 を返します。
