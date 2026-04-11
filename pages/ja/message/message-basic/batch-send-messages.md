# メッセージの一括送信

## 概要

プラットフォーム管理 API を使用して、複数のチャットルームまたは複数のユーザーに対して一度にメッセージを送信します。テンプレート変数の置換をサポートしており、一斉通知、マーケティングプッシュ、システムお知らせなどのシナリオに適しています。

------

## API エンドポイント

### メッセージの一括送信

メッセージを複数のチャットルーム、またはユーザーの 1 対 1 チャットルームに送信します。

```http
POST /messages/batch
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | 平台 API キー |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### ポストボディ

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `message` | string | ✅ | メッセージ内容。`$pattern$` テンプレート置換をサポート |
| `messageType` | string | ✅ | メッセージタイプ（例：`"text"`） |
| `sender` | string | ❌ | 送信者 ID を指定（管理者のみ利用可能） |
| `push` | boolean | ❌ | プッシュ通知を有効にするかどうか。デフォルトは `false` |
| `skipTotalBadge` | boolean | ❌ | 送信者の総未読数の計算をスキップするかどうか。デフォルトは `false` |
| `paras` | array[object] | ✅ | 受信者パラメータの配列 |

**受信者パラメータオブジェクト**

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `receiver` | string | ❌ | 受信者のユーザー ID（1 対 1 チャットルームに送信） |
| `room` | string | ❌ | チャットルーム ID（指定された場合、`receiver` は無視されます） |
| `$pattern$` | string | ❌ | テンプレート変数の置換値 |

#### リクエスト例

**基本的な一括送信**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "システムお知らせ：明日、定期メンテナンスを行います",
    push: true,
    sender: "system",
    paras: [
      { receiver: "user-a" },
      { receiver: "user-b" },
      { receiver: "user-c" },
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

**テンプレート変数の使用**

メッセージ内で `$pattern$` で囲まれた変数は、各受信者に対応する値に置換されます。

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "こんにちは $name$ 様、ご注文の $orderId$ が発送されました！",
    push: true,
    sender: "system",
    paras: [
      {
        receiver: "user-a",
        "$name$": "Alice",
        "$orderId$": "ORD-001",
      },
      {
        receiver: "user-b",
        "$name$": "Bob",
        "$orderId$": "ORD-002",
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

**指定したチャットルームへの送信**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/messages/batch",
  {
    messageType: "text",
    message: "イベントリマインド：明日 14:00 開始",
    sender: "system",
    paras: [
      { room: "room-001" },
      { room: "room-002" },
      { room: "room-003" },
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

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| ---- | ---- | ---- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result.batchID` | string | 一括タスク ID |
| `result.count` | number | 受信者数 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "batchID": "batch-20260410-abc123",
    "count": 3
  }
}
```

#### エラーレスポンス

リクエストが失敗した場合、エラーの詳細情報を含むレスポンスが返されます。一般的なエラーには以下が含まれます：

- **無効な API キー** — 提供された `IM-API-KEY` が無効または期限切れです。
- **必須パラメータの欠落** — `message`、`messageType`、または `paras` が提供されていません。
- **受信者が存在しない** — `paras` 内の `receiver` が存在しません。
- **サーバー内部エラー** — サーバー側で予期しないエラーが発生しました。

------

## 使用シーン

### 一斉通知
- **システムお知らせ**: すべてのユーザーにメンテナンス通知や重要なお知らせをプッシュします。
- **イベントプッシュ**: 特定のユーザーグループにイベントや特典情報を送信します。

### パーソナライズされたメッセージ
- **テンプレートメッセージ**: `$pattern$` 変数を使用して、個人情報（注文番号、ユーザー名など）を含む通知を送信します。
- **会計通知**: 支払期限や支払い完了などのパーソナライズされた通知を送信します。

------

## 注意事項

- **非同期処理**: 一括メッセージは処理キューに追加されます。レスポンスはタスクが作成されたことのみを示します。
- **テンプレート置換**: 変数名は `$` で囲む必要があります（例：`$name$`）。置換は `message` および `extra` フィールドに適用されます。
- **受信者の優先順位**: `paras` 内で `receiver` と `room` の両方が指定された場合、`room` が優先されます。
- **プッシュ通知はデフォルトでオフ**: `push` はデフォルトで `false` です。プッシュ通知を行うには明示的に `true` に設定する必要があります。
