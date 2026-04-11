# 接続数の取得

## 概要

システムの現在の WebSocket リアルタイム接続数を取得します。このエンドポイントは、システム負荷のリアルタイム監視、キャパシティプランニング、および運用監視などの目的に使用できます。呼び出しにはプラットフォーム API 権限が必要です。

------

## API エンドポイント

### 現在の接続数を取得

システム上の現在の WebSocket 接続数を照会します。

```http
GET /admin/connection-count
```

#### ヘッダー

| パラメータ    | 型     | 必須 | 説明                    |
| ------------ | ------ | ---- | ----------------------- |
| `IM-API-KEY` | string | ✅    | プラットフォーム API キー |

#### リクエスト例

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/connection-count",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/connection-count" \
  -H "IM-API-KEY: your_api_key"
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ       | 型     | 説明                         |
| -------------- | ------ | ---------------------------- |
| `RC`           | number | レスポンスコード (0 は成功)   |
| `RM`           | string | レスポンスメッセージ          |
| `result`       | object | 照会結果                     |
| `result.count` | number | 現在の WebSocket 接続数       |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "count": 1523
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

**403 Forbidden** - 権限不足

```json
{
  "RC": 403,
  "RM": "Forbidden",
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Platform API permission required"
  }
}
```

------

## ユースケース

### リアルタイム監視
- **接続数監視**: 監視ダッシュボードに現在の WebSocket 接続数をリアルタイムで表示します。
- **異常検知**: 接続数の閾値を設定し、超過または急落した際にアラートをトリガーします。

### キャパシティプランニング
- **負荷評価**: 定期的に接続数を取得し、システムの負荷状況を評価します。
- **拡張の意思決定**: 接続数の傾向に基づいて、サーバーリソースの拡張が必要かどうかを判断します。

### 運用レポート
- **利用統計**: 時間帯別の接続数を記録し、利用レポートを作成します。
- **ピーク分析**: さまざまな時間帯の接続ピークを分析し、リソース配置を最適化します。

------

## 注意事項

- **プラットフォーム API 権限が必要**: このエンドポイントは、プラットフォーム API 権限を持つ `IM-API-KEY` を使用して認証する必要があります。
- **リアルタイムデータ**: 返されるのは呼び出し時点のリアルタイムな接続数であり、呼び出しごとに結果が異なる場合があります。
- **WebSocket 接続**: 統計対象は WebSocket の長時間接続数であり、一般的な HTTP リクエストは含まれません。
- **監視頻度**: 過度な頻繁な呼び出しを避けるため、適切な間隔（例：30秒ごと、または1分ごと）でポーリングすることをお勧めします。
