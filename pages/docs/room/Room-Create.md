# Create Room

Create room without automatic joining room.

Better to avoid calling this API with a Client-Key and Client Authorization Token.

### path

/rooms/

### Method

POST

### Headers:

| Field      | Description      |
| ---------- | ---------------- |
| IM-API-KEY | Platform API Key |

### Post Body

Please refer to [Room Model](https://github.com/FUNTEKco/chat-server-document/wiki/Model#room)

| Field         | Type          | Description                                                                        |
| ------------- | ------------- | ---------------------------------------------------------------------------------- |
| \_id          | String        | (Optional) Custom Room ID                                                          |
| name          | String        | (Optional) Room name                                                               |
| cover         | String        | (Optional) Room cover image URL                                                    |
| roomType      | String        | (Optional) "direct" or "group"                                                     |
| members       | Array[String] | (Optional) members to be added into the room                                       |
| description   | String        | (Optional) Text or serialized json data                                            |
| roomTags      | Array[String] | (Optional) shared room tags for search                                             |
| webhook       | String        | (Optional) Webhook Key or URL                                                      |
| botMode       | Boolean       | (Optional) Is room robot enabled                                                   |
| extParams     | String        | (Optional) Extended custom parameters, formatted as param1=value1&para2=value2¶... |
| systemMessage | Boolean       | (Optional) Should automatically create system message or not (add member message)  |
| owner         | String        | (Optional) Room owner ID |


```javascript
axios.post(
  "https://imkit-dev.funtek.io/rooms/",
  {
     "name": "Martena",
     "cover": "http://loremflickr.com/240/240/style?Kelly",
     "roomType": "direct",
     "roomTags": ["demo", "foo", "bar"],
     "members": ["demo-team", "guest-123" ]
  },
  {
    headers: {
      "IM-API-KEY": `${IM_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
);
```

### Response Result

Created Room data

```json
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "__v": 0,
    "appID": "SampleApp",
    "_id": "588ef83f2e0f6a3855d8518b",
    "members": ["demo-team", "guest-123" ]
    "name": "Martena",
    "roomType": "direct",
    "cover": "http://loremflickr.com/240/240/style?Kelly",
    "roomTags": ["demo", "foo", "bar"]
  }
}
```
