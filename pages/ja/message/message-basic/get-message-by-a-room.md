# チャットルームのメッセージ取得

## 概要

指定されたチャットルームのメッセージ履歴を取得します。時間範囲によるフィルタリングやページネーションをサポートしています。この API は[メッセージリスト](/ja/message/message-basic/list-messages)と同じエンドポイント `GET /rooms/{id}/messages/v3` を使用していますが、このページでは一般的な照会シナリオと例に焦点を当てています。

------

## API エンドポイント

### チャットルームの全メッセージ取得

指定されたチャットルームのメッセージ履歴を取得します。ページネーションと時間によるフィルタリングをサポートしています。

```http
GET /rooms/{id}/messages/v3
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | ユーザートークン |

#### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅ | チャットルーム ID |

#### クエリパラメータ

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | ------------------------------------------------------- |
| `limit` | number | ❌ | 返されるメッセージの最大数（デフォルト：20、推奨 50-100） |
| `beforeMessage` | string | ❌ | 指定したメッセージ ID より前のメッセージを照会（過去方向へのページネーション用） |
| `afterMessage` | string | ❌ | 指定したメッセージ ID より後のメッセージを照会（未来方向へのページネーション用） |
| `afterTime` | string | ❌ | 指定した時間以降のメッセージを照会（ISO-8601 またはミリ秒タイムスタンプ形式） |
| `timeRangeField` | string | ❌ | 時間範囲照会の基準フィールド：updatedAt, createdAt, messageTime（デフォルト：updatedAt） |

#### リクエスト例

**チャットルームの最新メッセージを取得**

```http
GET /rooms/demo-room/messages/v3?limit=50 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**履歴メッセージの取得（ページネーション）**

```http
GET /rooms/demo-room/messages/v3?limit=50&beforeMessage=5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**特定時間以降のメッセージを取得**

```http
GET /rooms/demo-room/messages/v3?afterTime=2024-01-01T00:00:00Z&limit=100 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/demo-room/messages/v3`,
  {
    params: {
      limit: 50,
    },
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 例：**

```bash
curl -X "GET" "https://your-app.imkit.io/rooms/demo-room/messages/v3?limit=50" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | メッセージ照会結果 |

**照会結果の構造**

| パラメータ | 型 | 説明 |
| ------------------ | ------ | --------------------------------------- |
| `totalCount` | number | チャットルーム内のメッセージ総数 |
| `data` | array | メッセージ配列（時系列順） |
| `userDeletedIDs` | array | 現在のユーザーが削除したメッセージ ID の配列 |
| `inspect` | object | 診断情報（照会条件と実行時間を含む） |

**メッセージオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ---------------- | ------- | ----------------------------- |
| `_id` | string | メッセージ一意識別子 |
| `message` | any | メッセージ内容 |
| `room` | string | 所属チャットルーム ID |
| `sender` | object | 送信者情報 |
| `messageType` | string | メッセージタイプ |
| `messageTimeMS` | number | メッセージ送信時間（ミリ秒タイムスタンプ） |
| `updatedAtMS` | number | メッセージ更新時間（ミリ秒タイムスタンプ） |
| `createdAtMS` | number | メッセージ作成時間（ミリ秒タイムスタンプ） |
| `reactions` | array | メッセージへのリアクションリスト |
| `reactionCount` | number | リアクション総数 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "totalCount": 245,
    "inspect": {
      "query": {
        "appID": "SampleApp",
        "room": "demo-room",
        "status": { "$ne": 0 }
      },
      "tookMS": 8
    },
    "data": [
      {
        "reactions": [],
        "_id": "5f890cf37d980e06f6aaf349",
        "message": "Hello everyone! Welcome to our chat room.",
        "room": "demo-room",
        "sender": {
          "_id": "user123",
          "nickname": "Alice",
          "avatarUrl": "https://example.com/avatar1.jpg",
          "id": "user123",
          "lastLoginTimeMS": 1640995200000
        },
        "messageType": "text",
        "id": "5f890cf37d980e06f6aaf349",
        "messageTimeMS": 1640995200000,
        "updatedAtMS": 1640995200001,
        "createdAtMS": 1640995200001,
        "reactionCount": 0
      }
    ],
    "userDeletedIDs": []
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
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "User is not a member of this room"
  }
}
```

**404 Not Found** - チャットルームが存在しない

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room with specified ID does not exist"
  }
}
```

------

## 使用シーン

### チャットルームの読み込み
- **初期読み込み**: ユーザーがチャットルームに入った時に最新メッセージを読み込みます。
- **履歴閲覧**: ユーザーが上にスクロールして過去のメッセージ履歴を表示します。
- **リフレッシュ**: チャットルームの全対話内容を再読み込みします。

### メッセージの同期
- **オフライン同期**: ユーザーが再ログインした時に不在時のメッセージを同期します。
- **マルチデバイス同期**: 複数のデバイス間でメッセージの一貫性を保ちます。
- **バックアップからの復元**: バックアップからチャットルームの全履歴を復元します。

### コンテンツ分析
- **対話分析**: チャットルーム内の対話パターンや人気トピックを分析します。
- **アクティビティ統計**: チャットルームのメッセージ量とユーザー参加度を集計します。
- **コンテンツ監査**: チャットルーム内のすべての対話内容を監査します。

------

## 注意事項

- **権限要件**: チャットルームのメンバーのみがメッセージ内容を取得できます。
- **ページネーションの推奨**: 一度に大量のデータを読み込むのを避けるため、適切な limit 値（20-100）を使用することをお勧めします。
- **時間順**: メッセージは updatedAt 時間でソートされ、最新メッセージが最初になります。
- **削除済みメッセージの処理**: `userDeletedIDs` 配列には現在のユーザーが削除したメッセージが含まれているため、UI でフィルタリングする必要があります。
- **パフォーマンス最適化**: 大規模なチャットルームでは、照会パフォーマンスを向上させるために時間範囲の制限を使用することをお勧めします。
- **リアルタイム更新**: この API は一括読み込みに適しています。リアルタイムメッセージには WebSocket 接続の使用をお勧めします。
