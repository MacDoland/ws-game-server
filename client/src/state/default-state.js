export default {
    user: {
        name: ''
    },
    lobbies: [
        {
            name: 'Joes Awesome Lobby',
            id: '1',
            currentMessage: '',
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
            id: '2',
            currentMessage: '',
            messages: []
        }
    ]
};