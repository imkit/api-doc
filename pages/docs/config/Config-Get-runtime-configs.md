# Get runtime config variables

This API should be used by platform console.

### path

/config

### Method

GET

### Headers:

| Field      | Description |
| ---------- | ----------- |
| IM-CLIENT-KEY | Client Key     |
| IM-Authorization | Client Access Token |


### Response Result

Runtime config variables

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
