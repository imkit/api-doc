# 敏感ワード設定の削除

## 概要

システムの敏感ワード（不適切ワード）審査設定を削除します。ランタイム設定から審査設定を削除することで、敏感ワードフィルタリング機能を無効化したり、特定の設定項目をクリアしたりできます。この機能は、設定のクリーンアップ、機能の無効化、システムのメンテナンスに適しています。

------

## API エンドポイント

### 設定項目の削除

指定したランタイム設定項目を削除します。

```http
DELETE /config/{key}
```

#### ヘッダー

| パラメータ    | 型     | 必須 | 説明                    |
| ------------ | ------ | ---- | ----------------------- |
| `IM-API-KEY` | string | ✅    | プラットフォーム管理者 API Key |

#### パスパラメータ

| パラメータ | 型     | 必須 | 説明                |
| --------- | ------ | ---- | ------------------ |
| `key`     | string | ✅    | ランタイム設定キー値 |

#### リクエスト例

**敏感ワード設定の削除**

```http
DELETE /config/censorship HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**告知設定の削除**

```http
DELETE /config/announcement HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**その他の設定の削除**

```http
DELETE /config/push HTTP/1.1
IM-API-KEY: {API-KEY}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例:**

```javascript
const response = await axios.delete(
  `https://your-app.imkit.io/config/censorship`,
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
    },
  }
);
```

**cURL 例:**

```bash
curl -X "DELETE" "https://your-app.imkit.io/config/censorship" \
     -H 'IM-API-KEY: {IM-API-KEY}'
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ | 型     | 説明                       |
| --------- | ------ | -------------------------- |
| `RC`      | number | レスポンスコード (0 は成功) |
| `RM`      | string | レスポンスメッセージ        |
| `result`  | object | 空のオブジェクト            |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

#### エラーレスポンス

**401 Unauthorized** - 認証失敗

```json
{
  "RC": 401,
  "RM": "Unauthorized",
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid or missing API key"
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
    "message": "Only platform admin can manage runtime config"
  }
}
```

**404 Not Found** - 設定項目が存在しない

```json
{
  "RC": 404,
  "RM": "Config not found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## ユースケース

### 機能の無効化
- **フィルタリングの停止**: 敏感ワードフィルタリング機能を完全に無効にします。
- **一時的な停止**: 特定の設定機能を一時的に停止します。
- **テスト環境**: テスト環境から本番環境の設定を削除します。

### 設定のクリーンアップ
- **期限切れの設定**: 使用されなくなった設定項目をクリーンアップします。
- **再設定**: 古い設定を削除して再設定の準備をします。
- **システムのリセット**: 設定をデフォルト状態にリセットします。

### メンテナンス操作
- **緊急対応**: 問題のある設定を緊急に削除します。
- **バージョンアップ**: システム更新時に古い設定をクリーンアップします。
- **バグ修正**: 問題の原因となっている設定項目を削除します。

------

## 注意事項

- **プラットフォーム管理者専用**: この機能はプラットフォーム管理者のみが利用可能で、API Key が必要です。
- **即時反映**: 設定の削除は即時に反映され、関連機能はすぐに停止します。
- **復旧不可**: 削除操作は元に戻せません。事前の設定バックアップを推奨します。
- **機能への影響**: `censorship` 設定を削除すると、敏感ワードフィルタリングが完全に無効になります。
- **ランタイム設定**: ランタイム設定のみに影響し、ファイルベースの設定は変更しません。
- **依存関係の確認**: 削除前に、他の機能がこの設定に依存していないか確認してください。
- **モニタリング推奨**: 削除後、システム機能が正常に動作しているかモニタリングしてください。
