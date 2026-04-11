# 禁止メンバーの一覧表示 (List Banned Members)

## 概要

指定したチャットルームの禁止リストを取得し、そのチャットルームで禁止されているすべてのユーザーの詳細情報を表示します。禁止リストを表示できるのは、チャットルームのオーナーのみです（オーナーが設定されているグループチャットルームに限ります）。この機能は、チャットルームのオーナーがチャットルームの禁止ステータスを確認および管理するのに適しています。

------

## API エンドポイント

### チャットルームの禁止リストを取得する

指定したチャットルームで禁止されているすべてのユーザーの詳細情報を取得します。

```http
GET /blockStatus/room/{roomID}
```

#### ヘッダー (Headers)

| パラメータ | 型 | 必須 | 説明 |
| ------------------ | ------ | ---- | -------------- |
| `IM-CLIENT-KEY` | string | ✅ | Client Key |
| `IM-Authorization` | string | ✅ | Client Token |

#### パスパラメータ (Path Parameters)

| パラメータ | 型 | 必須 | 説明 |
| -------- | ------ | ---- | ----------- |
| `roomID` | string | ✅ | チャットルーム ID |

#### リクエスト例

**チャットルームの禁止リストを取得する**

```http
GET /blockStatus/room/demo-room HTTP/1.1
IM-CLIENT-KEY: {IM-CLIENT-KEY}
IM-Authorization: {IM-Authorization}
Host: your-app.imkit.io
Connection: close
```

**JavaScript 例：**

```javascript
const response = await axios.get(
  `https://your-app.imkit.io/blockStatus/room/${roomID}`,
  {
    headers: {
      "IM-CLIENT-KEY": IM_CLIENT_KEY,
      "IM-Authorization": TOKEN,
    },
  }
);
```

**cURL 例：**

```bash
curl -X "GET" "https://your-app.imkit.io/blockStatus/room/{roomID}" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {IM-Authorization}'
```

#### レスポンス (Response)

**成功レスポンス（200 OK）**

| パラメータ | 型 | 説明 |
| -------- | ------ | ---------------------- |
| `RC` | number | レスポンスコード（0 は成功を示す） |
| `RM` | string | レスポンスメッセージ |
| `result` | object | 禁止リストデータ |

**結果オブジェクトの構造**

| パラメータ | 型 | 説明 |
| ------ | ----- | ---------------- |
| `data` | array | 禁止記録リストの配列 |

**禁止記録オブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------- | ------ | --------------------------- |
| `blockee` | object | 禁止されたユーザーの詳細情報 |
| `blocker` | object | 禁止を実行したユーザーの詳細情報 |
| `room` | object | チャットルームの詳細情報 |
| `createdAt` | string | 禁止作成日時 |
| `updatedAt` | string | 禁止更新日時 |

**禁止されたユーザーオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------------- | ------ | ----------------------------- |
| `_id` | string | ユーザー一意識別子 |
| `nickname` | string | ユーザーのニックネーム |
| `avatarUrl` | string | ユーザーのアバター URL |
| `id` | string | ユーザー ID |
| `lastLoginTimeMS` | number | 最終ログイン時間（ミリ秒タイムスタンプ） |

**禁止を実行したユーザーオブジェクトの構造**

| パラメータ | 型 | 説明 |
| ----------------- | ------ | ----------------------------- |
| `_id` | string | ユーザー一意識別子 |
| `nickname` | string | ユーザーのニックネーム |
| `avatarUrl` | string | ユーザーのアバター URL |
| `id` | string | ユーザー ID |
| `lastLoginTimeMS` | number | 最終ログイン時間（ミリ秒タイムスタンプ） |

**チャットルームオブジェクトの構造**

| パラメータ | 型 | 説明 |
| --------------- | ------ | ----------------------------- |
| `_id` | string | チャットルーム一意識別子 |
| `roomType` | string | チャットルームの種類（groupなど） |
| `id` | string | チャットルーム ID |
| `createdTimeMS` | number | チャットルーム作成時間（ミリ秒タイムスタンプ） |

#### レスポンス例

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "data": [
      {
        "blockee": {
          "_id": "ccc",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093667",
          "nickname": "Cathy",
          "id": "ccc",
          "lastLoginTimeMS": 1600006869368
        },
        "blocker": {
          "_id": "aaa",
          "avatarUrl": "http://loremflickr.com/240/240/style?1628093717",
          "nickname": "Alecia",
          "id": "aaa",
          "lastLoginTimeMS": 1583726632592
        },
        "room": {
          "_id": "demo-room",
          "roomType": "group",
          "id": "demo-room",
          "createdTimeMS": 1525001412492
        },
        "createdAt": "2021-08-04T16:08:53.057Z",
        "updatedAt": "2021-08-04T16:08:53.057Z"
      }
    ]
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
  "RM": "Access denied",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Only room owner can view blocklist in group chat rooms"
  }
}
```

**404 Not Found** - チャットルームが存在しない

```json
{
  "RC": 404,
  "RM": "Room not found",
  "error": {
    "code": "ROOM_NOT_FOUND",
    "message": "The specified room does not exist"
  }
}
```

------

## 使用シーン

### チャットルーム管理
- **禁止ステータスの確認**：チャットルームのオーナーが現在の禁止リストを確認します。
- **メンバー管理**：禁止されたユーザーの詳細情報と禁止記録を確認します。
- **管理上の意思決定**：禁止リストに基づき、その後の管理上の意思決定を行います。

### 権限管理
- **オーナー専用**：チャットルームのオーナーのみが禁止リストを表示できます。
- **プライバシー保護**：禁止情報が権限のないユーザーに閲覧されないように保護します。
- **権限検証**：表示権限がチャットルームの設定に準拠していることを確認します。

### 記録の追跡
- **禁止履歴**：禁止操作の時間記録を確認します。
- **ユーザー情報**：禁止されたユーザーと禁止を実行したユーザーの詳細情報を取得します。
- **チャットルームのステータス**：チャットルームの禁止管理状況を把握します。

------

## 注意事項

- **権限制限**：チャットルームのオーナーのみが禁止リストを表示できます（オーナーが設定されているグループチャットルームに限ります）。
- **チャットルームの種類**：この機能は主にグループチャットルームを対象としており、そのチャットルームにはオーナーが設定されている必要があります。
- **完全な情報**：禁止されたユーザー、禁止を実行したユーザー、およびチャットルームの完全な情報が返されます。
- **時間記録**：禁止の作成および更新のタイムスタンプが含まれます。
- **データ構造**：複数の禁止記録をサポートする配列形式で返されます。
- **空のリストの処理**：チャットルームで禁止されているユーザーがいない場合は、空の配列が返されます。
