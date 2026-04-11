# メッセージのピン留め

## 概要

このエンドポイントを使用すると、チャットルームのオーナーや管理者は特定のメッセージをチャットルームの上部にピン留めして、メンバーが重要なメッセージを素早く確認できるようにします。各チャットルームでピン留めできるメッセージは、一度に 1 つだけです。

------

## API エンドポイント

### メッセージのピン留め

指定されたメッセージをチャットルームの上部にピン留めします。

```http
POST /messages/:id/pin
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | ------------ |
| `IM-CLIENT-KEY` | string | ✅ | クライアントキー |
| `IM-Authorization` | string | ✅ | ユーザートークン |

#### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
| ----- | ------ | ---- | ---------------- |
| `:id` | string | ✅ | メッセージの一意識別子 |

この API はリクエストボディ（Request Body）を必要としません。

#### リクエスト例

**cURL 例：**

```bash
curl -X "POST" "https://your-app.imkit.io/messages/5f890cf37d980e06f6aaf349/pin" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

**JavaScript 例：**

```javascript
const response = await axios.post(
  `https://your-app.imkit.io/messages/${messageID}/pin`,
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

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| --------------------- | ------- | ---------------------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result._id` | string | メッセージの一意識別子 |
| `result.message` | string | メッセージ内容 |
| `result.room` | string | 所属チャットルーム ID |
| `result.sender` | object | メッセージ送信者情報 |
| `result.messageType` | string | メッセージタイプ |
| `result.pinned` | boolean | ピン留めされているかどうか（ピン留め後は `true`） |
| `result.messageTimeMS`| number | メッセージ送信タイムスタンプ（ミリ秒） |
| `result.updatedAtMS` | number | 最終更新タイムスタンプ（ミリ秒） |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "5f890cf37d980e06f6aaf349",
    "message": "重要なお知らせ：明日午後2時に会議を行います",
    "room": "demo-room",
    "sender": {
      "_id": "aaa",
      "nickname": "AAA",
      "avatarUrl": "http://loremflickr.com/240/240/style?1569804629",
      "isRobot": false,
      "id": "aaa",
      "lastLoginTimeMS": 1602817267900
    },
    "messageType": "text",
    "appID": "SampleApp",
    "pinned": true,
    "id": "5f890cf37d980e06f6aaf349",
    "messageTimeMS": 1602817267923,
    "updatedAtMS": 1602817290000,
    "createdAtMS": 1602817267925
  }
}
```

#### エラーレスポンス

リクエストが失敗した場合、エラーの詳細情報を含むレスポンスが返されます。一般的なエラーには以下が含まれます：

- 無効なクライアントキーまたは認証トークン
- 指定されたメッセージが存在しない
- 現在のユーザーがチャットルームのオーナーまたは管理者ではない
- サーバー内部エラー

------

## 使用シーン

### 重要メッセージの管理

- **お知らせの固定**: 重要なお知らせをチャットルームの上部にピン留めして、すべてのメンバーが確実に確認できるようにします。
- **素早い参照**: メンバーが履歴メッセージを遡ることなく、重要な情報をすぐに見つけられるようにします。

------

## 注意事項

- **権限制限**: チャットルームの**オーナー（owner）**または**管理者（admin）**のみがピン留め操作を実行できます。
- ピン留めを解除するには、[メッセージのピン留め解除](./unpin-a-message) API を使用してください。
