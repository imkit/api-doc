# Search Messages and Rooms

1. Search messages by keyword
2. Search rooms by room name
3. Search rooms by room members
4. Search rooms by room tags
5. Search rooms by tags in user's room preferences
6. Search rooms by folder name in user's room preferences

### path

/search

### Method

POST

### Headers:

| Field            | Description  |
| ---------------- | ------------ |
| IM-CLIENT-KEY    | Client Key   |
| IM-Authorization | Client Token |

### POST JSON Properties

| Field    | Type     | Description                                                                                                  |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| type     | String   | Types to search, could be "messages", "roomName", "roomMember", "roomTags", "roomPrefTags", "roomPrefFolder" |
| keyword  | String   | Keyword text                                                                                                 |
| room     | String   | Room ID. Search in room only                                                                                 |
| roomTags | [String] | Array of room tags. Search in rooms have all the specified room tags only                                    |
| limit    | Int      | Maximum search result                                                                                        |

Example

```json
POST /search HTTP/1.1
IM-Authorization: {TOKEN}
IM-CLIENT-KEY: {IM-CLIENT-KEY}
Content-Type: application/json; charset=utf-8
Host: localhost:3100
Connection: close
User-Agent: Paw/3.1.10 (Macintosh; OS X/10.15.2) GCDHTTPRequest
Content-Length: 39

{"type":["messages", "roomName", "roomMember", "roomTags", "roomPrefTags", "roomPrefFolder"],"keyword":"hello", "roomTags": ["foo"] }

```

### Response Result

| Property       | Description                                            |
| -------------- | ------------------------------------------------------ |
| messages       | [Room-Message-Group] matched messages grouping by room |
| roomName       | [RoomInfo] Array of matched rooms                      |
| roomMember     | [RoomInfo] Array of matched rooms                      |
| roomTags       | [RoomInfo] Array of matched rooms                      |
| roomPrefTags   | [RoomInfo] Array of matched rooms                      |
| roomPrefFolder | [RoomInfo] Array of matched rooms                      |

```javascript
{
  "RC": 0,
  "RM": "OK",
  "result": {
    "messages": [ {
         room: { ROOM_INFO }
         messages: [ message-ids ]
      }
      ...
    ],
    "roomName": [ matched-room-list ],
    "roomMember": [ matched-room-list ],
    "roomTags": [ matched-room-list ],
    "roomPrefTags": [ matched-room-list ]
  }
}
```
