# Invite a client to join room
Only for **group** room. Direct rooms does not need invitations.

## APIs
[Add Member](https://github.com/FUNTEKco/chat-server-document/wiki/%5BRoom%5D-Add-member)

[Add members](https://github.com/FUNTEKco/chat-server-document/wiki/%5BRoom%5D-Add-members)

[Create and Join Room](https://github.com/FUNTEKco/chat-server-document/wiki/%5BRoom%5D-Create-and-Join-Room-With-Members)

## JSON Body Property
| Name        | Type | Description |
| ----------- | ---- | ----------- |
| systemMessage       | Boolean | Create system message of add member     |
| invitationRequired | Boolean | Whether required invitation for invitee to decide to join or decline. Only for **group** chat. |

# List client's pending invitations
If the client doesn't join the room (accept invitation), the room would be not listed in the room list API.
Please call list pending invitations to get these room infos.

[List my pending invitations](https://github.com/FUNTEKco/chat-server-document/wiki/%5BRoom%5D-List-my-pending-invitations)

# Invitee accepts a room invitation
The invitee needs to call join room API. When the invitee joins room successfully, his/her pending invitations of the room would be removed.

[Join Room](https://github.com/FUNTEKco/chat-server-document/wiki/%5BRoom%5D-Join)

# Invitee declines invitations from a room

[Decline Room Invitations](https://github.com/FUNTEKco/chat-server-document/wiki/Decline-room-invitations)

# List pending room invitations
List pending invitations of a room. The present room members may call this API to see whom are invited.
[List room pending invitations](https://github.com/FUNTEKco/chat-server-document/wiki/%5BRoom%5D-List-room-pending-invitations)

# Invitation Data Model
[Model](https://github.com/FUNTEKco/chat-server-document/wiki/Model#Invitation)