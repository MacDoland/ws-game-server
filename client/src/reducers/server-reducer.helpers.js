import { v1 as uuidv1 } from 'uuid';

const cloneState = (state) => {
    return Object.assign({}, state, {
        lobbies: [...state.lobbies.map(lobby => Object.assign({}, {
            ...lobby,
            messages: [...lobby.messages.map(message => Object.assign({}, message))]
        }))],
        users: [...state.users.map(user => Object.assign({}, user))]
    })
}

const updateUser = (state, action) => {
    const { username } = action.payload;

    if (typeof (state.userId) !== 'string' || state.userId === '') {
        const userId = uuidv1();
        state.users.push({
            id: userId,
            name: username
        });

        state.userId = userId;
    }
    else {
        let index = state.users.findIndex(user => user.id === state.userId);

        if (index >= 0) {
            state.users[index].name = username;
        }
    }

    return state;
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


const createLobby = (state, action) => {
    const { id, name, participants, messages, hostId  } = action.payload;
    let newState = cloneState(state);

    newState = updateUser(newState, action);
    newState.lobbyId = id;
    newState.lobbies.push({
        id,
        name,
        participants,
        messages,
        hostId,
    });

    return newState;
};

const joinLobby = (state, action) => {
    const { lobbyId } = action.payload;

    let newState = cloneState(state);

    newState = updateUser(newState, action);
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

export { newConnection, connectionActive, createLobby, joinLobby, sendMessage };