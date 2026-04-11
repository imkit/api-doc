# メッセージの撤回

## 概要

このエンドポイントを使用すると、ユーザーはチャットルーム内の指定したメッセージを撤回できます。撤回後、元のメッセージ内容は消去され、メッセージタイプは `recall` に変更されます。チャットルーム内のすべてのメンバーは、そのメッセージが撤回されたことを確認できます。クライアント認証とプラットフォーム API 認証の両方をサポートしています。

------

## API エンドポイント

### メッセージの撤回

チャットルーム内の指定されたメッセージを撤回します。

```http
POST /rooms/:roomId/message
```

#### ヘッダー

この API は 2 種類の認証方式をサポートしています。いずれか一方を使用してください。

**クライアント認証**

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | ユーザートークン |

**プラットフォーム API 認証**

| パラメータ | 型 | 必須 | 説明 |
| ------------ | ------ | ---- | ---------------- |
| `IM-API-KEY` | string | ✅ | 平台 API キー |

#### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
| ---------- | ------ | ---- | ---------------- |
| `:roomId` | string | ✅ | チャットルームの一意識別子 |

#### ポストボディ

| パラメータ | 型 | 必須 | 説明 |
| ------------- | ------ | ---- | ------------------------------- |
| `messageType` | string | ✅ | 固定値 `"recall"` |
| `_id` | string | ✅ | 撤回するメッセージの一意識別子 |

#### リクエスト例

**例 1：クライアント認証によるメッセージの撤回**

**cURL 例：**

```bash
curl -X "POST" "https://your-app.imkit.io/rooms/demo-room/message" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"_id": "5ce3d80bd594874e495895a4", "messageType": "recall"}'
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

**例 2：プラットフォーム API 認証によるメッセージの撤回**

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/rooms/${roomID}/message`,
  {
    _id: "5ce3d80bd594874e495895a4",
    messageType: "recall",
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| --------------------- | ------ | ---------------------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result._id` | string | メッセージの一意識別子 |
| `result.message` | string | メッセージ内容（撤回後は空文字列） |
| `result.room` | string | 所属チャットルーム ID |
| `result.sender` | object | 撤回操作を行った送信者情報 |
| `result.messageType` | string | メッセージタイプ（撤回後は `"recall"`） |
| `result.messageTimeMS`| number | メッセージ送信タイムスタンプ（ミリ秒） |
| `result.updatedAtMS` | number | 最終更新タイムスタンプ（ミリ秒） |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5ce3d80bd594874e495895a4",
    "message": "",
    "room": "demo-room",
    "sender": {
      "_id": "sss",
      "nickname": "Nita",
      "avatarUrl": "http://loremflickr.com/240/240/style?1558435839",
      "isRobot": false,
      "id": "sss",
      "lastLoginTimeMS": 1553145898032
    },
    "messageType": "recall",
    "appID": "SampleApp",
    "id": "5ce3d80bd594874e495895a4",
    "messageTimeMS": 1558435851576,
    "updatedAtMS": 1558435921086,
    "createdAtMS": 1558435851580
  }
}
```

#### エラーレスポンス

リクエストが失敗した場合、エラーの詳細情報を含むレスポンスが返されます。一般的なエラーには以下が含まれます：

- 無効な認証キーまたはトークン
- 指定されたメッセージまたはチャットルームが存在しない
- そのメッセージを撤回する権限がない
- サーバー内部エラー

------

## 使用シーン

### メッセージ管理

- **誤送信メッセージの修正**: 誤ったメッセージを送信した直後に撤回できます。
- **機密情報の削除**: 機密情報や不適切な内容を含むメッセージを撤回します。
- **バックエンド管理**: 管理者がプラットフォーム API を使用して違反メッセージを撤回します。

------

## 注意事項

- **撤回の効果**: 撤回後、メッセージの `message` フィールドは空文字列になり、`messageType` は `"recall"` に変更されます。チャットルームのすべてのメンバーが撤回状態を確認できます。
- **`_id`**: リクエストボディの `_id` は撤回する**メッセージ**の ID であり、チャットルームの ID ではありません。
- **2 種類の認証**: クライアント認証（`IM-CLIENT-KEY` + `IM-Authorization`）は一般ユーザーの操作に適しており、プラットフォーム API 認証（`IM-API-KEY`）はバックエンド管理操作に適しています。
