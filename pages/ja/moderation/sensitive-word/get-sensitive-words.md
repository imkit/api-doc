# 敏感ワード設定の取得

## 概要

現在のシステムの敏感ワード（不適切ワード）審査設定を取得します。この API は[システム設定の取得](/ja/config/get-config)と同じエンドポイント `GET /config` を使用しますが、このページでは敏感ワードに関連する設定項目に焦点を当てています。

------

## API エンドポイント

### 敏感ワード設定の照会

敏感ワードリストを含む、現在のランタイム設定を取得します。

```http
GET /config
```

#### ヘッダー

| パラメータ         | 型     | 必須 | 説明            |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY`    | string | ✅    | Client Key     |
| `IM-Authorization` | string | ✅    | Client Token   |

#### リクエスト例

```http
GET /config HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例:**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/config`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 例:**

```bash
curl -X "GET" "https://your-app.imkit.io/config" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型     | 説明                       |
| --------- | ------ | -------------------------- |
| `RC`      | number | レスポンスコード (0 は成功) |
| `RM`      | string | レスポンスメッセージ        |
| `result`  | object | ランタイム設定データ        |

**設定オブジェクトの構造**

| パラメータ     | 型     | 説明              |
| -------------- | ------ | ---------------- |
| `announcement` | object | 告知設定          |
| `censorship`   | object | コンテンツ審査設定 |

**審査設定オブジェクトの構造**

| パラメータ | 型    | 説明             |
| --------- | ----- | ---------------- |
| `keywords` | array | 敏感ワードの配列 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "blahblah...",
      "pin": true
    },
    "censorship": {
      "keywords": [
        "foo",
        "bar"
      ]
    }
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

**403 Forbidden** - 権限不足

```json
{
  "RC": 403,
  "RM": "Permission denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only authorized users can view runtime config"
  }
}
```

------

## ユースケース

### 設定の確認
- **設定の閲覧**: 現在システムに設定されている敏感ワードリストを確認します。
- **ルールの把握**: システムの現在のコンテンツフィルタリングルールを把握します。
- **設定の検証**: 敏感ワード設定が正しく反映されているか検証します。

### システムモニタリング
- **設定の監視**: 敏感ワード設定の状態を定期的にチェックします。
- **異常検知**: 設定が異常であったり消失したりしていないか監視します。
- **コンプライアンスチェック**: 設定が規制要件に適合しているか確認します。

### 管理とメンテナンス
- **バックアップの準備**: 変更前に現在の設定をバックアップします。
- **問題の診断**: コンテンツフィルタリングに関連する問題を調査します。
- **バージョン管理**: 設定変更の履歴を追跡します。

------

## 注意事項

- **認証要件**: 設定を表示するには有効なクライアント認証が必要です。
- **ランタイム設定**: ファイルベースの設定ではなく、現在有効なランタイム設定を表示します。
- **完全な設定**: レスポンスには、敏感ワードだけでなく、すべてのランタイム設定項目が含まれます。
- **リアルタイムの状態**: システムの現在のリアルタイムな設定状態を表示します。
- **機密情報**: 設定内容に機密情報が含まれる場合があるため、適切に管理してください。
- **キャッシュメカニズム**: 設定にはキャッシュが適用されている場合があり、変更後に反映されるまで時間がかかることがあります。
