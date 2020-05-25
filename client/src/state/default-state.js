import { v1 as uuidv1 } from 'uuid';

export default {
    webSocketConnection: null,
    webSocketConnectionAlive: false,
    userId: '',
    lobbyId: '',
    lobbies: [
        {
            name: 'Example Lobby',
            id: uuidv1(),
            hostId: 'my-user-id',
            messages: [ {
                author: 'Joe',
                content: 'Hi this is an example of a chat message!',
                createdDate: new Date()
            },]
        }
    ],
    users: [
        {
            id: 'my-user-id',
            name: 'Joe McD'
        }
    ]
};