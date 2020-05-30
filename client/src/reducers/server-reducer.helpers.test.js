import stateMock from './mocks/state-mock';
import {
    cloneState,
    newConnection,
    connectionActive,
    getLobbies,
    joinLobby,
    sendMessage,
    updateUser
}
    from './server-reducer.helpers';

describe('cloneState', () => {
    it('should deep clone an object that doesnt share the same reference in memory', () => {
        //Arrange
        const expected = false;
        const state = stateMock;

        //Act
        const newState = cloneState(state);
        const actual = state === newState;

        //Assert
        expect(expected).toStrictEqual(actual);
    });

    it('should deep clone an object thats object property doesnt share the same reference in memory', () => {
        //Arrange
        const expected = false;
        const state = stateMock;

        //Act
        const newState = cloneState(state);
        const actual = state.property5 === newState.property5;

        //Assert
        expect(expected).toStrictEqual(actual);
    });

    it('should deep clone an object thats array property doesnt share the same reference in memory', () => {
        //Arrange
        const expected = false;
        const state = stateMock;

        //Act
        const newState = cloneState(state);
        const actual = state.property6 === newState.property6;

        //Assert
        expect(expected).toStrictEqual(actual);
    });

    it('should deep clone an object thats array propertys child doesnt share the same reference in memory', () => {
        //Arrange
        const expected = false;
        const state = stateMock;

        //Act
        const newState = cloneState(state);
        const actual = state.property6[0] === newState.property6[0];

        //Assert
        expect(expected).toStrictEqual(actual);
    });
});

describe('newConnection', () => {
    it('should update state with a new connection', () => {
        //Arrange
        const expected = 'myConnection';
        const action = {
            payload: {
                connection: expected
            }
        };

        //Act 
        const newState = newConnection({}, action);

        //Assert
        expect(newState.webSocketConnection).toStrictEqual(expected);
    })
})

describe('connectionActive', () => {
    it('should update state with a boolean called webSocketConnectionAlive', () => {
        //Arrange
        const expected = true;
        const action = {
            payload: {
                webSocketConnectionAlive: expected
            }
        };

        //Act 
        const newState = connectionActive({}, action);

        //Assert
        expect(newState.webSocketConnectionAlive).toStrictEqual(expected);
    })
})

describe('getLobbies', () => {
    it('should create state with supplied empty lobbies', () => {
        //Arrange
        const expected = [];
        const action = {
            payload: {
                lobbies: []
            }
        };

        //Act 
        const newState = getLobbies({}, action);

        //Assert
        expect(newState.lobbies).toStrictEqual(expected);
    })

    it('should create state with supplied lobbies', () => {
        //Arrange
        const expected = [{
            name: 'lobby-1'
        },
        {
            name: 'lobby-2'
        }];

        const action = {
            payload: {
                lobbies: expected
            }
        };

        //Act 
        const newState = getLobbies({}, action);

        //Assert
        expect(newState.lobbies.length).toStrictEqual(2);
        expect(newState.lobbies).toStrictEqual(expected);
    })
})

describe('joinLobby', () => {
    it('should add lobbyId of joinedLobby to new state', () => {
        //Arrange
        const expected = 'my-lobby-id';
        const action = {
            payload: {
                lobbyId: expected
            }
        };

        //Act 
        const newState = joinLobby({}, action);

        //Assert
        expect(newState.lobbyId).toStrictEqual(expected);
    })
});

describe('sendMessage', () => {
    it('should create a message in state when the lobbyId matches with a lobby in state', () => {
        //Arrange
        const createdDate = new Date();
        const expected = {
            author: 'test-author',
            content: 'example chat message',
            createdDate: createdDate
        };

        const action = {
            payload: {
                ...expected,
                lobbyId: 'my-lobby',
            }
        };

        const state ={
            lobbies: [{
                id: 'my-lobby',
                messages: []
            }]
        }

        //Act 
        const newState = sendMessage(state, action);

        //Assert
        expect(newState.lobbies[0].messages.length).toStrictEqual(1);
        expect(newState.lobbies[0].messages[0]).toStrictEqual(expected);
    });

    it('should return existing state if lobby is not found', () => {
        //Arrange
        const action = {
            payload: {
                lobbyId: 'my-lobby',
            }
        };

        const state ={
            lobbies: [{
                id: 'my-other-lobby',
                messages: []
            }]
        }

        const expected = state;

        //Act 
        const newState = sendMessage(state, action);

        //Assert
        expect(newState).toStrictEqual(expected);
    })
});

describe('updateUser', () => {
    it('should create new user in state if that user doesnt already exist', () => {
        //Arrange
        const expected = {
            id: 'test-id-23',
            name: 'test-user-222'
        };

        const action = {
            payload: {
               ...expected
            }
        };

        const state = {
            users: [
                {
                    id: 'test-id',
                    name: 'test-user-456'
                }
            ]
        }

        //Act 
        const newState = updateUser(state, action);

        //Assert
        expect(newState.users.length).toStrictEqual(2);
        expect(newState.users[1]).toStrictEqual(expected);
    });

    it('should update user in state if that user does already exist', () => {
        //Arrange
        const expected = {
            id: 'test-id',
            name: 'test-user-222'
        };

        const action = {
            payload: {
               ...expected
            }
        };

        const state = {
            users: [
                {
                    id: 'test-id',
                    name: 'test-user-456'
                }
            ]
        }

        //Act 
        const newState = updateUser(state, action);

        //Assert
        expect(newState.users.length).toStrictEqual(1);
        expect(newState.users[0]).toStrictEqual(expected);
    });
});
