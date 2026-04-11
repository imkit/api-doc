# チャットルームの凍結 (Freeze Chatroom)

## 概要

チャットルームの凍結機能は、チャットルームのステータスを更新することで、チャットルームの使用を一時停止または無効化します。チャットルームのステータスが無効（status=0）に設定されると、チャットルームは凍結され、ユーザーはその中で通常の対話を行うことができなくなります。この機能は、コンテンツ管理、違反対応、およびチャットルームのメンテナンスに適しています。

------

## API エンドポイント

### 指定したチャットルームを凍結する

チャットルームのステータスを更新してチャットルームを凍結し、無効な状態にします。

```http
PUT /rooms/{id}
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### パスパラメータ (Path Parameters)

| パラメータ | 型 | 必須 | 説明 |
| ---- | ------ | ---- | ----------- |
| `id` | string | ✅ | チャットルーム ID |

#### ポストボディ (Post Body)

| パラメータ | 型 | 必須 | 説明 |
| -------- | ------ | ---- | ---------------------------------- |
| `status` | number | ✅ | チャットルームのステータス：0=無効（凍結）、1=有効 |

#### リクエスト例

**チャットルームを凍結する**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "status": 0
}
```

**チャットルームの凍結を解除する**

```http
PUT /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Content-Type: application/json; charset=utf-8
Host: your-app.imkit.io
Connection: close

{
  "status": 1
}
```

**JavaScript 例：**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomId}`,
  {
    status: 0,
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
curl -X "PUT" "https://your-app.imkit.io/rooms/{id}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json' \
     -d '{"status": 0}'
```

#### レスポンス (Response)

**成功レスポンス（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0 は成功を示す） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 更新後のチャットルームデータ |

**チャットルームオブジェクトの構造**

| パラメータ | 型 | 説明 |
| --------------- | ------ | ------------------------- |
| `_id` | string | チャットルーム一意識別子 |
| `name` | string | チャットルーム名 |
| `cover` | string | チャットルームのカバー画像 URL |
| `description` | string | チャットルームの説明 |
| `status` | number | チャットルームのステータス（0=凍結、1=正常）|
| `lastMessage` | object | 最後のメッセージ情報 |
| `members` | array | チャットルームのメンバーリスト |

#### レスポンス例

**チャットルームの凍結成功**

```json
{
  "RC": 0,
  "RM": "Room frozen successfully",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "name": "Test Room",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "description": "This room has been frozen",
    "status": 0,
    "lastMessage": {
      "_id": "588723a346006e17f4d82fe3",
      "message": "Last message before freeze",
      "messageType": "text",
      "sender": {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 0
      },
      "messageTimeMS": 1485251491375
    },
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test User",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTimeMS": 1485764751552
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
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner, manager, or platform admin can freeze room"
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

### コンテンツ管理
- **違反対応**：コミュニティ規範に違反したチャットルームを一時的に凍結します。
- **緊急事態**：緊急事態が発生した際に、チャットルームを迅速にブロックします。
- **コンテンツ審査**：チャットルームを一時的に凍結してコンテンツ審査を行います。

### チャットルームのメンテナンス
- **システムメンテナンス**：システムメンテナンス中にチャットルームを一時的に凍結します。
- **機能更新**：チャットルームの機能更新時に一時的に停止します。
- **データ移行**：データ移行中にチャットルームの使用を一時停止します。

### 管理操作
- **一括管理**：複数のチャットルームを一括で凍結または凍結解除します。
- **権限管理**：許可されたユーザーのみが凍結操作を実行できるようにします。
- **ステータス追跡**：チャットルームの凍結ステータスと履歴を監視します。

------

## 注意事項

- **権限制限**：チャットルームのオーナー、管理者、またはプラットフォーム管理者のみが凍結操作を実行できます。
- **ステータスの影響**：凍結されたチャットルーム（status=0）は正常に使用できなくなります。
- **ユーザー体験**：凍結期間中、ユーザーはメッセージを送信したり対話したりできなくなる場合があります。
- **即時有効**：ステータスの変更は即座に有効になり、すべてのチャットルームメンバーに影響します。
- **可逆的な操作**：status=1 に設定することで、チャットルームの凍結を解除できます。
- **データの保存**：チャットルームを凍結しても、過去のメッセージやメンバーデータは削除されません。
- **通知メカニズム**：凍結操作により、関連する通知やイベントがトリガーされる場合があります。
