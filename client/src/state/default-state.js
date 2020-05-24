import { v1 as uuidv1 } from 'uuid';

export default {
    userId: '',
    lobbyId: '',
    lobbies: [
        {
            name: 'Joes Lobby',
            id: uuidv1(),
            currentMessage: '',
            hostId: 'my-user-id',
            messages: [
                {
                    author: 'Joe',
                    content: 'Hi this is an example of a chat message!',
                    createdDate: new Date()
                },
                {
                    author: 'George',
                    content: 'I have received your example message!',
                    createdDate: new Date()
                },
                {
                    author: 'Lucy',
                    content: 'I am also here in the channel!',
                    createdDate: new Date()
                }
            ]
        },
        {
            name: 'New Lobby',
            id: uuidv1(),
            hostId: 'my-user-id',
            messages: []
        }
    ],
    users: [
        {
            id: 'my-user-id',
            name: 'Joe McD'
        }
    ]
};