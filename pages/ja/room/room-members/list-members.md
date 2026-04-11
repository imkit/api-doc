# メンバーのリスト表示

## 概要

指定したチャットルームのメンバーリストを取得します。この API は[チャットルームの取得](/ja/room/room-management/get-a-room)と同じエンドポイント `GET /rooms/{id}` を使用し、返されるチャットルームデータには完全な `members`（メンバー配列）と `memberProperties`（メンバー属性）が含まれます。

------

## API エンドポイント

### チャットルームの詳細情報を取得（メンバーリストを含む）

指定したチャットルームの完全な情報を照会します。これには、すべてのメンバーの詳細データが含まれます。

```http
GET /rooms/{id}
```

#### ヘッダー

| パラメータ            | 型     | 必須 | 説明            |
| --------------- | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### パスパラメータ

| パラメータ | 型     | 必須 | 説明            |
| ---- | ------ | ---- | -------------- |
| `id` | string | ✅    | チャットルーム ID |

#### リクエスト例

```http
GET /rooms/58871b877390be11d5f1ab30 HTTP/1.1
IM-CLIENT-KEY: 9FSk26d4AIbZh0k44F5+DzbetgAJA9WjC7WP36Khm6c=
IM-Authorization: fVy7YhqBZqEzNO9LhMmcyA==
Host: your-app.imkit.io
Connection: close
User-Agent: Paw/3.0.14 (Macintosh; OS X/10.11.6) GCDHTTPRequest
```

**JavaScript 例:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 例:**

```bash
curl -X "GET" "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ     | 型     | 説明                       |
| -------- | ------ | -------------------------- |
| `RC`     | number | レスポンスコード (0 は成功) |
| `RM`     | string | レスポンスメッセージ        |
| `result` | object | チャットルームの詳細情報     |

**チャットルーム詳細情報のオブジェクト構造**

| パラメータ                | 型     | 説明                                      |
| ------------------- | ------ | ----------------------------------------- |
| `_id`               | string | チャットルームの一意識別子                 |
| `appID`             | string | アプリケーション ID                       |
| `description`       | string | チャットルームの説明                       |
| `lastMessage`       | object | 最新メッセージの情報                       |
| `memberProperties`  | array  | メンバー属性リスト（未読数、最終既読など）   |
| `members`           | array  | メンバー詳細情報リスト                     |
| `unread`            | number | 現在のユーザーの未読メッセージ数           |
| `isSuperuser`       | bool   | 現在のユーザーが特権ユーザーかどうか        |

**メンバーオブジェクトの構造**

| パラメータ              | 型     | 説明                               |
| ----------------- | ------ | ---------------------------------- |
| `_id`             | string | メンバーの一意識別子                 |
| `nickname`        | string | メンバーのニックネーム               |
| `avatarUrl`       | string | メンバーのアバター URL               |
| `lastLoginTime`   | string | 最終ログイン時間 (ISO 形式)         |
| `lastLoginTimeMS` | number | 最終ログイン時間 (ミリ秒タイムスタンプ) |

**メンバー属性オブジェクトの構造**

| パラメータ       | 型     | 説明                          |
| ---------- | ------ | ----------------------------- |
| `client`   | string | メンバーのクライアント ID      |
| `badge`    | number | 未読メッセージ数               |
| `lastRead` | string | 最終既読のメッセージ ID        |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "58871b877390be11d5f1ab30",
    "appID": "SampleApp",
    "lastMessage": {
      "_id": "58b7b7c4c246bc0b41afb148",
      "message": 1111234,
      "messageType": "text",
      "sender": {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTimeMS": 0,
        "id": "1485248566481"
      },
      "messageTime": "2017-03-02T06:12:20.775Z",
      "messageTimeMS": 1488435140775,
      "id": "58b7b7c4c246bc0b41afb148"
    },
    "memberProperties": [
      {
        "badge": 5,
        "lastRead": "58b7a2c5f034920a878e9a53",
        "client": "1485248560558"
      },
      {
        "badge": 0,
        "lastRead": "58b7b7c4c246bc0b41afb148",
        "client": "1485248566481"
      },
      {
        "badge": 61,
        "client": "1485250743313"
      }
    ],
    "members": [
      {
        "_id": "1485248560558",
        "nickname": "Test AB",
        "avatarUrl": "http://example.com/avatarUrl",
        "lastLoginTime": "2017-02-15T09:02:35.934Z",
        "lastLoginTimeMS": 1487149355934,
        "id": "1485248560558"
      },
      {
        "_id": "1485248566481",
        "nickname": "Test2",
        "lastLoginTime": "2017-03-02T07:11:40.398Z",
        "lastLoginTimeMS": 1488438700398,
        "id": "1485248566481"
      },
      {
        "_id": "1485250743313",
        "nickname": "Test 3",
        "lastLoginTime": "2017-03-02T07:18:31.436Z",
        "lastLoginTimeMS": 1488439111436,
        "id": "1485250743313"
      }
    ],
    "unread": 5,
    "description": "Sample Description",
    "isSuperuser": true,
    "id": "58871b877390be11d5f1ab30"
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

**403 Forbidden** - 権限不足または非メンバー

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "NOT_ROOM_MEMBER",
    "message": "You are not a member of this room"
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

## ユースケース

### メンバー管理
- **メンバーリスト**: チャットルーム内の全メンバーの詳細情報を表示します。
- **メンバーの監視**: メンバーのログイン状態やアクティブ度を確認します。
- **権限チェック**: 現在のユーザーがチャットルーム内で持っている権限レベルを確認します。

### チャットルーム情報
- **チャットルームのステータス**: チャットルームの完全なステータス情報を取得します。
- **未読統計**: 個人および全体での未読メッセージの統計を確認します。
- **最新メッセージ**: チャットルームの最新メッセージ情報を取得します。

### アプリケーション統合
- **データ同期**: チャットルームのメンバーとステータス情報を同期します。
- **UI 表示**: チャットルームインターフェースに完全な表示データを提供します。
- **分析統計**: チャットルームメンバーの参加度やアクティブ度を分析します。

------

## 注意事項

- **メンバー権限**: チャットルームのメンバーのみが詳細情報を閲覧できます。
- **データの完全性**: レスポンスには、メンバーリストとメンバー属性の完全な情報が含まれます。
- **未読の計算**: `memberProperties` には各メンバーの未読メッセージ数が含まれます。
- **権限の識別**: `isSuperuser` フィールドは、現在のユーザーが管理者（特権ユーザー）かどうかを示します。
- **時間形式**: ISO 形式とミリ秒タイムスタンプの2つの時間形式を提供します。
- **データ量**: 大規模なチャットルームでは大量のメンバーデータが返される可能性があるため、処理パフォーマンスに注意してください。
- **リアルタイム性**: メンバーの状態や未読数は、リアルタイム性を維持するために定期的な更新が必要になる場合があります。
