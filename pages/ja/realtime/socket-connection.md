# Socket 接続

## 概要

IMKIT は Socket.IO を使用してリアルタイム双方向通信を提供しており、ネイティブアプリ / Web クライアントは接続中に新着メッセージ、既読状態の変化、入力中通知などのイベントをリアルタイムに受け取ることができます。本ページでは、接続の確立、データエンコーディングの設定、認証、イベントの購読、切断と再接続まで、完全な接続ライフサイクルについて説明します。

------

## 接続ライフサイクル

```
Step 0. SocketIO.connect()       — ベース接続を確立
   ↓
Step 1. emit('conf')             — (任意)データエンコーディングを設定
   ↓
Step 2. emit('auth2', token, …)  — (必須)認証
   ↓
Step 3. on('chat message', …)    — イベントを購読してリアルタイム受信を開始
```

------

## Step 0:接続の確立

Socket.IO クライアントを使用して IMKIT の socket エンドポイントに接続します。

```javascript
import { io } from "socket.io-client";

const socket = io("https://your-app.imkit.io", {
  forceNew: true,
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("[socket] connected");
  configSocket();   // Step 1
});
```

------

## Step 1:エンコーディングの設定(任意)

認証の前に `conf` イベントを送信することで、socket のデータエンコーディングを設定し、特定のメッセージ内容(特殊文字を含む文字列など)が socket-io によって解析される際のエラーを防止できます。

**Emit イベント**:`conf`

**パラメータ**:設定オブジェクト

| キー        | 値        | 説明                                                                 |
| ---------- | --------- | -------------------------------------------------------------------- |
| `encoding` | `base64`  | サーバーが base64 エンコードでデータを返すように有効化します。クライアント側でデコードしてから JSON を解析する必要があります |
| `encoding` | `custom`  | カスタムのトランスポート層暗号化を有効化します(サーバーと暗号化ロジックを取り決める必要があります) |

**例**

```javascript
function configSocket() {
  socket.emit("conf", { encoding: "base64" }, (ack) => {
    console.log("[socket] config ack:", ack);
    auth();   // Step 2
  });
}
```

`base64` を有効化すると、以後すべてのイベント payload は base64 文字列となるため、デコードしてから `JSON.parse` してオブジェクトを取得する必要があります。

------

## Step 2:認証(必須)

接続後は必ず認証を行ってください。認証されていないとイベントを受信できません。

**Emit イベント**:`auth2`

**パラメータ**

| パラメータ  | 型     | 説明                |
| -------- | ------ | ------------------- |
| `token`  | string | Client Token        |
| `extra`  | object | カスタムヘッダー(例:`deviceId`、`platform` など) |

**例**

```javascript
function auth() {
  const token = "{IM-Authorization}";
  const extra = {
    deviceId: "iphone-15-pro-uuid-001"
  };

  socket.emit("auth2", token, extra, (ack) => {
    console.log("[socket] auth ack:", ack);
    // 認証成功後、イベントを受信できます
  });
}
```

認証に失敗した場合、サーバーは接続を閉じます。クライアントは `error` と `disconnect` イベントを購読し、再接続フローを実装してください。

------

## Step 3:イベントの購読

認証に成功すると、各種イベントを購読できます。完全なイベントリストと payload 形式は [Socket イベント](/ja/realtime/socket-events) をご覧ください。

```javascript
socket.on("chat message", (data) => {
  const message = decodeIfNeeded(data);
  console.log("[socket] new message:", message);
});

socket.on("lastRead", (data) => {
  const event = decodeIfNeeded(data);
  console.log("[socket] lastRead:", event);
});

function decodeIfNeeded(raw) {
  if (typeof raw === "string") {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  }
  return raw;
}
```

------

## 再接続とハートビート

### ライフサイクルイベントの購読

```javascript
socket.on("disconnect", (reason) => {
  console.warn("[socket] disconnect:", reason);
});

socket.on("reconnect", () => {
  console.log("[socket] reconnect");
  // 再接続後は再認証が必要
  auth();
  // 未読総数を再取得して、UI とサーバーの一貫性を保つことを推奨
  fetchBadge();
});

socket.on("error", (err) => {
  console.error("[socket] error:", err);
});
```

### ハートビート(Ping / Pong)

サーバーは定期的に `ping` イベントを送信します。クライアントは即座に `pong` を返して接続を維持してください。多くの Socket.IO クライアントではこの動作は自動的に処理されますが、カスタムロジックは以下のとおりです:

```javascript
socket.on("ping", () => {
  if (socket.connected) {
    socket.emit("pong");
  } else {
    socket.connect();
  }
});
```

クライアントが想定時間内(例:30 秒)に `ping` を受信しなかった場合、接続が実質切断されたとみなし、自発的に `disconnect()` した後に `connect()` し直すべきです。

------

## 完全な最小サンプル

```javascript
import { io } from "socket.io-client";

const socket = io("https://your-app.imkit.io", { forceNew: true });

socket.on("connect", () => {
  socket.emit("conf", { encoding: "base64" }, () => {
    socket.emit("auth2", "{IM-Authorization}", {
      deviceId: "iphone-15-pro-uuid-001"
    }, (ack) => {
      console.log("authed:", ack);

      socket.on("chat message", (raw) => {
        const msg = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
        console.log("new message:", msg);
      });
    });
  });
});

socket.on("reconnect", () => {
  socket.emit("auth2", "{IM-Authorization}", {
    deviceId: "iphone-15-pro-uuid-001"
  });
});

socket.on("disconnect", (reason) => console.warn("disconnect:", reason));
socket.on("error", (err) => console.error("error:", err));
```

------

## 注意事項

- **認証順序**:必ず `connect` してから `auth2` を行ってください。順序を守らないとサーバーがイベントの購読を拒否します
- **再接続後の再認証**:Socket.IO の自動再接続後は新しい接続となるため、`auth2` を再度呼び出す必要があります
- **base64 エンコーディング**:`encoding: "base64"` を有効化することで、特殊文字が socket-io のシリアライズ時にパケットを破壊するのを防げます。本番環境での有効化を推奨します
- **トークンの有効期限**:Client token には有効期限があり、期限切れになると `auth2` が失敗するため、[トークン取得 API](/ja/user/user-token) を再度呼び出してから接続し直す必要があります
- **deviceId の一貫性**:`deviceId` は [プッシュトークンの登録](/ja/push/device-subscription/subscribe-device) で使用した値と同じにしてください。これにより、サーバーは「このユーザーがオンライン中のデバイスにはプッシュ不要」と判定できます
- **同一アカウントの複数デバイス**:同じ Client は複数のデバイスで複数の socket 接続を同時に確立でき、イベントはすべての接続にブロードキャストされます
- **ネットワーク復帰**:モバイルデバイスがネットワークを切り替える(Wi-Fi ↔ モバイル回線)際、通常は `disconnect` + `reconnect` がトリガーされます。UI 上で「再接続中」のステータスを表示することを推奨します
