# チャットルーム通知の消音解除

## 概要

このエンドポイントを使用すると、現在のユーザーが指定したチャットルームの消音設定を解除し、そのチャットルームのプッシュ通知の受信を再開できます。この設定は個人設定であり、現在のユーザーにのみ影響し、他のメンバーには影響しません。

------

## API エンドポイント

### チャットルーム通知の消音解除
指定したチャットルームの消音設定を解除し、プッシュ通知の受信を再開します。

```http
DELETE /me/mute/:room
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | クライアントトークン |

#### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `:room` | string | ✅ | チャットルームの一意識別子 |

この API にはリクエストボディ (Request Body) は不要です。

#### リクエスト例

**cURL 例：**

```bash
curl -X "DELETE" "https://your-app.imkit.io/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 例：**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/me/mute/${roomID}`,
  {
    headers: {
      "IM-CLIENT-KEY": `${IM_CLIENT_KEY}`,
      "IM-Authorization": `${TOKEN}`,
    },
  }
);
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `RC` | number | レスポンスコード (0 は成功) |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 更新後の現在のユーザー情報 |
| `result._id` | string | ユーザーの一意識別子 |
| `result.nickname` | string | ユーザーの表示名 |
| `result.email` | string | ユーザーのメールアドレス |
| `result.mute` | array[string] | 消音設定されているチャットルーム ID の配列（解除後に削除されます） |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "1485248560558",
    "email": "test@test.com",
    "nickname": "Test AB",
    "appID": "SampleApp",
    "avatarUrl": "http://example.com/avatarUrl",
    "address": {
      "port": 56216,
      "family": "IPv6",
      "address": "::1"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36",
    "mute": [],
    "lastLoginTimeMS": 1487068306745
  }
}
```

#### エラーレスポンス

リクエストが失敗した場合、エラーの詳細情報を含むエラーレスポンスが返されます。一般的なエラーシナリオは以下の通りです：

- 無効なクライアントキーまたは認証トークン
- 指定されたチャットルームが存在しない
- サーバー内部エラー

------

## ユースケース

- **チャットルーム通知の再開**: ユーザーが特定のチャットルームのプッシュ通知を再び受信したい場合、消音を解除できます。
- **チャットルームの消音**: チャットルームを消音に設定するには、[チャットルーム通知の消音](./mute-room-notification) API を使用してください。

------

## 注意事項

- **個人設定**: 消音解除の設定は現在のユーザーにのみ影響し、他のメンバーの通知には影響しません。
- **消音状態**: 成功すると、該当するチャットルーム ID がレスポンス内の `mute` 配列から削除されます。これは、ユーザーが現在消音しているすべてのチャットルームを表します。
