# クイックスタート

IMKIT Platform API を使用するには、まず [IMKIT Dashboard](https://dashboard.imkit.io/) でアカウントを作成し、Chat Server（アプリケーション）を作成して Client Key と API Key を取得する必要があります。

## ステップ 1: アカウントの作成

1. IMKIT Dashboard の[登録ページ](https://dashboard.imkit.io/sign_up)にアクセスし、指示に従って登録を完了してください。メールアドレスに加えて、Apple ID でも登録できます。

![signup1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup1.png)

2. 登録完了後、登録したメールの受信トレイに届いた確認メールを確認し、指示に従って認証を完了してください。

![signup2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup2.png)
![signup3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup3.png)

## ステップ 2: Chat Server の作成

1. 下の `Add Application` をクリックします

![application1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application1.png)

2. アプリケーション名を入力します（ウェブサイトやアプリの名前を使用できます）

![application2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application2.png)

3. 対応する SDK 環境を選択します

![application3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application3.png)

4. `Complete` をクリックして Chat Server の作成を完了します

![application4](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application4.png)

## ステップ 3: Chat Server のキーとパラメータの取得

1. **Client Key**: SDK 側からバックエンド API を呼び出す際に使用するキーで、API ドキュメントでは `IM-CLIENT-KEY` と表記されています

![key1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key1.png)

2. **バックエンド API Key**: 管理者としてバックエンド API を呼び出す際に使用するキーで、最高レベルの権限を持ちます。API ドキュメントでは `IM-API-KEY` と表記されています

![key2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key2.png)

3. **Chat Server URL**: このアプリケーションの Chat Server の実際の URL で、`https://[アプリケーション名].imkit.io` となります

![key3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key3.png)

## ステップ 4: Postman で API をテストする（オプション）

キーを取得したら、Postman Collection をインポートしてコードを書かずに Chat Server API をすぐにテストできます。

### ダウンロード

- [IMKit API Collection](/collections/IMKit-API.postman_collection.json)（51 個の API request）
- [IMKit API Environment](/collections/IMKit-API.postman_environment.json)（環境変数テンプレート）

### インポート手順

1. Postman を開き、左上の **Import** をクリックして上記 2 つの JSON ファイルをインポートします
2. 右上の Environment ドロップダウンで **IMKit API** を選択し、**Edit** をクリックして以下の変数を入力します：

| 変数 | 値（ステップ 3 から） |
|------|----------------------|
| `domain` | Chat Server URL（例：`https://myapp.imkit.io`） |
| `apiKey` | Backend API Key |
| `clientKey` | Client Key |
| `token` | 「Create or Update User」API で取得した Access Token |

3. 保存後、任意のリクエストを選択して **Send** をクリックしてテストを開始します
