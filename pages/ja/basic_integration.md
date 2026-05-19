# 基本的な統合 (Basic Integration)

## 概要

このガイドでは、IMKIT の基本的な統合プロセスについて説明します。「クイックスタート」を完了して API Key と Chat Server URL を取得した後、以下の 4 つのステップに従うことで、ユーザーの作成、チャットルームの作成、対話の開始、そして web/native アプリで新着メッセージや既読/未読通知を受信できるようにする一連の流れを迅速に行うことができます。

------

## 前提条件

以下の準備が完了していることを確認してください。

| 項目 | 説明 | 取得方法 |
| ---- | ---- | -------- |
| API Key | バックエンド API 認証キー（`IM-API-KEY`） | IMKIT ダッシュボード |
| Client Key | クライアント接続キー（`IM-CLIENT-KEY`） | IMKIT ダッシュボード |
| Chat Server URL | Chat Server の URL | IMKIT ダッシュボード |

------

## ステップ 1：ユーザーの作成

API を使用して、システムのユーザーに対応する IMKIT ユーザーを作成し、アクセストークン（Token）を取得します。

```http
POST /admin/clients
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | プラットフォームの API キー |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### ユーザー A の作成

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

// ユーザー A を作成し、Token を取得
const userA = await axios.post(
  `${BASE_URL}/admin/clients`,
  {
    _id: "user-a",
    nickname: "Alice",
    avatarUrl: "https://example.com/alice.jpg",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);

const tokenA = userA.data.result.token;
console.log("ユーザー A の Token:", tokenA);
```

#### ユーザー B の作成

```javascript
// ユーザー B を作成し、Token を取得
const userB = await axios.post(
  `${BASE_URL}/admin/clients`,
  {
    _id: "user-b",
    nickname: "Bob",
    avatarUrl: "https://example.com/bob.jpg",
    issueAccessToken: true,
  },
  {
    headers: {
      "IM-API-KEY": API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);

const tokenB = userB.data.result.token;
console.log("ユーザー B の Token:", tokenB);
```

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "user-a",
    "nickname": "Alice",
    "avatarUrl": "https://example.com/alice.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expirationDate": "2026-04-17T00:00:00.000Z",
    "lastLoginTimeMS": 1712700000000
  }
}
```

> 取得した Token は、SDK や Web URL で使用するために、フロントエンドに安全に渡してください。

------

## ステップ 2：チャットルームの作成

チャットルームを作成し、ユーザー A とユーザー B をメンバーとして追加します。

```http
POST /rooms/
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ---- | ---- | ---- | ---- |
| `IM-API-KEY` | string | ✅ | プラットフォームの API キー |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### リクエスト例

```javascript
// 1対1のチャットルームを作成
const room = await axios.post(
  `${BASE_URL}/rooms/`,
  {
    roomType: "direct",
    members: ["user-a", "user-b"],
  },
  {
    headers: {
      "IM-API-KEY": API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);

const roomId = room.data.result._id;
console.log("チャットルーム ID:", roomId);
```

グループチャットルームを作成する場合は、`roomType` を `"group"` に変更し、さらにメンバーを追加します：

```javascript
// グループチャットルームを作成
const groupRoom = await axios.post(
  `${BASE_URL}/rooms/`,
  {
    name: "プロジェクト相談グループ",
    roomType: "group",
    members: ["user-a", "user-b", "user-c"],
  },
  {
    headers: {
      "IM-API-KEY": API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "_id": "6073a1b2c3d4e5f6a7b8c9d0",
    "roomType": "direct",
    "members": ["user-a", "user-b"],
    "status": 1,
    "createdTimeMS": 1712700000000
  }
}
```

------

## ステップ 3：対話の開始

チャットルームの作成が完了したら、ユーザーの Token を Web URL に含めることで、対話を開始できます。

### Web SDK の使用

ウェブページに IMKIT Web SDK を埋め込み、ユーザーの Token を使用して初期化します：

```html
<div id="imkit-container"></div>
<script src="https://cdn.imkit.io/sdk/web/latest/imkit.min.js"></script>
<script>
  window.IMKitUI.init({
    domain: "https://your-app.imkit.io",
    clientKey: "あなたの_CLIENT_KEY",
    token: "ユーザーの_TOKEN",
  });
</script>
```

### Web URL の使用

IMKIT から提供された Web URL をお持ちの場合は、ユーザーの Token をパラメータとして直接含めることができます：

```
https://your-app.imkit.io/chat?token=ユーザーの_TOKEN
```

ご自身のアプリケーション内で iframe を使用するか、この URL に直接リダイレクトすることで埋め込むことができます。

> URL パラメータの完全なリスト(チャットルーム指定、ダークモード、自動ルーム選択など)については、[Web URL パラメータ](/ja/web_url_params)を参照してください。

------

## ステップ 4：新着メッセージと既読/未読通知の受信

Web SDK または Web URL がアプリに埋め込まれた後の次のステップは、**外側の web コンテナまたはネイティブアプリ**でも「新着メッセージ」や「既読/未読」イベントを受信できるようにすることです。これらは、タイトルバーの未読数、ネイティブの通知センター、Tab badge などの UI を更新するために使用します。

全体のアーキテクチャ：

| チャネル | 用途 | 発火タイミング | パス |
| ---- | ---- | -------- | ---- |
| Socket.IO | リアルタイムイベント（`chat message`、`lastRead`、`typing`） | アプリがフォアグラウンドかつネットワーク接続中 | 共通 |
| APNs / FCM プッシュ（IMKIT 直送） | バックグラウンド通知 | アプリがバックグラウンドまたは終了状態 | A |
| APNs / FCM プッシュ（自社プッシュセンター経由） | バックグラウンド通知 | アプリがバックグラウンドまたは終了状態 | B |
| `PUT /rooms/:id/lastRead` | 既読の能動的な通知 | ユーザーがメッセージを読み終えたとき | 共通 |
| `GET /me/badge` | 未読総数の取得 | 任意のタイミング | 共通 |

---

### 4-1：Web（外側のコンテナ）

外側の web ページ（IMKIT chat ページではない）で Socket.IO 接続を確立し、リアルタイムイベントを受信します。完全なライフサイクルについては [Socket 接続](/ja/realtime/socket-connection) を、イベントフォーマットについては [Socket イベント](/ja/realtime/socket-events) を参照してください。

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io("https://your-app.imkit.io", { forceNew: true });

  socket.on("connect", () => {
    // Step 1: エンコーディングを設定（base64 の有効化を推奨）
    socket.emit("conf", { encoding: "base64" }, () => {
      // Step 2: 認証
      socket.emit("auth2", "ユーザーの_TOKEN", { deviceId: "web-tab-uuid" }, (ack) => {
        console.log("[socket] authed", ack);
      });
    });
  });

  // 新着メッセージの受信：tab badge の更新 / デスクトップ通知の表示
  socket.on("chat message", (raw) => {
    const msg = decode(raw);
    console.log("新着メッセージ：", msg);
    document.title = `(${++unreadCount}) Chat`;

    if (Notification.permission === "granted" && document.hidden) {
      new Notification(msg.sender.nickname, { body: msg.message });
    }
  });

  // 相手の既読：既読レシート UI を更新
  socket.on("lastRead", (raw) => {
    const event = decode(raw);
    console.log(`${event.memberID} は ${event.messageID} まで既読`);
    updateReadReceipt(event.roomID, event.memberID, event.messageID);
  });

  // 再接続後に再認証
  socket.on("reconnect", () => {
    socket.emit("auth2", "ユーザーの_TOKEN", { deviceId: "web-tab-uuid" });
  });

  function decode(raw) {
    if (typeof raw !== "string") return raw;
    return JSON.parse(atob(raw));
  }
</script>
```

ユーザーがメッセージを読み終えたら、[`PUT /rooms/:id/lastRead`](/ja/room/room-management/update-last-read) を呼び出してバックエンドに同期します：

```javascript
async function markAsRead(roomId, lastMessageId) {
  await fetch(`https://your-app.imkit.io/rooms/${roomId}/lastRead`, {
    method: "PUT",
    headers: {
      "IM-CLIENT-KEY": "あなたの_CLIENT_KEY",
      "IM-Authorization": "ユーザーの_TOKEN",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ message: lastMessageId }),
  });
}
```

---

### プッシュパスの選択

ネイティブアプリのバックグラウンドプッシュには互いに排他的な 2 つのパスがあります。現状に合わせていずれか一方を選択してください：

| パス | 適用シナリオ | 対応 API / 設定 |
| ---- | -------- | --------------- |
| **A. IMKIT 内蔵プッシュを使用** | 自社プッシュサービスがなく、最短で本番投入したい | アプリから [`POST /me/subscribe`](/ja/push/device-subscription/subscribe-device) を呼び出して device token を登録；IMKIT が APNs / FCM へ自動直送 |
| **B. 自社プッシュセンターを連携** | 既に自社プッシュセンターがある／IT ポリシーで token を自社管理する必要がある／複数チャネルでプッシュを集約したい | バックエンドで [`PUSH_GENERIC`](/ja/push/external-push/external-push-v2) callback を設定；アプリ側は `/me/subscribe` を**呼び出さない** |

> ⚠️ **2 つのパスは排他です**。両方を同時に有効化（`/me/subscribe` を呼び出しつつ `PUSH_GENERIC` も設定して自社センターから同じプッシュを送信）すると、ユーザーが**通知を重複受信**してしまいます。

---

### 4-2A：ネイティブアプリ — IMKIT 内蔵プッシュを使用

> **パス A のみ**。既に自社プッシュセンターをお持ちの場合は 4-2B へ進んでください。

ネイティブアプリは通常、IMKIT chat ページを WebView で埋め込みます。外側では別途以下を処理する必要があります：

1. **プッシュ token の登録**：ログイン後、APNs / FCM token を IMKIT に登録
2. **フォアグラウンドでの受信**：Socket 接続を確立してリアルタイムに badge / 通知を表示
3. **バックグラウンドでの受信**：APNs / FCM プッシュに依存
4. **既読の通知**：ユーザーが読み終えたときに `PUT /rooms/:id/lastRead` を呼び出す

#### iOS（Swift）— APNs トークンの登録

APNs device token を取得した後、[`POST /me/subscribe`](/ja/push/device-subscription/subscribe-device) を呼び出します：

```swift
func application(_ application: UIApplication,
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    let token = deviceToken.map { String(format: "%02x", $0) }.joined()
    let deviceId = UIDevice.current.identifierForVendor?.uuidString ?? ""

    var request = URLRequest(url: URL(string: "https://your-app.imkit.io/me/subscribe")!)
    request.httpMethod = "POST"
    request.setValue("あなたの_CLIENT_KEY", forHTTPHeaderField: "IM-CLIENT-KEY")
    request.setValue(userToken, forHTTPHeaderField: "IM-Authorization")
    request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
    request.httpBody = try? JSONSerialization.data(withJSONObject: [
        "type": "ios",
        "token": token,
        "deviceId": deviceId
    ])

    URLSession.shared.dataTask(with: request).resume()
}
```

プッシュを受信した際は、payload からメッセージタイプを解析し（詳細は [プッシュ Payload フォーマット](/ja/push/push-payload-format) を参照）、対応するチャットルームへ遷移できます。

#### Android（Kotlin）— FCM トークンの登録

```kotlin
class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onNewToken(fcmToken: String) {
        val deviceId = Settings.Secure.getString(
            contentResolver, Settings.Secure.ANDROID_ID
        )

        val body = JSONObject().apply {
            put("type", "fcm")
            put("token", fcmToken)
            put("deviceId", deviceId)
        }.toString()

        val request = Request.Builder()
            .url("https://your-app.imkit.io/me/subscribe")
            .addHeader("IM-CLIENT-KEY", "あなたの_CLIENT_KEY")
            .addHeader("IM-Authorization", userToken)
            .addHeader("Content-Type", "application/json; charset=utf-8")
            .post(body.toRequestBody("application/json".toMediaType()))
            .build()

        OkHttpClient().newCall(request).enqueue(/* ... */)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        val locKey = remoteMessage.data["loc-key"]      // 例: "im_loc_text"
        val locArgs = remoteMessage.data["loc-args"]    // 例: ["Alice", "Hello"]
        // ローカライゼーション key に応じて通知を表示し、対応するチャットルームへ遷移
    }
}
```

#### ネイティブ Socket（フォアグラウンドのリアルタイム badge）

アプリがフォアグラウンドのときにプッシュに依存せず即座に badge を更新したい場合は、ネイティブ側で Socket 接続を確立できます。ロジックは 4-1 の web サンプルと同じで、各プラットフォーム対応の Socket.IO クライアント（[socket.io-client-swift](https://github.com/socketio/socket.io-client-swift) / [socket.io-client-java](https://github.com/socketio/socket.io-client-java)）を使用します。完全なフローは [Socket 接続](/ja/realtime/socket-connection) を参照してください。

#### ユーザーログアウト時の登録解除

```http
POST /me/unsubscribe
```

詳細は [デバイス Token の登録解除](/ja/push/device-subscription/unsubscribe-device) を参照してください。

---

### 4-2B：ネイティブアプリ — 自社プッシュセンターを連携

> **パス B のみ**。このパスではアプリ側から `/me/subscribe` を**呼び出さず**、自社既存の device token 登録フローをそのまま利用します。

#### フロー概要

```
IMKIT メッセージイベント
   ↓ (PUSH_GENERIC callback)
あなたのバックエンド
   ↓ (token の参照、badge の算出、payload の組み立て)
あなたのプッシュセンター
   ↓ (APNs / FCM)
ユーザーのデバイス
```

#### ステップ 1：PUSH_GENERIC 環境変数の設定

IMKIT 管理画面で以下の環境変数を設定します：

```
PUSH_GENERIC=https://your-server.example.com/imkit/push/v2
```

設定後、プッシュ通知が必要なメッセージイベントが発生するたびに、IMKIT は「フラット化されたメッセージオブジェクト + `pushToClients` 受信者配列」を 1 回の HTTP POST でこの URL に送信します。

完全なフィールド仕様は [外部プッシュサービス v2](/ja/push/external-push/external-push-v2) を参照してください。

#### ステップ 2：Callback handler の実装

以下は Node.js + Express の例で、IMKIT イベントを受け取って自社プッシュセンターへ転送する流れを示します：

```javascript
import express from "express";
const app = express();
app.use(express.json());

app.post("/imkit/push/v2", async (req, res) => {
  const {
    _id: messageId,
    message,
    room,
    roomName,
    sender,
    messageType,
    pushToClients = [],
  } = req.body;

  // 1. 受信者ごとに並列処理
  await Promise.all(
    pushToClients.map(async (clientId) => {
      // 2. 自社のデータソースから device token を取得（IMKIT からではなく）
      const devices = await yourDB.getDevicesByClientId(clientId);

      // 3. badge は自前で算出（PUSH_GENERIC は receiver badge を含まない）
      const badge = await yourDB.countUnread(clientId);

      // 4. プッシュ payload を組み立て、自社プッシュセンターへ送出
      await yourPushCenter.send({
        clientId,
        devices,
        title: roomName || sender.nickname,
        body: messageType === "text" ? message : `${sender.nickname} が ${messageType} を送信しました`,
        badge,
        data: {
          roomId: room,
          messageId,
          messageType,
        },
      });
    })
  );

  // すぐに 200 を返し、IMKIT をブロックしない
  res.status(200).end();
});

app.listen(3000);
```

> IMKIT が提供する `im_loc_*` ローカライゼーション key を使ってプッシュ文面を組み立てることもできます（詳細は [プッシュ Payload フォーマット](/ja/push/push-payload-format) を参照）。あるいは自社センター側でカスタム文面ロジックを適用しても構いません。

#### ステップ 3：アプリ側 — 既存フローを活用

アプリ側では IMKIT の `/me/subscribe` を**呼び出さず**、これまでの実装をそのまま流用します：

- iOS：`registerForRemoteNotifications` → token を自社バックエンドにアップロード
- Android：Firebase `onNewToken` → token を自社バックエンドにアップロード

アプリがプッシュを受信した際は、自社プッシュセンターの payload フォーマットに合わせて解析してください。フォアグラウンドのリアルタイムイベント、`lastRead` 同期、`badge` 取得は引き続き IMKIT API を使用します（[共通部分](#全体のアーキテクチャ)。パス A と完全に同じです）。

#### 高度なオプション：Webhook（チャットルーム単位）

特定のチャットルームのみ自社プッシュを有効にしたい場合や、よりきめ細かいイベント分配（メンバーの参加・退出など）が必要な場合は、[Webhook](/ja/webhook/webhook) を利用してチャットルームごとに個別の callback URL を設定できます。一般的な「サイト全体のプッシュセンター」用途には引き続き `PUSH_GENERIC` を推奨します。

---

### 4-3：現在の未読数を取得

未読総数を再取得したい任意のタイミングで、以下を呼び出します：

```javascript
const res = await fetch("https://your-app.imkit.io/me/badge", {
  headers: {
    "IM-CLIENT-KEY": "あなたの_CLIENT_KEY",
    "IM-Authorization": "ユーザーの_TOKEN",
  },
});
const { result } = await res.json();
console.log("未読総数：", result.badge);
```

詳細は [ユーザーの未読メッセージ取得](/ja/message/message-badge/get-unread-message-by-a-user) を参照してください。再接続後はこの API を一度呼び出すことを推奨します。これにより切断中の未読計上漏れを防げます。

---

### 統合のポイント

- **フォアグラウンドは Socket、バックグラウンドはプッシュ**：両者を組み合わせることでメッセージの取りこぼしを防げます
- **2 つのパスは排他**：パス A（`/me/subscribe`）とパス B（`PUSH_GENERIC`）はいずれか一方のみを有効にしてください。両方を同時に有効にすると二重プッシュが発生します
- **パス B ではアプリから `/me/subscribe` を呼び出さない**：呼び出すと IMKIT が独自に追加プッシュを送出し、自社プッシュセンターと重複します
- **パス B では badge を自前管理**：`PUSH_GENERIC` callback は receiver badge を含まないため、自社バックエンドで [`GET /me/badge`](/ja/message/message-badge/get-unread-message-by-a-user) または自社データソースを基に算出してください
- **deviceId の一貫性（パス A）**：subscribe / socket auth2 で同じ `deviceId` を使うことで、サーバー側が「このデバイスは現在オンライン、プッシュは不要」と判断できます
- **Token の有効期限切れ**：Socket `auth2` が失敗した場合は、[Token 取得 API](/ja/user/user-token) で新しい token を取得してから再接続してください
- **ログアウト処理**：パス A では必ず `/me/unsubscribe` + socket の `disconnect` を実行してください。パス B では自社プッシュセンターから当該デバイスの token を削除し、次のユーザーが前のユーザー宛のプッシュを受け取らないようにしてください

------

## 完全な統合フロー

以下は、2 人のユーザーと 1 つのチャットルームを作成する一連の流れをカバーした、バックエンド統合の完全な例です：

```javascript
const axios = require("axios");

const BASE_URL = "https://your-app.imkit.io";
const API_KEY = process.env.IM_API_KEY;

const headers = {
  "IM-API-KEY": API_KEY,
  "Content-Type": "application/json; charset=utf-8",
};

async function setupChat() {
  // 1. ユーザー A を作成
  const userA = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-a", nickname: "Alice", issueAccessToken: true },
    { headers }
  );

  // 2. ユーザー B を作成
  const userB = await axios.post(
    `${BASE_URL}/admin/clients`,
    { _id: "user-b", nickname: "Bob", issueAccessToken: true },
    { headers }
  );

  // 3. チャットルームを作成
  const room = await axios.post(
    `${BASE_URL}/rooms/`,
    { roomType: "direct", members: ["user-a", "user-b"] },
    { headers }
  );

  return {
    tokenA: userA.data.result.token,
    tokenB: userB.data.result.token,
    roomId: room.data.result._id,
  };
}

setupChat().then((result) => {
  console.log("統合完了！");
  console.log("ユーザー A の Token:", result.tokenA);
  console.log("ユーザー B の Token:", result.tokenB);
  console.log("チャットルーム ID:", result.roomId);
});
```

------

## 次のステップ

基本統合が完了したら、さらに以下について確認してください：

- [認証](/ja/auth) — API Key と Client Key の詳細な使い方
- [ユーザー管理](/ja/user/user-management) — その點のユーザー管理機能
- [チャットルーム管理](/ja/room/room-management) — チャットルームの高度な操作
- [メッセージ機能](/ja/message/message-basic) — API を介したメッセージの送信と管理
- [Webhook](/ja/webhook) — チャットルームイベントを受信し、自動化プロセスを実現
