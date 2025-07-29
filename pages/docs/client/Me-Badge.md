# Get user's total badge

### path

/me/badge

### Method

GET

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

### Query Parameters:

| Field    | Description                                                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| roomTags | (Optional) Sum badges by room tags. To specify multiple tags, you should have multiple roomTags parameters such like roomTags=demo&roomTags=foo |

```
curl "http://localhost:3100/me/badge?roomTags=demo&roomTags=foo" \
     -H 'Authorization: {TOKEN}' \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}'

```

### Response Result

User's badge count

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "badge": 10
  }
}
```
