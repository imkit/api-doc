# チャットルームごとの未読メッセージ取得

## 概要

チャットルームのタグに基づいて未読メッセージ数を集計します。この API を使用すると、チャットルームのタグごとに未読メッセージをグループ化して集計できるため、異なるタイプのチャットルームの未読状態の表示、メッセージサマリーの作成、通知アラートの管理に適しています。

------

## API エンドポイント

### チャットルームタグによる未読メッセージ集計

指定されたチャットルームタグに基づいて未読メッセージ数を集計します。

```http
POST /badges/byRoomTags
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | ユーザートークン |

#### ポストボディ

| パラメータ | 型 | 必須 | 説明 |
| ------ | ------ | ---- | --------------------------------------- |
| `tags` | array | ❌ | チャットルームタグの配列（省略時はすべてのタグを照会） |

#### リクエスト例

**特定のタグの未読数を照会**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: fangho_imkit_0412_2018_001_clientkey
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": ["demo", "sample"]
}
```

**業務関連チャットルームの未読数を照会**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": ["work", "project", "meeting"]
}
```

**すべてのタグの未読数を照会**

```http
POST /badges/byRoomTags HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "tags": []
}
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/badges/byRoomTags`,
  {
    tags: ["demo", "sample"],
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
curl -X "POST" "https://your-app.imkit.io/badges/byRoomTags" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"tags": ["demo", "sample"]}'
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 集計結果 |

**集計結果の構造**

| パラメータ | 型 | 説明 |
| ------------ | ------ | --------------------------------- |
| `totalBadge` | number | 照会したすべてのタグの未読メッセージ総数 |
| `data` | object | 各タグに対応する未読メッセージ数 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalBadge": 15,
    "data": {
      "demo": 2,
      "sample": 0,
      "work": 8,
      "project": 3,
      "meeting": 2
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
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

**400 Bad Request** - リクエストパラメータが無効

```json
{
  "RC": 400,
  "RM": "Invalid parameters",
  "error": {
    "code": "INVALID_TAGS",
    "message": "Tags must be an array of strings"
  }
}
```

------

## 使用シーン

### 未読状態の表示
- **タグによるグループ化**: チャットルームリストでタグごとに未読数を表示します。
- **重要度による分類**: タグの優先度に応じて異なる通知ステータスを表示します。
- **視覚的なアラート**: 未読メッセージのタイプを異なる色やスタイルで示します。

### 通知管理
- **スマート通知**: チャットルームのタグに基づいて異なる通知ポリシーを設定します。
- **一括操作**: 特定のタグを持つチャットルームのメッセージを一括で既読にします。
- **フィルタリング制御**: ユーザーが特定のタグを持つチャットルームのみに注目できるようにします。

### データ統計
- **アクティビティ分析**: 異なるタイプのチャットルームのアクティビティレベルを分析します。
- **ワークフロー**: 業務関連チャットルームの未処理メッセージを集計します。
- **優先度管理**: 優先的に処理が必要なチャットルームのタイプを識別します。

------

## 注意事項

- **タグの権限**: ユーザーがアクセス権を持つチャットルームのみが集計されます。
- **空の配列の処理**: 空の配列を渡すと、利用可能なすべてのタグが照会されます。
- **即時性**: 集計結果は照会時点のリアルタイムデータです。
- **タグの一致**: 指定されたタグ名と完全に一致するもののみが対象となります。
- **パフォーマンスの考慮**: 大量のタグを照会する場合、レスポンス時間に影響を与える可能性があります。
- **ゼロ値の表示**: 未読メッセージがないタグは 0 と表示されます。
