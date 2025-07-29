# Bind Token to Client

This API should be used by server side.

### path

/admin/clients/:client-id/token

### Method

PUT

### Headers:

| Field      | Description |
| ---------- | ----------- |
| IM-API-KEY | API Key     |

### Path Parameters

| Name       | Description |
| ---------- | ----------- |
| :client-id | Client ID   |

### JSON Request Body

| Name           | Description                               |
| -------------- | ----------------------------------------- |
| token          | Client access token                       |
| expirationDate | Token expiration date, in ISO 8601 format |

```
## Bind Token to Client
curl -X "PUT" "http://localhost:3100/admin/clients/sss/token/" \
     -H 'IM-API-KEY: fangho_imkit_0412_2018_001_apikey' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "token": "SOME_TOKEN",
  "expirationDate": "2020-05-18T07:33:45.000Z"
}'


```

### Response Result

| Name             | Description                                           |
| ---------------- | ----------------------------------------------------- |
| token            | Token                                                 |
| client           | client                                                |
| expirationDate   | Expiration date time                                  |
| expirationDateMS | Expiration date time in milliseconds since Unix Epoch |

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "token": "SOME_TOKEN",
    "client": "1485248560558",
    "expirationDate": "2017-02-06T08:42:58.391Z",
    "expirationDateMS": 1486370578391
  }
}
```
