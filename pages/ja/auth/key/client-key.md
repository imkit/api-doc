# クライアントキー

## 概要

クライアントキー（`IM-CLIENT-KEY`）は、IMKIT Platform APIにおいてアプリケーションを識別するための認証キーです。ユーザートークン（`IM-Authorization`）と組み合わせて使用し、「特定のユーザー」として操作を実行することを意味します。主にSDKの初期化、WebSocket接続の確立、およびユーザーレベルのAPI操作に使用されます。

------

## クライアントキーの特性

### 基本情報

| 属性 | 説明 |
| ------------ | -------------------------------------- |
| **用途** | アプリケーションを識別し、ユーザートークンと組み合わせて操作を実行する |
| **組み合わせ** | `IM-Authorization`（ユーザートークン）が必要 |
| **形式** | JWTトークン形式 |
| **有効期限** | 長期有効（明示的に取り消さない限り） |
| **スコープ** | 操作範囲はユーザー権限によって制限される |
| **セキュリティレベル** | 公開（フロントエンドのコードに含めることが可能） |

### APIキーとの違い

| 項目 | クライアントキー (`IM-CLIENT-KEY`) | APIキー (`IM-API-KEY`) |
| ------------ | ------------------------------------- | ------------------------ |
| **組み合わせ** | ユーザートークン (`IM-Authorization`) が必要 | 単独で使用 |
| **身分** | 特定のユーザーとして操作 | プラットフォーム管理者として操作 |
| **利用場所** | SDKフロントエンド / バックエンド | バックエンドのみ |
| **権限範囲** | ユーザー権限による制限あり | 完全な管理権限 |
| **セキュリティ** | 公開可能 | 秘密保持が必須 |

------

## クライアントキーの取得

### IMKIT Dashboard経由

1. [IMKIT Dashboard](https://dashboard.imkit.io/) にログインします。
2. アプリケーションを選択します。
3. 「設定」ページに移動します。
4. クライアントキーをコピーします。

### クライアントキーの例

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiIySllwWWhEYVFsSVFsRFN2VkxDTExvMk1QekZmVm05allweHcydnVCcm1rPSIsImNyZWF0ZUF0IjoxNTkxOTcyNTc2NDE0LCJjbGllbnRJZCI6IjJiM2JkNWNjLTRhODYtNGE0MC1hMTU0LTE2NDA0MDE0ZGE4OCJ9.bdIWOcPfDrNuLRszgtrQDaQiow_X-WolzjDhtiLEED8
```

------

## 使用方法

### Web SDK 初期化

```javascript
const config = {
  domain: "https://your-app.imkit.io",
  clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  token: "user-access-token"
}

window.IMKitUI.init(config);
```

### iOS SDK 初期化

```swift
let config = IMKitConfig(
    domain: "https://your-app.imkit.io",
    clientKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token: "user-access-token"
)

IMKit.shared.initialize(config: config)
```

### Android SDK 初期化

```kotlin
val config = IMKitConfig(
    domain = "https://your-app.imkit.io",
    clientKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    token = "user-access-token"
)

IMKit.initialize(config)
```

------

## クライアントキーの権限

### 許可される操作（ユーザートークンが必要）

- ✅ WebSocket接続の確立
- ✅ チャットメッセージの送受信
- ✅ チャットルームへの参加/退出
- ✅ チャットルームメンバーの管理
- ✅ マルチメディアファイルのアップロード
- ✅ ユーザーステータスの更新
- ✅ ユーザーのブロック/禁止
- ✅ メッセージのピン留め/取り消し

### 許可されない操作（APIキーが必要）

- ❌ ユーザーの作成/削除
- ❌ ユーザートークンの管理
- ❌ アプリケーション設定の変更
- ❌ チャットルームを跨いだメッセージ履歴へのアクセス
- ❌ メッセージの一括送信

------

## セキュリティ上の考慮事項

### なぜクライアントキーを公開できるのか？

1. **限定的な権限**: 操作範囲がユーザー権限に制限されているため
2. **トークンが必要**: 有効なユーザートークンがないと操作できないため
3. **管理権限なし**: ユーザー管理やトークン管理などの管理者操作は実行できないため
4. **アプリケーションの隔離**: 特定のアプリケーションにしか接続できないため

### ベストプラクティス

- **バージョン管理**: クライアントキーをバージョン管理に含めることができます
- **環境の区別**: 環境ごとに異なるクライアントキーを使用する
- **定期的なローテーション**: リスクは比較的低いですが、定期的な更新を推奨します
- **使用状況の監視**: クライアントキーの使用状況を監視する

------

## よくある質問

### Q: クライアントキーが漏洩した場合、どのようなリスクがありますか？

**A:** リスクは比較的低いですが、攻撃者が実際の操作を行うには有効なユーザートークンが必要です。しかし、漏洩を発見した場合は、速やかに新しいクライアントキーに更新することをお勧めします。

### Q: モバイルアプリケーションでクライアントキーを使用できますか？

**A:** はい、クライアントキーはネイティブのiOS/Androidアプリを含むモバイルアプリケーションに安全に埋め込めるように設計されています。

### Q: クライアントキーに有効期限はありますか？

**A:** デフォルトでは有効期限はありませんが、Dashboardで手動で取り消し、新しいクライアントキーを生成することができます。

### Q: 1つのアプリケーションに複数のクライアントキーを持つことはできますか？

**A:** 現在、各アプリケーションに持てるクライアントキーは1つだけです。更新が必要な場合は、古いキーを取り消してから新しいキーを生成してください。

------

## エラー処理

### よくあるエラー

**Invalid Client Key**

```json
{
  "error": "INVALID_CLIENT_KEY",
  "message": "The provided client key is invalid or expired"
}
```

**Client Key Mismatch**

```json
{
  "error": "CLIENT_KEY_MISMATCH", 
  "message": "Client key does not match the specified domain"
}
```

**Missing Client Key**

```json
{
  "error": "MISSING_CLIENT_KEY",
  "message": "Client key is required for SDK initialization"
}
```
