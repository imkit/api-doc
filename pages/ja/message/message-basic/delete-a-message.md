# メッセージの削除

## 概要

管理者権限専用のメッセージ削除機能です。プラットフォーム管理者、チャットルームのオーナー、およびチャットルームの管理者が、指定したメッセージを削除したり、チャットルーム内のすべてのメッセージを消去したりすることができます。この機能は、コンテンツ管理、違反コンテンツのクリーンアップ、およびチャットルームのメンテナンスに適しています。

------

## API エンドポイント

### チャットルームメッセージの削除

チャットルーム内の特定のメッセージまたはすべてのメッセージを削除します。管理権限を持つユーザーのみが使用できます。

```http
DELETE /rooms/{roomID}/messages/{messageID}
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | ユーザートークン |

#### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
| ----------- | ------ | ---- | --------------------------------------------------- |
| `roomID` | string | ✅ | チャットルーム ID |
| `messageID` | string | ✅ | 削除するメッセージ ID。または `_all` を使用してチャットルーム内のすべてのメッセージを削除 |

#### リクエスト例

**特定のメッセージを削除**

```http
DELETE /rooms/test-room-123/messages/5f890cf37d980e06f6aaf349 HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Connection: close
```

**チャットルームのすべてのメッセージを削除**

```http
DELETE /rooms/test-room-123/messages/_all HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Content-Type: application/json; charset=utf-8
Connection: close
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 削除操作の結果 |

**削除結果オブジェクトの構造**

| パラメータ | 型 | 説明 |
| -------------- | ------ | ----------------------------- |
| `deletedCount` | number | 削除されたメッセージの数 |
| `roomID` | string | チャットルーム ID |
| `messageID` | string | 削除されたメッセージ ID（または "_all"） |
| `deletedBy` | string | 削除操作を実行したユーザー ID |
| `deletedAt` | string | 削除日時 |

#### レスポンス例

**単一メッセージの削除**

```json
{
  "RC": 0,
  "RM": "Message deleted successfully",
  "result": {
    "deletedCount": 1,
    "roomID": "test-room-123",
    "messageID": "5f890cf37d980e06f6aaf349",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
  }
}
```

**すべてのメッセージの削除**

```json
{
  "RC": 0,
  "RM": "All messages deleted successfully",
  "result": {
    "deletedCount": 145,
    "roomID": "test-room-123",
    "messageID": "_all",
    "deletedBy": "admin-user-id",
    "deletedAt": "2023-10-15T10:30:45.123Z"
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
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSION",
    "message": "Only platform admin, room owner or room manager can delete messages"
  }
}
```

**404 Not Found** - メッセージまたはチャットルームが存在しない

```json
{
  "RC": 404,
  "RM": "Message not found",
  "error": {
    "code": "MESSAGE_NOT_FOUND",
    "message": "The specified message does not exist in this room"
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
    "message": "The specified room does not exist"
  }
}
```

------

## 使用シーン

### コンテンツ管理
- **違反対応**: コミュニティガイドラインに違反する不適切なメッセージを削除します。
- **スパム対策**: 広告メッセージやスパムコンテンツをクリーンアップします。
- **機密内容**: 機密情報を含むメッセージを削除します。

### チャットルームのメンテナンス
- **チャットルームのリセット**: チャットルームを空にして対話をやり直します。
- **テストデータのクリーンアップ**: テスト環境のテスト用メッセージを削除します。
- **定期メンテナンス**: 古すぎるメッセージ内容を定期的に削除します。

### 管理操作
- **緊急対応**: 直ちに削除が必要なコンテンツを迅速に処理します。
- **一括クリーンアップ**: チャットルーム内のすべてのメッセージを一度に削除します。
- **権限制御**: 許可されたユーザーのみが削除操作を実行できるようにします。

------

## 注意事項

- **権限制限**: プラットフォーム管理者、チャットルームオーナー、およびチャットルーム管理者に限定されます。
- **永久削除**: 削除されたメッセージは復元できません。慎重に使用してください。
- **一括削除**: `_all` パラメータを使用すると、チャットルーム内のすべてのメッセージが削除されます。
- **操作ログ**: すべての削除操作は、実行者と日時が記録されます。
- **即時反映**: 削除操作は即座に反映され、すべてのユーザーからメッセージが見えなくなります。
- **通知メカニズム**: 削除操作により、関連する通知やイベントがトリガーされる場合があります。
- **撤回との違い**: この機能は強制的な削除であり、ユーザーによる自発的な撤回機能とは異なります。
