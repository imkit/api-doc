# チャットルーム通知の消音

## 概要

このエンドポイントを使用すると、現在のユーザーが指定したチャットルームを消音（ミュート）設定にできます。消音設定にすると、そのチャットルームの新しいメッセージはプッシュ通知をトリガーしなくなります。この設定は個人設定であり、現在のユーザーにのみ影響し、他のメンバーには影響しません。

------

## API エンドポイント

### チャットルーム通知を消音
指定したチャットルームを消音設定にし、プッシュ通知の受信を停止します。

```http
POST /me/mute/:room
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
curl -X "POST" "https://your-app.imkit.io/me/mute/demo-room" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/me/mute/${roomID}`,
  null,
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
| `result.mute` | array[string] | 消音設定されているチャットルーム ID の配列（消音後に新しく追加されます） |

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
    "mute": ["58871b877390be11d5f1ab30"],
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

- **特定のチャットルーム通知の停止**: ユーザーが特定のチャットルームのメッセージに邪魔されたくない場合、そのチャットルームを消音に設定できます。
- **消音の解除**: 消音を解除するには、[チャットルーム通知の消音解除](./unmute-room-notification) API を使用してください。

------

## 注意事項

- **個人設定**: 消音設定は現在のユーザーにのみ影響し、他のメンバーの通知には影響しません。
- **消音状態**: 成功すると、該当するチャットルーム ID がレスポンス内の `mute` 配列に追加されます。これは、ユーザーが現在消音しているすべてのチャットルームを表します。
