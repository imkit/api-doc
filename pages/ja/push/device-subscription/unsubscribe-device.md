# デバイストークンの登録解除

## 概要

以前に [`POST /me/subscribe`](/ja/push/device-subscription/subscribe-device) で登録したデバイストークンを IMKIT から削除し、ユーザーがログアウト・アプリのアンインストール・デバイスの変更を行った後にプッシュ通知が引き続き届くのを防ぎます。ネイティブアプリのログアウトフローでこの API を呼び出すことを推奨します。

------

## API エンドポイント

### プッシュトークンの登録解除

`deviceId` を指定して、現在のユーザーが該当デバイスで購読しているプッシュを解除します。

```http
POST /me/unsubscribe
```

#### Headers

| パラメータ          | 型     | 必須 | 説明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |
| `Content-Type`     | string | ✅    | `application/json; charset=utf-8` |

#### Post Body

| パラメータ  | 型     | 必須 | 説明                                                         |
| ---------- | ------ | ---- | ------------------------------------------------------------ |
| `type`     | string | ✅    | デバイストークンの種類。指定可能な値:`ios`、`android`、`fcm`、`web` |
| `deviceId` | string | ✅    | デバイスの一意識別子(subscribe 時に使用した値と同じ)        |
| `clientId` | string | ❌    | バインド解除する Client ID。プラットフォーム API Key(`IM-API-KEY`)でこの API を呼び出す場合のみ必要 |

#### リクエスト例

**JavaScript(axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/unsubscribe",
  {
    type: "fcm",
    deviceId: "pixel-8-uuid-002"
  },
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL**

```bash
curl -X POST "https://your-app.imkit.io/me/unsubscribe" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "type": "fcm",
       "deviceId": "pixel-8-uuid-002"
     }'
```

#### Response

**成功レスポンス(200 OK)**

| パラメータ      | 型     | 説明                              |
| ------------- | ------ | --------------------------------- |
| `RC`          | number | レスポンスコード(0 は成功)        |
| `RM`          | string | レスポンスメッセージ               |
| `result`      | object | 登録解除結果                       |
| `result.n`    | number | 影響を受けたレコード件数            |
| `result.ok`   | number | 操作ステータス(`1` は成功)       |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

`result.n` が `0` の場合は、`type` + `deviceId` に一致するレコードが見つからなかったことを示します(例:そのデバイスが未登録、またはすでに削除済み)。

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

**400 Bad Request** - 必須パラメータが不足

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "type and deviceId are required"
  }
}
```

------

## 使用シナリオ

### ユーザーログアウト
- **ログアウトフロー**:ネイティブアプリでログアウトを実行する前に呼び出し、次回そのデバイスでログインしたユーザーが前のユーザー宛のプッシュを受け取らないようにします

### デバイスの変更
- **旧デバイスの廃止**:ユーザーが新しい端末に乗り換えた際、旧デバイス上でこの API を呼び出してトークンを削除します

### プッシュ権限の変更
- **ユーザーが通知をオフにした場合**:アプリが、システム設定でプッシュ通知の許可がオフになったことを検知した際、この API を呼び出して購読解除を行います

------

## 注意事項

- **権限チェックなし**:デバイスがオフラインでも、トークンが失効していても、この API を成功裏に呼び出してクリーンアップできます
- **deviceId の一致**:`deviceId` は [登録](/ja/push/device-subscription/subscribe-device) 時に使用した値と一致している必要があります。一致しない場合はレコードがマッチしません
- **type の一致**:`type` も一致している必要があります(例:Android で `fcm` で登録した場合は、解除も `fcm` を使用)
- **冪等性**:繰り返し呼び出してもエラーにはなりませんが、後続の呼び出しでは `result.n` は `0` を返します
