# APIキー

## 概要

APIキー（`IM-API-KEY`）は、IMKIT Platform APIにおいてバックエンドサービスで使用される認証キーであり、「プラットフォーム管理者」としての操作を象徴します。これには完全な管理権限が含まれており、ユーザー管理、チャットルーム管理、トークン管理などのすべての操作を実行でき、すべてのAPI（クライアントキーレベルのAPIを含む）を呼び出すことができます。サーバー側で安全に保管する必要があります。

------

## APIキーの特性

### 基本情報

| 属性 | 説明 |
| ------------ | ---------------------------------------- |
| **用途** | プラットフォーム管理者として操作を実行する |
| **組み合わせ** | 単独で使用し、ユーザートークンは不要 |
| **形式** | Base64エンコード文字列 |
| **有効期限** | 長期有効（明示的に取り消さない限り） |
| **スコープ** | 完全な管理権限、すべてのAPIを呼び出し可能 |
| **セキュリティレベル** | 機密（フロントエンドに公開してはならない） |

### クライアントキーとの違い

| 項目 | APIキー (`IM-API-KEY`) | クライアントキー (`IM-CLIENT-KEY`) |
| ------------ | ------------------------ | ------------------------------------- |
| **組み合わせ** | 単独で使用 | ユーザートークン (`IM-Authorization`) が必要 |
| **身分** | プラットフォーム管理者として操作 | 特定のユーザーとして操作 |
| **利用場所** | バックエンドのみ | SDKフロントエンド / バックエンド |
| **権限範囲** | 完全な管理権限 | ユーザー権限による制限あり |
| **セキュリティ** | 秘密保持が必須 | 公開可能 |

------

## APIキーの取得

### IMKIT Dashboard経由

1. [IMKIT Dashboard](https://dashboard.imkit.io/) にログインします。
2. アプリケーションを選択します。
3. 「API設定」ページに移動します。
4. APIキーをコピーします（一度だけ表示されます）。

### APIキーの例

```
MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

------

## 使用方法

### HTTPヘッダー認証

```http
POST /admin/clients
IM-API-KEY: MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
Content-Type: application/json

{
  "_id": "user001",
  "nickname": "Alice",
  "issueAccessToken": true
}
```

### コード例

**Node.js**

```javascript
const axios = require('axios');

const apiKey = process.env.IMKIT_API_KEY;
const baseURL = 'https://your-app.imkit.io';

const headers = {
  'IM-API-KEY': apiKey,
  'Content-Type': 'application/json'
};

// ユーザー作成
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/admin/clients`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error.response.data);
  }
};
```

**Python**

```python
import requests
import os

api_key = os.getenv('IMKIT_API_KEY')
base_url = 'https://your-app.imkit.io'

headers = {
    'IM-API-KEY': api_key,
    'Content-Type': 'application/json'
}

def create_user(user_data):
    try:
        response = requests.post(f'{base_url}/admin/clients', 
                               json=user_data, 
                               headers=headers)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Failed to create user: {e}')
```

**PHP**

```php
<?php
$apiKey = $_ENV['IMKIT_API_KEY'];
$baseUrl = 'https://your-app.imkit.io';

$headers = [
    'IM-API-KEY: ' . $apiKey,
    'Content-Type: application/json'
];

function createUser($userData) {
    global $baseUrl, $headers;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $baseUrl . '/admin/clients');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
?>
```

------

## APIキーの権限

### 許可される操作

- ✅ **ユーザー管理**
  - ユーザーの作成、更新、削除
  - ユーザー情報の照会
  - ユーザー権限の管理
- ✅ **トークン管理**
  - トークンの発行 (Issue Token)
  - トークンの更新
  - トークンの取り消し
- ✅ **チャットルーム管理**
  - チャットルームの作成、削除
  - チャットルームメンバーの管理
  - チャットルーム権限の設定
- ✅ **メッセージ管理**
  - システムメッセージの送信
  - メッセージの削除
  - メッセージ履歴の照会
- ✅ **アプリケーション設定**
  - アプリケーション設定の変更
  - Webhook設定の管理
  - 利用統計の確認

### 高リスクな操作

- ⚠️ **完全な制御権**: すべてのアプリケーションデータにアクセスおよび修正が可能
- ⚠️ **ユーザーデータ**: すべてのユーザーの個人情報にアクセス可能
- ⚠️ **チャット履歴**: すべてのチャットルームのメッセージ内容を読み取り可能
- ⚠️ **システム設定**: アプリケーションのコア設定を修正可能

------

## セキュリティ上の考慮事項

### なぜAPIキーを秘密にする必要があるのか？

1. **完全な権限**: アプリケーションの完全な制御権を保持しているため
2. **データアクセス**: すべてのユーザーおよびチャットデータにアクセスできるため
3. **取り消し不可能な操作**: 削除などの不可逆的な操作を実行できるため
4. **ユーザー認証なし**: 追加のユーザー認証を必要としないため

### セキュリティのベストプラクティス

#### ストレージの安全性

- **環境変数**: APIキーを環境変数に保存する
- **設定ファイル**: 暗号化された設定ファイルを使用する
- **シークレット管理サービス**: AWS Secrets Manager、Azure Key Vaultなどを使用する
- **バージョン管理の除外**: APIキーをバージョン管理システムにコミットしない

#### アクセス制御

- **最小権限の原則**: 必要なサービスでのみAPIキーを使用する
- **ネットワーク制限**: APIキーの送信元IP範囲を制限する
- **定期的なローテーション**: APIキーを定期的に更新する
- **使用状況の監視**: APIキーの使用状況や異常なアクティビティを監視する

#### アプリケーションのセキュリティ

```javascript
// ✅ 正解：サーバー側で使用する
const apiKey = process.env.IMKIT_API_KEY; // 環境変数から読み込む

// ❌ 間違い：フロントエンドに公開しない
// const apiKey = 'MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=';
```

------

## 環境設定の例

### Docker

```dockerfile
ENV IMKIT_API_KEY=MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
```

### .env ファイル

```env
IMKIT_API_KEY=MjJZcFlIRGFRbElRbERTdlZMQ0xMbzJNUHpGZlZtOWpZcHh3MnZ1QnJtaz0=
IMKIT_BASE_URL=https://your-app.imkit.io
```

### Kubernetes Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: imkit-secrets
type: Opaque
data:
  api-key: TWpKWmNGbElSR0ZSYkVsUmJFUlRkbFpNUTB4TWJ6Sk5VSEZHWmxadE9XcFpjSGgzTW5aMVFuSnRhejA9
```

------

## よくある質問

### Q: APIキーが漏洩した場合、どのようなリスクがありますか？

**A:** 非常に高いリスクがあります！攻撃者は以下のことが可能になります：

- IMKITアプリケーションの完全な制御
- すべてのユーザーデータおよびチャット履歴へのアクセス
- 重要なデータの削除または修正
- 追加費用の発生

**漏洩を発見した場合は、直ちに以下の対応を行ってください：**

1. Dashboardで古いAPIキーを取り消す
2. 新しいAPIキーを生成する
3. そのAPIキーを使用しているすべてのサービスを更新する
4. 異常な操作記録がないか確認する

### Q: フロントエンドのJavaScriptでAPIキーを使用できますか？

**A:** 絶対に使用しないでください！フロントエンドのコードはすべてのユーザーに公開されます。フロントエンドの統合にはクライアントキーを使用してください。

### Q: APIキーのアクセス範囲を制限するにはどうすればよいですか？

**A:** 現在、APIキーは完全な権限を持っています。以下の方法で制御することをお勧めします：

- ネットワーク層で送信元IPを制限する
- アプリケーション層で権限制御を実装する
- プロキシサービスを使用して呼び出し可能なAPIを制限する

### Q: APIキーに使用回数制限はありますか？

**A:** はい、APIキーにはレート制限（Rate Limiting）保護があります：

- 1分間に最大1000リクエスト
- 制限を超えると 429 エラーが返されます
- 適切なリトライメカニズムの実装を推奨します

------

## エラー処理

### よくあるエラー

**Invalid API Key**

```json
{
  "error": "INVALID_API_KEY",
  "message": "The provided API key is invalid or expired"
}
```

**Missing API Key**

```json
{
  "error": "MISSING_API_KEY",
  "message": "IM-API-KEY header is required"
}
```

**Rate Limit Exceeded**

```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests, please try again later",
  "retryAfter": 60
}
```

**Insufficient Permissions**

```json
{
  "error": "INSUFFICIENT_PERMISSIONS",
  "message": "API key does not have permission for this operation"
}
```
