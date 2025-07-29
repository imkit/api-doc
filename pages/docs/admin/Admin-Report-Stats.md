Periodically report statistic data.

If you have configured report:url (REPORT_URL), you can received the periodical report data accordingly.

https://github.com/FUNTEKco/chat-server-document/wiki/Configuration

### Data

| Field         | Description  |
| ------------- | ------------ |
| apiKey        | Platform API Key   |
| clientKey     | Client KEY   |
| clientId      | Client ID     |
| startTime     | Sampling start time in Epoch milliseconds   |
| endTime       | Sampling end time in Epoch milliseconds   |
| userList      | Active users in sampling period   |
| newUserCount  | Number of new users in sampling period |
| roomCount     | Number of newly created rooms in sampling period |
| messageCount  | Number of newly created messages in sampling period |
| peakConnectionCount | Peak connection count in sampling period |
| totalMem      | Total amount of system memory in bytes as an integer. |
| freeMem       | Amount of free system memory in bytes as an integer. |
| totalRoomCount | Total amount of rooms |
| totalUserCount | Total amount of users |
| monthlyAcitiveUserCount | Monthly active user count |



### Send Data
```javascript
{
    "clientKey": "...",
    "apiKey": "...",
    "clientId": "...",
    "startTime": 1632062420903,
    "endTime": 1632066020903,
    "userList": [],
    "roomCount": 0,
    "totalRoomCount": 2837,
    "messageCount": 0,
    "peakConnectionCount": 0,
    "newUserCount": 0,
    "totalUserCount": 4044,
    "monthlyAcitiveUserCount": 31,
    "totalMem": 1011150848,
    "freeMem": 70160384,
    "start": "2021-09-19T14:40:20.903Z",
    "end": "2021-09-19T15:40:20.903Z"
}
```
