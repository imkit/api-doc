# Create or update a config variable at runtime.

This API should be used by platform console.

### path

/config

### Method

POST

### Request Content-Type

application/json;

### Headers:

| Field      | Description |
| ---------- | ----------- |
| IM-API-KEY | API Key     |

### Request Parameters

| Key         | Value                     |
| ----------- | ------------------------- |
| $config_key | New config variable value |

```
## Set Config
curl -X "POST" "http://localhost:3100/config" \
     -H 'IM-API-KEY: {API-KEY}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
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
}'
```

### Response Result

Updated config variable

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
