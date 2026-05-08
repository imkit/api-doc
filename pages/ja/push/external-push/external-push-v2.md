# 外部プッシュサービス v2(Generic)

## 概要

`PUSH_GENERIC` は v1 の後継となる汎用版の外部プッシュ callback です。v1 の「受信者ごとに 1 リクエスト」方式とは異なり、v2 は **ブロードキャストモデル** を採用しています。同じメッセージを 1 リクエストにまとめ、`pushToClients` 受信者配列を渡すことで、お客様のサービスが各受信者ごとに payload を組み立て、badge を計算します。グループメッセージにおいて、外部リクエスト数を大幅に削減できます。

> **重要**:Generic Push Service では、受信者(チャットルームメンバー)の badge カウントをお客様自身で処理する必要があります。IMKIT はこの callback で各受信者の badge 数値を提供しません。

------

## 設定方法

IMKIT プラットフォーム管理画面で環境変数を設定します:

```
PUSH_GENERIC=https://your-server.example.com/imkit/push/v2
```

設定後、プッシュが必要なメッセージイベントが発生するたびに、IMKIT は同じメッセージを 1 リクエストにまとめてこのエンドポイントへ送信し、プッシュ対象となるすべての Client ID を列挙します。

------

## リクエスト形式

### Method

`POST`

### Headers

| パラメータ        | 型     | 必須 | 説明                              |
| -------------- | ------ | ---- | --------------------------------- |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

### Request Body

| フィールド       | 型       | 説明                                                                                  |
| --------------- | -------- | ------------------------------------------------------------------------------------- |
| メッセージフィールド | mixed    | フラット化されたメッセージオブジェクト([Message Model](/ja/realtime/socket-events#chat-message) を踏襲)                                |
| `roomName`      | string   | チャットルーム名(カスタム表示名。プッシュタイトルに利用可能)                          |
| `pushToClients` | string[] | 該メッセージのプッシュ送信対象となる受信者 Client ID の配列                              |

------

## リクエスト例

```javascript
{
  "_id": "5dd51a4f21841443cfd3090d",
  "message": "lala",
  "room": "demo-room",
  "roomName": "Demo Room",
  "sender": {
    "_id": "sss",
    "avatarUrl": "http://loremflickr.com/240/240/style?1574241882",
    "nickname": "SSS",
    "description": "description la la #1568192464957",
    "isRobot": false,
    "id": "sss",
    "lastLoginTimeMS": 1568192470942
  },
  "messageType": "text",
  "appID": "SampleApp",
  "id": "5dd51a4f21841443cfd3090d",
  "messageTimeMS": 1574246991222,
  "updatedAtMS": 1574246991223,
  "createdAtMS": 1574246991223,
  "pushToClients": ["aaa", "bbb"]
}
```

------

## お客様のサービスで行うべきこと

このリクエストを受信した Generic Push Service は、以下を行ってください:

1. **badge の計算**:`pushToClients` 配列の各 Client について、自社のデータソースから総未読数を計算します(IMKIT はこの callback で badge を提供しません)
2. **デバイストークンの取得**:Client ID をもとにそのユーザーの APNs / FCM トークンを取得します(自社で保管するか、IMKIT の [`/me/subscribe`](/ja/push/device-subscription/subscribe-device) 登録データと同期します)
3. **payload の組み立て**:[プッシュペイロード形式](/ja/push/push-payload-format) に従って組み立てます。IMKIT の `im_loc_*` ローカライゼーションキーを使用できます
4. **APNs / FCM への送信**:プッシュサービスの API を呼び出して配信を完了させます

------

## レスポンス

お客様のサービスは `200 OK` を返してください(内容は問いません)。IMKIT はレスポンス内容に基づいた後続処理を行いません。

------

## 使用シナリオ

### グループプッシュの最適化
- **1 リクエスト + 複数受信者**:50 名のグループで新メッセージが発生した際、IMKIT は callback を 1 回だけ送信し、お客様のサービスで 50 件のトークンを一括処理することで、ネットワークコストを削減できます

### 高度なプッシュ戦略
- **ユーザー設定による振り分け**:特定ユーザーが該チャットルームをミュートしている、オンライン中であるなどの場合、お客様のサービス内でプッシュ送信の可否を判断できます
- **A/B テスト**:異なるユーザーグループに対して、異なる文言 / タイトルを送信できます

### 集中型 badge カウント
- **複数業務にまたがる badge**:アプリがチャット以外にも通知(注文、イベントなど)を持つ場合、自社サービスで総 badge を統合して計算できます

------

## 注意事項

- **Badge 自管理**:これが v2 と v1 の最大の違いです。IMKIT が badge を計算しないため、お客様自身で実装してください
- **メッセージフィールドの充実**:v2 は `roomName` などより充実した情報を提供するため、プッシュ文言で「<チャットルーム名> · <送信者>:<内容>」のように表示できます
- **v1 との排他**:`PUSH` と `PUSH_GENERIC` を同時に設定した場合の挙動は IMKIT プラットフォーム側の設定に依存します。どちらか一方のみを有効化することを推奨します
- **HTTPS 必須**:`PUSH_GENERIC` URL は HTTPS を使用し、送信元の検証を設定してください
- **失敗時の処理**:お客様のサービスが一時的なエラーで処理できない場合は、自前でリトライをスケジュールしてください。IMKIT は自動的に再送しません
- **Payload フォーマットの参照**:詳細なフィールドとローカライゼーションキーは [プッシュペイロード形式](/ja/push/push-payload-format) をご覧ください
