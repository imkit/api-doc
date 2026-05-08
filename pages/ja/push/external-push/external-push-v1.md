# 外部プッシュサービス v1(レガシー)

## 概要

自社の APNs / FCM サービスでプッシュ通知を送信したい場合(IMKIT の組み込みプッシュ配信パイプラインを使用しない場合)、プラットフォーム管理画面で `PUSH` 環境変数を自社の HTTPS エンドポイントに設定できます。チャットルームで新しいメッセージが発生し、プッシュが必要なときに、IMKIT は HTTP POST で「フラット化されたメッセージオブジェクト」を指定エンドポイントに送信し、お客様側で APNs / FCM へ転送していただきます。

> **これはレガシー v1 インターフェイスです**。新規案件では [外部プッシュサービス v2(Generic)](/ja/push/external-push/external-push-v2) を優先的にご利用ください。v2 はより充実したメッセージフィールドと、複数受信者へのブロードキャストモデルを提供します。

------

## 設定方法

IMKIT プラットフォーム管理画面で環境変数を設定します:

```
PUSH=https://your-server.example.com/imkit/push
```

設定後、プッシュが必要なメッセージイベントが発生するたびに、IMKIT は `POST` でこの URL を呼び出します。

------

## リクエスト形式

### Method

`POST`

### Headers

| パラメータ        | 型     | 必須 | 説明                              |
| -------------- | ------ | ---- | --------------------------------- |
| `Content-Type` | string | ✅    | `application/json; charset=utf-8` |

### Request Body

1 リクエストにつき 1 名の受信者に対して送信されます。

| フィールド   | 型     | 説明                                                                |
| ---------- | ------ | ------------------------------------------------------------------- |
| メッセージフィールド | mixed  | フラット化されたメッセージオブジェクト([Message Model](/ja/realtime/socket-events#chat-message) を踏襲)   |
| `alert`    | string | 組み立て済みの APNs / FCM Alert テキスト。プッシュサービスへ直接送信できます |
| `toClient` | string | 受信者の Client ID                                                    |
| `badge`    | number | 該当受信者の現在の総未読メッセージ数。APNs `badge` または FCM `badge` にそのまま渡せます |

------

## リクエスト例

```javascript
{
  "_id": "5dd51a4f21841443cfd3090d",
  "message": "lala",
  "room": "demo-room",
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
  "toClient": "target-client-id",
  "badge": 100
}
```

------

## レスポンス

お客様のサービスは `200 OK` を返してください(内容は問いません)。IMKIT はレスポンス内容に基づいた後続処理を行いません。

------

## 使用シナリオ

### 既存プッシュサービスとの統合
- **自社プッシュの流用**:既存の APNs / FCM プッシュサービスをお持ちの場合、既存フローを変更せずに IMKIT のメッセージイベントを直接受け取れます

### カスタマイズされた文言
- **alert 内容のカスタマイズ**:自社サービス内で `messageType`、`sender`、`message` をもとにプッシュ文言を再構成でき、IMKIT の組み込みフォーマットに制約されません

### マルチチャネルプッシュ
- **APNs / FCM / Email / SMS への同時配信**:自社サービス内でメッセージを分配し、同じイベントを複数チャネルへ同時に配信できます

------

## 注意事項

- **レガシーインターフェイス**:この v1 は単一受信者モデルで、受信者ごとに 1 リクエストを送信します。受信者が多い場合はリクエスト数が増大するため、複数受信者のブロードキャストモデルを採用する [v2(Generic)](/ja/push/external-push/external-push-v2) のご利用をお勧めします
- **メッセージフィールドの差異**:v1 には `roomName` などの一部フィールドが含まれません。完全なチャットルーム情報が必要な場合は v2 をご利用ください
- **Webhook との併存**:このプッシュ callback は [チャットルーム Webhook](/ja/webhook/webhook) とは別の仕組みです。前者はプッシュ配信用、後者はボット / イベントリスナー用です
- **HTTPS 必須**:セキュリティの観点から、`PUSH` URL は HTTPS を使用し、送信元の検証(IP ホワイトリストや共有シークレット)を設定してください
- **Payload フォーマットの参照**:APNs / FCM のコンテンツを組み立てる際は、[プッシュペイロード形式](/ja/push/push-payload-format) をご参照ください
