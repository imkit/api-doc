# Create or Update user's room preference

This for user's customized preference.
For common preferences shared among all room members, please use Room.extra or Room.Tags.

### path

/roomPrefs/:room

### Method

POST

### Headers:

| Field         | Description  |
| ------------- | ------------ |
| IM-CLIENT-KEY | Client Key   |
| Authorization | Client Token |

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
curl -X "POST" "http://localhost:3100/roomPrefs/demo-room" \
     -H 'IM-CLIENT-KEY: {IM-CLIENT-KEY}' \
     -H 'IM-Authorization: {TOKEN}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "folder": "Some-Folder",
  "sticky": false,
  "hidden": false,
  "muted": false,
  "tagColors": {
    "demo": "#ffccff",
    "sample": "#ccffdd"
  },
  "tags": [
    "demo",
    "sample"
  ],
  "translation": false
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
    "hidden": false,
    "sticky": false,
    "muted": false,
    "folder": "Some-Folder",
    "translation": false,
    "tagColors": {
      "demo": "#ffccff",
      "sample": "#ccffdd"
    }
  }
}
```
