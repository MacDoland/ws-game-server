const {
    addChatMessage,
    broadcast,
    broadcastLobbies,
    createLobby,
    removeUserFromAllLobbies
} = require("./server-functions");


describe('addChatMessage', () => {
    it('should add chat message only to specified lobby', () => {
        //Arrange
        const author = 'test-author';
        const lobbyId = 'my-lobby-id';
        const content = 'my-test-message';
        const createdDate = new Date();
        const state ={
            lobbies: [
                {
                    id: lobbyId,
                    messages: []
                },
                {
                    id: 'another-lobby',
                    messages: []
                }
            ]
        }

        //Act
       const actual = addChatMessage(state, lobbyId, author, createdDate, content);

        //Assert
        expect(actual.lobbies[0].messages[0]).toEqual({
            author,
            content,
            createdDate
        });

        expect(actual.lobbies[1].messages.length).toEqual(0);
        
    });

    it('should return current state if lobby is not found', () => {
        //Arrange
        const author = 'test-author';
        const lobbyId = 'my-lobby-id';
        const content = 'my-test-message';
        const createdDate = new Date();
        const state = {
            lobbies: [
                {
                    id: 'another-lobby',
                    messages: []
                }
            ]
        };
        const expected = state;

        //Act
       const actual = addChatMessage(state, lobbyId, author, createdDate, content);

        //Assert
        expect(actual).toEqual(expected);
    });
});


describe('broadcast', () => {
    it('should send a stringified message to all server clients', () => {
        //Arrange
        const message = { hello: 'world' };
        const expected = JSON.stringify(message);
        const clientOneSend = jest.fn();
        const clientTwoSend = jest.fn();
        const clientThreeSend = jest.fn();
        const server = {
            clients: [
                {
                    clientId: 'test-client-1',
                    send: clientOneSend
                },
                {
                    clientId: 'test-client-2',
                    send: clientTwoSend
                },
                {
                    clientId: 'test-client-3',
                    send: clientThreeSend
                }
            ]
        }

        //Act
        broadcast(server, message);

        //Assert
        expect(clientOneSend).toHaveBeenCalledWith(expected);
        expect(clientTwoSend).toHaveBeenCalledWith(expected);
        expect(clientThreeSend).toHaveBeenCalledWith(expected);
    });
});

describe('broadcastLobbies', () => {
    it('should send lobbies to all clients', () => {
        //Arrange
        const lobbies = [{ hello: 'world' }];
        const expected = JSON.stringify({
            type: 'GET_LOBBIES',
            payload: {
                lobbies
            }
        });
        const clientOneSend = jest.fn();
        const clientTwoSend = jest.fn();
        const clientThreeSend = jest.fn();
        const server = {
            clients: [
                {
                    clientId: 'test-client-1',
                    send: clientOneSend
                },
                {
                    clientId: 'test-client-2',
                    send: clientTwoSend
                },
                {
                    clientId: 'test-client-3',
                    send: clientThreeSend
                }
            ]
        }

        //Act
        broadcastLobbies(server, lobbies);

        //Assert
        expect(clientOneSend).toHaveBeenCalledWith(expected);
        expect(clientTwoSend).toHaveBeenCalledWith(expected);
        expect(clientThreeSend).toHaveBeenCalledWith(expected);
    });
});

describe('createLobby', () => {
    it('should create a new lobby in state if the lobby doesn\'t already exist', () => {
        //Arrange
        const lobbyId = 'my-lobby-id';
        const lobbyName = 'my-lobby-name';
        const userId = 'my-user-id';

        const expected = {
            hostId: userId,
            id: lobbyId,
            name: lobbyName,
            participants: [],
            messages: [],
        };

        const state = {
            lobbies: []
        };

        //Act
        const lobbies = createLobby(state, lobbyId, lobbyName, userId).lobbies;
        const actual = lobbies[0];

        //Assert
        expect(actual).toEqual(expected);
    });

    it('should return existing state if the lobby already exists', () => {
        //Arrange
        const lobbyId = 'my-lobby-id';
        const lobbyName = 'my-lobby-name';
        const userId = 'my-user-id';

        const state = {
            lobbies: [{
                hostId: userId,
                id: lobbyId,
                name: lobbyName,
                participants: [],
                messages: [],
            }]
        };

        const expected = state;

        //Act
        const actual = createLobby(state, lobbyId, lobbyName, userId);

        //Assert
        expect(actual).toEqual(expected);
    });
});


describe('removeUserFromAllLobbies', () => {
    it('should remove user from all lobbies', () => {
        //Arrange
        const expected = -1;
        const userId = 'user-1';
        const state = {
            lobbies: [
                {
                    participants: ['user-1', 'user-2', 'user-3']
                },
                {
                    participants: ['user-1', 'user-2']
                },
                {
                    participants: ['user-2', 'user-3']
                }
            ]
        };

        //Act
        const actual = removeUserFromAllLobbies(state, userId)

        //Assert
        expect(actual.lobbies[0].participants.indexOf(userId)).toEqual(expected);
        expect(actual.lobbies[1].participants.indexOf(userId)).toEqual(expected);
        expect(actual.lobbies[2].participants.indexOf(userId)).toEqual(expected);
    });

    it('should remove user from all lobbies (when not in any)', () => {
        //Arrange
        const expected = -1;
        const userId = 'user-1';
        const state = {
            lobbies: [
                {
                    participants: ['user-2', 'user-3']
                },
                {
                    participants: ['user-2']
                },
                {
                    participants: ['user-2', 'user-3']
                }
            ]
        };

        //Act
        const actual = removeUserFromAllLobbies(state, userId)

        //Assert
        expect(actual.lobbies[0].participants.indexOf(userId)).toEqual(expected);
        expect(actual.lobbies[1].participants.indexOf(userId)).toEqual(expected);
        expect(actual.lobbies[2].participants.indexOf(userId)).toEqual(expected);
    });
});
