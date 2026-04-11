# システム設定の更新

## 概要

アプリケーションのシステム構成を更新します。このエンドポイントを通じて、お知らせ、検閲ワード、機能フラグなどの任意のキーと値のペアを設定できます。これは管理者専用の API であり、認証には `IM-API-KEY` が必要です。

------

## API エンドポイント

### システム設定の更新

システム構成のキーと値のペアを追加または更新します。

```http
POST /config
```

#### ヘッダー

| パラメータ | 型 | 必須 | 説明 |
| -------------- | ------ | ---- | ------------------------------- |
| `IM-API-KEY` | string | ✅ | 平台 API キー |
| `Content-Type` | string | ✅ | `application/json; charset=utf-8` |

#### ポストボディ

リクエスト内容は任意の JSON キーと値のペアで、システム構成として保存されます。

| パラメータ | 型 | 必須 | 説明 |
| ------ | ------ | ---- | ---------------------------------- |
| （任意のキー）| any | ❌ | 任意のキーと値のペア。システム構成設定として保存されます |

#### リクエスト例

**JavaScript（axios）- お知らせの設定**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    announcement: {
      text: "システムは 2026/04/15 02:00 に定期メンテナンスを行います。メンテナンス時間は2時間を予定しています。",
      pin: true
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**JavaScript（axios）- 検閲ワードの設定**

```javascript
const response = await axios.post(
  "https://your-app.imkit.io/config",
  {
    censorship: {
      keywords: ["広告", "スパム", "詐欺"]
    }
  },
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY,
      "Content-Type": "application/json; charset=utf-8"
    }
  }
);
```

**cURL - 複数の構成を設定**

```bash
curl -X POST "https://your-app.imkit.io/config" \
  -H "IM-API-KEY: your_api_key" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "announcement": {
      "text": "IMKitへようこそ！",
      "pin": true
    },
    "censorship": {
      "keywords": ["広告", "スパム"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }'
```

#### レスポンス

**成功（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------------- |
| `RC` | number | レスポンスコード（0は成功） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 更新後のシステム構成設定 |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "announcement": {
      "text": "IMKitへようこそ！",
      "pin": true
    },
    "censorship": {
      "keywords": ["広告", "スパム"]
    },
    "featureFlags": {
      "enableVoiceMessage": true,
      "enableFileSharing": true
    }
  }
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

**400 Bad Request** - リクエスト形式が不正

```json
{
  "RC": 400,
  "RM": "Bad Request",
  "error": {
    "code": "INVALID_BODY",
    "message": "Request body must be a valid JSON object"
  }
}
```

------

## 使用シーン

### お知らせ管理
- **システムお知らせの設定**: システムお知らせメッセージを公開または更新し、固定表示するかどうかを設定できます。
- **イベント告知**: 期間限定のイベントやプロモーションなどの情報を公開します。

### コンテンツ検閲設定
- **検閲ワードの設定**: メッセージフィルタリングに使用する禁止ワードリストを追加または更新します。
- **検閲ルールの調整**: コンテンツ検閲ルールを動的に調整します。

### 機能フラグ管理
- **機能切り替え**: 特定の機能を動的に有効化または無効化します。
- **パラメータ調整**: ファイルサイズ制限やメッセージ長制限などのシステムパラメータを更新します。

------

## 注意事項

- **管理者専用**: このエンドポイントは `IM-API-KEY` での認証が必要で、サーバー側からの呼び出しに限定されます。
- **上書き動作**: 同じキー名の設定値は上書き更新されます。
- **任意のキーと値**: リクエストボディは任意の JSON 構造をサポートしており、キー名や値の形式に制限はありません。
- **即時反映**: 更新された設定は即座に反映され、クライアントが次回 `GET /config` を読み取った際に最新の設定が取得されます。
