import cloneDeep from 'lodash/cloneDeep';

const cloneState = (state) => {
    return cloneDeep(state);
}

const newConnection = (state, action) => {
    const { connection } = action.payload;
    let newState = cloneState(state);
    newState.webSocketConnection = connection;

    return newState;
}

const connectionActive = (state, action) => {
    const { webSocketConnectionAlive } = action.payload;
    let newState = cloneState(state);
    newState.webSocketConnectionAlive = webSocketConnectionAlive;

    return newState;
}

const getLobbies = (state, action) => {
    const { lobbies  } = action.payload;
    let newState = cloneState(state);
    newState.lobbies= [...lobbies];

    return newState;
}

const joinLobby = (state, action) => {
    const { lobbyId } = action.payload;

    let newState = cloneState(state);
    newState.lobbyId = lobbyId;

    return newState;
}

const sendMessage = (state, action) => {
    const { lobbyId, author, content, createdDate } = action.payload;

    let newState = cloneState(state);
    let index = newState.lobbies.findIndex(lobby => lobby.id === lobbyId);

    if (index >= 0) {
        newState.lobbies[index].messages.push({
            author,
            content,
            createdDate
        });

        return newState;
    }
    else {
        return state;
    }
}

const updateUser = (state, action) => {
    const {id, name} = action.payload;

    let newState = cloneState(state);
    let index = newState.users.findIndex(user => user.id === id);

    if(index === -1) {
        newState.userId = id;
        newState.users.push({
            id,
            name
        });
    }
    else{
        newState.userId = id;
        newState.users[index] = {
            id, 
            name
        };
    }

    return newState;
}

export { cloneState, newConnection, connectionActive, getLobbies, joinLobby, sendMessage, updateUser };