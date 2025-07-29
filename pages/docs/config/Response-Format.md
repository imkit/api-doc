# Response Format

| Field         | Type   | Description          |
| ------------- | ------ | -------------------- |
| RC            | Int    | Return Code. 0 = success, non-zero = something wrong  |
| RM            | String | Return Message. OK or error cause. |
| result        | Object | Result object. |

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": { Result Object }
}
```