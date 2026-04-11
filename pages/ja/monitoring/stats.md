# 統計レポート

## 概要

アプリケーションの統計レポートデータを取得します。これには、ユーザーリスト、チャットルーム数、メッセージ数、接続ピーク、およびシステムメモリ情報が含まれます。デフォルトでは、直近1時間（3600秒）のデータをサンプリングします。使用量分析、キャパシティ監視、および運用レポートなどのシナリオに適しています。

------

## API エンドポイント

### 統計レポートを取得

指定された時間範囲内のアプリケーションの統計データを照会します。

```http
GET /admin/stats
```

#### ヘッダー

| パラメータ    | 型     | 必須 | 説明                    |
| ------------ | ------ | ---- | ----------------------- |
| `IM-API-KEY` | string | ✅    | プラットフォーム API キー |

#### リクエスト例

**JavaScript (axios)**

```javascript
const response = await axios.get(
  "https://your-app.imkit.io/admin/stats",
  {
    headers: {
      "IM-API-KEY": process.env.IM_API_KEY
    }
  }
);
```

**cURL**

```bash
curl -X GET "https://your-app.imkit.io/admin/stats" \
  -H "IM-API-KEY: your_api_key"
```

#### レスポンス

**成功レスポンス (200 OK)**

| パラメータ             | 型     | 説明                                         |
| --------------------- | ------ | -------------------------------------------- |
| `RC`                  | number | レスポンスコード (0 は成功)                   |
| `RM`                  | string | レスポンスメッセージ                          |
| `result`              | object | 統計結果                                     |
| `result.clientKey`    | string | Client Key (機密情報、ログに記録しないでください) |
| `result.apiKey`       | string | API Key (機密情報、ログに記録しないでください)    |
| `result.startTime`    | string | 統計開始時間 (ISO 形式)                       |
| `result.endTime`      | string | 統計終了時間 (ISO 形式)                       |
| `result.start`        | number | 統計開始時間 (Unix タイムスタンプ、秒)          |
| `result.end`          | number | 統計終了時間 (Unix タイムスタンプ、秒)          |
| `result.userList`     | array  | 期間内のアクティブユーザーリスト               |
| `result.roomCount`    | number | 期間内のアクティブチャットルーム数             |
| `result.totalRoomCount` | number | チャットルーム総数                             |
| `result.messageCount` | number | 期間内のメッセージ総数                         |
| `result.peakConnectionCount` | number | 期間内の WebSocket 接続ピーク数          |
| `result.totalMem`     | number | システム総メモリ (バイト)                      |
| `result.freeMem`      | number | システム空きメモリ (バイト)                    |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "clientKey": "ck_abcdef1234567890",
    "apiKey": "ak_abcdef1234567890",
    "startTime": "2026-04-11T09:00:00.000Z",
    "endTime": "2026-04-11T10:00:00.000Z",
    "start": 1744362000,
    "end": 1744365600,
    "userList": ["user001", "user002", "user003", "user004", "user005"],
    "roomCount": 12,
    "totalRoomCount": 358,
    "messageCount": 2467,
    "peakConnectionCount": 1893,
    "totalMem": 8589934592,
    "freeMem": 3221225472
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

### 使用量分析
- **アクティブユーザー統計**: `userList` を通じて期間内のアクティブユーザーを把握します。
- **メッセージ量分析**: `messageCount` を追跡してメッセージ送信の傾向を把握します。
- **チャットルームのアクティブ度**: `roomCount`（アクティブ）と `totalRoomCount`（総数）の比率を比較します。

### キャパシティ監視
- **接続ピークの追跡**: `peakConnectionCount` を通じて接続ピークを把握し、サーバーの拡張を計画します。
- **メモリ監視**: `totalMem` と `freeMem` を通じてシステムのメモリ使用状況を監視します。
- **パフォーマンス基準**: パフォーマンスの基準線（ベースライン）を確立し、異常な負荷を検知します。

### 運用レポート
- **1時間ごとのレポート**: 定期的に統計データを取得し、運用レポートを作成します。
- **傾向分析**: 履歴データを蓄積して、長期的な傾向分析を行います。

------

## 注意事項

- **サンプリング間隔**: デフォルトでは直近1時間（3600秒）のデータをサンプリングします。
- **プラットフォーム API 権限が必要**: このエンドポイントは `IM-API-KEY` を使用して認証する必要があります。
- **メモリデータ**: `totalMem` と `freeMem` はサーバーホストのメモリ情報であり、単位はバイトです。
- **アクティブユーザー**: `userList` にはサンプリング期間内にアクティビティがあったユーザーのみが含まれ、登録済みユーザー全員を代表するものではありません。
- **データのリアルタイム性**: 統計データは照会時点のスナップショットであり、わずかな遅延が発生する場合があります。
