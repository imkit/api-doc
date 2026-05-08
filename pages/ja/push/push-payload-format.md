# プッシュペイロード形式

## 概要

IMKIT が APNs(iOS)および FCM(Android)プッシュ通知を送信する際の payload 構造、および組み込みのローカライゼーション(localization)キー対照表について説明します。ネイティブアプリは生のプッシュを受信した後、本ドキュメントに従って payload を解析し、UI 表示やタップ後の遷移処理を行うことができます。

------

## APNs プッシュ形式

```json
{
  "aps": {
    "alert": {
      "loc-key": "im_loc_text",
      "loc-args": ["How do you do?"]
    },
    "sound": "chime.aiff"
  }
}
```

| フィールド   | 型     | 説明                                                                         |
| ---------- | ------ | ---------------------------------------------------------------------------- |
| `alert`    | mixed  | Alert オブジェクト。文字列または `loc-key`、`loc-args` を含むオブジェクト       |
| `loc-key`  | string | ローカライゼーション文字列のキー。形式は `im_loc_${MessageType}`(全リストは下記参照) |
| `loc-args` | array  | ローカライゼーション文字列のパラメータ配列。`$1` は送信者の nickname、`$2` はメッセージ内容 |

> 参考:[Apple Local and Remote Notification Programming Guide](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html)

------

## FCM(GCM)プッシュ形式

```javascript
{
  collapseKey: "<collapseKey>",
  timeToLive: 3600,
  notification: {
    title: "<title>",
    body: "<body>",
    icon: "<icon>",
    body_loc_key: "im_loc_text",
    body_loc_args: ["How do you do?"],
    badge: 1,
    click_action: "push_chatroom"
  },
  data: {
    "loc-key": "im_loc_text",
    "loc-args": ["How do you do?"],
    type: "<type>",
    payload: { /* メッセージオブジェクト全体 */ }
  }
}
```

| ブロック         | フィールド       | 説明                                                |
| --------------- | -------------- | --------------------------------------------------- |
| `notification`  | `title`        | 通知タイトル                                          |
| `notification`  | `body`         | 通知本文                                              |
| `notification`  | `icon`         | 通知アイコンの URL またはリソース名                      |
| `notification`  | `body_loc_key` | ローカライゼーションキー(APNs `loc-key` と同形式)     |
| `notification`  | `body_loc_args`| ローカライゼーションパラメータ                           |
| `notification`  | `badge`        | アプリアイコン上の未読数                                 |
| `notification`  | `click_action` | プッシュタップ後の Intent action。デフォルトは `push_chatroom` |
| `data`          | `loc-key`      | 同上。data-only プッシュの解析用                       |
| `data`          | `loc-args`     | 同上                                                |
| `data`          | `type`         | プッシュタイプ(カスタム分類)                          |
| `data`          | `payload`      | 元のメッセージオブジェクト。アプリ内部処理(画面遷移など)に利用可能 |

------

## ローカライゼーションキー一覧

メッセージタイプに応じて異なるローカライゼーションキーが対応します。ネイティブアプリは string resource で対応する翻訳を設定できます。

| `loc-key`             | 対応メッセージタイプ / イベント | 例(日本語)                |
| --------------------- | ------------------- | ------------------------ |
| `im_loc_text`         | テキストメッセージ      | `$1: $2`(`Alice: こんにちは`) |
| `im_loc_image`        | 画像メッセージ         | `$1 が画像を送信しました`     |
| `im_loc_video`        | 動画メッセージ         | `$1 が動画を送信しました`     |
| `im_loc_audio`        | 音声メッセージ         | `$1 が音声を送信しました`     |
| `im_loc_sticker`      | スタンプ              | `$1 がスタンプを送信しました` |
| `im_loc_location`     | 位置情報メッセージ      | `$1 が位置情報を共有しました` |
| `im_loc_file`         | ファイルメッセージ      | `$1 がファイルを送信しました` |
| `im_loc_joinRoom`     | チャットルーム参加      | `$1 がチャットルームに参加しました` |
| `im_loc_leaveRoom`    | チャットルーム退出      | `$1 がチャットルームを退出しました` |
| `im_loc_addMember`    | 単一メンバー追加       | `$1 が $2 を招待しました`    |
| `im_loc_addMembers`   | 複数メンバー追加       | `$1 が複数のメンバーを招待しました` |
| `im_loc_deleteMember` | メンバー削除          | `$1 が $2 をチャットルームから削除しました` |
| `im_loc_encrypted`    | 暗号化メッセージ       | `暗号化されたメッセージを受信しました` |

> 上表は一般的なキーを示しています。実際にサポートされるキーはメッセージタイプの拡張に伴って増えていきます。アプリ側では未知の `loc-key` に対するフォールバック(例:`body` フィールドの内容を表示)を行うことを推奨します。

------

## パラメータ対照

`loc-args` の位置パラメータ:

| 位置  | 内容           |
| ----- | -------------- |
| `$1`  | 送信者の nickname |
| `$2`  | メッセージ内容    |

例えば `loc-key: "im_loc_text"`、`loc-args: ["Alice", "Hello"]` の場合、string resource を `"%1$@: %2$@"`(iOS)または `"%1$s: %2$s"`(Android)と設定すると、最終的に `Alice: Hello` と表示されます。

------

## 使用シナリオ

### 多言語対応アプリ
- **ローカライズ表示**:サーバーから送られた body 文字列をそのまま表示せず、`loc-key` をもとにアプリ内の翻訳ファイルから文字列を取得し、ユーザーの言語設定を自動的に適用します
- **新規メッセージタイプの拡張**:バックエンドで新しいメッセージタイプを追加する際、アプリ側は string resource に対応キーを追加するだけで、バックエンド側のプッシュ文言を変更する必要はありません

### プッシュ文言のカスタマイズ
- **カスタム通知文言**:ユーザーがアプリ内で「相手が $1$2 を送信しました」のような通知文言をカスタマイズできます。`loc-args` の順序を保つだけで対応できます

------

## 注意事項

- **APNs と FCM の命名差異**:APNs は `loc-key` / `loc-args` を使用しますが、FCM の `notification` ブロックでは `body_loc_key` / `body_loc_args` に変わります。`data` ブロックでは依然として `loc-key` / `loc-args` を使用するため、解析時に明確に区別してください
- **未知キーのフォールバック**:string resource に存在しない `loc-key` を受信した場合、FCM の `body` または APNs のプレーンテキスト alert をフォールバックとして表示することを推奨します
- **プッシュの折りたたみ**:Android の `collapseKey` は同一タイプのメッセージを統合表示するために使用します。iOS では `apns-collapse-id` に対応します(IMKIT プラットフォーム側で設定)
- **VoIP プッシュ**:音声/ビデオの着信は [`type: "ios-voip"`](/ja/push/device-subscription/subscribe-device) で登録したトークンを使用してください。payload は PushKit を直接経由するため、本フォーマットは適用されません
- **サイレントプッシュ**:`notification` ブロックに `title` / `body` を含めず、`data` のみのプッシュはサイレントプッシュです。バックグラウンドでの未読数同期に利用できます
- **`/push/push2clients` との関係**:[カスタムプッシュ API](/ja/push/push-to-clients) も同じ形式で送信されるため、ネイティブアプリ側の解析ロジックは共有できます
