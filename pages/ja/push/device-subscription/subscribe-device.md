# デバイストークンの登録

## 概要

ネイティブアプリのデバイスプッシュトークン(APNs / FCM など)を IMKIT に登録することで、サーバー側から [`POST /push/push2clients`](/ja/push/push-to-clients) やチャットルームのメッセージイベントによってトリガーされる組み込みプッシュ配信パイプラインを通じて、ユーザーの実機デバイスへ通知を正しく届けることができます。各デバイスは `deviceId` で一意に識別され、同一ユーザーが複数のデバイスを同時に登録することができます。

------

## API エンドポイント

### プッシュトークンの登録

現在のユーザーのデバイストークンを登録し、プッシュ通知を受信できるようにします。

```http
POST /me/subscribe
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
| `type`     | string | ✅    | デバイストークンの種類。指定可能な値:`ios`、`android`、`fcm`、`web`、`ios-voip` |
| `token`    | string | ✅    | デバイスのプッシュトークン(APNs または FCM から取得)         |
| `deviceId` | string | ✅    | デバイスの一意識別子(アプリ側で生成し永続化する)              |
| `clientId` | string | ❌    | バインドする Client ID。プラットフォーム API Key(`IM-API-KEY`)でこの API を呼び出す場合のみ必要 |

#### リクエスト例

**JavaScript(axios)**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/subscribe",
  {
    type: "ios",
    token: "17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6",
    deviceId: "iphone-15-pro-uuid-001"
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

**Android FCM トークンの登録**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/me/subscribe",
  {
    type: "fcm",
    token: "dGhpcyBpcyBhIGZjbSB0b2tlbg...",
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
curl -X POST "https://your-app.imkit.io/me/subscribe" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "type": "ios",
       "token": "17f8b636f255e55a261af9df0335a5b6a08722fe6baffc61ca9b0e45f2a220c6",
       "deviceId": "iphone-15-pro-uuid-001"
     }'
```

#### Response

**成功レスポンス(200 OK)**

| パラメータ | 型     | 説明                       |
| -------- | ------ | -------------------------- |
| `RC`     | number | レスポンスコード(0 は成功) |
| `RM`     | string | レスポンスメッセージ        |
| `result` | object | 登録結果(成功時は空オブジェクト) |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
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

**400 Bad Request** - 必須パラメータが不足

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "MISSING_PARAMETER",
    "message": "type, token and deviceId are required"
  }
}
```

------

## 使用シナリオ

### ネイティブアプリの統合
- **iOS**:APNs device token を取得後、`type: "ios"` で登録します
- **Android**:Firebase の registration token を取得後、`type: "fcm"`(または `android`)で登録します
- **VoIP 通話**:`type: "ios-voip"` で PushKit token を登録し、着信プッシュに使用します
- **Web ブラウザ**:`type: "web"` で Web Push サブスクリプションを登録します

### マルチデバイスのサポート
- **同一ユーザーの複数デバイス**:ユーザーは異なるデバイスでそれぞれ異なる `deviceId` を登録し、プッシュは登録済みのすべてのデバイスに送信されます
- **デバイスの切り替え**:ユーザーが新しい端末に乗り換える際は、新しいデバイスを新しい `deviceId` で登録し、旧デバイスは [登録解除](/ja/push/device-subscription/unsubscribe-device) を呼び出して削除できます

### プラットフォームバックエンドの統合
- **代理登録**:`IM-API-KEY` でこの API を呼び出して `clientId` を指定すると、特定ユーザーに代わってデバイストークンをバインドできます

------

## 注意事項

- **タイミング**:ユーザーのログイン完了後、システムからプッシュ通知の許可を得た直後に呼び出してください
- **deviceId の一貫性**:`deviceId` はアプリの初回起動時に生成して永続化(例:Keychain / SharedPreferences に保存)し、以後は同じ値を使用してください
- **トークンの更新**:APNs / FCM のトークンが変更された場合(システムがアプリに通知)、この API を再度呼び出して新しいトークンを登録してください
- **ログアウト処理**:ユーザーがログアウトする際は、[登録解除](/ja/push/device-subscription/unsubscribe-device) を呼び出してトークンを削除し、ログアウト済みのデバイスへプッシュが送信されるのを防ぐことを推奨します
- **トークンの種類**:`ios` と `ios-voip` は用途が異なります。VoIP プッシュには必ず `ios-voip` を使用してください
- **冪等性**:同じ `type` + `deviceId` で繰り返し呼び出すと、対応するトークンが更新されるだけで、重複登録は発生しません
