# 最終既読の更新

## 概要

ユーザーが指定のチャットルーム内でメッセージを読み終えた際、この API を呼び出して「最後に既読となったメッセージ」をサーバーに同期します。サーバーはこれをもとにそのユーザーの該当チャットルームでの未読数(badge)を再計算し、Socket [`lastRead` イベント](/ja/realtime/socket-events) を通じてチャットルームの他メンバーに通知します。これにより、複数デバイス間の既読同期と既読確認(read receipts)を実現できます。

------

## API エンドポイント

### 最終既読メッセージの更新

現在のユーザーが指定チャットルームで最後に既読となったメッセージ ID を更新します。

```http
PUT /rooms/:id/lastRead
```

#### Headers

| パラメータ          | 型     | 必須 | 説明           |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |
| `Content-Type`     | string | ✅    | `application/json; charset=utf-8` |

#### Path Parameters

| パラメータ | 型     | 必須 | 説明        |
| ----- | ------ | ---- | ----------- |
| `:id` | string | ✅    | チャットルーム ID |

#### Post Body

| パラメータ  | 型     | 必須 | 説明                                            |
| --------- | ------ | ---- | ----------------------------------------------- |
| `message` | string | ✅    | 最終既読メッセージの ID(該当チャットルーム内のあるメッセージの `_id`) |

#### リクエスト例

**JavaScript(axios)**

```javascript
const response = await axios.put(
  `https://your-app.imkit.io/rooms/${roomId}/lastRead`,
  {
    message: "58885c9e4d0c89571b777a81"
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
curl -X PUT "https://your-app.imkit.io/rooms/58871b877390be11d5f1ab30/lastRead" \
     -H "IM-CLIENT-KEY: {IM-CLIENT-KEY}" \
     -H "IM-Authorization: {IM-Authorization}" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{"message":"58885c9e4d0c89571b777a81"}'
```

#### Response

**成功レスポンス(200 OK)**

| パラメータ              | 型     | 説明                              |
| ------------------- | ------ | --------------------------------- |
| `RC`                | number | レスポンスコード(0 は成功)         |
| `RM`                | string | レスポンスメッセージ                |
| `result`            | object | 更新結果                           |
| `result.client`     | string | 現在のユーザーの Client ID           |
| `result.lastRead`   | string | 更新された最終既読メッセージの ID    |
| `result.badge`      | number | そのユーザーの全チャットルームの総未読数 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "client": "1485248560558",
    "lastRead": "58b7b79b0acc250b377357ab",
    "badge": 48
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

**404 Not Found** - チャットルームまたはメッセージが存在しない

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "Room or message not found"
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
    "message": "message is required"
  }
}
```

------

## Socket イベント通知

更新成功後、サーバーは該当チャットルームの全メンバーに `lastRead` Socket イベントをブロードキャストします。内容例:

```json
{
  "roomID": "58871b877390be11d5f1ab30",
  "memberID": "1485248560558",
  "messageID": "58b7b79b0acc250b377357ab"
}
```

他メンバーのクライアントはこのイベントを購読することで、「相手がどのメッセージまで読んだか」の UI 表示をリアルタイムに更新できます。詳しくは [Socket イベント](/ja/realtime/socket-events) をご覧ください。

------

## 使用シナリオ

### 既読同期
- **チャットルームへの入室**:ユーザーがチャットルームを開き、画面を最下部までスクロールしたタイミングでこの API を呼び出して、最新メッセージを既読にします
- **バックグラウンド同期**:アプリがバックグラウンドからフォアグラウンドに復帰し、チャットルームが最前面に表示されていることを検知した際、最新メッセージを再度既読にします
- **複数デバイス間の同期**:ユーザーがスマートフォンで読んだ後、Web 版 / タブレット版が Socket `lastRead` イベントを通じて未読状態をリアルタイムに同期します

### 既読確認(Read Receipts)
- **チャットルームメンバー表示**:メッセージ送信者は、相手がどこまで既読したかを確認できます
- **グループの既読数**:グループ内の各メッセージの既読人数を集計します

### 未読計算
- この API を呼び出した後、[`GET /me/badge`](/ja/message/message-badge/get-unread-message-by-a-user) と [`POST /badges/byRoomTags`](/ja/message/message-badge/get-unread-message-by-a-room) のレスポンス値が直ちに新しい状態を反映します

------

## 注意事項

- **メッセージ ID は該当チャットルームに属している必要がある**:渡された `message` ID は `:id` チャットルーム内のメッセージである必要があります。そうでない場合は 404 が返されます
- **片方向のみ更新**:`lastRead` は前方にのみ移動します。現在の既読より古いメッセージ ID を渡した場合の挙動はサーバー実装に依存します。後ろ向きへのマーク付けは推奨しません
- **頻度制御**:スクロールごとに呼び出す必要はありません。チャットルームを離れるとき、新しいメッセージを受信したときで画面が最下部にあるとき、または一定間隔(例:2 秒ごと)でスロットルして呼び出すことを推奨します
- **サーバーからの能動通知**:成功後、他メンバーは Socket [`lastRead` イベント](/ja/realtime/socket-events) を受信し、UI のリアルタイム更新に利用できます
- **badge との関連**:この API は [未読計算 API](/ja/message/message-badge/get-unread-message-by-a-user) のレスポンス値が変化する主な手段となります
