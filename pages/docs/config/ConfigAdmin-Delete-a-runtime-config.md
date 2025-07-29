# Delete a runtime config

This API should be used by platform console

### path

/config/:key

### Method

DELETE

### Headers:

| Field      | Description            |
| ---------- | ---------------------- |
| IM-API-KEY | Platform admin api key |

### Path Parameters

| Name | Description        |
| ---- | ------------------ |
| :key | Runtime config key |

```
## Delete Config
curl -X "DELETE" "http://localhost:3100/config/push" \
     -H 'IM-API-KEY: {API-KEY}'

```

### Response Result

Delete status

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {}
}
```
