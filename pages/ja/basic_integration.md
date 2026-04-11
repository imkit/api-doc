# 基本的な統合 (Basic Integration)

## 概要

このガイドでは、IMKIT の基本的な統合プロセスについて説明します。「クイックスタート」を完了して API Key と Chat Server URL を取得した後、以下の 3 つのステップに従うことで、ユーザーの作成、チャットルームの作成、そして最初の対話の開始を迅速に行うことができます。

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
