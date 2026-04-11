# システム設定の削除

## 概要

アプリケーション内の特定のシステム構成項目を削除します。構成キーを指定することで、対応する設定値を削除できます。これは管理者専用の API であり、認証には `IM-API-KEY` が必要です。

------

## API エンドポイント

### 指定した構成項目の削除

キー名に基づいて特定のシステム構成設定を削除します。

```http
DELETE /config/:key
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| ------------ | ------ | ---- | ----------------- |
| `IM-API-KEY` | string | ✅ | 平台 API キー |

#### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
| ----- | ------ | ---- | -------------------- |
| `key` | string | ✅ | 削除する構成キー名 |

#### リクエスト例

**JavaScript（axios）**

```javascript
const response = await axios.delete(
  "https://your-app.imkit.io/config/announcement",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X DELETE "https://your-app.imkit.io/config/announcement" \
  -H "IM-API-KEY: your_api_key"
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 空のオブジェクト |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```

#### エラーレスポンス

**401 Unauthorized** - API キーが無効

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

**404 Not Found** - 指定された構成キーが存在しない

```json
{
  "RC": 404,
  "RM": "Not Found",
  "error": {
    "code": "CONFIG_NOT_FOUND",
    "message": "The specified config key does not exist"
  }
}
```

------

## 使用シーン

### 構成管理
- **期限切れのお知らせの削除**: 不要になったシステムお知らせ設定を削除します。
- **検閲ワードのクリア**: 検閲ワード設定項目全体を削除します。
- **機能フラグの無効化**: 特定の機能フラグ設定を削除してデフォルトの動作に戻します。

------

## 注意事項

- **管理者専用**: このエンドポイントは `IM-API-KEY` での認証が必要で、サーバー側からの呼び出しに限定されます。
- **復元不可能**: 削除操作は復元できません。内容をよく確認してから実行してください。
- **即時反映**: 削除後すぐに反映され、クライアントが次回 `GET /config` を読み取った際にその項目は含まれなくなります。
- **キー全体の削除**: この操作はキーと値のペア全体を削除します。内容の一部のみを削除したい場合は、`POST /config` で更新を行ってください。
