# Create or Update a user group's room preference

This for user group's customized preference.

### path

/roomPrefs/:room/group/:group

### Method

POST

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| IM-Authorization | Client Token |

### Path Parameters

| Field         | Description  |
| ------------- | ------------ |
| room          | Room ID      |
| group         | Group ID     |

### Post Body

| Field       | Type            | Description                                    |
| ----------- | --------------- | ---------------------------------------------- |
| tags        | Array of String | (Optional) Room tags                           |
| tagColors   | Mixed           | (Optional) map of tags to colors               |
| folder      | String          | (Optional) Room folder                         |
| muted       | Boolean         | (Optional) Room is muted or not. Not used yet. |
| sticky      | Boolean         | (Optional) Room is sticky on top or not.       |
| hidden      | Boolean         | (Optional) Room is hidden or not.              |
| translation | Boolean         | (Optional) Translation is hidden or not.       |

```
## Create Room Preference
curl -X "POST" "http://localhost:3100/roomPrefs/demo-room/group/demo-group" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "tagColors": {
    "demo": "#ffccff",
    "sample": "#ccffdd"
  },
  "tags": [
    "demo",
    "sample"
  ]
}'

```

### Response Result

Created or updated result

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "tags": ["demo", "sample"],
    "room": "demo-room",
    "tagColors": {
      "demo": "#ffccff",
      "sample": "#ccffdd"
    }
  }
}
```
