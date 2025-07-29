# chat message
| Event        | Data    |
| ------------ | ------- |
| chat message | Message |

# room
| Event        | Data    |
| ------------ | ------- |
| room         | Updated Room |


# lastRead
Data properties

| Propert      | Data    |
| ------------ | ------- |
| roomID       | Room ID |
| memberID     | Report member id |
| messageID    | Last read message id |

```json
{
  "roomID":"5be660651a71681534245a4e",
  "messageID":"5be7edaced649e42234f0699",
  "memberID":"aaa"
}
```

# typing
| Event        | Data    |
| ------------ | ------- |
| typing       | Some member is typing message |

```json
{
  "room": "58871b877390be11d5f1ab30",
  "message": "typing content"
}
```

# roomPref

Client changed a room preference

| Event        | Data    |
| ------------ | ------- |
| roomPref     | New room pref |

```json
{"room":"demo-room","folder":"Some-Folder","hidden":false,"muted":false,"sticky":false,"tags":["demo","sample"]}
```

# myPrefChange

Client changed a preference

| Event        | Data    |
| ------------ | ------- |
| myPrefChange | New preference data and key |

```json
{"data":{"foo":"bar","folders":{"folder 1":{"rooms":["aaabbb","cccddd"]}}},"key":"demokey"}
```

# myPrefDelete

Client delete a preference

| Event        | Data    |
| ------------ | ------- |
| myPrefDelete | Deleted key |

```
"demokey"
```

# invitation
Client received a group invitation
| Event        | Data    |
| ------------ | ------- |
| invitation   | Invitation object |


# User Delete messages
Event `userDeleteMessages`

Client(user) delete messages
Data properties

| Propert      | Data    |
| ------------ | ------- |
| room         | Room ID |
| messages     | List of User deleted message IDs |
| isUserDeleteAllMessagesInRoom    | (Boolean), whether the user has deleted all messages in room |



```json
{ "room":"demo-FpOtW6","messages":["64623ad9f83f7f1a35009d6b"], "isUserDeleteAllMessagesInRoom": true }
```
